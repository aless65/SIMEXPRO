import {
    Box,
    Button,
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
    TextField,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
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
import ModoTransporteServices from "./ModoTransporteService";
//Import ddls
//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
    ToastError,
    ToastSuccessEditar,
    ToastSuccessGuardado,
    ToastWarning,
    ToastWarningYaExiste
} from "src/styles/toastsFunctions";
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ModoTransporteExcel";
import PDFGenerator from "./ModoTransportePDF";


/* Campos del formulario*/
const defaultFuncionesMaquinaValues = {
    id: "", //id necesario para el editar
    motr_Descripcion: "",
};

/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
    id: yup.string(),
    motr_Descripcion: yup.string().trim().required(""),
});


function ModoTransporteIndex() {
    const [ExportData, SetExportData] = useState([]);

    const ModoTransporteService = ModoTransporteServices();

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
        reset(defaultFuncionesMaquinaValues);
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
        setValue("id", datos["motr_Id"]);
        setValue("motr_Descripcion", datos["motr_Descripcion"]);
        handleClose(datos.motr_Id);
    };

    const handleDetails = (datos) => {
        setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
        CollapseDetalles();
        handleClose(datos.motr_Id);
    };


    const columns = [
        {
            title: "No.",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, //sorting para Numeros
        },
        {
            title: "Descripción del modo de transporte",
            dataIndex: "motr_Descripcion",
            key: "motr_Descripcion",
            sorter: (a, b) => a.motr_Descripcion.localeCompare(b.motr_Descripcion), //sorting para Letras
        },
        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.motr_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.motr_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.motr_Id)}
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
                            id={`menu-${params.motr_Id}`}
                            anchorEl={anchorEl[params.motr_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.motr_Id])}
                            onClose={() => handleClose(params.motr_Id)}
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
            label: 'Descripción del modo de transporte'
        }
    ]

    const csvOptions = {
        filename: 'Modos_Transporte',
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

    const camposToFilter = ["key", "motr_Descripcion"];

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
            defaultFuncionesMaquinaValues, //Campos del formulario
            mode: "all",
            resolver: yupResolver(accountSchema), //Esquema del formulario
        });

    const { isValid, dirtyFields, errors } = formState;

    const datosWatch = watch();

    // variables para el spinner
    const [cargandoData, setCargandoData] = useState([]);
    const ModoTransporteGetData = async () => {
        try {
            setCargandoData([]);
            setData([]);

            const data = await ModoTransporteService.listar();

            setData(data);
            data.length > 0 ? setCargandoData(data) : setCargandoData(null);
            SetExportData(await ModoTransporteService.ExportData());
        } catch (error) {
            setCargandoData(null)
        }
    };

    const ModoTransporteCreate = async () => {
        try {
            const response = await ModoTransporteService.crear(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessGuardado();
                ModoTransporteGetData();
                setSearchText("");
                VisibilidadTabla();
                reset(defaultFuncionesMaquinaValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };

    const ModoTransporteEdit = async () => {
        try {
            const response = await ModoTransporteService.editar(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccessEditar();
                ModoTransporteGetData();
                setSearchText("");
                VisibilidadTabla();
                reset(defaultFuncionesMaquinaValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {

            ToastError();
        }
    };

    //useEffect para cargar datos al ingresar a la pantalla
    useEffect(() => {

        ModoTransporteGetData();
    }, []);


    const GuardarModoTranporte = () => {
        if (isValid) {
            // Validacion de campos completos
            if (!editar) {
                // Validacion de la funcion a realizar
                ModoTransporteCreate();
            } else {
                ModoTransporteEdit();
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
                image="https://i.ibb.co/nBhVfLd/MODO-DE-TRANSPORTE.png"
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
                                        label={editar ? "Editar Modo de Transporte" : "Agregar Modo de Transporte"}
                                    />
                                </Divider>
                            </Grid>
                            <Grid item xs={2}></Grid>

                            <Grid item xs={8}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.motr_Descripcion}>Nombre del Modo de Transporte:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    maxLength: 150,
                                                }}
                                                error={!!errors.motr_Descripcion}
                                            ></TextField>
                                        )}
                                        name="motr_Descripcion"
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
                                    onClick={GuardarModoTranporte}
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
                                <Chip label="Detalles del Modo de Transporte" />
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
                                <InputLabel htmlFor="motr_Id">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Id del Modo de Transporte:
                                    </Typography>
                                    <Typography>{DatosDetalles["motr_Id"]}</Typography>
                                </InputLabel>
                            </Box>
                            <Box sx={{ flex: 1, textAlign: "center" }}>
                                <InputLabel htmlFor="motr_Descripcion">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Nombre del Modo de Transporte:
                                    </Typography>
                                    <Typography>{DatosDetalles["motr_Descripcion"]}</Typography>
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
                                            {DatosDetalles["motr_FechaCreacion"]
                                                ? new Date(
                                                    DatosDetalles["motr_FechaCreacion"]
                                                ).toLocaleString()
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr style={estilosTablaDetalles.tableRowStyle}>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            <strong>Modificación</strong>
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["usuarioModificacionNombre"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["motr_FechaModificacion"]
                                                ? new Date(
                                                    DatosDetalles["motr_FechaModificacion"]
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


    // POR QUE HAY DOS MODO TRNSPORTE INDEX WTF??????????????????? 
    // lo borre pq ni se estaba usando lol
}

export default ModoTransporteIndex;