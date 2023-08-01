﻿
using SIMEXPRO.DataAccess.Repositories.Prod;
using SIMEXPRO.Entities.Entities;
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



        #region Areas
        public ServiceResult ListarAreas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _areasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarAreas(tbArea item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tipa_area != "")
                {
                    var map = _areasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarAreas(tbArea item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tipa_area != "")
                {
                    var map = _areasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarAreas(tbArea item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tipa_Id != 0)
                {
                    var map = _areasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Asignacion Orden Detalles


        public ServiceResult ListarAsignacionOrdenDetalle(int asor_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _asignacionesOrdenDetalleRepository.List(asor_Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        
        public ServiceResult InsertarAsignacionOrdenDetalle(tbAsignacionesOrdenDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.adet_Cantidad.ToString() != "")
                {
                    var map = _asignacionesOrdenDetalleRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarAsignacionOrdenDetalle(tbAsignacionesOrdenDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.adet_Cantidad.ToString() != "")
                {
                    var map = _asignacionesOrdenDetalleRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarAsignacionOrdenDetalle(tbAsignacionesOrdenDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.adet_Id != 0)
                {
                    var map = _asignacionesOrdenDetalleRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Asignacion Orden

        public ServiceResult ListarAsignacionOrden()
        {
            var result = new ServiceResult();
            try
            {
                var list = _asignacionesOrdenRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
       
        public ServiceResult InsertarAsignacionOrden(tbAsignacionesOrden item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.asor_Cantidad.ToString() != "")
                {
                    var map = _asignacionesOrdenRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarAsignacionOrden(tbAsignacionesOrden item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.asor_Cantidad.ToString() != "")
                {
                    var map = _asignacionesOrdenRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarAsignacionOrden(tbAsignacionesOrden item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.asor_Id != 0)
                {
                    var map = _asignacionesOrdenRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Categorias

        public ServiceResult ListarCategorias()
        {
            var result = new ServiceResult();
            try
            {
                var list = _categoriasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
       

        public ServiceResult InsertarCategorias(tbCategoria item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.cate_Descripcion != "")
                {
                    var map = _categoriasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarCategorias(tbCategoria item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.cate_Descripcion != "")
                {
                    var map = _categoriasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarCategorias(tbCategoria item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.cate_Id != 0)
                {
                    var map = _categoriasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Clientes

        public ServiceResult ListarClientes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _clientesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
       
        public ServiceResult InsertarClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.clie_Nombre_Contacto != "")
                {
                    var map = _clientesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.clie_Nombre_Contacto != "")
                {
                    var map = _clientesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.clie_Id != 0)
                {
                    var map = _clientesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Colores

        public ServiceResult ListarColores()
        {
            var result = new ServiceResult();
            try
            {
                var list = _coloresRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarColores(tbColores item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.colr_Nombre != "")
                {
                    var map = _coloresRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarColores(tbColores item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.colr_Nombre != "")
                {
                    var map = _coloresRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarColores(tbColores item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.colr_Id != 0)
                {
                    var map = _coloresRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Estilos
        public IEnumerable<tbEstilos> ListarEstilos()
        {
            try
            {
                var list = _estilosRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbEstilos>();
            }
        }

        public ServiceResult InsertarEstilos(tbEstilos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.esti_Descripcion != "")
                {
                    var map = _estilosRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarEstilos(tbEstilos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.esti_Descripcion != "")
                {
                    var map = _estilosRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarEstilos(tbEstilos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.esti_Id != 0)
                {
                    var map = _estilosRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Funciones Maquina
        public IEnumerable<tbFuncionesMaquina> ListarFuncionesMaquina()
        {
            try
            {
                var list = _funcionesMaquinaRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbFuncionesMaquina>();
            }
        }

        public ServiceResult InsertarFuncionesMaquina(tbFuncionesMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.func_Nombre != "")
                {
                    var map = _funcionesMaquinaRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarFuncionesMaquina(tbFuncionesMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.func_Nombre != "")
                {
                    var map = _funcionesMaquinaRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarFuncionesMaquina(tbFuncionesMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.func_Id != 0)
                {
                    var map = _funcionesMaquinaRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Lotes
        public IEnumerable<tbLotes> ListarLotes()
        {
            try
            {
                var list = _lotesRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbLotes>();
            }
        }

        public ServiceResult InsertarLotes(tbLotes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.lote_CantIngresada.ToString() != "")
                {
                    var map = _lotesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarLotes(tbLotes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.lote_CantIngresada.ToString() != "")
                {
                    var map = _lotesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarLotes(tbLotes item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.lote_Id != 0)
                {
                    var map = _lotesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Maquina Historial
        public IEnumerable<tbMaquinaHistorial> ListarMaquinaHistorial()
        {
            try
            {
                var list = _maquinaHistorialRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbMaquinaHistorial>();
            }
        }

        public ServiceResult InsertarMaquinaHistorial(tbMaquinaHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mahi_FechaInicio.ToString() != "")
                {
                    var map = _maquinaHistorialRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarMaquinaHistorial(tbMaquinaHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mahi_FechaInicio.ToString() != "")
                {
                    var map = _maquinaHistorialRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarMaquinaHistorial(tbMaquinaHistorial item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.maqu_Id != 0)
                {
                    var map = _maquinaHistorialRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Maquinas
        public IEnumerable<tbMaquinas> ListarMaquinas()
        {
            try
            {
                var list = _maquinasRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbMaquinas>();
            }
        }

        public ServiceResult InsertarMaquinas(tbMaquinas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.maqu_NumeroSerie != "")
                {
                    var map = _maquinasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarMaquinas(tbMaquinas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.maqu_NumeroSerie != "")
                {
                    var map = _maquinasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarMaquinas(tbMaquinas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.maqu_Id != 0)
                {
                    var map = _maquinasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Marcas Maquina
        public IEnumerable<tbMarcasMaquina> ListarMarcasMaquina()
        {
            try
            {
                var list = _marcasMaquinaRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbMarcasMaquina>();
            }
        }

        public ServiceResult InsertarMarcasMaquina(tbMarcasMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.marq_Nombre != "")
                {
                    var map = _marcasMaquinaRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizaMarcasMaquina(tbMarcasMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.marq_Nombre != "")
                {
                    var map = _marcasMaquinaRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarMarcasMaquina(tbMarcasMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.marq_Id != 0)
                {
                    var map = _marcasMaquinaRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Materiales Brindados
        public IEnumerable<tbMaterialesBrindar> ListarMaterialesBrindados()
        {
            try
            {
                var list = _materialesBrindarRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbMaterialesBrindar>();
            }
        }

        public ServiceResult InsertarMaterialesBrindados(tbMaterialesBrindar item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mabr_Cantidad.ToString() != "")
                {
                    var map = _materialesBrindarRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarMaterialesBrindados(tbMaterialesBrindar item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mabr_Cantidad.ToString() != "")
                {
                    var map = _materialesBrindarRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarMaterialesBrindados(tbMaterialesBrindar item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mabr_Id != 0)
                {
                    var map = _materialesBrindarRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Materiales
        public IEnumerable<tbMateriales> ListarMateriales()
        {
            try
            {
                var list = _materialesRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbMateriales>();
            }
        }

        public ServiceResult InsertarMateriales(tbMateriales item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mate_Descripcion != "")
                {
                    var map = _materialesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarMateriales(tbMateriales item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mate_Descripcion != "")
                {
                    var map = _materialesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarMateriales(tbMateriales item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mate_Id != 0)
                {
                    var map = _materialesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Modelos Maquina
        public IEnumerable<tbModelosMaquina> ListarModelosMaquina()
        {
            try
            {
                var list = _modelosMaquinaRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbModelosMaquina>();
            }
        }

        public ServiceResult InsertarModelosMaquina(tbModelosMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mmaq_Nombre != "")
                {
                    var map = _modelosMaquinaRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarModelosMaquina(tbModelosMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mmaq_Nombre != "")
                {
                    var map = _modelosMaquinaRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarModelosMaquina(tbModelosMaquina item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.mmaq_Id != 0)
                {
                    var map = _modelosMaquinaRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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
        #region Modulos
        public IEnumerable<tbModulos> ListarModulos()
        {
            try
            {
                var list = _modulosRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbModulos>();
            }
        }

        public ServiceResult InsertarModulos(tbModulos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.modu_Nombre != "")
                {
                    var map = _modulosRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarModulos(tbModulos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.modu_Nombre != "")
                {
                    var map = _modulosRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarModulos(tbModulos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.modu_Id != 0)
                {
                    var map = _modulosRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region orde_Ensa_Acab_EtiqRepository
        public IEnumerable<tbOrde_Ensa_Acab_Etiq> Listarorde_Ensa_Acab_Etiq()
        {
            try
            {
                var list = _orde_Ensa_Acab_EtiqRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbOrde_Ensa_Acab_Etiq>();
            }
        }

        public ServiceResult Insertarorde_Ensa_Acab_Etiq(tbOrde_Ensa_Acab_Etiq item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ensa_Cantidad.ToString() != "")
                {
                    var map = _orde_Ensa_Acab_EtiqRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult Actualizarorde_Ensa_Acab_Etiq(tbOrde_Ensa_Acab_Etiq item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ensa_Cantidad.ToString() != "")
                {
                    var map = _orde_Ensa_Acab_EtiqRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult Eliminarorde_Ensa_Acab_Etiq(tbOrde_Ensa_Acab_Etiq item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ensa_Id != 0)
                {
                    var map = _orde_Ensa_Acab_EtiqRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Orden Compra Detalles
        public IEnumerable<tbOrdenCompraDetalles> ListarOrdenCompraDetalles(tbOrdenCompraDetalles item)
        {
            try
            {
                var list = _ordenCompraDetallesRepository.List(item);
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbOrdenCompraDetalles>();
            }
        }

        public ServiceResult InsertarOrdenCompraDetalles(tbOrdenCompraDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.code_CantidadPrenda.ToString() != "")
                {
                    var map = _ordenCompraDetallesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarOrdenCompraDetalles(tbOrdenCompraDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.code_CantidadPrenda.ToString() != "")
                {
                    var map = _ordenCompraDetallesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarOrdenCompraDetalles(tbOrdenCompraDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.orco_Id != 0)
                {
                    var map = _ordenCompraDetallesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Orden Compra 
        public IEnumerable<tbOrdenCompra> ListarOrdenCompra()
        {
            try
            {
                var list = _ordenCompraRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbOrdenCompra>();
            }
        }

        public ServiceResult InsertarOrdenCompra(tbOrdenCompra item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.orco_IdCliente.ToString() != "")
                {
                    var map = _ordenCompraRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarOrdenCompra(tbOrdenCompra item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.orco_IdCliente.ToString() != "")
                {
                    var map = _ordenCompraRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarOrdenCompra(tbOrdenCompra item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.orco_Id != 0)
                {
                    var map = _ordenCompraRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Pedidos Orden Detalles
        public IEnumerable<tbPedidosOrdenDetalle> ListarPedidosOrdenDetalle(tbPedidosOrdenDetalle item)
        {
            try
            {
                var list = _pedidosOrdenDetallesRepository.List(item);
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbPedidosOrdenDetalle>();
            }
        }

        public ServiceResult InsertarPedidosOrdenDetalle(tbPedidosOrdenDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.prod_Peso.ToString() != "")
                {
                    var map = _pedidosOrdenDetallesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarPedidosOrdenDetalle(tbPedidosOrdenDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.prod_Peso.ToString() != "")
                {
                    var map = _pedidosOrdenDetallesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarPedidosOrdenDetalle(tbPedidosOrdenDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.pedi_Id != 0)
                {
                    var map = _pedidosOrdenDetallesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Pedidos Orden
        public IEnumerable<tbPedidosOrden> ListarPedidosOrden()
        {
            try
            {
                var list = _pedidosOrdenRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbPedidosOrden>();
            }
        }

        public ServiceResult InsertarPedidosOrden(tbPedidosOrden item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.peor_DadoCliente.ToString() != "")
                {
                    var map = _pedidosOrdenRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarPedidosOrden(tbPedidosOrden item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.peor_DadoCliente.ToString() != "")
                {
                    var map = _pedidosOrdenRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarPedidosOrden(tbPedidosOrden item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.peor_Id != 0)
                {
                    var map = _pedidosOrdenRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Pedidos Produccion Detalles
        public IEnumerable<tbPedidosProduccionDetalles> ListarPedidosProduccioDetalles()
        {
            try
            {
                var list = _pedidosProduccionDetallesRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbPedidosProduccionDetalles>();
            }
        }

        public ServiceResult InsertarPedidosProduccioDetalles(tbPedidosProduccionDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ppde_Cantidad.ToString() != "")
                {
                    var map = _pedidosProduccionDetallesRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarPedidosProduccioDetalles(tbPedidosProduccionDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ppde_Cantidad.ToString() != "")
                {
                    var map = _pedidosProduccionDetallesRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarPedidosProduccioDetalles(tbPedidosProduccionDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ppro_Id != 0)
                {
                    var map = _pedidosProduccionDetallesRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Pedidos Produccion
        public IEnumerable<tbPedidosProduccion> ListarPedidosProduccion()
        {
            try
            {
                var list = _pedidosProduccionRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbPedidosProduccion>();
            }
        }

        public ServiceResult InsertarPedidosProduccion(tbPedidosProduccion item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ppro_Estados.ToString() != "")
                {
                    var map = _pedidosProduccionRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarPedidosProduccion(tbPedidosProduccion item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ppro_Estados.ToString() != "")
                {
                    var map = _pedidosProduccionRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarPedidosProduccion(tbPedidosProduccion item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.ppro_Id != 0)
                {
                    var map = _pedidosProduccionRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Procesos
        public IEnumerable<tbProcesos> ListarProcesos()
        {
            try
            {
                var list = _procesosRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbProcesos>();
            }
        }

        public ServiceResult InsertarProcesos(tbProcesos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.proc_Descripcion != "")
                {
                    var map = _procesosRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarProcesos(tbProcesos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.proc_Descripcion != "")
                {
                    var map = _procesosRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarProcesos(tbProcesos item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.proc_Id != 0)
                {
                    var map = _procesosRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Reporte Modulo Dia
        public IEnumerable<tbReporteModuloDia> ListarReporteModuloDia()
        {
            try
            {
                var list = _reporteModuloDiaRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbReporteModuloDia>();
            }
        }

        public ServiceResult InsertarReporteModuloDia(tbReporteModuloDia item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.remo_TotalDia.ToString() != "")
                {
                    var map = _reporteModuloDiaRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarReporteModuloDia(tbReporteModuloDia item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.remo_TotalDia.ToString() != "")
                {
                    var map = _reporteModuloDiaRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarReporteModuloDia(tbReporteModuloDia item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.remo_Id != 0)
                {
                    var map = _reporteModuloDiaRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Reporte Modulo Dia Detalle
        public IEnumerable<tbReporteModuloDiaDetalle> ListarReporteModuloDiaDetalle()
        {
            try
            {
                var list = _reporteModuloDiaDetalleRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbReporteModuloDiaDetalle>();
            }
        }

        public ServiceResult InsertarReporteModuloDiaDetalle(tbReporteModuloDiaDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.rdet_TotalDia.ToString() != "")
                {
                    var map = _reporteModuloDiaDetalleRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarReporteModuloDiaDetalle(tbReporteModuloDiaDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.rdet_TotalDia.ToString() != "")
                {
                    var map = _reporteModuloDiaDetalleRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarReporteModuloDiaDetalle(tbReporteModuloDiaDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.rdet_Id != 0)
                {
                    var map = _reporteModuloDiaDetalleRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Revision de Calidad
        public IEnumerable<tbRevisionDeCalidad> ListarRevisionDeCalidad()
        {
            try
            {
                var list = _revisionDeCalidadRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbRevisionDeCalidad>();
            }
        }

        public ServiceResult InsertarRevisionDeCalidad(tbRevisionDeCalidad item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.reca_Descripcion != "")
                {
                    var map = _revisionDeCalidadRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarRevisionDeCalidad(tbRevisionDeCalidad item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.reca_Descripcion != "")
                {
                    var map = _revisionDeCalidadRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarRevisionDeCalidad(tbRevisionDeCalidad item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.reca_Id != 0)
                {
                    var map = _revisionDeCalidadRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Sub Categoria
        public IEnumerable<tbSubcategoria> ListarSubCategorias()
        {
            try
            {
                var list = _subCategoriasRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbSubcategoria>();
            }
        }

        public ServiceResult InsertarSubCategorias(tbSubcategoria item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.subc_Descripcion != "")
                {
                    var map = _subCategoriasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarSubCategorias(tbSubcategoria item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.subc_Descripcion != "")
                {
                    var map = _subCategoriasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarSubCategorias(tbSubcategoria item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.subc_Id != 0)
                {
                    var map = _subCategoriasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Tallas
        public IEnumerable<tbTallas> ListarTallas()
        {
            try
            {
                var list = _tallasRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbTallas>();
            }
        }

        public ServiceResult InsertaTallas(tbTallas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tall_Nombre != "")
                {
                    var map = _tallasRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarTallas(tbTallas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tall_Nombre != "")
                {
                    var map = _tallasRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarTallas(tbTallas item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tall_Id != 0)
                {
                    var map = _tallasRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        #region Tipo Embalaje
        public IEnumerable<tbTipoEmbalaje> ListarTipoEmbalaje()
        {
            try
            {
                var list = _tipoEmbalajeRepository.List();
                return list;
            }
            catch (Exception ex)
            {
                return Enumerable.Empty<tbTipoEmbalaje>();
            }
        }

        public ServiceResult InsertarTipoEmbalaje(tbTipoEmbalaje item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tiem_Descripcion != "")
                {
                    var map = _tipoEmbalajeRepository.Insert(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult ActualizarTipoEmbalaje(tbTipoEmbalaje item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tiem_Descripcion != "")
                {
                    var map = _tipoEmbalajeRepository.Update(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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

        public ServiceResult EliminarTipoEmbalaje(tbTipoEmbalaje item)
        {
            var result = new ServiceResult();
            try
            {
                if (item.tiem_Id != 0)
                {
                    var map = _tipoEmbalajeRepository.Delete(item);
                    if (map.CodeStatus > 0)
                    {
                        return result.Ok(map);
                    }
                    else
                    {
                        map.MessageStatus = (map.CodeStatus == 0) ? "401 Error de Consulta" : map.MessageStatus;
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
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             