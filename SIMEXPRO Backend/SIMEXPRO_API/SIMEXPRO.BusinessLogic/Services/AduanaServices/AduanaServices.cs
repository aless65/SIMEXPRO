
using SIMEXPRO.DataAccess.Repositories.Adua;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIMEXPRO.BussinessLogic.Services.EventoServices
{
    public class AduanaServices
    {
        private readonly AduanasRepository                          _aduanasRepository;
        private readonly ArancelesRepository                        _arancelesRepository;
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

        public AduanaServices(  AduanasRepository AduanasRepository, ArancelesRepository ArancelesRepository, BaseCalculosHistorialRepository BaseCalculosHistorialRepository, BaseCalculosRepository BaseCalculosRepository,  BoletinPagoRepository BoletinPagoRepository,
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
            _aduanasRepository = AduanasRepository;
            _arancelesRepository = ArancelesRepository;
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
        #region Aduanas
        public ServiceResult ListarAduanas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _aduanasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarAduanas(tbAduanas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.adua_Nombre != "")
                {
                    var map = _aduanasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarAduanas(tbAduanas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.adua_Nombre != "")
                {
                    var map = _aduanasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarAduanas(tbAduanas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.adua_Id != 0)
                {
                    var map = _aduanasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Aranceles
        public ServiceResult ListarAranceles()
        {var result = new ServiceResult();
            try
            {
                var list = _arancelesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarAranceles(tbAranceles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.aran_Descripcion != "")
                {
                    var map = _arancelesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarAranceles(tbAranceles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.aran_Descripcion != "")
                {
                    var map = _arancelesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarAranceles(tbAranceles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.aran_Id != 0)
                {
                    var map = _arancelesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region BaseCalculosHistorial
        public ServiceResult ListarBaseCalculosHistorial()
        {var result = new ServiceResult();
            try
            {
                var list = _baseCalculosHistorialRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarBaseCalculosHistorial(tbBaseCalculosHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.base_Id != 0)
                {
                    var map = _baseCalculosHistorialRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarBaseCalculosHistorial(tbBaseCalculosHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.base_Id != 0)
                {
                    var map = _baseCalculosHistorialRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarBaseCalculosHistorial(tbBaseCalculosHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.base_Id != 0)
                {
                    var map = _baseCalculosHistorialRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region BaseCalculos
        public ServiceResult ListarBaseCalculos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _baseCalculosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarBaseCalculos(tbBaseCalculos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.base_Id != 0)
                {
                    var map = _baseCalculosRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarBaseCalculos(tbBaseCalculos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.base_Id != 0)
                {
                    var map = _baseCalculosRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarBaseCalculos(tbBaseCalculos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.base_Id != 0)
                {
                    var map = _baseCalculosRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region BoletinPago
        public ServiceResult ListarBoletinPago()
        {
            var result = new ServiceResult();
            try
            {
                var list = _boletinPagoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarBoletinPago(tbBoletinPago item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.boen_Declarante != "")
                {
                    var map = _boletinPagoRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarBoletinPago(tbBoletinPago item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.boen_Declarante != "")
                {
                    var map = _boletinPagoRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarBoletinPago(tbBoletinPago item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.boen_Id != 0)
                {
                    var map = _boletinPagoRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region CodigoImpuesto
        public ServiceResult ListarCodigoImpuesto()
        {
            var result = new ServiceResult();
            try
            {
                var list = _codigoImpuestoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarCodigoImpuesto(tbCodigoImpuesto item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coim_Descripcion != "")
                {
                    var map = _codigoImpuestoRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarCodigoImpuesto(tbCodigoImpuesto item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coim_Descripcion != "")
                {
                    var map = _codigoImpuestoRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarCodigoImpuesto(tbCodigoImpuesto item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coim_Id != 0)
                {
                    var map = _codigoImpuestoRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region ComercianteIndividual
        public ServiceResult ListarComercianteIndividual()
        {
            var result = new ServiceResult();
            try
            {
                var list = _comercianteIndividualRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarComercianteIndividual(tbComercianteIndividual item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coin_PuntoReferencia != "")
                {
                    var map = _comercianteIndividualRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarComercianteIndividual(tbComercianteIndividual item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coin_PuntoReferencia != "")
                {
                    var map = _comercianteIndividualRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarComercianteIndividual(tbComercianteIndividual item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coin_Id != 0)
                {
                    var map = _comercianteIndividualRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region ConceptoPago
        public ServiceResult ListarConceptoPago()
        {
            var result = new ServiceResult();
            try
            {
                var list = _conceptoPagoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarConceptoPago(tbConceptoPago item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _conceptoPagoRepository.Insert(item);
                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarConceptoPago(tbConceptoPago item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _conceptoPagoRepository.Update(item);

                if (map.MessageStatus == "1")
                {
                    return result.Ok(map);
                }
                else
                {

                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarConceptoPago(tbConceptoPago item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.copa_Id != 0)
                {
                    var map = _conceptoPagoRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Condiciones
        public ServiceResult ListarCondiciones()
        {
            var result = new ServiceResult();
            try
            {
                var list = _condicionesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarCondiciones(tbCondiciones item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.codi_Concepto_Monto_Declarado != "")
                {
                    var map = _condicionesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarCondiciones(tbCondiciones item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.codi_Concepto_Monto_Declarado != "")
                {
                    var map = _condicionesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarCondiciones(tbCondiciones item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.codi_Id != 0)
                {
                    var map = _condicionesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region CondicionesHistorial
        public ServiceResult ListarCondicionesHistorial()
        {
            var result = new ServiceResult();
            try
            {
                var list = _condicionesHistorialRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarCondicionesHistorial(tbCondicionesHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.codi_Concepto_Monto_Declarado != "")
                {
                    var map = _condicionesHistorialRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarCondicionesHistorial(tbCondicionesHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.codi_Concepto_Monto_Declarado != "")
                {
                    var map = _condicionesHistorialRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarCondicionesHistorial(tbCondicionesHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.codi_Id != 0)
                {
                    var map = _condicionesHistorialRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region CondicionesComerciales
        public ServiceResult ListarCondicionesComerciales()
        {
            var result = new ServiceResult();
            try
            {
                var list = _condicionesComercialesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarCondicionesComerciales(tbCondicionesComerciales item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coco_Descripcion != "")
                {
                    var map = _condicionesComercialesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarCondicionesComerciales(tbCondicionesComerciales item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coco_Descripcion != "")
                {
                    var map = _condicionesComercialesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarCondicionesComerciales(tbCondicionesComerciales item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.coco_Id != 0)
                {
                    var map = _condicionesComercialesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Conductor
        public ServiceResult ListarConductor()
        {
            var result = new ServiceResult();
            try
            {
                var list = _conductorRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarConductor(tbConductor item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.cont_Nombre != "")
                {
                    var map = _conductorRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarConductor(tbConductor item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.cont_Nombre != "")
                {
                    var map = _conductorRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarConductor(tbConductor item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.cont_Id != 0)
                {
                    var map = _conductorRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Declaraciones_ValorHistorial
        public ServiceResult ListarDeclaraciones_ValorHistorial()
        {
            var result = new ServiceResult();
            try
            {
                var list = _declaraciones_ValorHistorialRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDeclaraciones_ValorHistorial(tbDeclaraciones_ValorHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.deva_Condiciones != "")
                {
                    var map = _declaraciones_ValorHistorialRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDeclaraciones_ValorHistorial(tbDeclaraciones_ValorHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.deva_Condiciones != "")
                {
                    var map = _declaraciones_ValorHistorialRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDeclaraciones_ValorHistorial(tbDeclaraciones_ValorHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.deva_Id != 0)
                {
                    var map = _declaraciones_ValorHistorialRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Declaraciones_Valor
        public ServiceResult ListarDeclaraciones_Valor()
        {
            var result = new ServiceResult();
            try
            {
                var list = _declaraciones_ValorRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDeclaraciones_Valor(tbDeclaraciones_Valor item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.deva_Condiciones != "")
                {
                    var map = _declaraciones_ValorRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDeclaraciones_Valor(tbDeclaraciones_Valor item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.deva_Condiciones != "")
                {
                    var map = _declaraciones_ValorRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDeclaraciones_Valor(tbDeclaraciones_Valor item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.deva_Id != 0)
                {
                    var map = _declaraciones_ValorRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Declarantes
        public ServiceResult ListarDeclarantes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _declarantesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDeclarantes(tbDeclarantes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.decl_Nombre_Raso != "")
                {
                    var map = _declarantesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDeclarantes(tbDeclarantes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.decl_Nombre_Raso != "")
                {
                    var map = _declarantesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDeclarantes(tbDeclarantes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.decl_Id != 0)
                {
                    var map = _declarantesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region DocumentosContratos
        public ServiceResult ListarDocumentosContratos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _documentosContratosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDocumentosContratos(tbDocumentosContratos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.doco_TipoDocumento != "")
                {
                    var map = _documentosContratosRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDocumentosContratos(tbDocumentosContratos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.doco_TipoDocumento != "")
                {
                    var map = _documentosContratosRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDocumentosContratos(tbDocumentosContratos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.doco_Id != 0)
                {
                    var map = _documentosContratosRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region DocumentosdeSoporte
        public ServiceResult ListarDocumentosdeSoporte()
        {
            var result = new ServiceResult();
            try
            {
                var list = _documentosdeSoporteRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDocumentosdeSoporte(tbDocumentosDeSoporte item)
        {                                                
            var result = new ServiceResult();
            try
            {
                if (item.doso_NumeroDocumento != "")
                {
                    var map = _documentosdeSoporteRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDocumentosdeSoporte(tbDocumentosDeSoporte item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.doso_NumeroDocumento != "")
                {
                    var map = _documentosdeSoporteRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDocumentosdeSoporte(tbDocumentosDeSoporte item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.doso_Id != 0)
                {
                    var map = _documentosdeSoporteRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region DocumentosPDFHistorial
        public ServiceResult ListarDocumentosPDFHistorial()
        {
            var result = new ServiceResult();
            try
            {
                var list = _documentosPDFHistorialRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDocumentosPDFHistorial(tbDocumentosPDFHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.dpdf_DUCA != "")
                {
                    var map = _documentosPDFHistorialRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDocumentosPDFHistorial(tbDocumentosPDFHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.dpdf_DUCA != "")
                {
                    var map = _documentosPDFHistorialRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDocumentosPDFHistorial(tbDocumentosPDFHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.deva_Id != 0)
                {
                    var map = _documentosPDFHistorialRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region DocumentosPDF
        public ServiceResult ListarDocumentosPDF()
        {
            var result = new ServiceResult();
            try
            {
                var list = _documentosPDFRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDocumentosPDF(tbDocumentosPDF item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _documentosPDFRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDocumentosPDF(tbDocumentosPDF item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _documentosPDFRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDocumentosPDF(tbDocumentosPDF item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _documentosPDFRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region DucaHistorial
        public ServiceResult ListarDucaHistorial()
        {
            var result = new ServiceResult();
            try
            {
                var list = _ducaHistorialRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDucaHistorial(tbDucaHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _ducaHistorialRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDucaHistorial(tbDucaHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _ducaHistorialRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDucaHistorial(tbDucaHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _ducaHistorialRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Duca
        public ServiceResult ListarDuca()
        {
            var result = new ServiceResult();
            try
            {
                var list = _ducaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDuca(tbDuca item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _ducaRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDuca(tbDuca item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _ducaRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarDuca(tbDuca item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _ducaRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region EstadoBoletin
        public ServiceResult ListarEstadoBoletin()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoBoletinRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarEstadoBoletin(tbEstadoBoletin item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _estadoBoletinRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarEstadoBoletin(tbEstadoBoletin item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _estadoBoletinRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarEstadoBoletin(tbEstadoBoletin item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _estadoBoletinRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region EstadoMercancias
        public ServiceResult ListarEstadoMercancias()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoMercanciasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarEstadoMercancias(tbEstadoMercancias item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _estadoMercanciasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarEstadoMercancias(tbEstadoMercancias item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _estadoMercanciasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarEstadoMercancias(tbEstadoMercancias item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _estadoMercanciasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region FacturasHistorial
        public ServiceResult ListarFacturasHistorial()
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturasHistorialRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarFacturasHistorial(tbFacturasHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _facturasHistorialRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarFacturasHistorial(tbFacturasHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _facturasHistorialRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarFacturasHistorial(tbFacturasHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _facturasHistorialRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Facturas
        public ServiceResult ListarFacturas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarFacturas(tbFacturas item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _facturasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarFacturas(tbFacturas item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _facturasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarFacturas(tbFacturas item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _facturasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region FormasdePago
        public ServiceResult ListarFormasdePago()
        {
            var result = new ServiceResult();
            try
            {
                var list = _formasdePagoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarFormasdePago(tbFormasdePago item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _formasdePagoRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarFormasdePago(tbFormasdePago item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _formasdePagoRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarFormasdePago(tbFormasdePago item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _formasdePagoRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Importadores
        public ServiceResult ListarImportadores()
        {
            var result = new ServiceResult();
            try
            {
                var list = _importadoresRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarImportadores(tbImportadores item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _importadoresRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarImportadores(tbImportadores item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _importadoresRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarImportadores(tbImportadores item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _importadoresRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region ImpuestosPorArancel
        public ServiceResult ListarImpuestosPorArancel()
        {
            var result = new ServiceResult();
            try
            {
                var list = _impuestosporAracelRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarImpuestosPorArancel(tbImpuestosPorArancel item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _impuestosporAracelRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarImpuestosPorArancel(tbImpuestosPorArancel item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _impuestosporAracelRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarImpuestosPorArancel(tbImpuestosPorArancel item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _impuestosporAracelRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Impuestos
        public ServiceResult ListarImpuestos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _impuestosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarImpuestos(tbImpuestos item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _impuestosRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarImpuestos(tbImpuestos item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _impuestosRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarImpuestos(tbImpuestos item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _impuestosRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Incoterm
        public ServiceResult ListarIncoterm()
        {
            var result = new ServiceResult();
            try
            {
                var list = _incotermRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarIncoterm(tbIncoterm item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _incotermRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarIncoterm(tbIncoterm item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _incotermRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarIncoterm(tbIncoterm item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _incotermRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Intermediarios
        public ServiceResult ListarIntermediarios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _intermediarioRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarIntermediarios(tbIntermediarios item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _intermediarioRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarIntermediarios(tbIntermediarios item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _intermediarioRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarIntermediarios(tbIntermediarios item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _intermediarioRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region ItemsHistorial
        //public ServiceResult ListarItemsHistorial()
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var list = _itemsHistorialRepository.List();
        //        return result.Ok(list);
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}

        //public ServiceResult InsertarItemsHistorial(tbItemsHistorial item)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        if (1 == 1)
        //        {
        //            var map = _itemsHistorialRepository.Insert(item);
        //            if (map.CodeStatus > 0)
        //            {
        //                return result.Ok(map);
        //            }
        //            else
        //            {
                        
        //                return result.Error(map);
        //            }
        //        }
        //        else
        //        {
        //            return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}

        //public ServiceResult ActualizarItemsHistorial(tbItemsHistorial item)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        if (1 == 1)
        //        {
        //            var map = _itemsHistorialRepository.Update(item);
        //            if (map.CodeStatus > 0)
        //            {
        //                return result.Ok(map);
        //            }
        //            else
        //            {
                        
        //                return result.Error(map);
        //            }
        //        }
        //        else
        //        {
        //            return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}

        //public ServiceResult EliminarItemsHistorial(tbItemsHistorial item)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        if (1 == 1)
        //        {
        //            var map = _itemsHistorialRepository.Delete(item);
        //            if (map.CodeStatus > 0)
        //            {
        //                return result.Ok(map);
        //            }
        //            else
        //            {
                        
        //                return result.Error(map);
        //            }
        //        }
        //        else
        //        {
        //            return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}
        #endregion

        #region Items
        public ServiceResult ListarItems(tbItems item)
        {
            var resultado = new ServiceResult();
            try
            {
                var list = _itemsRepository.List(item);
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult InsertarItems(tbItems item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _itemsRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarItems(tbItems item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _itemsRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarItems(tbItems item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.item_Id != 0)
                {
                    var map = _itemsRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region LiquidacionGeneralHistorial
        public ServiceResult ListarLiquidacionGeneralHistorial()
        {
            var result = new ServiceResult();
            try
            {
                var list = _liquidacionGeneralHistorialRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarLiquidacionGeneralHistorial(tbLiquidacionGeneralHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _liquidacionGeneralHistorialRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarLiquidacionGeneralHistorial(tbLiquidacionGeneralHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _liquidacionGeneralHistorialRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarLiquidacionGeneralHistorial(tbLiquidacionGeneralHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _liquidacionGeneralHistorialRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region LiquidacionGeneral
        public ServiceResult ListarLiquidacionGeneral()
        {
            var result = new ServiceResult();
            try
            {
                var list = _liquidacionGeneralRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarLiquidacionGeneral(tbLiquidacionGeneral item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _liquidacionGeneralRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarLiquidacionGeneral(tbLiquidacionGeneral item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _liquidacionGeneralRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {   
                    return result.Error(map);
                }
               
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarLiquidacionGeneral(tbLiquidacionGeneral item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _liquidacionGeneralRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region LiquidacionPorLinea
        public ServiceResult ListarLiquidacionPorLinea()
        {
            var result = new ServiceResult();
            try
            {
                var list = _liquidacionPorLineaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Ok(ex.Message);
            }
        }

        public ServiceResult InsertarLiquidacionPorLinea(tbLiquidacionPorLinea item)
        {
            var result = new ServiceResult();
            try
            {                
                var map = _liquidacionPorLineaRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {                        
                    return result.Error(map);
                }               
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarLiquidacionPorLinea(tbLiquidacionPorLinea item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _liquidacionPorLineaRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarLiquidacionPorLinea(tbLiquidacionPorLinea item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _liquidacionPorLineaRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region LugaresEmbarque
        public ServiceResult ListarLugaresEmbarque(string codigo)
        {
            var result = new ServiceResult();
            try
            {
                var list = _lugaresEmbarqueRepository.List(codigo);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarLugaresEmbarque(tbLugaresEmbarque item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _lugaresEmbarqueRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarLugaresEmbarque(tbLugaresEmbarque item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _lugaresEmbarqueRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarLugaresEmbarque(tbLugaresEmbarque item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _lugaresEmbarqueRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Marcas
        public ServiceResult ListarMarcas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _marcasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _marcasRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                    var map = _marcasRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _marcasRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region ModoTransporte
        public ServiceResult ListarModoTransporte()
        {
            var result = new ServiceResult();
            try
            {
                var list = _modoTransporteRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarModoTransporte(tbModoTransporte item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _modoTransporteRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                        
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarModoTransporte(tbModoTransporte item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _modoTransporteRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {

                    return result.Error(map);
                }
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarModoTransporte(tbModoTransporte item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _modoTransporteRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {

                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region NivelesComerciales
        public ServiceResult ListarNivelesComerciales()
        {
            var result = new ServiceResult();
            try
            {
                var list = _nivelesComercialesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarNivelesComerciales(tbNivelesComerciales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _nivelesComercialesRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                        
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarNivelesComerciales(tbNivelesComerciales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _nivelesComercialesRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                        
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarNivelesComerciales(tbNivelesComerciales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _nivelesComercialesRepository.Delete(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                        
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region PersonaJuridica
        public ServiceResult ListarPersonaJuridica()
        {
            var result = new ServiceResult();
            try
            {
                var list = _personaJuridicaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarPersonaJuridica(tbPersonaJuridica item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _personaJuridicaRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                        
                    return result.Error(map);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarPersonaJuridica(tbPersonaJuridica item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _personaJuridicaRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarPersonaJuridica(tbPersonaJuridica item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _personaJuridicaRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region PersonaNatural
        public ServiceResult ListarPersonaNatural()
        {
            var result = new ServiceResult();
            try
            {
                var list = _personaNaturalRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarPersonaNatural(tbPersonaNatural item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _personaNaturalRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarPersonaNatural(tbPersonaNatural item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _personaNaturalRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarPersonaNatural(tbPersonaNatural item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _personaNaturalRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Personas
        public ServiceResult ListarPersonas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _personasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarPersonas(tbPersonas item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _personasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarPersonas(tbPersonas item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _personasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarPersonas(tbPersonas item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _personasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region ProveedoresDeclaracion
        public ServiceResult ListarProveedoresDeclaracion()
        {
            var result = new ServiceResult();
            try
            {
                var list = _proveedoresDeclaracionRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarProveedoresDeclaracion(tbProveedoresDeclaracion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _proveedoresDeclaracionRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarProveedoresDeclaracion(tbProveedoresDeclaracion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _proveedoresDeclaracionRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarProveedoresDeclaracion(tbProveedoresDeclaracion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _proveedoresDeclaracionRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region TipoDocumento
        public ServiceResult ListarTipoDocumento()
        {
            var result = new ServiceResult();
            try
            {
                var list = _tipoDocumentoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarTipoDocumento(tbTipoDocumento item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoDocumentoRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarTipoDocumento(tbTipoDocumento item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoDocumentoRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarTipoDocumento(tbTipoDocumento item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoDocumentoRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region TipoIntermediario
        public ServiceResult ListarTipoIntermediario()
        {
            var result = new ServiceResult();
            try
            {
                var list = _tipoIntermediarioRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarTipoIntermediario(tbTipoIntermediario item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoIntermediarioRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarTipoIntermediario(tbTipoIntermediario item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoIntermediarioRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarTipoIntermediario(tbTipoIntermediario item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoIntermediarioRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region TipoLiquidacion
        public ServiceResult ListarTipoLiquidacion()
        {
            var result = new ServiceResult();
            try
            {
                var list = _tipoLiquidacionRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarTipoLiquidacion(tbTipoLiquidacion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoLiquidacionRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarTipoLiquidacion(tbTipoLiquidacion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoLiquidacionRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarTipoLiquidacion(tbTipoLiquidacion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tipoLiquidacionRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region TiposIdentificacion
        public ServiceResult ListarTiposIdentificacion()
        {
            var result = new ServiceResult();
            try
            {
                var list = _tiposIdentificacionRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarTiposIdentificacion(tbTiposIdentificacion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tiposIdentificacionRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarTiposIdentificacion(tbTiposIdentificacion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tiposIdentificacionRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarTiposIdentificacion(tbTiposIdentificacion item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _tiposIdentificacionRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Transporte
        public ServiceResult ListarTransporte()
        {
            var result = new ServiceResult();
            try
            {
                var list = _transporteRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarTransporte(tbTransporte item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _transporteRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarTransporte(tbTransporte item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _transporteRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarTransporte(tbTransporte item)
        {
            var result = new ServiceResult();
            try
            {
                if (1 == 1)
                {
                    var map = _transporteRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        
                        return result.Error(map);
                    }
                }
                else
                {
                    return result.SetMessage("La solicitud contiene sintaxis erronea", ServiceResultType.BadRecuest);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion



    }
}
