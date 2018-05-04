using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.DataContracts
{
    public interface IAccount
    {
        Task<LogInDto> LogIn(LogInRequest request);
    }
}
