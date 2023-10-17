/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
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

import SearchIcon from '@mui/icons-material/Search';
import { Image } from "antd";
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
// Imports de validaciones
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// Imports tabla
import { Table } from 'antd';
import 'src/styles/custom-pagination.css';
import LoadingIcon from 'src/styles/iconoCargaTabla';
// import tabla detalles
import estilosTablaDetalles from 'src/styles/tablaDetalles';
// Import service
import MaterialesService from './MaterialesService';
// Import ddls
import Load_DDLs from 'src/app/loadDDLs/Load_DDL';
// import Toast
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import 'react-toastify/dist/ReactToastify.css';
import { ToastError, ToastSuccess, ToastWarning, ToastWarningYaExiste } from 'src/styles/toastsFunctions';
import ExportToExcel from "./MaterialesExcel";
import PDFGenerator from "./MaterialesPDF";


const defaultMaterialesValues = {
  id: '',
  mate_Descripcion: '',
  categorias: null,
  subcategoria: null,

};
const schema = yup.object().shape({
  id: yup.string(),
  categorias: yup.object().required(""),
  subcategoria: yup.object().required(""),
  mate_Descripcion: yup.string().trim().required(""),
});

function MaterialesIndex() {
  const [ExportData, SetExportData] = useState([]);

  const [Id, setId] = useState(0);
  const load_DDLs = Load_DDLs()
  const materialesService = MaterialesService();

  const fileInputRef = useRef(null);
  // variable para la barra de busqueda
  const [searchText, setSearchText] = useState('');

  // Variables para los collapse
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);


  // variable para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  // Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  // Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  // Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  //DDL de categorias
  const [categoriaDDL, setCategoriaDDL] = useState([]);


  const [coloresDDL, setColeresDDL] = useState([]);

  const [image, setimage] = useState("https://thumbs.dreamstime.com/b/carrete-del-hilo-36758026.jpg");
  //DDL de subcategorias
  const [subcategoriaDDL, setsubcategoriaDDL] = useState([]);

  const [DatosDetalles, setDatosDetalles] = useState({});

  //Controlador del collapse detalles
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  // variables para el spinner
  const [cargandoData, setCargandoData] = useState([]);
  // Peticion para cargar datos de la tabla
  const materialesGetData = async () => {
    try {
      setCargandoData([]);
      setData([]);

      const data = await materialesService.listar();

      setData(data);
      data.length > 0 ? setCargandoData(data) : setCargandoData(null);
      SetExportData(await materialesService.ExportData());
    } catch (error) {
      setCargandoData(null)
    }
  };

  useEffect(() => {
    ddls();
    materialesGetData();
  }, []);


  //Peticion para crear un registrar 
  const materialesCreate = async () => {
    try {
      const response = await materialesService.crear(datosWatch, image);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        materialesGetData();
        VisibilidadTabla();
        reset(defaultMaterialesValues);
        setimage("")
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarningYaExiste("El registro ya existe");
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };


  const materialesEdit = async () => {
    try {
      const response = await materialesService.editar(datosWatch, Id, image);
      if (response.data.data.messageStatus === '1') {
        ToastSuccess('El registro se ha editado exitosamente');
        materialesGetData();
        CerrarEditar();
        reset(defaultMaterialesValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarning('El registro ya existe');
      }
    } catch (error) {
      ToastError('Error inesperado');
    }
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMaterialesValues);
    setimage('https://thumbs.dreamstime.com/b/carrete-del-hilo-36758026.jpg');
  };

  // Controlador del dialog(modal) eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    setimage(datos.mate_Imagen);
    setTimeout(() => {
      setmostrarIndex(!mostrarIndex);
      setmostrarDetalles(!mostrarDetalles);
    }, "500");
    handleClose(datos.mate_Id);
  };

  const handleCerrarDetalle = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };


  // controlador de las fillas a mostrar
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  // abre el menu al cual se le dio click
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  // Cierra el menu abierto
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setimage(reader.result);
      };
    } else {
      ToastWarning("Archivo incorrecto");
    }
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key, // sorting para Numeros
    },
    {
      title: 'Nombre del Material',
      dataIndex: 'mate_Descripcion',
      key: 'mate_Descripcion',
      sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion), // sorting para Letras
    },
    {
      title: 'Nombre de la Subcategoria',
      dataIndex: 'subc_Descripcion',
      key: 'subc_Descripcion',
      sorter: (a, b) => a.subc_Descripcion.localeCompare(b.subc_Descripcion), // sorting para Letras
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) => (
        <div key={params.mate_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.mate_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.mate_Id)}
              variant="contained"
              style={{
                borderRadius: '10px',
                backgroundColor: '#634A9E',
                color: 'white',
              }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.mate_Id}`}
              anchorEl={anchorEl[params.mate_Id]}
              keepMounted
              open={Boolean(anchorEl[params.mate_Id])}
              onClose={() => handleClose(params.mate_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              {/* <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem> */}
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
      label: 'Nombre del Material'
    },
    {
      label: 'Nombre de la Subcategoria'
    }
  ]

  const csvOptions = {
    filename: 'Materiales',
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



  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultMaterialesValues);
  };
  const CerrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultMaterialesValues);

  };


  //Cargado de las variables DDL
  async function ddls() {
    setCategoriaDDL(await load_DDLs.Categorias());
    setColeresDDL(await load_DDLs.Colores());
  }


  //Cargado de ddl de subcategoria
  async function ddlSubcategoria(id) {
    try {
      const subcategorias = await load_DDLs.SubCategoriasPorCategoria(id);
      setsubcategoriaDDL(subcategorias);
    } catch (error) {
    }
  }

  const handleEdit = async (datos) => {
    setimage(datos.mate_Imagen)


    handleClose(datos.mate_Id);
    MostrarCollapseEditar();
    setEditar(true);

    // Insertar aquí las variables necesarias en su formulario
    setValue('id', datos.mate_Id);
    setValue('mate_Descripcion', datos['mate_Descripcion']);

    setValue('colores', { value: datos["colr_Id"], label: datos["colr_Nombre"] })

    ddlSubcategoria(datos["cate_Id"])
    setValue('categorias', { value: datos["cate_Id"], label: datos["cate_Descripcion"] })
    ddlSubcategoria(datos["subc_Id"])
    setValue('subcategoria', { value: datos["subc_Id"], label: datos["subc_Descripcion"] })

    setId(datos.mate_Id);
    setTimeout(() => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
    }, "250");
    handleClose(datos.mate_Id);

  };

  // // Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ['key', 'mate_Descripcion', 'subc_Descripcion'];

  // Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) => {
    if (searchText === '') {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  }).reverse()


  // Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultMaterialesValues, // Campos del formulario
    mode: 'all',
    resolver: yupResolver(schema), // Esquema del formulario
  });


  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();
  // Controlador del formulario



  const GuardarMateriales = () => {

    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        materialesCreate();
      } else {
        materialesEdit();
      }
    } else {
      ToastWarning('Completa todos los campos');
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
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/cL2c1Zs/MATERIALES.png"
        alt="Encabezado de la carta"
      />
      {/* Inicio del Collapse incial (Tabla/Index) */}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* Botón de Nuevo */}   <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} display={"flex"} sx={{justifyContent:{xs:'center',sm:'center', md:'start'}}} >
            
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E',
                color: 'white',
                '&:hover': { backgroundColor: '#6e52ae' },
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
                <PDFGenerator data={ExportData} handleCloseExportar={handleCloseExportar} />

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
                onChange={handleChangeFilas}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            </Grid>
                <Grid item xs={12} sm={6} md={3} display={"flex"} sx={{justifyContent:{xs:'center',sm:'start', md:'center'}}} >
             
            <TextField
              style={{ borderRadius: '10px' }}
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
            />      </Grid>
            </Grid>
  
        </CardContent>

        {/* Declaracion de la tabla */}
        <div className="center" style={{ width: '95%', margin: 'auto' }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            scroll={{ x: true }}
            size="small"
            locale={{
              triggerDesc: 'Ordenar descendente',
              triggerAsc: 'Ordenar ascendente',
              cancelSort: 'Cancelar',
              emptyText: LoadingIcon(cargandoData),
            }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: 'custom-pagination',
            }}
          />
        </div>
      </Collapse>
      {/* Fin del Collapse incial (Tabla/Index) */}
      {/* Inicio del Formulario */}
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
                  <Chip label={"Agregar Material"} />
                </Divider>
              </Grid>

              <Grid item xs={12} md={4}>
                <div
                  className="little-profilePhynomo text-center"
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
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
                        error={!!errors.image}
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
                      borderRadius: "5px",
                      marginRight: "5px",
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

              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <div className="mb-16">
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.categorias}>Categorías:</FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="categorias"
                              disableClearable={true}
                              isOptionEqualToValue={(option, value) =>
                                option.value === value?.value
                              }
                              options={categoriaDDL}
                              value={datosWatch["categorias"] ?? null}
                              onChange={async (event, value) => {
                                setValue("categorias", value);
                                setValue("subcategoria", null);
                                ddlSubcategoria(value?.value);
                                if (!value) {
                                  setValue("subc_Id", []);
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.categorias}
                                  InputLabelProps={{ shrink: true }}
                                />
                              )}
                            />
                          )}
                          name="categorias"
                          control={control}
                        />
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <div className="mb-16">
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.subcategoria}>
                          Subcategorías:
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="subcategoria"
                              isOptionEqualToValue={(option, value) =>
                                option.value === value?.value
                              }
                              options={subcategoriaDDL}
                              value={datosWatch.subcategoria ?? null}
                              onChange={(event, value) => {
                                setValue("subcategoria", value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.subcategoria}
                                  InputLabelProps={{ shrink: true }}
                                />
                              )}
                            />
                          )}
                          name="subcategorias"
                          control={control}
                        />
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <div className="mb-16">
                      <FormControl fullWidth>
                        <FormLabel
                          error={!!errors.mate_Descripcion}
                          id="group-label"
                        >
                          Descripción Material:
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="outlined"
                              inputProps={{
                                maxLength: 150,
                              }}
                              error={!!errors.mate_Descripcion}
                            ></TextField>
                          )}
                          name="mate_Descripcion"
                          control={control}
                        />
                      </FormControl>
                    </div>
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
                  onClick={GuardarMateriales}
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


      {/* Collapse para el formulario de editar un registro inicio*/}
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
                <Chip label={"Editar Materiales"} />
              </Divider>
            </Grid>

            <Grid
              item
              xs={8} // Cambia esto para que ocupe todo el ancho en pantallas pequeñas
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
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={6} style={{ marginRight: "5px" }}>
                    <div className=" mb-16">
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.categorias}>Categoría</FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              disablePortal
                              isOptionEqualToValue={(option, value) =>
                                option.value === value.value
                              }
                              disableClearable={true}
                              options={categoriaDDL}
                              value={datosWatch["categorias"] ?? null}
                              onChange={async (event, value) => {
                                setValue("categorias", value);
                                setValue("subcategoria", null);
                                ddlSubcategoria(value?.value);
                                if (!value) {
                                  setValue("subc_Id", []);
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.categorias}
                                  InputLabelProps={{ shrink: true }}
                                />
                              )}
                            />
                          )}
                          name="categorias"
                          control={control}
                        />
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className=" mb-16">
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.subcategoria}>
                          Subcategoría
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              id="subcategoria"
                              isOptionEqualToValue={(option, value) =>
                                option.value === value?.value
                              }
                              options={subcategoriaDDL}
                              value={datosWatch.subcategoria ?? null}
                              onChange={(event, value) => {
                                setValue("subcategoria", value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.subcategoria}
                                  InputLabelProps={{ shrink: true }}
                                />
                              )}
                            />
                          )}
                          name="subcategorias"
                          control={control}
                        />
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Left column for TextFields */}
                  <Grid item xs={12} style={{ marginRight: "5px" }}>
                    <div className=" mb-16">
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.mate_Descripcion}>
                          Descripción Material
                        </FormLabel>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              error={!!errors.mate_Descripcion}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                          name="mate_Descripcion"
                          control={control}
                        />
                      </FormControl>
                    </div>
                  </Grid>
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
                onClick={GuardarMateriales}
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
                onClick={CerrarEditar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      {/* Collapse para el formulario de editar un registro fin*/}


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
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip label="Detalles del Material" />
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
                  borderRadius: '50%'
                }}
                src={image}
              /> </Box>
            </Grid>

            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del Material:
                  </Typography>
                  <Typography>{DatosDetalles['mate_Id']}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre del Material:
                  </Typography>
                  <Typography>{DatosDetalles['mate_Descripcion']}</Typography>
                </InputLabel>   
              </Box>
            </Grid>
            <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
              <Box sx={{ textAlign: "center" }}>
              <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Subcategoria:
                  </Typography>
                  <Typography>{DatosDetalles["subc_Descripcion"]}</Typography>
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
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles['mate_FechaCreacion']
                        ? new Date(DatosDetalles['mate_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioModificaNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles['mate_FechaModificacion']
                        ? new Date(DatosDetalles['mate_FechaModificacion']).toLocaleString()
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
                  onClick={handleCerrarDetalle}
                  startIcon={<Icon>arrow_back</Icon>}
                >Regresar</Button>
                <br></br>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

    </Card>
  )
}
export default MaterialesIndex;