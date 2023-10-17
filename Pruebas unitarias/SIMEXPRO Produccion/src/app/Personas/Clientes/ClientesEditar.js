/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import { ToastError, ToastSuccessEditar, ToastWarning, ToastWarningPersonalizado } from "src/styles/toastsFunctions";
import * as yup from "yup";
import ClientesService from "./ClientesService";


function ClientesEditar() {
  const load_DDLs = Load_DDLs()
  const clientesServices = ClientesService();
  
  const [paises, setPaises] = useState([]);
  // Campos para el DDL de Provincias
  const location = useLocation()
  const [provincias, setProvincias] = useState([]);
  const data = location.state;
  const [registrosExistentes, setRegistrosExistentes] = useState([]);

  

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await clientesServices.listar();
        setRegistrosExistentes(response);
      } catch (error) {
      }
    };
  
    fetchRegistros();
    paisesGet();
   provinciasGetAll();
   setTimeout(() => {
    trigger()
  }, 1000);

  }, []);


  const paisesGet = async () => {
    try {
      const response = await load_DDLs.paises()
      setPaises(response)
      setValue('pais_Id', response.find(item => item.value === data.pais_Id))
    } catch (error) {
    }
  };

  const provinciasGetAll = async () => {
    try {
      const response = await load_DDLs.Provincias()
      setValue('pvin_Id', response.find(item => item.value === data.pvin_Id))
      
      provinciasGet(data.pais_Id)
    } catch (error) {
    }
  };

  const provinciasGet = async (id) => {
    try {
      if (id) {
        const response = await clientesServices.ProvinciasPorPais(id)
        setProvincias(response)
      } else {
        setProvincias([])
      }
    } catch (error) {
    }
  };

  const isRTNDuplicado = (registrosExistentes, rtn) => {
    return registrosExistentes.some((item) => item.clie_RTN === rtn && item.clie_Id != data.clie_Id);
  };
  const isCorreoDuplicado = (registrosExistentes, correo) => {
    const correoMinusculas = correo.toLowerCase(); 
    return registrosExistentes.some(item => item.clie_Correo_Electronico.toLowerCase() === correoMinusculas  && item.clie_Id != data.clie_Id);
  };
  

  const isNumeroConactoDuplicado = (registrosExistentes, numero) => {
    return registrosExistentes.some(item => item.clie_Numero_Contacto === numero  && item.clie_Id != data.clie_Id);
  };

  const isFaxDuplicado = (registrosExistentes, fax) => {
    return registrosExistentes.some(item => item.clie_FAX === fax  && item.clie_Id != data.clie_Id && item.clie_FAX != "");
  };


  const validarRTN = (value) => {
    if (/^\d{4}-\d{4}-\d{6}$/.test(value)) {
      return true;
    }
    return false;
  };

  const validarTelefonoContacto = (value) => {
    if (/^\+\d{3} \d{4}-\d{4}$/.test(value)) {

      return true;
    }
    return false;
  };

  const defaultValues = {
    clie_Id: data.clie_Id,
    clie_Nombre_O_Razon_Social: data.clie_Nombre_O_Razon_Social,
    clie_Direccion: data.clie_Direccion,
    clie_RTN: data.clie_RTN,
    clie_Nombre_Contacto: data.clie_Nombre_Contacto,
    clie_Numero_Contacto: data.clie_Numero_Contacto,
    clie_Correo_Electronico: data.clie_Correo_Electronico,
    clie_FAX: data.clie_FAX,
    pais_Id: null,
    pvin_Id: null,
  };

  const ClientesSchema = yup.object().shape({
    id: yup.string(),
    clie_Nombre_O_Razon_Social: yup.string().required(""),
    clie_Direccion: yup.string().required(""),
    clie_RTN: yup
    .string()
    .required("")
    .test("formato", "RTN incompleto", validarRTN),
    clie_Nombre_Contacto: yup.string().required(""),
    clie_Numero_Contacto: yup
    .string()
    .required("")
    .test(
      "formato",
      "Número de teléfono incompleto",
      validarTelefonoContacto
    ),
    pvin_Id: yup.object().required(""),
    pais_Id: yup.object().required(""),
    clie_FAX: yup.string().trim(),
    clie_Correo_Electronico: yup.string().trim().required("").email(),

  });


  //Constante que nos ayuda para las validaciones con yup para los formularios
  const { handleSubmit, reset, control, watch, formState, setValue, trigger } =
    useForm({
      defaultValues,
      mode: "all",
      resolver: yupResolver(ClientesSchema),
    });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const modelo = watch();

// Peticion para crear un registro
const clientesEditar = async () => {
  try {
    const duplicados = registrosExistentes.filter(item => {
      return (
        isRTNDuplicado(registrosExistentes, modelo.clie_RTN) ||
        isCorreoDuplicado(registrosExistentes, modelo.clie_Correo_Electronico) ||
        isFaxDuplicado(registrosExistentes, modelo.clie_FAX)   ||
        isNumeroConactoDuplicado(registrosExistentes, modelo.clie_Numero_Contacto)
        );
    });
    if (duplicados.length > 0) {
      ToastWarningPersonalizado("Ya existe un registro con esos datos");
    } else {
      const crearResponse = await clientesServices.editar(modelo);
      if (crearResponse.data.data.messageStatus === "1") {
        History.push("/Clientes/index");
        ToastSuccessEditar();
      }
    }
  } catch (error) {
    ToastError();
  }
};


const validacion = async () => {
  if (isValid) {
    clientesEditar()
  }
  else {
      ToastWarning();
  }
}



  return (
    <form onSubmit={handleSubmit((_data) => { })}>
      <Card sx={{ minWidth: 275, margin: "40px" }}>
        {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
        <CardMedia
          component="img"
          height="200"
          image="https://i.ibb.co/0KzPC2w/CLIENTES.png"
          alt="Encabezado de la carta"
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                <Chip label="Editar cliente" />
              </Divider>
            </Grid>

            <Grid item xs={6}>          
                <Controller
                  render={({ field }) => (
                    <FormControl fullWidth={true}>
                      <FormLabel  error={!!errors.clie_Nombre_O_Razon_Social} >
                        Nombre o razón social:
                      </FormLabel>
                      <TextField
                        {...field}
                        error={!!errors.clie_Nombre_O_Razon_Social}
                        variant="outlined"
                        fullWidth={true}
                        inputprops={{
                          startadornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                  name="clie_Nombre_O_Razon_Social"
                  control={control}
                />      
            </Grid>

            <Grid item xs={6}>
            <Controller
              render={({ field }) => (
                <InputMask
                  mask="9999-9999-999999"
                  value={modelo["clie_RTN"]}
                  onChange={field.onChange}
                  onBlur={() => {
                    field.onBlur();
                    if (isRTNDuplicado(registrosExistentes, field.value)) {
                      ToastWarningPersonalizado("Ya existe un registro con ese RTN .");
                    }
                  }}
                  maskChar=""
                >
                  {() => (
                    <FormControl fullWidth={true}>
                      <FormLabel error={!!errors.clie_RTN || isRTNDuplicado(registrosExistentes, field.value)}>
                        RTN:
                      </FormLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        error={!!errors.clie_RTN || isRTNDuplicado(registrosExistentes, field.value)}
                        fullWidth={true}
                        inputprops={{
                          startadornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                      {errors.clie_RTN && (
                        <Typography variant="caption" color="error">
                          {errors.clie_RTN.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                </InputMask>
              )}
              name="clie_RTN"
              control={control}
            />
          </Grid>


            <Grid item xs={6}>
                <Controller
                  render={({ field }) => (
                    <FormControl fullWidth={true}>
                      <FormLabel error={!!errors.clie_Nombre_Contacto}  >
                       Nombre de contacto:
                      </FormLabel>
                      <TextField
                        {...field}
                        error={!!errors.clie_Nombre_Contacto}
                        variant="outlined"
                        fullWidth={true}
                        inputProps={{
                            startadornment: (
                                <InputAdornment position="start"></InputAdornment>
                            ),
                            }}                          
                      />
                    </FormControl>
                  )}
                  name="clie_Nombre_Contacto"
                  control={control}
                />
            </Grid>

          
            <Grid item xs={6}>
                <Controller
                  render={({ field }) => (
                    <InputMask
                      mask="+999 9999-9999"
                      value={modelo["clie_Numero_Contacto"]}
                      onChange={field.onChange}
                      onBlur={() => {
                        field.onBlur();
                        if (isNumeroConactoDuplicado(registrosExistentes, field.value)) {
                          ToastWarningPersonalizado("Ya existe un registro con el número de teléfono.");
                        }
                      }}
                      maskChar=""
                    >
                      {() => (
                        <FormControl fullWidth={true}>
                          <FormLabel  error={!!errors.clie_Numero_Contacto || isNumeroConactoDuplicado(registrosExistentes, field.value)} >
                            Número telefónico del nombre de contacto:
                          </FormLabel>
                          <TextField
                            {...field}
                            variant="outlined"
                            error={!!errors.clie_Numero_Contacto || isNumeroConactoDuplicado(registrosExistentes, field.value)}
                            fullWidth={true}
                            inputprops={{
                              startadornment: (
                                <InputAdornment position="start"></InputAdornment>
                              ),
                            }}
                          />
                            {errors.clie_Numero_Contacto && (
                          <Typography variant="caption" color="error">
                          {errors.clie_Numero_Contacto.message}
                          </Typography>
                          )}
                        </FormControl>
                      )}
                    </InputMask>
                  )}
                  name="clie_Numero_Contacto"
                  control={control}
                />
            </Grid>



            <Grid item xs={6}>  
              <Controller
                  render={({ field }) => (

                <FormControl fullWidth={true}>
                <FormLabel  error={isFaxDuplicado(registrosExistentes, field.value)}  >
                    Número de Fax:
                </FormLabel>
                
                <TextField
                    type="number"
                    {...field}
                    error={isFaxDuplicado(registrosExistentes, field.value)}
                    variant="outlined"
                    fullWidth={true}
                    onChange={field.onChange}
                    onBlur={() => {
                      field.onBlur();
                      if (isFaxDuplicado(registrosExistentes, field.value)) {
                        ToastWarningPersonalizado("Ya existe un registro con el número de Fax.");
                      }
                    }}
                    inputProps={{
                      maxLength: 20,
                      startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>    
                )}
                name="clie_FAX"
                control={control}
              />
              </Grid>


              <Grid item xs={6}>
              <Controller
                  render={({ field }) => (     
               <FormControl  fullWidth>
                <FormLabel error={!!errors.clie_Correo_Electronico || isCorreoDuplicado(registrosExistentes, field.value)}> Correo Electrónico:</FormLabel>
                    
                      <TextField
                          {...field}
                          error={!!errors.clie_Correo_Electronico || isCorreoDuplicado(registrosExistentes, field.value)}
                          variant="outlined"
                          fullWidth={true}
                          onChange={field.onChange}
                          onBlur={() => {
                            field.onBlur();
                            if (isCorreoDuplicado(registrosExistentes, field.value)) {
                              ToastWarningPersonalizado("Ya existe un registro con el correo electrónico.");
                            }
                          }}
                          inputProps={{
                          startadornment: (
                              <InputAdornment position="start"></InputAdornment>
                          ),
                          }}                    
                      />  
                      {errors.clie_Correo_Electronico && (
                        <Typography variant="caption" color="error">
                        {errors.clie_Correo_Electronico.message}
                        </Typography>
                        )} 
                    </FormControl>             
                  )}
                  name="clie_Correo_Electronico"
                  control={control}
                 />       
            </Grid>



            <Grid item xs={6}>
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
                        País:
                      </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        id="pais_Id"
                        options={paises}
                        disableClearable={true}
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
                        Provincias
                      </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="pvin_Id"
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        options={provincias}
                        disableClearable={true}
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
                      <Controller
                        render={({ field }) => (
                          <FormControl
                          
                            fullWidth={true}
                          >
                            <FormLabel error={!!errors.clie_Direccion} >
                              Dirección :
                            </FormLabel>
                            <TextField
                              {...field}
                              variant="outlined"
                              error={!!errors.clie_Direccion}
                              fullWidth={true}
                              inputprops={{
                                startadornment: (
                                  <InputAdornment position="start"></InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        )}
                        name="clie_Direccion"
                        control={control}
                      />
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
                        History.push("/Clientes/Index");
                      }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
              <ToastContainer />
            </Card>
          </form>
        );
}

export default ClientesEditar;
