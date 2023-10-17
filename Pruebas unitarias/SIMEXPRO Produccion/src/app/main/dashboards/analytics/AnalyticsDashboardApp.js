/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Box, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticsDashboardAppHeader from './AnalyticsDashboardAppHeader';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import AduanasIngreso_CantidadPorcentaje from './widgets/AduanasIngreso_CantidadPorcentaje';
import EstadosMercancias_CantidadPorcentaje from './widgets/EstadosMercancias_CantidadPorcentaje';
import PaisesMasExportadores from './widgets/PaisesMasExportadores';
import Importaciones from './widgets/Importaciones';
import TratadosMasUsados from './widgets/TratadosMasUsados';
import Semaforo from './widgets/Semaforo';
// import ExportadoresPorPais_CantidadPorcentaje from './widgets/ExportadoresPorPais_CantidadPorcentaje';
// import RegimenesAduaneros from './widgets/RegimenesAduaneros';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

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

function AnalyticsDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const sameHeightVariants = {
    hidden: { height: '100%' },
    show: { height: '100%' },
  };

  return (
    <Root
      content={
        <div>
          <div className="flex justify-center">
            <Tabs
              className="mx-auto"

              sx={{ display: 'flex' }}
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{
                style: {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  height: '1.8cm',
                  borderRadius: '20px',
                },
              }}
            >
              <Tab
                label="Inicio"
                {...a11yProps(0)}
                sx={{
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 'bold',
                  },
                  margin: 'inherit',
                  padding: '10px 16px',
                }}
                className="text-center"
              />
              <Tab
                label="Gráficas"
                {...a11yProps(1)}
                sx={{
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 'bold',
                  },
                  margin: 'inherit',
                  padding: '10px 16px',
                }}
                className="text-center"
              />
            </Tabs>
          </div>

          <TabPanel value={selectedTab} index={0} dir={theme.direction}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <motion.div variants={sameHeightVariants} style={{ height: '100%' }} className="">
                  <Semaforo />
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <motion.div variants={sameHeightVariants} style={{ height: '100%' }} className="">
                  <TratadosMasUsados />
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={12} md={8}>
                <motion.div variants={sameHeightVariants} className="">
                  <Importaciones />
                </motion.div>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={selectedTab} index={1} dir={theme.direction}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <motion.div variants={sameHeightVariants} className="">
                  <AduanasIngreso_CantidadPorcentaje />
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <motion.div variants={sameHeightVariants} className="">
                  <PaisesMasExportadores />
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <motion.div variants={sameHeightVariants} className="">
                  <EstadosMercancias_CantidadPorcentaje />
                </motion.div>
              </Grid>
            </Grid>
          </TabPanel>
        </div>
      }
    />
  );
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
