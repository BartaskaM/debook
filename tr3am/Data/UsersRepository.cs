using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
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
            var userDtos = await _dbContext.Users
                .AsNoTracking()
                .Include(x => x.Office)
                .Select(x => Mapper.Map<User, UserDTO>(x))
                .ToListAsync();

            foreach(var user in userDtos)
            {
                user.Roles = await GetUserRoles(user);
            }

            return userDtos;
        }

        public async Task<List<string>> GetUserRoles(UserDTO user)
        {
            List<string> userRoles = new List<string>();

            await _dbContext.UserRoles
                .AsNoTracking()
                .Where(x => x.UserId == user.Id)
                .ForEachAsync(async x =>
                {
                    userRoles.Add(await _dbContext.Roles
                        .AsNoTracking()
                        .Where(y => y.Id == x.RoleId)
                        .Select(y => y.Name)
                        .FirstOrDefaultAsync());
                });

            return userRoles;
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

            List<string> userRoles = new List<string>();

            await _dbContext.UserRoles
                .AsNoTracking()
                .Where(x => x.UserId == item.Id)
                .ForEachAsync(async x =>
                {
                    userRoles.Add(await _dbContext.Roles
                        .AsNoTracking()
                        .Where(y => y.Id == x.RoleId)
                        .Select(y => y.Name)
                        .FirstOrDefaultAsync());
                });

            // TODO: Find better mapper implamentation
            var userDto = Mapper.Map<User, UserDTO>(item);
            userDto.Roles = userRoles;

            return userDto;
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

            // TODO: Fix user password update to work with identity framework
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

        public async void ToggleModerator(int id)
        {
            List<string> userRoles = new List<string>();

         /*   var roles = await _dbContext.UserRoles
                .Where(x => x.UserId == id)
                .ToListAsync(); */

            await _dbContext.UserRoles
                .AsNoTracking()
                .Where(x => x.UserId == id)
                .ForEachAsync(async x =>
                {
                    userRoles.Add(await _dbContext.Roles
                        .AsNoTracking()
                        .Where(y => y.Id == x.RoleId)
                        .Select(y => y.Name)
                        .FirstOrDefaultAsync());
                });

            int moderatorIndex = await RoleIndex("moderator");

            if (userRoles.Contains("moderator"))
            {
                var role = await _dbContext.UserRoles
                            .AsNoTracking()
                            .Where(x => x.UserId == id && x.RoleId == moderatorIndex)
                            .FirstOrDefaultAsync();

                _dbContext.UserRoles.Remove(role);
              //  roles = roles.Where(role => role.RoleId != moderatorIndex).ToList();
            }
            else
            {
                var newRole = new IdentityUserRole<int>
                {
                    UserId = id,
                    RoleId = moderatorIndex
                };

                _dbContext.UserRoles.Add(newRole);
            }

            await _dbContext.SaveChangesAsync();
        }

        private async Task<int> RoleIndex(string roleName)
        {
            var item = await _dbContext.Roles
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Name == roleName);

            return item.Id;
        }
    }
}
