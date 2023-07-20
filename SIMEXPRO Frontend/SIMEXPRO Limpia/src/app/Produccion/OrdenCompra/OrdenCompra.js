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



import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, InputAdornment, InputLabel, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';


function createData(Id, Fecha, Cliente, Empleado) {
  return {
    Id,
    Fecha,
    Cliente,
    Empleado,
    Detalles: [
      {
        Producto: 'Harina',
        cantidad: '3',
        precio: '10.Lps',
        Total: '30.Lps'
      },
      {
        Producto: 'Manteca',
        cantidad: '5',
        precio: '25.Lps',
        Total: '125.Lps'
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
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
        <TableCell align="right">{row.Fecha}</TableCell>
        <TableCell align="right">{row.Cliente}</TableCell>
        <TableCell align="right">{row.Empleado}</TableCell>

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
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Detalles.map((historyRow) => (
                    <TableRow key={historyRow.Producto}>
                      <TableCell component="th" scope="row">
                        {historyRow.Producto}
                      </TableCell>
                      <TableCell>{historyRow.cantidad}</TableCell>
                      <TableCell>{historyRow.precio}</TableCell>
                      <TableCell align='right'>{historyRow.Total}</TableCell>
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
    Fecha: PropTypes.string.isRequired,
    Cliente: PropTypes.string.isRequired,
    Empleado: PropTypes.string.isRequired,
    Detalles: PropTypes.arrayOf(
      PropTypes.shape({
        Producto: PropTypes.string.isRequired,
        cantidad: PropTypes.string.isRequired,
        precio: PropTypes.string.isRequired,
        Total: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData(1, '16-10-2004', 'Cristian Aguilar', 'Lionel Messi'),
  createData(2, '16-10-2004', 'Mauricio Mateo', 'Cristiano Ronaldo'),
  createData(3, '16-10-2004', 'Lucas Hernadez', 'Donald Trump'),
  createData(4, '16-10-2004', 'Victor Valedz', 'Pedro Rodriguez'),
  createData(5, '16-10-2004', 'Victor Valedz', 'Pedro Rodriguez'),
  createData(7, '16-10-2004', 'Victor Valedz', 'Pedro Rodriguez'),
  createData(8, '16-10-2004', 'Victor Valedz', 'Pedro Rodriguez'),
  createData(9, '16-10-2004', 'Victor Valedz', 'Pedro Rodriguez'),
  createData(10, '16-10-2004', 'Victor Valedz', 'Pedro Rodriguez'),
  createData(11, '16-10-2004', 'Victor Valedz', 'Pedro Rodriguez'),
  createData(12, '16-10-2004', 'Victor Valedz', 'Pedro Rodriguez'),
  createData(13, '16-10-2004', 'JAfet', 'Pedro Rodriguez'),

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


export default function OrdenCompraIndex() {

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
    row.Fecha.toLowerCase().includes(searchText.toLowerCase()) ||
    row.Cliente.toLowerCase().includes(searchText.toLowerCase()) ||
    row.Empleado.toLowerCase().includes(searchText.toLowerCase())
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
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Cliente</TableCell>
              <TableCell align="right">Empleado</TableCell>
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