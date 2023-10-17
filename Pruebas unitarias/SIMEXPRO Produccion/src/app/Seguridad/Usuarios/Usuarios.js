/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ExportToCsv } from "export-to-csv";
import React, { useEffect, useRef, useState } from "react";
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";
//Imports de validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import { Image, Table, Tag } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

//Imports tabla
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";

//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";

//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";

//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
  ToastError,
  ToastErrorPersonalizado,
  ToastSuccess,
  ToastSuccessEditar,
  ToastSuccessPersonalizado,
  ToastWarning,
  ToastWarningPersonalizado,
  ToastWarningYaExiste,
} from "src/styles/toastsFunctions";
import Usuarioservice from "./UsuariosService";

const botonStyle = {
  backgroundColor: "#634A9E",
  color: "white",
  "&:hover": { backgroundColor: "#6e52ae" },
};

function UsuariosIndex() {
  const [checked, setChecked] = useState(false);
  const [checkedEditar, setCheckedEditar] = useState(false);
  const [AdminRol, setAdminRol] = useState(false);
  const [AdminRolEditar, setAdminRolEditar] = useState(false);

  {
    /*Constantes para validaciones Agregar inicio */
  }
  const camposUsuarios = {
    NombreUsuario: "",
    ContraUsuario: "",
    Empleado: null,
    UsuarioRol: null,
  };

  const schemaUsuarios = yup.object().shape({
    NombreUsuario: yup.string().trim().max(150).required(),
    ContraUsuario: yup.string().max(150).required(),
    Empleado: yup.object().required(""),
    UsuarioRol: yup.object().nullable(checked),
  });
  {
    /*Constantes para validaciones Agregar fin */
  }

  {
    /*Constantes para validaciones Editar inicio */
  }
  const camposUsuariosEditar = {
    NombreUsuarioEditar: "",
    EmpleadoEditar: null,
    UsuarioRolEditar: null,
  };

  const schemaUsuariosEditar = yup.object().shape({
    NombreUsuarioEditar: yup.string().trim().max(150).required(),
    EmpleadoEditar: yup.object().required(""),
    UsuarioRolEditar: yup.object().when([], {
      is: () => !checkedEditar,
      then: yup.object().required("Passphrase is required"),
    }),
  });
  {
    /*Constantes para validaciones Editar fin */
  }

  const load_DDLs = Load_DDLs();
  const usuarioservice = Usuarioservice();
  const [ExportData, SetExportData] = useState([]);

  const fileInputRef = useRef(null);

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);
  const [botonDesactivado, setBotonDesactivado] = useState(false);
  //Constantes para los Collapse de agregar, editar y detalles
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [Aceptar, setAceptar] = useState(false);
  const [AceptarEditar, setAceptarEditar] = useState(false);
  const [habilitar, setHabilitar] = useState(false);
  const [RolSeleccionado, setRolSeleccionado] = useState("");
  const [RolSeleccionadoEditar, setRolSeleccionadoEditar] = useState("");
  //Campos para guardar el registro de una fila
  const [datosFila, setDatosFila] = useState({});
  const [Activar, setActivar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [Id, setId] = useState(0);
  const [DetallesTabla, setDetallesTabla] = useState([]);
  const [image, setimage] = useState(
    "https://i.ibb.co/8MKqj1C/Avatar-Usuario.png"
  );

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  const camposToFilter = [
    "key",
    "usua_Nombre",
    "emplNombreCompleto",
    "role_Descripcion",
  ];

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  //constante que me carga la imagen por defecto del usuario en caso que no seleccione una
  const [userImage, setUserImage] = useState(
    "https://i.ibb.co/8MKqj1C/Avatar-Usuario.png"
  );

  //Variables DDL
  const [Empleados_DDL, setEmpleados_DDL] = useState([]);
  const [Roles_DDL, setRoles_DDL] = useState([]);

  //Variables oara setear la cantidad de registro que se mostraran en la tabla
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Cargado de las variables DDL
  async function ddls() {
    setEmpleados_DDL(await usuarioservice.EmpleadosNoTieneUsuario());
    setRoles_DDL(await usuarioservice.RolesPorModulo());
  }

  //Peticion para cargar datos de la tabla
  const [cargandoData, setCargandoData] = useState([]);
  const UsuariosGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);
      const data = await usuarioservice.listar();
      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await usuarioservice.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = async () => {
    setTimeout(() => {
      reset(camposUsuarios);
      setChecked(false);
      setimage("https://i.ibb.co/8MKqj1C/Avatar-Usuario.png");
      setmostrarIndex(!mostrarIndex);
      setmostrarAgregar(!mostrarAgregar);
    }, 0);
    setEmpleados_DDL(await usuarioservice.EmpleadosNoTieneUsuario());
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTablaEditar = async () => {
    setEditar(false);
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    setTimeout(() => {
      resetEditar(camposUsuariosEditar);
      setChecked(false);
      setimage("https://i.ibb.co/8MKqj1C/Avatar-Usuario.png");
    }, 0);
    setEmpleados_DDL(await usuarioservice.EmpleadosNoTieneUsuario());
  };

  //Controlar el cambio de estado de si Administrador
  const handleChangeAdmin = (event) => {
    setChecked(event.target.checked);
    setAdminRol(!AdminRol);
  };

  //Controlar el cambio de estado de si Administrador
  const handleChangeAdminEditar = (event) => {
    setCheckedEditar(event.target.checked);
    setAdminRolEditar(!AdminRolEditar);
  };

  const handleCerrarDetalle = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const DialogAceptar = () => {
    if (!AdminRol) {
      setRolSeleccionado(datosWatch.UsuarioRol["label"]);
    }
    setAceptar(!Aceptar);
  };

  const DialogAceptarEditar = () => {
    if (!AdminRolEditar) {
      setRolSeleccionadoEditar(datosWatchEditar.UsuarioRolEditar["label"]);
    }
    setAceptarEditar(!AceptarEditar);
  };

  const DialogActivar = () => {
    setActivar(!Activar);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (datos) => {
    setDatosFila(datos);
    if (datos.usua_Estado) {
      setHabilitar(true);
    } else {
      setHabilitar(false);
    }
    DialogEliminar();
    handleClose(datos.usua_Id);
  };

  //Constante para cargar datos a las tablas
  const UsuariosAccion = async () => {
    try {
      if (habilitar) {
        const response = await usuarioservice.eliminar(datosFila);
        if (response === 3) {
          ToastErrorPersonalizado(
            "El usuario que desea deshabilitar está siendo utilizado"
          );
        } else {
          if (response.data.data.messageStatus === "1") {
            ToastSuccessPersonalizado(
              "El registro ha sido deshabilitado exitosamente"
            );
          } else {
            ToastErrorPersonalizado("No se pudo deshabilitar el registro");
          }
        }
      } else {
        const response = await usuarioservice.activar(datosFila);
        if (response.data.data.messageStatus === "1") {
          ToastSuccessPersonalizado(
            "El registro ha sido habilitado exitosamente"
          );
        } else {
          ToastErrorPersonalizado("No se pudo habilitar el registro");
        }
      }
      UsuariosGetData();
      DialogEliminar();
    } catch (error) { }
  };

  const handleDetails = (datos) => {
    setDetallesTabla(datos);
    setimage(datos.usua_Image);
    setTimeout(() => {
      setmostrarIndex(!mostrarIndex);
      setmostrarDetalles(!mostrarDetalles);
    }, 0);
    handleClose(datos.usua_Id);
  };

  //Handle que inicia la funcion de editar
  const handleEdit = async (datos) => {
    setEditar(true);
    setimage(datos.usua_Image);

    setValueEditar("NombreUsuarioEditar", datos.usua_Nombre);

    setAdminRolEditar(datos.usua_EsAdmin);
    setCheckedEditar(datos.usua_EsAdmin);

    const nuevoEmpleado = {
      value: datos.empl_Id,
      label: datos.emplNombreCompleto,
    };
    Empleados_DDL.push(nuevoEmpleado);

    setValueEditar(
      "EmpleadoEditar",
      Empleados_DDL.find(
        (empleados_DDL) => empleados_DDL.value === datos.empl_Id
      ) //importante para cargar bien los ddl al editar
    );

    setValueEditar(
      "UsuarioRolEditar",
      Roles_DDL.find((roles_DDL) => roles_DDL.value === datos.role_Id) //importante para cargar bien los ddl al editar
    );
    setId(datos.usua_Id);
    setTimeout(() => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
    }, 0);

    handleClose(datos.usua_Id);
  };

  //Constante que filtra las imagenes por medio de un FileReader
  //que basicamente proporciona una interfaz para leer de
  //forma asíncrona el contenido de un
  //archivo desde una aplicación web
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setimage(reader.result);
      };
    } else {
      ToastErrorPersonalizado("Archivo incorrecto");
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    UsuariosGetData();
  }, []);

  //Constante de las columnas del index
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Nombre del usuario",
      dataIndex: "usua_Nombre",
      key: "usua_Nombre",
      sorter: (a, b) => a.usua_Nombre.localeCompare(b.usua_Nombre), //sorting para Letras
    },
    {
      title: "Nombre del empleado",
      dataIndex: "emplNombreCompleto",
      key: "emplNombreCompleto",
      sorter: (a, b) =>
        a.emplNombreCompleto.localeCompare(b.emplNombreCompleto), //sorting para Letras
    },
    {
      title: "Rol asignado",
      dataIndex: "role_Descripcion",
      key: "role_Descripcion",
      sorter: (a, b) => a.role_Descripcion.localeCompare(b.role_Descripcion), //sorting para Letras
    },
    {
      title: "Estado del usuario",
      dataIndex: "usua_Estado",
      key: "usua_Estado",
      render: (text, record) => {
        return record.usua_Estado ? (
          <Tag color="green">
            {" "}
            <b>Activo</b>
          </Tag>
        ) : (
          <Tag color="red">
            <b>Inactivo</b>
          </Tag>
        );
      },
      // sorter: (a, b) => a.usua_Estado.localeCompare(b.usua_Estado), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.usua_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.usua_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.usua_Id)}
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
              id={`menu-${params.usua_Id}`}
              anchorEl={anchorEl[params.usua_Id]}
              keepMounted
              open={Boolean(anchorEl[params.usua_Id])}
              onClose={() => handleClose(params.usua_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                {params.usua_Estado ? (
                  <>
                    <Icon>highlight_off</Icon>ㅤDeshabilitar
                  </>
                ) : (
                  <>
                    <Icon>add_circle_outline</Icon>ㅤHabilitar
                  </>
                )}
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  const csvHeader = [
    {
      label: "No.",
    },
    {
      label: "Nombre del usuario",
    },
    {
      label: "Nombre del empleado",
    },
    {
      label: "Rol asignado",
    },
    {
      label: "Estado del usuario",
    },
  ];
  const csvOptions = {
    filename: "Usuarios",
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: csvHeader.map((c) => c.label),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    try {
      csvExporter.generateCsv(ExportData);
    } catch (error) { }
  };
  //Constante que ayuda a filtrar el datatable
  const filteredRows = data
    .filter((row) => {
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
    })
    .reverse();

  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultValues: camposUsuarios, //Campos del formulario
      mode: "all",
      resolver: yupResolver(schemaUsuarios), //Esquema del formulario
    });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  //Declaracion del formulario de editar
  const {
    handleSubmit: handleSubmitEditar,
    reset: resetEditar,
    control: controlEditar,
    watch: watchEditar,
    formState: formStateEditar,
    setValue: setValueEditar,
  } = useForm({
    defaultValues: camposUsuariosEditar, //Campos del formulario
    mode: "all",
    resolver: yupResolver(schemaUsuariosEditar), //Esquema del formulario
  });

  //Validacion de campos vacios y errores
  const {
    isValid: isValidEditar,
    dirtyFields: dirtyFieldsEditar,
    errors: errorsEditar,
  } = formStateEditar;

  //Datos del formulario
  const datosWatchEditar = watchEditar();

  //Controlador del formulario
  const GuardarUsuarios = () => {
    if (datosWatch.UsuarioRol === null && !checked) {
      ToastWarningPersonalizado(
        "Debe escoger entre ser administrador o tener un rol"
      );
    } else {
      if (isValid) {
        DialogAceptar();
      } else {
        ToastWarning("Completa todos los campos");
      }
    }
  };

  //Controlador del formulario
  const EditarUsuarios = () => {
    if (
      (datosWatchEditar.UsuarioRolEditar === undefined ||
        datosWatchEditar.UsuarioRolEditar === null) &&
      !checked
    ) {
      ToastWarning("Completa todos los campos");
    } else {
      if (
        datosWatchEditar.NombreUsuarioEditar != "" &&
        datosWatchEditar.EmpleadoEditar != null &&
        (datosWatchEditar.UsuarioRolEditar || AdminRolEditar)
      ) {
        // Validacion de campos completos
        DialogAceptarEditar();
      } else {
        ToastWarning("Completa todos los campos");
      }
    }
  };

  //Peticion para crear un registro
  const usuariosCreate = async () => {
    try {
      const response = await usuarioservice.crear(datosWatch, image, checked);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess();
        DialogAceptar();
        setSearchText("");
        UsuariosGetData();
        VisibilidadTabla();
        setTimeout(() => {
          reset(camposUsuarios);
        }, 0);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        DialogAceptar();
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  // Peticion para editar un registro
  const usuariosEdit = async () => {
    try {
      const response = await usuarioservice.editar(
        datosWatchEditar,
        Id,
        image,
        checkedEditar
      );
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        DialogAceptarEditar();
        setEditar(false);
        UsuariosGetData();
        VisibilidadTablaEditar();
        setTimeout(() => {
          resetEditar(camposUsuariosEditar);
        }, 0);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        DialogAceptarEditar();
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  const handleCloseExportar = () => {
    setAnchorEl((prevState) => ({
      ...prevState,
      ["menu-exportar"]: null,
    }));
  };

  const handleClickExportar = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/RgGNgZP/USUARIOS.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo */}
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              display={"flex"}
              sx={{
                justifyContent: { xs: "center", sm: "center", md: "start" },
              }}
            >
              <Stack direction="row" spacing={1}>
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
                    VisibilidadTabla();
                    setEditar(false);
                  }}
                >
                  Nuevo
                </Button>

                {/* Menu opener for CSV */}
                <Button
                  startIcon={<Icon>upload</Icon>}
                  onClick={(e) => handleClickExportar(e, "menu-exportar")}
                  sx={{
                    backgroundColor: "#dcc25a",
                    color: "white",
                    "&:hover": { backgroundColor: "#dcc25a" },
                  }}
                  style={{ borderRadius: "10px" }}
                >
                  <Typography>Exportar</Typography>
                  <MoreVert />
                </Button>

                {/* Menu de Exportacion */}
                <div key={"menu-exportar"}>
                  {/* Menu de Exportacion */}
                  <Menu
                    id={"menu-exportar"}
                    anchorEl={anchorEl["menu-exportar"]}
                    open={Boolean(anchorEl["menu-exportar"])}
                    onClose={() => handleCloseExportar()}
                    keepMounted
                  >
                    {/* Exportar a CSV */}
                    <MenuItem
                      onClick={() => {
                        handleExportData();
                        handleCloseExportar();
                      }}
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      <FileTextFilled style={{ fontSize: "20px" }} />
                      &nbsp;&nbsp;Archivo CSV
                    </MenuItem>

                    {/* Exportar a PDF */}
                    <PDFGenerator
                      data={data}
                      handleCloseExportar={handleCloseExportar}
                    />

                    {/* Exportar a Excel */}
                    <ExportToExcel
                      data={ExportData}
                      handleCloseExportar={handleCloseExportar}
                    />
                  </Menu>
                </div>
              </Stack>
            </Grid>

            {/* Filtros de la tabla (Filas/Buscar) */}
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              display={"flex"}
              sx={{ justifyContent: { xs: "center", sm: "end", md: "end" } }}
            >
              <label className="mt-8">Filas por página:</label>
              <FormControl sx={{ minWidth: 50 }} size="small">
                {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={filas}
                  // label="Filas"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              display={"flex"}
              sx={{ justifyContent: { xs: "center", sm: "start", md: "center" } }}
            >
              {/* Barra de Busqueda en la Tabla */}
              <TextField
                style={{ borderRadius: "10px" }}
                placeholder="Buscar"
                value={searchText}
                onChange={handleSearchChange}
                size="small"
                variant="outlined"
                inputProps={{
                  startadornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>

        {/* Tabla */}
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            scroll={{ x: true }}
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
            }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>

      {/* Collapse para el formulario de agregar un registro incio*/}
      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAgregar}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip label={"Agregar Usuario"} />
                </Divider>
              </Grid>
              <Grid
                item
                xs={12} // Cambia esto para que ocupe todo el ancho en pantallas pequeñas
                md={4} // Cambia esto para que ocupe 4 columnas en pantallas medianas y grandes
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div className="little-profilePhynomo text-center">
                  <div
                    className="pro-img"
                    style={{
                      marginTop: "0",
                      width: "200px",
                      height: "200px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                      borderRadius: "50%",
                    }}
                  >
                    {image == null ? (
                      <img
                        src="https://i.ibb.co/RTnx082/kisspng-computer-icons-user-clip-art-user-5abf13db298934-2968784715224718991702.jpg"
                        alt="user"
                      />
                    ) : (
                      <Image
                        width={200}
                        style={{
                          marginTop: "0",
                          width: "200px",
                          height: "200px",
                          overflow: "hidden",
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                          borderRadius: "50%",
                        }}
                        src={image}
                      />
                    )}
                  </div>
                  <br />
                  <Button
                    startIcon={<Icon>image</Icon>}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "10px",
                      marginRight: "10px",
                    }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Seleccionar imagen
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </Grid>

              <Grid item xs={8} style={{ marginTop: "30px" }}>
                <Grid container spacing={3}>
                  {/* Etiqueta "Nuevo Usuario" */}
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></Grid>

                  {/* Left column for TextFields */}
                  <Grid item xs={6}>
                    <div className=" mb-16">
                      <FormControl fullWidth>
                        <FormLabel
                          error={!!errors.NombreUsuario}
                          id="group-label"
                        >
                          Nombre Usuario
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              inputProps={{
                                maxLength: 150,
                              }}
                              error={!!errors.NombreUsuario}
                            ></TextField>
                          )}
                          name="NombreUsuario"
                          control={control}
                        ></Controller>
                      </FormControl>
                    </div>

                    <FormControl fullWidth>
                      <FormLabel
                        error={!!errors.ContraUsuario}
                        id="group-label"
                      >
                        Contraseña
                      </FormLabel>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="password"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                              ),
                            }}
                            error={!!errors.ContraUsuario}
                          ></TextField>
                        )}
                        name="ContraUsuario"
                        control={control}
                      ></Controller>
                    </FormControl>

                    <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
                      <FormControl fullWidth>
                        <FormControlLabel
                          control={
                            <Switch
                              label="¿Es administrador?"
                              labelplacement="top"
                              checked={checked}
                              onChange={handleChangeAdmin}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label="¿Es administrador?"
                          labelPlacement="top"
                          style={{ marginTop: "25px", marginRight: "20px" }}
                        />
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className=" mb-16">
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.Empleado}>
                          Empleados
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="Empleado"
                              disableClearable={true}
                              isOptionEqualToValue={(option, value) =>
                                option.value === value?.value
                              }
                              options={Empleados_DDL}
                              value={datosWatch.Empleado ?? null}
                              onChange={(event, value) => {
                                setValue("Empleado", value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.Empleado}
                                />
                              )}
                            />
                          )}
                          name="Empleado"
                          error={!!errors.Empleado}
                          control={control}
                        />
                      </FormControl>
                    </div>

                    <FormControl fullWidth>
                      <FormLabel error={!!errors.UsuarioRol}>Roles</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="UsuarioRol"
                            disableClearable={true}
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            options={Roles_DDL}
                            value={datosWatch.UsuarioRol ?? null}
                            onChange={(event, value) => {
                              setValue("UsuarioRol", value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={!!errors.UsuarioRol}
                              />
                            )}
                          />
                        )}
                        name="UsuarioRol"
                        error={!!errors.UsuarioRol}
                        control={control}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
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
                  startIcon={<Icon>check</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={GuardarUsuarios}
                  type="submit"
                >
                  Guardar
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
                  onClick={VisibilidadTabla}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </form>
      {/* Collapse para el formulario de agregar un registro Fin*/}

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                <Chip color="default" label="Detalle de usuarios" />
              </Divider>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
                <Image
                  width={300}
                  style={{
                    marginTop: "0",
                    width: "400px",
                    height: "300px",
                    overflow: "hidden",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                    borderRadius: "50%",
                  }}
                  src={image}
                />
              </Box>
            </Grid>


            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>

                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de usuario:
                  </Typography>
                  <Typography>{DetallesTabla["usua_Nombre"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Usuario Id:
                  </Typography>
                  <Typography>{DetallesTabla["usua_Id"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>

                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre empleado:
                  </Typography>
                  <Typography>
                    {DetallesTabla["emplNombreCompleto"]}
                  </Typography>
                </InputLabel>

              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>

                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Rol:
                  </Typography>
                  <Typography>{DetallesTabla["role_Descripcion"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>

                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    ¿Es administrador?:
                  </Typography>
                  <Typography>
                    {DetallesTabla["usua_EsAdmin"]
                      ? "Es administrador"
                      : "No es administrador"}
                  </Typography>
                </InputLabel>
              </Box>
            </Grid>
            <br></br>
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
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>
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
                      {DetallesTabla["usuarioCreacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DetallesTabla["usua_FechaCreacion"]
                        ? new Date(
                          DetallesTabla["usua_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DetallesTabla["usuarioModificacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DetallesTabla["usua_FechaModificacion"]
                        ? new Date(
                          DetallesTabla["usua_FechaModificacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Activación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DetallesTabla["usuarioActivacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DetallesTabla["usua_FechaActivacion"]
                        ? new Date(
                          DetallesTabla["usua_FechaActivacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Desactivación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DetallesTabla["usuarioEliminacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DetallesTabla["usua_FechaEliminacion"]
                        ? new Date(
                          DetallesTabla["usua_FechaEliminacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <div className="card-footer">
                <Button
                  variant="contained"
                  style={{ position: "fixed", top: "83%", right: "5%" }}
                  onClick={handleCerrarDetalle}
                  startIcon={<Icon>arrow_back</Icon>}
                >
                  Regresar
                </Button>
                <br></br>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar los detalles de un registro fin*/}

      {/* Collapse para el formulario de editar un registro incio*/}
      <form onSubmit={handleSubmitEditar((_data) => { })}>
        <Collapse in={mostrarEditar}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip label={"Editar Usuario"} />
                </Divider>
              </Grid>
              <Grid
                item
                xs={12} // Cambia esto para que ocupe todo el ancho en pantallas pequeñas
                md={4} // Cambia esto para que ocupe 4 columnas en pantallas medianas y grandes
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div className="little-profilePhynomo text-center">
                  <div
                    style={{
                      marginTop: "0",
                      width: "200px",
                      height: "200px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                      borderRadius: "50%",
                    }}
                  >
                    {image == null ? (
                      <img
                        src="https://i.ibb.co/RTnx082/kisspng-computer-icons-user-clip-art-user-5abf13db298934-2968784715224718991702.jpg"
                        alt="user"
                      />
                    ) : (
                      <Image
                        width={200}
                        style={{
                          marginTop: "0",
                          width: "200px",
                          height: "200px",
                          overflow: "hidden",
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                          borderRadius: "50%",
                        }}
                        src={image}
                      />
                    )}
                  </div>
                  <br />
                  <Button
                    startIcon={<Icon>image</Icon>}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "10px",
                      marginRight: "10px",
                    }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Seleccionar imagen
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </Grid>

              <Grid item xs={8} style={{ marginTop: "30px" }}>
                <Grid container spacing={3}>
                  {/* Etiqueta "Nuevo Usuario" */}
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></Grid>

                  {/* Left column for TextFields */}
                  <Grid item xs={6}>
                    <div className=" mb-16">
                      <FormControl fullWidth>
                        <FormLabel
                          error={!!errorsEditar.NombreUsuarioEditar}
                          id="group-label"
                        >
                          Nombre Usuario
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              disabled
                              {...field}
                              inputProps={{
                                maxLength: 150,
                              }}
                              error={!!errorsEditar.NombreUsuarioEditar}
                            ></TextField>
                          )}
                          name="NombreUsuarioEditar"
                          control={controlEditar}
                        ></Controller>
                      </FormControl>
                    </div>

                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <Switch
                            label="¿Es administrador?"
                            labelplacement="top"
                            value={checkedEditar}
                            checked={checkedEditar}
                            onChange={handleChangeAdminEditar}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="¿Es administrador?"
                        labelPlacement="top"
                        style={{ marginTop: "25px", marginRight: "20px" }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <div className=" mb-16">
                      <FormControl fullWidth>
                        <FormLabel error={!!errorsEditar.EmpleadoEditar}>
                          Empleados
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="EmpleadoEditar"
                              isOptionEqualToValue={(option, value) =>
                                option.value === value?.value
                              }
                              disableClearable={true}
                              options={Empleados_DDL}
                              value={datosWatchEditar.EmpleadoEditar ?? null}
                              onChange={(event, value) => {
                                setValueEditar("EmpleadoEditar", value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errorsEditar.EmpleadoEditar}
                                />
                              )}
                            />
                          )}
                          name="EmpleadoEditar"
                          error={!!errorsEditar.EmpleadoEditar}
                          control={controlEditar}
                        />
                      </FormControl>
                    </div>

                    <FormControl fullWidth>
                      <FormLabel error={!!errorsEditar.UsuarioRolEditar}>
                        Roles
                      </FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="UsuarioRolEditar"
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            disableClearable={true}
                            options={Roles_DDL}
                            value={datosWatchEditar.UsuarioRolEditar ?? null}
                            onChange={(event, value) => {
                              setValueEditar("UsuarioRolEditar", value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={!!errorsEditar.UsuarioRolEditar}
                              />
                            )}
                          />
                        )}
                        name="UsuarioRolEditar"
                        error={!!errorsEditar.UsuarioRolEditar}
                        control={controlEditar}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
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
                  startIcon={<Icon>check</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  type="submit"
                  onClick={EditarUsuarios}
                >
                  Guardar
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
                  onClick={VisibilidadTablaEditar}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </form>
      {/* Collapse para el formulario de editar un registro Fin*/}

      <Dialog
        open={Eliminar}
        fullWidth={true}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de Deshabilitación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea deshabilitar este registro?
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
              color={habilitar ? "error" : "primary"}
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={habilitar ? "" : botonStyle}
              onClick={UsuariosAccion}
            >
              {habilitar ? "Deshabilitar" : "Habilitar"}
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
        open={Aceptar}
        fullWidth={true}
        onClose={DialogAceptar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de Creación de usuario
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "justify" }}
          >
            ¿Está seguro(a) de{" "}
            {AdminRol
              ? "otorgar el permiso de administrador"
              : `asignar el rol de ${RolSeleccionado}`}{" "}
            a este usuario?
            <br></br>
            {AdminRol
              ? "Al otorgarle el permiso de administrador, el usuario tendrá acceso\n completo y control sobre todos los aspectos del sistema."
              : `Al asignarle el rol de ${RolSeleccionado}, el usuario tendrá acceso\n limitado y solo podrá interactuar con las secciones del sistema que correspondan a dicho rol.`}
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
              color="primary"
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              style={{ borderRadius: "10px", marginRight: "10px" }}
              onClick={usuariosCreate}
            >
              Aceptar
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
              onClick={DialogAceptar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
        open={AceptarEditar}
        fullWidth={true}
        onClose={DialogAceptarEditar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de Edición de usuario
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "justify" }}
          >
            ¿Está seguro(a) de{" "}
            {AdminRolEditar
              ? "otorgar el permiso de administrador"
              : `asignar el rol de ${RolSeleccionadoEditar}`}{" "}
            a este usuario?
            <br></br>
            {AdminRolEditar
              ? "Al otorgarle el permiso de administrador, el usuario tendrá acceso\n completo y control sobre todos los aspectos del sistema."
              : `Al asignarle el rol de ${RolSeleccionadoEditar}, el usuario tendrá acceso\n limitado y solo podrá interactuar con las secciones del sistema que correspondan a dicho rol.`}
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
              color="primary"
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              style={{ borderRadius: "10px", marginRight: "10px" }}
              onClick={usuariosEdit}
            >
              Aceptar
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
              onClick={DialogAceptarEditar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default UsuariosIndex;
