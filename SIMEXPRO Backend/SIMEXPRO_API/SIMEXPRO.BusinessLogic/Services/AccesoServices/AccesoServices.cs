
using SIMEXPRO.DataAccess;
using SIMEXPRO.DataAccess.Repositories.Acce;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.BussinessLogic.Services.AccesoServices
{
    public class AccesoServices
    {
        private readonly UsuariosRepository _usuariosRepository;
        private readonly RolesPorPantallaRepository _rolesPorPantallaRepository;
        private readonly RolesRepository _rolesRepository;
        private readonly PantallasRepository _pantallasRepository;
        private readonly UsuariosHistorialRepository _usuariosHistorialRepository;

        public AccesoServices(PantallasRepository pantallasRepository, RolesRepository rolesRepository, RolesPorPantallaRepository rolesPorPantallaRepository, UsuariosRepository usuariosRepository, UsuariosHistorialRepository usuariosHistorialRepository)
        {
            _usuariosRepository = usuariosRepository;
            _rolesPorPantallaRepository = rolesPorPantallaRepository;
            _rolesRepository = rolesRepository;
            _pantallasRepository = pantallasRepository;
            _usuariosHistorialRepository = usuariosHistorialRepository;
        }

        #region Usuarios Historial
        #endregion

        #region Usuarios

        public ServiceResult IniciarSesion(string usua_Nombre, string usua_Contrasenia)
        {
            var resultado = new ServiceResult();
            try
            {
                var usuario = _usuariosRepository.Login(usua_Nombre, usua_Contrasenia);

                if (usuario.usua_Nombre == null)
                    return resultado.Forbidden("El usuario o contraseña son incorrectos");
                else
                    return resultado.Ok(usuario);
            } 
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ListarUsuarios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuariosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.usua_Nombre != "")
                {
                    var map = _usuariosRepository.Insert(item);
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
                if (item.usua_Nombre != "")
                {
                    var map = _usuariosRepository.Update(item);
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
                    var map = _usuariosRepository.Delete(item);
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
        public IEnumerable<tbRolesXPantallas> Pantallas_Por_Rol(tbRolesXPantallas item)
        {
            try
            {
                var list = _rolesPorPantallaRepository.List();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbRolesXPantallas>();
            }
        }
        public IEnumerable<tbRolesXPantallas> PantallasPorRoleView(tbRolesXPantallas item)
        {
            try
            {
                var list = _rolesPorPantallaRepository.List();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbRolesXPantallas>();
            }
        }
        
        //public IEnumerable<tbRolesXPantallas> FindRoles(tbRolesXPantallas item)
        //{
        //    try
        //    {
        //        var list = _rolesPorPantallaRepository.Find(item.pant_Id);
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {

        //        return Enumerable.Empty<tbRolesXPantallas>();
        //    }
        //}
        public RequestStatus InsertarRolxPantalla(tbRolesXPantallas item)
        {
            try
            {
                var respuesta = _rolesPorPantallaRepository.Insert(item);
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
        public RequestStatus ActualizarRolxPantalla(tbRolesXPantallas item)
        {
            try
            {
                var respuesta = _rolesPorPantallaRepository.Update(item);
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
        public RequestStatus DeleteRolxPantalla(tbRolesXPantallas item)
        {
            try
            {
                var respuesta = _rolesPorPantallaRepository.Delete(item);
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
        public IEnumerable<tbRoles> ListarRoles()
        {
            try
            {
                var list = _rolesRepository.List();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbRoles>();
            }
        }

        //public IEnumerable<tbRoles> FindRol(tbRoles item)
        //{
        //    try
        //    {
        //        var list = _rolesRepository.Find(item);
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {

        //        return Enumerable.Empty<tbRoles>();
        //    }
        //}

        public RequestStatus InsertarRol(tbRoles item)
        {
            try
            {
                var respuesta = _rolesRepository.Insert(item);
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
        public RequestStatus ActualizarRol(tbRoles item)
        {
            try
            {
                var respuesta = _rolesRepository.Update(item);
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
        public RequestStatus DeleteRol(tbRoles item)
        {
            try
            {
                var respuesta = _rolesRepository.Delete(item);
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

        public IEnumerable<tbPantallas> ListarPantallas()
        {
            try
            {
                var list = _pantallasRepository.List();
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbPantallas>();
            }
        }
        #endregion

        #region Login
        //public ServiceResult ValidarLogin(tbUsuarios item)
        //{
        //    var resultado = new ServiceResult();

        //    try
        //    {
        //        var usuario = _usuariosRepository.ValidarLogin(item);
        //        return resultado.Ok(usuario);
        //    }
        //    catch (Exception ex)
        //    {
        //        return resultado.Error(ex.Message);
        //    }
        //}


        //public ServiceResult CambiaContra(tbUsuarios item)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        if (item.usua_Usuario != "")
        //        {
        //            var map = _usuariosRepository.CambiaContra(item);
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

      
        #endregion*/
    }
}
