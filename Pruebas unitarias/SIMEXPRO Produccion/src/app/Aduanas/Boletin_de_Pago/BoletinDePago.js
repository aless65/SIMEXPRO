/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */

import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

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
import SearchIcon from "@mui/icons-material/Search";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import { ToastError, ToastSuccess, ToastWarningPersonalizado } from "src/styles/toastsFunctions";
import BoletinDePagoService from "./BoletinDePagoService";

function BoletinDePagoIndex() {
  const load_DDLs = Load_DDLs()
  const boletinDePagoService = BoletinDePagoService();
  const [ExportData, SetExportData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [filas, setFilas] = useState(10);
  const [datosFila, setDatosFila] = useState({});
  const [DataTabla, setDataTabla] = useState([]);
  const [tipoliquidacion, setTipoLiquidacion] = useState("");
  const [estadoBoletin, setEstadoBoletin] = useState("");
  const [codigoImpuesto, setCodigoImpuesto] = useState("");
  const [conceptoPago, setConceptoPago] = useState("");
  const [Eliminar, setEliminar] = useState(false);
  const [habilitar, setHabilitar] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    BoletinDePagoGetData();
  }, []);

  const [cargandoData, setCargandoData] = useState([]);
  const BoletinDePagoGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);
      const data = await boletinDePagoService.listar()
      setDataTabla(data)
      // setDataTabla(DataTabla);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await boletinDePagoService.ExportData());
    } catch (error) {
      setCargandoData(null);
    }
  };

  const EmpleadosAccion = async () => {
    try {
      if (habilitar) {
        const response = await BoletinDePagoService.deshabilitar(datosFila)
        if (response.data.data['messageStatus'] === "1") {
          ToastSuccess('El registro ha sido deshabilitado')
        } else {
          ToastError('No se pudo deshabilitar el registro')
        }
      } else {
        const response = await BoletinDePagoService.habilitar(datosFila)
        if (response.data.data['messageStatus'] === "1") {
          ToastSuccess('El registro ha sido habilitado')
        } else {
          ToastError('No se pudo habilitar el registro')
        }
      }
      setDataTabla(await BoletinDePagoService.listar());
      DialogEliminar()
    } catch (error) {

    }
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEditBoletinPago = (params) => {
    if (params.esbo_Id != 3) {
      History.push('/BoletindePago/editar', params)
    } else {
      ToastWarningPersonalizado('Este boletin ya esta pagado')
    }
    handleClose(params.boen_Id);
  };

  const handleDetails = async (params) => {
    setDatosFila(params);

    const liquidaciones = await load_DDLs.TipoLiquidacion()
    const tipoliquidacion = liquidaciones.find(item => item.value == params?.tipl_Id)
    setTipoLiquidacion(tipoliquidacion.label)

    const estadosBoletin = await load_DDLs.EstadoBoletin()
    const estadoBoletin = estadosBoletin.find(item => item.value == params?.esbo_Id)
    setEstadoBoletin(estadoBoletin.label)

    const codigosImpuestos = await load_DDLs.CodigoImpuesto()
    const codigoImpuesto = codigosImpuestos.find(item => item.value == params?.coim_Id)
    setCodigoImpuesto(codigoImpuesto.label)

    const conceptosPagos = await load_DDLs.ConceptoPago()
    const conceptoPago = conceptosPagos.find(item => item.value == params?.copa_Id)
    setConceptoPago(conceptoPago.label)

    CollapseDetalles();
    handleClose(params.boen_Id);

  };

  const handleDelete = (params) => {
    setDatosFila(params);
    if (params.empl_Estado) {
      setHabilitar(true);
    } else {
      setHabilitar(false);
    }
    DialogEliminar()
    handleClose(params.empl_Id);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key,
    },

    {
      title: "No. de declaración",
      dataIndex: "boen_NDeclaracion",
      key: "boen_NDeclaracion",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos 
      sorter: (a, b) => a.boen_NDeclaracion.localeCompare(b.boen_NDeclaracion),
    },
    {
      title: "Preimpreso",
      dataIndex: "boen_Preimpreso",
      key: "boen_Preimpreso",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos 
      sorter: (a, b) => a.boen_Preimpreso.localeCompare(b.boen_Preimpreso),
    },
    {
      title: "Total a pagar",
      dataIndex: "boen_TotalPagar",
      key: "boen_TotalPagar",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos 
      sorter: (a, b) => a.boen_TotalPagar - b.boen_TotalPagar,
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.boen_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.boen_Id)}
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
              id={`menu-${params.boen_Id}`}
              anchorEl={anchorEl[params.boen_Id]}
              keepMounted
              open={Boolean(anchorEl[params.boen_Id])}
              onClose={() => handleClose(params.boen_Id)}
            >
              <MenuItem onClick={() => handleEditBoletinPago(params)}>
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
      label: 'No. de declaración',
    },
    {
      label: 'Preimpreso',
    },
    {
      label: 'Total a pagar'
    }
  ];

  const csvOptions = {
    filename: 'Boletin_Pago',
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

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const camposToFilter = [
    "empl_Id",
    "empl_Nombres",
    "empl_Apellidos",
    "empl_NombreCompleto",
    "empl_DNI",
    "eciv_Id",
    "empl_Sexo",
    "carg_Id",
  ];

  const filteredRows = DataTabla.filter((row) => {
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
  });

  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);

  };

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
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/0KkrNp4/IMPRESI-N-BOLET-N-DE-PAGO.png"
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
          {/* Botón de Nuevo Inicio*/}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'start' } }} >
              <Stack direction="row" spacing={1}>
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
                  onChange={handleChange}
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

      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(cargandoData),
            }}
            columns={columns}
            scroll={{ x: true }}
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

      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles del Empleado" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                  <InputLabel htmlFor="empl_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Boletin de pago:
                    </Typography>
                    <Typography>{datosFila['boen_Id']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="empl_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      No. Duca:
                    </Typography>
                    <Typography>{datosFila['duca_Id']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="empl_DNI">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID de liquidacion:
                    </Typography>
                    <Typography>{datosFila['liqu_Id']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="empl_Sexo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Tipo Liquidacion:
                    </Typography>
                    <Typography>{tipoliquidacion}</Typography>
                </InputLabel>
                </Box>
             </Grid>   
           
             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="escv_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Fecha Emision:
                    </Typography>
                    <Typography>{new Date(datosFila['boen_FechaEmision']).toLocaleString()}</Typography>
                  </InputLabel>
                </Box>
             </Grid> 


             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="carg_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Estado del Boletin:
                    </Typography>
                    <Typography>{estadoBoletin}</Typography>
                  </InputLabel>
                </Box>
             </Grid>     
        
             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="empl_Telefono">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Observaciones del boletin:
                    </Typography>
                    <Typography>{datosFila['boen_Observaciones']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   
             
             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="empl_Direccion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      N° Declaracion:
                    </Typography>
                    <Typography>{datosFila['boen_NDeclaracion']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="pvin_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Preimpreso:
                    </Typography>
                    <Typography>{datosFila['boen_Preimpreso']}</Typography>
                  </InputLabel>
                </Box>
             </Grid>   

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="empl_CorreoElectronico">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Codigo Impuesto:
                    </Typography>
                    <Typography>{codigoImpuesto}</Typography>
                  </InputLabel>
                </Box>
             </Grid> 

             <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Box Box sx={{ textAlign: "center" }}>
                  <InputLabel htmlFor="empl_CorreoElectronico">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Concepto Pago:
                    </Typography>
                    <Typography>{conceptoPago}</Typography>
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
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>Accion
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
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usuarioCreacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{new Date(datosFila['boen_FechaCreacion']).toLocaleString()}</td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usuarioModificacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {datosFila['boen_FechaModificacion']
                        ? new Date(datosFila['boen_FechaModificacion']).toLocaleString()
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
                  style={{ position: 'fixed', top: '76%', right: '5%' }}
                  onClick={CollapseDetalles}
                  startIcon={<Icon>arrow_back</Icon>}
                >Regresar</Button>
                <br></br>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      <Dialog
        open={Eliminar}
        fullWidth={true}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de {habilitar ? "deshabilitación" : "habilitacion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea {habilitar ? "deshabilitar" : "habilitar"} este registro?
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
              sx={habilitar ? undefined : {
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={EmpleadosAccion}
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
      <ToastContainer />
    </Card>
  );
}

export default BoletinDePagoIndex;
