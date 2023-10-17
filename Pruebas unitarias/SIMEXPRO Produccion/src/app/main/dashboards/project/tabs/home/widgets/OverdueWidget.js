import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardService from '../../../DashboardService'; // Asegúrate de la ruta correcta
import { selectWidgets } from '../../../store/widgetsSlice';

function OverdueWidget() {
  const widgets = useSelector(selectWidgets);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardService = DashboardService(); // Llama a la función para obtener el objeto
        const result = await dashboardService.ContadorOrdenesCompraPorEstado(); // Llama a la función en el objeto
        result.forEach((item, index) => {
          if (item.orco_Avance === 'Pendiente') {
            setData({ count: item.orco_Conteo });
          }
        });
      } catch (error) {
        
      }
    };

    fetchData();
  }, []);

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
    <Paper
      className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden relative" // Agregamos la clase "relative" para poder posicionar elementos dentro
      style={{
        width: '100%',
        backgroundImage: `url('https://i.pinimg.com/564x/40/3f/f0/403ff0df8eacf217c988cc5f6b175677.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundPositionY: '-90px',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      />

      <div className="text-center mt-8 relative z-10">
        <Typography
          className="text-center px-16 text-lg font-medium tracking-tight leading-6 truncate"
          style={{ color: 'white' }}
        >
          Ordenes Pendientes de {`${getMonthName()}`}
        </Typography>
        <hr
          className="w-50 h-4 bg-grey-500 mx-auto my-4 relative z-10"
          style={{ borderColor: 'transparent' }} // Oculta el color predeterminado de la línea
        />
        <Typography
          className="text-7xl sm:text-8xl font-bold tracking-tight leading-none"
          style={{ color: '#ffffffd1' }}
        >
          {data.count || 0}
        </Typography>
      </div>
      <Typography
        className="flex items-baseline justify-center w-full mt-20 mb-24 relative z-10"
        color="text.secondary"
      >
        {/* Otros elementos */}
      </Typography>
    </Paper>
  );
}

export default memo(OverdueWidget);
