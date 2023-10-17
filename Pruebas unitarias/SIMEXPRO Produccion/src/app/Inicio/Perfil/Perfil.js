
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  TextField,
  Typography
} from "@mui/material";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import JwtService from "src/app/auth/services/jwtService";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import SignInService from "src/app/main/sign-in/SignInService";
import "src/styles/custom-pagination.css";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastDefault,
  ToastErrorPersonalizado,
  ToastSuccessPersonalizado,
  ToastWarning,
  ToastWarningPersonalizado
} from "src/styles/toastsFunctions";
import * as yup from "yup";
import PerfilService from './PerfilService';

function PerfilIndex() {

    const perfilServices = PerfilService();
    const signInService = SignInService();
    const load_DDLs = Load_DDLs()
    const [image, setimage] = useState('https://i.ibb.co/8MKqj1C/Avatar-Usuario.png');
    const fileInputRef = useRef(null);

    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarCambiarClave, setmostrarCambiarClave] = useState(false);
    const [mostrarCambiarClave2, setmostrarCambiarClave2] = useState(false);
    const [mostrarCambiarPerfil, setmostrarCambiarPerfil] = useState(false);
    const [Deshabilitar, setDeshabilitar] = useState(false);
    const [Deshabilitar2, setDeshabilitar2] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
      setimage(user.data['photoURL']);
    }, [])

    const defaultperfil = {
      contraseña: "",
      codigo: 0,
    };

    const schemaPerfil = yup.object().shape({
      contraseña: yup.string().required(""),
    });
 

      //Declaracion del formulario
    const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
        defaultperfil, //Campos del formulario
        mode: "all",
        resolver: yupResolver(schemaPerfil), //Esquema del formulario
    });

     //Validacion de campos vacios y errores
    const { isValid, dirtyFields, errors } = formState;

    //Datos del formulario
    const datosWatch = watch(formState);

    const schemaPassword = yup.object().shape({
      password: yup
        .string()
        .required('Ingresa tu nueva contraseña.')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@/#\$%\^&\*])(?=.{8,})/,
          "Al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial"
        )
        .min(8, 'Contraseña invalida - La contraseña debe tener al menos 8 caracteres.'),
      passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no son iguales'),
    });

    const defaultValuesPassword = {
      password: '',
      passwordConfirm: '',
    };

    const { control: controlPassword, formState: formStatePassword, watch: watchPassword, handleSubmit: handleSubmitPassword, reset: resetPassword } = useForm({
      mode: 'all',
      defaultValuesPassword,
      resolver: yupResolver(schemaPassword),
    });
  
    const { isValid: isValidPassword, dirtyFields: dirtyFieldsPassword, errors: errorsPassword } = formStatePassword;

    const datosWatchPassword = watchPassword();

    const EditarClave = () => {
      reset(defaultperfil);
      setmostrarIndex(!mostrarIndex);
      setmostrarCambiarClave(!mostrarCambiarClave);
    }

    const RegresarAlPerfil = () => {
      setmostrarCambiarClave(!mostrarCambiarClave);
      setmostrarIndex(!mostrarIndex);
      reset(defaultperfil);
      resetPassword(defaultValuesPassword); 
      setDeshabilitar(false);
      setDeshabilitar2(true);
    }

    const RegresarAlPerfil2 = () => {
      setmostrarCambiarClave2(!mostrarCambiarClave2);
      setmostrarIndex(!mostrarIndex);
      reset(defaultperfil);
      resetPassword(defaultValuesPassword);
    }


    async function onSubmitPassword() {
      if(isValidPassword){
        const res = await perfilServices.CambiarContrasenia(datosWatchPassword.passwordConfirm)
        if(res === 1){
          ToastSuccessPersonalizado('Contraseña reestablecida exitosamente')
          reset(defaultperfil);
          reset(defaultValuesPassword);
          setTimeout(() => {
            RegresarAlPerfil2();
            JwtService.logout();
            ToastDefault('Sesión cerrada')
          }, "1000");
        }else if( res === 0){
          ToastErrorPersonalizado("La contraseña no pudo ser editada")
        }
      }else{
        ToastWarning()
      }
      
    }

    const Cargar = async () =>{
      const response = await perfilServices.ValidarClave(datosWatch.contraseña);
      return response.data.code
    }

    const ConfirmarClave = async () => {
      if (isValid) {
        const clave = await Cargar();
        if(clave === 200){
          setDeshabilitar(true);
          setDeshabilitar2(false);
          
        }
        else{
          ToastErrorPersonalizado("La contraseña ingresada no es correcta");
        }
      } else {
        ToastWarning();
      }
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async() => {
            setimage(reader.result)
            const response = await perfilServices.CambiarPerfil(reader.result);
            if (response.data.data.messageStatus === "1") {
              ToastSuccessPersonalizado("La imagen se ha guardado exitosamente");
            }
            else{
              ToastErrorPersonalizado("No se ha podido procesar el cambio de imagen");
            }
          };   
        } else {
          ToastWarningPersonalizado("Archivo incorrecto");
        }
      };

      

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      
      <Collapse in={mostrarIndex}>
      <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative", // Set position to relative
            }}
          >
            
            <Grid container spacing={3}>
            <Grid item  xs={6} style={{ marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", }} >
                <div className="little-profilePhynomo text-center">
                  <div
                    className="pro-img"
                    style={{
                      marginTop: "0",
                      width: "300px",
                      height: "300px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                      borderRadius: '50%'
                    }}
                  >{image == null ? (
                    <img
                      src="https://i.ibb.co/RTnx082/kisspng-computer-icons-user-clip-art-user-5abf13db298934-2968784715224718991702.jpg"
                      alt="user"
                    />
                  ) : (
                    <Image
                      width={300}
                      style={{
                        marginTop: "0",
                        width: "400px",
                        height: "300px",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                        borderRadius: '50%'
                      }}
                      src={image}
                    />
                  )}
                  </div>
                  <br />
                  <Typography className="text-5xl font-semibold tracking-tight leading-8" style={{marginBottom: "10px"}}>
                  {user.data['displayName']}
                  </Typography>
                  
                  <hr size="5"/>
                  <Button
                    //startIcon={<Icon>edit</Icon>}
                    endIcon={<Icon>edit</Icon>}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                      
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    ㅤㅤCambiar foto de perfilㅤ
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </Grid>

              <Grid item xs={5} style={{ marginTop: "50px" }}>
                
                <Grid container spacing={3}>
                  
                  {/* Etiqueta "Nuevo Usuario" */}
                    <Grid item xs={12} style={{textAlign: "left"}}>
                    <Grid style={{justifyContent: "center", alignItems: "center"}}>
                      <Typography className="text-3xl font-semibold tracking-tight leading-8">
                        <Icon style={estilosTablaDetalles.iconStyle}>person</Icon> Nombre </Typography>
                    </Grid>
                      <FormControl fullWidth >
                          <TextField    
                          size="normal"
                          value={user["Empleado"]}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                          />
                          </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{marginTop: "7px",textAlign: "left"}}>
                    <Grid style={{justifyContent: "center", alignItems: "center"}}>
                      <Typography className="text-3xl font-semibold tracking-tight leading-8">
                      <Icon style={estilosTablaDetalles.iconStyle}>workoutlineoutlined</Icon> Rol </Typography>
                    </Grid>
                    <FormControl fullWidth >
                      <TextField 
                        size="normal"
                        value={user['rolDesc']}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                      </FormControl>
                    </Grid>


                    <Grid item xs={12} style={{marginTop: "7px",textAlign: "left"}}>
                    <Grid style={{justifyContent: "center", alignItems: "center"}}>
                      <Typography className="text-3xl font-semibold tracking-tight leading-8">
                      <Icon style={estilosTablaDetalles.iconStyle}>email</Icon> Correo Electrónico </Typography>
                    </Grid>
                    <FormControl fullWidth >
                      <TextField 
                        size="normal"
                        value={user['correo']}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                      </FormControl>
                    </Grid>


                    <Grid item xs={12} style={{marginTop: "7px",textAlign: "left"}}>

                      <Grid style={{justifyContent: "center", alignItems: "center"}}>
                      <Typography className="text-3xl font-semibold tracking-tight leading-8">
                      <Icon style={estilosTablaDetalles.iconStyle}>lock</Icon>
                        Contraseña</Typography>
                        <FormControl fullWidth >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            borderRadius: "10px",
                            marginTop: "10px",
                          }}
                          sx={{
                            backgroundColor: "#634A9E",
                            color: "white",
                            "&:hover": { backgroundColor: "#6e52ae" },
                          }}
                          onClick={EditarClave}
                        >
                          Cambiar contraseña
                        </Button>
                        </FormControl>
                        </Grid>
                        
                    </Grid>

                    
                </Grid>
                
              </Grid>
            </Grid>

          </CardContent>
      </Collapse>
      

      <Collapse in={mostrarCambiarClave}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", }} >

            <Grid container spacing={3}>

              <Grid item xs={12} style={{ marginBottom: "30px" }}>
                <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                  <Chip label="Cambiar contraseña" />
                </Divider>
              </Grid>
              
              <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               
                <Grid item xs={8}>
                <Grid style={{justifyContent: "center", alignItems: "center"}}>
                      <FormLabel error={!!errors.contraseña}>Contraseña actual</FormLabel>
                    </Grid>
                      <FormControl fullWidth >
                      <Controller
                          render={({ field }) => (
                            <TextField  
                              {...field}
                              disabled={Deshabilitar}
                              placeholder="Ingrese su contraseña actual"
                              variant="outlined"
                              error={!!errors.contraseña}
                              size="normal"
                            />
                          )}
                          name="contraseña"
                          control={control}
                        />
                      </FormControl>
                    </Grid>
                  
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: "10px" }} >
              <Grid item xs={2}>
                    <FormControl fullWidth>
                        <Button
                          variant="contained"
                          aria-label="Register"
                          style={{ borderRadius: '10px', marginLeft: '10px' }}
                          sx={{
                            backgroundColor: '#634A9E', color: 'white',
                            "&:hover": { backgroundColor: '#6e52ae' },
                            height: '100px',
                          }}
                          type="submit"
                          onClick={ConfirmarClave}
                        >
                          Continuar
                        </Button>
                        </FormControl>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>  

              {/* <form onSubmit={handleSubmitPassword(onSubmitPassword)}> */}
              <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               
               <Grid item xs={8}>
               <Grid style={{justifyContent: "center", alignItems: "center"}}>
                    <FormLabel error={!!errorsPassword.password}>Nueva contraseña</FormLabel>
              </Grid>
               <FormControl fullWidth>
                  <Controller
                    name="password"
                    control={controlPassword}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        disabled={Deshabilitar2}
                        placeholder="Ingrese su nueva contraseña"
                        error={!!errorsPassword.password}
                        helperText={errorsPassword?.password?.message}
                        variant="outlined"
                        required
                      />
                    )}
                  />
                  </FormControl>
               </Grid>
               </Grid>

               <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               
               <Grid item xs={8}>
                <Grid style={{justifyContent: "center", alignItems: "center"}}>
                  <FormLabel error={!!errorsPassword.passwordConfirm}>Confirmar Contraseña</FormLabel>
                </Grid>
                <FormControl fullWidth>
                          <Controller
                            name="passwordConfirm"
                            control={controlPassword}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                type="password"
                                disabled={Deshabilitar2}
                                placeholder="Confirme su nueva contraseña"
                                error={!!errorsPassword.passwordConfirm}
                                helperText={errorsPassword?.passwordConfirm?.message}
                                variant="outlined"
                                required
                              />
                            )}
                          />
                    </FormControl>
                </Grid>
               </Grid>

               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: "10px" }} >
                    <Button
                          variant="contained"
                          aria-label="Register"
                          style={{ borderRadius: '10px', marginRight: '10px' }}
                          sx={{
                            backgroundColor: '#634A9E', color: 'white',
                            "&:hover": { backgroundColor: '#6e52ae' },
                          }}
                          type="submit"
                          disabled={Deshabilitar2}
                          onClick={onSubmitPassword}
                        >
                          Guardar contraseña
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
                      onClick={RegresarAlPerfil}
                    >
                      Cancelar
                      </Button>
              </Grid>
                {/* </form> */}

            {/* <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
              <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               
              <Grid item xs={8}>
                  <FormControl fullWidth>
                    <FormLabel error={!!errorsPassword.password}>Contraseña</FormLabel>
                  <Controller
                    name="password"
                    control={controlPassword}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        error={!!errorsPassword.password}
                        helperText={errorsPassword?.password?.message}
                        variant="outlined"
                        required
                      />
                    )}
                  />
                  </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  
                  <Grid item xs={8} >
                    <FormControl fullWidth>
                      <FormLabel error={!!errorsPassword.passwordConfirm}>ConfirmarContraseña</FormLabel>
                        <Controller
                          name="passwordConfirm"
                          control={controlPassword}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              type="password"
                              error={!!errorsPassword.passwordConfirm}
                              helperText={errorsPassword?.passwordConfirm?.message}
                              variant="outlined"
                              required
                            />
                          )}
                        />
                  </FormControl>
                  </Grid>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: "10px" }} >
                    <Button
                          variant="contained"
                          aria-label="Register"
                          style={{ borderRadius: '10px', marginRight: '10px' }}
                          sx={{
                            backgroundColor: '#634A9E', color: 'white',
                            "&:hover": { backgroundColor: '#6e52ae' },
                          }}
                          disabled={_.isEmpty(dirtyFieldsPassword) || !isValidPassword}
                          type="submit"
                          onClick={ConfirmarClave}
                        >
                          Guardar contraseña
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
                      onClick={RegresarAlPerfil}
                    >
                      Cancelar
                      </Button>
              </Grid>

            </form> */}
            </Grid>

          </CardContent>
      </Collapse>


{/* 
      <Collapse in={mostrarCambiarPerfil}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", }} >

            <Grid container spacing={3}>

              <Grid item xs={12} style={{ marginBottom: "30px" }}>
                <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                  <Chip label="Cambiar contraseña" />
                </Divider>
              </Grid>
              

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              
              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8', color: 'black',
                  "&:hover": { backgroundColor: '#BFBABA' },
                }}
                onClick={RegresarAlPerfil}
              >
                Cancelar
              </Button>
            </Grid>


            </Grid>

          </CardContent>
      </Collapse> */}

     
    </Card>
  );
}

export default PerfilIndex;




