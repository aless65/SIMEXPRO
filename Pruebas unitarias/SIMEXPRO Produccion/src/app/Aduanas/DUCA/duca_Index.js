/* eslint-disable no-lone-blocks */
import {
    Button,
    FormControl,
    Icon,
    IconButton,
    InputAdornment,
    TextField,
    Grid
} from "@mui/material";
import { ExportToCsv } from 'export-to-csv';
import ExportToExcel from "./ExcelFile";
import PDFGenerator from "./PDFGenerator";
import { FileTextFilled } from "@ant-design/icons";
import { MoreVert } from "@material-ui/icons";
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import History from "src/@history/@history";
import Select from '@mui/material/Select';
import DucaService from './ducaService';
import * as React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Table } from 'antd';
import LoadingIcon from "src/styles/iconoCargaTabla";

function DucaIndex() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState({});
    const [anchorElExportar, setAnchorElExportar] = useState({});
    const [filas, setFilas] = React.useState(10);
    const [ListadoDucas, setListadoDucas] = useState([]);

    const [ExportData, SetExportData] = useState([]);

    const ducaService = DucaService();

    const csvHeader = [
        {
            label: 'No.',
        },
        {
            label: 'No. de DUCA'
        },
        {
            label: 'No. correlativo o referencia'
        },
        {
            label: 'País de procedencia',
        },
        {
            label: 'Aduana de Registro'
        },
    ];

    const csvOptions = {
        filename: 'Ducas',
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

    // variables para el spinner
    const [cargandoData, setCargandoData] = useState([]);
    const getDatosTabla = async () => {
        try {
            setCargandoData([]);
            setListadoDucas([]);

            const data = await ducaService.ListadoDuca();

            setListadoDucas(data);
            data.length > 0 ? setCargandoData(data) : setCargandoData(null);
            SetExportData(await ducaService.ExportData());
        } catch (error) {
            setCargandoData(null)
        }
    };

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

    const handleClickExportar = (event, id) => {
        setAnchorElExportar(prevState => ({
            ...prevState,
            [id]: event.currentTarget,
        }));
    };

    const handleCloseExportar = () => {
        setAnchorElExportar(prevState => ({
            ...prevState,
            ['menu-exportar']: null,
        }));
    };

    const handleEdit = (params) => {
        History.push("/Duca/editar", params);
        localStorage.setItem("duca_Id", params.duca_Id);
        handleClose(params.id);
    };

    const handleReporte = (id) => {
        History.push("/Duca/Reporte", id)
        handleClose(id);
    };

    const handleBoletin = (params) => {
        History.push("/BoletinDePago/crear", params);
        handleClose(params.id);
    }

    const handleChange = (event) => {
        setFilas(event.target.value);
    };

    React.useEffect(() => {
        localStorage.removeItem("duca_Id");
        getDatosTabla();
    }, []);

    {/* Columnas de la tabla */ }
    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'No. de DUCA',
            dataIndex: 'duca_No_Duca',
            key: 'duca_No_Duca',
            sorter: (a, b) => a.duca_No_Duca.localeCompare(b.duca_No_Duca),
        },
        {
            title: 'No. correlativo o referencia',
            dataIndex: 'duca_No_Correlativo_Referencia',
            key: 'duca_No_Correlativo_Referencia',
            sorter: (a, b) => a.duca_No_Correlativo_Referencia.localeCompare(b.duca_No_Correlativo_Referencia),
        },
        {
            title: 'País de procedencia',
            dataIndex: 'nombre_pais_procedencia',
            key: 'nombre_pais_procedencia',
            sorter: (a, b) => a.nombre_pais_procedencia.localeCompare(b.nombre_pais_procedencia),
        },
        {
            title: 'Aduana de Registro',
            dataIndex: 'nombre_Aduana_Registro',
            key: 'nombre_Aduana_Registro',
            sorter: (a, b) => a.duca_FechaVencimiento.localeCompare(b.duca_FechaVencimiento),
        },
        {
            title: 'Acciones',
            key: 'operation',
            render: (params) =>
                <div key={params.duca_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.duca_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.duca_Id)}
                            variant="contained"
                            style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
                            startIcon={<Icon>menu</Icon>}
                        >
                            Opciones
                        </Button>
                        <Menu
                            id={`menu-${params.duca_Id}`}
                            anchorEl={anchorEl[params.duca_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.duca_Id])}
                            onClose={() => handleClose(params.duca_Id)}
                        >
                            {!params.duca_Finalizado &&
                                <MenuItem onClick={() => handleEdit(params)}>
                                    <Icon>edit</Icon>&nbsp;&nbsp;Editar
                                </MenuItem>
                            }

                            <MenuItem onClick={() => handleReporte(params.duca_Id)}>
                                <Icon>print</Icon>&nbsp;&nbsp;Generar Reporte
                            </MenuItem>

                            {params.duca_Finalizado &&
                                <MenuItem onClick={() => handleBoletin(params)}>
                                    <Icon>article</Icon>&nbsp;&nbsp;Generar Boletín de Pago
                                </MenuItem>
                            }

                        </Menu>
                    </Stack>
                </div>
            ,
        },
    ];

    const camposToiFilterList = ["id", "duca_No_Duca", "duca_No_Correlativo_Referencia", "nombre_pais_procedencia", "duca_FechaVencimiento"];

    const filteredRowsList = ListadoDucas.filter((row) => {
        if (searchText === "") {
            return true; // Mostrar todas las filas si el buscador está vacío
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToiFilterList.includes(key)) {
                const formattedValue =
                    typeof value === "number"
                        ? value.toString()
                        : value.toString().toLowerCase();
                const formattedSearchText =
                    typeof searchText === "string"
                        ? searchText.toString()
                        : searchText.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    }).reverse();

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/Wpq35kR/DUCA-DECLARACI-N-NICA-CENTROAMERICANA.png"
                alt="Encabezado de la carta"
            />

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
                                    navigate("/Duca/crear");
                                }}
                            >
                                Nuevo
                            </Button>

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

                            <div key={'menu-exportar'}>
                                {/* Menu de Exportacion */}
                                <Menu
                                    id={'menu-exportar'}
                                    anchorEl={anchorElExportar['menu-exportar']}
                                    open={Boolean(anchorElExportar['menu-exportar'])}
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
                            {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                            <Select value={filas} onChange={handleChange}>
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
                    locale={{
                        triggerDesc: "Ordenar descendente",
                        triggerAsc: "Ordenar ascendente",
                        cancelSort: "Cancelar",
                        emptyText: LoadingIcon(cargandoData),
                    }}
                    columns={columns}
                    scroll={{ x: true }}
                    dataSource={filteredRowsList}
                    size="small"
                    pagination={{
                        pageSize: filas,
                        showSizeChanger: false,
                        className: "custom-pagination",
                    }}
                />
            </div>
        </Card>
    );
}

export default DucaIndex;
