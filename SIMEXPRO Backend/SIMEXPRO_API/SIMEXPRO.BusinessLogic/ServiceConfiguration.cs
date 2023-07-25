
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
            services.AddScoped<EstadosCivilesRepository>();


             //General

             
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
