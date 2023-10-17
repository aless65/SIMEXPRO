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
import { Table } from "antd";
import { ExportToCsv } from 'export-to-csv';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastError,
  ToastDefault,
  ToastWarningYaExiste,
  ToastSuccess,
  ToastWarning,
  ToastErrorRegistroEnUso
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import AduanaService from "./AduanaService";
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

const defaultaduanaValues = {
  id: "",
  adua_Codigo: "",
  adua_Nombre: "",
  adua_Direccion_Exacta: "",
  Ciudad: null,
};

const accountSchema = yup.object().shape({
  id: yup.string(),
  adua_Codigo: yup.string().trim().required(""),
  adua_Nombre: yup.string().trim().required(""),
  adua_Direccion_Exacta: yup.string().trim().required(""),
  Ciudad: yup.object().required(""),
});


function AduanaIndex() {

  //variable del services
  const aduanaService = new AduanaService()
  const [ExportData, SetExportData] = useState([]);

  //Variables DDL
  const [Ciudad_DDL, setCiudad_DDL] = useState([]);

  //Cargado de las variables DDL
  async function ddls() {
    setCiudad_DDL(await load_DDLs.Ciudades());
  }

  //variable para la barra de busqueda
  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = useState(10);
  const [anchorEl, setAnchorEl] = useState({});
  const [data, setData] = useState([]);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);

  };

  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

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

  const handleDetails = (datos) => {
    setDatosDetalles(datos);
    CollapseDetalles();
    handleClose(datos.adua_Id);
  };

  const handleDelete = (datos) => {
    setValue("id", datos["adua_Id"]);
    DialogEliminar()
    handleClose(datos.adua_Id);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Código de la aduana",
      dataIndex: "adua_Codigo",
      key: "adua_Codigo",
      sorter: (a, b) => a.adua_Codigo.localeCompare(b.adua_Codigo), //sorting para Letras
    },
    {
      title: "Nombre de la aduana",
      dataIndex: "adua_Nombre",
      key: "adua_Nombre",
      sorter: (a, b) => a.adua_Nombre.localeCompare(b.adua_Nombre), //sorting para Letras
    },
    {
      title: "Dirección exacta",
      dataIndex: "adua_Direccion_Exacta",
      key: "adua_Direccion_Exacta",
      sorter: (a, b) => a.adua_Direccion_Exacta.localeCompare(b.adua_Direccion_Exacta), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.adua_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.adua_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.adua_Id)}
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
              id={`menu-${params.adua_Id}`}
              anchorEl={anchorEl[params.adua_Id]}
              keepMounted
              open={Boolean(anchorEl[params.adua_Id])}
              onClose={() => handleClose(params.adua_Id)}
            >
              <MenuItem
                onClick={() => {
                  History.push("/aduana/editar", params);
                }}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              {<MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>}
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
      label: 'Código de la aduana'
    },
    {
      label: 'Nombre de la aduana'
    },
    {
      label: 'Dirección exacta'
    },
  ];

  const csvOptions = {
    filename: 'Aduanas',
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
    try {
      csvExporter.generateCsv(ExportData);
    } catch (error) {

    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const camposToFilter = ["key", "adua_Codigo", "adua_Nombre", "adua_Direccion_Exacta"];

  const filteredRows = data.filter((row) => {
    if (searchText === "") {
      return true;
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
  }).slice()
    .reverse();

  const { reset, watch, setValue } =
    useForm({
      defaultaduanaValues,
      mode: "all",
      resolver: yupResolver(accountSchema),
    });

  const datosWatch = watch();
  const [cargandoData, setCargandoData] = useState([]);
  const aduanaGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);
      //setData(await aduanaService.listar()); //No puede ser un UseState la que guarde los datos 
      const data = await aduanaService.listar() //Guardar el valor siempre en una constante y luego setearlo 
      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await aduanaService.ExportData());
    } catch (error) {
      console.log(error)
      setCargandoData(null);
    }
  };

  const aduanaDelete = async () => {
    try {
      const response = await aduanaService.eliminar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha eliminado exitosamente");
        aduanaGetData();
        DialogEliminar();
        setSearchText('');
        reset(defaultaduanaValues);
      }
      else if (response.data.data.messageStatus == "0") {
        DialogEliminar();
        ToastErrorRegistroEnUso();
      }
    } catch (error) {

      ToastError("Error inesperado");
    }
  }

  useEffect(() => {
    aduanaGetData();
  }, []);

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
        image="https://i.ibb.co/r0frJNT/ADUANAS.png"
        alt="Encabezado de la carta"
      />

      {/* Inicio del Collapse incial (Tabla/Index) */}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo Inicio*/}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'start' } }} >
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
                    History.push("/aduana/crear");
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
                    <PDFGenerator data={ExportData} handleCloseExportar={handleCloseExportar} />

                    {/* Exportar a Excel */}
                    <ExportToExcel data={ExportData} handleCloseExportar={handleCloseExportar} />
                  </Menu>
                </div>
              </Stack>
              {/* Botón de Nuevo Fin */}
            </Grid>

            {/* Filtros de la tabla (Filas/Buscar) */}
            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'end', md: 'end' } }} >
              <label className='mt-8'>Filas por página:</label>
              <FormControl sx={{ minWidth: 50 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={filas}
                  onChange={handleChangeFilas}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'start', md: 'center' } }} >
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

        {/* Declaracion de la tabla */}
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            scroll={{ x: true }}
            dataSource={filteredRows}
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
      {/* Fin del Collapse incial (Tabla/Index) */}


      {/* Inicia del Dialog(Modal) Eliminar */}
      <Dialog
        open={Eliminar}
        fullWidth
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
              onClick={aduanaDelete}
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

      {/* Inicia del collapse Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-star",}}>

          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip label="Detalles de la Aduana" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="adua_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Aduana:
                    </Typography>
                    <Typography>{DatosDetalles['adua_Id']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   
             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="adua_Codigo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Codigo de la Aduana:
                    </Typography>
                    <Typography>{DatosDetalles['adua_Codigo']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>  

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="adua_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre de la Aduana:
                    </Typography>
                    <Typography>{DatosDetalles['adua_Nombre']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>    

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="ciud_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Ciudad:
                    </Typography>
                    <Typography>{DatosDetalles['ciud_Nombre']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>  

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pvin_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Provincia:
                    </Typography>
                    <Typography>{DatosDetalles['pvin_Nombre']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>    

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="adua_Direccion_Exacta">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Direccion Exacta:
                    </Typography>
                    <Typography>{DatosDetalles['adua_Direccion_Exacta']}</Typography>
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
                      {DatosDetalles["adua_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["adua_FechaCreacion"]
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
                      {DatosDetalles["adua_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["adua_FechaModificacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Eliminación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioEliminacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["adua_FechaEliminacion"]
                        ? new Date(
                          DatosDetalles["adua_FechaEliminacion"]
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
                <Button variant="contained"
                  style={{ position: 'fixed', top: '76%', right: '5%' }}
                  onClick={CollapseDetalles}
                  startIcon={<Icon>arrow_back</Icon>}>
                  Regresar</Button>
                <br />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Fin del Collapse Detalles */}

    </Card>
  )

}
export default AduanaIndex;








