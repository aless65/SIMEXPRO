using AutoMapper;
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

            CreateMap<EstadosCivilesViewModel, tbEstadosCiviles>().ReverseMap();

        }
    }
}
