/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardService from '../DashboardAduanasService';

const Importaciones = () => {
  const theme = useTheme();
  const [awaitRender, setAwaitRender] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const [data, setData] = useState([]);

  const [Tiempo, setTiempo] = useState('');

  const series = [
    {
      name: 'Total de Importaciones',
      data: data.map((item) => item.cantidad),
    },
  ];
  const fechas = data.map((item) => item.fecha);

  useEffect(() => {
    const fetchData = async () => {
      try {
        cambiodatosSemana();
      } catch (error) {
        
      }
    };
    fetchData();
  }, []);

  const cambiodatosSemana = async () => {
    try {
      const dashboardService = DashboardService();
      const result = await dashboardService.Importaciones_Semana();
      setData(result);
      setTiempo('esta Semana');
    } catch (error) {
      
    }
  };

  const cambiodatosMes = async () => {
    try {
      const dashboardService = DashboardService();
      const result = await dashboardService.Importaciones_Mes();
      setData(result);
      setTiempo('este Mes');
    } catch (error) {
      
    }
  };

  const cambiodatosAnual = async () => {
    try {
      const dashboardService = DashboardService();
      const result = await dashboardService.Importaciones_Anio();
      setData(result);
      setTiempo('este Año');
    } catch (error) {
      
    }
  };

  const chartOptions = {
    chart: {
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
      background: {
        borderWidth: 0,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      line: {
        strokeWidth: 3,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.75,
        },
      },
    },
    stroke: {
      width: [3, 0],
    },
    tooltip: {
      followCursor: true,
      theme: theme.palette.mode,
    },
    xaxis: {
      categories: fechas,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        color: theme.palette.divider,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: -16,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    switch (newValue) {
      case 0:
        cambiodatosSemana();
        break;
      case 1:
        cambiodatosMes();
        break;
      case 2:
        cambiodatosAnual();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          Importaciones {Tiempo}
        </Typography>
        <div className="mt-12 sm:mt-0 sm:ml-8">
          <Tabs
            value={tabValue}
            onChange={handleTabChange} // Use the handleTabChange function here
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="-mx-4 min-h-40"
          >
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Esta Semana"
              value={0}
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Este Mes"
              value={1}
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Este Año"
              value={2}
            />
          </Tabs>
        </div>
      </div>
      <div className="flex flex-col flex-auto">
        <ReactApexChart
          className="flex-auto w-full"
          options={chartOptions}
          series={series}
          height={320}
        />
      </div>
    </Paper>
  );
};

export default React.memo(Importaciones);
