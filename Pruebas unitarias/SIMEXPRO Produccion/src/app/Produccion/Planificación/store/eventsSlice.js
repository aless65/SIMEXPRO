import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import formatISO from "date-fns/formatISO";
import instance from "src/app/auth/services/jwtService/jwtService";
import { selectSelectedLabels } from "./labelsSlice";

export const dateFormat = "YYYY-MM-DDTHH:mm:ss";

const user = JSON.parse(localStorage.getItem("user"));

const customHeaders = {
  XApiKey: instance.extraerToken(),
};

const baseURL = process.env.REACT_APP_API_URL + "api/AsignacionesOrden/";
const baseURL2 = process.env.REACT_APP_API_URL + "api/Lotes/";
const baseURL3 =
  process.env.REACT_APP_API_URL + "api/AsignacionesOrdenDetalle/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: customHeaders,
});

const axiosInstance2 = axios.create({
  baseURL: baseURL2,
  headers: customHeaders,
});

const axiosInstance3 = axios.create({
  baseURL: baseURL3,
  headers: customHeaders,
});

let events;

export const getEvents = createAsyncThunk(
  "calendarApp/events/getEvents",
  async () => {
    const response = await axiosInstance.get("/Listar");
    const data = response.data.data;

    // let ids = 0;

    events = data.map((asignacion) => {
      const detallesJson = JSON.parse(asignacion.detalles);
      let detalles = null;
      if (detallesJson) {
        detalles = detallesJson.map((lote, index) => {
          return {
            key: index + 1,
            // id: FuseUtils.generateGUID(),
            lote_Id: lote.lote[0].lote_Id,
            lote_CodigoLote: lote.lote[0]?.lote_CodigoLote,
            adet_Cantidad: lote.adet_Cantidad,
            materialnombre: lote.lote[0].mate[0].mate_Descripcion,
            colornombre: lote.lote[0].mate[0].colors[0].colr_Nombre,
          };
        });
      }
      return {
        id: asignacion.asor_Id,
        title: `${asignacion.clie_Nombre_O_Razon_Social} PO: ${asignacion.orco_Codigo} Código ítem: ${asignacion.asor_OrdenDetId}`,
        allDay: true,
        start: asignacion.asor_FechaInicio,
        end: asignacion.asor_FechaLimite,
        extendedProps: {
          detallePO: {
            orco: asignacion.orco_Codigo,
            code: asignacion.asor_OrdenDetId,
          },
          descripcionDetalle: `Cantidad de ítems: ${
            asignacion.cantidad_Items
          }\nFecha de emisión: ${
            new Date(asignacion.orco_FechaEmision)
              .toLocaleString()
              .split(",")[0]
          }\nFecha límite: ${
            new Date(asignacion.orco_FechaLimite).toLocaleString().split(",")[0]
          }`,
          estilo: asignacion.esti_Descripcion,
          talla: asignacion.tall_Nombre,
          color: asignacion.colr_Nombre,
          fechalimite: asignacion.asor_FechaLimite,
          proceso: asignacion.proc_Id,
          empleadoencargado: {
            value: asignacion.empl_Id,
            label: asignacion.empl_NombreCompleto,
          },
          cantidad: asignacion.asor_Cantidad,
          // asor_Id: asignacion.asor_Id,
          UsuarioCreacion: asignacion.usuarioCreacionNombre,
          FechaCreacion: asignacion.asor_FechaCreacion,
          UsuarioModificacion: asignacion.usuarioModificacionNombre,
          FechaModificacion: asignacion.asor_FechaModificacion,
          detalles: detalles,
          label: asignacion.proc_Id,
        },
      };
    });

    return events;
  }
);

export const addEvent = createAsyncThunk(
  "calendarApp/events/addEvent",
  async (newEvent, { dispatch }) => {
    try {
      let jsonLotes = null;

      if (newEvent.extendedProps.detalles.length > 0 && newEvent.extendedProps.detalles[0].lote_Id > 0) {
        const detalles = {
          detalles: newEvent.extendedProps.detalles.map((detalle) => ({
            lote_Id: detalle.lote_Id,
            adet_Cantidad: detalle.adet_Cantidad,
          })),
        };

        jsonLotes = JSON.stringify(detalles);

      } else {
        newEvent.extendedProps.detalles = null;
      }


      let datos = {
        asor_OrdenDetId: newEvent.extendedProps.detallePO.code,
        asor_FechaInicio: newEvent.start,
        asor_FechaLimite: newEvent.end,
        asor_Cantidad: newEvent.extendedProps.cantidad,
        proc_Id: newEvent.extendedProps.label,
        empl_Id: newEvent.extendedProps.empleadoencargado.value,
        detalles: jsonLotes,
        usua_UsuarioCreacion: user["uuid"],
        asor_FechaCreacion: instance.formatFechaHora(new Date()),
      };

      const insert = await axiosInstance.post("Insertar", datos);

      newEvent.id = insert.data.data.messageStatus;

      return newEvent;
    } catch (error) {
      ;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "calendarApp/events/updateEvent",
  async (event, { dispatch }) => {
    try {
      if (event.end == null || event.end == undefined) {
        event.end = event.start;
      }

      const updatedEvent = {
        ...event,
        extendedProps: {
          ...event.extendedProps,
          fechalimite: event.end,
        },
      };

      let datos = {
        asor_Id: event.id,
        asor_OrdenDetId: event.extendedProps.detallePO.code,
        asor_FechaInicio: event.start,
        asor_FechaLimite: event.end,
        asor_Cantidad: event.extendedProps.cantidad,
        proc_Id: event.extendedProps.label,
        empl_Id: event.extendedProps.empleadoencargado.value,
        usua_UsuarioModificacion: user["uuid"],
        asor_FechaCreacion: instance.formatFechaHora(new Date()),
      };
      const edit = await axiosInstance.post("Editar", datos);

      // newEvent.id = insert.data.data.messageStatus;

      if (edit.data.data.messageStatus === "1") {
        const response = await axios.put(
          `/api/calendar/events/${updatedEvent.id}`,
          updatedEvent
        );
        const data = await response.data;

        

        return data;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }
);

export const removeEvent = createAsyncThunk(
  "calendarApp/events/removeEvent",
  async (id, { dispatch }) => {
    try {
      let datos = {
        asor_Id: id,
      };
      const remove = await axiosInstance.post("Eliminar", datos);


      if (remove.data.data.messageStatus === "1") {
        const response = await axios.delete(`/api/calendar/events/${id}`);
        const data = await response.data;

        return data;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }
);

export const getOrdenCompraDetallesInfo = async (id) => {
  const response = await axiosInstance.get(`Find?id=${id}`);
  const data = response.data.data;

  return data;
};

export const procesoGet = async (id) => {
  try {
    const data = await load_DDL.ProcesosFiltrados(id)
    
    
  } catch (error) {
    
  }
};

export const getLotesInfo = async (codigo) => {
  const response = await axiosInstance2.get(
    `LotesMateriales?lote_CodigoLote=${codigo}`
  );
  const data = response.data.data;

  return data;
};

export const AddDetalles = async (detalle, id) => {
  try {
    let datos = {
      asor_Id: id,
      lote_Id: detalle.lote_Id,
      adet_Cantidad: detalle.adet_Cantidad,
      usua_UsuarioCreacion: user["uuid"],
      adet_FechaCreacion: instance.formatFechaHora(new Date()),
    };

    const response = await axiosInstance3.post(`Insertar`, datos);
    const data = response.data.data;

    return data;
  } catch (error) {
    ;
  }
};

export const EditDetalles = async (detalle, id, loteViejoYNuevo) => {
  try {
    let datos = {
      asor_Id: id,
      lote_Id: 0,
      adet_Cantidad: detalle.adet_Cantidad,
      detalles: JSON.stringify(loteViejoYNuevo),
      usua_UsuarioModificacion: user["uuid"],
      adet_FechaModificacion: instance.formatFechaHora(new Date()),
    };


    const response = await axiosInstance3.post(`Editar`, datos);
    const data = response.data.data;

    return data;
  } catch (error) {
    ;
  }
};

export const DeleteDetalles = async (lote_Id, adet_Cantidad) => {
  try {
    let datos = {
      lote_Id: lote_Id,
      adet_Cantidad: adet_Cantidad,
    };

    

    const response = await axiosInstance3.post(`Eliminar`, datos);
    const data = response.data.data;

    return data;
  } catch (error) {
    ;
  }
};

const eventsAdapter = createEntityAdapter({});

export const {
  selectAll: selectEvents,
  selectIds: selectEventIds,
  selectById: selectEventById,
} = eventsAdapter.getSelectors((state) => state.calendarApp.events);

const eventsSlice = createSlice({
  name: "calendarApp/events",
  initialState: eventsAdapter.getInitialState({
    eventDialog: {
      type: "new",
      props: {
        open: false,
        anchorPosition: { top: 200, left: 400 },
      },
      data: null,
    },
  }),
  reducers: {
    openNewEventDialog: {
      prepare: (selectInfo) => {
        const { start, end, jsEvent } = selectInfo;
        const payload = {
          type: "new",
          props: {
            open: true,
            anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX },
          },
          data: {
            start: formatISO(new Date(start)),
            end: formatISO(new Date(end)),
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.eventDialog = action.payload;
      },
    },
    openEditEventDialog: {
      prepare: (clickInfo) => {
        const { jsEvent, event } = clickInfo;
        const { id, title, label, allDay, start, end, extendedProps } = event;

        const payload = {
          type: "edit",
          props: {
            open: true,
            anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX },
          },
          data: {
            id,
            title,
            start,
            end,
            extendedProps,
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.eventDialog = action.payload;
      },
    },
    closeNewEventDialog: (state, action) => {
      state.eventDialog = {
        type: "new",
        props: {
          open: false,
          anchorPosition: { top: 200, left: 400 },
        },
        data: null,
      };
    },
    closeEditEventDialog: (state, action) => {
      state.eventDialog = {
        type: "edit",
        props: {
          open: false,
          anchorPosition: { top: 200, left: 400 },
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getEvents.fulfilled]: eventsAdapter.setAll,
    [addEvent.fulfilled]: eventsAdapter.addOne,
    [updateEvent.fulfilled]: eventsAdapter.upsertOne,
    [removeEvent.fulfilled]: eventsAdapter.removeOne,
  },
});

export const {
  openNewEventDialog,
  closeNewEventDialog,
  openEditEventDialog,
  closeEditEventDialog,
} = eventsSlice.actions;

export const selectFilteredEvents = createSelector(
  [selectSelectedLabels, selectEvents],
  (selectedLabels, events) => {
    return events.filter((item) =>
      selectedLabels.includes(item.extendedProps.label)
    );
  }
);

export const selectEventDialog = ({ calendarApp }) =>
  calendarApp.events.eventDialog;

export default eventsSlice.reducer;
