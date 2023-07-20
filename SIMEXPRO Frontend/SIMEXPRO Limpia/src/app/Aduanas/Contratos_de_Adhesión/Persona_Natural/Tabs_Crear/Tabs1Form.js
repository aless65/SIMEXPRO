/* eslint-disable camelcase */
import {
    CardMedia,
    CardContent,
    Card,
    Button,
    Chip,
    Divider,
    FormControl,
    Icon,
    TextField,
    Typography,
    Grid,
    AppBar,
    Tabs,
    Tab,
    Box,
    Avatar,
    InputAdornment,
} from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';

const tab1Fields = {
    rtn_solicitante: '',
    dni: '',
    numero_recibo_servicio_publico: '',
};
const schemaTab1Fields = yup.object().shape({
    rtn_solicitante: yup.string().required(),
    dni: yup.string().required(),
    numero_recibo_servicio_publico: yup.string().required(),
});


const Tab1Form = ({onTabChange}) => {
    const { handleSubmit, reset, control, formState } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaTab1Fields),
    });
    const { isValid, dirtyFields, errors } = formState;

    const handleNextTab = () => {
        onTabChange(null, 1);
    };

    return(
        <form onSubmit={handleSubmit()}>
        <Card style={{ marginBottom: '25px' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="RTN del Solicitante"
                      variant="outlined"
                      fullWidth
                      error={!!errors.rtn_solicitante}
                      style={{ borderRadius: '3px' }}
                      placeholder="RTN del Solicitante"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  )}
                  name="rtn_solicitante"
                  control={control}
                />
              </Grid>
              <Grid item xs={6}>
                <div className="flex w-full h-48">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col ml-5 pt-5 pb-6">
                      <Avatar
                        alt="PDF Img"
                        src="https://i.ibb.co/7Wfzw5H/pdf.png"
                        sx={{ height: '25px', width: '25px' }}
                        variant="rounded"
                      />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Subir Archivo PDF</span>
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </Grid>
    
              <Grid item xs={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Documento Nacional de Identificación (DNI)"
                      fullWidth
                      error={!!errors.dni}
                      style={{ borderRadius: '3px' }}
                      variant="outlined"
                      placeholder="Documento Nacional de Identificación (DNI)"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  )}
                  name="dni"
                  control={control}
                />
              </Grid>
              <Grid item xs={6}>
                <div className="flex w-full h-48">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col ml-5 pt-5 pb-6">
                      <Avatar
                        alt="PDF Img"
                        src="https://i.ibb.co/7Wfzw5H/pdf.png"
                        sx={{ height: '25px', width: '25px' }}
                        variant="rounded"
                      />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Subir Archivo PDF</span>
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </Grid>
    
              <Grid item xs={6}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Número Recibo de Servicio Público (ENEE, SANAA, etc.)"
                      variant="outlined"
                      fullWidth
                      error={!!errors.numero_recibo_servicio_publico}
                      style={{ borderRadius: '3px' }}
                      placeholder="Número Recibo de Servicio Público (ENEE, SANAA, etc.)"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  )}
                  name="numero_recibo_servicio_publico"
                  control={control}
                />
              </Grid>
              <Grid item xs={6}>
                <div className="flex w-full h-48">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col ml-5 pt-5 pb-6">
                      <Avatar
                        alt="PDF Img"
                        src="https://i.ibb.co/7Wfzw5H/pdf.png"
                        sx={{ height: '25px', width: '25px' }}
                        variant="rounded"
                      />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Subir Archivo PDF</span>
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
    
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
        >
          <Button
            startIcon={<Icon>checked</Icon>}
            variant="contained"
            color="primary"
            style={{ borderRadius: '10px', marginRight: '10px' }}
            sx={{
              backgroundColor: '#634A9E',
              color: 'white',
              '&:hover': { backgroundColor: '#6e52ae' },
            }}
        onClick={handleNextTab}
            type="button"
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Guardar
          </Button>
    
          <Button
            startIcon={<Icon>close</Icon>}
            variant="contained"
            color="primary"
            style={{ borderRadius: '10px' }}
            sx={{
              backgroundColor: '#DAD8D8',
              color: 'black',
              '&:hover': { backgroundColor: '#BFBABA' },
            }}
            onClick={() => {
              navigate('/Contrato-de-Adhesion/Persona-Natural');
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </form>
    );    
};


export default Tab1Form;