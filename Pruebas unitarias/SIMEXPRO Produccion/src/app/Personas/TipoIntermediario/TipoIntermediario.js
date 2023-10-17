/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";

import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Chip,
    Collapse,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Icon, IconButton,
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// import del yup para validaciones
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Imports tabla
import { Table } from "antd";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
//import tabla detalles
import "react-toastify/dist/ReactToastify.css";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
    ToastError,
    ToastSuccessEditar,
    ToastSuccessGuardado,
    ToastWarningPersonalizado,
    ToastWarningYaExiste
} from "src/styles/toastsFunctions";

// import del servicio
import TiposIntermediarioService from "./TipoIntermediarioService";

const validarCodigo = (value) => {
    if (/^[A-Za-z]{2}$/.test(value)) {
        return true;
    }
    return false;
};

/* Campos del formulario*/
const defaultIntermediarioValues = {
    tite_Codigo: "",
    tite_Descripcion: "",
};

/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
    tite_Codigo: yup.string().trim().required("").test(
        "formato",
        "Codigo Incompleto",
        validarCodigo
    ),
    tite_Descripcion: yup.string().trim().required(""),
});

function TipoIntermediario() {


    const tiposIntermediarioService = TiposIntermediarioService();
    const [ExportData, SetExportData] = useState([]);

    //variable para la barra de busqueda
    const [searchText, setSearchText] = useState("");

    //Variables para los collapse
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [mostrarDetalles, setmostrarDetalles] = useState(false);

    //Variable donde se guardan los datos del detalle seleccionado
    const [DatosDetalles, setDatosDetalles] = useState({});

    //Varible que guarda el Id del tipo de intermediario en el editar
    const [idEditar, setidEditar] = useState(0);

    //Variable que indica si el usuario a seleccionar crear o editar
    const [editar, setEditar] = useState(false);

    //Variable que guarda la cantidad de filas a mostrar
    const [filas, setFilas] = React.useState(10);

    //Variable que hace algo con el menu XD
    const [anchorEl, setAnchorEl] = useState({});

    /* Datos de la tabla */
    const [data, setData] = useState([]);

    /* Controlador del Index(Tabla) */
    const VisibilidadTabla = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarAdd(!mostrarAdd);
        reset(defaultIntermediarioValues);
    };

    //Controlador del collapse detalles
    const CollapseDetalles = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarDetalles(!mostrarDetalles);
    };

    //controlador de las fillas a mostrar
    const handleChangeFilas = (event) => {
        setFilas(event.target.value);
    };

    //abre el menu al cual se le dio click
    const handleClick = (event, id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: event.currentTarget,
        }));
    };

    //Cierra el menu abierto
    const handleClose = (id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: null,
        }));
    };

    //Handle para mostrar los detalles del registro
    const handleDetails = (datos) => {
        setDatosDetalles(datos) //se guardan los datos en la variable escrita antes
        setmostrarIndex(!mostrarIndex);
        setmostrarDetalles(!mostrarDetalles);
        handleClose(datos.tite_Id);
    };

    //Handle que inicia la funcion de editar
    const handleEdit = (datos) => {
        VisibilidadTabla();
        setEditar(true);
        //insertar aca las variables necesarias en su formulario
        setidEditar(datos['tite_Id'])
        setValue("tite_Codigo", datos["tite_Codigo"]);
        setValue("tite_Descripcion", datos["tite_Descripcion"]);
        handleClose(datos.tite_Id);
    };

    //Constante para cerrar el collapse de detalles
    const CerrarCollapseDetalles = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarDetalles(!mostrarDetalles);

    }

    //Declaracion del formulario
    const { handleSubmit, register, reset, control, watch, formState, setValue } =
        useForm({
            defaultIntermediarioValues, //Campos del formulario
            mode: "all",
            resolver: yupResolver(accountSchema), //Esquema del formulario
        });


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
            title: "Código de intermediario",
            dataIndex: "tite_Codigo",
            key: "tite_Codigo",
            sorter: (a, b) => a.tite_Codigo.localeCompare(b.tite_Codigo), //sorting para Letras
        },
        {
            title: "Tipo de intermediario",
            dataIndex: "tite_Descripcion",
            key: "tite_Descripcion",
            sorter: (a, b) => a.tite_Descripcion.localeCompare(b.tite_Descripcion), //sorting para Letras
        },
        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.tite_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.tite_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.tite_Id)}
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
                            id={`menu-${params.tite_Id}`}
                            anchorEl={anchorEl[params.tite_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.tite_Id])}
                            onClose={() => handleClose(params.tite_Id)}
                        >
                            <MenuItem onClick={() => handleEdit(params)}>
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
            label: 'Código de intermediario'
        },
        {
            label: 'Tipo de intermediario'
        }
    ]
    const csvOptions = {
        filename: 'Tipos_Intermediario',
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

    //Controlador de la barra buscadora de la tabla
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
    const camposToFilter = ["key", "tite_Codigo", "tite_Descripcion"];

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
    });

    //Validacion de campos vacios y errores
    const { isValid, dirtyFields, errors } = formState;

    //Datos del formulario
    const datosWatch = watch();

    const [cargandoData, setCargandoData] = useState([]);
    //Peticion para cargar datos de la tabla
    const TipoIntermediarioGetData = async () => {
        try {
            setCargandoData([]);
            setData([]);
            const data = await tiposIntermediarioService.listar();
            setData(data);
            data.length > 0 ? setCargandoData(data) : setCargandoData(null);
            SetExportData(await tiposIntermediarioService.ExportData());
        } catch (error) {
            setCargandoData(null);
        }
    };

    //useEffect para cargar datos al ingresar a la pantalla
    useEffect(() => {
        TipoIntermediarioGetData();
    }, []);

    //Peticion para crear un registro
    const intermediarioCreate = async () => {
        try {
            const response = await tiposIntermediarioService.crear(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessGuardado();
                TipoIntermediarioGetData();
                VisibilidadTabla();
                reset(defaultIntermediarioValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };


    // Peticion para editar un registro
    const intermediarioEdit = async () => {
        try {
            const response = await tiposIntermediarioService.editar(datosWatch, idEditar);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessEditar();
                TipoIntermediarioGetData();
                if (searchText != "") { setSearchText(datosWatch.tite_Descripcion || datosWatch.tite_Codigo) }
                else { setSearchText("") }
                VisibilidadTabla();
                reset(defaultIntermediarioValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };

    //Controlador del formulario
    const GuardarIntermediario = () => {
        if (isValid) {
            // Validacion de campos completos
            if (!editar) {
                // Validacion de la funcion a realizar
                intermediarioCreate();
            } else {
                intermediarioEdit();
            }
        } else {
            ToastWarningPersonalizado("Completa todos los campos");
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
                image="https://i.ibb.co/0McQFgV/TIPO-DE-INTERMEDIARIO.png"
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
                                    <Chip
                                        label={editar ? "Editar Tipo de Intermediario" : "Agregar Tipo de Intermediario"}
                                    />
                                </Divider>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.tite_Codigo}>Código Tipo Intermediario:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    onKeyPress: (event) => {
                                                        if (!/[A-Za-z]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    },
                                                    maxLength: 2,

                                                }}
                                                error={!!errors.tite_Codigo}
                                            ></TextField>
                                        )}
                                        name="tite_Codigo"
                                        control={control}
                                    ></Controller>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.tite_Descripcion}>Tipo de Intermediario:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    maxLength: 100,
                                                }}
                                                error={!!errors.tite_Descripcion}
                                            />
                                        )}
                                        name="tite_Descripcion"
                                        control={control}
                                    ></Controller>
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
                                    onClick={GuardarIntermediario}
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
            {/* Fin del Formulario */}

            {/* Inicia del collapse Detalles */}
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
                                <Chip label="Detalles del Tipo de Intermediario" />
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
                                        Id del Tipo Intermediario:
                                    </Typography>
                                    <Typography>{DatosDetalles["tite_Id"]}</Typography>
                                </InputLabel>
                            </Box>
                            <Box sx={{ flex: 1, textAlign: "center" }}>
                                <InputLabel htmlFor="descripcion">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Código del Tipo Intermediario:
                                    </Typography>
                                    <Typography>{DatosDetalles["tite_Codigo"]}</Typography>
                                </InputLabel>
                            </Box>

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
                                <InputLabel htmlFor="descripcion">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Nombre del Tipo Intermediario:
                                    </Typography>
                                    <Typography>{DatosDetalles["tite_Descripcion"]}</Typography>
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
                                            {DatosDetalles["usarioCreacion"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["tite_FechaCreacion"]
                                                ? new Date(
                                                    DatosDetalles["tite_FechaCreacion"]
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
                                            {DatosDetalles["tite_FechaModificacion"]
                                                ? new Date(
                                                    DatosDetalles["tite_FechaModificacion"]
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
                                    style={{ position: 'fixed', top: '76%', right: '5%' }}
                                    onClick={CerrarCollapseDetalles}
                                    startIcon={<Icon>arrow_back</Icon>}
                                >Regresar</Button>
                                <br></br>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
            {/* Fin del Collapse Detalles */}



        </Card>
    );
}

export default TipoIntermediario;