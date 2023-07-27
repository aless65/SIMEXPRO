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

            #region Login
            public static string IniciarSesion      = "Acce.UDP_IniciarSesion";
            public static string CambiarContrasena  = "Acce.UDP_CambiarContrasena";
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

        #region Empleados
        public static string ListarEmpleados    = "Gral.UDP_tbEmpleados_Listar";
        public static string InsertarEmpleados  = "gral.UDP_tbEmpleados_Insertar";
        public static string EditarEmpleados    = "gral.UDP_tbEmpleados_Editar";
        public static string EliminarEmpleados  = "gral.UDP_tbEmpleados_Eliminar";
        #endregion

        #region Unidad de Medidas
        public static string ListarUnidadMedidas    = "Gral.UDP_tbUnidadMedidas_Listar";
        public static string InsertarUnidadMedidas  = "Gral.UDP_tbUnidadMedidas_Insertar";
        public static string EditarUnidadMedidas    = "Gral.UDP_tbUnidadMedidas_Editar";
        public static string EliminarUnidadMedidas  = "Gral.UDP_tbUnidadMedidas_Eliminar";
        #endregion


        #endregion


        #region Aduanas


        #endregion


        #region Produccion

        #region Procesos
        public static string ListarProcesos     = "Prod.UDP_tbProcesos_Listar";
        public static string InsertarProcesos   = "Prod.UDP_tbProcesos_Insertar";
        public static string EditaProcesos      = "Prod.UDP_tbProcesos_Editar";
        public static string EliminarProcesis   = "Prod.UDP_tbProcesos_Eliminar";
        #endregion

        #region Reporte Modulo del Dia
        public static string ListarReporteModuloDia     = "Prod.UDP_tbReporteModuloDia_Listar";
        public static string InsertarReporteModuloDia   = "Prod.UDP_tbReporteModuloDia_Insertar";
        public static string EditarReporteModuloDia     = "Prod.UDP_tbReporteModuloDia_Editar";

        #endregion

        #region Reporte Modulo del Dia Detalle
        public static string ListarReporteModuloDiaDetalle      = "Prod.UDP_tbReporteModuloDiaDetalle_Listar";
        public static string InsertarReporteModuloDiaDetalle    = "Prod.UDP_tbReporteModuloDiaDetalle_Insertar";
        public static string EditarReporteModuloDiaDetalle      = "Prod.UDP_tbReporteModuloDiaDetalle_Editar";
        #endregion

        #region Revision de Calidad
        public static string ListarRevisionDeCalidad    = "Prod.UDP_tbRevisionDeCalidad_Listar";
        public static string InsertaRevisionDeCalidad   = "Prod.UDP_tbRevisionDeCalidad_Insertar";
        public static string EditarRevisionDeCalidad    = "Adua.UDP_tbRevisionDeCalidad_Editar";
        #endregion

        #region Sub Categoria
        public static string ListarSubCategoria     = "Prod.UDP_tbSubcategoria_Listar";
        public static string InsertarSubCategoria   = "Prod.UDP_tbSubcategoria_Insertar";
        public static string EditarSubCategoria     = "Prod.UDP_tbSubcategoria_Editar";
        public static string EliminarSubCategoria   = "Prod.UDP_tbSubcategoria_Eliminar";
        #endregion

        #region Tallas
        public static string ListarTallas   = "Prod.UDP_tbTallas_Listar";
        public static string InsertarTallas = "Prod.UDP_tbTallas_Insertar";
        public static string EditarTallas   = "Prod.UDP_tbTallas_Editar";
        #endregion

        #region Tipo Embalaje
        public static string ListarTipoEmbalaje     = "Prod.UDP_tbTipoEmbalaje_Listar";
        public static string InsertarTipoEmbalaje   = "Prod.UDP_tbTipoEmbalaje_Insertar";
        public static string EditarTipoEmbalaje     = "Prod.UDP_tbTipoEmbalaje_Editar";
        public static string EliminarTipoEmbalaje   = "Prod.UDP_tbTipoEmbalaje_Eliminar";
        #endregion

        #region Areas
        public static string ListarAreas    =   "Prod.UDP_tbArea_Listar";
        public static string InsertarAreas  =   "Prod.UDP_tbArea_Insertar";
        public static string EditarAreas    =   "Prod.UDP_tbArea_Editar";
        public static string ElininarAreas  =   "Prod.UDP_tbArea_Eliminar";
        #endregion

        #region Asignaciones Orden
        public static string ListarAsignacionesOrden    = "Prod.UDP_tbAsignacionesOrden_Listado";
        public static string InsertarAsignacinesOrden   = "Prod.UDP_tbAsignacionesOrden_Insertar";
        public static string EditarAsignacionesOrden    = "Prod.UDP_tbAsignacionesOrden_Editar";
        public static string EliminarAsignacionesOrden  = "Prod.UDP_tbAsignacionesOrden_Eliminar";
        #endregion

        #region Asignaciones Orden Detalle
        public static string ListarAsignacionesOrdenDetalle     = "Prod.UDP_tbAsignacionesOrdenDetalle_Listado";
        public static string InsertarAsignacinesOrdenDetalle    = "Prod.UDP_tbAsignacionesOrdenDetalle_Insertar";
        public static string EditarAsignacionesOrdenDetalle     = "Prod.UDP_tbAsignacionesOrdenDetalle_Editar";
        public static string EliminarAsignacionesOrdenDetalle   = "Prod.UDP_tbAsignacionesOrdenDetalle_Eliminar";
        #endregion

        #region Categorias
        public static string ListarCategorias       =   "prod.UDP_tbCategoria_Listar";
        public static string InsertarCategorias     =   "prod.UDP_tbCategoria_Insertar";
        public static string EditarCategorias       =   "prod.UDP_tbCategoria_Editar";
        public static string EliminarCategorias     =   "prod.UDP_tbCategoria_Eliminar";
        #endregion

        #region Clientes
        public static string ListarClientes         =   "Prod.UDP_tbClientes_Listar";
        public static string InsertarClientes       =   "prod.UDP_tbClientes_Insertar";
        public static string EditarClientes         =   "Prod.UDP_tbClientes_Editar";
        public static string EliminarClientes       =   "Prod.UDP_tbClientes_Eliminar";
        #endregion

        #region Colores
        public static string ListarColores      =   "Prod.UDP_tbColores_Listar";
        public static string InsertarColores    =   "Prod.UDP_tbColores_Insertar";
        public static string EditarColores      =   "Prod.UDP_tbColores_Editar";
        public static string EliminarColores    =   "Prod.UDP_tbColores_Eliminar";
        #endregion
        
        #region Estilos
        public static string ListarEstilos      =   "Prod.UDP_tbEstilos_Listar";
        public static string InsertarEstilos    =   "Prod.UDP_tbEstilos_Insertar";
        public static string EditarEstilos      =   "Prod.UDP_tbEstilos_Editar";
        public static string EliminarEstilos    =   "Prod.UDP_tbEstilos_Eliminar";
        #endregion

        #region Funciones Maquinas
        public static string ListarFuncionesMaquinas        = "prod.UDP_tbFuncionesMaquina_Listar";
        public static string InsertarFuncionesMaquinas      = "prod.UDP_tbFuncionesMaquina_Insertar";
        public static string EditarFuncionesMaquinas        = "prod.UDP_tbFuncionesMaquina_Editar";
        public static string EliminarFuncionesMaquinas      = "prod.UDP_tbFuncionesMaquina_Eliminar";
        #endregion

        #region Lotes
        public static string ListarLotes    = "Prod.UDP_tbLotes_Listar";
        public static string InsertarLotes  = "Prod.UDP_tbLotes_Insertar";
        public static string EditarLotes    = "Prod.UDP_tbLotes_Editar";
        public static string EliminarLotes  = "Prod.UDP_tbLotes_Eliminar";
        #endregion
        
        #region Maquinas
        public static string ListarMaquinas    = "Prod.UDP_tbMaquinas_Listar";
        public static string InsertarMaquinas  = "Prod.UDP_tbMaquinas_Insertar";
        public static string EditarMaquinas    = "Prod.UDP_tbMaquinas_Editar";
        public static string EliminarMaquinas  = "Prod.UDP_tbMaquinas_Eliminar";
        #endregion
        
        #region Marcas Maquina
        public static string ListarMarcasMaquina    = "Prod.UDP_tbMarcasMaquinas_Listar";
        public static string InsertarMarcasMaquina  = "Prod.UDP_tbMarcasMaquina_Insertar";
        public static string EditarMarcasMaquina    = "Prod.UDP_tbMarcasMaquina_Editar";
        public static string EliminarMarcasMaquina  = "Prod.UDP_tbMarcasMaquina_Eliminar";
        #endregion
        
        #region Materiales
        public static string ListarMateriales    = "Prod.UDP_tbMateriales_Listar";
        public static string InsertarMateriales  = "Prod.UDP_tbMateriales_Insertar";
        public static string EditarMateriales    = "Prod.UDP_tbMateriales_Editar";
        public static string EliminarMateriales  = "Prod.UDP_tbMateriales_Eliminar";
        #endregion
        
        #region Materiales Brindar
        public static string ListarMaterialesBrindar    = "prod.UDP_tbMaterialesBrindar_Listar";
        public static string InsertarMaterialesBrindar  = "prod.UDP_tbMaterialesBrindar_Insertar";
        public static string EditarMaterialesBrindar    = "prod.UDP_tbMaterialesBrindar_Editar";
        #endregion

        #region Modelos Maquina
        public static string ListarModelosMaquina       =   "Prod.UDP_tbModelosMaquina_Listar";
        public static string InsertarModelosMaquina     =   "Prod.UDP_tbModelosMaquina_Insertar";
        public static string EditarModelosMaquina       =   "Prod.UDP_tbModelosMaquina_Editar";
        public static string EliminarModelosMaquina     =   "Prod.UDP_tbModelosMaquina_Eliminar";
        #endregion

        #region Orden Ensamblado - Acabado - Etiquetado
        public static string ListarOrde_Ensa_Acab_Etiq      = "Prod.UDP_tbOrde_Ensa_Acab_Etiq_Listar";
        public static string InsertarOrde_Ensa_Acab_Etiq    = "Prod.UDP_tbOrde_Ensa_Acab_Etiq_Insertar";
        public static string EditarOrde_Ensa_Acab_Etiq      = "Prod.UDP_tbOrde_Ensa_Acab_Etiq_Editar";
        #endregion

        #region Orden de Compra
        public static string ListarOrdenCompra      = "Prod.UDP_tbOrdenCompra_Listado";
        public static string InsertarOrdenCompra    = "Prod.UDP_tbOrdenCompra_Insertar";
        public static string EditarOrdenCompra      = "Prod.UDP_tbOrdenCompra_Editar";
        #endregion

        #region Orden de Compra Detalles
        public static string ListarOrdenCompraDetalles      = "Prod.UDP_tbOrdenCompraDetalle_Listado";
        public static string InsertarOrdenCompraDetalles    = "Prod.UDP_tbOrdenCompraDetalles_Insertar";
        public static string EditarOrdenCompraDetalles      = "Prod.UDP_tbOrdenCompraDetalles_Editar";
        #endregion
        
        #region Orden de Pedido
        public static string ListarPedidosOrden      = "Prod.UDP_tbPedidosOrden_Listar";
        public static string InsertarPedidosOrden    = "Prod.UDP_tbPedidosOrden_Insertar";
        public static string EditarPedidosOrden      = "Prod.UDP_tbPedidosOrden_Editar";
        #endregion
        
        #region Orden de Pedido Detalles
        public static string ListarPedidosOrdenDetalles     = "Prod.UDP_tbPedidosOrdenDetalle_Listar";
        public static string InsertarPedidosOrdenDetalles   = "Prod.UDP_tbPedidosOrdenDetalle_Insertar";
        public static string EditarPedidosOrdenDetalles     = "Prod.UDP_tbPedidosOrdenDetalle_Editar";
        #endregion
        
        #region Pedidos Produccion
        public static string ListarPedidosProduccion        = "Prod.UDP_tbPedidosProduccion_Listar";
        public static string InsertarPedidosProduccion      = "Prod.UDP_tbPedidosProduccion_Insertar";
        public static string EditarPedidosProduccion        = "Prod.UDP_tbPedidosProduccion_Editar";
        #endregion
        
        #region Pedidos Produccion Detalles
        public static string ListarPedidosProduccionDetalles    = "Prod.UDP_tbPedidosProduccionDetalle_Listar";
        #endregion




        #endregion

        #region Ejemplos
        /*ppublic static string Listar = "acce.UDP_VW_tbUsuarios_Listar";
        public static string Insertar = "acce.UDP_tbUsuarios_Insertar";
        public static string Editar = "acce.UDP_tbUsuarios_Editar";
        public static string Eliminar = "acce.UDP_tbUsuarios_Eliminar";*/

        #endregion

    }


}

