using System.Collections.Generic;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Requests;

namespace tr3am.DataContracts
{
    public interface IMessagesRepository
    {
        //   Task<IEnumerable<RequestDTO>> GetAll();
        //   Task<RequestDTO> GetById(int id);
        Task<MessageDto> GetById(int id);
        Task<int> Create(MessageItemRequest message, int userId);
        Task Read(int requestId, int userId);
       // Task Update(int id, OfficeItemRequest request);
       // Task Delete(int id);
    }
}
