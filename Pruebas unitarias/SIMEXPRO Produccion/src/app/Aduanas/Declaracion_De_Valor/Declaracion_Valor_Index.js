
import SearchIcon from "@mui/icons-material/Search";
import {
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
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import History from 'src/@history/@history';
import {
  ToastWarningPersonalizado
} from "src/styles/toastsFunctions";

import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import Declaracion_ValorService from "./Declaracion_ValorService";

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

function Declaracion_Valor_Index() {
  const [ExportData, SetExportData] = useState([]);
  const csvHeader = [
    {
      label: 'No.',
    },
    {
      label: 'Código de la declaración de valor',
    },
    {
      label: 'Aduana de ingreso'
    },
    {
      label: 'Aduana de despacho'
    },
    {
      label: 'Nombre del importador'
    },
    {
      label: 'Nombre del proveedor'
    },
    {
      label: 'Nombre del intermediario'
    },
  ];
  const csvOptions = {
    filename: 'Declaracion_Valor',
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



  const DeclaracionValorService = Declaracion_ValorService();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [view, setView] = useState(false);



  const DialogEliminar = () => { setEliminar(!Eliminar); };

  const [anchorEl, setAnchorEl] = useState({});

  const camposToFilter = ["key", "deva_Id", "impo_Nombre_Raso", "prov_Nombre_Raso", ""];


  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (params) => {
    handleClose(params.deva_Id);
    if (params.deva_Finalizacion == true) {
      ToastWarningPersonalizado('Advertencia. La DEVA ha sido finalizada. Lamentablemente, no es posible realizar modificaciones en la misma.')
    } else {
      setTimeout(() => {
        History.push("/Declaracion_Valor/editar", params);
      }, "1000")
    }
  };


  const handleDelete = (id) => {
    // Lógica para manejar la eliminación de la fila con el ID proporcionado
    handleClose(id);
  };

  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
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
      title: 'Código de la declaración de valor',
      dataIndex: 'deva_Id',
      key: 'deva_Id',
      sorter: (a, b) => a.deva_Id - b.deva_Id,
    },
    {
      title: 'Aduana de ingreso',
      dataIndex: 'adua_IngresoNombre',
      key: 'adua_IngresoNombre',
      sorter: (a, b) => a.adua_IngresoNombre.localeCompare(b.adua_IngresoNombre),
    },
    {
      title: 'Aduana de despacho',
      dataIndex: 'adua_DespachoNombre',
      key: 'adua_DespachoNombre',
      sorter: (a, b) => a.adua_DespachoNombre.localeCompare(b.adua_DespachoNombre),
    },
    {
      title: 'Nombre del importador',
      dataIndex: 'impo_Nombre_Raso',
      key: 'impo_Nombre_Raso',
      sorter: (a, b) => a.impo_Nombre_Raso.localeCompare(b.impo_Nombre_Raso),
    },
    {
      title: 'Nombre del proveedor',
      dataIndex: 'prov_Nombre_Raso',
      key: 'prov_Nombre_Raso',
      sorter: (a, b) => a.prov_Nombre_Raso.localeCompare(b.prov_Nombre_Raso),
    },
    {
      title: 'Nombre del intermediario',
      dataIndex: 'inte_Nombre_Raso',
      key: 'inte_Nombre_Raso',
      sorter: (a, b) => a.inte_Nombre_Raso.localeCompare(b.inte_Nombre_Raso),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.deva_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.deva_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.deva_Id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.deva_Id}`}
              anchorEl={anchorEl[params.deva_Id]}
              keepMounted
              open={Boolean(anchorEl[params.deva_Id])}
              onClose={() => handleClose(params.deva_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>print_connect</Icon>ㅤReporte
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ,
    },
  ];

  // //Constante para mostrar el collapse de detalles un registro
  // const MostrarCollapseReporte = () => {
  //   setmostrarIndex(!mostrarIndex);
  //   setmostrarReporte(!mostrarReporte);
  // };

  //  //Constante para cerrar el collapse de detalles
  //  const CerrarCollapseReporte = () => {
  //   setmostrarIndex(!mostrarIndex);
  //   setmostrarReporte(!mostrarReporte);
  // };


  const handleDetails = (params) => {
    handleClose(params.deva_Id);
    if (params.deva_Finalizacion == true) {
      History.push("/Declaracion_Valor/reporte", params)
    } else {
      ToastWarningPersonalizado('¡Advertencia!.\n Para generar el reporte necesita haber dado por finalizada la declaración de valor.')
    }

    handleClose(params.deva_Id);
  };

  const [data, setData] = useState([]);

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  const DeclaracionValorGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);

      const data = await DeclaracionValorService.listar();

      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await DeclaracionValorService.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };

  useEffect(() => {
    DeclaracionValorGetData();
  }, []);


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {
    /* Filtrado de datos */
  }

  const filteredRows = data.filter((row) => {
    if (searchText === "") {
      return true;  // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue = typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
        const formattedSearchText = typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });


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
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/Trhd4rH/DECLARACI-N-DE-VALOR.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>


          {/* Botón de Nuevo Inicio*/}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'start' } }} >
              <Stack direction="row" spacing={1}>
                <Button
                  startIcon={<Icon>add</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E', color: 'white',
                    "&:hover": { backgroundColor: '#6e52ae' },
                  }}
                  onClick={() => {
                    navigate('/Declaracion_Valor/Crear')
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
              {/* Botón de Nuevo Fin */}
            </Grid>

            {/* Filtros de la tabla (Filas/Buscar) */}
            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'end', md: 'end' } }} >
              <label className='mt-8'>Filas por página:</label>
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

            <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'start', md: 'center' } }} >
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

      {/* Tabla */}
      <Collapse in={mostrarIndex}>
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
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="error"
              style={{ borderRadius: '10px', marginRight: '10px' }}

              onClick={DialogEliminar}
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

export default Declaracion_Valor_Index;



