import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Autocomplete,
    Button,
    FormControl,
    FormLabel,
    Icon,
    InputLabel,
    TextField,
    InputAdornment,
    RadioGroup,
    Radio,
    Divider,
    Chip,  
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";

import { useState, useEffect } from "react";

import InputMask from "react-input-mask";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";

//Imports de validaciones
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import {ToastWarning, 
        ToastError, 
        ToastWarningPersonalizado, 
        ToastSuccessEditar,
        ToastSuccessGuardado,
        ToastSuccessPersonalizado, 
        ToastErrorPersonalizado} from "src/styles/toastsFunctions"
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import Comerciante_IndividualService from "./Comerciante_IndividualService";
import { Check } from "@material-ui/icons";


//ACORDION
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

import History from "src/@history/@history";
import FormHelperText from '@mui/material/FormHelperText';
import { motion } from 'framer-motion';


/*****************************************************************************/


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}







function Comerciante_Individual_Editar() {
    const comerciante = Comerciante_IndividualService();
    const load_DDLs = Load_DDLs()

    //Variables DDL
    const [oficinas_DDL, setOficinas_DDL] = useState([]);
    const [estadosCiviles, setEstadosCiviles] = useState([]);
    const [estadosCivilesRep, setestadosCivilesRep] = useState([]);
    const [oficios_DDL, setOficios_DDL] = useState([]);
    const [oficios_DDLRep, setOficios_DDLRep] = useState([]);
    const [ciudades_DDL, setCiudades_DDL] = useState([]);


    const [colonias, setColonias] = useState([]);
    const [aldeas, setAldeas] = useState([]);

    const [registrosExistentes, setRegistrosExistentes] = useState([]);

    const [RtnRegistrados, setRtnRegistrados] = useState([]);

    const [coin_Id, setCoin_Id] = useState(0);
    const [dataReset, setDataReset] = useState({})
    const [dataReset2, setDataReset2] = useState({})


    const [enviandoCodigo, setEnviandoCodigo] = useState(false);
    const [contador, setContador] = useState(15); // Inicializo el contador en 15 segundos

    
    const [enviandoCodigo2, setEnviandoCodigo2] = useState(false);
    const [contador2, setContador2] = useState(15); // Inicializo el contador en 15 segundos

      // Estado para controlar la habilitación de los campos de representante legal
    const [representanteLegal, setRepresentanteLegal] = useState(false);
    const [correoPr, setcorreoPr] = useState("");
    const [correoAl, setcorreoAl] = useState("");
    const [numero1, setNumero1] = useState("");
    const [numero2, setNumero2] = useState("");

    const [CorreoValido, setCorreoValido] = useState(false);

    const [correoAlternativoIgual, setCorreoAlternativoIgual] = useState(false);
 
    const location = useLocation()
    const data = location.state;


    const [image, setimage] = useState('');

    const [RTN, setRTN] = useState("");
    const [DNIRegistrados, setDNIRegistrados] = useState([]);



       /****** FINALIZAR Y GUARDAR */

       const [RegistroInsertado, setRegistroInsertado] = useState(false);
       const [cancelarContrato, setCancelarContrato] = useState(false);
     
       const RegirigirIndex = () => {   
         History.push("/ComercianteIndividual/Index");
     }
     
     const DialogCancelarContrato1 = () => {
       setCancelarContrato(!cancelarContrato)
     }
     
 
     const CancelarNoGuardar = async() => {
       try { 
        
           ToastSuccessPersonalizado("Modificación de contrato de adeshión cancelado exitosamente");
           History.push("/ComercianteIndividual/Index");
         
       } catch (error) {
         ToastError("Error inesperado");
       }
       
     }
     
     const GuardarYSalir = () => {
       if(RegistroInsertado){
         ToastSuccessPersonalizado("Contrato de adeshión guardado exitosamente");
         History.push("/ComercianteIndividual/Index");
       }else{
         ToastWarning();
         // History.push("/ComercianteIndividual/Index");
       }
     }
     
 
     const botonStyle = {
         backgroundColor: "#634A9E",
         color: "white",
         "&:hover": { backgroundColor: "#6e52ae" },
       };
 


/************************************************************************ */
    const [images, setImages] = useState([]);
    const [showImage, setShowImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const newImage = {
        id: Date.now(), // O puedes usar FuseUtils.generateGUID() si es necesario
        url: reader.result,
        type: 'image',
      };
      setImages([newImage, ...images]);
    };

    reader.readAsDataURL(file);
  };


  async function subirImagenAImgBB(imageUrl) {
    //Token de la API para subir imagenes
    const apikey = "0bb06001171f1563ed23f7f4adf38d2a"; //meter token al env

    const base64Image = imageUrl.split(",")[1]; // obtener la cadena Base64 sin el prefijo "data:image/png;base64,"
    const url = `https://api.imgbb.com/1/upload?key=${apikey}`;

    const body = new FormData();
    body.append("image", base64Image);

    try {
      let response = await fetch(url, {
        method: "POST",
        body: body,
      });

      if (!response.ok) {
        throw new Error("Error al enviar la imagen");
      }
      return await response.json();
    } catch (error) {
      
    }
  }


  const ciudadesGet = async () => {
    try{
        const response = await comerciante.ciudadDDL()
        
        setCiudades_DDL (response);
        setValueTab2("ciudad", response.flatMap(provincia =>provincia.options ).find(ciudad => ciudad.value === data.ciud_Id));
        setValueTab3("ciudadRep", response.flatMap(provincia =>provincia.options ).find(ciudadRep => ciudadRep.value === data.coin_CiudadRepresentante));
    }
    catch(error){
        
    }
  }

    const coloniasAll = async (ciudadId) => {
    try {
        const response = await comerciante.ColoniasPorCiudad(ciudadId)      
       setColonias(response)
    } catch (error) {
      
    }
  };

  
  const coloniasGet = async (ciudadId,idCiuRepresentante) => {
    try {
      if (ciudadId) {
        const response = await comerciante.ColoniasPorCiudad(data.ciud_Id);
        const response1 = await comerciante.ColoniasPorCiudad(data.ciud_Id);
          
   
        setColonias(response);      
        setValueTab2('colonia', response.find(item => item.value === data.colo_Id), { shouldValidate: true, shouldTouch: true })

        setColonias(response1);      
        setValueTab3('coloniaRep', response1.find(item => item.value === data.coin_coloniaIdRepresentante), { shouldValidate: true, shouldTouch: true })
         
    } else {
        setColonias([]);
      }
    } catch (error) {
      
    }
  };
  
  const aldeasGet = async (id,idCiuRepresentante) => {
    try {
      if (id) {
        const response = await comerciante.aldeaPorCiudad(data.ciud_Id)   
        const response1 = await comerciante.aldeaPorCiudad(data.ciud_Id)   
        if(response || response1 )
        {
            setAldeas(response)
            setValueTab2('aldea', response.find(item => item.value === data.alde_Id), { shouldValidate: true, shouldTouch: true })
            
            setAldeas(response1)
            setValueTab3('aldeaRep', response1.find(item => item.value === data.coin_AldeaRepresentante), { shouldValidate: true, shouldTouch: true })
            
        }
        else
            setAldeas([])
          
      } else {
        setAldeas([])
      }
    } catch (error) {
      
    }
  };

  const aldeasAll = async (id) => {
    try {
      if (id) {
        const response = await comerciante.aldeaPorCiudad(id)   
        setAldeas(response)
          
      } else {
        setAldeas([])
      }
    } catch (error) {
      
    }};

    //Cargado de las variables DDL
    async function ddls() {
      
    const response = await load_DDLs.Oficinas()
    const response2 = await comerciante.Estadosciviles()
    const response3 = await load_DDLs.Oficios()
    const response5 = await comerciante.Estadosciviles()
    const response6 = await load_DDLs.Oficios()
 
    setValueTap1("oficina",response.find(item => item.value === data.ofic_Id),{shouldValidate:true,shouldTouch:true})
    setValueTap1("estadosCiviles",response2.find(item => item.value === data.escv_Id),{shouldValidate:true,shouldTouch:true});
    setValueTap1("oficio",response3.find(item => item.value === data.ofpr_Id),{shouldValidate:true,shouldTouch:true});

    setValueTap1("estadocivilrep",response5.find(item => item.value === data.pers_escvRepresentante),{shouldValidate:true,shouldTouch:true});
    setValueTap1("oficiorep",response6.find(item => item.value === data.pers_OfprRepresentante),{shouldValidate:true,shouldTouch:true});
    
    setOficinas_DDL(response);
    setEstadosCiviles(response2)
    setOficios_DDL(response3);
    setestadosCivilesRep(response5);
    setOficios_DDLRep(response6);
	

  }

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

   


    
  const isRTNDuplicado = (RtnRegistrados, rtn) => {
    return RtnRegistrados.some((item) => item.pers_RTN === rtn && item.pers_RTN !== data.pers_RTN);
  };

  const isDNIuplicado = (DNIRegistrados, dni) => {
    return DNIRegistrados.some((item) => 
    (item.doco_Numero_O_Referencia === dni && 
    item.doco_Numero_O_Referencia !== ""));
  };


  const isCorreoDuplicado2 = (registrosExistentes, correo) => {
    return registrosExistentes.some(
        (item) =>
          (item.coin_CorreoElectronicoAlternativo === correo && (item.coin_CorreoElectronicoAlternativo !== "" || item.coin_CorreoElectronicoAlternativo !== null && correo !== "" )  
          && item.coin_CorreoElectronicoAlternativo !== data.coin_CorreoElectronicoAlternativo) 
          || item.coin_CorreoElectronico === correo && (item.coin_CorreoElectronico !== "" || item.coin_CorreoElectronico !== null || correo !== "" )  
      );
  };
  
  const isCorreoDuplicado1 = (registrosExistentes, correo) => {
    return registrosExistentes.some(
        (item) =>
              (item.coin_CorreoElectronico === correo && (item.coin_CorreoElectronico !== "" || item.coin_CorreoElectronico !== null || correo !== "" )
              &&  item.coin_CorreoElectronico !== data.coin_CorreoElectronico) || item.coin_CorreoElectronicoAlternativo === correo && (item.coin_CorreoElectronicoAlternativo !== "" || item.coin_CorreoElectronicoAlternativo !== null  && correo !== "")
      );
  };
  
  
  const isTelefonoCelularDuplicado = (registrosExistentes, numero) => {
    return registrosExistentes.some(item => (item.coin_TelefonoCelular === numero && item.coin_TelefonoCelular !== data.coin_TelefonoCelular) || item.coin_TelefonoFijo === numero);
  };

  const isTelefonoFijoDuplicado = (registrosExistentes, numeroF) => {
    return registrosExistentes.some(item => (item.coin_TelefonoFijo === numeroF && item.coin_TelefonoFijo !== data.coin_TelefonoFijo) ||  item.coin_TelefonoCelular === numeroF  );
  };




    const validarRTN = (value) => {
        if (/^\d{4}-\d{4}-\d{6}$/.test(value)) {
          return true;
        }
        return false;
      };
      const validarDNI = (value) => {
        if (/^\d{4}-\d{4}-\d{5}$/.test(value)) {
          return true;
        }
        return false;
      };

    
      const validarTelefonoCelular= (value) => {
        if (/^\+504 \d{4}-\d{4}$/.test(value)) {
          return true;
        }
        return false;
      };
    
      const validarTelefonoFjor= (value) => {
        if (/^\+504 \d{4}-\d{4}$/.test(value)) {
          return true;
        }
        return false;
      };
      
      const validarToken1 = (token) => {
        if (token == dataReset['token']) {
           return true;
        } else {
          return false;
        }
      }

      const validarToken2 = (token) => {
        if (token == dataReset2['token']) {
           return true;
        } else {
          return false;
        }
      }



      async function cargar() {
 
        const documentos = await comerciante.cargarDocumentos(data?.coin_Id)
     //------------------------------ DNI CI

      const y = documentos.filter((x) => (x.doco_TipoDocumento == "DNI-CI")).map((item, index) => {
            return {
                [`DNI_CI${index}`]: yup.string().required(`El campo es requerido`).test(
                    "formato",
                    "Ingrese un DNI válido. Ejemplo: (0000-0000-00000)",
                    validarDNI),
                [`imagenDNI_CI${index}`]: yup.mixed().required("La imagen es obligatoria")
    
            }
        })

             
        if(y.length === 0){
            y.push({ 
                ["DNI_CI0"]: yup.string().required(`El campo es requerido`).test(
                    "formato",
                    "Ingrese un DNI válido. Ejemplo: (0000-0000-00000)",
                    validarDNI),
                    ["imagenDNI_CI0"]: yup.mixed().required("La imagen es obligatoria")
            });
        }


        let nuevoSchema0 = Tap5accountSchema.shape({
            ...Tap5accountSchema.fields,
        });
    
        y.forEach(element => {
            nuevoSchema0 = Tap5accountSchema.shape({
                ...nuevoSchema0.fields,
                ...element
            });
        });
       
        const y1 = documentos.filter((x) => (x.doco_TipoDocumento == "DNI-CI")).map((item, index) => {
           setValueTab5(`DNI_CI${index}`, item.doco_Numero_O_Referencia)
           setValueTab5(`imagenDNI_CI${index}`, item.doco_URLImagen)
            return {
                id: index,
                doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                documento: 'DNI-CI',
                imagen: item.doco_URLImagen,
              
            }
           
        })
        if (y1.length === 0) {
            y1.push({
                id: 0,
                doco_Numero_O_Referencia: '',
                documento:'DNI-CI',
                imagen: null,
            });
        }
        

        
        setRowsDNI([...y1]);

      
      //------------------------------ RTN RL
    
    
        const z = documentos.filter((x) => (x.doco_TipoDocumento == "RTN-RL")).map((item, index) => {
            return {
                [`RTN_RL${index}`]: yup.string().required(`El campo es requerido`).test(
                    "formato",
                    "Ingrese un RTN válido. Ejemplo: (0000-0000-000000)",
                    validarRTN),
                [`imagenRTN_RL${index}`]:yup.mixed().required("La imagen es obligatoria")
    
            }
        })
 
        if(z.length === 0){
            z.push({
                [`RTN_RL0`]: representanteLegal ? yup.string().required(`El campo es requerido`).test(
                    "formato",
                    "Ingrese un RTN válido. Ejemplo: (0000-0000-000000)",
                    validarRTN): yup.string(),            
                    [`imagenRTN_RL0`]: representanteLegal ? yup.mixed().required("La imagen es obligatoria"): yup.mixed()
            });

        }
        let nuevoSchema = Tap5accountSchema.shape({
            ...nuevoSchema0.fields,
        });
        
        z.forEach(element => {
            nuevoSchema = Tap5accountSchema.shape({
                ...nuevoSchema.fields,
                ...element
            });
        });
    


        const x = documentos.filter((x) => (x.doco_TipoDocumento == "RTN-RL")).map((item, index) => {
            setValueTab5(`RTN_RL${index}`, item.doco_Numero_O_Referencia)
            setValueTab5(`imagenRTN_RL${index}`, item.doco_URLImagen)

            return {
                id: index,
                doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                documento: 'RTN-RL',
                imagen: item.doco_URLImagen,
            }
        })

    
        if (x.length === 0) {
            x.push({
                id: 0,
                doco_Numero_O_Referencia: '',
                documento: 'RTN-RL',
                imagen: null,
            });
        }
        
        setRowsRTNrep([...x]);
    
      //------------------------------ DNI RL
    
        const z1 = documentos.filter((x) => (x.doco_TipoDocumento == "DNI-RL")).map((item, index) => {
            return {
                [`DNI_RL${index}`]: yup.string().required(`El campo es requerido`).test(
                    "formato",
                    "Ingrese un DNI válido. Ejemplo: (0000-0000-00000)",
                    validarDNI),
                [`imagenDNI_RL${index}`] :yup.mixed().required("La imagen es obligatoria")
    
            }
        })
        if(z1.length === 0){
            z1.push({
                 [`DNI_RL0`]: representanteLegal ? yup.string().required(`El campo es requerido`).test(
                     "formato",
                     "Ingrese un DNI válido. Ejemplo: (0000-0000-00000)",
                     validarDNI): yup.string(),
                     [`imagenDNI_RL0`]:representanteLegal ? yup.mixed().required("La imagen es obligatoria"): yup.mixed()
             });
         }


        let nuevoSchema1 = Tap5accountSchema.shape({
            ...nuevoSchema.fields,
        });
    
        z1.forEach(element => {
            nuevoSchema1 = Tap5accountSchema.shape({
                ...nuevoSchema1.fields,
                ...element
            });
        });

        const x1 = documentos.filter((x) => (x.doco_TipoDocumento == "DNI-RL")).map((item, index) => {
            setValueTab5(`DNI_RL${index}`, item.doco_Numero_O_Referencia)
            setValueTab5(`imagenDNI_RL${index}`, item.doco_URLImagen)

            return {
                id: index,
                doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                documento: 'DNI-RL',
                imagen: item.doco_URLImagen,
            }
        })

        if (x1.length === 0) {
            x1.push({
                id: 0,
                doco_Numero_O_Referencia: '',
                documento:'DNI-RL',
                imagen: null,
            });
        }
        
        setRowsDNIrep([...x1])



    
     //------------------------- DECL CI
      const z2 = documentos.filter((x) => (x.doco_TipoDocumento == "DECL-CI")).map((item, index) => {
            return {
                [`DECL_CI${index}`]: yup.string().required(`El campo es requerido`),
                [`imagenDECL_CI${index}`]: yup.mixed().required("La imagen es obligatoria")
    
            }
        })
        if(z2.length === 0){
            z2.push( {
                [`DECL_CI0`]: yup.string().required(`El campo es requerido`),
                [`imagenDECL_CI0`]: yup.mixed().required("La imagen es obligatoria")
            });       
        }


        let nuevoSchema2 = Tap5accountSchema.shape({
            ...nuevoSchema1.fields,
        });
    
        z2.forEach(element => {
            nuevoSchema2 = Tap5accountSchema.shape({
                ...nuevoSchema2.fields,
                ...element
            });
        });

        setTap5accountSchema(nuevoSchema2)


        const x2 = documentos.filter((x) => (x.doco_TipoDocumento == "DECL-CI")).map((item, index) => {
           setValueTab5(`DECL_CI${index}`, item.doco_Numero_O_Referencia)
           setValueTab5(`imagenDECL_CI${index}`, item.doco_URLImagen)

            return {
                id: index,
                doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                documento: 'DECL-CI',
                imagen: item.doco_URLImagen,
            }
        })

        if (x2.length === 0) {
            x2.push({
                id: 0,
                doco_Numero_O_Referencia: null,
                documento:'DECL-CI',
                imagen: null,
            });
        }
        
        setRowsDecla([...x2])

 



         //------------------------- RTN CI

    
    
        const x3 = documentos.filter((x) => (x.doco_TipoDocumento == "RTN-CI")).map((item, index) => {
            setValueTab5(`RTN_CI`, item.doco_Numero_O_Referencia)
            setValueTab5(`imagenRTN_CI`, item.doco_URLImagen)
            return {
                id: index,
                doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                documento: 'RTN-CI',
                imagen: item.doco_URLImagen,
            }
        })


        if (x3.length === 0) {
            x3.push({
                id: 0,
                doco_Numero_O_Referencia: RTN,
                documento:'RTN-CI',
                imagen: null,
            });
        }
        setRowsRTN([...x3])
      }

    
     useEffect(() => {

      cargar();


        const fetchRegistros = async () => {
            try {
              const responseData = await comerciante.listar();
              setRegistrosExistentes(responseData);
            
            } catch (error) {
              
            }
        };
    
        const fetchRegistrosRtn = async () =>{
            try{
                const response = await comerciante.PersonasList();
                setRtnRegistrados(response);
            }catch(error2){
            }
        }
            fetchRegistros();
            fetchRegistrosRtn();
            ciudadesGet();
            aldeasGet(data.ciud_Id,data.coin_CiudadRepresentante);
            coloniasGet(data.ciud_Id,data.coin_CiudadRepresentante);
            ddls()
        
            setTimeout(() => {
                trigger()
              }, 1000);
      }, [representanteLegal, numero1, numero2, correoPr, correoAl ]);
  
      useEffect(() => {
        setValueTap1("pers_RTN",data.pers_RTN,{shouldValidate:true,shouldTouch:true});

        if (data.formaRepresentacionDesc == "Representante Legal") {
            setTimeout(() => {
                settabsEstado({
                    tab4: false,
                    tab2: false,
                });
              }, 2000);
            setValueTap1('pers_FormaRepresentacion', 'S')
            setRepresentanteLegal(true)
          } else {
            
             setTimeout(() => {
                settabsEstado({
                    tab4: false,
                    tab2: true,
                });
              }, 2000);
            setValueTap1('pers_FormaRepresentacion', 'N')
            setRepresentanteLegal(false)

        }

           setValueTap1("pers_Nombre", data.pers_Nombre,{shouldValidate:true,shouldTouch:true});
           setValueTab2("coin_NumeroLocalApart",data.coin_NumeroLocalApart,{shouldValidate:true,shouldTouch:true});
           setValueTab2("coin_PuntoReferencia",data.coin_PuntoReferencia,{shouldValidate:true,shouldTouch:true});
           setValueTab3("coin_NumeroLocaDepartRepresentante",data.coin_NumeroLocaDepartRepresentante,{shouldValidate:true,shouldTouch:true});
           setValueTab3("coin_PuntoReferenciaReprentante",data.coin_PuntoReferenciaReprentante,{shouldValidate:true,shouldTouch:true});
           setValueTab4("coin_TelefonoCelular",data.coin_TelefonoCelular,{shouldValidate:true,shouldTouch:true});
           setValueTab4("coin_TelefonoFijo",data.coin_TelefonoFijo,{shouldValidate:true,shouldTouch:true});
           setValueTab4("coin_CorreoElectronico",data.coin_CorreoElectronico,{shouldValidate:true,shouldTouch:true});
           setValueTab4("coin_CorreoElectronicoAlternativo",data.coin_CorreoElectronicoAlternativo,{shouldValidate:true,shouldTouch:true});
      
           setTimeout(() => {
            trigger()
          }, 1000);

    },[])
    

        const defaultTab1Values = {
            pers_RTN:"",
            pers_FormaRepresentacion: '',		
            oficina: null, 
            estadosCiviles: null,
            estadocivilrep: null,
            oficio: null,
            oficiorep: null,
            };



        const defaultValuesTab2 = {
          
            aldea: null,
            colonia: null,
            ciudad: null,
            coin_NumeroLocalApart: data.coin_NumeroLocalApart,				
            coin_PuntoReferencia: data.coin_PuntoReferencia,					
        }

        const defaultValuesTab3 = {
           
            aldeaRep: null,
            coloniaRep: null,
            ciudadRep: null,
            coin_NumeroLocaDepartRepresentante: data.coin_NumeroLocaDepartRepresentante,	
            coin_PuntoReferenciaReprentante	: data.coin_PuntoReferenciaReprentante,	
        }
      
        const defaultvaluesTab4 = {
          
            coin_TelefonoCelular: data.coin_TelefonoCelular,					
            coin_TelefonoFijo: data.coin_TelefonoFijo,							
            coin_CorreoElectronico: data.coin_CorreoElectronico,	
            coin_CorreoElectronicoAlternativo: data.coin_CorreoElectronicoAlternativo,	

        }
    
        const defaultvaluesTab5 = {	
            DNI_CI: "",										
            RTN_RL: "",										
            DNI_RL: "",										
            DECL_CI: "",	                                 
        }


      const accountSchema = yup.object().shape({

        oficina: yup.object().required(""),
        estadosCiviles: yup.object().required(""),
        oficio: yup.object().required(""),
        pers_RTN: yup
        .string()
        .required("")
        .test("formato", "RTN incompleto", validarRTN),
        pers_Nombre: yup.string().required(""), 
        pers_FormaRepresentacion: yup.string("").required(),

        estadocivilrep: yup.object().nullable()
        .when("pers_FormaRepresentacion", {
          is: (pers_FormaRepresentacion) =>
            pers_FormaRepresentacion === "S" ,
          then: yup.object().required(""),
        })
        ,
    
        oficiorep: yup.object().nullable()
        .when("pers_FormaRepresentacion", {
          is: (pers_FormaRepresentacion) =>
          pers_FormaRepresentacion && pers_FormaRepresentacion === "S" ,
          then: yup.object().required(""),
        })
        ,

      });

      const accountSchemaTab2 = yup.object().shape({

        colonia: yup.object().required(""),
        ciudad: yup.object().required("")  ,
        coin_NumeroLocalApart: yup.string("").required(""),				
        coin_PuntoReferencia: yup.string("").required(""),	

      });

    const accountSchemaTab3 = yup.object().shape({
            coloniaRep: yup.object().required(""),
            ciudadRep: yup.object().required(""),
            coin_NumeroLocaDepartRepresentante: yup.string("").required(""),	
            coin_PuntoReferenciaReprentante	: yup.string("").required(""),	
      });

const accountSchemaTab4 = yup.object().shape({
    coin_TelefonoCelular: yup
    .string()
    .required("Campo requerido")
    .test("formato", "Número de teléfono incompleto", validarTelefonoCelular)
    .test("duplicado", "Este número de teléfono celular ya está en uso", function (value) {
        return !isTelefonoCelularDuplicado(registrosExistentes, value);
    })
    .test("repetido", "Los números telefónicos no pueden ser los mismos", function (value) {
        return !Numero1Igual(value, numero1);
    })
    .nullable(),
    coin_TelefonoFijo: yup
      .string()
      .required("Campo requerido")
      .test("formato", "Número de teléfono incompleto", validarTelefonoFjor)
      .test("duplicado", "Este número de teléfono fijo ya está en uso", function (value) {
        return !isTelefonoFijoDuplicado(registrosExistentes, value);
       })
       .test("repetido", "Los números telefónicos no pueden ser los mismos", function (value) {
        return !Numero2Igual(value, numero2);
      })
      .nullable(),

    coin_CorreoElectronico: yup
      .string()
      .trim()
      .required("Campo requerido")
      .email("Debe ingresar un correo electrónico válido")
      .test("duplicado", "Este correo electrónico ya está en uso", function (value) {
        return !isCorreoDuplicado1(registrosExistentes, value);
       })
      .test("repetido", "Los correos electrónicos no pueden ser los mismos", function (value) {
        return !CorreosIgualesPrincipal(value, correoAl);
      })
      .nullable(),
    coin_CorreoElectronicoAlternativo: yup
      .string()
      .trim()
      .email("Debe ingresar un correo electrónico válido")
      .test("duplicado", "Este correo electrónico ya está en uso", function (value) {
        return !isCorreoDuplicado2(registrosExistentes, value);
       })
       .test("repetido", "Los correos electrónicos no pueden ser los mismos", function (value) {
        return !CorreosIgualesAlter(value, correoPr);
      })
      .nullable(),
    codigo2: yup
      .string()
      .when(['coin_CorreoElectronicoAlternativo'], {
        is: (coin_CorreoElectronicoAlternativo) => {
          return (
            coin_CorreoElectronicoAlternativo !== data.coin_CorreoElectronicoAlternativo && coin_CorreoElectronicoAlternativo !== ""
          );
        },
        then: yup.string()
          .required('El código de verificación es requerido')
          .test("formato", "El código de verificación es incorrecto", validarToken2),
      }),
    codigo1: yup
      .string()
      .when(['coin_CorreoElectronico'], {
        is: (coin_CorreoElectronico, schema) => {
          return (
            coin_CorreoElectronico !== data.coin_CorreoElectronico
          );
        },
        then: yup.string()
          .required("El código de verificación es requerido")
          .test("formato", "El código de verificación es incorrecto", validarToken1),
      }),
  });
  


      const [Tap5accountSchema, setTap5accountSchema] = useState(
        yup.object().shape({           
            "imagenRTN_CI": yup.mixed().required("La imagen es obligatoria"),

      
        })

        
    )
    


      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setimage(reader.result);
          };
        } else {
          ToastErrorPersonalizado("Archivo incorrecto");
        }
      };

        //Declaracion del formulario
        const { handleSubmit, control, watch, formState, setValue: setValueTap1,trigger: trigger1 ,reset} =
        useForm({
            defaultTab1Values, //Campos del formulario
            mode: "all",
            resolver: yupResolver(accountSchema), //Esquema del formulario
        });

        const { handleSubmit: handleSubmitTab2,  control: controlTab2, watch: watchTab2, formState: formStateTab2, setValue: setValueTab2} =
        useForm({
        defaultValuesTab2, 
        mode: "all",
        resolver: yupResolver(accountSchemaTab2), 
        });

        const { handleSubmit: handleSubmitTab3,  control: controlTab3, watch: watchTab3, formState: formStateTab3, setValue: setValueTab3} =
        useForm({
        defaultValuesTab3, 
        mode: "all",
        resolver: yupResolver(accountSchemaTab3), 
        });

        const { handleSubmit: handleSubmitTab4,  control: controlTab4, watch: watchTab4, formState: formStateTab4, setValue: setValueTab4, getValues} =
        useForm({
        defaultvaluesTab4, 
        mode: "all",
        resolver: yupResolver(accountSchemaTab4), 
        });

        const { handleSubmit: handleSubmitTab5, control: controlTab5, watch: watchTab5, formState: formStateTab5, setValue: setValueTab5, trigger } =
        useForm({
          defaultvaluesTab5,
          mode: 'all',
          resolver: yupResolver(Tap5accountSchema),
        });


        
        
        const modelo = watch();
        const modelo2 = watchTab2();
        const modelo3 = watchTab3();
        const modelo4 = watchTab4();
        const modelo5 = watchTab5();


        const { isValid, dirtyFields, errors, touchedFields } = formState;
        const { isValid: isValid2, errors: errors2 } = formStateTab2;
        const { isValid: isValid3, errors: errors3 } = formStateTab3;
        const { isValid: isValid4, errors: errors4 } = formStateTab4;
        const { isValid: isValid5, errors: errors5 } = formStateTab5;



        const CorreosIgualesPrincipal = (value, correoAl) => { 
            return (
                correoAl === value && correoAl !== "" &&  value !== "") 
           };
        const CorreosIgualesAlter = (value, correoPr) => { 
            return (
                correoPr === value && correoPr !== "" &&  value !== "") 
           };

        const Numero1Igual = (value, numero2) => { 
            return (
                numero2 === value && numero2 !== ""  &&  value !== "" ) 
           };

        const Numero2Igual = (value, numero1) => { 
            return (
                numero1 === value && numero1 !== "" &&  value !== "" ) 
           };
      


    const Navigate = useNavigate();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

   
    const [tabsEstado, settabsEstado] = useState({
        
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: true,
        tab5: false,
    });
   
    

    const validacion = (params, event) => {
        if (event) {
            event.preventDefault();
        }
        if ((params == 1)) {

            if(representanteLegal == false){
                settabsEstado({
                    tab1: false,
                    tab2: true,
                    tab3: false,
                    tab4: false,
                    tab5: false,
                });
                setValue(1);
            }
            else{
                settabsEstado({
                    tab1: false,
                    tab2: false,
                    tab3: false,
                    tab4: false,
                    tab5: false,
                });
                setValue(1);
            }

        
        }

        if ((params == 2)) {
            if(representanteLegal == false){
                settabsEstado({
                    tab1: false,
                    tab2: true,
                    tab3: false,
                    tab4: false,
                    tab5: false,
                });
                setValue(2);
            }
            else{
                settabsEstado({
                    tab1: false,
                    tab2: false,
                    tab3: false,
                    tab4: false,
                    tab5: false,
                });
                setValue(2);
            }
           
        }

        if ((params == 3)) {
            if(representanteLegal == false){
                settabsEstado({
                    tab1: false,
                    tab2: true,
                    tab3: false,
                    tab4: true,
                    tab5: true,
                });
                setValue(3);
            }
            else{
                settabsEstado({
                    tab1: false,
                    tab2: false,
                    tab3: false,
                    tab4: true,
                    tab5: true,
                });
                setValue(3);
            }
           
        }

        if ((params == 4)) {
            if(representanteLegal == false){
                settabsEstado({
                    tab1: false,
                    tab2: true,
                    tab3: false,
                    tab4: false,
                    tab5: false,
                });
                setValue(4);
            }
            else{
                settabsEstado({
                    tab1: false,
                    tab2: false,
                    tab3: false,
                    tab4: false,
                    tab5: false,
                });
                setValue(4);
            }
          
        }  if ((params == 5)) {
            if(representanteLegal == false){
                settabsEstado({
                    tab1: false,
                    tab2: true,
                    tab3: false,
                    tab4: false,
                    tab5: false,
                });
                setValue(5);
            }
            else{
                settabsEstado({
                    tab1: false,
                    tab2: false,
                    tab3: false,
                    tab4: false,
                    tab5: false,
                });
                setValue(5);
            }
          
        }
    };



            const [salirContrato, setSalirContrato] = useState(false);

            const DialogSalir = () => {
                setSalirContrato(!salirContrato)
            }

            const Salir2 = async() => {
                try{
                const response = await comerciante.finalizar(data.coin_Id)
                if(response.messageStatus == "1"){
                    DialogSalir()
                    ToastSuccessPersonalizado("Contrato de adeshión finalizado con exito")
                    Navigate("/ComercianteIndividual/Index");
                }else{
                    ToastError()
                }
                }catch(error){
                ToastError()
                }
            }




   /************************************ TABLAS ************************************ */
   /**************************  COMERCIANTE  ******************************* */

        const [rowsRTN, setRowsRTN] = useState([
            {
            id: 1,
            doco_Numero_O_Referencia: "", 
            documento: 'RTN-CI',
            imagen: "",
            },
        ]);



        const handleImageChangeRTN = (e, id) => {
        const file = e.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
        const imageData = e.target.result;

        const response = await subirImagenAImgBB(imageData);

        const updatedRows = rowsRTN.map((row) =>
        row.id === id
            ? { ...row, imagen: response.data.url} 
            : row
        );

        setRowsRTN(updatedRows);
        };

        reader.readAsDataURL(file);
        }
        };



        // Variable para la segunda tabla (DNI)


        const [rowsDNI, setRowsDNI] = useState([
        {
        id: 1,
        doco_Numero_O_Referencia: '',
        documento: 'DNI-CI',
        imagen: null,
        },
        ]);



        const handleInputChangeDNIci = (e, id) => {
        const { name, value } = e.target;
        setRowsDNI((prevRows) =>
            prevRows.map((row) =>
            row.id === id ? { ...row, doco_Numero_O_Referencia: value } : row
            )
        );
        };



        const handleImageChangeDNI = (e, id) => {
        const file = e.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const imageData = e.target.result;

            const response = await subirImagenAImgBB(imageData);

            const updatedRows = rowsDNI.map((row) =>
            row.id === id
                ? { ...row, imagen: response.data.url }
                : row
            );

            setRowsDNI(updatedRows);
        };

        reader.readAsDataURL(file);
        }
        };




        const handleAddRowDNI = () => {


        if (rowsDNI.some((row) => !row.doco_Numero_O_Referencia)) {
            ToastWarningPersonalizado("Debe completar el documento actual antes de agregar uno nuevo");
            return; 
        }


        const x = {
            [`DNI_CI${rowsDNI.length + 1}`]: yup.string().required(`El campo es requerido`).test(
                "formato",
                "Ingrese un DNI válido. Ejemplo: (0000-0000-00000)",
                validarDNI),
                [`imagenDNI_CI${rowsDNI.length + 1}`]: yup.mixed().required("La imagen es obligatoria")
        }

        let nuevoSchema = Tap5accountSchema.shape({
            ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
            ...nuevoSchema.fields,
            ...x
        });
        setTap5accountSchema(nuevoSchema)

            const newRow = {
                id: rowsDNI.length + 1,
                doco_Numero_O_Referencia: '',
                documento: 'DNI-CI',
                imagen: null,
                };
                setRowsDNI([...rowsDNI, newRow]);
            
        };


        const handleRemoveRowDNI = (id) => {

        delete Tap5accountSchema.fields[`DNI_CI${id}`];

        let nuevoSchema = Tap5accountSchema.shape({
        ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
        ...nuevoSchema.fields,
        });

        setTap5accountSchema(nuevoSchema);


        //  trigger();


        const updatedRows = rowsDNI.filter((row) => row.id !== id);
        setRowsDNI(updatedRows);
        };




        /**************************  REPRESENTANTE  ******************************* */


        const [rowsRTNrep, setRowsRTNrep] = useState([
        {
        id: 1,
        doco_Numero_O_Referencia: '',
        documento: 'RTN-RL',
        imagen: null,
        },
        ]);


        const handleInputChangeRTNrep = (e, id) => {
        const { name, value } = e.target;

        setRowsRTNrep((prevRows) =>
        prevRows.map((row) =>
        row.id === id
        ? { ...row, doco_Numero_O_Referencia: value }
        : row
        )
        );
        };

        const handleImageChangeRTNrep = (e, id) => {
        const file = e.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
        const imageData = e.target.result;

        const response = await subirImagenAImgBB(imageData);

        const updatedRows = rowsRTNrep.map((row) =>
        row.id === id
            ? { ...row, imagen: response.data.url}
            : row
        );

        setRowsRTNrep(updatedRows);
        };

        reader.readAsDataURL(file);
        }
        };



        const handleAddRowRTNrep = () => {

        if (rowsRTNrep.some((row) => !row.doco_Numero_O_Referencia)) {
        ToastWarningPersonalizado("Debe completar el documento actual antes de agregar uno nuevo");
        return; 
        }


        const x = {
        [`RTN_RL${rowsRTNrep.length + 1}`]: yup.string().required(`El campo es requerido`).test(
            "formato",
            "Ingrese un RTN válido. Ejemplo: (0000-0000-000000)",
            validarRTN),
        [`imagenRTN_RL${rowsRTNrep.length + 1}`]:yup.mixed().required("La imagen es obligatoria")
        }


        let nuevoSchema = Tap5accountSchema.shape({
        ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
        ...nuevoSchema.fields,
        ...x
        });
        setTap5accountSchema(nuevoSchema)


        const newRow = {
        id: rowsRTNrep.length + 1,
        doco_Numero_O_Referencia: '',
        documento: 'RTN-RL',
        imagen: null,
        };
        setRowsRTNrep([...rowsRTNrep, newRow]);

        };


        const handleRemoveRowRTNrep = (id) => {


        delete Tap5accountSchema.fields[`RTN_RL${id}`]
        let nuevoSchema = Tap5accountSchema.shape({
            ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
            ...nuevoSchema.fields,
        });

        setTap5accountSchema(nuevoSchema)

        // trigger()

        const updatedRows = rowsRTNrep.filter((row) => row.id !== id);
        setRowsRTNrep(updatedRows);


        };



        const [rowsDNIrep, setRowsDNIrep] = useState([
        {
        id: 1,
        doco_Numero_O_Referencia: '',
        documento: 'DNI-RL',
        imagen: null,
        },
        ]);


        const handleInputChangeDNIrep = (e, id) => {
        const { name, value } = e.target;

        setRowsDNIrep((prevRows) =>
        prevRows.map((row) =>
        row.id === id
        ? { ...row, doco_Numero_O_Referencia: value}
        : row
        )
        );
        };

        const handleImageChangeDNIrep = (e, id) => {
        const file = e.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
        const imageData = e.target.result;

        const response = await subirImagenAImgBB(imageData);

        const updatedRows = rowsDNIrep.map((row) =>
        row.id === id
            ? { ...row, imagen: response.data.url}
            : row
        );

        setRowsDNIrep(updatedRows);
        };

        reader.readAsDataURL(file);
        }
        };

        const handleAddRowDNIrep = () => {

        if (rowsDNIrep.some((row) => !row.doco_Numero_O_Referencia)) {
        ToastWarningPersonalizado("Debe completar el documento actual antes de agregar uno nuevo");
        return; 
        }

        const x = {
        [`DNI_RL${rowsDNIrep.length + 1}`]: yup.string().required(`El campo es requerido`).test(
            "formato",
            "Ingrese un DNI válido. Ejemplo: (0000-0000-00000)",
            validarDNI),
        [`imagenDNI_RL${rowsDNIrep.length + 1}`]:yup.mixed().required("La imagen es obligatoria")
        }

        let nuevoSchema = Tap5accountSchema.shape({
        ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
        ...nuevoSchema.fields,
        ...x
        });
        setTap5accountSchema(nuevoSchema)

        const newRow = {
        id: rowsDNIrep.length + 1,
        doco_Numero_O_Referencia: '',
        documento: 'DNI-RL',
        imagen: null,
        };
        setRowsDNIrep([...rowsDNIrep, newRow]);
        };


        const handleRemoveRowDNIrep = (id) => {


        delete Tap5accountSchema.fields[`DNI_RL${id}`]
        let nuevoSchema = Tap5accountSchema.shape({
            ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
            ...nuevoSchema.fields,
        });

        setTap5accountSchema(nuevoSchema)

        // trigger()

        const updatedRows = rowsDNIrep.filter((row) => row.id !== id);
        setRowsDNIrep(updatedRows);


        };




        /************************** DECLARACION   ******************************* */


        const [rowsDecla, setRowsDecla] = useState([
        {
        id: 1,
        doco_Numero_O_Referencia: '',
        documento: 'DECL-CI',
        imagen: null,
        },
        ]);


        const handleInputChangeDecla = (e, id) => {
        const { name, value } = e.target;

        setRowsDecla((prevRows) =>
        prevRows.map((row) =>
        row.id === id
        ? { ...row, doco_Numero_O_Referencia: value }
        : row
        )
        );
        };

        const handleAddRowDecla = () => {

        if (rowsDecla.some((row) => !row.doco_Numero_O_Referencia)) {
        ToastWarningPersonalizado("Debe completar el documento actual antes de agregar uno nuevo");
        return; 
        }

        const x = {
        [`DECL_CI${rowsDecla.length + 1}`]: yup.string().required(`El campo es requerido`),
        [`imagenDECL_CI${rowsDecla.length + 1}`]:yup.mixed().required("La imagen es obligatoria")

        }

        let nuevoSchema = Tap5accountSchema.shape({
        ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
        ...nuevoSchema.fields,
        ...x
        });
        setTap5accountSchema(nuevoSchema)


        const newRow = {
        id: rowsDecla.length + 1,
        doco_Numero_O_Referencia: '',
        documento: 'DECL-CI',
        imagen: null,
        };
        setRowsDecla([...rowsDecla, newRow]);
        };


        const handleRemoveRowDecla = (id) => {


        delete Tap5accountSchema.fields[`DECL_CI${id}`]
        let nuevoSchema = Tap5accountSchema.shape({
            ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
            ...nuevoSchema.fields,
        });

        setTap5accountSchema(nuevoSchema)

        // trigger()

        const updatedRows = rowsDecla.filter((row) => row.id !== id);
        setRowsDecla(updatedRows);


        };






        const handleImageChangeDecla = (e, id) => {
        const file = e.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
        const imageData = e.target.result;

        const response = await subirImagenAImgBB(imageData);

        const updatedRows = rowsDecla.map((row) =>
        row.id === id
            ? { ...row, imagen: response.data.url }
            : row
        );

        setRowsDecla(updatedRows);
        };

        reader.readAsDataURL(file);
        }
        };



 

        const ExistentesDNICI = (value, id) => { 

        return (
        rowsDNI.some(row => (row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "")  && row.id !== id  && value !== "" ) ||
        rowsDNIrep.some(row => row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "") && value !== "")
        };



        const ExistentesDNIRL = (value, id) => { 
        return (
        rowsDNIrep.some(row => (row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "")  && row.id !== id ) ||
        rowsDNI.some(row => row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "" ) )
        };

        const ExistentesRTNRL = (value, id) => { 
        return (
        rowsRTNrep.some(row => (row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "")  && row.id !== id ) ||
        rowsRTN.some(row => row.doco_Numero_O_Referencia === value ) )
        };

        const ExistentesDecla = (value, id) => { 

        return (
        rowsDecla.some(row => (row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "")  && row.id !== id )||
        rowsRTN.some(row => row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "" ) ||
        rowsRTNrep.some(row => row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "" ) ||
        rowsDNI.some(row => row.doco_Numero_O_Referencia === value && row.doco_Numero_O_Referencia !== "") ||
        rowsDNIrep.some(row => row.doco_Numero_O_Referencia === value ))
        };



/************************************ TABLAS ************************************ */
   

    const InsertTab1 = async() => {
        try{
            const duplicados = RtnRegistrados.filter(item => {
                return (
                isRTNDuplicado(RtnRegistrados, modelo.pers_RTN)    
                );
            });

            if (duplicados.length > 0) {
                ToastWarningPersonalizado("Ya hay una solicitud de contrato de adhesión de este comerciante");
            } else {
                const crearResponse = await comerciante.EditarTab1(modelo, data.pers_Id, data.coin_Id);
                if (crearResponse.data.data.messageStatus !== "0") {
                    validacion(1);
                    ToastSuccessEditar();
                    setRegistroInsertado(true);

                } 
                else{
                    setRegistroInsertado(false);

                }           
            }

        }catch(errorTab1){
            ToastError();
        }
    }


    const InsertTab2 = async() => {
        try{    
            const crearResponse = await comerciante.crearTap2(modelo2, data.coin_Id);
                if (crearResponse.data.data.messageStatus === "1") {
                    setRegistroInsertado(true);
                    if(representanteLegal === false)
                    {
                        validacion(3);
                        ToastSuccessEditar();
                    }
                    else{
                        validacion(2);
                        ToastSuccessEditar();
                    }
                   
                }
                else{
                    setRegistroInsertado(false);

                }   

        }catch(error){
            
            ToastError();
        }
    }


    const InsertTab3 = async() => {
        try{
                const crearResponse = await comerciante.crearTap3(modelo3, data.coin_Id);
                if (crearResponse.data.data.messageStatus === "1") {
                    validacion(3);
                    ToastSuccessEditar();
                    setRegistroInsertado(true);
                }
                else{
                    setRegistroInsertado(false);

                }   
        }catch(error){
            
            ToastError();
        }
    }
    
    const onSubmitUser = async() => {
        try {    
          const response = await comerciante.EnviarCorreo(modelo4)
          if (response['token']) {
            ToastSuccessPersonalizado("Correo enviado")
            setDataReset(response)
            setEnviandoCodigo(true);

            // Inicio el contador
            let tiempoRestante = 30; // 15 segundos
            const interval = setInterval(() => {
                if (tiempoRestante > 0) {
                tiempoRestante--;
                setContador(tiempoRestante);
                } else {
                // Cuando el temporizador llega a cero, habilita el botón nuevamente
                setEnviandoCodigo(false);
                clearInterval(interval); // Detén el temporizador
                }
            }, 1000); // Actualiza el contador cada segundo

          } else if (response === -1) {
            ToastError("El ervicio de correos no ha respondido")
          } else {
            ToastError()
          }
        } catch (error) {
          ToastError()
        }
      }

          
    const onSubmiToken2 = async() => {
        try {    
          const response = await comerciante.EnviarCorreo2(modelo4)
          if (response['token']) {
            ToastSuccessPersonalizado("Correo enviado")
            setDataReset2(response)
            setEnviandoCodigo2(true);

            // Inicio el contador
            let tiempoRestante = 30; // 15 segundos
            const interval = setInterval(() => {
                if (tiempoRestante > 0) {
                tiempoRestante--;
                setContador2(tiempoRestante);
                } else {
                // Cuando el temporizador llega a cero, habilito el botón otra vez
                setEnviandoCodigo2(false);
                clearInterval(interval); // Detengo el temporizador
                }
            }, 1000); // Actualiza el contador cada segundo

          } else if (response === -1) {
            ToastError("El ervicio de correos no ha respondido")
          } else {
            ToastError()
          }
        } catch (error) {
          ToastError()
        }
      }

        
    const InsertTab4 = async() => {
        try{

                const crearResponse = await comerciante.crearTap4(modelo4, data.coin_Id);
                if (crearResponse.data.data.messageStatus === "1") {
                    validacion(4);
                    ToastSuccessEditar();
                    setRegistroInsertado(true);
                }
                else{
                    setRegistroInsertado(false);

                }   
       
        }catch(error){
            
            ToastError();
        }
    }
    
    const InsertTab5 = async () => {
        try{

            const datos2 = [];

            const newRowsRTN = rowsRTN.map((value) => ({ ...value }));
            const newRowsDNI = rowsDNI.map((value) => ({ ...value }));
            const newRowsRTNrep = rowsRTNrep.map((value) => ({ ...value }));
            const newRowsDNIrep = rowsDNIrep.map((value) => ({ ...value }));
            const newRowsDecla = rowsDecla.map((value) => ({ ...value }));

            // Luego, agrega las nuevas matrices a 'datos2':
            datos2.push(...newRowsRTN, ...newRowsDNI, ...newRowsRTNrep, ...newRowsDNIrep, ...newRowsDecla);


            const eliminarDocumentos = await comerciante.eliminarDocumentos(data.coin_Id)
            if (eliminarDocumentos.messageStatus === "1") {

                const response = await comerciante.editarTap5(data.coin_Id,datos2,representanteLegal);
                if (response.data.data.messageStatus === "1") {
                    ToastSuccessEditar()
                    //se quitara el history de aqui, y se agregara cuando ya haya finalizado
                    //tambien lo de guardar y salir 
                  //  History.push("/ComercianteIndividual/Index");
                  setRegistroInsertado(true);
                } else {
                    setRegistroInsertado(false);
                    ToastError()
                }

            }
        }catch(error){
        }
    }


    const guardarTap1 = () => {
    if(isValid)
    {
        InsertTab1()
    }
    else{
        ToastWarning()   
        //aqui entra
    }
    }

     const guardarTap2 = () => {
    if(isValid2)
    {
        InsertTab2()
    }
    else{
        ToastWarning()   
    }
    }   
    const guardarTap3 = () => {
        if(isValid3)
        {
            InsertTab3()
        }
        else{
            ToastWarning()   
        }
    }
    const guardarTap4 = () => {
        if(isValid4)
        {
            InsertTab4()
        }
        else{
            ToastWarning()   
        }
    }

    console.log(isValid4, "VÁLIDA  INFO CONTACTO")
    const guardarTap5 = async () => {
        try {
            if(isValid5){
                InsertTab5();
            }
            else{
                ToastWarning();
            }
        } catch (error) {
         
    
        }
      };



    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/FBTmyr7/CONTRATO-DE-ADHESI-N-COMERCIANTE-INDIVIDUAL.png"
                alt="Encabezado de la carta"
            />

            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ backgroundColor: "#e5e1fa", color: black }}
                    >
                        <Tab
                            label="Datos Generales"
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Domicilio del Comerciante"
                            {...a11yProps(1)}
                            disabled={tabsEstado.tab1}
                        />
                        <Tab
                            label="Domicilio del Representante Legal"
                            {...a11yProps(2)}
                            disabled={tabsEstado.tab2}
                        />
                        <Tab
                            label="Información de Contacto"
                            {...a11yProps(3)}
                            disabled={tabsEstado.tab3}
                        />
                        <Tab
                            label="Documentos a Informar"
                            {...a11yProps(4)}
                            disabled={tabsEstado.tab4}
                        />
                          <Tab
                        label="Finalizar Solicitud"
                        {...a11yProps(5)}
                        disabled={tabsEstado.tab5}
                    />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >

    {/***********************************************   PRIMER  TAP  1  ******************************************************** */ }           

                    <TabPanel value={value} index={0} dir={theme.direction}>
                    <form onSubmit={handleSubmit((_data) => { })}>
       
                        <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                        <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                            <Chip label="Edición de contrato de adhesión para comerciante individual" />
                        </Divider>
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                            render={({ field }) => (
                                <InputMask
                                mask="9999-9999-999999"
                                value={modelo["pers_RTN"]}
                                onChange={(e) => {
                                    field.onChange(e); // Actualiza el valor interno del Controller

                                  }}
                                onBlur={() => {
                                    field.onBlur();
                                    if (isRTNDuplicado(RtnRegistrados, field.value)) {
                                        ToastWarningPersonalizado("Ya hay una solicitud de contrato de adhesión de este comerciante");
                                    }
                                }}
                                maskChar=""
                                >
                                {() => (
                                    <FormControl fullWidth={true}>
                                    <FormLabel error={!!errors.pers_RTN || isRTNDuplicado(RtnRegistrados, field.value)}>
                                        RTN del comerciante:
                                    </FormLabel>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        error={!!errors.pers_RTN || isRTNDuplicado(RtnRegistrados, field.value)}
                                        fullWidth={true}
                                        inputprops={{
                                        startadornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                        }}
                                    />
                                    {errors.pers_RTN && (
                                        <Typography variant="caption" color="error">
                                        {errors.pers_RTN.message}
                                        </Typography>
                                    )}
                                    </FormControl>
                                )}
                                </InputMask>
                            )}
                            name="pers_RTN"
                            control={control}
                            />
                        </Grid>


                        <Grid item xs={6}>
                        <Controller
                            render={({ field }) => (
                            <FormControl fullWidth={true}>
                                <FormLabel error={!!errors.pers_Nombre}>
                                Nombre del comerciante:
                                </FormLabel>
                                <TextField
                                {...field}
                                error={!!errors.pers_Nombre}
                                variant="outlined"
                                fullWidth={true}
                                inputProps={{
                                    maxLength: 100,
                                    startAdornment: <InputAdornment position="start" />,
                                  
                                    }}
                                />
                            </FormControl>
                            )}
                            name="pers_Nombre"
                            control={control}
                        />
                        </Grid>


                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel  error={!!errors.oficina} >Oficina Donde Presentará la Solicitud y Documentación:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="oficina"
                                            isOptionEqualToValue={(option, value) =>
                                            option.value === value?.value
                                            }
                                            options={oficinas_DDL}
                                            disableClearable={true}
                                            value={modelo["oficina"] ?? null}
                                            onChange={(event, value) => {
                                                setValueTap1("oficina", value);
                                            }
                                        }
                                            renderInput={(params) => (
                                            <TextField {...params} error={!!errors.oficina}  />
                                            )}
                                        />
                                        )}
                                        name="oficina"
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel  error={!!errors.estadosCiviles}  >Estado Civil del Comerciante:</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="estadosCiviles"
                                            isOptionEqualToValue={(option, value) =>
                                            option.value === value?.value
                                            }
                                            options={estadosCiviles}
                                            disableClearable={true}
                                            value={modelo["estadosCiviles"]  ?? null}
                                            onChange={(event, value) => {
                                                setValueTap1("estadosCiviles", value);
                                            }}
                                            renderInput={(params) => (
                                            <TextField {...params}  error={!!errors.estadosCiviles} />
                                            )}
                                        />
                                        )}
                                        name="estadosCiviles"
                                      
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                            
                                <FormControl fullWidth>
                                    <FormLabel  error={!!errors.oficio}>Profesión u oficio del comerciante:
                                    <Typography  component="span">
                                    <BootstrapTooltip
                                     title=" Según clasificador nacional de Honduras,CNOH-2018">
                                    <InfoIcon sx={{m: '1px', color: '#C5C5C5'}} />
                                    </BootstrapTooltip> 
                                    </Typography>
                                    </FormLabel>
                                    
                                    <Controller
                                        render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="oficio"
                                            isOptionEqualToValue={(option, value) =>
                                            option.value === value?.value
                                            }
                                            options={oficios_DDL}
                                            disableClearable={true}
                                            value={modelo["oficio"] ?? null}
                                            onChange={(event, value) => {
                                                setValueTap1("oficio", value);
                                            }}
                                            renderInput={(params) => (
                                            <TextField {...params} 
                                            error={!!errors.oficio}/>
                                            )}
                                        />
                                        )}
                                        name="oficio"
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>



                            <Grid item xs={6}>
                        <Controller
                    render={({ field }) => (
                        <FormControl fullWidth>
                        <FormLabel error={!!errors.pers_FormaRepresentacion}>
                            Forma de representación:
                        </FormLabel>
                        <RadioGroup
                            {...field}
                            row
                            name="pers_FormaRepresentacion"
                            aria-label="simple-radio"
                            marginRight="10px"
                            value={modelo["pers_FormaRepresentacion"]} // Agregar esto
                            onChange={(e) => {
                                field.onChange(e);
                                // Restablecer los estados locales cuando cambie la opción
                               if (e.target.value == "N") {
                                    setValueTap1("estadocivilrep", null);
                                    setValueTap1("oficiorep", null);
                                    setValueTab3("aldeaRep",null);
                                    setValueTab3("coloniaRep",null);
                                    setValueTab3("ciudadRep",null);
                                    setValueTab3("coin_NumeroLocaDepartRepresentante","");
                                    setValueTab3("coin_PuntoReferenciaReprentante","");
                                 }
                                  trigger1();
                                  
                                  setRepresentanteLegal(
                                    e.target.value == "S" ? true : false
                                  );
                                  setValueTap1(
                                    "pers_FormaRepresentacion",
                                    e.target.value
                                  );
                         
                                
                                if (e.target.value === 'S') {
                                    settabsEstado({
                                        tab1:false,
                                        tab2:false,
                                        tab3:false,                                     
                                        tab4:false,
                                        tab5:false,
                                
                                    });
                                } else if (e.target.value === 'N') {
                                        settabsEstado({
                                        tab1: false,
                                        tab2: true,                                                                             
                                        tab3: false,
                                        tab4: false,
                                        tba5: false,                                   
                                    });
              
                                }  
                            }}
                            onBlur={(e) => {
                                field.onBlur(e)
                                
                            }}
                              
                        >
                            <FormControlLabel
                            value="N"
                            control={<Radio />}
                            checked={modelo['pers_FormaRepresentacion'] == "N" ? true : false}
                            label="Condición propia"
                            />
                            <FormControlLabel
                            value="S"
                            checked={modelo['pers_FormaRepresentacion'] == "S" ? true : false}
                            control={<Radio />}
                            label="Representante Legal"
                            />
                        </RadioGroup>
                        </FormControl>
                    )}
                    name="pers_FormaRepresentacion"
                    control={control}
                    />

                </Grid>

                    {/* Campos de representante legal */}
                    <Grid item xs={6}>
                        <Controller
                        render={({ field }) => (
                            <FormControl fullWidth={true}>
                            <FormLabel>
                                Estado civil del representante legal:
                                <Typography  component="span">
                                <BootstrapTooltip
                                    title="Si ha informado
                                    representación legal">
                                <InfoIcon sx={{m: '1px', color: '#C5C5C5'}} />
                                </BootstrapTooltip> 
                                </Typography></FormLabel>
                            <Autocomplete
                                {...field}
                                disablePortal
                                isOptionEqualToValue={(option, value) =>
                                option.value === value.value
                                }
                                options={estadosCivilesRep}
                                disableClearable={true}
                                disabled={!representanteLegal}
                                value={modelo["estadocivilrep"]?? null}
                                onChange={(event, value) => {
                                setValueTap1('estadocivilrep', value);
                                }}

                            
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={!!errors.estadocivilrep}
                                    InputLabelProps={{ shrink: true }}
                                    // Agrega estilos en línea cuando esté deshabilitado
                            style={{
                                backgroundColor: representanteLegal ? 'inherit' : '#f2ebf38a',
                            }}
                                />
                                )}
                            />
                            </FormControl>
                        )}
                        name="estadocivilrep"
                        control={control}
                        rules={{
                            required: representanteLegal,
                        }}
                        />
                    </Grid>
                    

                    <Grid item xs={6}>
                <Controller
                    render={({ field }) => (
                    <FormControl fullWidth={true}>
                        <FormLabel>
                        Profesión u oficio del representante legal:
                        <Typography  component="span">
                            <BootstrapTooltip
                                title="Si ha informado
                                representación legal">
                            <InfoIcon sx={{m: '1px', color: '#C5C5C5'}} />
                            </BootstrapTooltip> 
                            </Typography> </FormLabel>
                        <Autocomplete
                        {...field}
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                        }
                        options={oficios_DDLRep}
                        disableClearable={true}
                        disabled={!representanteLegal}
                        value={modelo["oficiorep"]?? null}
                        onChange={(event, value) => {
                            setValueTap1('oficiorep', value);
                        }}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            error={!!errors.oficiorep}
                            InputLabelProps={{ shrink: true }}
                            // Agrega estilos en línea cuando esté deshabilitado
                            style={{
                                backgroundColor: representanteLegal ? 'inherit' : '#f2ebf38a',
                            }}
                            />
                        )}
                        />
                    </FormControl>
                    )}
                    name="oficiorep"
                    control={control}
                    rules={{
                    required: representanteLegal,
                    }}
                />
                </Grid>


                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "right",
                                }}
                            >
                                <Button
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    type="submit"
                                    onClick={guardarTap1}
                                >
                                    Guardar
                                </Button>

                                <Button
                                    startIcon={<Icon>close</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px" }}
                                    sx={{
                                        backgroundColor: "#DAD8D8",
                                        color: "black",
                                        "&:hover": { backgroundColor: "#BFBABA" },
                                    }}
                                    onClick={RegistroInsertado ?  DialogCancelarContrato1 : RegirigirIndex}

                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </TabPanel>

    {/***********************************************   SEGUNDO TAB  2 ******************************************************** */ }           
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    <form onSubmit={handleSubmitTab2((_data) => { })}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                Para efecto de ubicación, en el contrato de adhesión se mostrará
                                el domicilio fiscal registrado en la administración tributaria.
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                        <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                            <Chip label="Edición de contrato de adhesión para comerciante individual" />
                        </Divider>
                        </Grid>


                    
                    <Grid item xs={6}>

                        <FormControl fullWidth>
                        <FormLabel error={!!errors2.ciudad}>Ciudad:</FormLabel>
                        <Controller  
                        render={({ field }) => (
                            <Autocomplete
                            {...field}
                            id="ciudad"
                            isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                            }
                            options={ciudades_DDL.flatMap(provincia => provincia.options)}
                            disableClearable={true}
                            groupBy={(option) => option.provincia}
                            getOptionLabel={(option) => option.label}
                            value={modelo2["ciudad"] ?? null}
                            
                            onChange={async (event, value) => {
                                setValueTab2("ciudad", value);
                                setValueTab2("colonia", null);
                                setValueTab2("aldea", null);


                            //AQUI LO DE ALDEAS Y COLONIAS
                            coloniasGet(value?.value)
                            if (!value) { setValueTab2('colonia', []) }
                            aldeasGet(value?.value)
                            if (!value) { setValueTab2('aldea', []) }
                            }}

                           
                            renderInput={(params) => (
                            <TextField {...params} error={!!errors2.ciudad} />
                            )}
                        />  
                        )}
                        name="ciudad"
                        error={!!errors2.ciudad}
                        control={controlTab2}
                        />
                        </FormControl>

                    </Grid>


                     <Grid item xs={6}>
                        <Controller
                        name="colonia"
                        control={controlTab2}
                        render={({ field }) => (
                            <FormControl                          
                                fullWidth={true}
                            >
                              <FormLabel
                                  error={!!errors2.colonia}                           
                              >
                                Barrios o Colonias:
                              </FormLabel>
                               <Autocomplete
                                  {...field}
                                  disablePortal
                                  isOptionEqualToValue={(option, value) =>
                                      option.value === value.value
                                  }
                                  id="colonia"
                                  options={colonias}
                                  disableClearable={true}
                                  value={modelo2["colonia"] ?? null}
                                  onChange={async (event, value) => {
                                    setValueTab2('colonia', value)
                                 
                                  }}
                                  renderInput={(params) => (
                                      <TextField
                                          {...params}
                                          error={!!errors2.colonia}
                                          InputLabelProps={{ shrink: true }}
                                      />
                                  )}
                                />
                            </FormControl>
                              )}
                                />
                        </Grid>


                        <Grid item xs={6}>
                        <Controller
                        name="aldea"
                        control={controlTab2}
                        render={({ field }) => (
                            <FormControl                          
                                fullWidth={true}
                            >
                              <FormLabel>
                                  Aldea (en caso de haber):
                              </FormLabel>
                               <Autocomplete
                                  {...field}
                                  disablePortal
                                  isOptionEqualToValue={(option, value) =>
                                      option.value === value.value
                                  }
                                  id="aldea"
                                  options={aldeas}
                                  disableClearable={true}
                                  value={modelo2["aldea"] ?? null}
                                  onChange={async (event, value) => {
                                    setValueTab2('aldea', value)
                                 
                                  }}
                                  renderInput={(params) => (
                                      <TextField
                                          {...params}
                                          InputLabelProps={{ shrink: true }}
                                      />
                                  )}
                                />
                            </FormControl>
                              )}
                                />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                            render={({ field }) => (
                                <FormControl fullWidth={true}>
                                <FormLabel error={!!errors2.coin_NumeroLocalApart}  >
                                 Edificio con número de local o apartamento :
                                </FormLabel>
                                <TextField
                                    {...field}
                                    error={!!errors2.coin_NumeroLocalApart}
                                    variant="outlined"
                                    fullWidth={true}
                                    inputProps={{
                                        startadornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                        }}                          
                                />
                                </FormControl>
                            )}
                            name="coin_NumeroLocalApart"
                            control={controlTab2}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                            render={({ field }) => (
                                <FormControl fullWidth={true}>
                                <FormLabel error={!!errors2.coin_PuntoReferencia}  >
                                 Punto de referencia:
                                </FormLabel>
                                <TextField
                                    {...field}
                                    error={!!errors2.coin_PuntoReferencia}
                                    variant="outlined"
                                    fullWidth={true}
                                    inputProps={{
                                        startadornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                        }}                          
                                />
                                </FormControl>
                            )}
                            name="coin_PuntoReferencia"
                            control={controlTab2}
                            />
                          </Grid>




                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "right",
                                }}
                            >
                                <Button
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    type="submit"
                                    onClick={guardarTap2}
                                >
                                    Guardar
                                </Button>

                                <Button
                                startIcon={<Icon>close</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px' }}
                                sx={{
                                backgroundColor: '#DAD8D8',
                                color: 'black',
                                '&:hover': { backgroundColor: '#BFBABA' },
                                }}
                                onClick={DialogCancelarContrato1}
                            >
                                Cancelar
                            </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </TabPanel>

 {/***********************************************   TERCER TAP  3 ******************************************************** */ }           

                    <TabPanel value={value} index={2} dir={theme.direction}>
                    <form onSubmit={handleSubmitTab3((_data) => { })}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                Si hubiese informado representación bajo un representante legal.
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                        <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                            <Chip label="Edición de contrato de adhesión para comerciante individual" />
                        </Divider>
                        </Grid>


                        <Grid item xs={6}>

                        <FormControl fullWidth>
                        <FormLabel error={!!errors3.ciudadRep}>Ciudad</FormLabel>
                        <Controller  
                        render={({ field }) => (
                            <Autocomplete
                            {...field}
                            id="ciudadRep"
                            isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                            }
                            options={ciudades_DDL.flatMap(provincia => provincia.options)}
                            disableClearable={true}
                            groupBy={(option) => option.provincia}
                            getOptionLabel={(option) => option.label}
                            value={modelo3["ciudadRep"] ?? null}
                            
                            onChange={async (event, value) => {
                                setValueTab3("ciudadRep", value);
                                setValueTab2("colonia", null);
                                setValueTab2("aldea", null);


                            //AQUI LO DE ALDEAS Y COLONIAS
                            coloniasGet(value?.value)
                            if (!value) { setValueTab3('coloniaRep', []) }
                            aldeasGet(value?.value)
                            if (!value) { setValueTab3('aldeaRep', []) }
                            }}

                        
                            renderInput={(params) => (
                            <TextField {...params} error={!!errors3.ciudadRep} />
                            )}
                        />  
                        )}
                        name="ciudadRep"
                        error={!!errors3.ciudadRep}
                        control={controlTab3}
                        />
                        </FormControl>

                        </Grid>


                        <Grid item xs={6}>
                        <Controller
                        name="coloniaRep"
                        control={controlTab3}
                        render={({ field }) => (
                            <FormControl                          
                                fullWidth={true}
                            >
                            <FormLabel
                                error={!!errors3.coloniaRep}                           
                            >
                               Barrios o Colonias:
                            </FormLabel>
                            <Autocomplete
                                {...field}
                                disablePortal
                                isOptionEqualToValue={(option, value) =>
                                    option.value === value.value
                                }
                                id="coloniaRep"
                                options={colonias}
                                disableClearable={true}
                                value={modelo3["coloniaRep"] ?? null}
                                onChange={async (event, value) => {
                                    setValueTab3('coloniaRep', value)
                                
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={!!errors3.coloniaRep}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                                />
                            </FormControl>
                            )}
                                />
                        </Grid>


                        <Grid item xs={6}>
                        <Controller
                        name="aldeaRep"
                        control={controlTab3}
                        render={({ field }) => (
                            <FormControl                          
                                fullWidth={true}
                            >
                            <FormLabel >
                                Aldea (en caso de haber):
                            </FormLabel>
                            <Autocomplete
                                {...field}
                                disablePortal
                                isOptionEqualToValue={(option, value) =>
                                    option.value === value.value
                                }
                                id="aldeaRep"
                                options={aldeas}
                                disableClearable={true}
                                value={modelo3["aldeaRep"] ?? null}
                                onChange={async (event, value) => {
                                    setValueTab3('aldeaRep', value)
                                
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                                />
                            </FormControl>
                            )}
                                />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                            render={({ field }) => (
                                <FormControl fullWidth={true}>
                                <FormLabel error={!!errors3.coin_NumeroLocaDepartRepresentante}  >
                                Edificio con número de local o apartamento :
                                </FormLabel>
                                <TextField
                                    {...field}
                                    error={!!errors3.coin_NumeroLocaDepartRepresentante}
                                    variant="outlined"
                                    fullWidth={true}
                                    inputProps={{
                                        startadornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                        }}                          
                                />
                                </FormControl>
                            )}
                            name="coin_NumeroLocaDepartRepresentante"
                            control={controlTab3}
                            />
                        </Grid>



                        <Grid item xs={12}>
                            <Controller
                            render={({ field }) => (
                                <FormControl fullWidth={true}>
                                <FormLabel error={!!errors3.coin_PuntoReferenciaReprentante}  >
                                Punto de referencia:
                                </FormLabel>
                                <TextField
                                    {...field}
                                    error={!!errors3.coin_PuntoReferenciaReprentante}
                                    variant="outlined"
                                    fullWidth={true}
                                    inputProps={{
                                        startadornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                        }}                          
                                />
                                </FormControl>
                            )}
                            name="coin_PuntoReferenciaReprentante"
                            control={controlTab3}
                            />
                        </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "right",
                                }}
                            >
                                <Button
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    type="submit"
                                    onClick={guardarTap3}
                                >
                                    Guardar
                                </Button>

                                <Button
                                startIcon={<Icon>close</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px' }}
                                sx={{
                                backgroundColor: '#DAD8D8',
                                color: 'black',
                                '&:hover': { backgroundColor: '#BFBABA' },
                                }}
                                onClick={DialogCancelarContrato1}
                            >
                                Cancelar
                            </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </TabPanel>


 {/***********************************************   CUARTO TAP 4 ******************************************************** */ }           

                    <TabPanel value={value} index={3} dir={theme.direction}>
                    <form onSubmit={handleSubmitTab4((_data) => { })}>
                       

                        <Grid container spacing={3}>

                        <Grid item xs={12} style={{ marginBottom: "15px" }}>
                        <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                            <Chip label="Edición de contrato de adhesión para comerciante individual" />
                        </Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                En el Contrato de Adhesión se mostrará los números de télefono
                                registrados en la administración tributaria.
                            </Typography>
                        </Grid>

                       
                        <Grid item xs={6}>

                            <Controller
                            render={({ field }) => (
                                <InputMask
                                mask="+504 9999-9999"
                                value={modelo4["coin_TelefonoFijo"]}
                                onChange={(e) => {
                                    field.onChange(e);
                                    setNumero1(e.target.value);
                                }}
                                onBlur={() => {
                                    field.onBlur();
                                
                                }}
                                maskChar=""
                                >
                                {() => (

                                    <FormControl fullWidth={true}>
                                    <FormLabel  error={!!errors4.coin_TelefonoFijo } >
                                        Número telefónico fijo del comerciante :
                                    </FormLabel>
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        error={!!errors4.coin_TelefonoFijo }
                                        fullWidth={true}
                                        inputprops={{
                                        startadornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                        }}
                                    />
                                        {errors4.coin_TelefonoFijo && (
                                    <Typography variant="caption" color="error">
                                    {errors4.coin_TelefonoFijo.message}
                                    </Typography>
                                    )}
                                    </FormControl>
                                )}
                                </InputMask>
                            )}
                            name="coin_TelefonoFijo"
                            control={controlTab4}
                            />
                        </Grid>

                         <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <InputMask
                                    mask="+504 9999-9999"
                                    value={modelo4["coin_TelefonoCelular"]}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setNumero2(e.target.value);
                                    }}
                                    onBlur={() => {
                                        field.onBlur();
                                       
                                      
                                     
                                    }}
                                    maskChar=""
                                    >
                                    {() => (

                                        <FormControl fullWidth={true}>
                                        <FormLabel  error={!!errors4.coin_TelefonoCelular } >
                                            Número de teléfono celular del comerciante :
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            error={!!errors4.coin_TelefonoCelular }
                                            fullWidth={true}
                                            inputprops={{
                                            startadornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),
                                            }}
                                        />
                                            {errors4.coin_TelefonoCelular && (
                                        <Typography variant="caption" color="error">
                                        {errors4.coin_TelefonoCelular.message}
                                        </Typography>
                                        )}
                                        </FormControl>
                                    )}
                                    </InputMask>
                                )}
                                name="coin_TelefonoCelular"
                                control={controlTab4}
                                />
                            </Grid>       


                            <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (     
                            <FormControl  fullWidth>
                                <FormLabel error={!!errors4.coin_CorreoElectronico }> 
                                Correo electrónico donde notificar:
                                <Typography variant="h6" component="span">
                                    <BootstrapTooltip
                                     title="para efectos de la recepción o envío de solicitudes,
                                        escritos, autos, notificaciones, requerimientos y cualquier
                                        otro proveído, comunicaciones, resoluciones y cualquier otra
                                        actuación ante la administración aduanera o emitido por esta">
                                    <InfoIcon sx={{m: '14px', color: '#C5C5C5'}} />
                                    </BootstrapTooltip> 
                                    </Typography>
                                    </FormLabel>
                                    
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        fullWidth={true}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setcorreoPr(e.target.value);
                                        }}
                                        onBlur={() => {
                                            field.onBlur();
                                         /*   if (isCorreoDuplicado(registrosExistentes, field.value)) {
                                            ToastWarningPersonalizado("Ya existe un registro con el correo electrónico.");
                                            }
                                            if(CorreosIgualesPrincipal(field.value)){
                                                ToastWarningPersonalizado("Los correos electrónicos no pueden ser los mismos.");
                                            }*/
                                        }}
                                        error={!!errors4.coin_CorreoElectronico }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Button
                                                    startIcon={<Icon>checked</Icon>}
                                                    variant="contained"
                                                    color="primary"
                                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                                    sx={{
                                                    backgroundColor: "#dcc25a",
                                                    color: "white",
                                                    "&:hover": { backgroundColor: "#dcc25ac9" },
                                                    }}
                                                    type="submit"
                                                    onClick={onSubmitUser}
                                                    disabled={enviandoCodigo}
                                                >
                                                    {enviandoCodigo ? `Reenviar en ${contador}s` : 'Enviar código'}
                                                </Button>
                                                </InputAdornment>
                                            ),
                                        }}   
                                                   
                                    /> 
                                   
                                    {errors4.coin_CorreoElectronico && (
                                        <Typography variant="caption" color="error">
                                        {errors4.coin_CorreoElectronico.message}
                                        </Typography>
                                        )} 
                                    </FormControl>             
                                )}
                                name="coin_CorreoElectronico"
                                control={controlTab4}
                                />       
                            </Grid>


                            <Grid item xs={6}>
                            <Controller
                                render={({ field }) => {
                                const tokenValido = validarToken1(field.value);
                                const isError = !!errors4.codigo1;
                                const mostrarMensajeCorrecto = tokenValido && !isError && field.value !== "" && field.value !== undefined; // Verificar que el campo no esté vacío

                                return (
                                    <FormControl fullWidth={true}>
                                    <FormLabel error={isError} style={{ color: isError ? 'red' : '' }}>
                                        Código de verificación de correo electrónico:
                                        <Typography variant="h6" component="span">
                                        <BootstrapTooltip
                                            title="Esto asegura que se ha informado un correo electrónico válido, 
                                            accesible por la persona o personal de la empresa,
                                            y los correos de aduanas de Honduras no se encuentren bloqueados 
                                            por el proveedor/servidor de correo electrónico"
                                        >
                                            <InfoIcon sx={{ m: '14px', color: '#C5C5C5' }} />
                                        </BootstrapTooltip>
                                        </Typography>
                                    </FormLabel>
                                    <TextField
                                        {...field}
                                        error={isError}
                                        variant="outlined"
                                        fullWidth={true}
                                        inputProps={{
                                        maxLength: 17,
                                        style: { 
                                            textTransform: "uppercase",
                                        },
                                        startAdornment: <InputAdornment position="start" />,
                                        onKeyPress: (event) => {
                                            if (!/[A-Za-z0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        },                                        
                                        }}
                                        onChange={(event) => {
                                        field.onChange(event);
                                        }}
                                    />
                                    {mostrarMensajeCorrecto && (
                                        <Typography variant="caption" style={{ color: '#49cc90' }}>
                                        Código de verificación correcto
                                        </Typography>
                                    )}
                                    {isError && (
                                        <Typography variant="caption" color="error">
                                        {errors4.codigo1.message}
                                        </Typography>
                                    )}
                                    </FormControl>
                                );
                                }}
                                name="codigo1"
                                control={controlTab4}
                            />
                            </Grid>



                           <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (     
                            <FormControl  fullWidth>
                                <FormLabel error={!!errors4.coin_CorreoElectronicoAlternativo}> 
                                Correo electrónico alternativo:</FormLabel>
                                    
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    fullWidth={true}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setcorreoAl(e.target.value);
                                    }}
                                    onBlur={() => {
                                        field.onBlur();
                                        if(CorreosIgualesAlter(field.value)){
                                            setCorreoAlternativoIgual(true);
                                        }
                                        else{
                                            setCorreoAlternativoIgual(false);
                                        }
                                    }}
                                    error={!!errors4.coin_CorreoElectronicoAlternativo}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <Button
                                            startIcon={<Icon>checked</Icon>}
                                            variant="contained"
                                            color="primary"
                                            style={{ borderRadius: "10px", marginRight: "10px" }}
                                            sx={{
                                                backgroundColor: "#dcc25a",
                                                color: "white",
                                                "&:hover": { backgroundColor: "#dcc25ac9" },
                                            }}
                                            type="submit"
                                            onClick={onSubmiToken2}
                                            disabled={enviandoCodigo2 || correoAlternativoIgual}
                                            >
                                            {enviandoCodigo2 ? `Reenviar en ${contador2}s` : 'Enviar código'}
                                            </Button>
                                        </InputAdornment>
                                        ),
                                    }}
                                    /> 
                                               
                                        {errors4.coin_CorreoElectronicoAlternativo && (
                                        <Typography variant="caption" color="error">
                                        {errors4.coin_CorreoElectronicoAlternativo.message}
                                        </Typography>
                                        )}       
                                    </FormControl>             
                                )}
                                name="coin_CorreoElectronicoAlternativo"
                                control={controlTab4}
                             
                                />       
                            </Grid>




                            <Grid item xs={6}>
                            <Controller
                            render={({ field }) => {
                                const tokenValido = validarToken2(field.value);
                                const isError = !!errors4.codigo2;
                                const mostrarMensajeCorrecto = tokenValido && !isError && field.value !== "" && field.value !== undefined; // Verificar que el campo no esté vacío

                                return (
                                <FormControl fullWidth={true}>
                                <FormLabel    error={isError} style={{ color: isError ? 'red' : '' }} >
                                Codigo de verificacion de correo electrónico alternativo:
                                </FormLabel>
                                <TextField
                                    {...field}
                                    error={isError}                                
                                    variant="outlined"
                                    fullWidth={true}
                                    inputProps={{
                                        maxLength: 17,
                                        style: { 
                                            textTransform: "uppercase",
                                        },
                                        startAdornment: <InputAdornment position="start" />,
                                        onKeyPress: (event) => {
                                            if (!/[A-Za-z0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }, 
                                        }}  
                                        onChange={(event) => {
                                            field.onChange(event);
                                        }}                       
                                />
                                  {mostrarMensajeCorrecto && (
                                        <Typography variant="caption" style={{ color: '#49cc90' }}>
                                        Código de verificación correcto
                                        </Typography>
                                    )}
                                    {isError && (
                                        <Typography variant="caption" color="error">
                                        {errors4.codigo2.message}
                                        </Typography>
                                    )}

                                </FormControl>
                                );
                               }}

                                name="codigo2"
                                control={controlTab4}
                                rules={{
                                    required: CorreoValido,
                                }}
                            />
                        </Grid>

                          

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "right",
                                }}
                            >
                                <Button
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    type="submit"
                                    onClick={guardarTap4}
                                >
                                    Guardar
                                </Button>

                                <Button
                                startIcon={<Icon>close</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px' }}
                                sx={{
                                backgroundColor: '#DAD8D8',
                                color: 'black',
                                '&:hover': { backgroundColor: '#BFBABA' },
                                }}
                                onClick={DialogCancelarContrato1}
                            >
                                Cancelar
                            </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </TabPanel>

            {/***********************************************   QUINTO TAP 5  ******************************************************** */ }           

            <TabPanel value={value} index={4} dir={theme.direction}>
                    <form onSubmit={handleSubmitTab5((_data) => { })}>
                       
                     
                        <Grid container spacing={3}>
                       
                        <Grid item xs={12} style={{ marginBottom: "15px" }}>
                        <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                            <Chip label="Edición de contrato de adhesión para comerciante individual" />
                        </Divider>
                        </Grid>
                       
                        <Grid item xs={12}>

                        {/*   #1   */}

                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{backgroundColor: '#fff3db'}}
                                >
                                <Typography>Documentos del Comerciante Individual</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                      

                                    <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                        
                                        <TableBody>
                                            {rowsRTN.map((row) => (
                                            <TableRow key={row.id}>
                                              
                                                <TableCell>
                                                    <Controller 
                                                       render={({ field }) => (
                                                  <InputMask
                                                    maskChar=""
                                                    value={field.value}
                                                    >
                                                    {() => (
                                                        <FormControl fullWidth={true}>
                                                        <TextField
                                                        
                                                            {...field}
                                                            variant="outlined"
                                                            fullWidth={true}
                                                            disabled={true}
                                                            value={modelo["pers_RTN"]}
                                                            InputProps={{
                                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                            }}
                                                            style={{
                                                            backgroundColor: '#f2ebf38a',
                                                            width: '200px'
                                                            }}
                                                        />
                                                          
                                                        </FormControl>
                                                    )}
                                                         </InputMask>

                                                    )}
                                                    name="RTN_CI"
                                                    control={controlTab5}
                                                   />
                                                </TableCell>
                                                <TableCell>
                                                <FormLabel>
                                                        Registro tributario nacional (RTN) del comerciante individual
                                                </FormLabel>
                                                </TableCell>
                                                <TableCell>

                                              <Controller
                                                render={({ field }) => (
                                                  

                                                <FormControl fullWidth={true} error={!!errors5.imagenRTN_CI}>
                                                <div>
                                                {row.imagen ? (
                                                    <div>
                                                {/*<img src={row.imagen} alt="Imagen" /> */}   
                                                    <p> {row.imagen}</p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                    <p>No se ha seleccionado ninguna imagen</p>
                                                    </div>
                                                )}
                                                <label
                                                    htmlFor={"imagenRTN_CI"}
                                                    className="custom-file-upload"
                                                    style={{ color: 'blue' }}
                                                    >
                                                    Cargar imagen
                                                    </label>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id={"imagenRTN_CI"}
                                                    style={{ display: "none" }}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleImageChangeRTN(e, row.id);
                                                    }}
                                                />
                                                </div>
                                                <FormHelperText>{errors5.imagenRTN_CI?.message}</FormHelperText>
                                                </FormControl>
                                                )}
                                                name="imagenRTN_CI"
                                                control={controlTab5}
                                                />


                                                </TableCell>
                                                <TableCell>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                    variant="outlined"
                                                    color="success"
                                                    disabled={true}
                                                    style={{ marginRight: '10px' }}  >
                                                    <Icon>add_box</Icon>
                                                    </Button>

                                                    <Button
                                                    variant="outlined"
                                                    className="text-center"
                                                    color="error"
                                                    size="medium"
                                                    disabled={true}
                                                    >
                                                    <DeleteIcon />
                                                    </Button>
                                                </div>
                                                </TableCell>
                                                

                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                </TableContainer>  

                                    
                                    <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                        
                                        <TableBody>
                                            {rowsDNI.map((row) => (
                                            <TableRow key={row.id}>
                                              
                                              <TableCell>
                                              <Controller
                                                render={({ field }) => (

                                                    <InputMask
                                                    // mask="9999-9999-99999"
                                                     onChange={field.onChange}
                                                     onBlur={() => {
                                                        field.onBlur();
                                                        if (isDNIuplicado(DNIRegistrados, field.value)) {
                                                            ToastWarningPersonalizado("El documento ya está registrado en un contrato");
                                                        }
                                                        if(ExistentesDNICI(field.value,row.id)){
                                                            ToastWarningPersonalizado("El número de documento ya esta siendo registrado");
                                                        }
                                                    }}
                                                    value={field.value}     
                                                    maskChar=""
                                                    >
                                                    {() => (
                                                    <FormControl  fullWidth={true}>
                                                       
                                                       <TextField
                                                           {...field}
                                                            variant="outlined"
                                                            value={modelo5[`DNI_CI${row.id}`]}
                                                            fullWidth={true}
                                                            onBlur={(e) => handleInputChangeDNIci(e, row.id)}
                                                            helperText={errors5[`DNI_CI${row.id}`]?.message}
                                                            error={!!errors5[`DNI_CI${row.id}`] || isDNIuplicado(DNIRegistrados, field.value) || ExistentesDNICI(field.value,row.id)} 
                                                            style={{ width: '200px'} }
                                                            inputProps={{

                                                                maxLength: 15,
                                                                onKeyPress: (event) => {
                                                                    if (!/[0-9-]/.test(event.key)) {
                                                                      event.preventDefault();
                                                                    }
                                                                  },
                                                                  
                                                            }}
                                                        />
                                                     </FormControl>
                                                    )}
                                                    </InputMask>
                                                    )}
                                                    name={`DNI_CI${row.id}`}
                                                    control={controlTab5}
                                                />
                                                </TableCell>
                                                <TableCell>
                                                <FormLabel>
                                                        Documento o tarjeta de identidad (DNI) del comerciante individual
                                                </FormLabel>
                                                </TableCell>
                                                <TableCell>
                                                <Controller
                                                
                                                render={({ field }) => (
                                                    <FormControl fullWidth={true} error={!!errors5[`imagenDNI_CI${row.id}`]}>
                                                    <div>
                                                      {row.imagen ? (
                                                        <div>
                                                       {/*<img src={row.imagen} alt="Imagen" /> */}   
                                                          <p> {row.imagen}</p>
                                                        </div>
                                                      ) : (
                                                        <div>
                                                          <p>No se ha seleccionado ninguna imagen</p>
                                                        </div>
                                                      )}
                                                     <label
                                                        htmlFor={`imagenDNI_CI${row.id}`}
                                                        className="custom-file-upload"
                                                        style={{ color: 'blue' }}
                                                        >
                                                        Cargar imagen
                                                        </label>

                                                      <input
                                                        type="file"
                                                        accept="image/*"
                                                        id={`imagenDNI_CI${row.id}`}
                                                        style={{ display: "none" }}
                                                        onChange={(e) => {
                                                          field.onChange(e);
                                                          handleImageChangeDNI(e, row.id);
                                                        }}
                                                      />
                                                    </div>
                                                    <FormHelperText>{errors5[`imagenDNI_CI${row.id}`]?.message}</FormHelperText>
                                                  </FormControl>
                                                  
                                                  
                                                  
                                                 )}
 
                                                name={`imagenDNI_CI${row.id}`}
                                                control={controlTab5}
                                                />
                                                </TableCell>
                                                <TableCell>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                    variant="outlined"
                                                    color="success"
                                                    onClick={handleAddRowDNI}
                                                    style={{ marginRight: '10px' }}  >
                                                    <Icon>add_box</Icon>
                                                    </Button>

                                                    <Button
                                                    variant="outlined"
                                                    className="text-center"
                                                    color="error"
                                                    size="medium"
                                                    onClick={(e) => handleRemoveRowDNI(row.id)}
                                                    disabled={row.id === 0}
                                                    >
                                                    <DeleteIcon />
                                                    </Button>
                                                </div>
                                                </TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                    </TableContainer>  
     
                              
                                </AccordionDetails>
                            </Accordion>

                                            {/*   #2   */}
                        {representanteLegal && (                        
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: '#ffe6b8'}}
                                >
                                <Typography>Documentos del Representante Legal</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                               

                                <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                        
                                        <TableBody>
                                            {rowsRTNrep.map((row) => (
                                            <TableRow key={row.id}>
                                              
                                              <TableCell>
                                              <Controller
                                                render={({ field }) => (
                                                
                                                    <InputMask
                                                  //  mask="9999-9999-999999"
                                                  
                                                    onBlur={() => {
                                                        field.onBlur();
                                                        if (isDNIuplicado(DNIRegistrados, field.value)) {
                                                            ToastWarningPersonalizado("El documento ya está registrado en un contrato");
                                                        }
                                                        if(ExistentesRTNRL(field.value,row.id)){
                                                            ToastWarningPersonalizado("El número de documento ya esta siendo registrado");
                                                        }
                                                    }}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    maskChar=""
                                                    >
                                                    {() => (
                                                        <FormControl fullWidth={true}>
                                                         <TextField
                                                             {...field}
                                                            variant="outlined"
                                                            value={modelo5[`RTN_RL${row.id}`]}
                                                            onBlur={(e) => handleInputChangeRTNrep(e, row.id)}
                                                            fullWidth={true}          
                                                            error={!!errors5[`RTN_RL${row.id}`] || isDNIuplicado(DNIRegistrados, field.value)|| ExistentesRTNRL(field.value,row.id)}
                                                            helperText={errors5[`RTN_RL${row.id}`]?.message}
                                                            style={{ width: '200px'} }
                                                            inputProps={{

                                                                maxLength: 16,
                                                                onKeyPress: (event) => {
                                                                    if (!/[0-9-]/.test(event.key)) {
                                                                      event.preventDefault();
                                                                    }
                                                                  },
                                                                  
                                                            }}
                                                        />
                                                       
                                                        </FormControl>
                                                    )}
                                                    </InputMask>
                                                    )}
                                                    name={`RTN_RL${row.id}`}
                                                    control={controlTab5}
                                                />
                                            
                                                </TableCell>
                                                <TableCell>
                                                <FormLabel>
                                                Registro tributario nacional (RTN) del representante legal
                                                </FormLabel>
                                                </TableCell>
                                                <TableCell>
                                                <Controller
                                               
                                               render={({ field }) => (
                                        
                                            <FormControl fullWidth={true} error={!!errors5[`imagenRTN_RL${row.id}`]}>
                                            <div>
                                            {row.imagen ? (
                                                <div>
                                            {/*<img src={row.imagen} alt="Imagen" /> */}   
                                                <p> {row.imagen}</p>
                                                </div>
                                            ) : (
                                                <div>
                                                <p>No se ha seleccionado ninguna imagen</p>
                                                </div>
                                            )}
                                            <label
                                                htmlFor={`imagenRTN_RL${row.id}`}
                                                className="custom-file-upload"
                                                style={{ color: 'blue' }}
                                                >
                                                Cargar imagen
                                                </label>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                id={`imagenRTN_RL${row.id}`}
                                                style={{ display: "none" }}
                                                onChange={(e) => {
                                                    field.onChange(e); 
                                                    handleImageChangeRTNrep(e, row.id); 
                                                    }}
                                            />
                                            </div>
                                            <FormHelperText>{errors5[`imagenRTN_RL${row.id}`]?.message}</FormHelperText>
                                            </FormControl>

                                                )}

                                                name={`imagenRTN_RL${row.id}`}
                                                control={controlTab5}
                                                />

                                                </TableCell>
                                                <TableCell>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                    variant="outlined"
                                                    color="success"
                                                    onClick={handleAddRowRTNrep}
                                                    style={{ marginRight: '10px' }} >
                                                    <Icon>add_box</Icon>
                                                    </Button>

                                                    <Button
                                                    variant="outlined"
                                                    className="text-center"
                                                    color="error"
                                                    size="medium"
                                                    onClick={() => handleRemoveRowRTNrep(row.id)}
                                                    disabled={row.id === 0}
                                                    >
                                                    <DeleteIcon />
                                                    </Button>
                                                </div>
                                                </TableCell>
                                                   

                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                    </TableContainer>

                                   <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                        
                                        <TableBody>
                                            {rowsDNIrep.map((row) => (
                                            <TableRow key={row.id}>
                                              
                                              <TableCell>
                                              <Controller
                                                render={({ field }) => (
                                               
                                                    <InputMask
                                                   // mask="9999-9999-99999"
                                                    onChange={field.onChange}
                                                    onBlur={() => {
                                                       field.onBlur();
                                                        if (isDNIuplicado(DNIRegistrados, field.value)) {
                                                            ToastWarningPersonalizado("El documento ya está registrado en un contrato");
                                                        }
                                                        if(ExistentesDNIRL(field.value,row.id)){
                                                            ToastWarningPersonalizado("El número de documento ya esta siendo registrado");
                                                        }
                                                    }}
                                                    value={field.value}                                              
                                                    maskChar=""
                                                    >
                                                    {() => (
                                                    <FormControl  fullWidth={true}>
                                                       
                                                       <TextField
                                                            {...field}
                                                            value={modelo5[`DNI_RL${row.id}`]}
                                                            onBlur={(e) => handleInputChangeDNIrep(e, row.id)}
                                                            variant="outlined"
                                                            error={!!errors5[`DNI_RL${row.id}`] || isDNIuplicado(DNIRegistrados, field.value) || ExistentesDNIRL(field.value,row.id)}
                                                            fullWidth={true}
                                                            helperText={errors5[`DNI_RL${row.id}`]?.message}
                                                            style={{ width: '200px'} }
                                                            inputProps={{

                                                                maxLength: 15,
                                                                onKeyPress: (event) => {
                                                                    if (!/[0-9-]/.test(event.key)) {
                                                                      event.preventDefault();
                                                                    }
                                                                  },
                                                                  
                                                            }}
                                                        />
                                                         </FormControl>
                                                    )}
                                                    </InputMask>
                                                   )}
                                                   name={`DNI_RL${row.id}`}
                                                   control={controlTab5}
                                               />

                                                </TableCell>
                                                <TableCell>
                                                <FormLabel>
                                                        Documento o tarjeta de identidad (DNI) del representante legal
                                                </FormLabel>
                                                </TableCell>
                                                <TableCell>

                                                <Controller
                                              
                                              render={({ field }) => (
                              

                                            <FormControl fullWidth={true} error={!!errors5[`imagenDNI_RL${row.id}`]}>
                                            <div>
                                            {row.imagen ? (
                                                <div>
                                            {/*<img src={row.imagen} alt="Imagen" /> */}   
                                                <p> {row.imagen}</p>
                                                </div>
                                            ) : (
                                                <div>
                                                <p>No se ha seleccionado ninguna imagen</p>
                                                </div>
                                            )}
                                            <label
                                                htmlFor={`imagenDNI_RL${row.id}`}
                                                className="custom-file-upload"
                                                style={{ color: 'blue' }}
                                                >
                                                Cargar imagen
                                                </label>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                id={`imagenDNI_RL${row.id}`}
                                                style={{ display: "none" }}
                                                onChange={(e) => {
                                                    field.onChange(e); 
                                                    handleImageChangeDNIrep(e, row.id); 
                                                    }}
                                            />
                                            </div>
                                            <FormHelperText>{errors5[`imagenDNI_RL${row.id}`]?.message}</FormHelperText>
                                            </FormControl>
                                                )}

                                                name={`imagenDNI_RL${row.id}`}
                                                control={controlTab5}
                                                />
                                                </TableCell>
                                                <TableCell>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                    variant="outlined"
                                                    color="success"
                                                    onClick={handleAddRowDNIrep}
                                                    style={{ marginRight: '10px' }} >
                                                    <Icon>add_box</Icon>
                                                    </Button>

                                                    <Button
                                                    variant="outlined"
                                                    className="text-center"
                                                    color="error"
                                                    size="medium"
                                                    onClick={() => handleRemoveRowDNIrep(row.id)}
                                                    disabled={row.id === 0}
                                                    >
                                                    <DeleteIcon />
                                                    </Button>
                                                </div>
                                                </TableCell>

                                                    

                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                    </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                        )}
                                        {/*   #3   */}
                            <Accordion >
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: '#ffda95'}}
                                >
                                <Typography>Declaraciones del Comerciante Individual</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                              
                               <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                        
                                        <TableBody>
                                            {rowsDecla.map((row) => (
                                            <TableRow key={row.id}>
                                              
                                              <TableCell>
                                                                         
                                              <Controller 
                                                render={({ field }) => (
                                                    <FormControl fullWidth={true}>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        style={{ width: '200px' }}
                                                      // value={row.doco_Numero_O_Referencia}
                                                        onBlur={(e) => {
                                                        setValueTab5(`DECL_CI${row.id}`, e.target.value)
                                                        handleInputChangeDecla(e, row.id);
                                                        field.onChange(e);
                                                        if (ExistentesDecla(e.target.value, row.id)) {
                                                            ToastWarningPersonalizado("El número de documento ya está siendo registrado");
                                                        }
                                                        }}
                                                        error={!!errors5[`DECL_CI${row.id}`] || ExistentesDecla(field.value, row.id)}
                                                        helperText={errors5[`DECL_CI${row.id}`]?.message}
                                                        inputProps={{
                                                        maxLength: 10,
                                                        }}
                                                    />
                                                    </FormControl> 
                                                )}
                                                name={`DECL_CI${row.id}`} 
                                                control={controlTab5}
                                                />

                                                </TableCell>
                                                <TableCell>
                                                <FormLabel>
                                                   Declaración de comerciante individual y sus modificaciones si las hubiera
                                                </FormLabel>
                                                </TableCell>
                                                <TableCell>
                                                <Controller
                                         
                                                render={({ field }) => (
                                              <FormControl fullWidth={true} error={!!errors5[`imagenDECL_CI${row.id}`]}>
                                                <div>
                                                {row.imagen ? (
                                                    <div>
                                                {/*<img src={row.imagen} alt="Imagen" /> */}   
                                                    <p> {row.imagen}</p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                    <p>No se ha seleccionado ninguna imagen</p>
                                                    </div>
                                                )}
                                                <label
                                                    htmlFor={`imagenDECL_CI${row.id}`}
                                                    className="custom-file-upload"
                                                    style={{ color: 'blue' }}
                                                    >
                                                    Cargar imagen
                                                    </label>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id={`imagenDECL_CI${row.id}`}
                                                    style={{ display: "none" }}
                                                    onChange={(e) => {
                                                        field.onChange(e); 
                                                        handleImageChangeDecla(e, row.id); 
                                                        }}
                                                />
                                                </div>
                                                <FormHelperText>{errors5[`imagenDECL_CI${row.id}`]?.message}</FormHelperText>
                                                </FormControl>
                                                    )}
                                                name={`imagenDECL_CI${row.id}`}
                                                control={controlTab5}
                                                />
                                                </TableCell>
                                                <TableCell>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                    variant="outlined"
                                                    color="success"
                                                    onClick={handleAddRowDecla}
                                                    style={{ marginRight: '10px' }} >
                                                    <Icon>add_box</Icon>
                                                    </Button>

                                                    <Button
                                                    variant="outlined"
                                                    className="text-center"
                                                    color="error"
                                                    size="medium"
                                                    onClick={() => handleRemoveRowDecla(row.id)}
                                                    disabled={row.id === 0}
                                                    >
                                                    <DeleteIcon />
                                                    </Button>
                                                </div>
                                                </TableCell>
                                                    

                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                    </TableContainer> 

                        </AccordionDetails>
                    </Accordion>
                            
                            </Grid>


                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    alignItems: "right",
                                }}
                            >
                                <Button
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    type="submit"
                                    onClick={guardarTap5}
                                >
                                    Guardar
                                </Button>

                                <Button
                                startIcon={<Icon>close</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px' }}
                                sx={{
                                backgroundColor: '#DAD8D8',
                                color: 'black',
                                '&:hover': { backgroundColor: '#BFBABA' },
                                }}
                                onClick={DialogCancelarContrato1}
                            >
                                Cancelar
                            </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </TabPanel>

                    


                <TabPanel value={value} index={5} dir={theme.direction}>

                <div className="relative flex flex-col flex-auto min-w-0 overflow-hidden">
                <div className="relative pt-32 pb-48 sm:pt-80 sm:pb-96 px-24 sm:px-64 overflow-hidden">
                    <svg
                    className="-z-1 absolute inset-0 pointer-events-none"
                    viewBox="0 0 960 540"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMax slice"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <Box
                        component="g"
                        sx={{ color: 'divider' }}
                        className="opacity-20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="100"
                    >
                        <circle r="234" cx="196" cy="23" />
                        <circle r="234" cx="790" cy="491" />
                    </Box>
                    </svg>
                    <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.05 } }}
                    >
                        <img
                        height="50px"
                        width="200px"
                        src="https://i.ibb.co/tMqLY0W/SIMEXPRO-LETRAS-LOGO-CORTITO.png"
                        alt="logo"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                    >
                        <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
                        ¡Muchas gracias por agregar tu solicitud de contrato de adhesión!
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.15 } }}
                    >
                        <Typography
                        className="mt-12 sm:text-2xl text-center tracking-tight"
                        color="text.secondary"
                        >
                        Recuerda revisar todos los datos de tu solicitud de contrato para evitar cualquier inconveniente.
                        <br />
                        Puedes regresar a las secciones anteriores y modificar los datos digitados si cometiste algún error.
                        <br />
                        También puedes editar tu solicitud de contrato desde el apartado de edición que se encuentra en el índice.
                        <br />
                        Recuerda que podrás editar tu solicitud siempre y cuando no la hayas dado por finalizada.
                        <br />
                        <br />
                        ¿Deseas salir de la creación de tu solicitud de contrato de adhesión para comerciante individual?
                        <br />
                        </Typography>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
                    <Button
                        startIcon={<Icon>arrow_back</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '10px' }}
                        sx={{
                        backgroundColor: '#634A9E', color: 'white',
                        "&:hover": { backgroundColor: '#6e52ae' },
                        }}
                        onClick={DialogSalir}
                    >
                        Salir
                    </Button>
                    </motion.div>
                    </div>
                    </div>
                </div>
                </TabPanel>


                </SwipeableViews>
            </Box>

            <Dialog
        open={salirContrato}
        fullWidth={true}
        onClose={DialogSalir}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Finalizacion de Contrato de adhesión para comerciante Individual
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Si finalizas tu solicitud de contrato no podrás volverla a editar
          <br></br>
          ¿Deseas dar por finalizada esta solicitud de contrato?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
              startIcon={<Icon>arrow_back</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={(e) => {
                Navigate("/ComercianteIndividual/Index");
              }}
            >
             Salir
            </Button>

            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color={"primary"}
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={botonStyle}
              onClick={Salir2}
            >
             Finalizar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>


      <Dialog
        open={cancelarContrato}
        fullWidth={true}
        onClose={DialogCancelarContrato1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Cancelar la modificación de la solicitud de contrato de adhesión
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          ¿Desea cancelar la modificación de esta solicitud de contrato?
          <br></br>
          Si presiona en "Cancelar sin guardar", los cambios realizados no se guardarán. 
          <br></br>
          Si presiona en "Guardar y Salir", se guardarán los cambios y el formulario se cerrará.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color={"primary"}
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={botonStyle}
              onClick={GuardarYSalir}
            >
             Guardar y Salir
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={CancelarNoGuardar}
            >
             Cancelar sin Guardar
            </Button>

          </Grid>
        </DialogActions>
      </Dialog>
        </Card>
    );
}

export default Comerciante_Individual_Editar;