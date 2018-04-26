using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.DataContracts
{
    public interface IUsersRepository
    {
        Task<IEnumerable<UserDTO>> GetAll();
        Task<UserDTO> GetById(int id);
        Task<int> Create(CreateUserRequest request);
        Task Update(int id, UpdateUserRequest request);
        Task Delete(int id);
        Task<LogInDTO> LogIn(LogInRequest request);
    }
}
