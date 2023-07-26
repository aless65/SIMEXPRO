
using SIMEXPRO.DataAccess.Repositories.Adua;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.BussinessLogic.Services.EventoServices
{
    public class AduanaServices
    {
        private readonly AduanasRepository                          _AduanasRepository;
        private readonly AracelesRepository                         _AracelesRepository;
        private readonly BaseCalculosHistorialRepository            _baseCalculosHistorialRepository;
        private readonly BaseCalculosRepository                     _baseCalculosRepository;
        private readonly BoletinPagoRepository                      _boletinPagoRepository;
        private readonly CodigoImpuestoRepository                   _codigoImpuestoRepository;
        private readonly ComercianteIndividualRepository            _comercianteIndividualRepository;
        private readonly ConceptoPagoRepository                     _conceptoPagoRepository;
        private readonly CondicionesRepository                      _condicionesRepository;
        private readonly CondicionesHistorialRepository             _condicionesHistorialRepository;
        private readonly CondicionesComercialesRepository           _condicionesComercialesRepository;
        private readonly ConductorRepository                        _conductorRepository;
        private readonly Declaraciones_ValorHistorialRepository     _declaraciones_ValorHistorialRepository;
        private readonly Declaraciones_ValorRepository              _declaraciones_ValorRepository;
        private readonly DeclarantesRepository                      _declarantesRepository;
        private readonly DocumentosContratosRepository              _documentosContratosRepository;
        private readonly DocumentosdeSoporteRepository              _documentosdeSoporteRepository;
        private readonly DocumentosPDFHistorialRepository           _documentosPDFHistorialRepository;
        private readonly DocumentosPDFRepository                    _documentosPDFRepository;
        private readonly DucaHistorialRepository                    _ducaHistorialRepository;
        private readonly DucaRepository                             _ducaRepository;
        private readonly EstadoBoletinRepository                    _estadoBoletinRepository;
        private readonly EstadoMercanciasRepository                 _estadoMercanciasRepository;
        private readonly FacturasHistorialRepository                _facturasHistorialRepository;
        private readonly FacturasRepository                         _facturasRepository;
        private readonly FormasdePagoRepository                     _formasdePagoRepository;
        private readonly ImportadoresRepository                     _importadoresRepository;
        private readonly ImpuestosporAracelRepository               _impuestosporAracelRepository;
        private readonly ImpuestosRepository                        _impuestosRepository;
        private readonly IncotermRepository                         _incotermRepository;
        private readonly IntermediarioRepository                    _intermediarioRepository;
        private readonly ItemsHistorialRepository                   _itemsHistorialRepository;
        private readonly ItemsRepository                            _itemsRepository;
        private readonly LiquidacionGeneralHistorialRepository      _liquidacionGeneralHistorialRepository;
        private readonly LiquidacionGeneralRepository               _liquidacionGeneralRepository;
        private readonly LiquidacionPorLineaRepository              _liquidacionPorLineaRepository;
        private readonly LugaresEmbarqueRepository                  _lugaresEmbarqueRepository;
        private readonly MarcasRepository                           _marcasRepository;
        private readonly ModoTransporteRepository                   _modoTransporteRepository;
        private readonly NivelesComercialesRepository               _nivelesComercialesRepository;
        private readonly PersonaJuridicaRepository                  _personaJuridicaRepository;
        private readonly PersonaNaturalRepository                   _personaNaturalRepository;
        private readonly PersonasRepository                         _personasRepository;
        private readonly ProveedoresDeclaracionRepository           _proveedoresDeclaracionRepository;
        private readonly TipoDocumentoRepository                    _tipoDocumentoRepository;
        private readonly TipoIntermediarioRepository                _tipoIntermediarioRepository;
        private readonly TipoLiquidacionRepository                  _tipoLiquidacionRepository;
        private readonly TiposIdentificacionRepository              _tiposIdentificacionRepository;
        private readonly TransporteRepository                       _transporteRepository;

        public AduanaServices(  AduanasRepository AduanasRepository, AracelesRepository AracelesRepository, BaseCalculosHistorialRepository BaseCalculosHistorialRepository, BaseCalculosRepository BaseCalculosRepository,  BoletinPagoRepository BoletinPagoRepository,
                                CodigoImpuestoRepository CodigoImpuestoRepository, ComercianteIndividualRepository ComercianteIndividualRepository, ConceptoPagoRepository ConceptoPagoRepository,
                                CondicionesRepository CondicionesRepository, CondicionesHistorialRepository CondicionesHistorialRepository, CondicionesComercialesRepository CondicionesComercialesRepository,
                                ConductorRepository ConductorRepository, Declaraciones_ValorHistorialRepository Declaraciones_ValorHistorialRepository, Declaraciones_ValorRepository Declaraciones_ValorRepository,
                                DeclarantesRepository DeclarantesRepository, DocumentosContratosRepository DocumentosContratosRepository, DocumentosdeSoporteRepository DocumentosdeSoporteRepository,
                                DocumentosPDFHistorialRepository DocumentosPDFHistorialRepository, DocumentosPDFRepository DocumentosPDFRepository, DucaHistorialRepository DucaHistorialRepository,
                                DucaRepository DucaRepository, EstadoBoletinRepository EstadoBoletinRepository, EstadoMercanciasRepository EstadoMercanciasRepository, FacturasHistorialRepository FacturasHistorialRepository,
                                FacturasRepository FacturasRepository, FormasdePagoRepository FormasdePagoRepository, ImportadoresRepository ImportadoresRepository, ImpuestosporAracelRepository ImpuestosporAracelRepository,
                                ImpuestosRepository ImpuestosRepository, IncotermRepository IncotermRepository, IntermediarioRepository IntermediarioRepository, ItemsHistorialRepository ItemsHistorialRepository,
                                ItemsRepository ItemsRepository, LiquidacionGeneralHistorialRepository LiquidacionGeneralHistorialRepository, LiquidacionGeneralRepository LiquidacionGeneralRepository,
                                LiquidacionPorLineaRepository LiquidacionPorLineaRepository, LugaresEmbarqueRepository LugaresEmbarqueRepository, MarcasRepository MarcasRepository, ModoTransporteRepository ModoTransporteRepository,
                                NivelesComercialesRepository NivelesComercialesRepository, PersonaJuridicaRepository PersonaJuridicaRepository, PersonaNaturalRepository PersonaNaturalRepository, PersonasRepository PersonasRepository,
                                ProveedoresDeclaracionRepository ProveedoresDeclaracionRepository, TipoDocumentoRepository TipoDocumentoRepository, TipoIntermediarioRepository TipoIntermediarioRepository,
                                TipoLiquidacionRepository TipoLiquidacionRepository, TiposIdentificacionRepository TiposIdentificacionRepository, TransporteRepository TransporteRepository)
        {
            _AduanasRepository = AduanasRepository;
            _AracelesRepository = AracelesRepository;
            _baseCalculosHistorialRepository = BaseCalculosHistorialRepository;
            _baseCalculosRepository = BaseCalculosRepository;
            _boletinPagoRepository = BoletinPagoRepository;
            _codigoImpuestoRepository = CodigoImpuestoRepository;
            _comercianteIndividualRepository = ComercianteIndividualRepository;
            _conceptoPagoRepository = ConceptoPagoRepository;
            _condicionesRepository = CondicionesRepository;
            _condicionesHistorialRepository = CondicionesHistorialRepository;
            _condicionesComercialesRepository = CondicionesComercialesRepository;
            _conductorRepository = ConductorRepository;
            _declaraciones_ValorHistorialRepository = Declaraciones_ValorHistorialRepository;
            _declaraciones_ValorRepository = Declaraciones_ValorRepository;
            _declarantesRepository = DeclarantesRepository;
            _documentosContratosRepository = DocumentosContratosRepository;
            _documentosdeSoporteRepository = DocumentosdeSoporteRepository;
            _documentosPDFHistorialRepository = DocumentosPDFHistorialRepository;
            _documentosPDFRepository = DocumentosPDFRepository;
            _ducaHistorialRepository = DucaHistorialRepository;
            _ducaRepository = DucaRepository;
            _estadoBoletinRepository = EstadoBoletinRepository;
            _estadoMercanciasRepository = EstadoMercanciasRepository; 
            _facturasHistorialRepository = FacturasHistorialRepository;
            _facturasRepository = FacturasRepository;
            _formasdePagoRepository = FormasdePagoRepository;
            _importadoresRepository = ImportadoresRepository;
            _impuestosporAracelRepository = ImpuestosporAracelRepository;
            _impuestosRepository = ImpuestosRepository;
            _incotermRepository = IncotermRepository;
            _intermediarioRepository = IntermediarioRepository;
            _itemsHistorialRepository = ItemsHistorialRepository;
            _itemsRepository = ItemsRepository;
            _liquidacionGeneralHistorialRepository = LiquidacionGeneralHistorialRepository;
            _liquidacionGeneralRepository = LiquidacionGeneralRepository;
            _liquidacionPorLineaRepository = LiquidacionPorLineaRepository;
            _lugaresEmbarqueRepository = LugaresEmbarqueRepository;
            _marcasRepository = MarcasRepository;
            _modoTransporteRepository = ModoTransporteRepository;
            _nivelesComercialesRepository = NivelesComercialesRepository;
            _personaJuridicaRepository = PersonaJuridicaRepository;
            _personaNaturalRepository = PersonaNaturalRepository; 
            _personasRepository = PersonasRepository;
            _proveedoresDeclaracionRepository = ProveedoresDeclaracionRepository;
            _tipoDocumentoRepository = TipoDocumentoRepository;
            _tipoIntermediarioRepository = TipoIntermediarioRepository;
            _tipoLiquidacionRepository = TipoLiquidacionRepository;
            _tiposIdentificacionRepository = TiposIdentificacionRepository;
            _transporteRepository = TransporteRepository;
        }


    }
}
