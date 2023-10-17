import { yupResolver } from '@hookform/resolvers/yup';
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
    Typography,
} from '@mui/material';
import { MoreVert } from "@material-ui/icons";
import { Table } from 'antd';
import { ExportToCsv } from 'export-to-csv';
import { FileTextFilled } from "@ant-design/icons";

import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import 'src/styles/custom-pagination.css';
import LoadingIcon from 'src/styles/iconoCargaTabla';
import estilosTablaDetalles from 'src/styles/tablaDetalles';
import {
    ToastError,
    ToastErrorRegistroEnUso,
    ToastSuccessEditar,
    ToastSuccessEliminar,
    ToastSuccessGuardado,
    ToastWarning,
    ToastWarningYaExiste
} from "src/styles/toastsFunctions";
import * as yup from 'yup';
import CondicionesComercialesService from './CondicionesComercialesService';

/* Campos del formulario */
const defaultValues = {
    id: '', // id necesario para el editar
    coco_Id: 0,
    coco_Codigo: '',
    coco_Descripcion: '',
    usua_UsuarioCreacion: '',
    coco_FechaCreacion: '',
    usua_UsuarioModificacion: '',
    coco_FechaModificacion: '',
    usua_UsuarioEliminacion: '',
    coco_FechaEliminacion: '',
};

/* Esquema del fomulario (validaciones) */
// En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
    id: yup.string(),
    coco_Codigo: yup
        .string()
        .trim()
        .required()
        .matches(/^[A-Z a-z]{2}$/, "Este campo solo acepta letras"),
    coco_Descripcion: yup.string().trim().required(''),
});

function CondicionesComercialesIndex() {
    const condicionesComercialesService = CondicionesComercialesService();
    //   const load_DDLs = Load_DDLs();

    // variable para la barra de busqueda
    const [searchText, setSearchText] = useState('');

    // Variables para los collapse
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [mostrarDetalles, setmostrarDetalles] = useState(false);

    // Variable donde se guardan los datos del detalle seleccionado
    const [DatosDetalles, setDatosDetalles] = useState({});

    // variable para el dialog(modal) de eliminar
    const [Eliminar, setEliminar] = useState(false);

    //Variables para exportar archivos
    const [ExportData, SetExportData] = useState([]);

    // Variable que indica si el usuario a seleccionar crear o editar
    const [editar, setEditar] = useState(false);

    // Variable que guarda la cantidad de filas a mostrar
    const [filas, setFilas] = React.useState(10);

    // Variable que hace algo con el menu XD
    const [anchorEl, setAnchorEl] = useState({});

    /* Datos de la tabla */
    const [data, setData] = useState([]);

    /* Controlador del Index(Tabla) */
    const VisibilidadTabla = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarAdd(!mostrarAdd);
        reset(defaultValues);
    };

    // Controlador del dialog(modal) eliminar
    const DialogEliminar = () => {
        setEliminar(!Eliminar);
    };

    // Controlador del collapse detalles
    const CollapseDetalles = () => {
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


    const csvHeader = [
        {
            label: 'No.',
        },
        {
            label: 'Abreviatura de la condición comercial'
        },
        {
            label: 'Nombre de la condición comercial'
        },
    ];

    const csvOptions = {
        filename: 'Condiciones_Comerciales',
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

    // Cierra el menu abierto
    const handleClose = (id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: null,
        }));
    };

    // Handle que inicia la funcion de editar
    const handleEdit = (datos) => {
        VisibilidadTabla();
        setEditar(true);
        setValue('coco_Id', datos.coco_Id);
        setValue('coco_Codigo', datos.coco_Codigo);
        setValue('coco_Descripcion', datos.coco_Descripcion);
        handleClose(datos.coco_Id);
    };

    // Handle para mostrar los detalles del registro
    const handleDetails = (datos) => {
        setDatosDetalles(datos); // se guardan los datos en la variable escrita antes
        CollapseDetalles();
        handleClose(datos.coco_Id);
    };

    // Handle delete en este caso no necesario (si quere mas info ir a la pantalla "TiposIdentidad")
    const handleDelete = (datos) => {
        setValue("coco_Id", datos["coco_Id"]);
        DialogEliminar();
        handleClose(datos.coco_Id);
    };

    {
        /* Columnas de la tabla */
    }
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key - b.key, // sorting para Numeros
        },
        {
            title: 'Abreviatura de la condición comercial',
            dataIndex: 'coco_Codigo',
            key: 'coco_Codigo',
            sorter: (a, b) => a.coco_Codigo.localeCompare(b.coco_Codigo), // sorting para Letras
        },
        {
            title: 'Nombre de la condición comercial',
            dataIndex: 'coco_Descripcion',
            key: 'coco_Descripcion',
            sorter: (a, b) => a.coco_Descripcion.localeCompare(b.coco_Descripcion), // sorting para Letras
        },
        {
            title: 'Acciones',
            key: 'operation',
            render: (params) => (
                <div key={params.coco_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.coco_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.coco_Id)}
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
                            id={`menu-${params.coco_Id}`}
                            anchorEl={anchorEl[params.coco_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.coco_Id])}
                            onClose={() => handleClose(params.coco_Id)}
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

    // Controlador de la barra buscadora de la tabla
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    // Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
    const camposToFilter = ['key', 'coco_Codigo', 'coco_Descripcion'];

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
        defaultValues, // Campos del formulario
        mode: 'all',
        resolver: yupResolver(accountSchema), // Esquema del formulario
    });

    // Validacion de campos vacios y errores
    const { isValid, dirtyFields, errors } = formState;

    // Datos del formulario
    const datosWatch = watch();

    // variables para el spinner
    const [cargandoData, setCargandoData] = useState([]);
    // Peticion para cargar datos de la tabla
    const condicionesGetData = async () => {
        try {
            setCargandoData([]);
            setData([]);

            const data = await condicionesComercialesService.listar();

            setData(data);
            data.length > 0 ? setCargandoData(data) : setCargandoData(null);
            SetExportData(await condicionesComercialesService.ExportData());
        } catch (error) {
            setCargandoData(null)
        }
    };

    // Peticion para crear un registro
    const condicionesCreate = async () => {
        try {
            const response = await condicionesComercialesService.crear(datosWatch);
            if (response.data.data.messageStatus == '1') {
                ToastSuccessGuardado('El registro se ha insertado exitosamente');
                condicionesGetData();
                VisibilidadTabla();
                reset(defaultValues);
            } else if (response.data.data.messageStatus.includes('UNIQUE')) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError('Error inesperado');
        }
    };

    // Peticion para editar un registro
    const condicionesEdit = async () => {
        try {
            const response = await condicionesComercialesService.editar(datosWatch);
            if (response.data.data.messageStatus === '1') {
                ToastSuccessEditar();
                condicionesGetData();
                VisibilidadTabla();
                reset(defaultValues);
            } else if (response.data.data.messageStatus.includes('UNIQUE')) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };

    const condicionesDelete = async () => {
        try {
            const response = await condicionesComercialesService.eliminar(datosWatch);
            if (response.data.data.messageStatus == "1") {
                DialogEliminar();
                ToastSuccessEliminar();
                condicionesGetData();
                reset(defaultValues);
            } else if (response.data.data.messageStatus.includes("0")) {
                DialogEliminar();
                ToastErrorRegistroEnUso();
            }
        } catch (error) {
            DialogEliminar();
            ToastError();
        }
    }

    // useEffect para cargar datos al ingresar a la pantalla
    useEffect(() => {
        condicionesGetData();
    }, []);

    // Controlador del formulario
    const GuardarCondicion = () => {
        if (isValid) {
            // Validacion de campos completos
            if (!editar) {
                // Validacion de la funcion a realizar
                condicionesCreate();
            } else {
                condicionesEdit();
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
                image="https://i.ibb.co/wMjsZp5/CONDICIONES-COMERCIALES.png"
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
                            />
                        </Grid>
                    </Grid>
                </CardContent>

                {/* Declaracion de la tabla */}
                <div className="center" style={{ width: '95%', margin: 'auto' }}>
                    <Table
                        columns={columns}
                        scroll={{ x: true }}
                        dataSource={filteredRows}
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
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                                    <Chip label={editar ? 'Editar Condicion' : 'Agregar Condicion'} />
                                </Divider>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.coco_Codigo}>Código de la Condición:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                disabled={editar}
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    style: { textTransform: "uppercase" },
                                                    maxLength: 2,
                                                }}
                                                error={!!errors.coco_Codigo}
                                                helperText={
                                                    errors?.coco_Codigo?.message.includes(
                                                        " "
                                                    )
                                                        ? "Este campo solo acepta letras"
                                                        : errors?.coco_Codigo?.message
                                                }
                                            />
                                        )}
                                        name="coco_Codigo"
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.coco_Descripcion}>Descripcion de la Condición:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    maxLength: 150,
                                                }}
                                                error={!!errors.coco_Descripcion}
                                            />
                                        )}
                                        name="coco_Descripcion"
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                    alignItems: 'right',
                                }}
                            >
                                <Button
                                    type="submit"
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: '10px', marginRight: '10px' }}
                                    sx={{
                                        backgroundColor: '#634A9E',
                                        color: 'white',
                                        '&:hover': { backgroundColor: '#6e52ae' },
                                    }}
                                    onClick={GuardarCondicion}
                                >
                                    {editar ? 'Editar' : 'Guardar'}
                                </Button>

                                <Button
                                    startIcon={<Icon>close</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: '10px' }}
                                    sx={{
                                        backgroundColor: '#DAD8D8',
                                        color: 'black',
                                        '&:hover': { backgroundColor: '#BFBABA' },
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
            {/* Fin del Formulario */}

            {/* Inicia del Dialog(Modal) Eliminar */}
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
                            style={{ borderRadius: '10px', marginRight: '10px' }}
                            onClick={condicionesDelete}
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
                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-center',
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                            <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                                <Chip color='default' label="Detalles de la Condición" />
                            </Divider>
                        </Grid>

                       <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                        <Box Box sx={{ textAlign: "center" }}>
                        <InputLabel htmlFor="id">
                           <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                               Id de la Condición Comercial:
                            </Typography>
                            <Typography>{DatosDetalles.coco_Id}</Typography>
                        </InputLabel>
                        </Box>
                       </Grid>   

                       <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                           <Box Box sx={{ textAlign: "center" }}>
                           <InputLabel htmlFor="descripcion">
                              <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                Abreviatura de la Condición Comercial:
                              </Typography>
                              <Typography>{DatosDetalles.coco_Codigo}</Typography>
                            </InputLabel>
                          </Box>
                       </Grid>   

                       <Grid item xs={12} md={12} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                            <Box Box sx={{ textAlign: "center" }}>
                            <InputLabel htmlFor="descripcion">
                            <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                Descripción de Condición Comercial:
                            </Typography>
                            <Typography>{DatosDetalles.coco_Descripcion}</Typography>
                            </InputLabel>
                            </Box>
                        </Grid> 

                        <Grid item xs={6} textAlign="center" />
                        <Grid item xs={12}>
                            <table id="detallesTabla" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                                            <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>
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
                                            {DatosDetalles.usuarioNombreCreacion}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles.coco_FechaCreacion
                                                ? new Date(DatosDetalles.coco_FechaCreacion).toLocaleString()
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr style={estilosTablaDetalles.tableRowStyle}>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            <strong>Modificación</strong>
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles.usuarioNombreModificacion}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles.coco_FechaModificacion
                                                ? new Date(DatosDetalles.coco_FechaModificacion).toLocaleString()
                                                : ''}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <br />
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
export default CondicionesComercialesIndex;