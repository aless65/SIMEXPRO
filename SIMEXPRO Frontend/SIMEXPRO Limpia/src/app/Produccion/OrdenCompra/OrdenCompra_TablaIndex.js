import * as React from 'react';
import PropTypes, { bool } from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Card, CardContent } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';


import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, InputAdornment, InputLabel, Divider ,TextField} from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { render } from '@fullcalendar/core/preact';
import Chip from '@mui/material/Chip';

var ActicarColapse = true

function createData(Id, FechaEmision, FechaLimite, Cliente,Acciones) {
    return {
        Id,
        FechaEmision,
        FechaLimite,
        Cliente,
        Acciones,
        Detalles: [
            {
                Modelo: 'Polo ',
                Talla: 'L',
                Cantidad: '100',
            },
            {
                Modelo: 'Boxers ',
                Talla: 'M',
                Cantidad: '2000',
            },
        ],
    };
}



function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [mostrarAdd, setmostrarAdd] = useState(false);

    const columns = {
        renderCell: (params) => {

            const [anchorEl, setAnchorEl] = React.useState(null);

            const handleClick = (event) => {
                setAnchorEl(event.currentTarget);
            };

            const handleClose = () => {
                setAnchorEl(null);
            };

            const handleEdit = () => {
                // Implementa la función para editar aquí
                handleClose();
            };

            const handleDetails = () => {
                // Implementa la función para detalles aquí
                handleClose();
            };

            const handleDelete = () => {
                // Implementa la función para eliminar aquí
                handleClose();
            };

            const handleAddMaterial = () => {
                // Implementa la función para añadir materiales aquí

                handleClose();
            };

            return (


                <Stack direction="row" spacing={1}>
                    <Button
                        aria-controls={`menu-${params.id}`}
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="contained"
                        style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
                        startIcon={<Icon>menu</Icon>}
                    >
                        Opciones
                    </Button>
                    <Menu
                        id={`menu-${params.id}`}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleEdit}>
                            <Icon>edit</Icon> Editar
                        </MenuItem>
                        <MenuItem onClick={handleDetails}>
                            <Icon>visibility</Icon> Detalles
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                            <Icon>delete</Icon> Eliminar
                        </MenuItem>
                        <MenuItem onClick={handleAddMaterial}>
                            <Icon>add</Icon> Añadir Materiales
                        </MenuItem>

                    </Menu>

                </Stack>

            );
        },
    };



    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.Id}
                </TableCell>
                <TableCell>{row.FechaEmision}</TableCell>
                <TableCell>{row.FechaLimite}</TableCell>
                <TableCell>{row.Cliente}</TableCell>
                <TableCell>{columns.renderCell({ id: row.Id })}</TableCell>
            </TableRow>




            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalles
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>modelo</TableCell>
                                        <TableCell>Talla</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Detalles.map((historyRow) => (
                                        <TableRow key={historyRow.Modelo}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.Modelo}
                                            </TableCell>
                                            <TableCell>{historyRow.Talla}</TableCell>
                                            <TableCell>{historyRow.Cantidad}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


Row.propTypes = {
    row: PropTypes.shape({
        Id: PropTypes.number.isRequired,
        FechaEmision: PropTypes.string.isRequired,
        FechaLimite: PropTypes.string.isRequired,
        Cliente: PropTypes.string.isRequired,
        Acciones: PropTypes.string.isRequired,
        Detalles: PropTypes.arrayOf(
            PropTypes.shape({
                Modelo: PropTypes.string.isRequired,
                Talla: PropTypes.string.isRequired,
                Cantidad: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const rows = [
    createData(1, 'polo', 'L', 'Corte'),
    createData(2, 'Falda', 'M', 'Corte')
];

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


export default function TablaDatos_Index() {

    const [ActicarColapse, setActicarColapse] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    {/* Filtrado de datos */ }
    const filteredRows = visibleRows.filter((row) =>
        row.FechaEmision.toLowerCase().includes(searchText.toLowerCase()) ||
        row.FechaLimite.toLowerCase().includes(searchText.toLowerCase()) ||
        row.Cliente.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };


    {/* Paginacion */ }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
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

            <TableContainer >
                <Table aria-label="collapsible table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Id</TableCell>
                            <TableCell >FechaEmision</TableCell>
                            <TableCell >FechaLimite</TableCell>
                            <TableCell >Cliente</TableCell>
                            <TableCell >Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((row) => (
                            <Row key={row.Id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}