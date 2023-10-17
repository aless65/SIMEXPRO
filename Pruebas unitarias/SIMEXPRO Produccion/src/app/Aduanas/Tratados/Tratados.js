/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { MoreVert } from "@material-ui/icons";
import SearchIcon from "@mui/icons-material/Search";
import {
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
import { Table, Transfer } from "antd";
import { DatePicker } from "@mui/x-date-pickers";
import { ExportToCsv } from "export-to-csv";
import * as React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import {
  ToastError,
  ToastErrorRegistroEnUso,
  ToastSuccessEditar,
  ToastSuccessEliminar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste,
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";
import TratadosService from "./TratadosService";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";


const defaultAccountValues = {
  nombre: "",
  FechaInicio: null,
  PaisesSeleccionados: [],
};

const accountSchema = yup.object().shape({
  nombre: yup.string().trim().required(""),
  FechaInicio: yup
    .date()
    .required("")
    .nullable()
    .max(new Date(2100, 0, 1), "No puede ingresar fechas futuras")
    .min(new Date(1900, 0, 1), "Ingrese una fecha mayor a 01/01/1900"),
  PaisesSeleccionados: yup.array(),
});

//#region Decoracion
const iconStyle = {
  marginRight: "5px",
  verticalAlign: "middle",
  color: "#634a9e",
};

const tableRowStyle = {
  "&:hover": {
    backgroundColor: "coral",
  },
};

const tableCellStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableHeaderStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#f2f2f2",
};

//#endregion

function Tratados() {
  const load_DDLs = Load_DDLs();
  const tratadosService = TratadosService();
  const [ExportData, SetExportData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [idEditar, setidEditar] = useState(0);
  const [idEliminar, setidEliminar] = useState(0);
  const [paises, setPaises] = useState([]);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const [anchorEl, setAnchorEl] = useState({});

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
    setidEditar(datos["unme_Id"]);
    setValue("nombre", datos["unme_Descripcion"]);
    handleClose(datos.unme_Id);
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos);
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.trli_Id);
  };

  const handleDelete = (datos) => {
    setidEliminar(datos["unme_Id"]);
    setEliminar(true);
    handleClose(datos.trli_Id);
  };

  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const handleChangeTrasnfer = (newTargetKeys) => {
    setValue("PaisesSeleccionados", newTargetKeys);
  };

  {
    /* Columnas de la tabla */
  }
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Tratado",
      dataIndex: "trli_NombreTratado",
      key: "trli_NombreTratado",
      sorter: (a, b) =>
        a.trli_NombreTratado.localeCompare(b.trli_NombreTratado), //sorting para Letras
    },
    {
      title: "Fecha inicio",
      dataIndex: "trli_FechaInicio",
      key: "trli_FechaInicio",
      sorter: (a, b) => a.trli_FechaInicio.localeCompare(b.trli_FechaInicio), //sorting para Letras
      render: (text, record) =>
        new Date(record["trli_FechaInicio"]).toLocaleString("es-US", {
          dateStyle: "short",
        }),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.trli_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.trli_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.trli_Id)}
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
              id={`menu-${params.trli_Id}`}
              anchorEl={anchorEl[params.trli_Id]}
              keepMounted
              open={Boolean(anchorEl[params.trli_Id])}
              onClose={() => handleClose(params.trli_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  const columnsExpandable = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Código del país",
      dataIndex: "pais_Codigo",
      key: "pais_Codigo",
      sorter: (a, b) => a.pais_Codigo.localeCompare(b.pais_Codigo), //sorting para Letras
    },
    {
      title: "Nombre del país",
      dataIndex: "pais_Nombre",
      key: "pais_Nombre",
      sorter: (a, b) => a.pais_Nombre.localeCompare(b.pais_Nombre), //sorting para Letras
    },
  ];

  const csvHeader = [
    {
      label: "No.",
    },
    {
      label: "Unidad de medida",
    },
  ];
  const csvOptions = {
    filename: "Unidades_de_medida",
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
    } catch (error) {}
  };
  const [data, setData] = useState([]);

  const [cargandoData, setCargandoData] = useState([]);
  const tratadosGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);
      const data = await tratadosService.listar();
      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await tratadosService.ExportData());
    } catch (error) {
      setCargandoData(null);
      ToastError();
    }
  };

  const unidadesCreate = async () => {
    try {
      const response = await tratadosService.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessGuardado();
        VisibilidadTabla();
        unidadesMedidaGetData();
        setSearchText("");
        reset(defaultAccountValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  const unidadesEdit = async () => {
    try {
      const response = await tratadosService.editar(datosWatch, idEditar);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        unidadesMedidaGetData();
        if (searchText != "") {
          setSearchText(datosWatch.nombre);
        } else {
          setSearchText("");
        }
        VisibilidadTabla();
        reset(defaultAccountValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {
      ToastError();
    }
  };

  const unidadesDelete = async () => {
    try {
      const response = await tratadosService.eliminar(idEliminar);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEliminar();
        unidadesMedidaGetData();
        DialogEliminar();
        unidadesMedidaGetData();
        reset(defaultAccountValues);
      } else if (response.data.data.messageStatus == "0") {
        ToastErrorRegistroEnUso();
        DialogEliminar();
      }
    } catch (error) {
      ToastError();
    }
  };

  const cargarDDLs = async () => {
    let data = await load_DDLs.paises() 
    setPaises(data);
  }

  useEffect(() => {
    tratadosGetData();
    cargarDDLs();
  }, []);

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultAccountValues);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "unme_Descripcion"];

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

  const { handleSubmit, reset, control, watch, formState, setValue } = useForm({
    defaultValues: defaultAccountValues,
    mode: "all",
    resolver: yupResolver(accountSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const datosWatch = watch();

  const GuardarUnidad = () => {
    if (isValid) {
      if (!editar) {
        unidadesCreate();
      } else {
        unidadesEdit();
      }
    } else {
      ToastWarning();
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
        image="https://i.ibb.co/f1pLrPK/Tratados.jpg"
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
                      data={ExportData}
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
              sx={{
                justifyContent: { xs: "center", sm: "start", md: "center" },
              }}
            >
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
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      {/* Tabla */}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            expandable={{
              columnTitle: "Desplegar detalle",
              expandedRowRender: (record) => (
                <Table
                  columns={columnsExpandable}
                  dataSource={record.detalles}
                  pagination={false}
                />
              ),
            }}
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

      {/* Formulario Agregar */}
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
                  <Chip
                    label={
                      editar
                        ? "Editar unidad de medida"
                        : "Agregar unidad de medida"
                    }
                  />
                </Divider>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth={true}>
                  <FormLabel error={!!errors.nombre}>
                    Nombre del tratado:
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder=""
                        InputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.nombre}
                      ></TextField>
                    )}
                    name="nombre"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="FechaInicio"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <FormControl error={!!errors.FechaInicio} fullWidth={true}>
                      <FormLabel>Fecha inicio:</FormLabel>
                      <DatePicker
                        onChange={(date) => field.onChange(date)}
                        value={field.value}
                        required
                        renderInput={(_props) => (
                          <TextField
                            className="w-full"
                            {..._props}
                            onBlur={field.onBlur}
                            error={!!errors.FechaInicio}
                            helperText={
                              errors?.FechaInicio?.message.includes(
                                "Invalid Date"
                              )
                                ? "La fecha ingresada no es valida"
                                : errors?.FechaInicio?.message
                            }
                          />
                        )}
                        className="w-full"
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Transfer
                  dataSource={paises}
                  showSearch
                  listStyle={{
                    width: 250,
                    height: 300,
                  }}
                  // operations={['to right', 'to left']}
                  targetKeys={datosWatch.PaisesSeleccionados}
                  onChange={handleChangeTrasnfer}
                  render={(item) => `${item.label}`}
                  // footer={renderFooter}
                />
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
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={GuardarUnidad}
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
      <Dialog
        open={Eliminar}
        fullWidth={true}
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
              onClick={unidadesDelete}
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

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la Unidad de Medida" />
              </Divider>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id de la unidad de medida:
                  </Typography>
                  <Typography>{DatosDetalles["unme_Id"]}</Typography>
                </InputLabel>
              </Box>

              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la unidad de medida:
                  </Typography>
                  <Typography>{DatosDetalles["unme_Descripcion"]}</Typography>
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
                    <th style={tableHeaderStyle}>
                      <Icon style={iconStyle}>edit</Icon>Acción
                    </th>
                    <th style={tableHeaderStyle}>
                      <Icon style={iconStyle}>person</Icon>Usuario
                    </th>
                    <th style={tableHeaderStyle}>
                      <Icon style={iconStyle}>date_range</Icon>Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={tableCellStyle}>
                      {DatosDetalles["usuarioCreacionNombre"]}
                    </td>
                    <td style={tableCellStyle}>
                      {DatosDetalles["unme_FechaCreacion"]
                        ? new Date(
                            DatosDetalles["unme_FechaCreacion"]
                          ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>
                      {DatosDetalles["usuarioModificacionNombre"]}
                    </td>
                    <td style={tableCellStyle}>
                      {DatosDetalles["unme_FechaModificacion"]
                        ? new Date(
                            DatosDetalles["unme_FechaModificacion"]
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
                  onClick={CerrarCollapseDetalles}
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
    </Card>
  );
}

export default Tratados;
