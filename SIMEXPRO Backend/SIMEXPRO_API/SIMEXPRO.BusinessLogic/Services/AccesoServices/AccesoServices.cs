
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.BussinessLogic.Services.AccesoServices
{
    public class AccesoServices
    {
        /*private readonly UsuariosRepository _usuariosRepository;
        private readonly RolesPorPantallaRepository _rolesPorPantallaRepository;
        private readonly RolesRepository _rolesRepository;
        private readonly PantallasRepository _pantallasRepository;*/

        /*public AccesoServices(PantallasRepository pantallasRepository, RolesRepository rolesRepository, RolesPorPantallaRepository rolesPorPantallaRepository, UsuariosRepository usuariosRepository)
        {
            _usuariosRepository = usuariosRepository;
            _rolesPorPantallaRepository = rolesPorPantallaRepository;
            _rolesRepository = rolesRepository;
            _pantallasRepository = pantallasRepository;
        }*/

        /*#region Usuarios
        public IEnumerable<VW_tbUsuario> ListarUsuarios()
        {
            try
            {
                var list = _usuariosRepository.ListarUsuarios();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<VW_tbUsuario>();
            }
        }

        public IEnumerable<tbUsuarios> ListarEmpleadoNoTieneUser()
        {
            try
            {
                var list = _usuariosRepository.ListarEmpleadoNoTieneUser();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbUsuarios>();
            }
        }



        public IEnumerable<tbUsuarios> ListarDetallesUsuarios(tbUsuarios item)
        {
            try
            {
                var list = _usuariosRepository.ListarDetallesUsuarios(item);
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbUsuarios>();
            }
        }

        public ServiceResult InsertarUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.usua_Usuario != "")
                {
                    var map = _usuariosRepository.InsertarUsuario(item);
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

        public ServiceResult ActualizarUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.usua_Usuario != "")
                {
                    var map = _usuariosRepository.ActualizarUsuario(item);
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

        public ServiceResult DeleteUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.usua_Id != 0)
                {
                    var map = _usuariosRepository.DeleteUsuario(item);
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

        #region Roles Por Pantalla
        public IEnumerable<tbPantallasRoles> Pantallas_Por_Rol(tbPantallasRoles item)
        {
            try
            {
                var list = _rolesPorPantallaRepository.PantallasPorRol(item);
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbPantallasRoles>();
            }
        }
        public IEnumerable<VW_RolesxPantallas> PantallasPorRoleView(tbPantallasRoles item)
        {
            try
            {
                var list = _rolesPorPantallaRepository.listado();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<VW_RolesxPantallas>();
            }
        }
        
        public IEnumerable<VW_RolesxPantallas> FindRoles(VW_RolesxPantallas item)
        {
            try
            {
                var list = _rolesPorPantallaRepository.FindRoles(item);
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<VW_RolesxPantallas>();
            }
        }
        public RequestStatus InsertarRolxPantalla(VW_RolesxPantallas item)
        {
            try
            {
                var respuesta = _rolesPorPantallaRepository.InsertR(item);
                return respuesta;
            }
            catch (Exception ex)
            {
                RequestStatus respuesta = new()
                {
                    MessageStatus = ex.Message
                };
                return respuesta;
            }
        }
        public RequestStatus ActualizarRolxPantalla(VW_RolesxPantallas item)
        {
            try
            {
                var respuesta = _rolesPorPantallaRepository.UpdateR(item);
                return respuesta;
            }
            catch (Exception ex)
            {
                RequestStatus respuesta = new()
                {
                    MessageStatus = ex.Message
                };
                return respuesta;
            }
        }
        public RequestStatus DeleteRolxPantalla(VW_RolesxPantallas item)
        {
            try
            {
                var respuesta = _rolesPorPantallaRepository.deleteR(item);
                return respuesta;
            }
            catch (Exception ex)
            {
                RequestStatus respuesta = new()
                {
                    MessageStatus = ex.Message
                };
                return respuesta;
            }
        }
        #endregion

        #region Roles
        public IEnumerable<VW_tbRoles_ListarRoles> ListarRoles()
        {
            try
            {
                var list = _rolesRepository.ListarRoles();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<VW_tbRoles_ListarRoles>();
            }
        }

        public IEnumerable<VW_RolesxPantallas> FindRol(VW_RolesxPantallas item)
        {
            try
            {
                var list = _rolesRepository.FindRol(item);
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<VW_RolesxPantallas>();
            }
        }

        public RequestStatus InsertarRol(VW_RolesxPantallas item)
        {
            try
            {
                var respuesta = _rolesRepository.InsertR(item);
                return respuesta;
            }
            catch (Exception ex)
            {
                RequestStatus respuesta = new()
                {
                    MessageStatus = ex.Message
                };
                return respuesta;
            }
        }
        public RequestStatus ActualizarRol(VW_RolesxPantallas item)
        {
            try
            {
                var respuesta = _rolesRepository.UpdateR(item);
                return respuesta;
            }
            catch (Exception ex)
            {
                RequestStatus respuesta = new()
                {
                    MessageStatus = ex.Message
                };
                return respuesta;
            }
        }
        public RequestStatus DeleteRol(VW_RolesxPantallas item)
        {
            try
            {
                var respuesta = _rolesRepository.DeleteR(item);
                return respuesta;
            }
            catch (Exception ex)
            {
                RequestStatus respuesta = new()
                {
                    MessageStatus = ex.Message
                };
                return respuesta;
            }
        }

        #endregion

        #region Pantallas

        public IEnumerable<VW_tbPantallas_ListarPantallas> ListarPantallas()
        {
            try
            {
                var list = _pantallasRepository.Lista();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<VW_tbPantallas_ListarPantallas>();
            }
        }
        #endregion

        #region Login
        public ServiceResult ValidarLogin(tbUsuarios item)
        {
            var resultado = new ServiceResult();

            try
            {
                var usuario = _usuariosRepository.ValidarLogin(item);
                return resultado.Ok(usuario);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }


        public ServiceResult CambiaContra(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.usua_Usuario != "")
                {
                    var map = _usuariosRepository.CambiaContra(item);
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

      
        #endregion*/
    }
}
