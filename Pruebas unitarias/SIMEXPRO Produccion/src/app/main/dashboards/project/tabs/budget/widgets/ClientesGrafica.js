import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import DashboardService from '../../../DashboardService';
import { selectWidgets } from '../../../store/widgetsSlice';

function BudgetDistributionWidget(props) {
  const widgets = useSelector(selectWidgets);
  const { categories } = widgets?.budgetDistribution;

  const theme = useTheme();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardService = DashboardService();
        const datos = await dashboardService.ClientesProductivos();
        setData(datos);
      } catch (error) {
        
      }
    };

    fetchData();
  }, []);

  const seriesTotal = data.map((item) => item.cantidadIngresos);

  const labels = data.map((item) => item.clie_Nombre_O_Razon_Social);
  const customPalette = [
    '#FF5733',
    '#FFC300',
    '#4CAF50',
    '#03A9F4',
    '#9C27B0',
    '#F44336',
    '#E91E63',
    '#2196F3',
    '#00BCD4',
    '#009688',
    '#FF9800',
    '#795548',
    '#607D8B',
    '#FF5722',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#607D8B',
    '#9E9E9E',
    '#03A9F4',
    '#FFC107',
    '#9C27B0',
    '#673AB7',
    '#009688',
  ];
  
  const chartOptions = {
    chart: {
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: 300,
      type: 'polarArea',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        polarArea: {
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
        Grafica de Clientes Rentables: Líderes de Ingresos
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

export default BudgetDistributionWidget;