import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import FuseUtils from "@fuse/utils/FuseUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputAdornment, InputLabel,
  MenuItem,
  Popover,
  Select,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import History from "src/@history/@history";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "src/app/auth/services/jwtService/jwtService";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import "src/styles/custom-pagination.css";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import EventLabelSelect from "../../EventLabelSelect";
import EventModel from "../../model/EventModel";
import {
  addEvent,
  closeEditEventDialog,
  closeNewEventDialog,
  getOrdenCompraDetallesInfo,
  removeEvent,
  selectEventDialog,
  updateEvent,
} from "../../store/eventsSlice";
import {
  selectFirstLabelId,
  selectSelectedLabels,
  toggleSelectedLabels,
} from "../../store/labelsSlice";
import AsignacionOrdenDetalles from "../detalles/AsignacionOrdenDetalles";

let detalles = [];

function EventDialog(props) {
  const defaultValues = EventModel();
  const load_DDLs = Load_DDLs();
  /**
   * Form Validation Schema
   */

  const schema = yup.object().shape({
    extendedProps: yup.object().shape({
      detallePO: yup
        .object()
        .required("")
        .test("valido", "La PO y/o el ítem son inválidos", () => {
          return detalleExiste;
        }),
      cantidad: yup
        .number()
        .required("")
        .min(1, "Ingrese una cantidad válida")
        .max(1000000, "Ingrese una cantidad válida"),
      empleadoencargado: yup.object().required(""),
    }),
    start: yup.string().required(""),
    end: yup.string().required(""),
  });

  /* Trae los datos de todos los ddl */
  useEffect(() => {
    CargasDatosDdl();
    LotesGet();
  }, []);


  const [open, setOpen] = useState(""); // Agregar estado para controlar el modal
  const [modalDetalles, setModalDetalles] = useState(false); // Agregar estado para controlar el modal
  const [ProcesosDdl, setProcesosDdl] = useState([]);
  const [EmpleadosDdl, setEmpleadosDdl] = useState([]);
  const [detalleExiste, setDetalleExiste] = useState(true); //Verifica si el detalle de PO ingresado existe
  // const [orcoId, setOrcoId] = useState("");
  const [clieNombre, setClieNombre] = useState("");
  //variable para la barra de busqueda
  const [searchText, setSearchText] = useState("");

  /* Datos de la tabla */
  const [data, setData] = useState([]);
  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Para mostrar un proceso (label) luego de insertar un registro que lo utilice
  // const labels = useSelector(selectLabels);
  const selectedLabels = useSelector(selectSelectedLabels);

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "extendedProps.asor_Id"];

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  //Constantes para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);
  //Variables para los collapse
  const [mostrarIndex, setMostrarIndex] = useState(true);
  const [mostrarAdd, setMostrarAdd] = useState(false);
  const [mostrarDelete, setMostrarDelete] = useState(false);

  // Campos para el DDL de Lotes
  const [Lotes, SetLotes] = useState([]);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const DialogDetalles = () => {
    setModalDetalles(!modalDetalles);
  };

  const handleOpen = () => {
    if (detalles.length < 1) {
      setOpen("edit");
      setMostrarAdd(true);
      setMostrarIndex(false);
    } else {
      setOpen("edit");
      setMostrarAdd(false);
      setMostrarIndex(true);
    }
  };

  const LotesGet = async () => {
    try {
      const data = await load_DDLs.Lotes();
      SetLotes(data);
    } catch (error) {
      
    }
  };
  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setMostrarIndex(!mostrarIndex);
    setMostrarAdd(!mostrarAdd);
  };

  useEffect(() => {
    trigger("extendedProps.detallePO");
  }, [detalleExiste]);

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const eventDialog = useSelector(selectEventDialog);
  const firstLabelId = useSelector(selectFirstLabelId);

  const {
    handleSubmit,
    reset,
    formState,
    watch,
    control,
    setValue,
    getValues,
    trigger,
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const start = watch("start");
  const end = watch("end");
  const id = watch("id");
  const formData = watch();

  /* DDLS*/
  const CargasDatosDdl = async () => {
    const customHeaders = {
      XApiKey: instance.extraerToken(),
    };
    const baseURL = process.env.REACT_APP_API_URL + "api/";

    const axiosInstance = axios.create({
      baseURL: baseURL,
      headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem("user"));

    // const responseDdl = async (id) => {
    //   try {
    //     const texto = id
    //     const partes = texto.split('-'); // Divide la cadena en dos partes en función del guión "-"
    //     let ultimosDigitos = null
    //     if (partes.length > 1) {
    //       ultimosDigitos = partes[1].trim(); // Obtiene la segunda parte (después del guión) y elimina espacios en blanco
    //     }
    //     const data = await load_DDLs.ProcesosFiltrados(ultimosDigitos)
    //     setProcesosDdl(data)
    //   } catch (error) {
    //     
    //   }
    // };

    // const responseDdl = await axiosInstance.get("Procesos/Listar");
    // setProcesosDdl(
    //   responseDdl.data.data.map((item) => ({
    //     proc_Id: item.proc_Id,
    //     proceso: item.proc_Descripcion,
    //   }))
    // );

    const responseDdl2 = await axiosInstance.get(
      `Empleados/Listar?empl_EsAduana=${user["esAduana"].toString()}`
    );
    setEmpleadosDdl(
      responseDdl2.data.data.map((item) => ({
        value: item.empl_Id,
        label: item.empl_Nombres + " " + item.empl_Apellidos,
      }))
    );
  };
  var procs;

  const handleBlur = async () => {
    try {
      const detallePO = formData.extendedProps.detallePO;
      
      if (detallePO) {
        const response = await getOrdenCompraDetallesInfo(`${detallePO.orco} - ${detallePO.code}`);
        procs = await load_DDLs.ProcesosFiltrados(detallePO.code)
        History.push("/Planificacion/Index",procs);
        procs = null

        setValue("extendedProps.color", response.colr_Nombre);
        setValue("extendedProps.estilo", response.esti_Descripcion);
        setValue("extendedProps.talla", response.tall_Nombre);
        // setValue("extendedProps.detallePO.orco", response.orco_Codigo);
        // setValue("extendedProps.detallePO.code", response.code_Id);
        // setOrcoId(response.orco_Codigo);
        setClieNombre(response.clie_Nombre_O_Razon_Social);
        setValue("extendedProps.descripcionDetalle", `Cantidad de ítems: ${response.cantidad_Items
          }\nFecha de emisión: ${new Date(response.orco_FechaEmision)
            .toLocaleString()
            .split(",")[0]
          }\nFecha límite: ${new Date(response.orco_FechaLimite).toLocaleString().split(",")[0]
          }`)
        setDetalleExiste(true);
      } else {
        setValue("extendedProps.color", "");
        setValue("extendedProps.estilo", "");
        setValue("extendedProps.talla", "");
        // setValue("extendedProps.detallePO.orco", "");
        // setOrcoId("");
        setDetalleExiste(false);
        setClieNombre("");
      }
    } catch (error) {
      setValue("extendedProps.color", "");
      setValue("extendedProps.estilo", "");
      setValue("extendedProps.talla", "");
      // setValue("extendedProps.detallePO.orco", "");
      // setOrcoId("");
      setClieNombre("");

      setDetalleExiste(false);
    }
  };

  const handleDelete = () => {
    DialogEliminar();
  };

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */

    if (eventDialog.type === "edit" && eventDialog.data) {
      reset({ ...eventDialog.data });

      if (!eventDialog.data.end) {
        setValue("end", eventDialog.data.extendedProps.fechalimite);
      }

      if (eventDialog.data.extendedProps?.detalles) {
        detalles = eventDialog.data.extendedProps?.detalles;
      } else {
        detalles = [];
      }
    }

    /**
     * Dialog type: 'new'
     */
    if (eventDialog.type === "new") {
      reset({
        ...defaultValues,
        ...eventDialog.data,
        extendedProps: {
          ...defaultValues.extendedProps,
          label: firstLabelId,
        },
        id: FuseUtils.generateGUID(),
      });
    }
  }, [eventDialog.data, eventDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (eventDialog.props.open) {
      initDialog();
    }
  }, [eventDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    detalles = [];
    return eventDialog.type === "edit"
      ? dispatch(closeEditEventDialog())
      : dispatch(closeNewEventDialog());
  }

  const updateDetalles = (detallesNuevo) => {
    detalles = detallesNuevo;
    setValue("extendedProps.detalles", detalles);
  };

  function onSubmit() {
    try {
      if (isValid) {
        if (clieNombre != "") {
          formData.title = `${clieNombre} PO: ${formData.extendedProps.detallePO.orco} Código ítem: ${formData.extendedProps.detallePO.code}`;
        }

        if (eventDialog.type === "new") {
          dispatch(addEvent(formData));
          if (!selectedLabels.includes(formData.extendedProps.label)) {
            dispatch(toggleSelectedLabels(formData.extendedProps.label));
          }
          ToastSuccess();
        } else {
          formData.allDay = true;
          setValue("fechalimite", "end");
          dispatch(updateEvent({ ...eventDialog.formData, ...formData }));

          ToastSuccess();
        }

        closeComposeDialog();
      } else {
        ToastWarning("Complete todos los campos");
      }
    } catch (error) {
      ToastError("Error inesperado");
      ;
    }
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    try {
      // const ids = {
      //   id: id,
      //   asor_Id: formData.extendedProps.asor_Id,
      // };
      dispatch(removeEvent(formData.id));
      // removeEvent(id, formData.extendedProps.asor_Id);
      ToastSuccess();
    } catch {
      ToastError("Error inesperado");
      ;
    }

    setEliminar(false);
    closeComposeDialog();
  }

  const propsObject = {
    VisibilidadTabla,
    mostrarIndex,
    mostrarAdd,
    open,
    setOpen,
    handleOpen,
    detalles,
    updateDetalles,
    Lotes,
    eventDialog
  };

  return (
    <Popover
      {...eventDialog.props}
      anchorReference="anchorPosition"
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      onClose={closeComposeDialog}
      component="form"
    >
      <ToastContainer />

      <br></br>

      {/* <img src='https://i.ibb.co/vz0XJyB/AGREGAR.png' width={250} style={{ alignItems: 'center', marginLeft: '125px' }}></img> */}

      <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-20 sm:p-32 w-480">
        <div className="flex sm:space-x-20 mb-10">
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "center" }}
            style={{ marginTop: "10px" }}
          >
            <FuseSvgIcon
              className="hidden sm:inline-flex mt-16"
              color="action"
              style={{ width: "50px" }}
            >
              heroicons-outline:pencil-alt
            </FuseSvgIcon>
            <Controller
              name="extendedProps.detallePO.orco"
              // className="mr-10"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  // id='detallePO'
                  error={!!errors.extendedProps?.detallePO}
                  helperText={errors?.extendedProps?.detallePO?.message}
                  style={{ borderRadius: "10px", width: "165px", marginRight: "15px" }}
                  // onChange={(event) => detallePO(event.target.value)}
                  onBlur={handleBlur}
                  autoFocus={eventDialog.type !== "edit" ? true : false}
                  variant="outlined"
                  label="Orden de Compra"
                />
              )}
            />

            <Controller
              name="extendedProps.detallePO.code"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  // id='detallePO'
                  error={!!errors.extendedProps?.detallePO}
                  // helperText={errors?.extendedProps?.detallePO?.message}
                  style={{ borderRadius: "10px", width: "165px" }}
                  // onChange={(event) => detallePO(event.target.value)}
                  onBlur={handleBlur}
                  variant="outlined"
                  type="number"
                  label="# Detalle de PO"
                />
              )}
            />

          </Grid>
        </div>
        <div className="flex sm:space-x-20 mb-10">
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "center" }}
            style={{ marginTop: "10px" }}
          >
            <FuseSvgIcon
              className="hidden sm:inline-flex mt-16"
              color="action"
              style={{ width: "50px" }}
            >
              material-outline:dry_cleaning
            </FuseSvgIcon>
            <Controller
              name="extendedProps.estilo"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  disabled
                  {...field}
                  id="estilo"
                  style={{ borderRadius: "10px", width: "100px" }}
                  label="Estilo"
                />
              )}
            />
            <Controller
              name="extendedProps.talla"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  disabled
                  {...field}
                  name="talla"
                  style={{
                    borderRadius: "10px",
                    width: "75px",
                    marginLeft: "15px",
                  }}
                  label="Talla"
                />
              )}
            />
            <Controller
              name="extendedProps.color"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  disabled
                  {...field}
                  name="color"
                  style={{
                    borderRadius: "10px",
                    width: "145px",
                    marginLeft: "15px",
                  }}
                  label="Color"
                />
              )}
            />
          </Grid>
        </div>
        <div className="flex sm:space-x-20 mb-10">
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "center" }}
            style={{ marginTop: "10px" }}
          >
            <FuseSvgIcon
              className="hidden sm:inline-flex mt-16"
              color="action"
              style={{ width: "50px" }}
            >
              material-outline:calendar_today
            </FuseSvgIcon>

            <Grid item xs={6}>
              <Controller
                name="start"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <DateTimePicker
                    variant="outlined"
                    dateFormat="dd/MM/yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(_props) => (
                      <TextField
                        error={!!errors.start}
                        label="Fecha de inicio"
                        id="start"
                        style={{ borderRadius: "10px", width: "168px" }}
                        className="w-full"
                        {..._props}
                      />
                    )}
                    maxDate={end}
                    className="w-full"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="end"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    renderInput={(_props) => (
                      <TextField
                        error={!!errors.end}
                        label="Fecha de fin"
                        id="end"
                        style={{
                          borderRadius: "10px",
                          width: "168px",
                          marginLeft: "15px",
                        }}
                        className="w-full"
                        {..._props}
                      />
                    )}
                    minDate={start}
                    className="w-full"
                  />
                )}
              />
            </Grid>
          </Grid>
        </div>

        <div className="flex sm:space-x-20 mb-10">
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "center" }}
            style={{ marginTop: "10px" }}
          >
            <FuseSvgIcon
              className="hidden sm:inline-flex mt-16"
              color="action"
              style={{ width: "50px" }}
            >
              material-outline:settings
            </FuseSvgIcon>

            <Controller
              name="extendedProps.label"
              control={control}
              render={({ field }) => (
                <EventLabelSelect
                  className="mt-8 mb-16"
                  {...field}
                  error={!!errors.label}
                />
              )}
            />
          </Grid>
        </div>

        <div className="flex sm:space-x-20 mb-10">
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "center" }}
            style={{ marginTop: "10px" }}
          >
            <FuseSvgIcon
              className="hidden sm:inline-flex mt-16"
              color="action"
              style={{ width: "50px" }}
            >
              material-outline:volunteer_activism
            </FuseSvgIcon>

            <Controller
              name="extendedProps.empleadoencargado"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth={true}
                  error={!!errors.extendedProps?.empleadoencargado}
                >
                  {/* <InputLabel htmlFor="grouped-native-select">
                    Empleado Encargado
                  </InputLabel> */}
                  {/* <Select
                    {...field}
                    style={{ borderRadius: "4px", width: "200px" }}
                    // id='empleadoencargado'
                    error={!!errors.extendedProps?.empleadoencargado}
                    label="Empleado Encargado"
                  >
                    {EmpleadosDdl.map((empleado) => (
                      <MenuItem key={empleado.empl_Id} value={empleado.empl_Id}>
                        {empleado.empleado}
                      </MenuItem>
                    ))}
                  </Select> */}

                  <Autocomplete
                    {...field}
                    disablePortal
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    style={{ borderRadius: "4px", width: "200px" }}
                    // label="Empleado Encargado"
                    id="extendedProps.empleadoencargado"
                    //disabled={Tap1Activado}
                    options={EmpleadosDdl}
                    disableClearable={true}
                    value={formData.extendedProps.empleadoencargado ?? null}
                    onChange={(event, value) => {
                      setValue("extendedProps.empleadoencargado", value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.extendedProps?.empleadoencargado}
                        label="Empleado encargado"
                      />
                    )}
                  />
                </FormControl>
              )}
            />

            <Controller
              name="extendedProps.cantidad"
              // defaultValue={[0]}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  // id='cantidad'
                  error={!!errors.extendedProps?.cantidad}
                  type="number"
                  style={{ borderRadius: "10px", width: "145px" }}
                  label="Cantidad"
                />
              )}
            />
          </Grid>
        </div>
        <div className="flex sm:space-x-20 mb-10">
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "center" }}
            style={{ marginTop: "10px" }}
          >
            <FuseSvgIcon
              className="hidden sm:inline-flex mt-16"
              color="action"
              style={{ width: "50px" }}
            >
              material-outline:animation
            </FuseSvgIcon>
            <FormControl>
              <TextField
                style={{
                  borderRadius: "10px",
                  width: "350px",
                  position: "relative",
                }}
                label="Lotes Asignados"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div
                        style={{
                          maxWidth: "78%",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {detalles.length > 0 && detalles[0].lote_Id > 0
                          ? formData.extendedProps?.detalles.map(
                            (detalle, index) =>
                              index <
                                formData.extendedProps.detalles.length - 1
                                ? detalle.lote_CodigoLote + ", "
                                : detalle.lote_CodigoLote
                          )
                          : null}
                      </div>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {detalles.length > 0  && detalles.lote_Id > 0 ? (
                        <IconButton onClick={handleOpen}>
                          <FuseSvgIcon
                            color="action"
                            style={{ width: "24px", height: "24px" }}
                          >
                            heroicons-outline:eye
                          </FuseSvgIcon>
                        </IconButton>
                      ) : (
                        <IconButton onClick={handleOpen}>
                          <FuseSvgIcon
                            color="action"
                            style={{ width: "24px", height: "24px" }}
                          >
                            heroicons-outline:plus-circle
                          </FuseSvgIcon>
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
        </div>
        <br></br>

        <div className="flex sm:space-x-20 mb-10">
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
            style={{ marginLeft: "100px" }}
          >
            {eventDialog.type == "edit" ? (
              <>
                <IconButton onClick={() => DialogDetalles()} size="large">
                  <FuseSvgIcon>heroicons-outline:search</FuseSvgIcon>
                </IconButton>

                <IconButton onClick={() => handleDelete()} size="large">
                  <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                </IconButton>
              </>
            ) : null}
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={() => {
                // onSubmit();
                handleSubmit(onSubmit)();
              }}
            >
              Guardar{" "}
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={closeComposeDialog}
            >
              Cancelar{" "}
            </Button>
          </Grid>
        </div>
      </div>

      {/*Modal para eliminar */}
      <Dialog
        open={Eliminar}
        fullWidth={"md"}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="error"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              // sx={{
              //   backgroundColor: "#634A9E",
              //   color: "white",
              //   "&:hover": { backgroundColor: "#6e52ae" },
              // }}
              onClick={handleRemove}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
        open={modalDetalles}
        fullWidth={"md"}
        onClose={DialogDetalles}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {"Confirmación de Eliminación"} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* ¿Está seguro(a) que desea eliminar este registro? */}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginBottom: "10px" }}>
                  <Chip label="Auditoría de la planificación" />
                </Divider>
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Box sx={{ textAlign: "center" }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Identificador de la asignación:
                    </Typography>
                    <Typography>{formData["id"]}</Typography>
                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <table
                  id="detallesTabla"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th style={estilosTablaDetalles.tableHeaderStyle}>
                        <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>
                        Accion
                      </th>
                      <th style={estilosTablaDetalles.tableHeaderStyle}>
                        <Icon style={estilosTablaDetalles.iconStyle}>
                          person
                        </Icon>
                        Usuario
                      </th>
                      <th style={estilosTablaDetalles.tableHeaderStyle}>
                        <Icon style={estilosTablaDetalles.iconStyle}>
                          date_range
                        </Icon>
                        Fecha y hora
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={estilosTablaDetalles.tableRowStyle}>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        <strong>Creación</strong>
                      </td>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        {formData.extendedProps["UsuarioCreacion"]}
                      </td>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        {new Date(
                          formData.extendedProps["FechaCreacion"]
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr style={estilosTablaDetalles.tableRowStyle}>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        <strong>Modificación</strong>
                      </td>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        {formData.extendedProps["UsuarioModificacion"]}
                      </td>
                      <td style={estilosTablaDetalles.tableCellStyle}>
                        {formData.extendedProps["FechaModificacion"]
                          ? new Date(
                            formData.extendedProps["FechaModificacion"]
                          ).toLocaleString()
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={DialogDetalles}
            >
              Cerrar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <AsignacionOrdenDetalles props={propsObject}></AsignacionOrdenDetalles>

      <ToastContainer />
    </Popover>
  );
}

export default EventDialog;
