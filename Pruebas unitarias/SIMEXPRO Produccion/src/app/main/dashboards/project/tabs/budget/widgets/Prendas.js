import { FormControl, MenuItem, Select } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import EstilosService from 'src/app/Prendas/Estilos/EstilosService';

import FormLabel from '@mui/material/FormLabel';

import DashboardService from '../../../DashboardService';

function Prendas(props) {
  const theme = useTheme();

  const [data, setData] = useState([]);
  const [ddl, setDdl] = useState([]);
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    prendadata(selectedId);
    ddlget();
  }, [selectedId]);

  const seriesTotal = data.map((item) => item.prendasSumatoria);
  const labels = data.map((item) => item.esti_Descripcion);

  const prendadata = async (esti_Id) => {
    setSelectedId(esti_Id);
    try {
      const dashboardService = DashboardService();
      const datos = await dashboardService.PrendasPedidas(esti_Id);
      setData(datos);
    } catch (error) {
      
    }
  };

  const ddlget = async () => {
    try {
      const estilosService = EstilosService();
      const datos = await estilosService.listar();
      setDdl(datos);
    } catch (error) {
      
    }
  };

  const series = [
    {
      name: 'Cantidad Producida',
      data: seriesTotal,
    },
  ];
  const customPalette = [
    '#6a2b85', // Rojo rosado
    '#FF5733', // Naranja
    '#FFC300', // Amarillo
    '#33FF57', // Verde claro
    '#33FFC7', // Turquesa
    '#5733FF', // Azul púrpura
    '#C733FF', // Púrpura
    '#33A1FF', // Azul claro
    '#A633FF', // Violeta
    '#33FFD6', // Verde menta
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
        Prendas en Ordenes de Compra
      </Typography>
      <FormControl fullWidth>
        <FormLabel className="mt-5">Estilo</FormLabel>
        <Select
          size="small"
          value={selectedId}
          onChange={(event) => prendadata(event.target.value)}
        >
          {ddl.map((item) => (
            <MenuItem key={item.esti_Id} value={item.esti_Id}>
              {item.esti_Descripcion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default Prendas;
