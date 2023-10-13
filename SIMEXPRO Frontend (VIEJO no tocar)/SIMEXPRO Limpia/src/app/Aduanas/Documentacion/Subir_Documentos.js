import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Button,
  ButtonBase,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Avatar,
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Zoom from "@mui/material/Zoom";
import Grow from "@mui/material/Grow";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Subir_Documentos() {
  const navigate = useNavigate();

  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 275, margin: "40px" }}>
        <CardMedia
          component="img"
          height="200"
          image="https://i.ibb.co/FzNJhGw/DOCUMENTOS.png"
          alt="Encabezado de la carta"
        />
        <Typography variant="h4" align="center" padding={4}>
          Solo Válido PDF   <PictureAsPdfIcon></PictureAsPdfIcon>
        </Typography>

        <Grid container spacing={4} justifyContent="center">

          <Grid item xs={3} >
            <div class="flex items-center justify-center w-full">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/2666/2666501.png" sx={{ height: "50px", width: "50px" }} variant="rounded" />
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Contrato de Adhesion</span>
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </Grid>


          <Grid item xs={3}>
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">

                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn-icons-png.flaticon.com/512/4901/4901662.png"
                    sx={{ height: "50px", width: "50px" }}
                    variant="rounded"
                  />

                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">DUCA</span>
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </Grid>

          <Grid item xs={3}
          >
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn-icons-png.flaticon.com/128/1195/1195524.png"
                    sx={{ height: "50px", width: "50px" }}
                    variant="rounded"
                  />

                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Boletin de pago</span>
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </Grid>

        </Grid>

        <Grid item marginTop={5} marginBottom={5} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            startIcon={<Icon>upload</Icon>}
            variant="contained"
            color="primary"
            style={{ borderRadius: "10px", marginRight: "10px" }}
            sx={{
              backgroundColor: "#634A9E",
              color: "white",
              "&:hover": { backgroundColor: "#6e52ae" },
            }}
          >
            Subir documentos
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
            onClick={(e) => {
              navigate("/Declaracion-de-Valor/Listado");
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </Card>
    </>
  );
}

export default Subir_Documentos;
