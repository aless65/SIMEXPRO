import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
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
    FormHelperText,
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
import { Table } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import "react-toastify/dist/ReactToastify.css";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
    ToastError,
    ToastSuccessEditar,
    ToastSuccessGuardado,
    ToastWarning,
    ToastWarningYaExiste
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import IncotermServices from "./IncotermService";
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./IncotermExcel";
import PDFGenerator from "./IncotermPDF";



const validarTelefonoContacto = (value) => {
    if (/^[A-Za-z]{3}$/.test(value)) {
        return true;
    }
    return false;
};

const defaultIncotermsValues = {
    id: "", //id necesario para el editar
    inco_Codigo: "",
    inco_Descripcion: "",
};

const accountSchema = yup.object().shape({
    id: yup.string(),
    inco_Codigo: yup.string().trim().required("").test(
        "formato",
        "Codigo Incompleto",
        validarTelefonoContacto
    ),
    inco_Descripcion: yup.string().trim().required(""),
});


function IncotermIndex() {
    const [ExportData, SetExportData] = useState([]);

    const IncotermsService = IncotermServices();

    const [searchText, setSearchText] = useState("");

    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [mostrarDetalles, setmostrarDetalles] = useState(false);

    const [DatosDetalles, setDatosDetalles] = useState({});

    const [editar, setEditar] = useState(false);

    const [filas, setFilas] = React.useState(10);

    const [anchorEl, setAnchorEl] = useState({});

    const [data, setData] = useState([]);

    const VisibilidadTabla = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarAdd(!mostrarAdd);
        reset(defaultIncotermsValues);
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

    const handleEdit = (datos) => {
        VisibilidadTabla();
        setEditar(true);
        //insertar aca las variables necesarias en su formulario
        setValue("id", datos["inco_Id"]);
        setValue("inco_Codigo", datos["inco_Codigo"]);

        setValue("inco_Descripcion", datos["inco_Descripcion"]);

        handleClose(datos.inco_Id);
    };

    const handleDetails = (datos) => {
        setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
        CollapseDetalles();
        handleClose(datos.inco_Id);
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, //sorting para Numeros
        },
        {
            title: "Código del incoterm",
            dataIndex: "inco_Codigo",
            key: "inco_Codigo",
            sorter: (a, b) => a.inco_Codigo.localeCompare(b.inco_Codigo), //sorting para Letras
        },
        {
            title: "Descripción del incoterm",
            dataIndex: "inco_Descripcion",
            key: "inco_Descripcion",
            sorter: (a, b) => a.inco_Descripcion.localeCompare(b.inco_Descripcion), //sorting para Letras
        },
        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.inco_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.inco_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.inco_Id)}
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
                            id={`menu-${params.inco_Id}`}
                            anchorEl={anchorEl[params.inco_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.inco_Id])}
                            onClose={() => handleClose(params.inco_Id)}
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
            label: 'Código del incoterm',
        },
        {
            label: 'Descripción del incoterm'
        }
    ]

    const csvOptions = {
        filename: 'Incoterms',
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

    const camposToFilter = ["key", "inco_Codigo", "inco_Descripcion"];

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

    const { handleSubmit, register, reset, control, watch, formState, setValue } =
        useForm({
            defaultIncotermsValues, //Campos del formulario
            mode: "all",
            resolver: yupResolver(accountSchema), //Esquema del formulario
        });

    const { isValid, dirtyFields, errors } = formState;

    const datosWatch = watch();

    // variables para el spinner
    const [cargandoData, setCargandoData] = useState([]);
    const IncotermGetData = async () => {
        try {
            setCargandoData([]);
            setData([]);

            const data = await IncotermsService.listar();

            setData(data);
            data.length > 0 ? setCargandoData(data) : setCargandoData(null);
            SetExportData(await IncotermsService.ExportData());
        } catch (error) {
            setCargandoData(null)
        }
    };

    const IncotermCreate = async () => {
        try {
            const response = await IncotermsService.crear(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessGuardado();
                IncotermGetData();
                setSearchText("");
                VisibilidadTabla();
                reset(defaultIncotermsValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };

    const IncotermEdit = async () => {
        try {
            const response = await IncotermsService.editar(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessEditar();
                IncotermGetData();
                setSearchText("");
                VisibilidadTabla();
                reset(defaultIncotermsValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };

    useEffect(() => {

        IncotermGetData();
    }, []);

    const GuardarIncoterm = () => {
        if (isValid) {
            // Validacion de campos completos
            if (!editar) {
                // Validacion de la funcion a realizar
                IncotermCreate();
            } else {
                IncotermEdit();
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
        <Card sx={{ minWidth: 275, margin: '40px' }}>

            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/ZGMzQPs/INCOTERMS.png"
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

            {/* Collapse para el formulario de agregar un registro inicio*/}
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
                                        label={editar ? "Editar Incoterm" : "Agregar Incoterm"}
                                    />
                                </Divider>
                            </Grid>
                            <Grid item xs={6}>
                                <div className=" mb-16">
                                    <Controller
                                        render={({ field, fieldState }) => (
                                            <InputMask
                                                mask="***"
                                                value={field.value} // Establecer el valor del campo usando field.value
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                maskChar={null}
                                            >
                                                {() => (
                                                    <FormControl error={!!fieldState.error} fullWidth={true}>
                                                        <FormLabel>
                                                            Código del Incoterm:
                                                        </FormLabel>
                                                        <TextField
                                                            error={!!fieldState.error}
                                                            {...field}
                                                            variant="outlined"
                                                            fullWidth={true}
                                                            inputProps={{
                                                                onInput: (event) => {
                                                                    // event.target.value = event.target.value.toUpperCase();
                                                                },
                                                                startAdornment: (
                                                                    <InputAdornment position="start"></InputAdornment>
                                                                ),
                                                                onKeyPress: (event) => {
                                                                    if (!/[A-Za-z]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                },

                                                            }}
                                                        />
                                                        <FormHelperText>{fieldState.error ? 'Ingrese un Código Valido' : ''} </FormHelperText>
                                                    </FormControl>
                                                )}
                                            </InputMask>
                                        )}
                                        name="inco_Codigo"
                                        control={control}
                                        defaultValue="" // Establecer el valor predeterminado aquí
                                    />

                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.inco_Descripcion} fullWidth>
                                            <FormLabel
                                            >
                                                Descripción del Incoterm:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                error={!!errors.inco_Descripcion}
                                                fullWidth={true}
                                                inputProps={{
                                                    onInput: (event) => {
                                                        // event.target.value = event.target.value.toUpperCase();
                                                    },
                                                    startadornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                    name="inco_Descripcion"
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                                <Button
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={GuardarIncoterm}
                                >
                                    Guardar
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
                                    onClick={VisibilidadTabla}
                                >
                                    Cancelar
                                </Button>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Collapse>
            </form>

            <Collapse in={mostrarDetalles}>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-star",
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                            <Divider style={{ marginTop: "0px" }}>
                                <Chip label="Detalles del Incoterm" />
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
                                <InputLabel htmlFor="inco_Id">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Id del Incoterm:
                                    </Typography>
                                    <Typography>{DatosDetalles['inco_Id']}</Typography>
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
                                <InputLabel htmlFor="inco_Codigo">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Código del Incoterm:
                                    </Typography>
                                    <Typography>{DatosDetalles['inco_Codigo']}</Typography>
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
                                <InputLabel htmlFor="inco_Descripcion">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Descripción del Incoterm:
                                    </Typography>
                                    <Typography>{DatosDetalles['inco_Descripcion']}</Typography>
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
                                            {DatosDetalles["usuarioCreacionNombre"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["inco_FechaCreacion"]
                                                ? new Date(
                                                    DatosDetalles["inco_FechaCreacion"]
                                                ).toLocaleString()
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr style={estilosTablaDetalles.tableRowStyle}>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            <strong>Modificación</strong>
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["usuarioModificadorNombre"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["inco_FechaModificacion"]
                                                ? new Date(
                                                    DatosDetalles["inco_FechaModificacion"]
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
        </Card>


    )
}

export default IncotermIndex;