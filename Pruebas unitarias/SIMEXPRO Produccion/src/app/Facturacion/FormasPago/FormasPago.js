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

import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { useEffect, useState } from "react";

//Imports de validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
//Imports tabla
import { Table } from "antd";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import FormasPagoservices from "./FormasPagoService";
//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
    ToastError,
    ToastSuccessEditar,
    ToastSuccessGuardado,
    ToastWarning,
    ToastWarningYaExiste
} from "src/styles/toastsFunctions";


/* Campos del formulario*/
const DefaultFormasPagoValues = {
    id: "", //id necesario para el editar
    fopa_Descripcion: "",
};

const accountSchema = yup.object().shape({
    id: yup.string(),
    fopa_Descripcion: yup.string().trim().required(""),
});

function FormasPagoIndex() {

    const FormasPagoService = FormasPagoservices();
    const [ExportData, SetExportData] = useState([]);

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
        reset(DefaultFormasPagoValues);
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
        setValue("id", datos["fopa_Id"]);
        setValue("fopa_Descripcion", datos["fopa_Descripcion"]);
        handleClose(datos.fopa_Id);
    };


    const handleDetails = (datos) => {
        setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
        CollapseDetalles();
        handleClose(datos.fopa_Id);
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, //sorting para Numeros
        },
        {
            title: "Nombre de la forma de pago",
            dataIndex: "fopa_Descripcion",
            key: "fopa_Descripcion",
            sorter: (a, b) => a.fopa_Descripcion.localeCompare(b.fopa_Descripcion), //sorting para Letras
        },
        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.fopa_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.fopa_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.fopa_Id)}
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
                            id={`menu-${params.fopa_Id}`}
                            anchorEl={anchorEl[params.fopa_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.fopa_Id])}
                            onClose={() => handleClose(params.fopa_Id)}
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
            label: 'Nombre de la forma de pago'
        }
    ]
    const csvOptions = {
        filename: 'Formas_Pago',
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

    const camposToFilter = ["key", "fopa_Descripcion"];

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
    }).reverse();

    const { handleSubmit, register, reset, control, watch, formState, setValue } =
        useForm({
            DefaultFormasPagoValues, //Campos del formulario
            mode: "all",
            resolver: yupResolver(accountSchema), //Esquema del formulario
        });

    const { isValid, dirtyFields, errors } = formState;
    const datosWatch = watch();

    // variables para el spinner
    const [cargandoData, setCargandoData] = useState([]);
    const FormasPagoGetData = async () => {
        try {
            setCargandoData([]);
            setData([]);

            const data = await FormasPagoService.listar();
            setData(data);
            data.length > 0 ? setCargandoData(data) : setCargandoData(null);
            SetExportData(await FormasPagoService.ExportData());
        } catch (error) {
            setCargandoData(null)
        }
    };

    const FormasPagoCreate = async () => {
        try {
            const response = await FormasPagoService.crear(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessGuardado();
                FormasPagoGetData();
                setSearchText("");
                VisibilidadTabla();
                reset(DefaultFormasPagoValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };

    const FormasPagoEdit = async () => {
        try {
            const response = await FormasPagoService.editar(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessEditar();
                FormasPagoGetData();
                setSearchText("");
                VisibilidadTabla();
                reset(DefaultFormasPagoValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };

    useEffect(() => {
        FormasPagoGetData();
    }, []);

    const GuardarFormasPago = () => {
        if (isValid) {
            // Validacion de campos completos
            if (!editar) {
                // Validacion de la funcion a realizar
                FormasPagoCreate();
            } else {
                FormasPagoEdit();
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
                image="https://i.ibb.co/gRdCM3X/FORMAS-DE-PAGO.png"
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
                                        label={editar ? "Editar Forma de Pago" : "Agregar Forma de Pago"}
                                    />
                                </Divider>
                            </Grid>
                            <Grid item xs={2}></Grid>

                            <Grid item xs={8}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.fopa_Descripcion}>Nombre de la Forma de Pago:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    maxLength: 150,
                                                }}
                                                error={!!errors.fopa_Descripcion}
                                            ></TextField>
                                        )}
                                        name="fopa_Descripcion"
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
                                    onClick={GuardarFormasPago}
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
                            <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                                <Chip label="Detalles de la Forma de Pago" />
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
                                <InputLabel htmlFor="fopa_Id">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Id de la Forma de Pago:
                                    </Typography>
                                    <Typography>{DatosDetalles["fopa_Id"]}</Typography>
                                </InputLabel>
                            </Box>
                            <Box sx={{ flex: 1, textAlign: "center" }}>
                                <InputLabel htmlFor="fopa_Descripcion">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Nombre de la Forma de Pago:
                                    </Typography>
                                    <Typography>{DatosDetalles["fopa_Descripcion"]}</Typography>
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
                                            {DatosDetalles["usua_NombreCreacion"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["fopa_FechaCreacion"]
                                                ? new Date(
                                                    DatosDetalles["fopa_FechaCreacion"]
                                                ).toLocaleString()
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr style={estilosTablaDetalles.tableRowStyle}>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            <strong>Modificación</strong>
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["usua_NombreModificacion"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["fopa_FechaModificacion"]
                                                ? new Date(
                                                    DatosDetalles["fopa_FechaModificacion"]
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
                                    onClick={CollapseDetalles}
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

export default FormasPagoIndex;