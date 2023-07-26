using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.DataAccess
{
    public class ScriptsDataBase
    {

        #region Acceso

            #region Usuarios
            public static string ListarUsuarios = "acce.UDP_VW_tbUsuarios_Listar";
            public static string InsertarUsuarios = "acce.UDP_tbUsuarios_Insertar";
            public static string EditarUsuarios = "acce.UDP_tbUsuarios_Editar";
            public static string EliminarUsuarios = "acce.UDP_tbUsuarios_Eliminar";
            #endregion

            #region Pantallas
            public static string ListarPantallas = "Acce.UDP_tbPantallas_Listar";
        #endregion

            #region Roles
            public static string ListarRoles        = "Acce.UDP_tbRoles_Listar";
            public static string InsertarRoles      = "Acce.UDP_tbRoles_Insertar";
            public static string EditarRoles        = "Acce.UDP_tbRoles_Editar";
            public static string EliminarRoles      = "Acce.UDP_tbRoles_Eliminar";
        #endregion

            #region RolesXPantallas
            public static string ListarRolesXPantallas      = "Acce.UDP_tbRolesXPantallas_Listar";
            public static string InsertarRolesXPantallas    = "Acce.UDP_tbRolesXPantallas_Insertar";
            public static string EditarRolesXPantallas      = "Acce.UDP_tbRolesXPantallas_Editar";
            public static string EliminarRolesXPantallas    = "Acce.UDP_tbRolesXPantallas_Eliminar";
            #endregion

        #endregion


        #region Generales

        #region Estados Civiles
        public static string ListarEstadosCiviles = "gral.UDP_tbEstadosCiviles_Listar";
        #endregion

        #region Oficinas
        public static string ListarOficinas = "gral.UDP_tbOficinas_Listar";
        public static string InsertarOficinas = "gral.UDP_tbOficinas_Insertar";
        public static string EditarOficinas = "gral.UDP_tbOficinas_Editar";
        public static string EliminarOficinas = "gral.UDP_tbOficinas_Eliminar";
        #endregion

        #region Oficio/Profesión
        public static string ListarOficioProfesion = "gral.UDP_tbOficio_Profesiones_Listar";
        public static string InsertarOficioProfesion = "gral.UDP_tbOficio_Profesiones_Insertar";
        public static string EditarOficioProfesion = "gral.UDP_tbOficio_Profesiones_Editar";
        #endregion

        #region Cargos
        public static string ListarCargos = "gral.UDP_tbCargos_Listar";
        public static string InsertarCargos = "gral.UDP_tbCargos_Insertar";
        public static string EditarCargos = "gral.UDP_tbCargos_Editar";
        #endregion

        #region Colonias
        public static string ListarColonias = "gral.UDP_tbColonias_Listar";
        public static string InsertarColonias = "gral.UDP_tbColonias_Insertar";
        public static string EditarColonias = "gral.UDP_tbColonias_Editar";
        #endregion

        #region Monedas
        public static string ListarMonedas = "gral.UDP_tbMonedas_Listar";
        public static string InsertarMonedas = "gral.UDP_tbMonedas_Insertar";
        public static string EditarMonedas = "gral.UDP_tbMonedas_Editar";
        #endregion

        #region Paises
        public static string ListarPaises = "Gral.UDP_tbPaises_Listar";
        public static string InsertarPaises = "Gral.UDP_tbPaises_Insertar";
        public static string EditarPaises = "Gral.UDP_tbPaises_Editar";
        #endregion

        #region Ciudades
        public static string ListarCiudades = "Gral.UDP_tbCiudades_Listar";
        public static string InsertarCiudades = "Gral.UDP_tbCiudades_Insertar";
        public static string EditarCiudades = "Gral.UDP_tbCiudades_Editar";
        #endregion

        #region Provincias
        public static string ListarProvincias = "Gral.UDP_tbProvincias_Listar";
        public static string InsertarProvincias = "GrAL.UDP_tbProvincias_Insertar";
        public static string EditarProvincias = "Gral.UDP_tbProvinvias_Editar";
        #endregion

        #region Aldeas
        public static string ListarAldeas = "Gral.UDP_tbAldeas_Listar";
        public static string InsertarAldeas = "Gral.UDP_tbAldeas_Insertar";
        public static string EditarAldeas = "Gral.UDP_tbAldeas_Editar";
        #endregion

        #region Proveedores
        public static string ListarProveedores = "Gral.UDP_tbProveedores_Listar";
        public static string InsertaProveedores = "Gral.UDP_tbProveedores_Insertar";
        public static string EditarProveedores = "Gral.UDP_tbProveedores_Editar";
        public static string EliminarProveedores = "Gral.UDP_tbProveedores_Eliminar";
        #endregion

        #region Formas de Envio
        public static string ListarFormasEnvio = "Gral.UDP_tbFormas_Envio_Listar";
        public static string InsertarFormasEnvio = "Gral.UDP_tbFormas_Envio_Insertar";
        public static string EditarFormasEnvio = "Gral.UDP_tbFormas_Envio_Editar";
        public static string EliminarFormasEnvio = "Gral.UDP_tbFormas_Envio_Eliminar";
        #endregion


        #endregion



        #region Ejemplos
        /*public static string ListarDetallesDirecciones = "gral.UDP_tbDirecciones_ListarDetalles ";
        public static string InsertarDirecciones = "gral.UDP_tbDirecciones_Insert";
        public static string EditarDirecciones = "gral.UDP_tbDirecciones_Update";
        public static string EliminarDirecciones = "gral.UDP_tbDirecciones_Delete";*/

        #endregion

    }


}

