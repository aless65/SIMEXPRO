import * as React from 'react';
import PropTypes from 'prop-types';
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
import { Button, FormControl, Icon, InputAdornment, InputLabel, TextField, Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { render } from '@fullcalendar/core/preact';
import { useMemo } from 'react';
import Chip from '@mui/material/Chip';


function createData(Id, Modelo, Talla, Proceso, Acciones) {
    return {
        Id,
        Modelo,
        Talla,
        Proceso,
        Acciones,
        Materiales: [
            {
                Material: 'Tela ',
                Unidad_de_Medida: 'Rollo',
                Cantidad: '100',
            },
            {
                Material: 'Botones ',
                Unidad_de_Medida: 'Bolsa',
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
                VisibilidadTabla();
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
                <TableCell>{row.Modelo}</TableCell>
                <TableCell>{row.Talla}</TableCell>
                <TableCell>{row.Proceso}</TableCell>
                <TableCell>{columns.renderCell({ id: row.Id })}</TableCell>
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
                                        <TableCell>Unidad de Medida</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Materiales.map((historyRow) => (
                                        <TableRow key={historyRow.Material}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.Material}
                                            </TableCell>
                                            <TableCell>{historyRow.Unidad_de_Medida}</TableCell>
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
        Modelo: PropTypes.string.isRequired,
        Talla: PropTypes.string.isRequired,
        Proceso: PropTypes.string.isRequired,
        Acciones: PropTypes.string.isRequired,
        Materiales: PropTypes.arrayOf(
            PropTypes.shape({
                Material: PropTypes.string.isRequired,
                Unidad_de_Medida: PropTypes.string.isRequired,
                Cantidad: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const rows = [
  
    createData('5686464564' , '16-10-2023', '16-10-2023','Isaac Zepeda GOD'),
    createData('2423423423' , '16-10-2023', '16-10-2023','Isaac Zepeda GOD'),
    createData('2342342342' , '16-10-2023', '16-10-2023','Isaac Zepeda GOD'),
    createData('3423423423' , '16-10-2023', '16-10-2023','Isaac Zepeda GOD'),
    createData('5564564565' , '16-10-2023', '16-10-2023','Isaac Zepeda GOD'),
    createData('3455345454' , '16-10-2023', '16-10-2023','Isaac Zepeda GOD'),

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


export default function TablaDetalles_Materiales({ mostrarIndex, setMostrarIndex }) {

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
            row.Modelo.toLowerCase().includes(searchText.toLowerCase()) ||
            row.Talla.toLowerCase().includes(searchText.toLowerCase()) ||
            row.Proceso.toLowerCase().includes(searchText.toLowerCase())
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


    const handleClick = () => {
        setMostrarIndex(!mostrarIndex);
    };

    
    return (
      <div>
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
                <TableCell onClick={() => handleRequestSort('Modelo')}>
                    Modelo
                    {orderBy === 'Modelo' ? (
                        <span>{order === 'desc' ? ' ▼' : ' ▲'}</span>
                    ) : null}
                </TableCell>
                <TableCell onClick={() => handleRequestSort('Talla')}>
                    Talla
                    {orderBy === 'Talla' ? (
                        <span>{order === 'desc' ? ' ▼' : ' ▲'}</span>
                    ) : null}
                </TableCell>
                <TableCell onClick={() => handleRequestSort('Proceso')}>
                    Proceso
                    {orderBy === 'Proceso' ? (
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
      </div>
    );
  }
  