import _ from '@lodash';

const EventModel = (data) =>
  _.defaults(data || {}, {
    title: '',
    allDay: true,
    start: new Date(),
    end: new Date(),
    // fechainicio: new Date(),
    // fechafin: new Date(),
    extendedProps: { detallePO: { orco: '', code: ''},
                     descripcionDetalle: '',
                     estilo: '',
                     talla: '',
                     color: '',
                     fechalimite: new Date(),
                     empleadoencargado: '',
                     empl_Id: '',
                     cantidad: 0,
                     detalles: [{
                      key: '',
                      adet_Id: '',
                      lote_Id: '',
                      lote_CodigoLote: '',
                      lote_Objeto: '',
                      adet_Cantidad: '',
                      materialnombre: '',
                      colornombre: '',
                     }],
                     UsuarioCreacion: '',
                     FechaCreacion: '',
                     UsuarioModificacion: '',
                     FechaModificacion: '',
                     label: '' },
  });

export default EventModel;
