﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Models.ModelsProduccion
{
    public class ImpuestoProdViewModel
    {
        public int impr_Id { get; set; }
        public string impr_Descripcion { get; set; }
        public decimal? impr_Valor { get; set; }
    }
}
