using AutoMapper;
using SIMEXPRO.API.Models;
using SIMEXPRO.API.Models.ModelsAcceso;
using SIMEXPRO.API.Models.ModelsAduana;
using SIMEXPRO.API.Models.ModelsProduccion;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events_Company_R.API.Extentions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            #region Generales
            CreateMap<AldeasViewModel, tbAldeas>().ReverseMap();
            CreateMap<CargosViewModel, tbCargos>().ReverseMap();
            CreateMap<CiudadesViewModel, tbCiudades>().ReverseMap();
            CreateMap<ColoniasViewModel, tbColonias>().ReverseMap();
            CreateMap<EmpleadosViewModel, tbEmpleados>().ReverseMap();
            CreateMap<EstadosCivilesViewModel, tbEstadosCiviles>().ReverseMap();
            CreateMap<Formas_EnvioViewModel, tbFormas_Envio>().ReverseMap();
            CreateMap<MonedasViewModel, tbMonedas>().ReverseMap();
            CreateMap<OficinasViewModel, tbOficinas>().ReverseMap();
            CreateMap<Oficio_ProfesionesViewModel, tbOficio_Profesiones>().ReverseMap();
            CreateMap<PaisesViewModel, tbPaises>().ReverseMap();
            CreateMap<ProveedoresViewModel, tbProveedores>().ReverseMap();
            CreateMap<ProvinciasViewModel, tbProvincias>().ReverseMap();
            CreateMap<UnidadMedidaViewModel, tbUnidadMedidas>().ReverseMap();
            #endregion

            #region Aduana
            CreateMap<AduanasViewModel, tbAduanas>().ReverseMap();
            CreateMap<ArancelesViewModel, tbAranceles>().ReverseMap();
            CreateMap<BaseCalculosViewModel, tbBaseCalculos>().ReverseMap();
            CreateMap<BoletinPagoViewModel, tbBoletinPago>().ReverseMap();
            CreateMap<CodigoImpuestoViewModel, tbCodigoImpuesto>().ReverseMap();
            CreateMap<CondicionesComercialesViewModel, tbComercianteIndividual>().ReverseMap();

            CreateMap<TransportesViewModel, tbTransporte>().ReverseMap();
            CreateMap<TiposIdentificacionViewModel, tbTiposIdentificacion>().ReverseMap();
            CreateMap<TipoLiquidacionViewModel, tbTipoLiquidacion>().ReverseMap();
            CreateMap<TipoIntermediarioViewModel, tbTipoIntermediario>().ReverseMap();
            CreateMap<TipoDocumentoViewModel, tbTipoDocumento>().ReverseMap();
            CreateMap<PersonasViewModel, tbPersonas>().ReverseMap();
            CreateMap<PersonaNaturalViewModel, tbPersonaNatural>().ReverseMap();
            CreateMap<ConceptoPagoViewModel, tbConceptoPago>().ReverseMap();
            #endregion

            #region Producción

            CreateMap<AreasViewModel, tbArea>().ReverseMap();
            CreateMap<AsignacionesOrdenViewModel, tbAsignacionesOrden>().ReverseMap();
            CreateMap<AsignacionesOrdenDetalleViewModel, tbAsignacionesOrdenDetalle>().ReverseMap();
            CreateMap<CategoriaViewModel, tbCategoria>().ReverseMap();
            CreateMap<ClientesViewModel, tbClientes>().ReverseMap();
            CreateMap<ColoresViewModel, tbColores>().ReverseMap();

            CreateMap<ProcesosViewModel, tbProcesos>().ReverseMap();
            CreateMap<ReporteModuloDiaViewModel, tbReporteModuloDia>().ReverseMap();

            CreateMap<ReporteModuloDiaDetalleViewModel, tbReporteModuloDiaDetalle>().ReverseMap();
            CreateMap<RevisionDeCalidadViewModel, tbRevisionDeCalidad>().ReverseMap();
            CreateMap<SubCategoriaViewModel, tbSubcategoria>().ReverseMap();
            CreateMap<EstilosViewModel, tbEstilos>().ReverseMap();
            CreateMap<FuncionesMaquinaViewModel, tbFuncionesMaquina>().ReverseMap();
            CreateMap<TallasViewModel, tbTallas>().ReverseMap();
            CreateMap<TipoEmbalajeViewModel, tbTipoEmbalaje>().ReverseMap();


            CreateMap<tbModulos, ModulosViewModel>().ReverseMap();
            CreateMap<tbOrde_Ensa_Acab_Etiq, OrdeEnsaAcabEtiqViewModel>().ReverseMap();
            CreateMap<tbOrdenCompra, OrdenCompraViewModel>().ReverseMap();
            CreateMap<tbOrdenCompraDetalles, OrdenCompraDetalleViewModel>().ReverseMap();
            CreateMap<tbPedidosOrden, PedidosOrdenViewModel>().ReverseMap();
            CreateMap<tbPedidosOrdenDetalle, PedidosOrdenDetalleViewModel>().ReverseMap();
            CreateMap<tbPedidosProduccion, PedidosProduccionViewModel>().ReverseMap();
            CreateMap<tbPedidosProduccionDetalles, PedidosProduccionDetalleViewModel>().ReverseMap();

            #endregion

            #region Acceso
            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            CreateMap<PantallasViewModel, tbPantallas>().ReverseMap();
            CreateMap<RolesViewModel, tbRoles>().ReverseMap();
            CreateMap<RolesPorPantallasViewModel, tbRolesXPantallas>().ReverseMap();

            #endregion

        }
    }
}
