import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useNavigate } from "react-router-dom";

function Persona_Juridica_Index() {
  const [searchText, setSearchText] = useState("");
  const [Eliminar, setEliminar] = useState(false);
  const Navigate = useNavigate();

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {
    /*Columnas de la tabla*/
  }
  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "RTN", headerName: "RTN Solitante", flex: 1 },
    { field: "fecha", headerName: "Fecha de Solicitud", flex: 1 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 500,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<Icon>edit</Icon>}
            variant="contained"
            style={{ borderRadius: "10px" }}
            sx={{
              backgroundColor: "#634A9E",
              color: "white",
              "&:hover": { backgroundColor: "#6e52ae" },
            }}
          >
            Editar
          </Button>

          <Button
            startIcon={<Icon>visibility</Icon>}
            variant="contained"
            color="primary"
            style={{ borderRadius: "10px" }}
            sx={{
              backgroundColor: "#797979",
              color: "white",
              "&:hover": { backgroundColor: "#b69999" },
            }}
          >
            Detalles
          </Button>
          <Button
            startIcon={<Icon>delete</Icon>}
            variant="contained"
            color="primary"
            style={{ borderRadius: "10px" }}
            sx={{
              backgroundColor: "#E40F00",
              color: "white",
              "&:hover": { backgroundColor: "#eb5f56" },
            }}
            onClick={DialogEliminar}
          >
            Eliminar
          </Button>

          <Button
            startIcon={<Icon>print</Icon>}
            variant="contained"
            style={{ borderRadius: "10px" }}
            sx={{
              backgroundColor: "#C4BADD",
              color: "white",
              "&:hover": { backgroundColor: "#A9A2BB" },
            }}
          >
            Imprimir
          </Button>
        </Stack>
      ),
    },
  ];

  {
    /*Datos de la tabla*/
  }
  const rows = [{ id: "1", RTN: "05012006017552", fecha: "01/02/2023" }];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {
    /*Filtrado de datos*/
  }
  const filteredRows = rows.filter(
    (row) =>
      row.RTN.toLowerCase().includes(searchText.toLowerCase()) ||
      row.fecha.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/cFBKy66/CONTRATO-DE-ADHESI-N-PERSONA-JURIDICA.png"
        alt="Encabezado de la carta"
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/*Botón de Nuevo*/}
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
            onClick={(e) => {
              Navigate("/ContratoDeAdhesionPersonaJuridica/Agregar");
            }}
          >
            Nuevo
          </Button>
        </Stack>

        {/*Barra de Busqueda en la Tabla*/}
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
      </CardContent>

      {/*Tabla*/}

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{
            Toolbar: GridToolbar,
            Search: SearchIcon,
          }}
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>

      <Dialog
        open={Eliminar}
        fullWidth={"md"}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={DialogEliminar}
            >
              Eliminar
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
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Persona_Juridica_Index;
