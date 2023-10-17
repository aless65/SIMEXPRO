import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
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
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { Table } from "antd";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import History from 'src/@history/@history';
import LoadingIcon from "src/styles/iconoCargaTabla";
import { ToastErrorRegistroEnUso, ToastSuccess } from 'src/styles/toastsFunctions';
import * as yup from "yup";
import RolesService from './rolesservice';
import { FileTextFilled } from '@ant-design/icons';
import { MoreVert } from '@material-ui/icons';
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from './RolesExcel';
import PDFGenerator from './RolesPDF';

const defaultRolesValues = {
  id: '',
  role_Descripcion: '',
}

const RolesSchema = yup.object().shape({
  role_Id: yup.string(),
  role_Descripcion: yup.string().required(''),

})

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

function RolesIndex() {
  const RolesServices = RolesService()
  
  const [ExportData, setExportData] = useState([]);

  const [DataTabla, setDataTabla] = useState([])
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const Navigate = useNavigate();
  const [expandedRowKey, setExpandedRowKey] = useState(null);

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (codigo) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [codigo]: null,
    }));
  };

  //Constante para el editar de los registros y que de un solo me lleve los datos que necesito
  const handleEdit = (id, descripcion, detalles) => {
    const datosEditar = {
      role: id,
      nombre: descripcion,
      pantallas: detalles
    };
    History.push("Roles/Editar", datosEditar);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    MostrarCollapseDetalles();
    handleClose(datos.role_Id);
  };


  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);

  }

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value)
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };


  //Constante para tomar los valores
  const { watch, setValue } = useForm({
    defaultRolesValues,
    mode: 'all',
    resolver: yupResolver(RolesSchema),
  });
  const datosWatch = watch();



  //Constante para cargar datos a las tablas      
  useEffect(() => {
    ListadoRoles();
    getExportData();
  }, []);

  const [cargandoData, setCargandoData] = useState([]);
  //Constante del listado de la tabla
  const ListadoRoles = async () => {
    try {
      setCargandoData([]);
      setDataTabla([]);
      const data = await RolesServices.ListadoRoles()
      setDataTabla(data)      
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
    } catch (error) {
      setCargandoData(null);
    }
  };

  const getExportData = async () => {
    try{
      setExportData(await RolesServices.ExportData())
    }catch (error) {
      
    }
  }

  //Constante para tomar el id del menu
  const handleDelete = (data) => {
    setValue('id', data['role_Id'])
    DialogEliminar();
    handleClose(data['role_Id']);
  };

  //Constante para cerrar el modal de eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Constante pata la eliminacion de los roles 
  const EliminarRoles = async () => {
    try {
      const response = (await RolesServices.EliminarRoles(datosWatch))
      if (response.data.data.messageStatus == '1') {
        ToastSuccess('El registro se ha eliminado exitosamente')
        ListadoRoles();
        DialogEliminar();
      }
      else if (response.data.data.messageStatus == '0') {
        DialogEliminar();
        ToastErrorRegistroEnUso();

      }
    } catch (error) {
      
    }
  }

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.role_Id - b.role_Id, //sorting para Numeros
    },
    {
      title: "Descripción del rol",
      dataIndex: "role_Descripcion",
      key: "role_Descripcion",
      sorter: (a, b) => a.role_Descripcion.localeCompare(b.role_Descripcion), //sorting para Letras
    },

    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.role_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.role_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.role_Id)}
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
              role_Id={`menu-${params.role_Id}`}
              anchorEl={anchorEl[params.role_Id]}
              keepMounted
              open={Boolean(anchorEl[params.role_Id])}
              onClose={() => handleClose(params.role_Id)}
            >
              <MenuItem onClick={() => handleEdit(params.role_Id, params.role_Descripcion, params.detalles)}>
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
      label: 'Descripción del rol'
    },
    {
      label: 'Pantallas'
    }

  ];

  const csvOptions = {
    filename: 'Roles', 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: csvHeader.map((c) => c.label) /* headerLabels */,
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    try{
      csvExporter.generateCsv(ExportData);
    }catch(error){
      
    }
  };


  const expandableConfig = {
    columnTitle: "Desplegar detalle",
    expandedRowKeys: [expandedRowKey],
    expandedRowRender: (record) => (
      <Table
        columns={columnsExpandable}
        dataSource={record.detalles}
        pagination={false}
      />
    ),
    rowExpandable: (record) => record.name !== "Not Expandable",
    onExpand: async (expanded, record) => {
      if (expanded) {
        // await ListadoRoles(record.detalles);
        setExpandedRowKey(record.key);
      } else {
        setExpandedRowKey(null);
      }
    },
  };



  //Constantes para los campos de la Tabla Maestra
  const columnsExpandable = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.pant_Id - b.pant_Id, //sorting para Numeros
    },
    {
      title: 'Descripción de la pantalla',
      dataIndex: 'pant_Nombre',
      key: 'pant_Nombre',
      sorter: (a, b) => a.pant_Nombre.localeCompare(b.pant_Nombre), //sorting para Letras
    }
  ];

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["key", "role_Descripcion", "pant_Nombre", "ropa_Id"];



  //Constantes que ayuda a filtrar el datatable
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
  }).slice()  
  .reverse();


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
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
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/gMjB52g/ROLES.png"
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
         
          {/* Botón de Nuevo Inicio*/}
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
              onClick={(e) => {
                Navigate("/Roles/Crear");
              }}>
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
                <PDFGenerator data={DataTabla} handleCloseExportar={handleCloseExportar} />

                {/* Exportar a Excel */}
                <ExportToExcel data={ExportData} handleCloseExportar={handleCloseExportar} />
              </Menu>
            </div>           
          </Stack>
          {/* Botón de Nuevo Fin */}
            </Grid>


          {/* Select para las filas de la tabla inicio*/}  
          <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'end', md:'end'}}} >
          
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
            {/* Select para las filas de la tabla fin*/}
            </Grid>
                <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'start', md:'center'}}} >
              
            {/* Barra de Busqueda en la Tabla inicio */}
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
            {/* Barra de Busqueda en la Tabla fin */} 
            </Grid>
            </Grid>
                
        </CardContent>
      </Collapse>

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
        <Table
            columns={columns}
            expandable={expandableConfig}
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
            }}
            dataSource={filteredRows}
            size="small"
            scroll={{ x: true }}
            pagination={{
              pageSize: filas
              , className: 'custom-pagination'
            }}

          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}

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
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip label="Detalles del Rol" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Id del Rol:
                    </Typography>
                    <Typography>{DatosDetalles['role_Id']}</Typography>
                  </InputLabel>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Descripción del rol:
                    </Typography>
                    <Typography>{DatosDetalles['role_Descripcion']}</Typography>
                  </InputLabel>
              </Box>
            </Grid>

            <Grid container justifyContent="center" style={{ marginBottom: '25px', marginLeft: '30px', marginBottom: '40px' }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="pantallas">
                      <Divider style={{ marginTop: '0px', marginBottom: '10px', borderColor: '#aa8caf' }}>
                        <Chip color='default' variant='outlined' label="Pantallas asignadas" />
                      </Divider>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'left' }}>
                        {DatosDetalles['detalles'] ? (
                          DatosDetalles['detalles'].map((pantalla, index) => (
                            <div key={index} style={{ margin: '0 30px' }}>
                              ✔ {pantalla.pant_Nombre}
                            </div>
                          ))
                        ) : (
                          <>
                            <Typography display={"flex"} justifyContent={"center"} variant="subtitle1" align="center">
                            </Typography>
                            <Typography display={"flex"} justifyContent={"center"} variant="subtitle1" align="center">
                              No se han asignado pantallas hasta el momento.
                            </Typography>
                            <Typography display={"flex"} justifyContent={"center"} variant="subtitle1" align="center">
                            </Typography>
                            </>
                          
                        )}
                      </div>
                    </InputLabel>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <table
                id="detallesTabla"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>
                      <Icon style={iconStyle}>edit</Icon>Accion
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
                    <td style={tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles["role_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["role_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DatosDetalles['usuarioModificadorNombre']}</td>
                    <td style={tableCellStyle}>
                    {DatosDetalles["role_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["role_FechaModificacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <Grid item xs={12}>
              <div className="card-footer">
                <Button variant="contained"
                  style={{ position: 'fixed', top: '76%', right: '5%' }}
                  onClick={CerrarCollapseDetalles}
                  startIcon={<Icon>arrow_back</Icon>}>
                  Regresar</Button>
                <br />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>


      <Dialog
        open={Eliminar}
        fullWidth={'md'}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="error"
              style={{ borderRadius: '10px', marginRight: '10px' }}

              onClick={EliminarRoles}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#DAD8D8', color: 'black',
                "&:hover": { backgroundColor: '#BFBABA' },
              }}
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

    </Card>
  );
}

export default RolesIndex;
