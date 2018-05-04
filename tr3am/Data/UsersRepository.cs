using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly AppDbContext _dbContext;

        public UsersRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<UserDTO>> GetAll()
        {
            return await _dbContext.Users
                .AsNoTracking()
                .Include(x => x.Office)
                .Select(x => Mapper.Map<User, UserDTO>(x))
                .ToListAsync();
        }

        public async Task<UserDTO> GetById(int id)
        {
            var item = await _dbContext.Users
                .AsNoTracking()
                .Include(x => x.Office)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidUserException();
            }

            return Mapper.Map<User, UserDTO>(item);
        }

        public async Task Update(int id, UpdateUserRequest request)
        {
            var item = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidUserException();
            }

            var office = await _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }

            if (item.Email != request.Email && await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email == request.Email) != null)
            {
                throw new DuplicateEmailException();
            }

            item.Email = request.Email;
            item.FirstName = request.FirstName;
            item.LastName = request.LastName;
            item.OfficeId = office.Id;

            //if (!String.IsNullOrEmpty(request.Password))
            //{
            //    item.Password = request.Password;
            //}
            item.Slack = request.Slack;

            await _dbContext.SaveChangesAsync();
        }


        public async Task Delete(int id)
        {
            var item = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidUserException();
            }

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }
    }
}
