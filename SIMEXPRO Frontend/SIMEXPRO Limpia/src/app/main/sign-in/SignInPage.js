import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import jwtService from '../../auth/services/jwtService';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Input } from "@material-tailwind/react";
import {InputAdornment } from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().required(''),
  password: yup
    .string()
    .required('')
});

const defaultValues = {
  email: '',
  password: '',
};

function SignInPage() {

  const Image = 'https://i.ibb.co/DVgPnbS/fondo.png';

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue('email', '', { shouldDirty: true, shouldValidate: false });
    setValue('password', '', { shouldDirty: true, shouldValidate: false });
  }, [setValue]);

  function onSubmit({ email, password }) {
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }

  return (
    
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1 ">   
       <div className="w-full max-w-400 sm:w-400 mx-auto sm:mx-0">

          <Typography style={{ textAlign: 'center', color: '#9452F9', fontSize:'40px' }} className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            INICIO DE SESIÓN
          </Typography>

          <div style={{ textAlign: 'center' }} className="flex items-baseline mt-2 font-medium" >
            <Typography style={{ fontSize:'20px'}}>Ingrese su usuario y contraseña para iniciar sesión</Typography>
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

                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">

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
                  className="mb-24 col-9"
                  label="Contraseña"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon  />
                      </InputAdornment>
                    ),
            
                  }}
            
                />
              )}
            />
              <Button
              variant="contained"

              aria-label=" Inicar Sesion"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              sx={{
                backgroundColor: '#9452F9',
                color: 'white',
                borderRadius: '5px',
                '&:hover': { backgroundColor: '#7b4ac6'},
              }}
            >
              Inicar Sesión
            </Button>


          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundImage: `url(${Image})` }} style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      >





      </Box>
    </div>
  );
}

export default SignInPage;
