/* eslint-disable no-shadow */
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import DashboardService from '../DashboardAduanasService';

function Semaforo() {
  const [tabValue, setTabValue] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [country, setCountry] = useState('');
  const [ciudad, setciudad] = useState('San Pedro Sula');

  const [temperature, setTemperature] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const currentDate = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString('es-ES', options);

  const axiosInstance = DashboardService();

  useEffect(() => {
    fetchLocation();
    handleTabChange(tabValue);
    updateCurrentTime();
    fetchTemperature();
  }, [tabValue]);

  const fetchLocation = async () => {
    try {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      setCountry(`${data.country_name}`);
      setciudad(`${data.city}`);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const fetchTemperature = async () => {
    const apiKey = 'd0b6a728024c430591e175345233108';

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ciudad}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.current && data.current.temp_c) {
        const temperatureInCelsius = data.current.temp_c;
        const temperatureF = data.current.temp_f;
        setTemperature(`${temperatureInCelsius}°C | ${temperatureF}°F`);
      } else {
        console.error('Temperature data not available in response.');
      }
    } catch (error) {
      console.error('Error fetching temperature:', error);
    }
  };

  const updateCurrentTime = () => {
    const now = new Date();
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = now.toLocaleTimeString('es-ES', options);
    setCurrentTime(formattedTime);
  };

  setInterval(updateCurrentTime, 60000);

  const fetchData = useCallback(async (fetchFunction) => {
    try {
      const result = await fetchFunction();
      setCantidad(result[0]?.cantidad || 0);
    } catch (error) {
      
    }
  }, []);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);

    switch (newValue) {
      case 0:
        fetchData(axiosInstance.Importaciones_Contador_Semana);
        break;
      case 1:
        fetchData(axiosInstance.Importaciones_Contador_Mes);
        break;
      case 2:
        fetchData(axiosInstance.Importaciones_Contador_Anio);
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden relative h-200"
      style={{
        width: '100%',
        backgroundImage: `url('https://i.ibb.co/WKCq1j9/fondodash.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex">
        {/* Lado Izquierdo */}
        <div className="flex flex-col justify-start p-6 w-1/2">
          <div className="flex flex-col items-start ml-5 mt-7">
            <Typography
              className="text-5xl sm:text-5xl font-bold tracking-tight leading-none"
              style={{ marginTop: '0.5rem', color: '#ffffffd1' }}
            >
              {formattedDate}
            </Typography>
            <Typography
              className="text-lg font-medium tracking-tight leading-6 text-black"
              style={{ marginTop: '0.5rem', color: '#ffffffd1' }}
            >
              {country || 'Ubicación desconocida'} - {ciudad || ''}
            </Typography>
            <Typography
              className="text-lg font-medium tracking-tight leading-6 text-black"
              style={{ marginTop: '0.5rem', color: '#ffffffd1' }}
            >
              {currentTime}
            </Typography>
            <Typography
              className="text-lg font-medium tracking-tight leading-6 text-black"
              style={{ marginTop: '0.5rem', color: '#ffffffd1' }}
            >
              {temperature}
            </Typography>
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="mt-12 sm:mt-0 sm:ml-8">
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
              textColor="inherit"
              variant="scrollable"
              scrollButtons={false}
              className="-mx-4 min-h-40"
              sx={{ marginBottom: '.5cm' }}
            >
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                label="Esta Semana"
                value={0}
                sx={{ color: 'white' }}
              />
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                label="Este Mes"
                value={1}
                sx={{ color: 'white' }}
              />
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                label="Este Año"
                value={2}
                sx={{ color: 'white' }}
              />
            </Tabs>
          </div>
          <Typography
            className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-green-500"
            style={{ color: '#ffffffd1' }}
          >
            {cantidad}
          </Typography>
          <Typography
            className="text-3xl sm:text-2xl md:text-3xl tracking-tight leading-5 text-green-500"
            style={{ color: '#ffffffd1', marginTop: '2%' }}
          >
            Importaciones
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default Semaforo;
