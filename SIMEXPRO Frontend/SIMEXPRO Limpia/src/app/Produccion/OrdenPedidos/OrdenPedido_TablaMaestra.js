import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Box, 
    Collapse, 
    IconButton, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    TablePagination,
    Typography,
    Paper,
    Card, 
    CardContent, 
    CardMedia,
    Grid,
    Button, 
    FormControl, 
    Icon, 
    InputAdornment, 
    InputLabel, 
    TextField,
    Stack,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,

    } 
from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo } from 'react';


function createData(
    Id,
    Proveedor,
    FechaEntrada,
    EstadoOrdenPedido,
    UsuarioCreacion,
    Acciones
    ) {
    return {
        Id,
        Proveedor,
        FechaEntrada,
        EstadoOrdenPedido,
        UsuarioCreacion,        
        Acciones,
        Materiales: [
            {
                IDPedido: '1',
                Material: 'Tela ',
                Cantidad: '100',
                Precio: 'L. 500',
                Peso:'50 Lb'
            },
            {
                IDPedido: '2',
                Material: 'Botones ',
                Cantidad: '2000',
                Precio: 'L. 300',
                Peso:'30 Lb'
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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
                console.log(params);
                setOpenDialog(true);
                //handleClose();
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
                    </Menu>

                        {/* Diálogo de confirmación de eliminación */}
                        <Dialog
                            open={openDialog}
                            fullWidth="md"
                            onClose={() => setOpenDialog(false)}
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
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                                <Button
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: '10px', marginRight: '10px' }}
                                    sx={{
                                    backgroundColor: '#634A9E', color: 'white',
                                    "&:hover": { backgroundColor: '#6e52ae' },
                                    }}
                                    onClick={() => setOpenDialog(false)}
                                >
                                    Eliminar
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
                                    onClick={() => setOpenDialog(false)}
                                >
                                    Cancelar
                                </Button>
                                </Grid>
                            </DialogActions>
                        </Dialog>
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
                <TableCell >{row.Proveedor}</TableCell>
                <TableCell >{row.FechaEntrada}</TableCell>
                <TableCell >{row.EstadoOrdenPedido}</TableCell>
                <TableCell >{row.UsuarioCreacion}</TableCell>
                <TableCell >{columns.renderCell(row)}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Materiales
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Material</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Precio</TableCell>
                                        <TableCell>Peso</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Materiales.map((historyRow) => (
                                        <TableRow key={historyRow.IDPedido}>
                                            <TableCell component="th" scope="row">{historyRow.IDPedido}</TableCell>
                                            <TableCell>{historyRow.Material}</TableCell>
                                            <TableCell>{historyRow.Cantidad}</TableCell>
                                            <TableCell>{historyRow.Precio}</TableCell>
                                            <TableCell>{historyRow.Peso}</TableCell>
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
        Proveedor: PropTypes.string.isRequired,
        FechaEntrada: PropTypes.string.isRequired,
        EstadoOrdenPedido: PropTypes.string.isRequired,
        UsuarioCreacion: PropTypes.string.isRequired,
        //Acciones: PropTypes.string.isRequired,
        Materiales: PropTypes.arrayOf(
            PropTypes.shape({
                IDPedido: PropTypes.string.isRequired,
                Material: PropTypes.string.isRequired,
                Cantidad: PropTypes.string.isRequired,
                Precio: PropTypes.string.isRequired,
                Peso:PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const rows = [
    createData(1, 'INFINITY CORP.', '27/07/2023', 'En Proceso', 'Admin'),
    createData(2, 'INVERSIONES E IMPORTACIONES ZEPEDA','26/07/2023', 'En Proceso', 'Admin'),
    createData(3, 'LaMasca Inc.','26/07/2023', 'Pendiente', 'Admin'),
    createData(4, 'FutureInvestors','25/07/2023', 'Pendiente', 'Admin'),
    createData(5, 'Inversiones Nueva Oportunidad S. de R. L.','25/07/2023', 'Pendiente', 'Admin'),
    createData(6, 'Proveedora Jaeger','25/07/2023', 'En Proceso', 'Admin'),
    createData(7, 'Importadora Flores','24/07/2023', 'Pendiente', 'Admin'),
    createData(8, 'Inversiones El Comprimido','23/07/2023', 'Pendiente', 'Admin'),
    createData(9, 'Flor de Otoño Inc.','22/07/2023', 'En Proceso', 'Admin'),
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

export default function OrdenPedido_TablaMaestra() {
    const [searchText, setSearchText] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = useMemo(
      () => stableSort(rows, getComparator(order, orderBy)),
      [order, orderBy, rows]
    );
  
    const filteredRows = useMemo(
      () =>
        visibleRows.filter(
          (row) =>
            row.Proveedor.toLowerCase().includes(searchText.toLowerCase()) ||
            row.FechaEntrada.toLowerCase().includes(searchText.toLowerCase()) ||
            row.EstadoOrdenPedido.toLowerCase().includes(searchText.toLowerCase()) ||
            row.UsuarioCreacion.toLowerCase().includes(searchText.toLowerCase())
        ),
      [searchText, visibleRows]
    );
  
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
      setPage(0); // Reset page to 0 when changing the search text
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Reset page to 0 when changing the rows per page
    };
  
    return (
        <Grid xs={12}>
            <Grid item xs={6} textAlign="end">
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
            <Grid>
                <TableContainer>
                    <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                        <TableCell/>
                        <TableCell onClick={() => handleRequestSort('Id')}>
                            Id
                            {/* Indicador de direccion de ordenamiento */}
                            {orderBy === 'Id' ? (
                                <span>{order === 'desc' ? ' ▼' : ' ▲'}</span>
                            ) : null}
                        </TableCell>
                        <TableCell onClick={() => handleRequestSort('Proveedor')}>
                            Proveedor
                            {orderBy === 'Proveedor' ? (
                                <span>{order === 'desc' ? ' ▼' : ' ▲'}</span>
                            ) : null}
                        </TableCell>
                        <TableCell onClick={() => handleRequestSort('FechaEntrada')}>
                            Fecha de Entrada
                            {orderBy === 'FechaEntrada' ? (
                                <span>{order === 'desc' ? ' ▼' : ' ▲'}</span>
                            ) : null}
                        </TableCell>
                        <TableCell onClick={() => handleRequestSort('EstadoOrdenPedido')}>
                            Estado Orden de Pedido
                            {orderBy === 'EstadoOrdenPedido' ? (
                                <span>{order === 'desc' ? ' ▼' : ' ▲'}</span>
                            ) : null}
                        </TableCell>
                        <TableCell onClick={() => handleRequestSort('UsuarioCreacion')}>
                            Usuario Creación
                            {orderBy === 'UsuarioCreacion' ? (
                                <span>{order === 'desc' ? ' ▼' : ' ▲'}</span>
                            ) : null}
                        </TableCell>
                        <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <Row key={row.Id} row={row} />
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length} // Use filteredRows.length instead of rows.length
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>   
        </Grid>
    );
};