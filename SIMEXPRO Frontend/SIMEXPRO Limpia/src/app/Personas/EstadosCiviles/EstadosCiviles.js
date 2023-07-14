import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const EstadosCivilesIndex = () => {
  const data = [
    { id: 'C', name: 'Casado' },
    { id: 'S', name: 'Soltero' },
    { id: 'V', name: 'Viudo' },
  ];

  return (
    <Card sx={{ minWidth: 275, margin: '20px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/m6WXPNx/Headers-SIMEXPRO-2.png"
        alt="Encabezado de la carta"
      />
      <CardContent>
        <Typography variant="h6">Estados Civiles</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#634A9E', mt: 2, color: 'white' }}
          startIcon={<Icon>plus-sm</Icon>}
        >
          Nuevo
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default EstadosCivilesIndex;
