import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import {
    Accordion,
    AccordionSummary,
    AppBar,
    Autocomplete,
    Box,
    Button,
    Card,
    CardMedia,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Icon,
    InputAdornment,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography,
    styled,
    tooltipClasses,
} from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useTheme } from "@mui/material/styles";
import { motion } from 'framer-motion';
import PropTypes, { string } from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useLocation, useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import History from "src/@history/@history";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import { ToastError, ToastSuccessEditar, ToastSuccessGuardado, ToastSuccessPersonalizado, ToastWarning, ToastWarningPersonalizado } from "src/styles/toastsFunctions";
import * as yup from "yup";
import PersonaJuridicaService from "./Persona_Juridica_Service";
import { set } from "lodash";

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



function Persona_Juridica_Editar() {
    const [phyno, setPhyno] = useState("")
    async function subirImagenAImgBB(imageUrl) {
        //Token de la API para subir imagenes
        const apikey = "0bb06001171f1563ed23f7f4adf38d2a"; //meter token al env
        const base64Image = imageUrl.split(',')[1]; // obtener la cadena Base64 sin el prefijo "data:image/png;base64,"
        const url = `https://api.imgbb.com/1/upload?key=${apikey}`;
        const body = new FormData();
        body.append('image', base64Image);

        try {
            let response = await fetch(url, {
                method: 'POST',
                body: body
            });

            if (!response.ok) {
                throw new Error('Error al enviar la imagen');
            }
            return (await response.json());
        } catch (error) {
        }
    }

    const botonStyle = {
        backgroundColor: "#634A9E",
        color: "white",
        "&:hover": { backgroundColor: "#6e52ae" },
    };

    const juridica = PersonaJuridicaService();

    const load_DDLs = Load_DDLs()

    //Variables DDL
    const [oficinas_DDL, setOficinas_DDL] = useState([]);
    const [estadosciviles_DDL, setEstadosCiviles_DDL] = useState([]);
    const [oficios_DDL, setOficios_DDL] = useState([]);
    const [provincias_DDL, setprovincias_DDL] = useState([]);
    const [ciudades_DDL, setciudades_DDL] = useState([]);
    const [aldea_DDL, setaldea_DDL] = useState([]);
    const [colonia_DDl, setcolonia_DDl] = useState([]);
    const [registrosExistentes, setRegistrosExistentes] = useState([]);
    const [correoAlternativoIgual, setCorreoAlternativoIgual] = useState(false);
    const [enviandoCodigo, setEnviandoCodigo] = useState(false);
    const [contador, setContador] = useState(15); // Inicializo el contador en 15 segundos
    const [dataReset, setDataReset] = useState({})
    const [dataReset2, setDataReset2] = useState({})
    const [CorreoValido, setCorreoValido] = useState(false);
    const [enviandoCodigo2, setEnviandoCodigo2] = useState(false);
    const [contador2, setContador2] = useState(15); //
    const Navigate = useNavigate();
    const theme = useTheme();
    const [Valor, setValor] = React.useState(0);

    const location = useLocation();
    const myData = location.state

    const [RegistroInsertado, setRegistroInsertado] = useState(false);
    const [cancelarContrato, setCancelarContrato] = useState(false);
  
    const RegirigirIndex = () => {   
      History.push("/PersonaJuridica/Index");
  }
  
  const DialogCancelarContrato1 = () => {
    setCancelarContrato(!cancelarContrato)
  }
  

  const CancelarNoGuardar = async() => {
    try { 
     
        ToastSuccessPersonalizado("Modificación de contrato de adeshión cancelado exitosamente");
        History.push("/PersonaJuridica/Index");
      
    } catch (error) {
      ToastError("Error inesperado");
    }
    
  }
  
  const GuardarYSalir = () => {
    if(RegistroInsertado){
      ToastSuccessPersonalizado("Contrato de adeshión guardado exitosamente");
      History.push("/PersonaJuridica/Index");
    }else{
      //ToastWarning();
       History.push("/PersonaJuridica/Index");
    }
  }
  
    //#region Tablas
    /************************************ TABLAS ************************************ */

    /* RTN TABLA SOCIEDAD MERCANTIL */

    const [rowsRTN, setRowsRTN] = useState([
        {
            id: 1,
            doco_Numero_O_Referencia: myData?.pers_RTN,
            documento: 'RTN-SM',
            imagen: null,
        },
    ]);


    const handleImageChangeRTN = (e, id) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const imageData = e.target.result;
                // setSelectedImage(imageData);

                // Aquí puedes llamar a una función para subir la imagen a ImgBB o cualquier otro servicio de tu elección.
                const response = await subirImagenAImgBB(imageData)

                const updatedRows = rowsRTN.map((row) =>
                    row.id === id ? { ...row, imagen: response.data.url } : row
                );

                setRowsRTN(updatedRows);

            };

            reader.readAsDataURL(file);
        }
    };


    const handleInputChangeRTN = (e, id) => {
        const { name, value } = e.target;
        setRowsRTN((prevRows) => {
            return prevRows.map((row) =>
                row.id === id ? { ...row, doco_Numero_O_Referencia: value } : row
            );
        });
    };



    /****** *RTN TABLA SOCIEDAD MERCANTIL **************/



    /****** *RTN TABLA REPRESENTANTE **************/

    const [rowsRTNrep, setRowsRTNrep] = useState([
        {
            id: 1,
            doco_Numero_O_Referencia: '',
            documento: 'RTN-RL',
            imagen: null,
        },
    ]);

    const handleAddRowRTNrep = () => {
        const x = {
            [`RTN-RL${rowsRTNrep.length + 1}`]: yup.string().required(`El campo es requerido`).test(
                "formato",
                "Ingrese un RTN Valido",
                ValidarRTN),
            [`IMG-RTN-RL${rowsRTNrep.length + 1}`]: yup.string().required('La imagen es obligatoria')
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

    const handleAddRowRTNrepLoad = (item) => {
        const newRow = {
            id: rowsRTNrep.length + 1,
            doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
            documento: 'RTN-RL',
            imagen: item.doco_URLImagen,
        };

        setRowsRTNrep([...rowsRTNrep, newRow]);
    };


    const handleRemoveRowRTNrep = (id) => {

        if (id) {
            delete Tap5accountSchema.fields[`RTN-RL${id}`]
            delete Tap5accountSchema.fields[`IMG-RTN-RL${id}`]
            setValue4(`RTN-RL${id}`, "")
            setValue4(`IMG-RTN-RL${id}`, "")

            let nuevoSchema = Tap5accountSchema.shape({
                ...Tap5accountSchema.fields,
            });

            nuevoSchema = Tap5accountSchema.shape({
                ...nuevoSchema.fields,
            });

            setTap5accountSchema(nuevoSchema)

            trigger4()
            const updatedRows = rowsRTNrep.filter((row) => row.id !== id);
            setRowsRTNrep(updatedRows);
        } else {
        }
    };

    const handleImageChangeRTNrep = (e, id) => {
        try {
            const file = e.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = async (e) => {
                    const imageData = e.target.result;

                    const response = await subirImagenAImgBB(imageData)
                    setValue4(`IMG-RTN-RL${id}`, response.data.url)

                    const updatedRows = rowsRTNrep.map((row) =>
                        row.id === id ? { ...row, imagen: response.data.url } : row
                    );
                    setRowsRTNrep(updatedRows);
                };

                reader.readAsDataURL(file);
            }
        } catch (error) {
        }
    };

    const handleInputChangeRTNrep = (e, id) => {
        const { name, value } = e.target;
        setRowsRTNrep((prevRows) => {
            return prevRows.map((row) =>
                row.id === id ? { ...row, doco_Numero_O_Referencia: value } : row
            );
        });
    };

    /*Division entre tablas*/

    const [rowsDNIrep, setRowsDNIrep] = useState([
        {
            id: 1,
            doco_Numero_O_Referencia: phyno,
            documento: 'DNI-RL',
            imagen: null,
        },
    ]);

    // Funciones para agregar y eliminar filas en la segunda tabla (DNI)
    const handleAddRowDNIrep = () => {

        const x = {
            [`DNI-RL${rowsDNIrep.length + 1}`]: yup.string().required(`El campo es requerido`).test(
                "formato",
                "Ingrese un DNI Valido",
                ValidarDNI),
            [`IMG-DNI-RL${rowsDNIrep.length + 1}`]: yup.string().required('La imagen es obligatoria')
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
        if (id) {
            setValue4(`IMG-DNI-RL${id}`, "")
            setValue4(`DNI-RL${id}`, "")
            delete Tap5accountSchema.fields[`DNI-RL${id}`]
            delete Tap5accountSchema.fields[`IMG-DNI-RL${id}`]

            let nuevoSchema = Tap5accountSchema.shape({
                ...Tap5accountSchema.fields,
            });

            nuevoSchema = Tap5accountSchema.shape({
                ...nuevoSchema.fields,
            });

            setTap5accountSchema(nuevoSchema)

            trigger4()
            const updatedRows = rowsDNIrep.filter((row) => row.id !== id);
            setRowsDNIrep(updatedRows);
        }
    };

    const handleImageChangeDNIrep = (e, id) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const imageData = e.target.result;
                // setSelectedImage(imageData);

                // Aquí puedes llamar a una función para subir la imagen a ImgBB o cualquier otro servicio de tu elección.
                const response = await subirImagenAImgBB(imageData)
                setValue4(`IMG-DNI-RL${id}`, response.data.url)

                const updatedRows = rowsDNIrep.map((row) =>
                    row.id === id ? { ...row, imagen: response.data.url } : row
                );

                setRowsDNIrep(updatedRows);

            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChangeDNIrep = (e, id) => {
        const { name, value } = e.target;
        setRowsDNIrep((prevRows) => {
            return prevRows.map((row) =>
                row.id === id ? { ...row, doco_Numero_O_Referencia: value } : row
            );
        });
    };


    /*Division entre tablas*/


    const [rowsEscri, setRowsEscri] = useState([
        {
            id: 1,
            doco_Numero_O_Referencia: '',
            documento: 'EPC-SM',
            imagen: null,
        },
    ]);


    const handleAddRowDecla = () => {
        const x = {
            [`EPC-SM${rowsEscri.length + 1}`]: yup.string().required(`El campo es requerido`),
            [`IMG-EPC-SM${rowsEscri.length + 1}`]: yup.string().required('La imagen es obligatoria')
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
            id: rowsEscri.length + 1,
            doco_Numero_O_Referencia: '',
            documento: 'EPC-SM',
            imagen: null,
        };
        setRowsEscri([...rowsEscri, newRow]);
    };

    const handleRemoveRowEscri = (id) => {
        if (id) {
            delete Tap5accountSchema.fields[`EPC-SM${id}`]
            delete Tap5accountSchema.fields[`IMG-EPC-SM${id}`]

            let nuevoSchema = Tap5accountSchema.shape({
                ...Tap5accountSchema.fields,
            });

            nuevoSchema = Tap5accountSchema.shape({
                ...nuevoSchema.fields,
            });

            setTap5accountSchema(nuevoSchema)

            trigger4()


            const updatedRows = rowsEscri.filter((row) => row.id !== id);
            setRowsEscri(updatedRows);
        }
    };


    const handleImageChangeEscri = (e, id) => {

        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const imageData = e.target.result;
                // setSelectedImage(imageData);

                // Aquí puedes llamar a una función para subir la imagen a ImgBB o cualquier otro servicio de tu elección.
                const response = await subirImagenAImgBB(imageData)
                setValue4(`IMG-EPC-SM${id}`, response?.data?.url)

                const updatedRows = rowsEscri.map((row) =>
                    row.id === id ? { ...row, imagen: response.data.url } : row
                );
                setRowsEscri(updatedRows);

            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChangeEscri = (e, id) => {
        const { name, value } = e.target;
        setRowsEscri((prevRows) => {
            return prevRows.map((row) =>
                row.id === id ? { ...row, doco_Numero_O_Referencia: value } : row
            );
        });
    };

    /************************************ TABLAS ************************************ */
    //#endregion

    const [codigo1, setToken] = useState("")
    const [codigo2, setToken2] = useState("")

    const ValidarRTN = (value) => {
        if (/\d{4}-\d{4}-\d{6}$/.test(value)) {
            return true;
        }
        return false;
    };

    const ValidarCorreoElectronicoIguales = (value) => {
        if (datosTap4.peju_CorreoElectronico != "") {
            if (datosTap4.peju_CorreoElectronicoAlternativo != datosTap4.peju_CorreoElectronico) {
                return true;
            }
        }
        return false;
    };


    const ValidarCorreoElectronicoIguales1 = (value) => {
        if (datosTap4.peju_CorreoElectronicoAlternativo != "") {
            if (datosTap4.peju_CorreoElectronicoAlternativo != datosTap4.peju_CorreoElectronico) {
                return true;
            }
        }
        return false;
    };

    const ValidarTelefonosIgualesFijoEmpresa = (value) => {
        if (datosTap4.peju_TelefonoEmpresa != datosTap4.peju_TelefonoFijoRepresentanteLegal && datosTap4.peju_TelefonoEmpresa != datosTap4.peju_TelefonoRepresentanteLegal) {
            return true;
        }
        return false;
    };

    const ValidarTelefonosIgualesFijoRepresentanteLegar = (value) => {
        if (datosTap4.peju_TelefonoFijoRepresentanteLegal != datosTap4.peju_TelefonoEmpresa && datosTap4.peju_TelefonoFijoRepresentanteLegal != datosTap4.peju_TelefonoRepresentanteLegal) {
            return true;
        }
        return false;
    };

    const ValidarTelefonosIgualesRepresentanteLegar = (value) => {
        if (datosTap4.peju_TelefonoRepresentanteLegal != datosTap4.peju_TelefonoEmpresa && datosTap4.peju_TelefonoRepresentanteLegal != datosTap4.peju_TelefonoFijoRepresentanteLegal) {
            return true;
        }
        return false;
    };

    const ValidarDNI = (value) => {
        if (/\d{4}-\d{4}-\d{5}$/.test(value)) {
            return true;
        }
        return false;
    };

    const ValidarTelefono = (value) => {
        if (/^\+504 \d{4}-\d{4}$/.test(value)) {
            return true;
        }
        return false;
    };

    const ValidarCorreoElectronico = (value) => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            return true;
        }
        return false;
    };

    const validarToken1 = (token) => {
        if (token == codigo1) {
            return true;
        } else {
            return false;
        }
    }

    const validarToken2 = (token) => {
        if (token == codigo2) {
            return true;
        } else {
            return false;
        }
    }

    /* Campos del Tap 1*/
    const Tap1defaultValues = {
        id: "",
        pers_Id: "",
        oficina: null,
        estadocivil: null,
        oficio: null,
    };

    const Tap2defaultValues = {
        id: '',
        provincia: null,
        ciudad: null,
        aldea: null,
        colonia: null,
        numeroLocal: "",
        puntoReferencia: "",
    };

    const Tap3defaultValues = {
        id: '',
        provincia: null,
        ciudad: null,
        aldea: null,
        colonia: null,
        peju_TelefonoRepresentanteLegal: "",
        numeroLocal: "",
        puntoReferencia: "",
    };

    const Tap4defaultValues = {
        id: '',
        peju_TelefonoEmpresa: "",
        peju_TelefonoFijoRepresentanteLegal: "",
        peju_TelefonoRepresentanteLegal: "",
        peju_CorreoElectronico: "",
        peju_CorreoElectronicoAlternativo: "",
    };

    const Tap5defaultValues = {
        id: '',
        RTN_RL0: '',
    };

    const Tap1accountSchema = yup.object().shape({
        id: yup.string(),
        personaid: yup.string(),
        pers_Nombre: yup.string().required("").trim(""),
        pers_Id: yup.string().required("").trim().test(ValidarRTN),
        oficina: yup.object().required(""),
        estadocivil: yup.object().required(""),
        oficio: yup.object().required(""),
    });

    const Tap2accountSchema = yup.object().shape({
        id: yup.string(),
        provincia: yup.object().required(""),
        ciudad: yup.object().required(""),
        aldea: yup.object(),
        colonia: yup.object().required(""),
        numeroLocal: yup.string().trim().required(""),
        puntoReferencia: yup.string().trim(),
    });

    const Tap3accountSchema = yup.object().shape({
        id: yup.string(),
        provincia: yup.object().required(""),
        ciudad: yup.object().required(""),
        aldea: yup.object(),
        colonia: yup.object().required(""),
        numeroLocal: yup.string().trim().required(""),
        puntoReferencia: yup.string().trim(),
    });

    const Tap4accountSchema = yup.object().shape({
        id: yup.string(),
        peju_TelefonoEmpresa: yup.string("Ingrese un numero de telefono").required("Ingrese un numero de telefono").trim()
            .test(
                'Ingrese un numero de telefono valido',
                'Ingrese un numero de telefono valido',
                ValidarTelefono)
            .test(
                'Los telefonos tienen que ser diferentes',
                'Los telefonos tienen que ser diferentes',
                ValidarTelefonosIgualesFijoEmpresa
            ),
        peju_TelefonoFijoRepresentanteLegal: yup.string().required("").trim()
            .test(
                'Ingrese un numero de telefono valido',
                'Ingrese un numero de telefono valido',
                ValidarTelefono)
            .test(
                'Los telefonos tienen que ser diferentes',
                'Los telefonos tienen que ser diferentes',
                ValidarTelefonosIgualesFijoRepresentanteLegar
            ),
        peju_TelefonoRepresentanteLegal: yup.string().required("").trim()
            .test(
                'Ingrese un numero de telefono valido',
                'Ingrese un numero de telefono valido',
                ValidarTelefono)
            .test(
                'Los telefonos tienen que ser diferentes',
                'Los telefonos tienen que ser diferentes',
                ValidarTelefonosIgualesRepresentanteLegar
            ),
        peju_CorreoElectronico: yup.string().required("Debe ingresar un correo electrónico válido").trim().email("Debe ingresar un correo electrónico válido").test(
            'Los correos electronicos no pueden ser iguales',
            'Los correos electronicos no pueden ser iguales',
            ValidarCorreoElectronicoIguales).email("Debe ingresar un correo electrónico válido"),
        peju_CorreoElectronicoAlternativo: yup.string().trim().email("Debe ingresar un correo electrónico válido"),
        codigo2: yup.string().when('peju_CorreoElectronicoAlternativo', {
            is: (peju_CorreoElectronicoAlternativo) => peju_CorreoElectronicoAlternativo && peju_CorreoElectronicoAlternativo.trim() !== '',
            then: yup.string().required('El código de verificación es requerido').test(
                "formato",
                "El código de verficación es incorrecto",
                validarToken2
            ),
        }),

        codigo1: yup.string().required("El código de verificación es requerido")
            .test(
                "formato",
                "El código de verficación es incorrecto",
                validarToken1
            ),
    });

    const [Tap5accountSchema, setTap5accountSchema] = useState(
        yup.object().shape({
            id: yup.string(),
            RTN_SM: yup.string().test(
                "formato",
                "Ingrese un RTN Valido",
                ValidarRTN),
            img: yup.string()
        }),

    )

    //Cargado de las variables DDL
    async function ddls() {

        setOficinas_DDL(await load_DDLs.Oficinas());
        setEstadosCiviles_DDL(await load_DDLs.Estadosciviles());
        setOficios_DDL(await load_DDLs.Oficios());
        setprovincias_DDL(await load_DDLs.ProvinciasPorPais(97))
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

    const CiudadesGet = async (id) => {
        try {
            if (id) {
                const data = await load_DDLs.CiudadesPorProvincia(parseInt(id))
                setciudades_DDL(data)
            } else {
                setciudades_DDL([])
            }
        } catch (error) {
            
        }
    };

    const AldeasGet = async (id) => {
        try {
            if (id) {
                const data = await load_DDLs.aldeaPorCiudad(parseInt(id))
                
                setaldea_DDL(data)
            } else {
                setaldea_DDL([])
            }
        } catch (error) {
            
        }
    };

    const ColoniasGet = async (id) => {
        try {
            if (id) {
                const data = await load_DDLs.ColoniasPorCiudad(parseInt(id))
                setcolonia_DDl(data)
            } else {
                setcolonia_DDl([])
            }
        } catch (error) {
            
        }
    };

    const fetchRegistros = async () => {
        try {
            const response = await juridica.listar();

            setRegistrosExistentes(response);

        } catch (error) {
            
        }
    };

    async function cargar() {

        fetchRegistros();
        ddls();

        // CARGAR DATOS DEL TAP1
        setValue('id', myData.peju_Id)
        setValue('pers_Id', myData.pers_RTN)
        setValue('pers_Nombre', myData.pers_Nombre)
        setValue('oficina', { value: myData.ofic_Id, label: myData.ofic_Nombre })
        setValue('estadocivil', { value: myData.escv_Id, label: myData.escv_Nombre })
        setValue('oficina', { value: myData.ofic_Id, label: myData.ofic_Nombre })
        setValue('oficio', { value: myData.ofpr_Id, label: myData.ofpr_Nombre })

        // CARGAR DATOS DEL TAP 2
        setValue1('id', myData.peju_Id)
        setValue1('provincia', myData.pvin_Id === 0 && myData.provinciaEmpresa === null ? { value: 0, label: '' } : { value: myData.pvin_Id, label: myData.provinciaEmpresa })
        setValue1('ciudad', myData.ciud_Id === 0 && myData.ciudadEmpresa === null ? { value: 0, label: '' } : { value: myData.ciud_Id, label: myData.ciudadEmpresa })
        setValue1('aldea', myData.alde_Id === 0 && myData.aldeaEmpresa === null ? { value: 0, label: '' } : { value: myData.alde_Id, label: myData.aldeaEmpresa })
        setValue1('colonia', myData.colo_Id === 0 && myData.coliniaEmpresa === null ? { value: 0, label: '' } : { value: myData.colo_Id, label: myData.coliniaEmpresa })
        setValue1('numeroLocal', myData.peju_NumeroLocalApart)
        setValue1('puntoReferencia', myData.peju_PuntoReferencia)

        // CARGAR DATOS DEL TAP 3
        setValue2('id', myData.peju_Id)
        setValue2('provincia', myData.provinciaIdRepresentante === 0 && myData.provinciaRepresentante === null ? { value: 0, label: '' } : { value: myData.provinciaIdRepresentante, label: myData.provinciaRepresentante })
        setValue2('ciudad', myData.peju_CiudadIdRepresentante === 0 && myData.ciudadRepresentante === null ? { value: 0, label: '' } : { value: myData.peju_CiudadIdRepresentante, label: myData.ciudadRepresentante })
        setValue2('aldea', myData.peju_AldeaIdRepresentante === 0 && myData.aldeaRepresemtante === null ? { value: 0, label: '' } : { value: myData.peju_AldeaIdRepresentante, label: myData.aldeaRepresemtante })
        setValue2('colonia', myData.peju_ColoniaRepresentante === 0 && myData.coloniaRepresentante === null ? { value: 0, label: '' } : { value: myData.peju_ColoniaRepresentante, label: myData.coloniaRepresentante })
        setValue2('numeroLocal', myData.peju_NumeroLocalRepresentante)
        setValue2('puntoReferencia', myData.peju_PuntoReferenciaRepresentante)

        // CARGAR DATOS DEL TAP 4
        setValue3('id', myData.peju_Id)
        setValue3('peju_TelefonoEmpresa', myData.peju_TelefonoEmpresa)
        setValue3('peju_TelefonoFijoRepresentanteLegal', myData.peju_TelefonoFijoRepresentanteLegal)
        setValue3('peju_TelefonoRepresentanteLegal', myData.peju_TelefonoRepresentanteLegal)
        setValue3('peju_CorreoElectronico', myData.peju_CorreoElectronico)
        setValue3('peju_CorreoElectrinicoAlternativo', myData.peju_CorreoElectronicoAlternativo)

        // CARGAR DATOS DEL TAP 5
        setValue4('id', myData.peju_Id)
        setValue4('RTN_SM', myData.pers_RTN)
        setPhyno(myData.pers_RTN)


        if (!enviandoCodigo) {
            setContador(15);
        }

        if (!enviandoCodigo2) {
            setContador(15);
        }

        const documentos = await juridica.cargarDocumentos(myData?.peju_Id)


        const rtnSM = documentos.find(item => item.doco_TipoDocumento === "RTN-SM")
        setValue4('img', rtnSM?.doco_URLImagen)

        /*Esto es para cargar la url de la imagen en el primer rtn que es que viene por defecto */
        const temp = [...rowsRTN]
        temp[0].imagen = rtnSM.doco_URLImagen
        setRowsRTN(temp)

        const z = documentos.filter((x) => (x.doco_TipoDocumento == "RTN-RL")).map((item, index) => {
            return {
                [`RTN-RL${index}`]: yup.string().required(`El campo es requerido`).test(
                    "formato",
                    "Ingrese un RTN Valido",
                    ValidarRTN),
                [`IMG-RTN-RL${index}`]: yup.string().required('La imagen es obligatoria')
            }
        })

        let nuevoSchema = Tap5accountSchema.shape({
            ...Tap5accountSchema.fields,
        });

        z.forEach(element => {
            nuevoSchema = Tap5accountSchema.shape({
                ...nuevoSchema.fields,
                ...element
            });
        });

        //Cargar los documentos de Registro tributario nacional (RTN) del representante legal 
        const x = documentos.filter((x) => (x.doco_TipoDocumento == "RTN-RL")).map((item, index) => {
            setValue4(`RTN-RL${index}`, item.doco_Numero_O_Referencia)
            setValue4(`IMG-RTN-RL${index}`, item.doco_URLImagen)
            return {
                id: index,
                doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                documento: 'RTN-RL',
                imagen: item.doco_URLImagen,
            }
        })

        setRowsRTNrep([...x]);

        //Cargar los documentos de Documento o tarjeta de identidad (DNI) del representante legal

        const z1 = documentos.filter((x) => (x.doco_TipoDocumento == "DNI-RL")).map((item, index) => {
            return {
                [`DNI-RL${index}`]: yup.string().required(`El campo es requerido`).test(
                    "formato",
                    "Ingrese un DNI Valido",
                    ValidarDNI),
                [`IMG-DNI-RL${index}`]: yup.string().required('el campo es requerido')
            }
        })

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
            setValue4(`DNI-RL${index}`, item.doco_Numero_O_Referencia)
            setValue4(`IMG-DNI-RL${index}`, item.doco_URLImagen)
            return {
                id: index,
                doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                documento: 'DNI-RL',
                imagen: item.doco_URLImagen,
            }
        })
        setRowsDNIrep([...x1])


        //Cargar los documentos de Escritura Publica de Constitución y sus modificaciones si las hubiera (de la sociedad mercantil)

        const z2 = documentos.filter((x) => (x.doco_TipoDocumento == "EPC-SM")).map((item, index) => {
            return {
                [`EPC-SM${index}`]: yup.string().required(`El campo es requerido`).trim(),
                [`IMG-EPC-SM${index}`]: yup.string().required('La imagen es obligatoria')
            }
        })

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

        const x2 = documentos.filter((x) => (x.doco_TipoDocumento == "EPC-SM")).map((item, index) => {
            setValue4(`EPC-SM${index}`, item.doco_Numero_O_Referencia)
            setValue4(`IMG-EPC-SM${index}`, item.doco_URLImagen)
            return {
                id: index,
                doco_Numero_O_Referencia: item.doco_Numero_O_Referencia,
                documento: 'EPC-SM',
                imagen: item.doco_URLImagen,
            }
        })
        setRowsEscri([...x2])


    }
    //useEffect para cargar datos al ingresar a la pantalla
    useEffect(() => {
        cargar()
    }, []);

    const handleChange = (event, newValue) => {
        setValor(newValue);
    };

    const handleChangeIndex = (index) => {
        setValor(index);
    };

    const [tabsEstado, settabsEstado] = useState({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
    });

    const validacion = (params, event) => {

        if (event) {
            event.preventDefault();
        }
        if ((params == 1)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
                tab5: false,
            });
            setValue(1);
        }

        if ((params == 2)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
                tab5: false
            });
            setValue(2);
        }

        if ((params == 3)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
                tab5: false
            });
            setValue(3);
        }

        if ((params == 4)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
                tab5: false
            });
            setValue(4);
        }

        if (params == 5) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
                tab5: false,
            });
            setValue(5);
        }

    };

    const [salirContrato, setSalirContrato] = useState(false);

    const DialogSalir = () => {
        setSalirContrato(!salirContrato)
    }

    const Salir2 = async () => {
        try {
            const response = await juridica.finalizar(datosTap1['id'])
            if (response.messageStatus == "1") {
                DialogSalir()
                ToastSuccessPersonalizado("Contrato de adeshión finalizado con exito")
                Navigate("/PersonaJuridica/Index");
            } else {
                ToastError()
            }
        } catch (error) {
            ToastError()
        }
    }


    //Declaracion del formulario del Tap 1
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState,
        watch,
        setValue } = useForm({
            Tap1defaultValues,
            mode: "all",
            resolver: yupResolver(Tap1accountSchema),
        });

    //Declaracion del formulario del Tap 2
    const {
        handleSubmit: handlesubmit1,
        reset: reset1,
        control: control1,
        formState: formState1,
        watch: watch1,
        setValue: setValue1,
        trigger: trigger1,
    } = useForm({
        Tap2defaultValues,
        mode: "all",
        resolver: yupResolver(Tap2accountSchema),
    });

    //Declaracion del formulario del Tap 3
    const {
        handleSubmit: handlesubmit2,
        reset: reset2,
        control: control2,
        formState: formState2,
        watch: watch2,
        setValue: setValue2,
        trigger: trigger2,
    } = useForm({
        Tap3defaultValues,
        mode: "all",
        resolver: yupResolver(Tap3accountSchema),
    });

    //Declaracion del formulario del Tap 4
    const {
        handleSubmit: handlesubmit3,
        reset: reset3,
        control: control3,
        formState: formState3,
        watch: watch3,
        setValue: setValue3,
        trigger: trigger3,
        getValues
    } = useForm({
        defaultValues: Tap4defaultValues,
        mode: "all",
        resolver: yupResolver(Tap4accountSchema),
    });

    //Declaracion del formulario del Tap 5
    const {
        handleSubmit: handlesubmit4,
        reset: reset4,
        control: control4,
        formState: formState4,
        watch: watch4,
        setValue: setValue4,
        trigger: trigger4,
    } = useForm({
        Tap5defaultValues,
        mode: "all",
        resolver: yupResolver(Tap5accountSchema),
    });

    //Validacion de campos vacios y errores
    const { isValid, dirtyFields, errors } = formState;
    const { isValid: isValid1, dirtyFields: dirtyFields1, errors: errors1 } = formState1;
    const { isValid: isValid2, dirtyFields: dirtyFields2, errors: errors2 } = formState2;
    const { isValid: isValid3, dirtyFields: dirtyFields3, errors: errors3 } = formState3;
    const { isValid: isValid4, dirtyFields: dirtyFields4, errors: errors4 } = formState4;

    //Datos de los formulario
    const datosTap1 = watch();
    const datosTap2 = watch1();
    const datosTap3 = watch2();
    const datosTap4 = watch3();
    const datosTap5 = watch4();

    const onSubmitUser = async () => {
        try {
            if (datosTap4.peju_CorreoElectronico != '') {
                const response = await juridica.EnviarCorreo(datosTap4)
                if (response['token']) {
                    ToastSuccessPersonalizado("Correo enviado")
                    setDataReset(response)
                    setEnviandoCodigo(true);
                    setToken(response['token'])
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
            } else {
                ToastWarningPersonalizado('Debe llenar el correo electronico')
            }
        } catch (error) {
            ToastError()
        }
    }

    const onSubmiToken2 = async () => {
        try {
            if (datosTap4.peju_CorreoElectronicoAlternativo != '') {
                const response = await juridica.EnviarCorreo2(datosTap4)
                if (response['token']) {
                    ToastSuccessPersonalizado("Correo enviado")
                    setDataReset2(response)
                    setEnviandoCodigo2(true);
                    setToken2(response['token'])
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
            } else {
                ToastWarningPersonalizado('Debe llenar el correo electronico alternativo')
            }
        } catch (error) {
            ToastError()
        }
    }


    //Validacion 1° TAP
    const validacionTap1 = () => {
        if (isValid) {

            tab1crear();
        } else {
            ToastWarning()
        }
    }

    const tab1crear = async () => {
        try {
            const response = await juridica.editar(datosTap1);
            if (response.data.data.messageStatus.includes('UNIQUE')) {
                ToastWarningPersonalizado("Ya hay una solicitud de contrato para esa persona juridica")
            } else if (response.data.data.messageStatus === "1") {
                ToastSuccessEditar()
                setValor(1)
                validacion(1)
                setRegistroInsertado(true);
            }
            else {
                
            }

        } catch {

        }
    }

    //Validacion 2° TAP
    const validacionTap2 = async () => {
        if (isValid1) {
            tab2crear();
        } else {
            ToastWarning()
        }
    }

    const tab2crear = async () => {
        try {

            const response = await juridica.creartab2(datosTap2, datosTap1['id']);
            if (response.data.data.messageStatus === "1") {
                ToastSuccessGuardado()
                setValor(2)
                validacion(2)
            }

        } catch (error) {
            
        }
    }

    //Validacion 3° TAP
    const validacionTap3 = () => {
        if (isValid2) {
            tab3crear();
        } else {
            ToastWarning()
        }
    }

    const tab3crear = async () => {
        try {

            const response = await juridica.creartab3(datosTap3, datosTap1['id']);
            if (response.data.data.messageStatus === "1") {
                ToastSuccessGuardado()
                setValor(3)
                validacion(3)
            }

        } catch (error) {
            
        }
    }

    //Validacion 4° TAP
    const validacionTap4 = () => {
        if (isValid3) {

            tab4crear();
        } else {
            ToastWarning()
        }
    }

    const tab4crear = async () => {
        try {
            const response = await juridica.creartab4(datosTap4, datosTap1['id']);
            if (response.data.data.messageStatus === "1") {
                ToastSuccessGuardado()
                setValor(4)
                validacion(4)
            }

        } catch (error) {
            
        }
    }

    //Validacion 5° TAP
    const validacionTap5 = () => {

        let nuevoSchema = Tap5accountSchema.shape({
            ...Tap5accountSchema.fields,
        });

        nuevoSchema = Tap5accountSchema.shape({
            ...nuevoSchema.fields,
        });

        setTap5accountSchema(nuevoSchema)

        trigger4()
        if (isValid4) {
            // ToastSuccessGuardado()
            InsertTab5()
        } else {
            ToastWarning()
        }

    }

    const InsertTab5 = async () => {
        try {
            const datos2 = [];

            rowsEscri.forEach(value => { datos2.push(value) })
            rowsRTNrep.forEach(value => { datos2.push(value) })
            rowsDNIrep.forEach(value => { datos2.push(value) })
            rowsRTN.forEach(value => { datos2.push(value) })


            const eliminarDocumentos = await juridica.eliminarDocumentos(datosTap1['id'])
            if (eliminarDocumentos.messageStatus === "1") {

                const response = await juridica.crearTiposDocumentos(datosTap1['id'], datos2);
                if (response.data.data.messageStatus === "1") {
                    ToastSuccessGuardado()
                    setValor(5)
                    validacion(5)
                } else {
                    ToastError()
                }

            }
        } catch (error) {
        }
    }

    const tab5crear = async () => {
        try {

            const response = await juridica.crearTiposDocumentos(datosTap5);
            if (response.data.data.messageStatus === "1") {
                ToastSuccessGuardado()
                History.push("/PersonaJuridica/index")
                setValor(5)
                validacion(5)
            }

        } catch (error) {
            
        }
    }

    // Función para agregar campos dinámicos
    const agregarCampoDinamico = (nombreCampo) => {
        // Clona el schema existente y agrega el nuevo campo
        const nuevoSchema = Tap5accountSchema.shape({
            ...Tap5accountSchema.fields,
            [nombreCampo]: yup.string().required(`El campo ${nombreCampo} es requerido`),
        });
        setTap5accountSchema(nuevoSchema); // Actualiza el estado con el nuevo schema
    };

    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/cFBKy66/CONTRATO-DE-ADHESI-N-PERSONA-JURIDICA.png"
                alt="Encabezado de la carta"
            />


            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                <AppBar position="static">
                    <Tabs
                        value={Valor}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ backgroundColor: "#e5e1fa", color: 'black' }}
                    >
                        <Tab
                            label="I. Datos Generales"
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="II. Domicilio de la Empresa"
                            {...a11yProps(1)}
                            disabled={tabsEstado.tab1}
                        />
                        <Tab
                            label="III. Domicilio del Representante Legal"
                            {...a11yProps(2)}
                            disabled={tabsEstado.tab2}
                        />
                        <Tab
                            label="IV. Información de Contacto"
                            {...a11yProps(3)}
                            disabled={tabsEstado.tab3}
                        />
                        <Tab
                            label="V. Documentos a Informar"
                            {...a11yProps(4)}
                            disabled={tabsEstado.tab4}
                        />
                        <Tab
                            label="VI. Finalizar Solicitud"
                            {...a11yProps(5)}
                            disabled={tabsEstado.tab5}
                        />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={Valor}
                    onChangeIndex={handleChangeIndex}
                >
                    <form onSubmit={handleSubmit((_data) => {
                    })}>
                        <TabPanel value={Valor} index={0} dir={theme.direction}>

                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ marginBottom: "30px" }}>
                                    <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                                        <Chip label="Registro de contrato de adhesión para Persona Juridica" />
                                    </Divider>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="">

                                        <Controller
                                            render={({ field, fieldState }) => (
                                                <InputMask
                                                    mask="9999-9999-999999"
                                                    value={field.value} // Establecer el valor del campo usando field.value
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    maskChar={null}
                                                >
                                                    {() => (
                                                        <FormControl error={!!fieldState.error} fullWidth={true}>
                                                            <FormLabel>
                                                                RTN del Solicitante:
                                                            </FormLabel>
                                                            <TextField
                                                                error={!!fieldState.error}
                                                                {...field}
                                                                variant="outlined"
                                                                fullWidth={true}
                                                                inputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start"></InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            <FormHelperText>{fieldState.error ? 'Ingrese un RTN Valido' : ''} </FormHelperText>
                                                        </FormControl>
                                                    )}
                                                </InputMask>
                                            )}
                                            name="pers_Id"
                                            control={control}
                                            defaultValue="" // Establecer el valor predeterminado aquí
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className="">

                                        <Controller
                                            render={({ field }) => (
                                                <FormControl error={!!errors.pers_Nombre} fullWidth={true}>
                                                    <FormLabel>
                                                        Nombre de la Persona Juridica:
                                                    </FormLabel>
                                                    <TextField
                                                        {...field}
                                                        error={!!errors.pers_Nombre}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        inputprops={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </FormControl>
                                            )}
                                            name="pers_Nombre"
                                            control={control}
                                        />


                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name="oficina"
                                            control={control}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors.oficina}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel error={!!errors.oficina} >
                                                        Oficina Donde Presentará la Solicitud y Documentación:
                                                    </FormLabel>
                                                    <Autocomplete
                                                        disableClearable={true}
                                                        {...field}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value.value
                                                        }
                                                        id="oficina"
                                                        options={oficinas_DDL}
                                                        value={datosTap1["oficina"] ?? null}
                                                        onChange={async (event, value) => {
                                                            setValue('oficina', value)
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors.oficina}
                                                                InputLabelProps={{ shrink: true }}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name="estadocivil"
                                            control={control}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors.estadocivil}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel error={!!errors.estadocivil} >
                                                        Estado Civil del Representante Legal:
                                                    </FormLabel>
                                                    <Autocomplete
                                                        disableClearable={true}
                                                        {...field}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value.value
                                                        }
                                                        id="oficina"
                                                        options={estadosciviles_DDL}
                                                        value={datosTap1["estadocivil"] ?? null}
                                                        onChange={async (event, value) => {
                                                            setValue('estadocivil', value)
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors.estadocivil}
                                                                InputLabelProps={{ shrink: true }}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name="oficio"
                                            control={control}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors.oficio}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel error={!!errors.oficio} >
                                                        Profesión u Oficio del Representante Legal:
                                                    </FormLabel>
                                                    <Autocomplete
                                                        disableClearable={true}
                                                        {...field}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value.value
                                                        }
                                                        id="oficio"
                                                        options={oficios_DDL}
                                                        value={datosTap1["oficio"] ?? null}
                                                        onChange={async (event, value) => {
                                                            setValue('oficio', value)
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors.oficio}
                                                                InputLabelProps={{ shrink: true }}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    </FormControl>
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
                                        type="submit"
                                        color="primary"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={validacionTap1}
                                    >
                                        Editar
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
                        </TabPanel>
                    </form>

                    <form onSubmit={handlesubmit1((_data) => {
                    })}>
                        <TabPanel value={Valor} index={1} dir={theme.direction}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ textAlign: "center", marginBottom: 3, color: "#575757" }}
                                >
                                    PARA EFECTO DE UBICACIÓN, EN EL CONTRATO DE ADHESIÓN SE MOSTRARÁ
                                    EL DOMICILIO FISCAL REGISTRADO EN LA ADMINISTRACIÓN TRIBUTARIA.
                                </Typography>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ marginBottom: "30px" }}>
                                    <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                                        <Chip label="Registro de contrato de adhesión para Persona Juridica" />
                                    </Divider>
                                </Grid>
                                <Grid item xs={6}>

                                    <Controller
                                        name="provincia"
                                        control={control1}
                                        render={({ field }) => (
                                            <FormControl
                                                error={!!errors1.provincia}
                                                fullWidth={true}
                                            >
                                                <FormLabel error={!!errors1.provincia} >
                                                    Departamento:
                                                </FormLabel>
                                                <Autocomplete
                                                    disableClearable={true}
                                                    {...field}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value.value
                                                    }
                                                    id="provincia"
                                                    options={provincias_DDL}
                                                    value={datosTap2["provincia"] ?? null}
                                                    onChange={async (event, value) => {
                                                        setValue1('provincia', value);
                                                        setValue1('ciudad', '');
                                                        setValue1('aldea', '');
                                                        CiudadesGet(value?.value)
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.provincia}
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
                                        name="ciudad"
                                        control={control1}
                                        render={({ field }) => (
                                            <FormControl
                                                error={!!errors1.ciudad}
                                                fullWidth={true}
                                            >
                                                <FormLabel error={!!errors1.ciudad}>
                                                    Ciudad:
                                                </FormLabel>
                                                <Autocomplete
                                                    disableClearable={true}
                                                    {...field}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value.value
                                                    }
                                                    id="ciudad"
                                                    options={ciudades_DDL}
                                                    value={datosTap2["ciudad"] ?? null}
                                                    onChange={async (event, value) => {
                                                        setValue1('ciudad', value);
                                                        setValue1('aldea', '');
                                                        AldeasGet(value?.value);
                                                        ColoniasGet(value?.value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.ciudad}
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
                                        control={control1}
                                        render={({ field }) => (
                                            <FormControl

                                                fullWidth={true}
                                            >
                                                <FormLabel >
                                                    Aldea:
                                                </FormLabel>
                                                <Autocomplete
                                                    disableClearable={true}
                                                    {...field}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value.value
                                                    }
                                                    id="aldea"
                                                    options={aldea_DDL}
                                                    value={datosTap2["aldea"] ?? null}
                                                    onChange={async (event, value) => {
                                                        setValue1('aldea', value)
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
                                        name="colonia"
                                        control={control1}
                                        render={({ field }) => (
                                            <FormControl
                                                error={!!errors1.colonia}
                                                fullWidth={true}
                                            >
                                                <FormLabel error={!!errors1.colonia}>
                                                    Colonia:
                                                </FormLabel>
                                                <Autocomplete
                                                    disableClearable={true}
                                                    {...field}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value.value
                                                    }
                                                    id="colonia"
                                                    options={colonia_DDl}
                                                    value={datosTap2["colonia"] ?? null}
                                                    onChange={async (event, value) => {
                                                        setValue1('colonia', value)
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.colonia}
                                                            InputLabelProps={{ shrink: true }}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        )}
                                    />

                                </Grid>

                                <Grid item xs={6}>
                                    <div className="">
                                        <Controller
                                            render={({ field }) => (
                                                <FormControl error={!!errors1.numeroLocal} fullWidth={true}>
                                                    <FormLabel>
                                                        Número del Local o Apartamento:
                                                    </FormLabel>
                                                    <TextField
                                                        {...field}
                                                        error={!!errors1.numeroLocal}
                                                        variant="outlined"

                                                        inputprops={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </FormControl>
                                            )}
                                            name="numeroLocal"
                                            control={control1}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className="">

                                        <Controller
                                            render={({ field }) => (
                                                <FormControl error={!!errors1.puntoReferencia} fullWidth={true}>
                                                    <FormLabel>
                                                        Punto de Referencia:
                                                    </FormLabel>
                                                    <TextField

                                                        {...field}
                                                        error={!!errors1.puntoReferencia}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        inputprops={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </FormControl>
                                            )}
                                            name="puntoReferencia"
                                            control={control1}
                                        />


                                    </div>
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
                                        type="submit"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={validacionTap2}
                                    >
                                        Editar
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
                                        onClick={DialogCancelarContrato1}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </form>

                    <form onSubmit={handlesubmit2((_data) => {
                    })}>
                        <TabPanel value={Valor} index={2} dir={theme.direction}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ textAlign: "center", marginBottom: 3, color: "#575757" }}
                                >
                                    SI HUBIESE INFORMADO REPRESENTACIÓN BAJO UN REPRESENTANTE LEGAL.
                                </Typography>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ marginBottom: "30px" }}>
                                    <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                                        <Chip label="Registro de contrato de adhesión para Persona Juridica" />
                                    </Divider>
                                </Grid>
                                <Grid item xs={6}>

                                    <Controller
                                        name="provincia"
                                        control={control2}
                                        render={({ field }) => (
                                            <FormControl
                                                error={!!errors2.provincia}
                                                fullWidth={true}
                                            >
                                                <FormLabel error={!!errors2.provincia} >
                                                    Departamento:
                                                </FormLabel>
                                                <Autocomplete
                                                    disableClearable={true}
                                                    {...field}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value.value
                                                    }
                                                    id="provincia"
                                                    options={provincias_DDL}
                                                    value={datosTap3["provincia"] ?? null}
                                                    onChange={async (event, value) => {
                                                        setValue2('provincia', value);
                                                        setValue2('ciudad', '');
                                                        setValue2('aldea', '');
                                                        CiudadesGet(value?.value)
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors2.provincia}
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
                                        name="ciudad"
                                        control={control2}
                                        render={({ field }) => (
                                            <FormControl
                                                error={!!errors2.ciudad}
                                                fullWidth={true}
                                            >
                                                <FormLabel error={!!errors2.ciudad}>
                                                    Ciudad:
                                                </FormLabel>
                                                <Autocomplete
                                                    disableClearable={true}
                                                    {...field}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value.value
                                                    }
                                                    id="ciudad"
                                                    options={ciudades_DDL}
                                                    value={datosTap3["ciudad"] ?? null}
                                                    onChange={async (event, value) => {
                                                        setValue2('ciudad', value);
                                                        setValue2('aldea', '');
                                                        AldeasGet(value?.value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors2.ciudad}
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
                                        control={control2}
                                        render={({ field }) => (
                                            <FormControl

                                                fullWidth={true}
                                            >
                                                <FormLabel >
                                                    Aldea:
                                                </FormLabel>
                                                <Autocomplete
                                                    disableClearable={true}
                                                    {...field}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value.value
                                                    }
                                                    id="aldea"
                                                    options={aldea_DDL}
                                                    value={datosTap3["aldea"] ?? null}
                                                    onChange={async (event, value) => {
                                                        setValue2('aldea', value)
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
                                        name="colonia"
                                        control={control2}
                                        render={({ field }) => (
                                            <FormControl
                                                error={!!errors2.colonia}
                                                fullWidth={true}
                                            >
                                                <FormLabel error={!!errors2.colonia}>
                                                    Colonia:
                                                </FormLabel>
                                                <Autocomplete
                                                    disableClearable={true}
                                                    {...field}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value.value
                                                    }
                                                    id="colonia"
                                                    options={colonia_DDl}
                                                    value={datosTap3["colonia"] ?? null}
                                                    onChange={async (event, value) => {
                                                        setValue2('colonia', value)
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
                                    <div className="">
                                        <Controller
                                            render={({ field }) => (
                                                <FormControl error={!!errors2.numeroLocal} fullWidth={true}>
                                                    <FormLabel>
                                                        Número del Local o Apartamento:
                                                    </FormLabel>
                                                    <TextField
                                                        {...field}
                                                        error={!!errors2.numeroLocal}
                                                        variant="outlined"

                                                        inputprops={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </FormControl>
                                            )}
                                            name="numeroLocal"
                                            control={control2}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className="">

                                        <Controller
                                            render={({ field }) => (
                                                <FormControl error={!!errors2.puntoReferencia} fullWidth={true}>
                                                    <FormLabel>
                                                        Punto de Referencia:
                                                    </FormLabel>
                                                    <TextField

                                                        {...field}
                                                        error={!!errors2.puntoReferencia}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        inputprops={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </FormControl>
                                            )}
                                            name="puntoReferencia"
                                            control={control2}
                                        />


                                    </div>
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
                                        type="submit"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={validacionTap3}
                                    >
                                        Editar
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
                                        onClick={DialogCancelarContrato1}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </form>

                    <form onSubmit={handlesubmit3((_data) => {
                    })}>
                        <TabPanel value={Valor} index={3} dir={theme.direction}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                                >
                                    EN EL CONTRATO DE ADHESIÓN SE MOSTRARÁ LOS NÚMEROS DE TÉLEFONO
                                    REGISRADOS EN LA ADMINISTRACIÓN TRIBUTARIA
                                </Typography>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ marginBottom: "30px" }}>
                                    <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                                        <Chip label="Registro de contrato de adhesión para Persona Juridica" />
                                    </Divider>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="">
                                        <Controller
                                            render={({ field, fieldState }) => (
                                                <InputMask
                                                    mask="+504 9999-9999"
                                                    value={datosTap4["peju_TelefonoEmpresa"]}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    maskChar=" "
                                                >
                                                    {() => (
                                                        <FormControl error={!!errors3.peju_TelefonoEmpresa} fullWidth={true}>
                                                            <FormLabel>
                                                                Teléfono Fijo de la Empresa:
                                                            </FormLabel>
                                                            <TextField
                                                                {...field}
                                                                variant="outlined"
                                                                error={!!errors3.peju_TelefonoEmpresa}
                                                                fullWidth={true}
                                                                inputprops={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start"></InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            <FormHelperText>{errors3.peju_TelefonoEmpresa?.message} </FormHelperText>
                                                        </FormControl>
                                                    )}
                                                </InputMask>
                                            )}
                                            name="peju_TelefonoEmpresa"
                                            control={control3}
                                        />
                                    </div>
                                </Grid>


                                <Grid item xs={4}>
                                    <div className="">
                                        <Controller
                                            render={({ field, fieldState }) => (
                                                <InputMask
                                                    mask="+504 9999-9999"
                                                    value={datosTap4["peju_TelefonoFijoRepresentanteLegal"]}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    maskChar=" "
                                                >
                                                    {() => (
                                                        <FormControl error={!!errors3.peju_TelefonoFijoRepresentanteLegal} fullWidth={true}>
                                                            <FormLabel>
                                                                Teléfono Fijo del Representante Legal:
                                                            </FormLabel>
                                                            <TextField
                                                                {...field}
                                                                variant="outlined"
                                                                error={!!errors3.peju_TelefonoFijoRepresentanteLegal}
                                                                fullWidth={true}
                                                                inputprops={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start"></InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            <FormHelperText>{errors3.peju_TelefonoFijoRepresentanteLegal?.message} </FormHelperText>
                                                        </FormControl>
                                                    )}
                                                </InputMask>
                                            )}
                                            name="peju_TelefonoFijoRepresentanteLegal"
                                            control={control3}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                    <div className="">
                                        <Controller
                                            render={({ field, fieldState }) => (
                                                <InputMask
                                                    mask="+504 9999-9999"
                                                    value={datosTap4["peju_TelefonoRepresentanteLegal"]}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    maskChar=" "
                                                >
                                                    {() => (

                                                        <FormControl error={!!errors3.peju_TelefonoRepresentanteLegal} fullWidth={true}>
                                                            <FormLabel>
                                                                Teléfono Celular del Representante Legal:
                                                            </FormLabel>
                                                            <TextField
                                                                {...field}
                                                                variant="outlined"
                                                                error={!!errors3.peju_TelefonoRepresentanteLegal}
                                                                fullWidth={true}
                                                                inputprops={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start"></InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            <FormHelperText>{errors3.peju_TelefonoRepresentanteLegal?.message} </FormHelperText>
                                                        </FormControl>
                                                    )}
                                                </InputMask>
                                            )}
                                            name="peju_TelefonoRepresentanteLegal"
                                            control={control3}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <Controller
                                        render={({ field }) => (
                                            <FormControl error={!!errors3.peju_CorreoElectronico} fullWidth>
                                                <FormLabel error={!!errors3.peju_CorreoElectronico}>
                                                    Correo electrónico donde notificar:
                                                    <Typography variant="h6" component="span">
                                                        <BootstrapTooltip
                                                            title="para efectos de la recepción o envío de solicitudes,
                                        escritos, autos, notificaciones, requerimientos y cualquier
                                        otro proveído, comunicaciones, resoluciones y cualquier otra
                                        actuación ante la administración aduanera o emitido por esta">
                                                            <InfoIcon sx={{ m: '14px', color: '#C5C5C5' }} />
                                                        </BootstrapTooltip>
                                                    </Typography>
                                                </FormLabel>

                                                <TextField
                                                    {...field}
                                                    error={!!errors3.peju_CorreoElectronico}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    onChange={field.onChange}

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
                                                                    onClick={onSubmitUser}
                                                                    disabled={enviandoCodigo}
                                                                >
                                                                    {enviandoCodigo ? `Reenviar en ${contador}s` : 'Enviar código'}
                                                                </Button>
                                                            </InputAdornment>
                                                        ),
                                                    }}

                                                />
                                                <FormHelperText>{errors3.peju_CorreoElectronico?.message} </FormHelperText>

                                            </FormControl>
                                        )}
                                        name="peju_CorreoElectronico"
                                        control={control3}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Controller
                                        render={({ field }) => {
                                            const tokenValido = validarToken1(field.value);
                                            const isError = !!errors3.codigo1;
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
                                                                // borderColor: mostrarMensajeCorrecto ? '#72cb10' : 'inherit', // Cambiar el color del borde
                                                            },
                                                            startAdornment: <InputAdornment position="start" />,
                                                            onKeyPress: (event) => {
                                                                if (!/[A-Z0-9]/.test(event.key)) {
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
                                                            {errors3.codigo1.message}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            );
                                        }}
                                        name="codigo1"
                                        control={control3}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Controller
                                        render={({ field }) => (
                                            <FormControl error={!!errors3['peju_CorreoElectronicoAlternativo']} fullWidth>
                                                <FormLabel >
                                                    Correo electrónico alternativo:</FormLabel>

                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    error={!!errors3.peju_CorreoElectronicoAlternativo}
                                                    //onChange={field.onChange}

                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        const correoPrincipal = getValues("peju_CorreoElectronico");
                                                        setCorreoAlternativoIgual(correoPrincipal === e.target.value);
                                                    }}

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
                                                                    onClick={onSubmiToken2}
                                                                    disabled={enviandoCodigo2}
                                                                >
                                                                    {enviandoCodigo2 ? `Reenviar en ${contador2}s` : 'Enviar código'}
                                                                </Button>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />

                                                <FormHelperText>{errors3.peju_CorreoElectronicoAlternativo?.message} </FormHelperText>

                                            </FormControl>
                                        )}
                                        name="peju_CorreoElectronicoAlternativo"
                                        control={control3}

                                    />
                                </Grid>




                                <Grid item xs={6}>
                                    <Controller
                                        render={({ field }) => {
                                            const tokenValido = validarToken2(field.value);
                                            const isError = !!errors3.codigo2;
                                            const mostrarMensajeCorrecto = tokenValido && !isError && field.value !== "" && field.value !== undefined; // Verificar que el campo no esté vacío

                                            return (
                                                <FormControl fullWidth={true}>
                                                    <FormLabel error={isError} style={{ color: isError ? 'red' : '' }} >
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
                                                                if (!/[A-Z0-9]/.test(event.key)) {
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
                                                            {errors3.codigo2.message}
                                                        </Typography>
                                                    )}

                                                </FormControl>
                                            );
                                        }}

                                        name="codigo2"
                                        control={control3}
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
                                        type="submit"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={validacionTap4}
                                    >
                                        Editar
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
                                        onClick={DialogCancelarContrato1}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </form>

                    <form onSubmit={handlesubmit4((_data) => {
                    })}>
                        <TabPanel value={Valor} index={4} dir={theme.direction}>
                            <Grid container spacing={3}>

                                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                                    <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                                        <Chip label="Registro de contrato de adhesión para Persona Juridica" />
                                    </Divider>
                                </Grid>

                                <Grid item xs={12}>

                                    {/*   #1   */}

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{ backgroundColor: '#fff3db' }}
                                        >
                                            <Typography>Documentos de la Sociedad Mercantil</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>



                                            <TableContainer component={Paper}>
                                                <Table aria-label="customized table">

                                                    <TableBody>
                                                        {rowsRTN.map((row) => (
                                                            <TableRow key={row.id}>
                                                                <TableCell>
                                                                    {/* <Controller
                                                                        render={({ field }) => (
                                                                            <FormControl fullWidth={true}>

                                                                                <TextField
                                                                                    {...field}
                                                                                    id="RTN_SM"
                                                                                    variant="outlined"
                                                                                    fullWidth={true}
                                                                                    disabled={true} //Deberia de deshabilitado ya que es un editar
                                                                                    errors={!!errors.RTN_SM}
                                                                                    onChange={(e) => {
                                                                                        handleInputChangeRTN(e, row.id)
                                                                                    }}
                                                                                    helperText={errors?.RTN_SM?.message}

                                                                                    InputProps={{
                                                                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                                                    }}
                                                                                    style={{
                                                                                        backgroundColor: '#f2ebf38a',
                                                                                        width: '200px'
                                                                                    }}
                                                                                    defaultValue={datosTap1["pers_RTN"]}
                                                                                />
                                                                            </FormControl>
                                                                        )}
                                                                        name={"RTN_SM"}
                                                                        control={control4}
                                                                    /> */}

                                                                    <Controller
                                                                        render={({ field, fieldState }) => (
                                                                            <InputMask
                                                                                mask="9999-9999-999999"
                                                                                value={field.value} // Establecer el valor del campo usando field.value
                                                                                onChange={field.onChange}
                                                                                onBlur={field.onBlur}
                                                                                maskChar={null}
                                                                                disabled
                                                                                readOnly
                                                                            >
                                                                                {() => (
                                                                                    <FormControl erfullWidth={true}>
                                                                                        <TextField
                                                                                            disabled
                                                                                            error={!!errors4.RTN_SM}
                                                                                            {...field}
                                                                                            variant="outlined"
                                                                                            fullWidth={true}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e);
                                                                                                setRTN(e.target.value); // Actualizo la constante aquella
                                                                                            }}
                                                                                            style={{
                                                                                                backgroundColor: '#f2ebf38a',
                                                                                                width: '200px'
                                                                                            }}
                                                                                            inputProps={{
                                                                                                startAdornment: (
                                                                                                    <InputAdornment position="start"></InputAdornment>
                                                                                                ),
                                                                                            }}
                                                                                        />

                                                                                    </FormControl>
                                                                                )}
                                                                            </InputMask>
                                                                        )}
                                                                        name="RTN_SM"
                                                                        control={control4}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <FormLabel>
                                                                        Registro tributario nacional (RTN) de la Sociedad Mercantil
                                                                    </FormLabel>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        style={{ color: 'transparent' }}
                                                                        onChange={(e) => handleImageChangeRTN(e, row.id)}
                                                                    />
                                                                    {row.imagen}
                                                                </TableCell>

                                                                <TableCell>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="success"
                                                                            disabled={true}
                                                                            style={{ marginRight: '10px' }} // Agrega margen a la derecha para separar los botones
                                                                        >
                                                                            <Icon>add_box</Icon>
                                                                        </Button>

                                                                        <Button
                                                                            variant="outlined"
                                                                            className="text-center"
                                                                            color="error"
                                                                            size="medium"
                                                                            disabled={true} // Deshabilitar el botón para la primera fila
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

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                            style={{ backgroundColor: '#ffe6b8' }}
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
                                                                                mask="9999-9999-999999"
                                                                                onChange={field.onChange}
                                                                                value={field.value}
                                                                                onBlur={field.onBlur}
                                                                                maskChar=""
                                                                            >
                                                                                {() => (
                                                                                    <FormControl fullWidth={true}>

                                                                                        <TextField
                                                                                            {...field}
                                                                                            variant="outlined"
                                                                                            error={!!errors4[`RTN-RL${row.id}`]}
                                                                                            fullWidth={true}
                                                                                            style={{ width: '200px' }}
                                                                                            // value={row.doco_Numero_O_Referencia}
                                                                                            helperText={errors4[`RTN-RL${row.id}`]?.message}
                                                                                            onBlur={(e) => handleInputChangeRTNrep(e, row.id)}
                                                                                            inputprops={{
                                                                                                startAdornment: (
                                                                                                    <InputAdornment position="start"></InputAdornment>
                                                                                                ),
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                )}
                                                                            </InputMask>
                                                                        )}
                                                                        name={`RTN-RL${row.id}`}
                                                                        control={control4}
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
                                                                            <FormControl fullWidth={true} error={!!errors4[`IMG-RTN-RL${row.id}`]}>
                                                                                <div>
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="image/*"
                                                                                        style={{ 'color': 'transparent' }}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            handleImageChangeRTNrep(e, row.id);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <FormHelperText>{errors4[`IMG-RTN-RL${row.id}`]?.message}</FormHelperText>

                                                                            </FormControl>
                                                                        )}
                                                                        name={`IMG-RTN-RL${row.id}`}
                                                                        control={control4}
                                                                    />
                                                                    {row.imagen}
                                                                </TableCell>

                                                                <TableCell>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="success"
                                                                            onClick={handleAddRowRTNrep}
                                                                            style={{ marginRight: '10px' }} // Agrega margen a la derecha para separar los botones
                                                                        >
                                                                            <Icon>add_box</Icon>
                                                                        </Button>

                                                                        <Button
                                                                            variant="outlined"
                                                                            className="text-center"
                                                                            color="error"
                                                                            size="medium"
                                                                            onClick={() => handleRemoveRowRTNrep(row.id)}
                                                                            disabled={row.id === 0} // Deshabilitar el botón para la primera fila
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
                                                                                mask="9999-9999-99999"
                                                                                onChange={field.onChange}
                                                                                onBlur={field.onBlur}
                                                                                value={field.value}
                                                                                maskChar=""
                                                                            >
                                                                                {() => (
                                                                                    <FormControl fullWidth={true}>

                                                                                        <TextField
                                                                                            {...field}
                                                                                            variant="outlined"
                                                                                            // id="DNI_RL"
                                                                                            error={!!errors4[`DNI-RL${row.id}`]}
                                                                                            fullWidth={true}
                                                                                            style={{ width: '200px' }}
                                                                                            onChange={(e) => handleInputChangeDNIrep(e, row.id)}
                                                                                            helperText={errors4[`DNI-RL${row.id}`]?.message}
                                                                                            inputprops={{
                                                                                                startAdornment: (
                                                                                                    <InputAdornment position="start"></InputAdornment>
                                                                                                ),
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                )}
                                                                            </InputMask>
                                                                        )}
                                                                        name={`DNI-RL${row.id}`}
                                                                        control={control4}
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
                                                                            <FormControl fullWidth={true} error={!!errors4[`IMG-DNI-RL${row.id}`]}>
                                                                                <div>
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="image/*"
                                                                                        style={{ 'color': 'transparent' }}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            handleImageChangeDNIrep(e, row.id);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <FormHelperText>{errors4[`IMG-DNI-RL${row.id}`]?.message}</FormHelperText>

                                                                            </FormControl>
                                                                        )}
                                                                        name={`IMG-DNI-RL${row.id}`}
                                                                        control={control4}
                                                                    />
                                                                    {row.imagen}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="success"
                                                                            onClick={handleAddRowDNIrep}
                                                                            style={{ marginRight: '10px' }} // Agrega margen a la derecha para separar los botones
                                                                        >
                                                                            <Icon>add_box</Icon>
                                                                        </Button>

                                                                        <Button
                                                                            variant="outlined"
                                                                            className="text-center"
                                                                            color="error"
                                                                            size="medium"
                                                                            onClick={() => handleRemoveRowDNIrep(row.id)}
                                                                            disabled={row.id === 0} // Deshabilitar el botón para la primera fila
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
                                    {/*   #3   */}
                                    <Accordion >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                            style={{ backgroundColor: '#ffda95' }}
                                        >
                                            <Typography>Escrituras Publicas de la Constitición</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>

                                            <TableContainer component={Paper}>
                                                <Table aria-label="customized table">

                                                    <TableBody>
                                                        {rowsEscri.map((row) => (
                                                            <TableRow key={row.id}>

                                                                <TableCell>

                                                                    <Controller
                                                                        render={({ field }) => (
                                                                            <FormControl fullWidth={true}>
                                                                                <TextField
                                                                                    {...field}
                                                                                    error={!!errors4[`EPC-SM${row.id}`]}
                                                                                    variant="outlined"
                                                                                    fullWidth={true}
                                                                                    style={{ width: '200px' }}
                                                                                    value={datosTap5[`EPC-SM${row.id}`]}
                                                                                    helperText={errors4[`EPC-SM${row.id}`]?.message}
                                                                                    onBlur={(e) => handleInputChangeEscri(e, row.id)}
                                                                                    inputprops={{
                                                                                        startadornment: (
                                                                                            <InputAdornment position="start"></InputAdornment>
                                                                                        ),
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        )}
                                                                        name={`EPC-SM${row.id}`}
                                                                        control={control4}
                                                                    />


                                                                </TableCell>
                                                                <TableCell>
                                                                    <FormLabel>
                                                                        Escritura Publica de Constitución y sus modificaciones si las hubiera (de la sociedad mercantil)
                                                                    </FormLabel>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Controller
                                                                        render={({ field }) => (
                                                                            <FormControl fullWidth={true} error={!!errors4[`IMG-EPC-SM${row.id}`]}>
                                                                                <div>
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="image/*"
                                                                                        style={{ 'color': 'transparent' }}
                                                                                        onChange={(e) => {
                                                                                            field.onChange(e);
                                                                                            handleImageChangeEscri(e, row.id);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <FormHelperText>{errors4[`IMG-EPC-SM${row.id}`]?.message}</FormHelperText>

                                                                            </FormControl>
                                                                        )}
                                                                        name={`IMG-EPC-SM${row.id}`}
                                                                        control={control4}
                                                                    />
                                                                    {row.imagen}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="success"
                                                                            onClick={handleAddRowDecla}
                                                                            style={{ marginRight: '10px' }} // Agrega margen a la derecha para separar los botones
                                                                        >
                                                                            <Icon>add_box</Icon>
                                                                        </Button>

                                                                        <Button
                                                                            variant="outlined"
                                                                            className="text-center"
                                                                            color="error"
                                                                            size="medium"
                                                                            onClick={() => handleRemoveRowEscri(row.id)}
                                                                            disabled={row.id === 0} // Deshabilitar el botón para la primera fila
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

                                {/* <div className="">
                                    <Controller
                                        render={({ field }) => (
                                            <FormControl error={!!errors4.Funcaaa} fullWidth={true}>
                                                <FormLabel>
                                                    Punto de Referencia
                                                </FormLabel>
                                                <TextField

                                                    {...field}
                                                    error={!!errors4.Funcaaa}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    inputprops={{
                                                        startAdornment: (
                                                            <InputAdornment position="start"></InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        )}
                                        name="Funcaaa"
                                        control={control4}
                                    />
                                </div> */}

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
                                        type="submit"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={validacionTap5}
                                    >
                                        Editar
                                    </Button>

                                    {/* <Button
                                        startIcon={<Icon>checked</Icon>}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={() => { 
                                         }
                                        }
                                    >
                                        Pruebas
                                    </Button> */}

                                    {/* <Button
                                        startIcon={<Icon>checked</Icon>}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={() => {
                                        }}
                                    >
                                        Pruebaaa
                                    </Button> */}

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
                                        onClick={DialogCancelarContrato1}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </form>


                    <TabPanel value={Valor} index={5} dir={theme.direction}>

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
                                            ¿Deseas salir de la creación de tu solicitud de contrato de adhesión para Persona Juridica?
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
                    Finalizacion de Contrato de adhesión para Persona Juridica
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
                                Navigate("/PersonaJuridica/Index");
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
        </Card >
    );

}
export default Persona_Juridica_Editar