import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import DashboardService from '../DashboardAduanasService';

function EstadosMercancias_CantidadPorcentaje(props) {
  const theme = useTheme();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardService = DashboardService();
        const result = await dashboardService.EstadosMercancias_CantidadPorcentaje();
        setData(result);
      } catch (error) {
        
      }
    };

    fetchData();
  }, []);

  const labels = data.map((item) => item.merc_Descripcion);
  const series = [
    {
      name: 'Porcentaje',
      data: data.map((item) => item.porcentaje),
    },
    {
      name: 'Cantidad',
      data: data.map((item) => item.cantidad),
    },
  ];
  const customPalette = [
    '#6a2b85',
    '#e6971b',
    '#61C0BF',
    '#e2d968',
    '#31A2AC',
    '#FFDDC1',
    '#FFABAB',
    '#FFC3A0',
    '#FF677D',
    '#D4A5A5',
    '#392F5A',
    '#6B4226',
    '#D9BF77',
    '#ACD8AA',
    '#FFE156',
    '#6A0572',
    '#AB83A1',
    '#FDCFBF',
    '#D4F2DB',
    '#1A535C',
    '#4ECDC4',
    '#F7FFF7',
    '#FF6B6B',
  ];
  const chartOptions = {
    chart: {
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: 300,
      type: 'line',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      line: {
        horizontal: true,
        lineHeight: '80%',
        distributed: true,
        borderRadius: 0,
      },
    },
    theme: {
      monochrome: {
        enabled: false,
        color: theme.palette.primary.main,
      },
    },
    colors: customPalette,
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val) => `${val}`,
      },
    },
    xaxis: {
      categories: labels,
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        radius: 12,
      },
      fontFamily: 'inherit',
      fontSize: '14px',
      fontWeight: 500,
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
      <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
        Estados de Mercancia más recibidos
      </Typography>

      <div className="flex flex-col flex-auto">
        <ReactApexChart
          className="flex-auto w-full h-320"
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
    </Paper>
  );
}

export default EstadosMercancias_CantidadPorcentaje;
