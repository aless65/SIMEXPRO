import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  InputLabel,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import MaquinaHistorialService from "./MaquinaHistorialService";

//Imports de iconos
import CircleIcon from '@mui/icons-material/Circle';
import InfoIcon from '@mui/icons-material/Info';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';


//Imports de estilos
import { CardActionArea } from '@mui/material';
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

//Imports para redirigir los datos
import { useLocation } from 'react-router-dom';
import History from 'src/@history/@history';

function MaquinaHistorialTimeline() {

  const maquinaHistorialService = MaquinaHistorialService();
  const location = useLocation();
  
  // Datos para la linea de tiempo
  const [data, setData] = useState([]);
  const params = location.state;



  const useStyles = makeStyles({
    card: {
      width: '100%', // Ajusta el ancho de la Card segun tu diseño
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto', // Permite que el contenido expanda la Card
    },
  });

  //Estilos de la esta adentro de la card
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));

  //Estilos del uso del tooltip
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#6a2b85',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#6a2b85',
      textAlign: 'justify'
    },
  }));
  
  
  //Constantes para el uso del pasar el cursor por encima
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const textColor = hover ? '#2E2E2E' : '#333';
  
  //Constante que usa el boton regresar en la linea de tiempo
  const Regresar = () => {
    History.push('/Maquinas/index');
  }

  //Peticion para cargar datos de la tabla
  const MaquinaTimeLineGetData = async () => {
    try {
      setData(await maquinaHistorialService.listarPorNumeroDeSerie(params['maqu_NumeroSerie']));
    } catch (error) {
    }
  };

  // componentDidMount(); {
  //   window.addEventListener('resize', this.checkZoomLevel);
  // }
  // componentWillUnmount(); {
  //   window.removeEventListener('resize', this.checkZoomLevel);
  // }
    
  useEffect(() => {
    MaquinaTimeLineGetData();
  }, []);

  // checkZoomLevel(); {
  //   const zoomLevel = Math.round(window.devicePixelRatio * 100);
  //   if (zoomLevel < 90) {
  //     // Mostrar el toast de recomendación
  //     ToastUtils.showInfoToast('Para un uso óptimo de los recursos de la aplicación, mantenga el zoom en 90%.');
  //   }
  // }

  //Constante para llamar y usar la clase que contienen los estilos
  const classes = useStyles();

    return (
      <Card 
      sx={{ minWidth: 275, margin: "40px" }}>
        <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/vwCK9gT/L-NEA-DE-TIEMPO.png"
        alt="Encabezado de la carta"
      />
        <Grid xs={12} sx={{ minWidth: 275, margin: "40px" }}>
          <Grid
            container
            sx={{
              backgroundColor: '#f0f0f0',
              padding: '30px',
              borderRadius: '30px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, box-shadow 0.3s',
              '&:hover': {
                backgroundColor: '#e0e0e0',
                boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {/* <Grid item xs={12} style={{ marginBottom: "-20px" }}>
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
                >
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        No. de Serie:
                      </Typography>
                      <Typography>{params['maqu_NumeroSerie']}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        Modelo de la Máquina:
                      </Typography>
                      <Typography>{params['mmaq_Nombre']}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                        Módulo de la Máquina:
                      </Typography>
                      <Typography>{params['modu_Nombre']}</Typography>
                    </InputLabel>
                  </Box>
              </Grid>
              </Grid> */}
              {/* <Grid container spacing={2} justifyContent="center" marginBottom="10px">
                <Grid item xs={12} style={{ marginBottom: "-20px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#000000">
                        No. de Serie:
                      </Typography>
                      <Typography>{params['maqu_NumeroSerie']}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#000000">
                        Modelo de la Máquina:
                      </Typography>
                      <Typography>{params['mmaq_Nombre']}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#000000">
                        Módulo de la Máquina:
                      </Typography>
                      <Typography>{params['modu_Nombre']}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid container spacing={2} justifyContent="center" marginBottom="10px">
                <Grid item xs={12} style={{ marginBottom: '-20px' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '2rem' }}>
                        No. de Serie:
                      </Typography>
                      <Typography sx={{ fontSize: '2rem', fontKerning: 'auto' }}>{params['maqu_NumeroSerie']}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '2rem' }}>
                        Modelo de la Máquina:
                      </Typography>
                      <Typography sx={{ fontSize: '2rem' }}>{params['mmaq_Nombre']}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '2rem' }}>
                        Módulo de la Máquina:
                      </Typography>
                      <Typography sx={{ fontSize: '2rem' }}>{params['modu_Nombre']}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
          <br></br>
          <Grid container sx={{display: 'flex'}} >
          <Grid xs={6.24}>
            <TimelineItem>
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="center"
                variant="body2"
                color="white"
              />
            <TimelineSeparator >
              <TimelineConnector sx={{ bgcolor: 'white' }}/>
              <TimelineDot color="primary" variant="outlined" sx={{ bgcolor: 'white' }} >
                <PanoramaFishEyeIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'white' }}/>
            </TimelineSeparator>
          </TimelineItem>
          </Grid>
          </Grid>
          <Timeline position="alternate">
            {data
              .reduce((accumulator, item) => {
                if (item.mahi_FechaInicio) {
                  accumulator.push({
                    date: new Date(item.mahi_FechaInicio),
                    type: "start",
                    description: item.mahi_Observaciones,
                  });
                }
                return accumulator;
              }, [])
              .sort((a, b) => b.date - a.date)
              .map((item, index) => (
                
                <TimelineItem key={index}>
                
                  <TimelineOppositeContent
                    sx={{ my: 'auto 0' }}
                    className='mx-auto'
                    variant="body2"
                    color="text.secondary"
                  />
                  <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: 'black', float: 'left'}}/>
                    <TimelineDot color="primary" variant="outlined" sx={{ bgcolor: 'white' }}>
                      <PrecisionManufacturingTwoToneIcon />
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: 'black' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {item.date.toLocaleString()}
                      <BootstrapTooltip title={item.description}>
                      <InfoIcon sx={{m: '14px', color: '#C5C5C5'}} />
                      </BootstrapTooltip> 
                    </Typography>
                    <Card sx={{ maxWidth: 385 }} className={classes.card}>
                      <CardActionArea>
                        <CardContent>
                          <Typography variant="body2" color="text.secondary" textAlign={'left'}>
                            <Grid container wrap="nowrap" spacing={2}>
                              <Grid item>
                              </Grid>                              
                              <Grid item xs={6} md={12} zeroMinWidth >
                              <BootstrapTooltip title={item.description}>
                                <Typography noWrap>
                                  {item.type === "start" ? item.description : "Volvió a trabajar."}
                                </Typography>
                              </BootstrapTooltip>
                              </Grid>
                            </Grid>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
          </Timeline>
          <Grid container>
          <Grid xs={6.24}>
            <TimelineItem>
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="center"
                variant="body2"
                color="white"
              />
            <TimelineSeparator >
              <TimelineConnector sx={{ bgcolor: 'white' }}/>
              <TimelineDot color="primary" variant="outlined" sx={{ bgcolor: 'white' }} >
                <CircleIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'white' }}/>
            </TimelineSeparator>
          </TimelineItem>
          </Grid>
          </Grid>
          <Grid item xs={12}>
              <div className="card-footer">
                <Button variant="contained"
                  style={{ position: 'fixed', top: '76%', right: '5%' }}
                  onClick={Regresar}
                  startIcon={<Icon>arrow_back</Icon>}>
                  Regresar</Button>
                <br />
              </div>
            </Grid>
        </Grid>
      </Card>
    );  
  }
export default MaquinaHistorialTimeline;