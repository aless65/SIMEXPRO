/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import SearchIcon from "@mui/icons-material/Search";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
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
  Autocomplete,
} from "@mui/material";
import { Image, Table, Tag } from "antd";
import { ExportToCsv } from "export-to-csv";
import * as React from "react";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import ExportToExcel from "./RevisionCalidadExcel";
import PDFGenerator from "./RevisionCalidadPDF";
import RevisionCalidadService from "./RevisionCalidadService";
import {
  ToastError,
  ToastSuccessEliminar,
  ToastErrorRegistroEnUso,
} from "src/styles/toastsFunctions";
import { useLocation } from "react-router-dom";

function RevisionCalidadIndex() {
  const location = useLocation();
  const [ExportData, SetExportData] = useState([]);

  // Constante para el Service
  const revisionCalidadService = RevisionCalidadService();
  const ddls = Load_DDLs();

  // Constante para el buscador
  const [searchText, setSearchText] = useState("");

  // Constante para mostrar el index, eliminar y los detalles.
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [Eliminar, setEliminar] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});

  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const [anchorElDetalles, setAnchorElDetalles] = useState({});

  const [filas, setFilas] = React.useState(10);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClickDetalles = (event, id) => {
    setAnchorElDetalles((prevState) => ({
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

  const handleCloseDetalles = (id) => {
    setAnchorElDetalles((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (params) => {
    History.push("RevisionCalidad/Editar", params);
    handleCloseDetalles(params.reca_Id);
  };

  const handleDetails = (params) => {
    setDatosDetalles(params);
    MostrarDetalles();
    handleCloseDetalles(params.reca_Id);
  };

  const handleDelete = (params) => {
    setDatosDetalles(params);
    DialogEliminar();
    handleClose(params.reca_Id);
  };

  const RevisionDelete = async () => {
    try {
      const response = await revisionCalidadService.eliminar(DatosDetalles);
      if (response.data.data.messageStatus == "1") {
        ToastSuccessEliminar();
        RevisionCalidadGetData();
        DialogEliminar();
      } else if (response.data.data.messageStatus.includes("0")) {
        ToastErrorRegistroEnUso();
        DialogEliminar();
      }
    } catch (error) {

      ToastError();
      DialogEliminar();
    }
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const handleAgregar = (params) => {
    History.push("RevisionCalidad/Crear", params);
    handleClose(params.ensa_Id);
  };

  const handleReportes = (params) => {
    History.push("RevisionCalidad/reporte", params);
    handleClose(params.ensa_Id);
  };

  /*Columnas de la tabla*/
  const columnsDetalles = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Descripción de la revisión",
      dataIndex: "reca_Descripcion",
      key: "reca_Descripcion",
      sorter: (a, b) => a.reca_Descripcion.localeCompare(b.reca_Descripcion), //sorting para Letras
    },
    {
      title: "Cantidad",
      dataIndex: "reca_Cantidad",
      key: "reca_Cantidad",
      sorter: (a, b) => a.reca_Cantidad - b.reca_Cantidad,
    },
    {
      title: "Fecha de revisión",
      dataIndex: "reca_FechaRevision",
      key: "reca_FechaRevision",
      render: (text, record) =>
        `${new Date(record.reca_FechaRevision).toLocaleString("es-US", {
          dateStyle: "short",
        })}`, // sirve para unir textos
      sorter: (a, b) =>
        a.reca_FechaRevision.localeCompare(b.reca_FechaRevision), //sorting para Letras
    },
    {
      title: "Contiene Scrap",
      dataIndex: "reca_Scrap",
      key: "reca_Scrap",
      render: (text, record) => {
        return record.reca_Scrap ? (
          <Tag color="red">Si</Tag>
        ) : (
          <Tag color="green">No</Tag>
        );
      },
      sorter: (a, b) =>
        a.reca_Scrap.toString().localeCompare(b.reca_Scrap.toString()), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.reca_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.reca_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClickDetalles(e, params.reca_Id)}
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
              id={`menu-${params.reca_Id}`}
              anchorEl={anchorElDetalles[params.reca_Id]}
              keepMounted
              open={Boolean(anchorElDetalles[params.reca_Id])}
              onClose={() => handleCloseDetalles(params.reca_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>  Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>  Detalles
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

  const columns = [
    {
      title: "No.",
      dataIndex: "row",
      key: "row",
      sorter: (a, b) => a.row - b.row, // sorting para Numeros
    },
    {
      title: "Cantidad",
      dataIndex: "ensa_Cantidad",
      key: "ensa_Cantidad",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos
      sorter: (a, b) => a.ensa_Cantidad - b.ensa_Cantidad,
    },
    {
      title: "Empleado encargado",
      dataIndex: "empl_NombreCompleto",
      key: "empl_NombreCompleto",
      sorter: (a, b) =>
        a.empl_NombreCompleto.localeCompare(b.empl_NombreCompleto),
    },
    {
      title: "Sexo",
      dataIndex: "code_Sexo",
      key: "code_Sexo",
      sorter: (a, b) => a.code_Sexo.localeCompare(b.code_Sexo),
    },
    {
      title: "Estilo",
      dataIndex: "esti_Descripcion",
      key: "esti_Descripcion",
      sorter: (a, b) => a.esti_Descripcion.localeCompare(b.esti_Descripcion),
    },
    {
      title: "Daños",
      dataIndex: "totalProducido",
      key: "totalProducido",
      render: (text, record) => {
        return `${record.totalProducido}/${record.ensa_Cantidad}`;
      },
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.ensa_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.ensa_Id)}
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
              id={`menu-${params.ensa_Id}`}
              anchorEl={anchorEl[params.ensa_Id]}
              keepMounted
              open={Boolean(anchorEl[params.ensa_Id])}
              onClose={() => handleClose(params.ensa_Id)}
            >
              <MenuItem onClick={() => handleAgregar(params)}>
                <Icon>add</Icon>ㅤAgregar Revisión
              </MenuItem>
              <MenuItem onClick={() => handleReportes(params)}>
                <Icon>visibility</Icon>ㅤGenerar Reporte
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
      label: "Cantidad",
    },
    {
      label: "Empleado encargado",
    },
    {
      label: "Sexo",
    },
    {
      label: "Estilo",
    },
    {
      label: "Daños",
    },
    {
      label: "Revisiones",
    },
  ];

  const csvOptions = {
    filename: 'Revision_Calidad',
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
    } catch (error) {

    }
  };
  const [data, setData] = useState([]);

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  const RevisionCalidadGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);

      const x = await revisionCalidadService.Nuevolistar(ordeneSeleccionada?.value)

      setData(x);
      x.length > 0 ? setCargandoData(x) : setCargandoData(null);
      SetExportData(await revisionCalidadService.ExportData(ordeneSeleccionada?.value));
    } catch (error) {
      setCargandoData(null)
    }
  };

  const [ordenes, setOrdenes] = useState([]);
  const [ordeneSeleccionada, setOrdeneSeleccionada] = useState(null);

  useEffect(() => {
    RevisionCalidadGetData();
    cargarDDl();
  }, []);

  useEffect(() => {
    RevisionCalidadGetData();
  }, [ordeneSeleccionada]);

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }


  async function cargarDDl() {
    const x = await ddls.MultiFuncional();
    setOrdenes(x);
    if (location.state) {
      setOrdeneSeleccionada(x.find((x) => (x.value === location.state?.ensa_Id)))
    }
    return x;
  }

  //Constante para mostrar el collapse de editar un registro
  const MostrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultRevisionValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  // Filtrado de datos
  const camposToFilter = ["row", "ensa_Cantidad", "empl_NombreCompleto", "code_Sexo", "esti_Descripcion", "totalProducido"];

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
        image="https://i.ibb.co/pwQbH4s/REVISI-N-DE-CALIDAD.png"
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
            <Grid item xs={12} sm={12} md={4} display={"flex"} sx={{justifyContent:{xs:'center',sm:'center', md:'start'}}} >
    
            <label className="mt-8">Orden:</label>
            <FormControl sx={{ minWidth: 255 }} size="small">
              {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
              <Autocomplete
                fullWidth
                // style={{ minWidth: 300 }}
                size="small"
                id="proceso"
                isOptionEqualToValue={(option, value) =>
                  option.value === value?.value
                }
                options={ordenes}
                value={ordeneSeleccionada}
                onChange={(event, value) => {
                  setOrdeneSeleccionada(value);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>

              </Grid>
            <Grid item xs={12} sm={12} md={2} display={"flex"} sx={{justifyContent:{xs:'center',sm:'center', md:'start'}}} >
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

            </Grid>

{/* Filtros de la tabla (Filas/Buscar) */}
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
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            {/* Barra de Busqueda en la Tabla */}
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
            />
                </Grid>
          </Grid>


        </CardContent>

        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            scroll={{ x: true }}
            columns={columns}
            expandable={{
              columnTitle: "Desplegar detalle",
              expandedRowRender: (record) => (
                <Table
                  columns={columnsDetalles}
                  dataSource={record.detalles}
                  pagination={false}
                />
              ),
              rowExpandable: (record) => record.detalles.length > 0,
              // expandedRowKeys: [location.state?.row? location.state?.row : 0]
            }}
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
              <Divider style={{ marginBottom: "10px" }}>
                <Chip label="Detalles de la Revisión de Calidad" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Imagen de la prenda:
                  </Typography>

                  <Image
                    width={200}
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                    src={DatosDetalles["reca_Imagen"]}
                  />
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
                    Descripción de la revisión:
                  </Typography>
                  <Typography>{DatosDetalles["reca_Descripcion"]}</Typography>
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
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Revisión de calidad No.:
                  </Typography>
                  <Typography>{DatosDetalles["reca_Id"]}</Typography>
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
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del proceso revisado:
                  </Typography>
                  <Typography>{DatosDetalles["ensa_Id"]}</Typography>
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
                    Cantidad de prendas afectadas:
                  </Typography>
                  <Typography>{DatosDetalles["reca_Cantidad"]}</Typography>
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
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Es Scrap:
                  </Typography>
                  <Typography>
                    {DatosDetalles["reca_Scrap"] ? (
                      <Tag color="red">Si</Tag>
                    ) : (
                      <Tag color="green">No</Tag>
                    )}
                  </Typography>
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
                      Acción
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
                      {DatosDetalles["usua_UsuarioCreacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {new Date(
                        DatosDetalles["reca_FechaCreacion"]
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usua_UsuarioModificacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["reca_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["reca_FechaModificacion"]
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
      {/* Collapse para mostrar los detalles de un registro fin*/}

      {/* Dialog eliminar */}
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
              onClick={RevisionDelete}
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
    </Card>
  );
}

export default RevisionCalidadIndex;
