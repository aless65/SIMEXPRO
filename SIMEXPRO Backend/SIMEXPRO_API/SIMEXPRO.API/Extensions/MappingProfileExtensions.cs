﻿using AutoMapper;
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
            CreateMap<TransportesViewModel, tbTransporte>().ReverseMap();
            CreateMap<TiposIdentificacionViewModel, tbTiposIdentificacion>().ReverseMap();
            CreateMap<TipoLiquidacionViewModel, tbTipoLiquidacion>().ReverseMap();
            CreateMap<TipoIntermediarioViewModel, tbTipoIntermediario>().ReverseMap();
            CreateMap<TipoDocumentoViewModel, tbTipoDocumento>().ReverseMap();
            CreateMap<PersonasViewModel, tbPersonas>().ReverseMap();
            CreateMap<PersonaNaturalViewModel, tbPersonaNatural>().ReverseMap();            
            #endregion

            #region Producción
            CreateMap<ProcesosViewModel, tbProcesos>().ReverseMap();
            CreateMap<ReporteModuloDiaViewModel, tbReporteModuloDia>().ReverseMap();
            #endregion

            #region Acceso

            #endregion

            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            CreateMap<PantallasViewModel, tbPantallas>().ReverseMap();
            CreateMap<RolesViewModel, tbRoles>().ReverseMap();
            CreateMap<RolesPorPantallasViewModel, tbRolesXPantallas>().ReverseMap();
        }
    }
}
