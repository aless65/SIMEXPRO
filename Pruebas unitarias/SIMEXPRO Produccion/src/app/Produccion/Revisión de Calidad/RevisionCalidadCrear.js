import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useRef, useState } from "react";

import FuseSvgIcon from "@fuse/core/FuseSvgIcon/FuseSvgIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller, useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import "src/styles/custom-pagination.css";
import {
  ToastError,
  ToastErrorPersonalizado,
  ToastSuccessGuardado,
  ToastWarning,
  ToastWarningPersonalizado
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import RevisionCalidadService from "./RevisionCalidadService";
import { useLocation } from "react-router-dom";

function RevisionCalidadCrear() {
  const location = useLocation();
  
  if (location.state === null) {
    History.back();
  }

  // Constante para el service
  const revisionCalidadService = RevisionCalidadService();

  const [buttonDisable, setButtonDisable] = useState(false);

  const defaultValues = {
    ensa_Id: location.state?.ensa_Id,
    image: null,
    cantidad: "",
    fechaRevision: null,
    observaciones: "",
    scrap: false,
  };

  const RevisionSchema = yup.object().shape({
    ensa_Id: yup.number().required(""),
    image: yup.string().required(""),
    cantidad: yup.string().required(""),
    fechaRevision: yup
      .date()
      .required("Ingrese una fecha válida")
      .max(new Date())
      .min(new Date(1900, 0, 1)),
    observaciones: yup.string().required(""),
    scrap: yup.bool().required(""),
  });

  const [image, setimage] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setValue("image", reader.result, { shouldValidate: true, shouldTouch: true });
        setimage(reader.result);
      };
    } else {
      ToastWarningPersonalizado("Advertencia. Archivo incorrecto");

    }
  };

  const { handleSubmit, register, reset, control, watch, formState, setValue, trigger } =
    useForm({
      defaultValues,
      mode: "all",
      resolver: yupResolver(RevisionSchema),
    });

  const { isValid, dirtyFields, errors } = formState;

  const modelo = watch();

  async function RevisionCreate() {
    try {
      const response = await revisionCalidadService.crear(modelo);
      if (response.data?.data?.messageStatus === "1") {
        ToastSuccessGuardado();
        History.push("RevisionCalidad/Index", {row: modelo.ensa_Id});
      } else if (response == "No se pudo subir la imagen") {
        ToastErrorPersonalizado("Error. Hubo un error con el servidor de imágenes");
      } else {
        ToastError();
      }
    } catch (error) {
      ToastError();
    }
  }

  async function CrearRevision() {
    setButtonDisable(true);
    if (isValid) {
      await RevisionCreate();
    } else {
      ToastWarning();
    }
    setButtonDisable(false);
  }

  return (
    <form onSubmit={handleSubmit((_data) => { })}>
      <Card sx={{ minWidth: 275, margin: "40px" }}>
        <CardMedia
          component="img"
          height="200"
          image="https://i.ibb.co/pwQbH4s/REVISI-N-DE-CALIDAD.png"
          alt="Encabezado de la carta"
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                  <FormLabel error={!!errors.image}>
                    Imagen de la prenda:
                  </FormLabel>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"center"}
                  maxHeight={"250px"}
                >
                  <Image
                    width={250}
                    style={{
                      overflow: "hidden",
                      maxHeight: "100%",
                      objectFit: "cover",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                      borderRadius: "10px",
                    }}
                    src={image}
                    fallback="data:image/png;base64,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"
                  />
                </Grid>

                <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                  <FormControl error={!!errors.image}>
                    <FormHelperText>
                      {errors.image ? "Selecciona una imagen" : ""}{" "}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                  <Button
                    startIcon={
                      <FuseSvgIcon className="text-48" size={24} color="white">
                        material-outline:broken_image
                      </FuseSvgIcon>
                    }
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px", marginRight: "10px" }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={() => {fileInputRef.current.click(), trigger("image")}}
                  >
                    Seleccionar una foto
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    name="image"
                    control={control}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Right column for all the TextFields */}
            <Grid item xs={8} style={{}}>
              <Grid container spacing={3}>
                {/* Left column for TextFields */}
                <Grid item xs={6}>
                  <Controller
                    name="fechaRevision"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        error={!!errors.fechaRevision}
                        fullWidth={true}
                      >
                        <FormLabel>Fecha de revisión:</FormLabel>
                        <DatePicker
                          onChange={(date) => field.onChange(date)}
                          value={field.value}
                          required
                          disableFuture={true}
                          maxDate={new Date()}
                          minDate={new Date(1900, 0, 1)}
                          renderInput={(_props) => (
                            <TextField
                              className="w-full"
                              {..._props}
                              onBlur={field.onBlur}
                              error={!!errors.fechaRevision}
                            />
                          )}
                          className="w-full"
                        />
                        <FormHelperText>
                          {errors.fechaRevision
                            ? "Ingrese una fecha válida"
                            : ""}{" "}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.cantidad}>Cantidad:</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          InputProps={{
                            maxLength: 20,
                          }}
                          error={!!errors.cantidad}
                        />
                      )}
                      name="cantidad"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={6}
                  justifyContent={"center"}
                  className="flex justify-content-center"
                >
                  <Box sx={{ textAlign: "center" }}>
                    <FormControl fullWidth>
                      <FormLabel error={!!errors.scrap}>SCRAP:</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <>
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent={"center"}
                              alignItems="center"
                            >
                              <Typography>No</Typography>
                              <Switch {...field} />
                              <Typography>Sí</Typography>
                            </Stack>
                          </>
                        )}
                        name="scrap"
                        control={control}
                      />
                    </FormControl>
                  </Box>
                  {/* <FormControl fullWidth>
                  <FormControlLabel
                  control={<Switch sx={{ '&.Mui-checked': { color: '#634A9E' } }} />}
                  label="SCRAP"
                  labelPlacement="top"
                  />
                </FormControl> */}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errors.observaciones}>
                      Descripcion:
                    </FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          id="outlined-disabled"
                          InputProps={{
                            maxLength: 20,
                          }}
                          // error={!!errors.observaciones}
                          style={errors.observaciones? {borderColor: "red"} : null}
                        />
                      )}
                      name="observaciones"
                      control={control}
                    ></Controller>
                  </FormControl>
                </Grid>
              </Grid>
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
                disabled={buttonDisable}
                startIcon={<Icon>check</Icon>}
                variant="contained"
                color="primary"
                type="submit"
                style={{ borderRadius: "10px", marginRight: "10px" }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
                }}
                onClick={() => {
                  CrearRevision();
                }}
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
                onClick={() => {
                  History.push("/RevisionCalidad");
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
}
export default RevisionCalidadCrear;
