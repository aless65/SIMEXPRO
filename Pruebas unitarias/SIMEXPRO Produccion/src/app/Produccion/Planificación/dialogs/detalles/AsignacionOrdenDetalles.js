import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useCallback, useEffect } from "react";
import * as yup from "yup";
import _ from "@lodash";
import {
  Popover,
  MenuItem,
  Menu,
  Divider,
  Chip,
  Typography,
  Stack,
  Collapse,
  FormLabel,
  Autocomplete,
} from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { FormControl, Icon, InputAdornment, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import { useState } from "react";
import * as React from "react";
// import { useForm } from 'react-hook-form';
import EventModel from "../../model/EventModel";
import {
  getLotesInfo,
  AddDetalles,
  EditDetalles,
  DeleteDetalles,
} from "../../store/eventsSlice";
// import CardMedia from '@mui/material/CardMedia';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import "src/styles/custom-pagination.css";
import { object } from "prop-types";

const AsignacionOrdenDetalles = ({ props }) => {
  const {
    VisibilidadTabla,
    mostrarIndex,
    mostrarAdd,
    open,
    setOpen,
    handleOpen,
    detalles,
    updateDetalles,
    Lotes,
    eventDialog,
  } = props;
  const defaultValuesLotes = EventModel().extendedProps.detalles[0];

  /**
   * Form Validation Schema
   */

  const schema = yup.object().shape({
    lote_CodigoLote: yup.string().required(""),
    adet_Cantidad: yup
      .number()
      .required("")
      .min(1, "Ingrese una cantidad válida")
      .max(1000000, "Ingrese una cantidad válida"),
  });

  //variable para la barra de busqueda
  const [searchText, setSearchText] = useState("");

  /* Datos de la tabla */
  const [detallesNuevo, setDetallesNuevo] = useState([]);
  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "id"];

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(5);

  //Constantes para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  //Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  const [loteViejo, setLoteViejo] = useState(0);

  // const [loteEditar, setLoteEditar] = useState({
  //   lote_viejo: "",
  //   lote_nuevo: "",
  // });

  let loteEditar = {
    lote_viejo: "",
    lote_nuevo: "",
  };

  // let loteViejo;

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Cierra el menu abierto
  const handleCloseMenu = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Código",
      dataIndex: "lote_CodigoLote",
      key: "lote_CodigoLote",
      sorter: (a, b) => a.lote_CodigoLote.localeCompare(b.lote_CodigoLote), //sorting para Letras
    },
    {
      title: "Material",
      dataIndex: "materialnombre",
      key: "materialnombre",
      sorter: (a, b) => a.materialnombre.localeCompare(b.materialnombre), //sorting para Letras
    },
    {
      title: "Color",
      dataIndex: "colornombre",
      key: "colornombre",
      sorter: (a, b) => a.colornombre?.localeCompare(b.colornombre), //sorting para Letras
    },
    {
      title: "Cantidad",
      dataIndex: "adet_Cantidad",
      key: "adet_Cantidad",
      sorter: (a, b) => a.adet_Cantidads.localeCompare(b.adet_Cantidads), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.key}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.key}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.key)}
              variant="contained"
              style={{
                borderRadius: "10px",
                backgroundColor: "#634A9E",
                color: "white",
              }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.key}`}
              anchorEl={anchorEl[params.key]}
              keepMounted
              open={Boolean(anchorEl[params.key])}
              onClose={() => handleCloseMenu(params.key)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon>  Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    //insertar aca las variables necesarias en su formulario
    setValue("key", datos["key"]);
    setValue("lote_CodigoLote", datos["lote_CodigoLote"]);
    setValue("lote_Id", datos["lote_Id"]);
    setValue(
      "lote_Objeto",
      Lotes.find((Lotes) => Lotes.value === datos["lote_CodigoLote"])
    );
    setValue("adet_Cantidad", datos["adet_Cantidad"]);
    setValue("colornombre", datos["colornombre"]);
    setValue("materialnombre", datos["materialnombre"]);
    handleCloseMenu(datos.key);

    // loteEditar = {
    //   lote_nuevo: '',
    //   lote_viejo: datos["lote_Id"],
    // };

    setLoteViejo(datos["lote_Id"]);

  };

  const handleDelete = (datos) => {
    setValue("key", datos["key"]);
    setValue("lote_Id", datos["lote_Id"]);
    DialogEliminar();
    handleCloseMenu(datos.key);
  };

  useEffect(() => {
    setDetallesNuevo(detalles);
  }, [open]);

  const handleClose = () => {
    updateDetalles(detallesNuevo);
    props.setOpen(false);
    reset(defaultValuesLotes);
  };

  // const eventDialog = useSelector(selectEventDialog);

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
    defaultValues: defaultValuesLotes,
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

  const formDataLotes = watch();

  //Constante que ayuda a filtrar el datatable
  const filteredRows = detallesNuevo?.filter((row) => {
    if (searchText === "") {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === "number"
            ? value.toString()
            : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === "number"
            ? searchText.toString()
            : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });

  function onSubmit() {
    trigger();
    if (isValid) {
      if (!editar) {
        detallesCreate();
      } else {
        detallesEdit();
      }
      VisibilidadTabla();
      reset(defaultValuesLotes);
    } else {
    }
  }

  const detallesCreate = async () => {
    const loteCodigoExisteIndex = detallesNuevo.findIndex(
      (item) => item.lote_CodigoLote === formDataLotes.lote_CodigoLote
    );

    if (loteCodigoExisteIndex !== -1) {
      let detalleEdit = [...detallesNuevo];
      detalleEdit[loteCodigoExisteIndex] = {
        ...detalleEdit[loteCodigoExisteIndex],
        adet_Cantidad:
          parseInt(detalleEdit[loteCodigoExisteIndex].adet_Cantidad) +
          parseInt(formDataLotes.adet_Cantidad),
      };
      setDetallesNuevo(detalleEdit);
    } else {
      formDataLotes.key = detallesNuevo.length + 1;
      setDetallesNuevo([...detallesNuevo, formDataLotes]);
    }

    if (props.eventDialog.type === "edit") {
      const response = await AddDetalles(
        formDataLotes,
        props.eventDialog.data.id
      );
      ;
    }
  };

  const detallesEdit = async () => {
    const loteCodigoExisteIndex = detallesNuevo.findIndex(
      (item) => item.lote_CodigoLote === formDataLotes.lote_CodigoLote
    );

    let detalleEdit = [...detallesNuevo];

    if (
      loteCodigoExisteIndex !== -1 &&
      formDataLotes.key - 1 !== loteCodigoExisteIndex
    ) {
      detalleEdit[loteCodigoExisteIndex] = {
        ...detalleEdit[loteCodigoExisteIndex],
        adet_Cantidad:
          parseInt(detalleEdit[loteCodigoExisteIndex].adet_Cantidad) +
          parseInt(formDataLotes.adet_Cantidad),
      };

      detalleEdit.splice(formDataLotes.key - 1, 1);

      for (let i = formDataLotes.key - 1; i < detalleEdit.length; i++) {
        detalleEdit[i] = {
          ...detalleEdit[i],
          key: i + 1,
        };
      }

      if (props.eventDialog.type === "edit") {

        loteEditar = {
          lote_viejo: detalleEdit[loteCodigoExisteIndex].lote_Id,
          lote_nuevo: detalleEdit[loteCodigoExisteIndex].lote_Id,
        };

        const response = await EditDetalles(
          detalleEdit[loteCodigoExisteIndex],
          props.eventDialog.data.id,
          loteEditar
        );


        const responseDelete = await DeleteDetalles(
          loteViejo,
          props.eventDialog.data.id
        );

      }

      // if (props.eventDialog.type === "edit") {
      //   const responseDelete = await DeleteDetalles(formDataLotes.lote_Id, props.eventDialog.data.id);
      // }
    } else {
      detalleEdit[formDataLotes.key - 1] = {
        ...detalleEdit[formDataLotes.key - 1],
        key: formDataLotes.key,
        lote_Id: formDataLotes.lote_Id,
        materialnombre: formDataLotes.materialnombre,
        colornombre: formDataLotes.colornombre,
        lote_CodigoLote: formDataLotes.lote_CodigoLote,
        adet_Cantidad: formDataLotes.adet_Cantidad,
      };

      if (props.eventDialog.type === "edit") {

        loteEditar = {
          lote_viejo: loteViejo,
          lote_nuevo: formDataLotes.lote_Id,
        };

        const response = await EditDetalles(
          formDataLotes,
          props.eventDialog.data.id,
          loteEditar
        );

        ;
      }
    }
    setDetallesNuevo(detalleEdit);
  };

  const detallesDelete = async () => {
    let detalleDelete = [...detallesNuevo];
    const indexAEliminar = formDataLotes.key - 1;

    detalleDelete.splice(indexAEliminar, 1);

    for (let i = indexAEliminar; i < detalleDelete.length; i++) {
      detalleDelete[i] = {
        ...detalleDelete[i],
        key: i + 1,
      };
    }

    if (props.eventDialog.type === "edit") {
      const responseDelete = await DeleteDetalles(
        formDataLotes.lote_Id,
        props.eventDialog.data.id
      );
    }

    setDetallesNuevo(detalleDelete);
    DialogEliminar();
    reset(defaultValuesLotes);
  };

  const handleValidacionLote = async (value) => {
    try {
      setValue("lote_Objeto", value);
      setValue("lote_CodigoLote", value.value);

      const codigoLote = value.value;
      if (codigoLote) {
        const response = await getLotesInfo(codigoLote);


        setValue("lote_Id", response[0].lote_Id);
        setValue("materialnombre", response[0].mate_Descripcion);
        setValue("colornombre", response[0].colr_Nombre);
      } else {
        setValue("lote_Id", "");
        setValue("materialnombre", "");
        setValue("colornombre", "");
      }
    } catch (error) {
      setValue("lote_CodigoLote", "");
      setValue("lote_Id", "");
      setValue("materialnombre", "");
      setValue("colornombre", "");
    }
  };

  return (
    <div>
      <ToastContainer />

      {/*Modal para index de lotes al editar*/}
      <Dialog
        open={props.open === "edit"}
        fullWidth
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        maxWidth="md"
      >
        <Collapse in={props.mostrarIndex}>
          <br></br>
          <DialogTitle
            id="alert-dialog-title"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/sy9YsCk/ASIGNAR-LOTES.png)",
              backgroundSize: "cover",
              height: "130px",
              backgroundPosition: "center",
              color: "white", // Color del texto en el encabezado
              textAlign: "center", // Alinea el texto en el centro
            }}
          ></DialogTitle>
          <DialogContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "space-between" }}
              className="mt-24"
            >
              <Button
                startIcon={<Icon>add</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: "10px" }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
                }}
                onClick={() => {
                  reset(defaultValuesLotes);
                  VisibilidadTabla();
                  setEditar(false);
                }}
              >
                Nuevo
              </Button>

              <Button
                startIcon={<Icon>arrow_back</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: "10px" }}
                sx={{
                  backgroundColor: "#DAD8D8",
                  color: "black",
                  "&:hover": { backgroundColor: "#BFBABA" },
                }}
                onClick={handleClose}
              >
                Regresar
              </Button>
            </Stack>

            <Table
              className="mt-24"
              columns={columns}
              dataSource={filteredRows}
              size="small"
              locale={{
                triggerDesc: "Ordenar descendente",
                triggerAsc: "Ordenar ascendente",
                cancelSort: "Cancelar",
                emptyText: LoadingIcon(),
              }}
              pagination={{
                pageSize: filas,
                showSizeChanger: false,
                className: "custom-pagination",
              }}
            />
          </DialogContent>
        </Collapse>

        <Collapse in={props.mostrarAdd}>
          <DialogTitle
            className="mt-20"
            id="alert-dialog-title"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/sy9YsCk/ASIGNAR-LOTES.png)",
              backgroundSize: "cover",
              height: "130px",
              backgroundPosition: "center",
              color: "white", // Color del texto en el encabezado
              textAlign: "center", // Alinea el texto en el centro
            }}
          >
            {/* Asignar Lotes */}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} className="mt-24">
              <Grid item xs={6}>
                <Controller
                  name="lote_Objeto"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      error={!!errors.lote_CodigoLote}
                      fullWidth={true}
                    >
                      <FormLabel>Lote</FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        id="lote_Objeto"
                        //disabled={Tap1Activado}
                        options={Lotes}
                        disableClearable={true}
                        value={formDataLotes["lote_Objeto"] ?? null}
                        onChange={(event, value) => {
                          handleValidacionLote(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.lote_CodigoLote}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel error={!!errors.adet_Cantidad}>Cantidad</FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="adet_Cantidad"
                      type="number"
                      {...field}
                      fullWidth
                      variant="outlined"
                      error={!!errors.adet_Cantidad}
                    />
                  )}
                  name="adet_Cantidad"
                  control={control}
                />
              </Grid>
              <Grid
                container
                display={"flex"}
                className="mt-20"
                justifyContent={"end"}
                spacing={0}
              >
                <Grid item>
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
                      handleSubmit(onSubmit)();
                    }}
                  >
                    Guardar{" "}
                  </Button>
                </Grid>
                <Grid item>
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
                    onClick={() => {
                      reset(defaultValuesLotes);
                      VisibilidadTabla();
                    }}
                  >
                    Cancelar{" "}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <div className="flex sm:space-x-20 mb-10">
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
              }}
              style={{ marginLeft: "115px" }}
            ></Grid>
          </div>
          <br></br>
        </Collapse>
      </Dialog>

      {/* Inicia del Dialog(Modal) Eliminar */}
      <Dialog
        open={Eliminar}
        fullWidth="md"
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
              onClick={detallesDelete}
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
      {/* Fin del Dialog(Modal) Eliminar */}

      <ToastContainer />
    </div>
  );
};

export default AsignacionOrdenDetalles;
