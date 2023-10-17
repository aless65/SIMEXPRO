import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import DashboardService from '../DashboardAduanasService';

function RegimenesAduaneros(props) {
  const theme = useTheme();

  const [data, setData] = useState([]);

  useEffect(() => {
    getserie();
  }, []);

  const seriesTotal = data.map((item) => item.cantidad);
  const labels = data.map((item) => item.label);

  const getserie = async () => {
    try {
      const dashboardService = DashboardService();
      const datos = await dashboardService.RegimenesAduaneros_CantidadPorcentaje();
      setData(datos);
    } catch (error) {
      
    }
  };

  const series = [
    {
      name: 'Cantidad',
      data: seriesTotal,
    },
  ];
  const customPalette = [
    '#6a2b85',
    '#FF5733',
    '#FFC300',
    '#33FF57',
    '#33FFC7',
    '#5733FF',
    '#C733FF',
    '#33A1FF',
    '#A633FF',
    '#33FFD6',
  ];

  const chartOptions = {
    chart: {
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: 300,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontFamily: 'inherit',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '14px',
              fontFamily: 'inherit',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter(val) {
                return val;
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600,
              color: theme.palette.text.primary,
              formatter(w) {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return total;
              },
            },
          },
        },
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
    labels,
  };

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
      <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
        Regimenes Aduaneros más usados
      </Typography>
      <div className="flex flex-col flex-auto">
        <ReactApexChart
          className="flex-auto w-full h-320"
          options={chartOptions}
          series={seriesTotal}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
    </Paper>
  );
}

export default RegimenesAduaneros;
