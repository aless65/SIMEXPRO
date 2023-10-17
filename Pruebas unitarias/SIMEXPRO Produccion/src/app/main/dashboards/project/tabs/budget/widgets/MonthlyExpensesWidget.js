import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import DashboardService from '../../../DashboardService';
import { selectWidgets } from '../../../store/widgetsSlice';

function MonthlyExpensesWidget() {
  const widgets = useSelector(selectWidgets);
  const { amount, labels } = widgets?.weeklyExpenses;
  const theme = useTheme();

  const [Ganancias, setGanancias] = useState([]);
  const [Promedio, setPromedio] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var totalIngresos = 0;
        const dashboardService = DashboardService();
        const resultGananaciasSemanales = await dashboardService.VentasMensuales();
        setGanancias(resultGananaciasSemanales);
        if(resultGananaciasSemanales.length != 0){
          resultGananaciasSemanales.forEach(element => {
            totalIngresos+=element.totalIngresos;
          });
        
    
          setPromedio(totalIngresos);
        }
          
        } catch (error) {
        
      }
    };

    fetchData();
  }, []);

  const series = [
    {
      name: 'Total Ingresos',
      data: Ganancias.map((item) => item.totalIngresos),
    },
  ];

  const chartOptions = {
    chart: {
      animations: {
        enabled: false,
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'line',
      sparkline: {
        enabled: true,
      },
    },
    colors: [theme.palette.success.main],
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      theme: 'dark',
    },
    xaxis: {
      type: 'category',
      categories: Ganancias.map((item) => [
        new Date(item.fechaReciente).toLocaleDateString(),
        new Date(item.fechaAntigua).toLocaleDateString()
      ]),
    },
  };

  
  const getMonthName = () => {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const currentMonth = new Date().getMonth();
    return months[currentMonth];
  };
  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="text-lg font-medium tracking-tight leading-6 truncate">
          {`Ingresos ${getMonthName()}`}
        </div>
        <div className="ml-8 -mt-8 -mr-12" />
      </div>
      <div className="flex items-center mt-4">
        <div className="flex flex-col">
          <div className="text-3xl font-semibold tracking-tight leading-tight">
          {Promedio.toLocaleString('es-HN', {
              style: 'currency',
              currency: 'HNL',
            })} 
          </div>
          <div className="flex items-center">
            <Typography className="font-medium text-sm text-secondary leading-none whitespace-nowrap">
              <span className="text-red-500">‎</span>
              <span>‎</span>
            </Typography>
          </div>
        </div>
        <div className="flex flex-col flex-auto ml-32">
          <ReactApexChart
            className="flex-auto w-full h-64"
            options={chartOptions}
            series={series}
            type={chartOptions.chart.type}
            height={chartOptions.chart.height}
          />
        </div>
      </div>
    </Paper>
  );
}

export default MonthlyExpensesWidget;
