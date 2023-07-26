
using SIMEXPRO.DataAccess.Repositories.Prod;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.BussinessLogic.Services.ProduccionServices
{
    public class ProduccionServices
    {        
        private readonly AreasRepository                        _areasRepository;
        private readonly AsignacionesOrdenDetalleRepository     _asignacionesOrdenDetalleRepository;
        private readonly AsignacionesOrdenRepository            _asignacionesOrdenRepository;
        private readonly CategoriasRepository                   _categoriasRepository;
        private readonly ClientesRepository                     _clientesRepository;
        private readonly ColoresRepository                      _coloresRepository;
        private readonly EstilosRepository                      _estilosRepository;
        private readonly FuncionesMaquinaRepository             _funcionesMaquinaRepository;
        private readonly LotesRepository                        _lotesRepository;
        private readonly MaquinaHistorialRepository             _maquinaHistorialRepository;
        private readonly MaquinasRepository                     _maquinasRepository;
        private readonly MarcasMaquinaRepository                _marcasMaquinaRepository;
        private readonly MaterialesBrindarRepository            _materialesBrindarRepository;
        private readonly MaterialesRepository                   _materialesRepository;
        private readonly ModelosMaquinaRepository               _modelosMaquinaRepository;
        private readonly ModulosRepository                      _modulosRepository;
        private readonly Orde_Ensa_Acab_EtiqRepository          _orde_Ensa_Acab_EtiqRepository;
        private readonly OrdenCompraDetallesRepository          _ordenCompraDetallesRepository;
        private readonly OrdenCompraRepository                  _ordenCompraRepository;
        private readonly PedidosOrdenDetallesRepository         _pedidosOrdenDetallesRepository;
        private readonly PedidosOrdenRepository                 _pedidosOrdenRepository;
        private readonly PedidosProduccionDetallesRepository    _pedidosProduccionDetallesRepository;
        private readonly PedidosProduccionRepository            _pedidosProduccionRepository;
        private readonly ProcesosRepository                     _procesosRepository;
        private readonly ReporteModuloDiaRepository             _reporteModuloDiaRepository;
        private readonly ReporteModuloDiaDetalleRepository      _reporteModuloDiaDetalleRepository;
        private readonly RevisionDeCalidadRepository            _revisionDeCalidadRepository;
        private readonly SubCategoriasRepository                _subCategoriasRepository;
        private readonly TallasRepository                       _tallasRepository;
        private readonly TipoEmbalajeRepository                 _tipoEmbalajeRepository;


        public ProduccionServices(  AreasRepository  areasRepository,                                 
                                    AsignacionesOrdenDetalleRepository asignacionesOrdenDetalleRepository,
                                    AsignacionesOrdenRepository asignacionesOrdenRepository,
                                    CategoriasRepository categoriasRepository,
                                    ClientesRepository clientesRepository,
                                    ColoresRepository coloresRepository,
                                    EstilosRepository estilosRepository,
                                    FuncionesMaquinaRepository funcionesMaquinaRepository,
                                    LotesRepository lotesRepository,
                                    MaquinaHistorialRepository maquinaHistorialRepository,
                                    MaquinasRepository maquinasRepository,
                                    MarcasMaquinaRepository marcasMaquinaRepository,
                                    MaterialesBrindarRepository materialesBrindarRepository,
                                    MaterialesRepository materialesRepository,
                                    ModelosMaquinaRepository modelosMaquinaRepository,
                                    ModulosRepository modulosRepository,
                                    Orde_Ensa_Acab_EtiqRepository orde_Ensa_Acab_EtiqRepository,
                                    OrdenCompraDetallesRepository ordenCompraDetallesRepository,
                                    OrdenCompraRepository ordenCompraRepository,
                                    PedidosOrdenDetallesRepository pedidosOrdenDetallesRepository,
                                    PedidosOrdenRepository pedidosOrdenRepository,
                                    PedidosProduccionDetallesRepository pedidosProduccionDetallesRepository,
                                    PedidosProduccionRepository pedidosProduccionRepository,
                                    ProcesosRepository procesosRepository,
                                    ReporteModuloDiaRepository reporteModuloDiaRepository,
                                    ReporteModuloDiaDetalleRepository reporteModuloDiaDetalleRepository,
                                    RevisionDeCalidadRepository revisionDeCalidadRepository,
                                    SubCategoriasRepository subCategoriasRepository,
                                    TallasRepository tallasRepository,
                                    TipoEmbalajeRepository tipoEmbalajeRepository )
        {


            _areasRepository = areasRepository;
            _asignacionesOrdenDetalleRepository = asignacionesOrdenDetalleRepository;
            _asignacionesOrdenRepository = asignacionesOrdenRepository;
            _categoriasRepository = categoriasRepository;
            _clientesRepository = clientesRepository;
            _coloresRepository = coloresRepository;
            _estilosRepository = estilosRepository;
            _funcionesMaquinaRepository = funcionesMaquinaRepository;
            _lotesRepository = lotesRepository;
            _maquinaHistorialRepository = maquinaHistorialRepository;
            _maquinasRepository = maquinasRepository;
            _marcasMaquinaRepository = marcasMaquinaRepository;
            _materialesBrindarRepository = materialesBrindarRepository;
            _materialesRepository = materialesRepository;
            _modelosMaquinaRepository = modelosMaquinaRepository;
            _modulosRepository = modulosRepository;
            _orde_Ensa_Acab_EtiqRepository = orde_Ensa_Acab_EtiqRepository;
            _ordenCompraDetallesRepository = ordenCompraDetallesRepository;
            _ordenCompraRepository = ordenCompraRepository;
            _pedidosOrdenDetallesRepository = pedidosOrdenDetallesRepository;
            _pedidosOrdenRepository = pedidosOrdenRepository;
            _pedidosProduccionDetallesRepository = pedidosProduccionDetallesRepository;
            _pedidosProduccionRepository = pedidosProduccionRepository;
            _procesosRepository = procesosRepository;
            _reporteModuloDiaRepository = reporteModuloDiaRepository;
            _reporteModuloDiaDetalleRepository = reporteModuloDiaDetalleRepository;
            _revisionDeCalidadRepository = revisionDeCalidadRepository;
            _subCategoriasRepository = subCategoriasRepository;
            _tallasRepository = tallasRepository;
            _tipoEmbalajeRepository = tipoEmbalajeRepository;


        }    
             
             
             
             
             
    }        
}            
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             