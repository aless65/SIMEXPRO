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
        const resultGananciasSemanales = await dashboardService.ProductividadModulos();
        setData(resultGananciasSemanales);
      } catch (error) {
        
      }
    };

    fetchData();
  }, []);

  const seriesTotal = data.map((item) => item.totalProduccionDia);
  const seriesPorcentaje = data.map((item) => item.porcentajeProduccion);

  const labels = data.map((item) => item.modu_Nombre);
  const series = [
    {
      name: 'Cantidad Producida',
      data: seriesTotal,
    },
    {
      name: 'Porcentaje de Producción',
      data: seriesPorcentaje,
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
      type: 'bar',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        bar: {
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
    series: [
      {
        name: 'Cantidad Producida',
        data: seriesTotal,
      },
      {
        name: 'Porcentaje de Producción',
        data: seriesPorcentaje,
      },
    ],
  };

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
      <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
        Gráfica de Eficiencia Por Módulo
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

export default BudgetDistributionWidget;
