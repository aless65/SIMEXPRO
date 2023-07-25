
using SIMEXPRO.DataAccess.Repositories.Gral;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.BussinessLogic.Services.GeneralServices
{
    public class GeneralServices
    {
        private readonly EstadosCivilesRepository _estadosCivilesRepository;

        public GeneralServices(EstadosCivilesRepository estadosCivilesRepository)
        {
            _estadosCivilesRepository = estadosCivilesRepository;
        }

        #region Estados Civiles 
        public IEnumerable<tbEstadosCiviles> ListarEstadosCiviles()
        {
            try
            {
                var list = _estadosCivilesRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbEstadosCiviles>();
            }
        }

        //public ServiceResult InsertarEstadoCivil(tbEstadosCiviles item)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        if (item.esci_Descripcion != "")
        //        {
        //            var map = _estadosCivilesRepository.InsertarEstadoCivil(item);
        //            if (map.CodeStatus > 0)
        //            {
        //                return result.Ok(map);
        //            }
        //            else
        //            {
        //                map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
        //                return result.Error(map);
        //            }
        //        }
        //        else
        //        {
        //            return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}

        //public ServiceResult ActualizarEstadoCivil(tbEstadosCiviles item)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        if (item.esci_Descripcion != "")
        //        {
        //            var map = _estadosCivilesRepository.ActualizarEstadoCivil(item);
        //            if (map.CodeStatus > 0)
        //            {
        //                return result.Ok(map);
        //            }
        //            else
        //            {
        //                map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
        //                return result.Error(map);
        //            }
        //        }
        //        else
        //        {
        //            return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}

        //public IEnumerable<tbEstadosCiviles> ListarDetallesEstadosCiviles(tbEstadosCiviles item)
        //{
        //    try
        //    {
        //        var list = _estadosCivilesRepository.ListarDetallesEstadosCiviles(item);
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {

        //        return Enumerable.Empty<tbEstadosCiviles>();
        //    }
        //}
        #endregion



    }
}
