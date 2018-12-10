using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Requests;
using RequestStatus = tr3am.DataContracts.Enums.RequestStatus;
using tr3am.Services;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace tr3am.Data
{
    public class RequestsRepository : IRequestsRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly IMessagesRepository _messagesRepository;
        private readonly EmailService _emailService;

        public RequestsRepository(AppDbContext dbContext, IMessagesRepository messagesRepository, EmailService emailService)
        {
            _dbContext = dbContext;
            _messagesRepository = messagesRepository;
            _emailService = emailService;
        }

        public async Task<IEnumerable<RequestDto>> GetAll()
        {
            return await _dbContext.Request
                .AsNoTracking()
                .Include(x => x.Messages)
                .Include(x => x.User)
                .OrderBy(x => x.Status)
                .Select(x => Mapper.Map<Request, RequestDto>(x))
                .ToListAsync();
        }

        public async Task<IEnumerable<RequestDto>> GetByUserId(int userId)
        {
            return await _dbContext.Request
                .AsNoTracking()
                .Include(x => x.Messages)
                .Include(x => x.User)
                .Where(x => x.User.Id == userId)
                .OrderBy(x => x.Status)
                .Select(x => Mapper.Map<Request, RequestDto>(x))
                .ToListAsync();
        }

        public async Task<RequestDto> GetById(int id)
        {
            var item = await _dbContext.Request
                .AsNoTracking()
                .Include(x => x.Messages)
                .ThenInclude(x => x.User)
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidRequestException();
            }

            return Mapper.Map <Request, RequestDto>(item);
        }

        public async Task<int> Create(RequestItemRequest request, int userId)
        {
            var newItem = new Request
            {
                Status = RequestStatus.New,
                ExpectedDate = request.ExpectedDate,
                UserId = userId,
                CreatedAt = DateTime.Now
            };

            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    _dbContext.Request.Add(newItem);
                    await _dbContext.SaveChangesAsync();

                    MessageItemRequest item = new MessageItemRequest()
                    {
                        Text = request.Message,
                        RequestId = newItem.Id,
                    };

                    await this._messagesRepository.Create(item, userId);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return newItem.Id;
        }

        public async Task<int> AddMessage(MessageItemRequest message, int userId)
        {
            var request = await _dbContext.Request.
                FirstOrDefaultAsync(x => x.Id == message.RequestId);

            if (request.Status == RequestStatus.New)
            {
                request.Status = RequestStatus.Pending;
            }

            int messageId = await _messagesRepository.Create(message, userId);

            _dbContext.SaveChanges();

            return messageId;
        }

        public async Task<RequestDto> ChangeStatus(RequestStatusRequest request, int id)
        {
            var req = await _dbContext.Request
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (req.Status == RequestStatus.Resolved || req.Status == RequestStatus.Cancelled) {
                return null;
            }


            if (request.Status == RequestStatus.Resolved)
            {
                req.ResolvedAt = DateTime.Now;
            }
            
            req.Status = request.Status;

            _dbContext.SaveChanges();

            return Mapper.Map<Request, RequestDto>(req);
        }
    }
}