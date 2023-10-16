﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SIMEXPRO.API.Models.ModelsProduccion;
using SIMEXPRO.BussinessLogic.Services.ProduccionServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Controllers.ControllersProduccion
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesController : ControllerBase
    {
        private readonly ProduccionServices _produccionServices;
        private readonly IMapper _mapper;

        public ReportesController(ProduccionServices produccionServices, IMapper mapper)
        {
            _produccionServices = produccionServices;
            _mapper = mapper;
        }

        [HttpPost("TiemposMaquinas")]
        public IActionResult maquinasTiempo(ReportesViewModel reporte)
        {
            var data = _mapper.Map<tbReportes>(reporte);
            var listado = _produccionServices.TiemposMaquinas(data);
            return Ok(listado);
        }
        
        [HttpPost("ProduccionPorModulo")]
        public IActionResult ModuloProduccion(ReportesViewModel reporte)
        {
            var data = _mapper.Map<tbReportes>(reporte);
            var listado = _produccionServices.ModuloProduccion(data);
            return Ok(listado);
        }

        [HttpPost("PedidosCliente")]
        public IActionResult PedidosCliente(ReportesViewModel reporte)
        {
            var data = _mapper.Map<tbReportes>(reporte);
            var listado = _produccionServices.PedidosCliente(data);
            return Ok(listado);
        }

        [HttpPost("PlanificacionPO")]
        public IActionResult PlanificacionPO(ReportesViewModel reporte)
        {
            var listado = _produccionServices.PlanificacionPO(reporte.orco_Id);
            return Ok(listado);
        }

        [HttpPost("CostosMaterialesNoBrindados")]
        public IActionResult CostosMaterialesNoBrindados(ReportesViewModel reporte)
        {
            var data = _mapper.Map<tbReportes>(reporte);
            var listado = _produccionServices.CostosMaterialesNoBrindados(data);
            return Ok(listado);
        }

        [HttpPost("Consumo_Materiales")]
        public IActionResult Consumo_Materiales(ReportesViewModel reporte)
        {
            var data = _mapper.Map<tbReportes>(reporte);
            var listado = _produccionServices.Consumo_Materiales(data);
            return Ok(listado);
        }

        [HttpPost("Maquina_Uso")]
        public IActionResult Maquina_Uso(MaquinasViewModel maquina)
        {
            var data = _mapper.Map<tbMaquinas>(maquina);
            var listado = _produccionServices.MaquinasUso(data);
            return Ok(listado);
        }

        [HttpPost("OrdenesDeCompraFecha")]
        public IActionResult OrdenesDeCompraFecha(OrdenCompraViewModel orden)
        {
            var data = _mapper.Map<tbOrdenCompra>(orden);
            var listado = _produccionServices.OrdenesCompraFecha(data);
            return Ok(listado);
        }

        [HttpPost("Inventario")]
        public IActionResult Inventario(MaterialesViewModel orden)
        {
            var data = _mapper.Map<tbMateriales>(orden);
            var listado = _produccionServices.Inventario(data);
            return Ok(listado);
        }


        [HttpGet("Importaciones")]
        public IActionResult Importaciones(DateTime fechaInicio, DateTime fechaFin)
        {
            //var data = _mapper.Map<tbDeclaraciones_Valor>(orden);
            var listado = _produccionServices.Importaciones(fechaInicio, fechaFin);
            return Ok(listado);
        }

        [HttpGet("DevasPendientes")]
        public IActionResult DEVAPendiente(DateTime fechaInicio, DateTime fechaFin)
        {
            //var data = _mapper.Map<tbDeclaraciones_Valor>(orden);
            var listado = _produccionServices.DevasPendientes(fechaInicio, fechaFin);
            return Ok(listado);
        }

        [HttpPost("MaterialesPorPO")]
        public IActionResult MaterialesPorPO(OrdenCompraViewModel orden)
        {
            var data = _mapper.Map<tbOrdenCompra>(orden);
            var listado = _produccionServices.MateriasDePO(data);
            return Ok(listado);
        }

        [HttpPost("ProduccionAreas")]
        public IActionResult ProduccionAreas(AreasViewModel orden)
        {
            var data = _mapper.Map<tbArea>(orden);
            var listado = _produccionServices.ProduccionAreas(data);
            return Ok(listado);
        }
        
        [HttpPost("MaterialesIngreso")]
        public IActionResult MaterialesIngreso(PedidosOrdenViewModel orden)
        {
            var data = _mapper.Map<tbPedidosOrden>(orden);
            var listado = _produccionServices.MaterialesIngreso(data);
            return Ok(listado);
        }

        [HttpGet("Contratos_Adhesion")]
        public IActionResult Contratos_Adhesion(DateTime fechaInicio, DateTime fechaFin, string Contrato)
        {
            //var data = _mapper.Map<tbDeclaraciones_Valor>(orden);
            var listado = _produccionServices.Contratos_Adhesion(fechaInicio, fechaFin, Contrato);
            return Ok(listado);
        }

        [HttpPost("SeguimientodeProcesosporPO")]
        public IActionResult SeguimientodeProcesosporPO(OrdenCompraDetalleViewModel ordenCompraDetalleViewModel)
        {
            var data = _mapper.Map<tbOrdenCompraDetalles>(ordenCompraDetalleViewModel);
            var listado = _produccionServices.SeguimientodePO(data);
            return Ok(listado);
        }


    }
}
