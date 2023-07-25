﻿using AutoMapper;
using SIMEXPRO.API.Models;
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

        }
    }
}
