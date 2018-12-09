using System.Collections.Generic;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Requests;

namespace tr3am.DataContracts
{
    public interface IRequestsRepository
    {
        Task<IEnumerable<RequestDto>> GetAll();
        Task<RequestDto> GetById(int id);
        Task<int> Create(RequestItemRequest request, int userId);
        Task<int> AddMessage(MessageItemRequest message, int userId);
        Task<RequestDto> ChangeStatus(RequestStatusRequest request, int id);
        Task<IEnumerable<RequestDto>> GetByUserId(int userId);
        //Task Update(int id, RequestItemRequest request);
        // Task Delete(int id);
    }
}
