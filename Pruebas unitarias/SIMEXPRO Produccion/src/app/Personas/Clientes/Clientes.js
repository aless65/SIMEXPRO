/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";

import ClientesService from "./ClientesService";

import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastError,
  ToastErrorRegistroEnUso,
  ToastSuccess,
  ToastWarning
} from "src/styles/toastsFunctions";

function ClientesIndex() {
  const clientesServices = ClientesService();
  const [ExportData, SetExportData] = useState([]);

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles
  // const [mostrarEditar, setmostrarEditar] = useState(false); //Para editar
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  // const [mostrarAgregar, setmostrarAgregar] = useState(false); //Para agregar

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = useState(10);

  //Campos para guardar el registro de una fila
  const [datosFila, setDatosFila] = useState({});

  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([]);




  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    ClientesGetData();
  }, []);

  const [cargandoData, setCargandoData] = useState([]);
  //Constante para cargar datos a las tablas
  const ClientesGetData = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);
      const data = await clientesServices.listar();
      setDataTabla(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await clientesServices.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };
  

  //Constantes para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Necesario para el boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEditClientes = (params) => {
    History.push('/Clientes/editar',params)
    handleClose(params.clie_Id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (params) => {
    setDatosFila(params);
    CollapseDetalles();
    handleClose(params.clie_Id);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones

  const handleDelete = (params) => {
    setDatosFila(params);
    DialogEliminar()
    handleClose(params.clie_Id);
  };
  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Nombre o razón social",
      dataIndex: "clie_Nombre_O_Razon_Social",
      key: "clie_Nombre_O_Razon_Social",
      sorter: (a, b) => a.clie_Nombre_O_Razon_Social.localeCompare(b.clie_Nombre_O_Razon_Social),
    },
    {
      title: "RTN del cliente",
      dataIndex: "clie_RTN",
      key: "clie_RTN",
      sorter: (a, b) => a.clie_RTN.localeCompare(b.clie_RTN),
    },
    {
      title: "Nombre de contacto",
      dataIndex: "clie_Nombre_Contacto",
      key: "clie_Nombre_Contacto",
      sorter: (a, b) => a.clie_Nombre_Contacto.localeCompare(b.clie_Nombre_Contacto),
    },
    {
      title: "Correo electrónico",
      dataIndex: "clie_Correo_Electronico",
      key: "clie_Correo_Electronico",
      sorter: (a, b) => a.clie_Correo_Electronico.localeCompare(b.clie_Correo_Electronico),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.clie_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.clie_Id)}
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
              id={`menu-${params.clie_Id}`}
              anchorEl={anchorEl[params.clie_Id]}
              keepMounted
              open={Boolean(anchorEl[params.clie_Id])}
              onClose={() => handleClose(params.clie_Id)}
            >
              <MenuItem onClick={() => handleEditClientes(params)}>
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
  const csvHeader = [
    {
        label: 'No.',
    },  
    {
        label:  'Nombre o razón social',
    },  
    {
        label: 'RTN del cliente',
    },  
    {
        label:'Nombre de contacto',
    },  
    {
        label:'Correo electrónico'
    }
]
const csvOptions = { 
    filename: 'Clientes',
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
    try{
      csvExporter.generateCsv(ExportData);
    }catch(error){
      
    }
  };
  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  // Peticion para Eliminar un registro
  const clientesDelete = async () => {
    try {
      const response = await clientesServices.eliminar(datosFila);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess();
        ClientesGetData();
        DialogEliminar();
      }
       else if (response.data.data.messageStatus == "0") {
        DialogEliminar();
        ToastErrorRegistroEnUso();
      }
      
    } catch (error) {
      ToastError();
    }
  }

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = [
    "clie_Nombre_O_Razon_Social",
    "clie_RTN",
    "clie_Nombre_Contacto", 
    "clie_Correo_Electronico", 
   
  ];

  //Constante que ayuda a filtrar el datatable
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
  }).reverse()

    //Declaracion del formulario
    const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
  //    defaultProveedoresValues, //Campos del formulario
      mode: "all",
    //  resolver: yupResolver(), //Esquema del formulario
    });


  //Constante para mostrar el collapse de detalles un registro
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
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
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/0KzPC2w/CLIENTES.png"
        alt="Encabezado de la carta"
      />

      {/*Collapse del index*/}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{justifyContent:{xs:'center',sm:'center', md:'start'}}} >
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
                History.push("/Clientes/Crear");
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

          {/* Select para las filas de la tabla inicio*/}
          <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'end', md:'end'}}} >
              <label className='mt-8'>Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            </Grid>
                <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'start', md:'center'}}} >
                {/* Barra de Busqueda en la Tabla */}
                <TextField
              style={{ borderRadius: '10px' }}
              placeholder='Buscar'
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

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData)
            }}
            columns={columns}
            dataSource={filteredRows}
            size="small"
            scroll={{ x: true }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}

      {/* Collapse de los Detalles */}
      <Collapse in={mostrarDetalles}>
      <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip label="Detalles del Cliente" />
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
                <InputLabel htmlFor="clie_Id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    ID del cliente:
                  </Typography>
                  <Typography>{datosFila["clie_Id"]}</Typography>
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
                <InputLabel htmlFor="clie_Nombre_O_Razon_Social">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre o razón social:
                    </Typography>
                    <Typography>{datosFila['clie_Nombre_O_Razon_Social']}</Typography>
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
                  <InputLabel htmlFor="clie_RTN">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      N° de RTN:
                    </Typography>
                    <Typography>{datosFila['clie_RTN']}</Typography>
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
                  <InputLabel htmlFor="clie_Nombre_Contacto">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre de contacto:
                    </Typography>
                    <Typography>{datosFila['clie_Nombre_Contacto']}</Typography>
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
                  <InputLabel htmlFor="clie_Numero_Contacto">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    N° telefónico de contacto:
                    </Typography>
                    <Typography>{datosFila['clie_Numero_Contacto']}</Typography>
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
                  <InputLabel htmlFor="clie_Correo_Electronico">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo electrónico:
                    </Typography>
                    <Typography>{datosFila['clie_Correo_Electronico']}</Typography>
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
                  <InputLabel htmlFor="clie_FAX">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      N° de fax:
                    </Typography>
                    <Typography>{datosFila['clie_FAX']}</Typography>
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
                  <InputLabel htmlFor="pais_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      País:
                    </Typography>
                    <Typography>{datosFila['pais_Nombre']}</Typography>
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
                  <InputLabel htmlFor="pvin_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Provincia:
                    </Typography>
                    <Typography>{datosFila['pvin_Nombre']}</Typography>
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
                  <InputLabel htmlFor="clie_Direccion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Dirección:
                    </Typography>
                    <Typography>{datosFila['clie_Direccion']}</Typography>
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
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>Acción
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usuarioNombreCreacion']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{new Date(datosFila['clie_FechaCreacion']).toLocaleString()}</td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usuarioNombreModificacion']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                       {datosFila['clie_FechaModificacion']
                        ? new Date(datosFila['clie_FechaModificacion']).toLocaleString()
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
                  onClick={CollapseDetalles}
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
      {/* Collapse para mostrar los detalles de un registro fin */}

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
              onClick={clientesDelete}
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
      <ToastContainer />
    </Card>
  );
}

export default ClientesIndex;
