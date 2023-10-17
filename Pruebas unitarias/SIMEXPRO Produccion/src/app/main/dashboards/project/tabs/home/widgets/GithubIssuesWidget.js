/* eslint-disable react-hooks/exhaustive-deps */
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import DashboardService from '../../../DashboardService';
import { selectWidgets } from '../../../store/widgetsSlice';

const GithubIssuesWidget = () => {
  const theme = useTheme();
  const [awaitRender, setAwaitRender] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const widgets = useSelector(selectWidgets);
  const { overview, ranges, labels } = widgets?.githubIssues;
  const currentRange = Object.keys(ranges)[tabValue];

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [customData, setcustomData] = useState([]);
  const [Pendientes, setPendientes] = useState([]);
  const [Entregadas, setEntregadas] = useState([]);
  
  const [Tiempo, setTiempo] = useState('');

  const series = [
    {
      name: 'Ordenes de Compra Ingresadas',
      data: customData.map((item) => item.orco_Conteo),
    },
  ];
  const fechas = customData.map((item) => item.fecha);

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
      const result = await dashboardService.ContadorOrdenesCompraPorEstado();
      const result2 = await dashboardService.TotalOrdenesCompraDiario();
      const resultPendientesTerminadas = await dashboardService.OrdenenesEntregadasPendientes_Semanal();
  
      const pendientes = resultPendientesTerminadas[0] || { orco_Conteo: 0 };
      const entregadas = resultPendientesTerminadas[1] || { orco_Conteo: 0 };
  
      setPendientes(pendientes);
      setEntregadas(entregadas);
  
      setData(result[0]);
      setData2(result[1]);
      setcustomData(result2);
      setTiempo('esta Semana');
    } catch (error) {
      
    }
  };
  
  const cambiodatosMes = async () => {
    try {
      const dashboardService = DashboardService();
      const result2 = await dashboardService.TotalOrdenesCompraMensual();
      const resultPendientesTerminadas =
        await dashboardService.OrdenenesEntregadasPendientes_Mensual();
  
      const pendientes = resultPendientesTerminadas[0] || { orco_Conteo: 0 };
      const entregadas = resultPendientesTerminadas[1] || { orco_Conteo: 0 };
      setPendientes(pendientes);
      setEntregadas(entregadas);
      setcustomData(result2);
      setTiempo('este Mes');
    } catch (error) {
      
    }
  };

  const cambiodatosAnual = async () => {
    try {
      const dashboardService = DashboardService();
      const result2 = await dashboardService.TotalOrdenesCompraAnual();
      const resultPendientesTerminadas =
        await dashboardService.OrdenenesEntregadasPendientes_Anual();
  
      const pendientes = resultPendientesTerminadas[0] || { orco_Conteo: 0 };
      const entregadas = resultPendientesTerminadas[1] || { orco_Conteo: 0 };
  
      setPendientes(pendientes);
      setEntregadas(entregadas);
      setcustomData(result2);
      setTiempo('este Año');
    } catch (error) {
      
    }
  };
  
  const chartOptions = {
    chart: {
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'line', // Cambiado a un gráfico de líneas
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
      categories: fechas, // Aquí configuramos las fechas como etiquetas en el eje X
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
          Gráfico Ordenes de Compra {Tiempo}
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
            // ... (Tab styling)
          >
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Esta Semana"
              value={0} // Establece el valor a 0 para que esté seleccionado por defecto
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
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
        <div className="flex flex-col flex-auto">
          <div className="flex flex-col flex-auto">
            <ReactApexChart
              className="flex-auto w-full"
              options={chartOptions}
              series={series}
              height={320}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Typography className="font-medium" color="text.secondary">
            Ordenes de Compra Totales
          </Typography>
          <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-red-50 text-red-800">
              <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                {Pendientes.orco_Conteo}
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">Pendientes</Typography>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
              <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                {Entregadas.orco_Conteo > 0 ? Entregadas.orco_Conteo : 0}
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">Entregadas</Typography>
            </div>
          </div>
        </div>
      </div>
      <Typography className="text-lg font-medium text-amber-600">‎ </Typography>
      <Typography className="text-lg font-medium text-amber-600">‎ </Typography>
    </Paper>
  );
};

export default React.memo(GithubIssuesWidget);
