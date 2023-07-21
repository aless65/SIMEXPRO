import * as React from 'react';
import {
  Card,
  Button,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  Grid,
  Icon
} from '@mui/material';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function FormularioConTabs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);
  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
  });
  const [formFields, setFormFields] = useState({
    name: '',
    age: '',
    email: '',
    address: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    console.log(formFields.name);
  };

  const showEmptyError = () => {
    if(formFields.name == ''){
      setError(true);
    }
  }

  const handleTabChange = (event, newValue) => {

  };

  const submitTab0 = (data) => {
    var errorsCount = 0;
    if(isEmpty(formFields.name)){
      errorsCount++;
    }

    if(errorsCount == 0){
      console.log('Todo bien');
      validacion(1);
    }
  };

  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params === 1) {
      settabsEstado({
        tab1: false,
      });
      setValue(1);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 2 }}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Tab 1" {...a11yProps(0)}/>
          <Tab label="Tab 2" {...a11yProps(1)} disabled={tabsEstado.tab1}/>
        </Tabs>
      </AppBar>

      <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}      
      >
          <TabPanel value={value} index={0} dir={theme.direction}>

          <Grid sx={12}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={formFields.name}
              onChange={handleInputChange}
              onBlur={showEmptyError}
              name="name"
              error={error}
            />

            <TextField
              label="Edad"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
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
                    onClick={submitTab0}
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
                    navigate('/Contrato-de-Adhesion-Persona-Natural/Index');
                  }}
                >
                  Cancelar
              </Button>
          </Box>

          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>

                <TextField
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  label="Dirección"
                  variant="outlined"
                  fullWidth
                />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
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
                    onClick={submitTab0}
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
                    navigate('/Contrato-de-Adhesion-Persona-Natural/Index');
                  }}
                >
                  Cancelar
              </Button>
            </Box>
          </TabPanel>

      </SwipeableViews>
    </Card>
  );
}

export default FormularioConTabs;
