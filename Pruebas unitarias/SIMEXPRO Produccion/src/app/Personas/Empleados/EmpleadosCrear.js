/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import EmpleadosService from "src/app/Personas/Empleados/EmpleadosService";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import { ToastError, ToastSuccessGuardado, ToastWarning, ToastWarningPersonalizado } from "src/styles/toastsFunctions";
import * as yup from "yup";

function EmpleadosCrear() {
  const load_DDLs = Load_DDLs()
  const empleadosService = EmpleadosService();
  // Campos para el DDL de Estados Civiles
  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const [estadoCivilSeleccionado, setEstadoCivilSeleccionado] = useState(0);

  // Campos para el DDL de Cargos
  const [cargos, setCargos] = useState([]);
  const [cargoSeleccionado, setCargoSeleccionado] = useState(0);

  // Campos para el DDL de Paises

  const [paises, setPaises] = useState([]);
  // Campos para el DDL de Provincias

  const [provincias, setProvincias] = useState([]);

  const paisesGet = async () => {
    try {
      const data = await load_DDLs.paises()
      setPaises(data)
    } catch (error) {
    }
  };

  const provinciasGet = async () => {
    try {
      const data = await load_DDLs.ProvinciasPorPais(97)
      setProvincias(data)
    } catch (error) {
    }
  };

  const cargosGet = async () => {
    try {
      const data = await load_DDLs.Cargos()
      setCargos(data)
    } catch (error) {
    }
  };

  const estadosCivilesGet = async () => {
    try {
      const data = await load_DDLs.Estadosciviles()
      setEstadosCiviles(data)
    } catch (error) {
    }
  };


  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    paisesGet()
    cargosGet()
    estadosCivilesGet()
    provinciasGet()
  }, []);

  const defaultValues = {
    empl_Id: "",
    empl_Nombres: "",
    empl_Apellidos: "",
    empl_DNI: "",
    escv_Id: null,
    empl_Sexo: null,
    empl_FechaNacimiento: null,
    empl_Telefono: "",
    empl_DireccionExacta: "",
    pvin_Id: null,
    pais_Codigo: "",
    empl_CorreoElectronico: "",
    carg_Id: null,
    empl_EsAduana: "",
  };

  const EmpleadosSchema = yup.object().shape({
    empl_Id: yup.string(),
    empl_Nombres: yup.string().required(""),
    empl_Apellidos: yup.string().required(""),
    empl_DNI: yup.string().required("").min(15,"Ingrese todo el DNI").max(15),
    escv_Id: yup.object().required(""),
    empl_Sexo: yup.string("").required(),
    empl_FechaNacimiento: yup.date().nullable().required("").max(new Date(),"No puede ingresar fechas futuras").min(new Date(1900, 0 , 1), "Ingrese una fecha mayor a 01/01/1900"),
    empl_Telefono: yup.string().required("").min(14,"Ingrese todo el número de teléfono").max(14),
    empl_DireccionExacta: yup.string().required(""),
    pvin_Id: yup.object().required(""),
    empl_CorreoElectronico: yup.string().required("").email("Ingrese un correo electronico valido"),
    carg_Id: yup.object().required(""),
    empl_EsAduana: yup.string(),
  });

  //Constante que nos ayuda para las validaciones con yup para los formularios
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultValues,
      mode: "all",
      resolver: yupResolver(EmpleadosSchema),
    });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const modelo = watch();

  const EmpleadoCreate = async () => {
    const response = await empleadosService.crear(modelo)
    return response
  }

  const validacion = async () => {
    if (isValid) {
      const response = await EmpleadoCreate();
      if (response.data.data.messageStatus === "1") {
        ToastSuccessGuardado()
        History.push("/Empleados/Index")
      } else if (response.data.data.messageStatus.includes('Violation') || response.data.data.messageStatus.includes('Duplicate')) {
        ToastWarningPersonalizado('Advertencia. Ya existe un empleado con ese DNI.')
      } else {
        ToastError()
      }
    } else {
      ToastWarning()
    }
  }
  

  return (
    <form onSubmit={handleSubmit((_data) => { })}>
      <Card sx={{ minWidth: 275, margin: "40px" }}>
        {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
        <CardMedia
          component="img"
          height="200"
          image="https://i.ibb.co/xs7bfqB/EMPLEADOS.png"
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
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom></Typography>
            </Grid>

            <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errors.empl_Nombres} fullWidth={true}>
                      <FormLabel
                      >
                        Nombres del Empleado:
                      </FormLabel>
                      <TextField
                        {...field}
                        error={!!errors.empl_Nombres}
                        variant="outlined"
                        fullWidth={true}
                        inputprops={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                  name="empl_Nombres"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl fullWidth={true}>
                      <FormLabel

                        error={!!errors.empl_Apellidos}
                      >
                        {" "}
                        Apellidos del Empleado:{" "}
                      </FormLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        error={!!errors.empl_Apellidos}
                        fullWidth={true}
                        inputprops={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                  name="empl_Apellidos"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="9999-9999-99999"
                      value={modelo["empl_DNI"]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (
                        <FormControl error={!!errors.empl_DNI} fullWidth={true}>
                          <FormLabel
                          >
                            Número de Identidad:
                          </FormLabel>
                          <TextField
                            {...field}
                            variant="outlined"
                            error={!!errors.empl_DNI}
                            fullWidth={true}
                            helperText={errors?.empl_DNI?.message}
                            inputprops={{
                              startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="empl_DNI"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.empl_Sexo} fullWidth={true}>
                    <FormLabel>
                      Sexo:
                    </FormLabel>
                    <RadioGroup
                      row
                      name="simple-radio"
                      aria-label="simple-radio"
                      marginRight="10px"
                    >
                      <FormControlLabel
                        value="F"
                        control={<Radio />}
                        label="Femenino"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                      <FormControlLabel
                        value="M"
                        control={<Radio />}
                        label="Masculino"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                )}
                name="empl_Sexo"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={field.value === "0"} fullWidth={true}>
                    <FormLabel error={!!errors.escv_Id}>
                      Estado Civil:
                    </FormLabel>
                    <Autocomplete
                      {...field}
                      disablePortal
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      options={estadosCiviles}
                      value={modelo["escv_Id"]}
                      onChange={(event, value) => { setValue('escv_Id', value) }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.escv_Id}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </FormControl>
                )}
                name="escv_Id"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="empl_FechaNacimiento"
                control={control}
                render={({ field }) => (
                  <FormControl
                    error={!!errors.empl_FechaNacimiento}
                    fullWidth={true}
                  >
                    <FormLabel>
                      Fecha de Nacimiento:
                    </FormLabel>
                    <DatePicker
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                      required
                      disableFuture={true}
                      maxDate={new Date()}
                      minDate={new Date(1900, 0 , 1)}
                      renderInput={(_props) => (
                        <TextField  
                          className="w-full"
                          {..._props}
                          onBlur={field.onBlur}
                          error={!!errors.empl_FechaNacimiento}
                          helperText={errors?.empl_FechaNacimiento?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errors?.empl_FechaNacimiento?.message}
                        />
                      )}
                      className="w-full"
                    />
                  
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="+504 9999-9999"
                      value={modelo["empl_Telefono"]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      maskChar=""
                    >
                      {() => (

                        <FormControl error={!!errors.empl_Telefono} fullWidth={true}>
                          <FormLabel>
                            Teléfono o Celular:
                          </FormLabel>
                          <TextField
                            {...field}
                            variant="outlined"
                            error={!!errors.empl_Telefono}
                            helperText={errors?.empl_Telefono?.message}
                            fullWidth={true}
                            inputprops={{
                              startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="empl_Telefono"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl
                      error={!!errors.empl_CorreoElectronico}
                      fullWidth={true}
                    >
                      <FormLabel

                      >
                        Correo Electrónico:
                      </FormLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        error={!!errors.empl_CorreoElectronico}
                        fullWidth={true}
                        helperText={errors?.empl_CorreoElectronico?.message}
                        inputprops={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                  name="empl_CorreoElectronico"
                  control={control}
                />
              </div>
            </Grid>

            {/* <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  name="pais_Id"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      error={!!errors.pais_Id}
                      fullWidth={true}
                    >
                      <FormLabel

                        error={!!errors.pais_Id}
                      >
                        Pais
                      </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        id="pais_Id"
                        options={paises}
                        value={modelo["pais_Id"] ?? null}
                        onChange={async (event, value) => {
                          setValue('pais_Id', value)
                          provinciasGet(value?.value)
                          if (!value) { setValue('pvin_Id', []) }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.pais_Id}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </FormControl>
                  )}
                />
              </div>
            </Grid> */}

            <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl error={field.value === "0"} fullWidth={true}>
                      <FormLabel

                        error={!!errors.carg_Id}
                      >
                        Cargo que desempeña:
                      </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        options={cargos}
                        value={modelo["carg_Id"]}
                        onChange={(event, value) => {
                          setValue('carg_Id', value)
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.carg_Id}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </FormControl>
                  )}
                  name="carg_Id"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="mb-16">
                <Controller
                  name="pvin_Id"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth={true}>
                      <FormLabel
                        error={!!errors.pvin_Id}
                      >
                        Provincia:
                      </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="pvin_Id"
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        options={provincias}
                        value={modelo["pvin_Id"]}
                        onChange={(event, value) => {
                          setValue('pvin_Id', value)
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.pvin_Id}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </FormControl>
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl
                      error={!!errors.empl_DireccionExacta}
                      fullWidth={true}
                    >
                      <FormLabel

                      >
                        Dirección Exacta:
                      </FormLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        error={!!errors.empl_DireccionExacta}
                        fullWidth={true}
                        inputprops={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                  name="empl_DireccionExacta"
                  control={control}
                />
              </div>
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
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                type="submit"
                style={{ borderRadius: "10px", marginRight: "10px" }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
                }}
                onClick={validacion}
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
                  History.push("/Empleados/Index");
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

export default EmpleadosCrear;
