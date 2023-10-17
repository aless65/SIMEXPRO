import { yupResolver } from "@hookform/resolvers/yup";
import { Collapse } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import jwtService from "../../auth/services/jwtService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { InputAdornment } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import SignInService from "./SignInService";
// import { CircularProgress } from "@mui/material";
import "src/styles/spinnerLogin.css";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
  ToastErrorPersonalizado,
} from "src/styles/toastsFunctions";
import { toast } from "react-toastify";
import { FormLabel } from "@mui/material";

/**
 * Form Validation Schema
 */

//Toasts

const schema = yup.object().shape({
  email: yup.string().required("You must enter a email"),
  password: yup.string().required("Please enter your password."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

const schemaUser = yup.object().shape({
  user: yup.string().required("Ingresa tu usuario"),
});

const defaultValuesUser = {
  user: "",
};

const schemaToken = yup.object().shape({
  token: yup.string().required("Ingresa tu token"),
});

const defaultValuesToken = {
  token: "",
};

const schemaPassword = yup.object().shape({
  password: yup
    .string()
    .required("Ingresa tu nueva contraseña.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@/#\$%\^&\*])(?=.{8,})/,
      "Al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial"
    )
    .min(
      8,
      "Contraseña invalida - La contraseña debe tener al menos 8 caracteres."
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no son iguales"),
});

const defaultValuesPassword = {
  password: "",
  passwordConfirm: "",
};

function SignInPage() {
  const signInService = SignInService();
  const [reToken, setReToken] = useState(false);

  const [dataReset, setDataReset] = useState({});
  const [collapLogin, setCollapLogin] = useState(true);
  const [collapUser, setCollapUser] = useState(false);
  const [userfind, setUserfind] = useState(false);
  const [timer, setTimer] = useState();
  const [reTokenClic, setReTokenClic] = useState(1);
  const [collapToken, setCollapToken] = useState(false);
  const [collapPassword, setCollapPassword] = useState(false);
  const [logButton, setLogButton] = useState(false);

  const { control, formState, handleSubmit, setError, watch, setValue } =
    useForm({
      mode: "all",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { isValid, dirtyFields, errors } = formState;

  const {
    control: controlUser,
    formState: formStateUser,
    handleSubmit: handleSubmitUser,
    reset: resetUser,
  } = useForm({
    mode: "all",
    defaultValuesUser,
    resolver: yupResolver(schemaUser),
  });

  const {
    isValid: isValidUser,
    dirtyFields: dirtyFieldsUser,
    errors: errorsUser,
  } = formStateUser;

  const {
    control: controlToken,
    formState: formStateToken,
    handleSubmit: handleSubmitToken,
    reset: resetToken,
    watch: watchToken,
  } = useForm({
    mode: "all",
    defaultValuesToken,
    resolver: yupResolver(schemaToken),
  });
  const modeloToken = watchToken();
  const {
    isValid: isValidToken,
    dirtyFields: dirtyFieldsToken,
    errors: errorsToken,
  } = formStateToken;

  const {
    control: controlPassword,
    formState: formStatePassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
  } = useForm({
    mode: "all",
    defaultValuesPassword,
    resolver: yupResolver(schemaPassword),
  });

  const {
    isValid: isValidPassword,
    dirtyFields: dirtyFieldsPassword,
    errors: errorsPassword,
  } = formStatePassword;

  const Image = "https://i.ibb.co/DVgPnbS/fondo.png";
  // useEffect(() => {
  //   setValue("email", "juan", { shouldDirty: true, shouldValidate: true });
  //   setValue("password", "123", { shouldDirty: true, shouldValidate: true });
  // }, [setValue]);

  function onSubmit({ email, password }) {
    try {
      setLogButton(true);
      if (
        (email || email.trim().length !== 0) &&
        (password || password.trim().length !== 0)
      ) {
        jwtService
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            // window.location.href = user.loginRedirectUrl;
            setLogButton(false);
            location.reload();
            return
            // No need to do anything, user data will be set at app/auth/AuthContext
          })
          .catch((_errors) => {
            setLogButton(false);
            if (
              _errors.data["message"] ==
              "El usuario o contraseña son incorrectos"
            ) {
              ToastErrorPersonalizado(
                "El usuario o contraseña son incorrectos"
              );
            } else {
              ToastErrorPersonalizado("No se pudo iniciar sesión");
            }
            return
          });
      } else {
        setLogButton(false);
        ToastWarning();
        return
      }
    } catch (err) {
      return
      // setLogButton(false);
    } 
    // setLogButton(false);
    // ToastErrorPersonalizado("No se pudo establecer conexion")

  }

  const onSubmitUser = async (user) => {
    try {
      setLogButton(true);

      const response = await signInService.EnviarCorreo(user["user"]);
      if (response["token"]) {
        ToastSuccess("Correo enviado");
        setCollapUser(false);
        setCollapToken(true);
        setDataReset(response);
      } else if (
        response.response?.data?.message == "El usuario no está disponible"
      ) {
        ToastError("El usuario ingrsado no existe");
        setUserfind(true);
      } else if (response === -1) {
        ToastError("No servicio de correos no ha respondido");
      } else {
        ToastError("Error inesperado");
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  const data = watch();

  const Validar = () => {
    if (
      !data.email ||
      data.email.trim().length === 0 ||
      !data.password ||
      data.password.trim().length === 0
    ) {
      ToastWarning("Campos vacios");
    }
  };

  async function reenviarToken() {
    try {
      setReToken(true);
      const response = await signInService.ReenviarCorreo(dataReset);
      if (response["token"]) {
        ToastSuccess("Token reenviado");
        setDataReset(response);
      } else if (response === -1) {
        ToastError("No servicio de correos no ha respondido");
      } else {
        ToastError("Error inesperado");
      }
    } catch (err) {
      ToastError("Error inesperado");
    } finally {
      setTimeout(function () {
        setReToken(false);
      }, 15000 * reTokenClic);
      setReTokenClic(reTokenClic + 1);
      for (let index = (15000 * reTokenClic) / 1000; index >= 0; index--) {
        setTimeout(function () {
          setTimer((15000 * reTokenClic) / 1000 - index);
        }, 1000 * index);
      }
    }
  }

  function onSubmitToken(token) {
    if (token["token"].toUpperCase() == dataReset["token"]) {
      setCollapToken(false);
      setCollapPassword(true);
    } else {
      ToastError("Token erroneo");
    }
  }

  async function onSubmitPassword(data) {
    const res = await signInService.CambiarContrasenia(dataReset, data);
    if (res === 1) {
      ToastSuccess("Contraseña reestablecida exitosamente");
      setCollapPassword(false);
      setCollapLogin(true);
    } else if (res === 0) {
      ToastError("ups... Tu contraseña no puedo ser editada");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1 ">
        <div className="w-full max-w-400 sm:w-400 mx-auto sm:mx-0">
          <Collapse in={collapLogin}>
            <Typography
              style={{
                textAlign: "center",
                color: "#9452F9",
                fontSize: "40px",
              }}
              className="mt-32 text-4xl font-extrabold tracking-tight leading-tight"
            >
              INICIO DE SESIÓN
            </Typography>

            <div
              style={{ textAlign: "center" }}
              className="flex items-baseline mt-2 font-medium"
            >
              <Typography style={{ fontSize: "20px" }}>
                Ingrese su usuario y contraseña para iniciar sesión
              </Typography>
            </div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Usuario"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    // helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Contraseña"
                    type="password"
                    error={!!errors.password}
                    // helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end">
                {/* <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel
                        label="Recuérdame"
                        control={<Checkbox size="small" {...field} />}
                      />
                    </FormControl>
                  )}
                /> */}
                <Link
                  className="text-md font-medium"
                  onClick={() => {
                    setCollapLogin(false);
                    setCollapUser(true);
                  }}
                >
                  ¿Contraseña olvidada?
                </Link>
              </div>

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-16"
                aria-label="Sign in"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
                disabled={logButton}
                onClick={Validar}
              >
                {logButton ? (
                  <>
                    {" "}
                    <p style={{ color: "#8b53fa" }}>SIME</p>{" "}
                    <span class="loaderLogin"></span>{" "}
                    <p style={{ color: "#ddc561" }}>PRO</p>{" "}
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>
          </Collapse>
          <Collapse in={collapUser}>
            <img
              className="h-40"
              src="https://i.ibb.co/HgdBM0r/slogan.png"
              alt="logo"
            />

            <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
              ¿Contaseña olvidada?
            </Typography>
            <div className="flex items-baseline mt-2 font-medium">
              <Typography>Completa el formulario para recuperarla</Typography>
            </div>

            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmitUser(onSubmitUser)}
            >
              <FormLabel error={!!errorsUser.user}>Usuario</FormLabel>
              <Controller
                name="user"
                control={controlUser}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    type="email"
                    error={!!errorsUser.user || userfind}
                    helperText={errorsUser?.user?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-4"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFieldsUser) || !isValidUser}
                type="submit"
                size="large"
              >
                Enviar correo
              </Button>

              <Typography
                className="mt-32 text-md font-medium"
                color="text.secondary"
              >
                <span>Regresar al </span>
                <Link
                  className="text-md font-medium"
                  onClick={() => {
                    setCollapLogin(true);
                    setCollapUser(false);
                  }}
                >
                  Login
                </Link>
              </Typography>
            </form>
          </Collapse>
          <Collapse in={collapToken}>
            <img
              className="h-40"
              src="https://i.ibb.co/HgdBM0r/slogan.png"
              alt="logo"
            />

            <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
              Validar token
            </Typography>
            <div className="flex items-baseline mt-2 font-medium">
              <Typography>
                Se te fue enviado un token al correo:{" "}
                {dataReset["email"]
                  ? dataReset["email"].split("@")[0].substr(0, 4)
                  : null}
                *******@
                {dataReset["email"] ? dataReset["email"].split("@")[1] : null}
              </Typography>
            </div>

            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmitToken(onSubmitToken)}
            >
              <FormLabel error={!!errorsToken.token}>Token</FormLabel>
              <Controller
                name="token"
                control={controlToken}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    type="email"
                    error={!!errorsToken.token}
                    helperText={errorsToken?.token?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-4"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFieldsToken) || !isValidToken}
                type="submit"
                size="large"
              >
                Validar token
              </Button>

              <Typography
                className="mt-32 text-md font-medium flex justify-center"
                color="text.secondary"
              >
                <span>¿No has recibido tu token?</span>
              </Typography>
              <Typography
                className="text-md font-medium flex justify-center"
                color="text.secondary"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  // sx={{
                  //   backgroundColor: '#dcc265', color: 'white',
                  //   "&:hover": { backgroundColor: '#c2ac5f' },
                  // }}
                  className=" mt-4"
                  aria-label="Register"
                  disabled={modeloToken["token"] || reToken}
                  onClick={reenviarToken}
                  type="button"
                  size="small"
                >
                  Reenviar token {timer > 0 ? timer : null}
                </Button>
              </Typography>
            </form>
          </Collapse>
          <Collapse in={collapPassword}>
            <img
              className="h-40"
              src="https://i.ibb.co/HgdBM0r/slogan.png"
              alt="logo"
            />

            <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
              Reestablecer contraseña
            </Typography>
            <Typography className="font-medium">
              Ingresa la nueva contraseña de tu cuenta
            </Typography>

            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmitPassword(onSubmitPassword)}
            >
              <FormLabel error={!!errorsPassword.password}>
                Contraseña
              </FormLabel>
              <Controller
                name="password"
                control={controlPassword}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    type="password"
                    error={!!errorsPassword.password}
                    helperText={errorsPassword?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <FormLabel error={!!errorsPassword.passwordConfirm}>
                Contraseña (Confirmacion)
              </FormLabel>
              <Controller
                name="passwordConfirm"
                control={controlPassword}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    type="password"
                    error={!!errorsPassword.passwordConfirm}
                    helperText={errorsPassword?.passwordConfirm?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-4"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFieldsPassword) || !isValidPassword}
                type="submit"
                size="large"
              >
                Guardar contraseña
              </Button>

              {/* <Typography className="mt-32 text-md font-medium" color="text.secondary">
    <span>Return to</span>
    <Link className="ml-4" to="/sign-in">
      sign in
    </Link>
  </Typography> */}
            </form>
          </Collapse>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundImage: `url(${Image})` }}
        style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
      />
    </div>
  );
}

export default SignInPage;
