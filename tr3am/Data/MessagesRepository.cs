using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Requests;
using RequestStatus = tr3am.DataContracts.Enums.RequestStatus;

namespace tr3am.Data
{
    public class MessagesRepository : IMessagesRepository
    {
        private readonly AppDbContext _dbContext;

        public MessagesRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

       /* public async Task<IEnumerable<RequestDTO>> GetAll()
        {
            return await _dbContext.Request
                .AsNoTracking()
                .Select(x => Mapper.Map<Request, RequestDTO>(x))
                .ToListAsync();
        }*/

        public async Task<MessageDto> GetById(int id)
        {
            var item = await _dbContext.Message
                .AsNoTracking()
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidRequestException();
            }

            return Mapper.Map <Message, MessageDto>(item);
        }

        public async Task<int> Create(MessageItemRequest message, int userId)
        {
            var newItem = new Message
            {
                Text = message.Text,
                UserId = userId,
                CreatedAt = DateTime.Now,
                RequestId = message.RequestId
            };

            _dbContext.Message.Add(newItem);

            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task Read(int requestId, int userId)
        {
            var messages = await _dbContext.Message
               .AsNoTracking()
               .Where(x => x.RequestId == requestId)
               .ToListAsync();

            messages.ForEach(message =>
            {
                if (message.ReadAt == null && message.UserId != userId)
                {
                    message.ReadAt = DateTime.Now;
                    _dbContext.Entry(message).State = EntityState.Modified;
                }
            });

           
            await _dbContext.SaveChangesAsync();
        }

       /* public async Task Update(int id, RequestItemRequest request)
        {
            var item = await _dbContext.Request.
                FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidRequestException();
            }

            item.Status = request.Status;
            item.ExpectedDate = request.ExpectedDate;
            item.User = request.User;

            await _dbContext.SaveChangesAsync();
        } */

     /*   public async Task Delete(int id)
        {
            var item = await _dbContext.Offices
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidOfficeException();
            }

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }*/
    }
}