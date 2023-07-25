
using Microsoft.Extensions.DependencyInjection;
using SIMEXPRO.BussinessLogic.Services.GeneralServices;
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
