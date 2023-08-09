
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
        private readonly AldeasRepository _aldeasRepository;
        private readonly CargosRepository _cargosRepository;
        private readonly CiudadesRepository _ciudadesRepository;
        private readonly ColoniasRepository _coloniasRepository;
        private readonly EmpleadosRepository _empleadosRepository;
        private readonly EstadosCivilesRepository _estadosCivilesRepository;
        private readonly FormasEnvioRepository _formasEnvioRepository;
        private readonly MonedasRepository _monedasRepository;
        private readonly OficinasRepository _oficinasRepository;
        private readonly OficioProfesionesRepository _oficioProfesionesRepository;
        private readonly PaisesRepository _paisesRepository;
        private readonly ProveedoresRepository _proveedoresRepository;
        private readonly ProvinciasRepository _provinciasRepository;
        private readonly UnidadMedidasRepository _unidadMedidasRepository;



        public GeneralServices(
            AldeasRepository aldeasRepository,
            CargosRepository cargosRepository,
            CiudadesRepository ciudadesRepository,
            ColoniasRepository coloniasRepository,
            EmpleadosRepository empleadosRepository,
            EstadosCivilesRepository estadosCivilesRepository,
            FormasEnvioRepository formasEnvioRepository,
            MonedasRepository monedasRepository,
            OficinasRepository oficinasRepository,
            OficioProfesionesRepository oficioProfesionesRepository,
            PaisesRepository paisesRepository,
            ProveedoresRepository proveedoresRepository,
            ProvinciasRepository provinciasRepository,
            UnidadMedidasRepository unidadMedidasRepository
                                )
        {
            _aldeasRepository = aldeasRepository;
            _cargosRepository = cargosRepository;
            _ciudadesRepository = ciudadesRepository;
            _coloniasRepository = coloniasRepository;
            _empleadosRepository = empleadosRepository;
            _estadosCivilesRepository = estadosCivilesRepository;
            _formasEnvioRepository = formasEnvioRepository;
            _monedasRepository = monedasRepository;
            _oficinasRepository = oficinasRepository;
            _oficioProfesionesRepository = oficioProfesionesRepository;
            _paisesRepository = paisesRepository;
            _proveedoresRepository = proveedoresRepository;
            _provinciasRepository = provinciasRepository;
            _unidadMedidasRepository = unidadMedidasRepository;

        }

        #region Aldeas
        public ServiceResult ListarAldeas()
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _aldeasRepository.List();
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }
        public ServiceResult AldeasPorCiudades(tbAldeas item)
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _aldeasRepository.AldeasPorCiudades(item);
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult InsertarAldeas(tbAldeas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _aldeasRepository.Insert(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarAldeas(tbAldeas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _aldeasRepository.Update(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarAldeas(tbAldeas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _aldeasRepository.Delete(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Cargos
        public ServiceResult ListarCargos()
        {
            var resultado = new ServiceResult();
            try
            {
                var list = _cargosRepository.List();
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult InsertarCargos(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _cargosRepository.Insert(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarCargos(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _cargosRepository.Update(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Ciudades
        public ServiceResult ListarCiudades()
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult CiudadesPorProvincia(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadesRepository.CiudadesPorProvincia(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertarCiudades(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadesRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarCiudades(tbCiudades item)
        {

            var result = new ServiceResult();
            try
            {
                var list = _ciudadesRepository.Update(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }

        public ServiceResult EliminarCiudades(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadesRepository.Delete(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Colonias
        public ServiceResult ListarColonias()
        {
            var result = new ServiceResult();
            try
            {
                var list = _coloniasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ColoniasPorCiudades(tbColonias item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _coloniasRepository.ColoniasPorCiudades(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertarColonias(tbColonias item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _coloniasRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarColonias(tbColonias item)
        {

            var result = new ServiceResult();
            try
            {
                var list = _coloniasRepository.Update(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarColonias(tbColonias item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _coloniasRepository.Delete(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }
        #endregion

        #region Empleados
        public ServiceResult ListarEmpleados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Insert(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Update(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Delete(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ReactivarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Reactivar(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region EstadosCiviles
        public ServiceResult ListarEstadosCiviles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadosCivilesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.escv_Nombre != "")
                {
                    var map = _estadosCivilesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.escv_Nombre != "")
                {
                    var map = _estadosCivilesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.escv_Id != 0)
                {
                    var map = _estadosCivilesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Formas_Envio
        public ServiceResult ListarFormas_Envio()
        {
            var result = new ServiceResult();
            try
            {
                var list = _formasEnvioRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarFormas_Envio(tbFormas_Envio item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _formasEnvioRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarFormas_Envio(tbFormas_Envio item)
        {

            var result = new ServiceResult();
            try
            {
                var list = _formasEnvioRepository.Update(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarFormas_Envio(tbFormas_Envio item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _formasEnvioRepository.Delete(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Monedas
        public ServiceResult ListarMonedas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _monedasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarMonedas(tbMonedas item)
        {

            var result = new ServiceResult();
            try
            {
                var list = _monedasRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarMonedas(tbMonedas item)
        {

            var result = new ServiceResult();
            try
            {
                var list = _monedasRepository.Update(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }

        public ServiceResult EliminarMonedas(tbMonedas item)
        {

            var result = new ServiceResult();
            try
            {
                var list = _monedasRepository.Delete(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Oficinas
        public IEnumerable<tbOficinas> ListarOficinas()
        {
            try
            {
                var list = _oficinasRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbOficinas>();
            }
        }

        public ServiceResult InsertarOficinas(tbOficinas item)
        {

            var result = new ServiceResult();
            try
            {
                var list = _oficinasRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarOficinas(tbOficinas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _oficinasRepository.Update(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarOficinas(tbOficinas item)
        {

            var result = new ServiceResult();
            try
            {
                var list = _oficinasRepository.Delete(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }
        #endregion

        #region Oficio_Profesiones
        public IEnumerable<tbOficio_Profesiones> ListarOficio_Profesiones()
        {
            try
            {
                var list = _oficioProfesionesRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbOficio_Profesiones>();
            }
        }

        public ServiceResult InsertarOficio_Profesiones(tbOficio_Profesiones item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ofpr_Nombre != "")
                {
                    var map = _oficioProfesionesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarOficio_Profesiones(tbOficio_Profesiones item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ofpr_Nombre != "")
                {
                    var map = _oficioProfesionesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarOficio_Profesiones(tbOficio_Profesiones item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ofpr_Id != 0)
                {
                    var map = _oficioProfesionesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Paises
        public IEnumerable<tbPaises> ListarPaises()
        {
            try
            {
                var list = _paisesRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbPaises>();
            }
        }

        public ServiceResult InsertarPaises(tbPaises item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.pais_Nombre != "")
                {
                    var map = _paisesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarPaises(tbPaises item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.pais_Nombre != "")
                {
                    var map = _paisesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarPaises(tbPaises item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.pais_Id != 0)
                {
                    var map = _paisesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Provincias
        public ServiceResult ListarProvincias()
        {
            var result = new ServiceResult();
            try
            {
                var list = _provinciasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult ProvinciasPorPaises(tbProvincias item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _provinciasRepository.ProvinciasPorPaises(item);
                return result.Ok(map);               
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarProvincias(tbProvincias item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _provinciasRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarProvincias(tbProvincias item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _provinciasRepository.Update(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarProvincias(tbProvincias item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _provinciasRepository.Delete(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }
        #endregion

        #region Proveedores

        public ServiceResult ListarProveedores()
        {
            var result = new ServiceResult();
            try
            {
                var list = _proveedoresRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        
        public ServiceResult InsertarProveedores(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _proveedoresRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult ActualizarProveedores(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _proveedoresRepository.Update(item);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarProveedores(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _proveedoresRepository.Delete(item);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }

        }
        #endregion

        #region UnidadMedidas

        public ServiceResult ListarUnidadMedidas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _unidadMedidasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarUnidadMedidas(tbUnidadMedidas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _unidadMedidasRepository.Insert(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarUnidadMedidas(tbUnidadMedidas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _unidadMedidasRepository.Update(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarUnidadMedidas(tbUnidadMedidas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _unidadMedidasRepository.Delete(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
    }
}
