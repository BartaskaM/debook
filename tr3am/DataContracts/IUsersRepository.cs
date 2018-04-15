using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.DataContracts
{
    interface IUsersRepository
    {
        List<UserDTO> GetAll();
        UserDTO GetById(int id);
        int Create(CreateUserRequest request);
        void Update(int id, UpdateUserRequest request);
        void Delete(int id);
    }
}
