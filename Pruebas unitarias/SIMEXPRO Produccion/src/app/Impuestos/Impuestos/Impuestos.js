/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { FileTextFilled } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
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
} from '@mui/material';
import { Table } from 'antd';
import { ExportToCsv } from 'export-to-csv';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
    ToastError,
    ToastSuccessEditar,
    ToastSuccessGuardado,
    ToastWarning,
    ToastWarningYaExiste
} from "src/styles/toastsFunctions";
import * as yup from 'yup';
import ExportToExcel from "./ExcelFile";
import ImpuestosService from './ImpuestosServices';
import PDFGenerator from "./PDFGenerator";


const defaultImpuestoValues = {
    impu_Id: "",
    impu_Descripcion: "",
    impu_Cantidad: "",
}

const accountSchema = yup.object().shape({
    impu_Id: yup.string(),
    impu_Descripcion: yup.string().trim().required(""),
    impu_Cantidad: yup.number().min(0, "Ingresa una cantidad mayor")
});


function ImpuestosIndex() {
    const impuestosService = ImpuestosService();
    // Constante para la busqueda del datatable
    const [searchText, setSearchText] = useState("");
    const [ExportData, SetExportData] = useState([]);

    // Constante para mostrar el index de la pantalla
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);

    const [mostrarDetalles, setmostrarDetalles] = useState(false);
    const [DatosDetalles, setDatosDetalles] = useState({});
    //Variable que indica si el usuario a seleccionar crear o editar
    const [editar, setEditar] = useState(false);


    // Constante para las filas que tendrá cada paginación del datatable
    const [filas, setFilas] = React.useState(10);
    const [anchorEl, setAnchorEl] = useState({});

    // Campos para guardar el registro de una fila

    // Constante para asignar los valores a la tabla y mapear
    const [DataTabla, setDataTabla] = useState([]);


    //const [DataTabladeta, setDataTabladeta] = useState([]);

    const VisibilidadTabla = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarAdd(!mostrarAdd);
        reset(defaultImpuestoValues);
    };
    const CollapseDetalles = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarDetalles(!mostrarDetalles);
    };

    //controlador de las fillas a mostrar
    const handleChangeFilas = (event) => {
        setFilas(event.target.value);
    };
    // Constante cuando se hace click para el boton de opciones
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
        //insertar aca las variables necesarias en su formulario
        setValue("impu_Id", datos["impu_Id"]);
        setValue("impu_Descripcion", datos["impu_Descripcion"]);
        setValue("impu_Cantidad", datos["impu_Cantidad"]);
        handleClose(datos.impu_Id);
    };
    //Constante abrir el collapse de los detalles de la pantalla
    const handleDetails = (datos) => {
        setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
        CollapseDetalles();
        handleClose(datos.impu_Id);
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, // sorting para Numeros
        },
        {
            title: "Descripción del impuesto",
            dataIndex: "impu_Descripcion",
            key: "impu_Descripcion",
            sorter: (a, b) => a.impu_Descripcion.localeCompare(b.impu_Descripcion),
        },
        {
            title: "Porcentaje del impuesto",
            dataIndex: "impu_Cantidad",
            key: "impu_Cantidad",
            sorter: (a, b) => a.impu_Cantidad - b.impu_Cantidad, // sorting para Numeros
        },
        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.impu_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.impu_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.impu_Id)}
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
                            id={`menu-${params.impu_Id}`}
                            anchorEl={anchorEl[params.impu_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.impu_Id])}
                            onClose={() => handleClose(params.impu_Id)}
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
            label: 'Descripción del impuesto'
        },
        {
            label: 'Porcetanje a pagar'
        },
    ]
    const csvOptions = {
        filename: 'Impuestos',
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
            console.log(ExportData)
            csvExporter.generateCsv(ExportData);
        } catch (error) {
            console.log(error)

        }
    };

    // Constante para el textfield de busqueda
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const camposToFilter = ["key", "impu_Descripcion"];

    // Constante que ayuda a filtrar el datatable
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
    });
    //Declaracion del formulario
    const { handleSubmit, register, reset, control, watch, formState, setValue } =
        useForm({
            defaultImpuestoValues, //Campos del formulario
            mode: "all",
            resolver: yupResolver(accountSchema), //Esquema del formulario
        });
    const datosWatch = watch();
    //Validacion de campos vacios y errores
    const { isValid, dirtyFields, errors } = formState;

    // variables para el spinner
    const [cargandoData, setCargandoData] = useState([]);
    const ImpuestosGetData = async () => {
        try {
            setCargandoData([]);
            setDataTabla([]);

            const data = await impuestosService.listar();

            setDataTabla(data);
            data.length > 0 ? setCargandoData(data) : setCargandoData(null);
            SetExportData(await impuestosService.ExportData());
        } catch (error) {
            setCargandoData(null)
        }
    };


    //Crear
    const impuestosCreate = async () => {
        try {
            const response = await impuestosService.crear(datosWatch);
            if (response.data.data.messageStatus == '1') {
                ToastSuccessGuardado();
                ImpuestosGetData();
                VisibilidadTabla();
                reset(defaultImpuestoValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {
            ToastError();
        }
    };
    //editar 
    const impuestoEdit = async () => {
        try {
            const response = await impuestosService.editar(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessEditar();
                ImpuestosGetData();
                VisibilidadTabla();
                reset(defaultImpuestoValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {
            ToastError();
        }
    };

    useEffect(() => {
        ImpuestosGetData();
    }, []);

    const guardarImpuesto = () => {
        if (isValid) {
            // Validacion de campos completos
            if (!editar) {
                // Validacion de la funcion a realizar
                impuestosCreate();
            } else {
                impuestoEdit();
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

            {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta) */}
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/4m2kkkR/IMPUESTOS.png"
                alt="Encabezado de la carta"
            />
            {/* Collapse del index */}
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
                                        <PDFGenerator data={DataTabla} handleCloseExportar={handleCloseExportar} />

                                        {/* Exportar a Excel */}
                                        <ExportToExcel data={DataTabla} handleCloseExportar={handleCloseExportar} />
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
                                    onChange={handleChangeFilas}
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

                {/* Mostrar tabla index inicio */}
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
                                        label={editar ? "Editar Impuesto" : "Agregar Impuesto"}
                                    />
                                </Divider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.impu_Descripcion}>Descripción:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    maxLength: 150,
                                                }}
                                                error={!!errors.impu_Descripcion}
                                            ></TextField>
                                        )}
                                        name="impu_Descripcion"
                                        control={control}
                                    ></Controller>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.impu_Cantidad}>Porcentaje:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    maxLength: 150,
                                                    onKeyPress: (event) => {
                                                        if (!/[0-9 .]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    },
                                                }}
                                                error={!!errors.impu_Cantidad}
                                            ></TextField>
                                        )}
                                        name="impu_Cantidad"
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
                                    onClick={guardarImpuesto}
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
            {/* Mostrar tabla index fin */}

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
                                <Chip label="Detalles de Impuesto" />
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
                                        Id:
                                    </Typography>
                                    <Typography>{DatosDetalles["impu_Id"]}</Typography>
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
                                        Descripcion:
                                    </Typography>
                                    <Typography>{DatosDetalles["impu_Descripcion"]}</Typography>
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
                                        Procentaje a pagar:
                                    </Typography>
                                    <Typography>{DatosDetalles["impu_Cantidad"]}</Typography>
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
                                            {DatosDetalles["usuarioCreacion"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["impu_FechaCreacion"]
                                                ? new Date(
                                                    DatosDetalles["impu_FechaCreacion"]
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
                                            {DatosDetalles["impu_FechaModificacion"]
                                                ? new Date(
                                                    DatosDetalles["impu_FechaModificacion"]
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
            {/* Fin del Collapse Detalles */}

        </Card>
    );
}

export default ImpuestosIndex;