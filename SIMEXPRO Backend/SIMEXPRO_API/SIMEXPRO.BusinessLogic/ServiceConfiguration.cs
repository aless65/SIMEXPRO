
using Microsoft.Extensions.DependencyInjection;
using SIMEXPRO.BussinessLogic.Services.GeneralServices;
using SIMEXPRO.DataAccess.Repositories.Adua;
using SIMEXPRO.DataAccess.Repositories.Gral;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.BussinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection services, string connection)
        {
            SIMEXPRO.DataAccess.SIMEXPRO.BuildConnectionString(connection);

            //Acceso
            //services.AddScoped<PantallasRepository>();
            //services.AddScoped<RolesPorPantallaRepository>();
            //services.AddScoped<RolesRepository>();
            //services.AddScoped<UsuariosRepository>();

            //Aduanas
            services.AddScoped<AduanasRepository>();
            services.AddScoped<AracelesRepository>();
            services.AddScoped<BaseCalculosHistorialRepository>();
            services.AddScoped<BaseCalculosRepository>();
            services.AddScoped<BoletinPagoRepository>();
            services.AddScoped<CodigoImpuestoRepository>();
            services.AddScoped<ComercianteIndividualRepository>();
            services.AddScoped<ConceptoPagoRepository>();
            services.AddScoped<CondicionesRepository>();
            services.AddScoped<CondicionesHistorialRepository>();
            services.AddScoped<CondicionesComercialesRepository>();
            services.AddScoped<ConductorRepository>();
            services.AddScoped<Declaraciones_ValorHistorialRepository>();
            services.AddScoped<Declaraciones_ValorRepository>();
            services.AddScoped<DeclarantesRepository>();
            services.AddScoped<DocumentosContratosRepository>();
            services.AddScoped<DocumentosdeSoporteRepository>();
            services.AddScoped<DocumentosPDFHistorialRepository>();
            services.AddScoped<DocumentosPDFRepository>();
            services.AddScoped<DucaHistorialRepository>();
            services.AddScoped<DucaRepository>();
            services.AddScoped<EstadoBoletinRepository>();
            services.AddScoped<EstadoMercanciasRepository>();
            services.AddScoped<FacturasHistorialRepository>();
            services.AddScoped<FacturasRepository>();
            services.AddScoped<FormasdePagoRepository>();
            services.AddScoped<ImportadoresRepository>();
            services.AddScoped<ImpuestosporAracelRepository>();
            services.AddScoped<ImpuestosRepository>();
            services.AddScoped<IncotermRepository>();
            services.AddScoped<IntermediarioRepository>();
            services.AddScoped<ItemsHistorialRepository>();
            services.AddScoped<ItemsRepository>();
            services.AddScoped<LiquidacionGeneralHistorialRepository>();
            services.AddScoped<LiquidacionGeneralRepository>();
            services.AddScoped<LiquidacionPorLineaRepository>();
            services.AddScoped<LugaresEmbarqueRepository>();
            services.AddScoped<MarcasRepository>();
            services.AddScoped<ModoTransporteRepository>();
            services.AddScoped<NivelesComercialesRepository>();
            services.AddScoped<PersonaJuridicaRepository>();
            services.AddScoped<PersonaNaturalRepository>();
            services.AddScoped<PersonasRepository>();
            services.AddScoped<ProveedoresDeclaracionRepository>();
            services.AddScoped<TipoDocumentoRepository>();
            services.AddScoped<TipoIntermediarioRepository>();
            services.AddScoped<TipoLiquidacionRepository>();
            services.AddScoped<TiposIdentificacionRepository>();
            services.AddScoped <TransporteRepository>();

            //General
            services.AddScoped<AldeasRepository>();
            services.AddScoped<CargosRepository>();
            services.AddScoped<CiudadesRepository>();
            services.AddScoped<ColoniasRepository>();
            services.AddScoped<EmpleadosRepository>();
            services.AddScoped<EstadosCivilesRepository>();
            services.AddScoped<FormasEnvioRepository>();
            services.AddScoped<MonedasRepository>();
            services.AddScoped<OficinasRepository>();
            services.AddScoped<OficioProfesionesRepository>();
            services.AddScoped<PaisesRepository>();
            services.AddScoped<ProveedoresRepository>();
            services.AddScoped<ProvinciasRepository>();
            services.AddScoped<UnidadMedidasRepository>();


            //Produccion


            //services.AddScoped<GraficaRepository>();

        }


        public static void BussinessLogic(this IServiceCollection services)
        {
            services.AddScoped<GeneralServices>();
            //services.AddScoped<AccesoServices>();
            services.AddScoped<ProduccionServices>();
            //services.AddScoped<ProduccionAduanas>(); 
        }
    }
}
