/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from "export-to-csv";
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Switch,
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
  TextField,
  Typography,
} from "@mui/material";

import { CircularProgress } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import * as yup from "yup";
import { Table } from "antd";
import "react-toastify/dist/ReactToastify.css";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import {
  ToastError,
  ToastSuccessEditar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste,
} from "src/styles/toastsFunctions";
import ArancelesService from "./ArancelesServices";

const defaultArancelesValues = {
  aran_Id: "",
  aran_Codigo: "",
  aran_Descripcion: "",
  aran_DAI: "",
  aran_ISV: null,
  aran_SEL: "",
  aran_PRODCONS: "",
  aran_Vahiculo: false,
  aran_CodigoCategoria: "",
  aran_DescripcionCategoria: "",
};

const accountSchema = yup.object().shape({
  impu_Id: yup.string(),
  aran_Codigo: yup.string().trim().required(""),
  aran_Descripcion: yup.string().trim().required(""),
  aran_DAI: yup.string(),
  aran_ISV: yup.mixed(),
  aran_SEL: yup.string(),
  aran_PRODCONS: yup.string(),
  aran_Vahiculo: yup.bool().required(""),
  aran_CodigoCategoria: yup.string().trim(),
  aran_DescripcionCategoria: yup.string().trim(),
});

function ArancelesIndex() {
  const load_DDL = Load_DDLs();
  // Campos para el DDL de Ciudades
  // const [impuestos, setImpuestos] = useState([]);

  // impuestosGet = async () => {
  //     try {
  //         const data = await Load_DDL.ProvinciasPorPais()
  //         setProvincias(data)
  //     } catch (error) {
  //         console.log(error.message);
  //     }
  // };

  const arancelesService = ArancelesService();
  const [ExportData, SetExportData] = useState([]);
  // Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  // Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);

  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});
  //Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  // Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);
  const [anchorEl, setAnchorEl] = useState({});

  // Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([]);

  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultArancelesValues);
  };
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //controlador de las fillas a mostrar
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };
  // Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    //insertar aca las variables necesarias en su formulario
    setValue("aran_Id", datos["aran_Id"]);
    setValue("aran_Codigo", datos["aran_Codigo"]);
    setValue("aran_Descripcion", datos["aran_Descripcion"]);
    setValue("aran_DAI", datos["aran_DAI"]);
    setValue("aran_SEL", datos["aran_SEL"]);
    setValue("aran_PRODCONS", datos["aran_ProdCons"]);
    setValue("aran_Vahiculo", datos["aran_AplicaVehiculos"]);
    setValue("aran_ISV", impuestos.find((x) => x.value === datos["aran_ISV"]));
    handleClose(datos.aran_Id);
  };
  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (datos) => {
    setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.aran_Id);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, // sorting para Numeros
    },
    {
      title: "Código De Aracel",
      dataIndex: "aran_Codigo",
      key: "aran_Codigo",
      sorter: (a, b) => a.aran_Codigo.localeCompare(b.aran_Codigo),
    },
    {
      title: "Descripción",
      dataIndex: "aran_Descripcion",
      key: "aran_Descripcion",
      sorter: (a, b) => a.aran_Descripcion.localeCompare(b.aran_Descripcion),
    },
    {
      title: "DAI",
      dataIndex: "aran_DAI",
      key: "aran_DAI",
      sorter: (a, b) => a.aran_DAI - b.aran_DAI,
    },
    {
      title: "ISV",
      dataIndex: "impu_Cantidad",
      key: "impu_Cantidad",
      sorter: (a, b) => a.impu_Cantidad - b.impu_Cantidad,
    },
    {
      title: "Selectivo al consumo",
      dataIndex: "aran_SEL",
      key: "aran_SEL",
      sorter: (a, b) => a.aran_SEL - b.aran_SEL,
    },
    {
      title: "Produccion y consumo",
      dataIndex: "aran_ProdCons",
      key: "aran_ProdCons",
      sorter: (a, b) => a.aran_ProdCons - b.aran_ProdCons,
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.aran_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.aran_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.aran_Id)}
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
              id={`menu-${params.aran_Id}`}
              anchorEl={anchorEl[params.aran_Id]}
              keepMounted
              open={Boolean(anchorEl[params.aran_Id])}
              onClose={() => handleClose(params.aran_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  const csvHeader = [
    {
        label: 'No.',
    },
    {
        label: 'Código del arancel',
    },
    {
        label: 'Descripción del arancel'
    },
]
const csvOptions = {
    filename: 'Aranceles',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: csvHeader.map((c) => c.label),
};

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    csvExporter.generateCsv(ExportData);
  };

  // Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const camposToFilter = ["key", "aran_Id", "aran_Codigo"];

  // Constante que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
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

  const [inputCap, setImputCap] = useState("01");
  const [errorInputCap, setErrorImputCap] = useState(false);

  const handleCapChange = (event) => {
    setImputCap(event.target.value);
    if (event.target.value.length >= 2) {
      setErrorImputCap(false);
      ArancelesGetData(event.target.value);
    } else setErrorImputCap(true);
  };

  const [cargandoData, setCargandoData] = useState([]);
  const ArancelesGetData = async (codigo) => {
    try {
      setCargandoData([]);
      setDataTabla([]);
      const data = await arancelesService.listar(codigo);
      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await arancelesService.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };

  const [impuestos, setImpuestos] = useState([]);

  async function getDDLs() {
    try {
      setImpuestos(await load_DDL.Impuestos());
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    ArancelesGetData(inputCap);
    getDDLs();
  }, []);

  //  NECESARIO PARA EL INSERT - EDIT
  //Variable al buscar la cateogria
  const [categoria, setCategoria] = useState("");
  //variable para el dialog(modal) de codigo
  const [dialogCodigo, setDialogCodigo] = useState(false);
  //variable para el dialog(modal) de createCategoria
  const [dialogPreguntar, setDialogPreguntar] = useState(false);
  //Constante por si se planea cambiar el arancel sin categoria
  const [dialogCategoria, setDialogCategoria] = useState(false);
  //Constante por si se planea cambiar el arancel sin categoria

  const DialogValidarCodigo = () => {
    setDialogCodigo(!dialogCodigo);
  };
  const DialogPreguntarCategoria = () => {
    if (datosWatch.aran_Codigo.length >= 4) {
      datosWatch.aran_CodigoCategoria =
        datosWatch.aran_Codigo.substring(0, 2) +
        "." +
        datosWatch.aran_Codigo.substring(2, 4);
      setValue("aran_CodigoCategoria", datosWatch.aran_CodigoCategoria);
    }
    setDialogPreguntar(!dialogPreguntar);
  };
  const DialogCreateCategoria = () => {
    setDialogPreguntar(false);
    setDialogCategoria(!dialogCategoria);
  };

  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultArancelesValues, //Campos del formulario
      mode: "all",
      resolver: yupResolver(accountSchema), //Esquema del formulario
    });
  const datosWatch = watch();
  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  const buscarArancel = async () => {
    if (isValid) {
      if (datosWatch.aran_Codigo.substring(2, 3) == ".") {
        guardarArancel(0);
      } else {
        console.log(datosWatch.aran_Codigo.replace(".", "").substring(0, 4));
        const res = await arancelesService.buscar(
          datosWatch.aran_Codigo.replace(".", "").substring(0, 4)
        );

        if (res.data.data.length > 0) {
          setCategoria(res.data.data[0].aran_Descripcion);
          DialogValidarCodigo();
        } else {
          console.log("hasta aqui llego cf");
          DialogPreguntarCategoria();
        }
      }
    } else {
      ToastWarning();
    }
  };
  //Cualquiera de los 2 dialog que se abran entra aqui
  const guardarArancel = (num) => {
    //Dependiendo del numero creara una categoria o un Arancel
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        ArancelesCreate(num);
      } else {
        ArancelesEdit(num);
      }
    } else {
      ToastWarning();
    }
  };

  //Crear
  const ArancelesCreate = async (num) => {
    try {
      let response;
      if (num == 1) {
        //Esta creando una categoria

        response = await arancelesService.crearCategoria(datosWatch);
        DialogCreateCategoria();
        console.log(response.data.data.messageStatus);
        if (response.data.data.messageStatus == "1") {
          ToastSuccessGuardado();
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          ToastWarningYaExiste();
        }
      } else {
        //Esta creando un arancel

        response = await arancelesService.crear(datosWatch);
        setDialogCodigo(false);
        console.log(response.data.data.messageStatus);
        if (response.data.data.messageStatus == "1") {
          ToastSuccessGuardado();
          ArancelesGetData(inputCap);
          VisibilidadTabla();
          reset(defaultArancelesValues);
        } else if (response.data.data.messageStatus.includes("UNIQUE")) {
          ToastWarningYaExiste();
        }
      }
    } catch (error) {
      console.log(error);
      ToastError();
    }
  };

  //editar
  const ArancelesEdit = async (num) => {
    try {
      if (num == 1) {
        //Esta creando una categoria

        const res = await arancelesService.crearCategoria(datosWatch);
        DialogCreateCategoria();
        console.log(res.data.data.messageStatus);
        if (res.data.data.messageStatus == "1") {
          ToastSuccessGuardado();
        } else if (res.data.data.messageStatus.includes("UNIQUE")) {
          ToastWarningYaExiste();
        }
        return;
      }
      const response = await arancelesService.editar(datosWatch);
      console.log(response);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        ArancelesGetData(inputCap);
        VisibilidadTabla();
        setDialogCodigo(false);
        reset(defaultArancelesValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta) */}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/0JH7kyr/ARANCELES.png"
        alt="Encabezado de la carta"
      />
      {/* Collapse del index */}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo */}
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
              onClick={(e) => handleClick(e, "csv")}
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
            <Menu
              anchorEl={anchorEl["csv"]} // Accede al menu anchor usando el ID
              open={Boolean(anchorEl["csv"])}
              onClose={() => handleClose("csv")} // Cierra el menu usando el ID
            >
              <MenuItem>
                <Button
                  onClick={handleExportData}
                  color="primary"
                  startIcon={<FileTextFilled />}
                >
                  Archivo CSV
                </Button>
              </MenuItem>
              {/* Exportar a PDF */}
              <MenuItem>
                <PDFGenerator data={ExportData} />
              </MenuItem>

              {/* Exportar a Excel */}
              <MenuItem>
                <ExportToExcel data={ExportData} />
              </MenuItem>
            </Menu>
          </Stack>
          {/* Botón de Nuevo Fin */}
          <Stack direction="row" spacing={1}>
            <label className="mt-8">Capítulo :</label>
            <TextField
              error={errorInputCap}
              style={{ borderRadius: "10px" }}
              onChange={handleCapChange}
              value={inputCap}
              size="small"
              variant="outlined"
              inputProps={{
                maxLength: 2,
                onKeyPress: (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                },
              }}
            />
          </Stack>

          {/* Select para las filas de la tabla inicio */}
          <Stack direction="row" spacing={1}>
            <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                // label="Filas"
                onChange={handleChangeFilas}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>

            {/* Barra de Busqueda en la Tabla */}
            <TextField
              style={{ borderRadius: "10px" }}
              placeholder="Buscar"
              value={searchText}
              onChange={handleSearchChange}
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </CardContent>

        {/* Mostrar tabla index inicio */}
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
            }}
            columns={columns}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>
      {/* Inicio del Formulario */}
      <form onSubmit={handleSubmit((_data) => {})}>
        <Collapse in={mostrarAdd}>
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
                  <Chip label={editar ? "Editar Arancel" : "Agregar Arancel"} />
                </Divider>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.aran_Codigo}>
                    Codigo del aracel
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.aran_Codigo}
                      ></TextField>
                    )}
                    name="aran_Codigo"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.aran_Descripcion}>
                    Descripción del Aracel
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.aran_Descripcion}
                      ></TextField>
                    )}
                    name="aran_Descripcion"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip label={"Impuestos del arancel"} />
                </Divider>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.aran_DAI}>DAI</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                          onKeyPress: (event) => {
                            if (!/[0-9 .]/.test(event.key)) {
                              event.preventDefault();
                            }
                          },
                        }}
                        error={!!errors.aran_DAI}
                      ></TextField>
                    )}
                    name="aran_DAI"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.aran_ISV}>ISV</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="aran_ISV"
                        isOptionEqualToValue={(option, value) =>
                          option.value === value?.value
                        }
                        options={impuestos}
                        value={datosWatch.aran_ISV ?? null}
                        onChange={(event, value) => {
                          setValue("aran_ISV", value);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} error={!!errors.aran_ISV} />
                        )}
                      />
                    )}
                    name="aran_ISV"
                    error={!!errors.aran_ISV}
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.aran_SEL}>
                    Selectivo al consumo
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                          onKeyPress: (event) => {
                            if (!/[0-9 .]/.test(event.key)) {
                              event.preventDefault();
                            }
                          },
                        }}
                        error={!!errors.aran_SEL}
                      ></TextField>
                    )}
                    name="aran_SEL"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.aran_PRODCONS}>
                    Sobre produccion
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                          onKeyPress: (event) => {
                            if (!/[0-9 .]/.test(event.key)) {
                              event.preventDefault();
                            }
                          },
                        }}
                        error={!!errors.aran_PRODCONS}
                      ></TextField>
                    )}
                    name="aran_PRODCONS"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent={"center"}
                className="flex justify-content-center"
              >
                <Box sx={{ textAlign: "center" }}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.aran_Vahiculo}>
                      ¿Impuesto vehicular?
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent={"center"}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch {...field} />
                            <Typography>Sí</Typography>
                          </Stack>
                        </>
                      )}
                      name="aran_Vahiculo"
                      control={control}
                    />
                  </FormControl>
                </Box>
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
                  type="submit"
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={buscarArancel}
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
        {/* Inicio del dialog (Modal) CATEGORIA de arancel*/}
        <Dialog
          open={dialogCodigo}
          fullWidth="md"
          onClose={() => DialogValidarCodigo()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Categoria Arancel</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Esta intentando ${
                editar ? "editar" : "insertar"
              }  un arancel en la categoria: ${categoria} ¿Desea continuar?`}
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
                style={{ borderRadius: "10px", marginRight: "10px" }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
                }}
                onClick={() => {
                  guardarArancel(0);
                }}
              >
                Seguir
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
                onClick={() => {
                  DialogValidarCodigo();
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>

        {/* Fin del dialog (Modal) CATEGORIA de arancel */}
        {/* Inicio del dialog (Modal) PREGUNTAR POR CATEGORIA de arancel*/}
        <Dialog
          open={dialogPreguntar}
          fullWidth="md"
          onClose={() => DialogPreguntarCategoria()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Categoria Arancel</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta categoria no existe ¿Quiere insertar una nueva?
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
                style={{ borderRadius: "10px", marginRight: "10px" }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
                }}
                onClick={() => {
                  DialogCreateCategoria();
                }}
              >
                Seguir
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
                onClick={() => {
                  DialogPreguntarCategoria();
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>

        {/* Fin del dialog (Modal) PREGUNTAR CATEGORIA de arancel */}

        {/* Inicio del dialog (Modal) Insertar CATEGORIA de arancel */}

        <Dialog
          open={dialogCategoria}
          fullWidth="md"
          //onClose={DialogCreateCategoria()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Crear Categoria de Arancel
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel error={!!errors.aran_CodigoCategoria}>
                      Codigo del aracel
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          inputProps={{
                            maxLength: 150,
                          }}
                          error={!!errors.aran_CodigoCategoria}
                        ></TextField>
                      )}
                      name="aran_CodigoCategoria"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel error={!!errors.aran_DescripcionCategoria}>
                      Descripción del Aracel
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          inputProps={{
                            maxLength: 150,
                          }}
                          error={!!errors.aran_DescripcionCategoria}
                        ></TextField>
                      )}
                      name="aran_DescripcionCategoria"
                      control={control}
                    ></Controller>
                  </FormControl>
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
                  guardarArancel(1);
                }}
              >
                Seguir
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
                onClick={() => {
                  DialogCreateCategoria();
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </form>
      {/* fin del dialog (Modal) Insertar CATEGORIA de arancel */}
      {/* Mostrar tabla index fin */}

      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de Arancel" />
              </Divider>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id:
                  </Typography>
                  <Typography>{DatosDetalles["aran_Id"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Codigo:
                  </Typography>
                  <Typography>{DatosDetalles["aran_Codigo"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Descripcion:
                  </Typography>
                  <Typography>{DatosDetalles["aran_Descripcion"]}</Typography>
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
                      {DatosDetalles["usuarioCreacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["aran_FechaCreacion"]
                        ? new Date(
                            DatosDetalles["aran_FechaCreacion"]
                          ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioModificacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["aran_FechaModificacion"]
                        ? new Date(
                            DatosDetalles["aran_FechaModificacion"]
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
                  style={{ position: "fixed", top: "76%", right: "5%" }}
                  onClick={() => {
                    setmostrarIndex(!mostrarIndex);
                    setmostrarDetalles(!mostrarDetalles);
                  }}
                  startIcon={<Icon>arrow_back</Icon>}
                >
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Fin del Collapse Detalles */}
    </Card>
  );
}

export default ArancelesIndex;
