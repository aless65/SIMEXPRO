/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { MoreVert } from "@material-ui/icons";
import SearchIcon from '@mui/icons-material/Search';
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
  Typography
} from "@mui/material";
import { Table } from "antd";
import { ExportToCsv } from 'export-to-csv';
import * as React from "react";

import { useEffect, useState } from "react";


import { Controller, useForm } from "react-hook-form";
import ColorPicker from 'react-pick-color';
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";

import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastError,
  ToastErrorRegistroEnUso,
  ToastSuccessEditar,
  ToastSuccessEliminar,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningYaExiste
} from "src/styles/toastsFunctions";
import ExportToExcel from "./ProcesosExcel";
import PDFGenerator from "./ProcesosPDF";
import ProcesosService from "./ProcesosService";
{
  /* Validaciones de la pantalla de crear*/
}


function ProcesosIndex() {
  const [ExportData, SetExportData] = useState([]);

  const procesosService = ProcesosService();
  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [Eliminar, setEliminar] = useState(false);
  const [editar, setEditar] = useState(false);

  const [mostrarColorPicker, setMostrarColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  // ENCABEZADO PARA EL CSV
  const csvHeader = [
    {
      label: 'No.',
    },
    {
      label: 'Nombre del proceso'
    },
  ];

  //OPCIONES DEL CSV
  const csvOptions = {
    filename: 'Procesos',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: csvHeader.map((c) => c.label),

  };
  const defaultProcesosValues = {
    id: "",
    descripcion: "",
    proc_CodigoHtm: selectedColor
  };

  const accountSchema = yup.object().shape({
    id: yup.string(),
    descripcion: yup.string().trim().required(""),
  });

  // SIN ESTO NO HAY CSV
  const csvExporter = new ExportToCsv(csvOptions);


  // METODO PARA EXPORTAR EL CSV
  const handleExportData = () => {
    try {
      csvExporter.generateCsv(ExportData);
    } catch (error) {

    }
  }; const handleOpenColorPicker = () => {
    setMostrarColorPicker(true);
  };

  // Función para cerrar el cuadro de diálogo de selección de color y guardar el valor seleccionado
  const handleCloseColorPicker = () => {
    setMostrarColorPicker(false);
    setSelectedColor('');
  };
  const handleCloseColorPicker1 = () => {
    setMostrarColorPicker(false);
  };

  {
    /* Datos de la tabla */
  }
  const [data, setData] = useState([]);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
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
    setValue("id", datos["proc_Id"]);
    setValue("descripcion", datos["proc_Descripcion"]);
    setSelectedColor(datos.proc_CodigoHtml);
    handleClose(datos.proc_Id);
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos);
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.proc_Id);
  };

  const handleDelete = (datos) => {
    setValue("id", datos["proc_Id"]);
    DialogEliminar();
    handleClose(datos.proc_Id);
  };

  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["key", "proc_Descripcion"];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) => {
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
  }).reverse()

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
      title: "Nombre del proceso",
      dataIndex: "proc_Descripcion",
      key: "proc_Descripcion",
      sorter: (a, b) => a.proc_Descripcion.localeCompare(b.proc_Descripcion), //sorting para Letras
    },
    {
      title: "Color",
      dataIndex: "proc_CodigoHtml",
      key: "proc_CodigoHtml",
      render: (text) => (
        <div style={{ backgroundColor: text, width: '80px', height: '20px' }}></div>
      ),
      sorter: (a, b) => a.proc_CodigoHtml.localeCompare(b.proc_CodigoHtml),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.proc_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.proc_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.proc_Id)}
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
              id={`menu-${params.proc_Id}`}
              anchorEl={anchorEl[params.proc_Id]}
              keepMounted
              open={Boolean(anchorEl[params.proc_Id])}
              onClose={() => handleClose(params.proc_Id)}
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

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  const ProcesosGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);

      const data = await procesosService.listar();

      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await procesosService.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };

  const ProcesosCreate = async () => {
    try {
      const datos = {
        proc_Descripcion: datosWatch.descripcion,
        proc_CodigoHtml: selectedColor,
      };
      const response = await procesosService.crear(datos);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessGuardado();
        ProcesosGetData();
        VisibilidadTabla();
        reset(defaultProcesosValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {

      ToastError();
    }
  };

  const ProcesosEdit = async () => {
    try {
      const datos = {
        colr_Id: datosWatch.id,
        proc_Descripcion: datosWatch.descripcion,
        proc_CodigoHtml: selectedColor,
      };

      const response = await procesosService.editar(datos);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEditar();
        ProcesosGetData();
        VisibilidadTabla();
        reset(defaultProcesosValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste();
      }
    } catch (error) {

      ToastError();
    }
  };

  const ProcesosDelete = async () => {
    try {
      const response = await procesosService.eliminar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEliminar();
        ProcesosGetData();
        DialogEliminar();
      } else if (response.data.data.messageStatus == "0") {
        ToastErrorRegistroEnUso();
        DialogEliminar();
      }
    } catch (error) {

      DialogEliminar();
      ToastError();
    }
  };

  useEffect(() => {
    ProcesosGetData();
  }, []);

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultProcesosValues);
    setSelectedColor('');
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultProcesosValues,
      mode: "all",
      resolver: yupResolver(accountSchema),
    });

  const { isValid, dirtyFields, errors } = formState;

  const datosWatch = watch();

  const GuardarProceso = () => {


    if (isValid && selectedColor != "") {
      if (!editar) {
        ProcesosCreate();
      } else {
        ProcesosEdit();
      }
    } else {
      ToastWarning();
    }
  };

  const handleCloseExportar = () => {
    setAnchorEl(prevState => ({
      ...prevState,
      ['menu-exportar']: null,
    }));
  };

  const handleClickExportar = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/ftqSrxG/PROCESOS.png"
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
          {/* Botón de Nuevo */}    <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{justifyContent:{xs:'center',sm:'center', md:'start'}}} >
        
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
              onClick={(e) => handleClickExportar(e, 'menu-exportar')}
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
            <div key={'menu-exportar'}>
              {/* Menu de Exportacion */}
              <Menu
                id={'menu-exportar'}
                anchorEl={anchorEl['menu-exportar']}
                open={Boolean(anchorEl['menu-exportar'])}
                onClose={() => handleCloseExportar()}
                keepMounted
              >
                {/* Exportar a CSV */}
                <MenuItem
                  onClick={() => {
                    handleExportData();
                    handleCloseExportar();
                  }}
                  style={{ fontSize: "15px", marginTop: "5px", marginBottom: "5px" }}
                >
                  <FileTextFilled style={{ fontSize: "20px" }} />&nbsp;&nbsp;Archivo CSV
                </MenuItem>

                {/* Exportar a PDF */}
                <PDFGenerator data={data} handleCloseExportar={handleCloseExportar} />

                {/* Exportar a Excel */}
                <ExportToExcel data={ExportData} handleCloseExportar={handleCloseExportar} />
              </Menu>
            </div>

          </Stack>
          </Grid>

{/* Filtros de la tabla (Filas/Buscar) */}
<Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'end', md:'end'}}} >
<label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                // label="Filas"
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            </Grid>
                <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'start', md:'center'}}} >
             
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
            />        </Grid>
            </Grid>
  
  
        </CardContent>

        {/* Tabla */}
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            scroll={{ x: true }}
            size="small"
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

      <form onSubmit={handleSubmit((_data) => { })}>
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
                  <Chip label={editar ? "Editar Proceso" : "Agregar Proceso"} />
                </Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.descripcion}>Nombre del Proceso:</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 75,
                        }}
                        error={!!errors.descripcion}
                      />
                    )}
                    name="descripcion"
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.proc_CodigoHtm}>Color:</FormLabel>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="outlined-disabled"
                      inputProps={{
                        maxLength: 150,
                      }}
                      error={!!errors.proc_CodigoHtm}
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      disabled={true} // Agregar esta línea para desactivar el TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="add"
                              onClick={handleOpenColorPicker}
                            >
                              <img
                                src="https://th.bing.com/th/id/OIP.qtDHNUyf4d0E0SHEFDsTBQHaGX?pid=ImgDet&rs=1"
                                alt="Agregar"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </FormControl>
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
                  onClick={GuardarProceso}
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

      {/*Dialog para mostrar el color picker*/}
      <Dialog
        open={mostrarColorPicker}
        onClose={handleCloseColorPicker}
      >
        <DialogTitle>Seleccionar color</DialogTitle>
        <DialogContent>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "15px" }}>
            <FormControl fullWidth>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Controller
                  render={({ field }) => (
                    <ColorPicker
                      {...field}
                      color={selectedColor}
                      onChange={(newColor) => {

                        setSelectedColor(newColor.hex); // Actualiza el estado con el nuevo color
                      }}
                    />
                  )}
                  name="color"
                  control={control}
                />
                {/* Puedes ajustar los estilos según sea necesario */}
              </div>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseColorPicker}>Cancelar</Button>
          <Button onClick={handleCloseColorPicker1}>Aceptar</Button>
        </DialogActions>
      </Dialog>

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
              onClick={ProcesosDelete}
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
            <Grid item xs={12}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la proceso" />
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
                    Id del proceso:
                  </Typography>
                  <Typography>{DatosDetalles["proc_Id"]}</Typography>
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
                    Nombre del proceso:
                  </Typography>
                  <Typography>{DatosDetalles["proc_Descripcion"]}</Typography>
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
                      {DatosDetalles["usarioCreacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["proc_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["proc_FechaCreacion"]
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
                      {DatosDetalles["proc_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["proc_FechaModificacion"]
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
    </Card>
  );
}

export default ProcesosIndex;
