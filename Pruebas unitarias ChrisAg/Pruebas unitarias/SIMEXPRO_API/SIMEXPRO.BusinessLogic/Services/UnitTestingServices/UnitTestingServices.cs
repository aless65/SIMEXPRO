using SIMEXPRO.BussinessLogic;
using SIMEXPRO.DataAccess.Repositories.Adua;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.BusinessLogic.Services.UnitTestingServices
{
    public class UnitTestingServices
    {
        private readonly AduanasRepository _aduanasRepository;

        public UnitTestingServices(AduanasRepository aduanasRepository)
        {
            _aduanasRepository = aduanasRepository;
        }

        public ServiceResult ListarAduanas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _aduanasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
    }
}
