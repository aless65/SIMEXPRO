/* eslint-disable camelcase */
import * as React from "react";
import {
    Card,
    CardMedia,
    Button,
    Chip,
    Divider,
    Icon,
    TextField,
    Typography,
    Select,
    Grid,
    AppBar,
    Tabs,
    Tab,
    Box,
    Stack,
    Autocomplete,
    InputAdornment,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Collapse,
} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import SearchIcon from "@mui/icons-material/Search";
import LoadingIcon from "src/styles/iconoCargaTabla";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import { Table } from 'antd';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { ToastError, ToastWarning, ToastSuccessGuardado, ToastWarningPersonalizado, ToastSuccessPersonalizado, ToastErrorPersonalizado, ToastSuccessEditar } from "src/styles/toastsFunctions";
import Declaracion_ValorService from "../Declaracion_De_Valor/Declaracion_ValorService";
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import instance from "src/app/auth/services/jwtService/jwtService";
import "src/styles/custom-pagination.css";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import DucaService from "./ducaService";

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

function DucaEditar() {
    const navigate = useNavigate();
    const location = useLocation();
    const ducaEdit = location.state;

    const [isEditItem, setIsEditItem] = useState(false);
    const [isEditDocumentoSoporte, setIsEditDocumentoSoporte] = useState(false);
    const [finalizacionDuca, setFinalizacionDuca] = useState(false);
    const [loadingEditarTab1, setLoadingEditarTab1] = useState(false);
    const [loadingEditarTab2, setLoadingEditarTab2] = useState(false);
    const [loadingFinalizarDuca, setLoadingFinalizarDuca] = useState(false);
    const [loadingGuardarDevas, setLoadingGuardarDevas] = useState(false);

    const theme = useTheme();
    const [valueTabs, setValueTabs] = useState(0);
    const [tabsEstado, settabsEstado] = useState({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
    });

    const load_DDLs = Load_DDLs();
    const ducaService = DucaService();
    const DeclaracionValorService = Declaracion_ValorService();

    const [Aduanas, setAduanas] = useState([]);
    const [Paises, setPaises] = useState([]);
    const [PaisesProcedencia, setPaisesProcedencia] = useState([]);
    const [PaisesDestino, setPaisesDestino] = useState([]);
    const [Marcas, setMarcas] = useState([]);
    const [ModosTransporte, setModostransporte] = useState([]);
    const [RegimenesAduaneros, setRegimenesAduaneros] = useState([]);
    const [LugarDesembarque, setLugarDesembarque] = useState([]);

    const [LugarDesembarqueOpenDialog, setLugarDesembarqueOpenDialog] = useState(false);
    const [SearchTextLugarDesembarque, setSearchTextLugarDesembarque] = useState("");
    const [filasLugarDesembarque, setfilasLugarDesembarque] = useState(10);
    const [dataLugarDesembarque, setdataLugarDesembarque] = useState([]);
    const [TextLugarDesembarque, setTextLugarDesembarque] = useState("");

    const [ListadoDucas, setListadoDucas] = useState([]);
    const [ListadoVentajas, setListadoVentajas] = useState([]);

    const [tiposDocumentos, setTiposDocumentos] = useState([]);
    const [documentosSoporteList, setDocumentosSoporteList] = useState([]);

    const [ListadoItemsFull, setListadoItemsFull] = useState([]);
    const [ListadoItems, setListadoItems] = useState([]);
    const [ListadoItemsCompletados, setListadoItemsCompletados] = useState([]);
    const [filasItems, setFilasItems] = useState(10);
    const [filasItemsCompletados, setFilasItemsCompletados] = useState(10);
    const [searchTextItems, setSearchTextItems] = useState('');
    const [searchTextItemsCompletados, setSearchTextItemsCompletados] = useState('');
    const [completarItem, setCompletarItem] = useState(true);

    const [anchorElDocumentos, setAnchorElDocumentos] = useState({});

    const [CollapseConductor, setCollapseConductor] = useState(false);
    const [collapseDocumentosSoporte, setCollapseDocumentosSoport] = useState(false);

    const [searchTextDevas, setSearchTextDevas] = useState('');
    const [filasDevas, setFilasDevas] = React.useState(10);
    const [selectedDevIds, setSelectedDevIds] = useState([]);
    const [dataDevas, setDataDevas] = useState([]);
    const [dataDevasContieneDuca, setdataDevasContieneDuca] = useState([]);
    const [idsDevasContieneDuca, setidsDevasContieneDuca] = useState([]);

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

    const validarNoCorrelativo = (value) => {
        let respuesta = true;

        ListadoDucas.map((item) => {
            if (item.duca_No_Correlativo_Referencia != null && item.duca_No_Correlativo_Referencia != "") {
                if (item.duca_No_Correlativo_Referencia === value && item.duca_Id != parseInt(localStorage.getItem("duca_Id"))) {
                    respuesta = false;
                }
            }
        })

        return respuesta;
    }

    const validarDucaExiste = (value) => {
        let respuesta = true;

        ListadoDucas.map((item) => {
            if (item.duca_No_Duca != null && item.duca_No_Duca != "") {
                if (item.duca_No_Duca === value && item.duca_Id != parseInt(localStorage.getItem("duca_Id"))) {
                    respuesta = false;
                }
            }
        })

        return respuesta;
    }

    const validarManifiesto = (value) => {
        let respuesta = true;

        ListadoDucas.map((item) => {
            if (item.duca_Manifiesto != null && item.duca_Manifiesto != "") {
                if (item.duca_Manifiesto === value && item.duca_Id != parseInt(localStorage.getItem("duca_Id"))) {
                    respuesta = false;
                }
            }
        })

        return respuesta;
    }

    const validarTitulo = (value) => {
        let respuesta = true;

        ListadoDucas.map((item) => {
            if (item.duca_Titulo != null && item.duca_Titulo != "") {
                if (item.duca_Titulo === value && item.duca_Id != parseInt(localStorage.getItem("duca_Id"))) {
                    respuesta = false;
                }
            }
        })

        return respuesta;
    }

    const validarCodigoDocumento = (value) => {
        let respuesta = true;

        documentosSoporteList.map((item) => {
            if (item.doso_NumeroDocumento != null && item.doso_NumeroDocumento != "") {
                if (item.doso_NumeroDocumento === value && item.doso_Id != datosTab3_DocumentosSoporte.doso_Id) {
                    respuesta = false;
                }
            }
        });

        return respuesta;
    }

    const getAduanas = async () => {
        try {
            const data = await load_DDLs.aduanas();
            setAduanas(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getPaises = async () => {
        try {
            const data = await load_DDLs.paises();
            setPaises(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getMarcas = async () => {
        try {
            const data = await load_DDLs.Marcas();
            setMarcas(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getModosTransporte = async () => {
        try {
            const data = await load_DDLs.ModosTransporte();
            setModostransporte(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getRegimenesAduaneros = async () => {
        try {
            const data = await load_DDLs.RegimenesAduaneros();
            setRegimenesAduaneros(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getListadoDucas = async () => {
        try {
            const data = await ducaService.ListadoDuca();
            setListadoDucas(data);

            const dataDevasDisponibles = await ducaService.ListarDevasPorDuca();

            const dataDevasContieneDuca = await ducaService.ListarDevasPorNoDuca();

            const dataDevasFull = [];

            if (dataDevasDisponibles.length > 0) {
                dataDevasDisponibles.forEach(item => {
                    dataDevasFull.push(item);
                });
            }

            if (dataDevasContieneDuca.length > 0) {
                setdataDevasContieneDuca(dataDevasContieneDuca);
                let devsIds = [];
                dataDevasContieneDuca.forEach(item => {
                    dataDevasFull.push(item);
                    devsIds.push(item.deva_Id);
                });
                setidsDevasContieneDuca(devsIds);
                setSelectedDevIds(devsIds);
            }
            setDataDevas(dataDevasFull);
        } catch (error) {
            console.error(error);
        }
    }

    const getTiposDocumentos = async () => {
        try {
            const data = await load_DDLs.tipoDocumentosDdl();
            setTiposDocumentos(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getDocumentosSoporteListByNoDuca = async () => {
        try {
            const data = await ducaService.ListarDocumentosSoporteByNoDuca();
            setDocumentosSoporteList(data);
        } catch (error) {
            ;
        }
    }

    const getVentaja = async () => {
        try {
            if (ducaEdit.trli_Id != null) {
                const respuestaTrataboById = await ducaService.ListTratadosById(ducaEdit.trli_Id);

                if (respuestaTrataboById.data.data.length > 0) {
                    const tlcVentaja = respuestaTrataboById.data.data[0];

                    setListadoVentajas([{
                        value: tlcVentaja.trli_Id,
                        label: tlcVentaja.trli_NombreTratado
                    }]);

                    setValues1("trli_Id", {
                        value: tlcVentaja.trli_Id,
                        label: tlcVentaja.trli_NombreTratado
                    });
                }
            } else {
                setListadoVentajas([{
                    value: 0,
                    label: 'No Aplica'
                }]);

                setValues1("trli_Id", {
                    value: 0,
                    label: 'No Aplica'
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const ListarItems = async () => {

        if (localStorage.getItem("duca_Id")) {

            const devas = await ducaService.ListarDevasxNoDuca();

            let facturas = [];

            for (let index = 0; index < devas.length; index++) {

                const fact_devas = await ducaService.ListarFacturasPorDevaId(devas[index]);

                if (fact_devas.length > 0) {
                    fact_devas.forEach(element => {
                        facturas.push(element);
                    })
                }
            }

            let items = [];

            for (let index = 0; index < facturas.length; index++) {
                const item = await ducaService.ListarItemsPorfact_Id(facturas[index]);
                if (item.length > 0) {
                    item.forEach(element => {
                        items.push(element);
                    });
                }
            }

            setListadoItemsFull(items.map((item, index) => {
                return {
                    id: index + 1,
                    item_Id: item.item_Id,
                    fact_Id: item.fact_Id,
                    item_Cantidad: item.item_Cantidad,
                    item_Cantidad_Bultos: item.item_Cantidad_Bultos,
                    item_ClaseBulto: item.item_ClaseBulto,
                    item_Acuerdo: item.item_Acuerdo,
                    item_PesoNeto: item.item_PesoNeto,
                    item_PesoBruto: item.item_PesoBruto,
                    unme_Id: item.unme_Id,
                    item_IdentificacionComercialMercancias: item.item_IdentificacionComercialMercancias,
                    item_CaracteristicasMercancias: item.item_CaracteristicasMercancias,
                    item_Marca: item.item_Marca,
                    item_Modelo: item.item_Modelo,
                    merc_Id: item.merc_Id,
                    pais_IdOrigenMercancia: item.pais_IdOrigenMercancia,
                    nombrePaisOrigen: item.nombrePaisOrigen,
                    item_ClasificacionArancelaria: item.item_ClasificacionArancelaria,
                    item_ValorUnitario: item.item_ValorUnitario,
                    item_GastosDeTransporte: item.item_GastosDeTransporte,
                    item_ValorTransaccion: item.item_ValorTransaccion,
                    item_Seguro: item.item_Seguro,
                    item_OtrosGastos: item.item_OtrosGastos,
                    item_ValorAduana: item.item_ValorAduana,
                    item_CuotaContingente: item.item_CuotaContingente,
                    item_ReglasAccesorias: item.item_ReglasAccesorias,
                    item_CriterioCertificarOrigen: item.item_CriterioCertificarOrigen,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    item_FechaCreacion: item.item_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    item_FechaEliminacion: item.item_FechaEliminacion,
                    item_FechaModificacion: item.item_FechaModificacion,
                    item_Estado: item.item_Estado
                }
            }));
        }
    }


    {/*Logica para manejar los tabs */ }
    const handleChange = (event, newValue) => {
        setValueTabs(newValue);
    };

    const handleChangeIndex = (index) => {
        setValueTabs(index);
    };

    const validacion = (params, event) => {

        if (event) {
            event.preventDefault();
        }

        if (params === 1) {
            settabsEstado({
                tab1: false,
                tab2: true,
                tab3: true,
                tab4: true,
            });
            setValueTabs(0);
        }

        if (params === 2) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
            });
            setValueTabs(1);
        }

        if (params === 3) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
            });
            setValueTabs(2);
        }

        if (params === 4) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
            });
            setValueTabs(3);
        }
    };


    {/* Hooks UseEffect */ }
    useEffect(() => {
        if (ducaEdit === null) {
            navigate("/Duca/Index");
        }

        reset1();
        reset2();

        getVentaja();
        getAduanas();
        getPaises();
        getMarcas();
        getModosTransporte();
        getRegimenesAduaneros();
        getListadoDucas();
        getTiposDocumentos();
        getDocumentosSoporteListByNoDuca();
        ListarItems();
    }, []);

    useEffect(() => {
        if (!CollapseConductor) {
            setValues2("NoIdentificador", "");
            setValues2("NoLicenciaConducir", "");
            setValues2("PaisExpedicion", null);
            setValues2("Nombres", "");
            setValues2("Apellidos", "");
            setValues2("IdUnidadTransporte", "");
            setValues2("PaisRegistro", null);
            setValues2("Marca", null);
            setValues2("ChasisVin", "");
            setValues2("IdentificacionRemolque", "");
            setValues2("CantidadUnidadesCarga", "");
            setValues2("NumeroDispositivo", "");
            setValues2("Equipamiento", "");
            setValues2("TamanioEquipamiento", "");
            setValues2("TipoCarga", "");
            setValues2("NIdentificacionContenedor", "");
        }

        if (!collapseDocumentosSoporte) {
            reset3_DocumentosSoporte();
        }
    }, [CollapseConductor, collapseDocumentosSoporte])


    {/* Yup Tab 1 */ }
    const tab1Fields = {
        NoDuca: "",
        NoCorrelativoReferencia: "",
        AduanaRegistro: null,
        AduanaDestino: null,
        RegimenAduanero: null,
        Modalidad: "",
        Clase: "",
        FechaVencimiento: new Date(),
        PaisProcedencia: null,
        PaisDestino: null,
        DepositoAduanero: "",
        LugarDesembarque: null,
        Manifiesto: "",
        Titulo: "",
        trli_Id: null
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const schemaTab1Fields = yup.object().shape({
        NoCorrelativoReferencia: yup.string().nullable().required()
            .test(
                "NoCorrelativo",
                "Ya existe una DUCA con este No. 'Correlativo o Referencia'",
                (value) => validarNoCorrelativo(value))
            .test(
                "No-Iguales-Correlativo",
                "El 'No. Correlativo o Referencia' no debe ser igual al 'No. de DUCA'",
                function (value) {
                    let resultado = true;
                    const { NoDuca } = this.parent;

                    if (NoDuca != null && NoDuca != "") {
                        resultado = NoDuca.toLowerCase() != value.toLowerCase();
                    }

                    return resultado;
                }
            )
            .min(5, "El 'No. Correlativo o Referencia' debe contener al menos 5 caracteres"),
        NoDuca: yup.string().nullable()
            .test(
                "NoDuca",
                "Ya existe una DUCA con este 'No. de DUCA'",
                (value) => validarDucaExiste(value))
            .test(
                "No-Iguales-Duca",
                "El 'No. de DUCA' no debe ser igual al 'No. Correlativo o Referencia'",
                function (value) {
                    let resultado = true;
                    const { NoCorrelativoReferencia } = this.parent;

                    if (NoCorrelativoReferencia != null && NoCorrelativoReferencia != "") {
                        resultado = NoCorrelativoReferencia.toLowerCase() != value.toLowerCase();
                    }

                    return resultado;
                }
            ),
        AduanaRegistro: yup.object().nullable().required(),
        AduanaDestino: yup.object().nullable().required(),
        RegimenAduanero: yup.object().nullable().required(),
        Modalidad: yup.string().nullable(),
        Clase: yup.string().nullable(),
        FechaVencimiento: yup.date().nullable()
            .min(new Date("01-01-1980"), "La fecha de vencimiento debe ser mayor a 01-01-1980").required(""),
        PaisProcedencia: yup.object().nullable().required(),
        PaisDestino: yup.object().nullable().required(),
        DepositoAduanero: yup.string().nullable(),
        LugarDesembarque: yup.object().nullable(),
        Manifiesto: yup.string().nullable().required()
            .test(
                "Manifiesto",
                "Ya existe una DUCA con este 'Manifiesto'",
                (value) => validarManifiesto(value)
            ).test(
                "No-Iguales-Manifiesto",
                "El 'Manifiesto' no debe ser igual al 'Titulo'",
                function (value) {
                    let resultado = true;
                    const { Titulo } = this.parent;

                    if (Titulo != null && Titulo != "") {
                        resultado = Titulo.toLowerCase() != value.toLowerCase();
                    }

                    return resultado;
                }
            )
            .min(5, "El 'Manifiesto' debe contener al menos 5 caracteres"),
        Titulo: yup.string().nullable().required()
            .test(
                "Titulo",
                "Ya existe una DUCA con este 'Titulo'",
                (value) => validarTitulo(value)
            ).test(
                "No-Iguales-Titulo",
                "El 'Titulo' no debe ser igual al Manifiesto",
                function (value) {
                    let resultado = true;
                    const { Manifiesto } = this.parent;

                    if (Manifiesto != null && Manifiesto != "") {
                        resultado = Manifiesto.toLowerCase() != value.toLowerCase();
                    }

                    return resultado;
                }
            )
            .min(5, "El 'Titulo' debe contener al menos 5 caracteres"),
        trli_Id: yup.object().nullable().required()
    });

    const { handleSubmit: handleSubmit1, reset: reset1, control: control1, formState: formState1, watch: watch1, setValue: setValues1 } = useForm({
        defaultValues: tab1Fields,
        mode: "all",
        resolver: yupResolver(schemaTab1Fields),
    });

    const datosTab1 = watch1();

    const { isValid: isValid1, dirtyFields: dirtyFields1, errors: errors1 } = formState1;

    const guardarTab1 = async () => {
        if (isValid1) {
            setLoadingEditarTab1(true);
            const respuesta = await ducaService.EditarTab1(datosTab1);
            if (respuesta.data.data !== null) {
                if (respuesta.data.data.messageStatus === "1") {
                    setLoadingEditarTab1(false);
                    validacion(3);
                    ToastSuccessEditar();
                } else {
                    ToastError();
                }
            }
        }
    };

    {/* Yup Tab 2 */ }
    const tab2Fields = {
        Codigo_Declarante: "",
        NoIdentificacion_Declarante: "",
        NombreRazonSocial_Declarante: "",
        DomicilioFiscal_Declarante: "",
        Codigo: "",
        Nombre: "",
        ModoTransporte: null,

        duca_Conductor_Id: "",
        NoIdentificador: "",
        NoLicenciaConducir: "",
        PaisExpedicion: null,
        Nombres: "",
        Apellidos: "",
        IdUnidadTransporte: "",
        PaisRegistro: null,
        Marca: null,
        ChasisVin: "",
        IdentificacionRemolque: "",
        CantidadUnidadesCarga: "",
        NumeroDispositivo: "",
        Equipamiento: "",
        TamanioEquipamiento: "",
        TipoCarga: "",
        NIdentificacionContenedor: "",
    };

    const schemaTab2Fields = yup.object().shape({
        Codigo_Declarante: yup.string().nullable().required()
            .test(
                'Codigo_DeclaranteMayorCero',
                "El 'Código' debe ser mayor a 0",
                function (value) {
                    return parseFloat(value) > 0;
                }
            ),
        NoIdentificacion_Declarante: yup.string().nullable().required()
            .test(
                'NoIdentificacion_DeclaranteMayorCero',
                "El 'No. Identificación' debe ser mayor a 0",
                function (value) {
                    return parseFloat(value) > 0;
                }
            ),
        NombreRazonSocial_Declarante: yup.string().nullable().required(),
        DomicilioFiscal_Declarante: yup.string().nullable().required(),
        Codigo: yup.string().nullable().required()
            .test(
                'CodigoMayorCero',
                "El 'Código' debe ser mayor a 0",
                function (value) {
                    return parseFloat(value) > 0;
                }
            ),
        Nombre: yup.string().nullable().required(),
        ModoTransporte: yup.object().nullable().required(),

        duca_Conductor_Id: yup.string().nullable(),
        NoIdentificador: CollapseConductor ? yup.string().nullable().required()
            .test(
                'NoIdentificadorMayorCero',
                "El 'No. Identificación' debe ser mayor a 0",
                function (value) {
                    return parseFloat(value) > 0;
                }
            ) : yup.string().nullable(),
        NoLicenciaConducir: CollapseConductor ? yup.string().nullable().required()
            .test(
                'NoLicenciaConducirMayorCero',
                "El 'No. Licencia de Conducir' debe ser mayor a 0",
                function (value) {
                    return parseFloat(value) > 0;
                }
            ) : yup.string().nullable(),
        PaisExpedicion: CollapseConductor ? yup.object().nullable().required() : yup.object().nullable(),
        Nombres: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        Apellidos: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        IdUnidadTransporte: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        PaisRegistro: CollapseConductor ? yup.object().nullable().required() : yup.object().nullable(),
        Marca: CollapseConductor ? yup.object().nullable().required() : yup.object().nullable(),
        ChasisVin: CollapseConductor ? yup.string().nullable().required().min(13, 'El Chasis / Vin debe contener al menos 13 caracteres') : yup.string().nullable(),
        IdentificacionRemolque: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        CantidadUnidadesCarga: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        NumeroDispositivo: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        Equipamiento: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        TamanioEquipamiento: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        TipoCarga: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
        NIdentificacionContenedor: CollapseConductor ? yup.string().nullable().required() : yup.string().nullable(),
    });

    const { handleSubmit: handleSubmit2, reset: reset2, control: control2, formState: formState2, watch: watch2, setValue: setValues2 } = useForm({
        defaultValues: tab2Fields,
        mode: "all",
        resolver: yupResolver(schemaTab2Fields),
    });

    const datosTab2 = watch2();

    const { isValid: isValid2, dirtyFields: dirtyFields2, errors: errors2 } = formState2;

    const guardarTab2 = async () => {
        if (isValid2) {
            setLoadingEditarTab2(true);
            if ((CollapseConductor && ducaEdit.duca_Conductor_Id > 0) || (CollapseConductor && datosTab2.duca_Conductor_Id > 0)) {
                const respuesta = await ducaService.EditarTab2(datosTab2);
                if (respuesta.data.data !== null) {
                    if (respuesta.data.data.messageStatus === "1") {
                        setLoadingEditarTab2(false);
                        validacion(4);
                        ToastSuccessEditar();
                    } else {
                        ToastError();
                    }
                }
            } else {
                const respuesta = await ducaService.InsertarTab2(datosTab2);
                if (respuesta.data.data !== null) {
                    if (respuesta.data.data.codeStatus === 1) {
                        setLoadingEditarTab2(false);
                        validacion(4);
                        setValues2("duca_Conductor_Id", parseInt(respuesta.data.data.messageStatus));
                        ToastSuccessGuardado();
                    } else {
                        ToastError();
                    }
                }
            }
        }
    }


    {/* Yup Tab 3 Items */ }
    const tab3Fields_Item = {
        Item_Id: "",
        CantidadBultos: "",
        ClaseBulto: "",
        PesoNeto: "",
        PesoBruto: "",
        CuotaContingente: "",
        Acuerdo: "",
        CriterioParaOrigen: "",
        ReglasAccesorias: "",
        GastosTransporte: "",
        Seguro: "",
        OtrosGastos: "",
    }

    const schemaTab3Fields_Item = yup.object().shape({
        Item_Id: yup.string().nullable(),
        CantidadBultos: yup.string().nullable().required()
            .test(
                'CantidadBultosMayorCero',
                "La 'Cantidad Bultos' debe ser mayor a 0",
                function (value) {
                    return parseInt(value) > 0;
                }
            ),
        ClaseBulto: yup.string().nullable().required(),
        PesoNeto: yup.string().nullable().required()
            .matches(/^\d+(\.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales")
            .test(
                'PesoNetoMayorCero',
                "El 'Peso Neto' debe ser mayor a 0",
                function (value) {
                    return parseFloat(value) > 0;
                }
            ),
        PesoBruto: yup.string().nullable().required()
            .matches(/^\d+(\.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales")
            .test(
                'PesoBrutoMayorCero',
                "El 'Peso Bruto' debe ser mayor a 0",
                function (value) {
                    return parseFloat(value) > 0;
                }
            )
            .test(
                'PesoBrutoMayorANeto',
                "El 'Peso Bruto' no puede ser menor al peso neto",
                function (value) {
                    const { PesoNeto } = this.parent;
                    return parseFloat(value) >= parseFloat(PesoNeto);
                }
            ),
        CuotaContingente: yup.string().nullable().required().matches(/^\d+(\.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales"),
        Acuerdo: yup.string().nullable().required(),
        CriterioParaOrigen: yup.string().nullable().required(),
        ReglasAccesorias: yup.string().nullable().required(),
        GastosTransporte: yup.string().nullable().required().matches(/^\d+(\.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales"),
        Seguro: yup.string().nullable().required().matches(/^\d+(\.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales"),
        OtrosGastos: yup.string().nullable().required().matches(/^\d+(\.\d{1,4})?$/, "El campo solo acepta números enteros positivos con 4 decimales (como máximo) opcionales"),
    })

    const { handleSubmit: handleSubmit3_Items, reset: reset3_Items, control: control3_Items, formState: formState3_Items, watch: watch3_Items, setValue: setValues3_Items } = useForm({
        defaultValues: tab3Fields_Item,
        mode: "all",
        resolver: yupResolver(schemaTab3Fields_Item),
    });

    const datosTab3_Items = watch3_Items();

    const { isValid: isValid3_Items, dirtyFields: dirtyFields3_Items, errors: errors3_Items } = formState3_Items;

    const guardarTab3_Items = async () => {
        if (isValid3_Items) {
            const respuesta = await ducaService.InsertarItem(datosTab3_Items);
            if (respuesta.data.data !== null) {
                if (respuesta.data.data.messageStatus === "1") {
                    reset3_Items();
                    setCompletarItem(true);
                    ListarItems();

                    if (isEditItem) {
                        ToastSuccessEditar();
                        setIsEditItem(false);
                    } else {
                        ToastSuccessGuardado();
                    }
                } else {
                    ToastError();
                }
            }
        }
    }


    {/* Yup Tab 3 Documentos de soporte*/ }
    const tab3Fields_DocumentosSoporte = {
        doso_Id: "",
        CodigoTipoDocumento: null,
        NumeroDocumento: "",
        EmisionDocumento: null,
        FechaVencimiento: null,
        PaisEmision: null,
        Linea: "",
        AutoridadEntidad: "",
        Monto: "",
    }

    const schemaTab3Fields_DocumentosSoporte = yup.object({
        doso_Id: yup.string().nullable(),
        CodigoTipoDocumento: yup.object().nullable().required(),
        NumeroDocumento: yup.string()
            .nullable()
            .required()
            .test(
                "NoDocumento",
                "Ya existe un documento con este No. de documento",
                (value) => validarCodigoDocumento(value)),
        EmisionDocumento: yup.date()
            .nullable()
            .test(
                "igual-o-menor",
                `La fecha debe ser igual o menor a ${instance.formatFechaHora(today).toString().substring(0, 10)}`,
                (value) => {
                    const inputDate = new Date(value);
                    inputDate.setHours(0, 0, 0, 0);
                    return inputDate <= today;
                }
            ),
        FechaVencimiento: yup.date().min(new Date("01-01-1980"), "La fecha de vencimiento debe ser mayor a 01-01-1980").nullable(),
        PaisEmision: yup.object().nullable(),
        Linea: yup.string().nullable(),
        AutoridadEntidad: yup.string().nullable(),
        Monto: yup.string().nullable(),
    })

    const { handleSubmit: handleSubmit3_DocumentosSoporte, reset: reset3_DocumentosSoporte, control: control3_DocumentosSoporte, formState: formState3_DocumentosSoporte, watch: watch3_DocumentosSoporte, setValue: setValues3_DocumentosSoporte } = useForm({
        defaultValues: tab3Fields_DocumentosSoporte,
        mode: "all",
        resolver: yupResolver(schemaTab3Fields_DocumentosSoporte),
    });

    const datosTab3_DocumentosSoporte = watch3_DocumentosSoporte();

    const { isValid: isValid3_DocumentosSoporte, dirtyFields: dirtyFields3_DocumentosSoporte, errors: errors3_DocumentosSoporte } = formState3_DocumentosSoporte;

    const guardarTab3_DocumentosSoporte = async () => {
        if (isEditDocumentoSoporte) {
            if (isValid3_DocumentosSoporte) {
                const respuesta = await ducaService.EditarDocumentoSoporte(datosTab3_DocumentosSoporte);
                if (respuesta.data.data !== null) {
                    if (respuesta.data.data.messageStatus === "1") {
                        ToastSuccessGuardado();
                        reset3_DocumentosSoporte();
                        setIsEditDocumentoSoporte(false);
                        getDocumentosSoporteListByNoDuca();
                    } else {
                        ToastError();
                    }
                }
            }
        } else {
            if (formState3_DocumentosSoporte.isValid) {
                const respuesta = await ducaService.InsertarDocumentoSoporte(datosTab3_DocumentosSoporte);
                if (respuesta.data.data !== null) {
                    if (respuesta.data.data.messageStatus === "1") {
                        ToastSuccessGuardado();
                        reset3_DocumentosSoporte();
                        getDocumentosSoporteListByNoDuca();
                    } else {
                        ToastError();
                    }
                }
            }
        }
    }

    const eliminarDocumentoSoporte = async (doso_Id) => {
        const respuesta = await ducaService.EliminarDocumentoSoporte(doso_Id);

        if (respuesta.data.data !== null) {
            if (respuesta.data.data.messageStatus === "1") {
                ToastSuccessPersonalizado("Éxito. El registro se elimino correctamente.")
                getDocumentosSoporteListByNoDuca();
            } else {
                ToastError();
            }
        }
    }

    {/* Para finalizar la DUCA */ }
    const DialogFinalizarDuca = () => {
        setFinalizacionDuca(!finalizacionDuca);
    }

    const finalizarDuca = async () => {
        setLoadingFinalizarDuca(true);
        const respuesta = await ducaService.finalizarDuca();
        if (respuesta.data.data !== null) {
            if (respuesta.data.data.messageStatus === "1") {

                let allCorrect = true;
                let deva = dataDevas.find(item => item.deva_Id === idsDevasContieneDuca[0]);

                for (let index = 0; index < ListadoItemsCompletados.length; index++) {
                    const element = ListadoItemsCompletados[index];

                    const resultadoCalculoTotales = await ducaService.CalcularValorAduanaItem(element.item_Id, datosTab1.trli_Id.value, deva.deva_ConversionDolares);

                    if (resultadoCalculoTotales.data.data.codeStatus != '1') {
                        allCorrect = false;
                    }
                }

                if (allCorrect) {
                    ToastSuccessPersonalizado("Éxito. LA DUCA se ha finalizado correctamente.")
                } else {
                    ToastWarningPersonalizado("La DUCA se ha finalizado con errores!")
                }

                setLoadingFinalizarDuca(false);
                navigate("/Duca/Index");
            } else {
                ToastErrorPersonalizado("Error. Ocurrio un error al intentar finalizar la DUCA")
            }
        }
    }

    {/* Yup Asignar DEVAS a Duca */ }
    const defaultPreDUCAValues = {
        descripcion: "",
    };

    const ducaSchema = yup.object().shape({
        descripcion: yup.string().trim().required(""),
    });

    const { handleSubmit: handleSubmitDevas, register, reset: resetDevas, control: controlDevas, watch: watchDevas, formState: formStateDevas, setValue: setValuesDevas } =
        useForm({
            defaultPreDUCAValues,
            mode: "all",
            resolver: yupResolver(ducaSchema),
        });

    const { isValid: isValidDevas, dirtyFields: dirtyFieldsDevas, errors: errorsDevas } = formStateDevas;

    const datosWatchDevas = watchDevas();

    const GuardarDEVAS = async () => {
        try {
            if (selectedDevIds.length != 0) {
                setListadoVentajas([]);
                setValues1("trli_Id", null);

                let paisExpoIgual = true;
                let IncotermIgual = true;
                const devaUno = dataDevas.find(item => item.deva_Id === selectedDevIds[0])

                for (let index = 0; index < selectedDevIds.length; index++) {
                    const element = dataDevas.find(item => item.deva_Id === selectedDevIds[index]);

                    if (devaUno.inco_Id != element.inco_Id) {
                        IncotermIgual = false;
                    }

                    if (devaUno.pais_ExportacionId != element.pais_ExportacionId) {
                        paisExpoIgual = false;
                    }
                }

                if (!paisExpoIgual && !IncotermIgual) {
                    ToastWarningPersonalizado("Las DEVA que seleccione deben poseer el mismo país de exportación y el mismo incoterm.");
                } else if (!paisExpoIgual && IncotermIgual) {
                    ToastWarningPersonalizado("Las DEVA que seleccione deben poseer el mismo país de exportación.");
                } else if (paisExpoIgual && !IncotermIgual) {
                    ToastWarningPersonalizado("Las DEVA que seleccione deben poseer el mismo incoterm.");
                } else {
                    setLoadingGuardarDevas(true);
                    const respuestaPaisesTratados = await ducaService.TratadoByPaisId(devaUno.pais_ExportacionId);

                    if (respuestaPaisesTratados.data.data.messageStatus != "0") {
                        const respuestaTrataboById = await ducaService.ListTratadosById(respuestaPaisesTratados.data.data.messageStatus);

                        if (respuestaTrataboById.data.data.length > 0) {
                            const tlcVentaja = respuestaTrataboById.data.data[0];

                            setListadoVentajas([{
                                value: tlcVentaja.trli_Id,
                                label: tlcVentaja.trli_NombreTratado
                            }]);

                            setValues1("trli_Id", {
                                value: tlcVentaja.trli_Id,
                                label: tlcVentaja.trli_NombreTratado
                            });
                        }
                    } else {
                        setListadoVentajas([{
                            value: 0,
                            label: 'No Aplica'
                        }]);

                        setValues1("trli_Id", {
                            value: 0,
                            label: 'No Aplica'
                        });
                    }

                    if (localStorage.getItem("duca_Id")) {
                        selectedDevIds.sort((a, b) => a - b);
                        idsDevasContieneDuca.sort((a, b) => a - b);

                        if (idsDevasContieneDuca.length === selectedDevIds.length) {
                            let allIguales = true;
                            idsDevasContieneDuca.forEach((item, index) => {
                                if (item != selectedDevIds[index]) {
                                    allIguales = false;
                                }
                            })

                            if (allIguales) {
                                settabsEstado({
                                    tab1: false,
                                    tab2: false,
                                    tab3: false,
                                    tab4: false,
                                });
                            } else {
                                const liberarDevasResponse = await ducaService.LiberarDevasPorDucaId();
                                if (liberarDevasResponse.data.data.messageStatus === "1") {

                                    let allCorrect = true;
                                    if (selectedDevIds.length > 0) {
                                        for (let index = 0; index < selectedDevIds.length; index++) {
                                            const response2 = await ducaService.InsertarDevaPorDuca(selectedDevIds[index]);

                                            if (!response2.data.data.messageStatus === "1") {
                                                allCorrect = false;
                                            }
                                        }

                                        if (allCorrect) {
                                            ListarItems();
                                            setidsDevasContieneDuca(selectedDevIds);
                                        }
                                    }
                                }
                            }
                        } else {
                            const liberarDevasResponse = await ducaService.LiberarDevasPorDucaId();

                            if (liberarDevasResponse.data.data.messageStatus === "1") {

                                let allCorrect = true;
                                if (selectedDevIds.length > 0) {
                                    for (let index = 0; index < selectedDevIds.length; index++) {
                                        const response2 = await ducaService.InsertarDevaPorDuca(selectedDevIds[index]);

                                        if (!response2.data.data.messageStatus === "1") {
                                            allCorrect = false;
                                        }
                                    }

                                    if (allCorrect) {
                                        ListarItems();
                                        setidsDevasContieneDuca(selectedDevIds);
                                    }
                                }
                            }

                            settabsEstado({
                                tab1: false,
                                tab2: false,
                                tab3: false,
                                tab4: false,
                            });
                        }
                    }
                    setLoadingGuardarDevas(false);
                    validacion(2);
                }
            } else {
                ToastWarningPersonalizado('Advertencia. Debe seleccionar al menos una DEVA.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    {/* Tabla de DEVAS */ }
    const handleChangeFilasDevas = (event) => {
        setFilasDevas(event.target.value);
    }

    const handleSearchChangeDevas = (event) => {
        setSearchTextDevas(event.target.value);
    }

    const handleSeleccionarDevas = (e, devaId) => {
        if (e.target.checked) {
            setSelectedDevIds((prevSelectedDevIds) => [...prevSelectedDevIds, devaId]);
        } else {
            setSelectedDevIds(selectedDevIds.filter((id) => id !== devaId));
        }
    };

    const columnsDevas = [
        {
            title: "No.",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, //sorting para Numeros
        },
        {
            title: "Código DEVA",
            dataIndex: "deva_Id",
            key: "deva_Id",
            sorter: (a, b) => a.deva_Id - b.deva_Id,
        },
        {
            title: "País de exportación",
            dataIndex: "pais_Nombre",
            key: "pais_Nombre",
            sorter: (a, b) => a.pais_Nombre.localeCompare(b.pais_Nombre),
        },
        {
            title: "Incoterm",
            dataIndex: "inco_Codigo",
            key: "inco_Codigo",
            sorter: (a, b) => a.inco_Codigo.localeCompare(b.inco_Codigo),
        },
        {
            title: "Seleccionar DEVA",
            key: "operation",
            render: (params) => (
                <div key={params.deva_Id}>
                    <Stack direction="row" spacing={1}>
                        <Checkbox
                            aria-controls={`menu-${params.deva_Id}`}
                            aria-haspopup="true"
                            checked={selectedDevIds.includes(params.deva_Id)}
                            onClick={(e) => handleSeleccionarDevas(e, params.deva_Id)}
                            variant="contained"
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "#ebe6f7",
                                alignItems: "center",
                                color: "#634A9E",
                            }}
                            sx={{ cursor: "pointer" }}
                        ></Checkbox>
                    </Stack>
                </div>
            ),
        },
    ];

    const camposToFilterDevas = ["key", "deva_Id", "adua_IngresoNombre", "adua_DespachoNombre"];

    const filteredRowsDevas = dataDevas.filter((row) => {
        if (searchTextDevas === "") {
            return true;  // Mostrar todas las filas si el buscador está vacío
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToFilterDevas.includes(key)) {
                const formattedValue =
                    typeof value === 'number'
                        ? value.toString()
                        : value.toString().toLowerCase();
                const formattedSearchText =
                    typeof searchTextDevas === 'number'
                        ? searchTextDevas.toString()
                        : searchTextDevas.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    });


    {/* Tabla Items sin completar*/ }
    const handleChangeFilasItems = (event) => {
        setFilasItems(event.target.value);
    };

    const handleSearchChangeItems = (event) => {
        setSearchTextItems(event.target.value);
    }

    const handleCompletarItem = (id) => {
        setCompletarItem(false);
        reset3_Items();

        setTimeout(() => {
            setValues3_Items("Item_Id", id);
        }, 60);
    }

    const columnsItems = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Id Item',
            dataIndex: 'item_Id',
            key: 'item_Id',
            sorter: (a, b) => a.item_Id - b.item_Id
        },
        {
            title: 'País Origen',
            dataIndex: 'nombrePaisOrigen',
            key: 'nombrePaisOrigen',
            sorter: (a, b) => a.nombrePaisOrigen.localeCompare(b.nombrePaisOrigen),
        },
        {
            title: 'Cantidad',
            dataIndex: 'item_Cantidad',
            key: 'item_Cantidad',
            sorter: (a, b) => a.item_Cantidad - b.item_Cantidad,
        },
        {
            title: 'Clasificación Arancelaria',
            dataIndex: 'item_ClasificacionArancelaria',
            key: 'item_ClasificacionArancelaria',
            sorter: (a, b) => a.item_ClasificacionArancelaria.localeCompare(b.item_ClasificacionArancelaria),
        },
        {
            title: 'Acciones',
            key: 'operationItems',
            render: (params) =>
                <div key={params.item_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.item_Id}`}
                            aria-haspopup="true"
                            onClick={() => handleCompletarItem(params.item_Id)}
                            variant="contained"
                            style={{ borderRadius: '10px' }}
                            sx={{
                                backgroundColor: "#634A9E",
                                color: "white",
                                "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            startIcon={<Icon>checked</Icon>}
                        >
                            Completar Item
                        </Button>
                    </Stack>
                </div>
            ,
        },
    ];

    const camposToFilterItems = ["id", "item_Id", "nombrePaisOrigen", "item_Cantidad", "item_ClasificacionArancelaria"];

    const filteredRowsItems = ListadoItems.filter((row) => {
        if (searchTextItems === "") {
            return true; // Mostrar todas las filas si el buscador está vacío
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToFilterItems.includes(key)) {
                const formattedValue =
                    typeof value === "number"
                        ? value.toString()
                        : value.toString().toLowerCase();
                const formattedSearchText =
                    typeof searchTextItems === "number"
                        ? searchTextItems.toString()
                        : searchTextItems.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    }
    );


    {/* Tabla Items completados*/ }
    const handleChangeFilasItemsCompletados = (event) => {
        setFilasItemsCompletados(event.target.value);
    };

    const handleSearchChangeItemsCompletados = (event) => {
        setSearchTextItemsCompletados(event.target.value);
    }

    const handleEditItems = (params) => {
        reset3_Items();
        setIsEditItem(true);
        setCompletarItem(false);

        setValues3_Items("Item_Id", params.item_Id, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("CantidadBultos", params.item_Cantidad_Bultos, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("ClaseBulto", params.item_ClaseBulto, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("PesoNeto", params.item_PesoNeto, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("PesoBruto", params.item_PesoBruto, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("CuotaContingente", params.item_CuotaContingente, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("Acuerdo", params.item_Acuerdo, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("CriterioParaOrigen", params.item_CriterioCertificarOrigen, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("ReglasAccesorias", params.item_ReglasAccesorias, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("GastosTransporte", params.item_GastosDeTransporte, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("Seguro", params.item_Seguro, { shouldValidate: true, shouldTouch: true });
        setValues3_Items("OtrosGastos", params.item_OtrosGastos, { shouldValidate: true, shouldTouch: true });
    };

    const columnsItemsCompletados = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Id Item',
            dataIndex: 'item_Id',
            key: 'item_Id',
            sorter: (a, b) => a.item_Id - b.item_Id
        },
        {
            title: 'Cantidad Bultos',
            dataIndex: 'item_Cantidad_Bultos',
            key: 'item_Cantidad_Bultos',
            sorter: (a, b) => a.item_Cantidad_Bultos - b.item_Cantidad_Bultos,
        },
        {
            title: 'Peso Neto',
            dataIndex: 'item_PesoNeto',
            key: 'item_PesoNeto',
            sorter: (a, b) => a.item_PesoNeto - b.item_PesoNeto,
        },
        {
            title: 'Gastos de transporte',
            dataIndex: 'item_GastosDeTransporte',
            key: 'item_GastosDeTransporte',
            sorter: (a, b) => a.item_GastosDeTransporte - b.item_GastosDeTransporte,
        },
        {
            title: 'Seguro',
            dataIndex: 'item_Seguro',
            key: 'item_Seguro',
            sorter: (a, b) => a.item_Seguro - b.item_Seguro,
        },
        {
            title: 'Acciones',
            key: 'operationItemsCompletados',
            render: (params) =>
                <div key={params.item_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.item_Id}`}
                            aria-haspopup="true"
                            onClick={() => { handleEditItems(params) }}
                            variant="contained"
                            style={{ borderRadius: '10px' }}
                            sx={{
                                backgroundColor: "#634A9E",
                                color: "white",
                                "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            startIcon={<Icon>edit</Icon>}
                        >
                            Editar
                        </Button>
                    </Stack>
                </div>
            ,
        },
    ];

    const camposToFilterItemCompletados = ["id", "item_Id", "item_Cantidad_Bultos", "item_PesoNeto", "item_GastosDeTransporte", "item_Seguro"];

    const filteredRowsItemsCompletados = ListadoItemsCompletados.filter((row) => {
        if (searchTextItemsCompletados === "") {
            return true; // Mostrar todas las filas si el buscador está vacío
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToFilterItemCompletados.includes(key)) {
                const formattedValue =
                    typeof value === "number"
                        ? value.toString()
                        : value.toString().toLowerCase();
                const formattedSearchText =
                    typeof searchTextItemsCompletados === "number"
                        ? searchTextItemsCompletados.toString()
                        : searchTextItemsCompletados.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    }
    );


    {/* Tabla Documentos de soporte */ }
    const handleClickDocumentos = (event, id) => {
        setAnchorElDocumentos(prevState => ({
            ...prevState,
            [id]: event.currentTarget,
        }));
    };

    const handleCloseDocumentos = (id) => {
        setAnchorElDocumentos(prevState => ({
            ...prevState,
            [id]: null,
        }));
    };

    const handleEditDocumentos = (params) => {
        setIsEditDocumentoSoporte(true);
        reset3_DocumentosSoporte();

        setValues3_DocumentosSoporte("doso_Id", params.doso_Id);
        setValues3_DocumentosSoporte("CodigoTipoDocumento", tiposDocumentos.find(item => item.value == params.tido_Id), { shouldValidate: true, shouldTouch: true });
        setValues3_DocumentosSoporte("NumeroDocumento", params.doso_NumeroDocumento, { shouldValidate: true });
        setValues3_DocumentosSoporte("EmisionDocumento", params.doso_FechaEmision);
        setValues3_DocumentosSoporte("FechaVencimiento", params.doso_FechaVencimiento);
        setValues3_DocumentosSoporte("PaisEmision", Paises.find(item => item.value == params.doso_PaisEmision));
        setValues3_DocumentosSoporte("Linea", params.doso_LineaAplica);
        setValues3_DocumentosSoporte("AutoridadEntidad", params.doso_EntidadEmitioDocumento);
        setValues3_DocumentosSoporte("Monto", params.doso_Monto);

        handleCloseDocumentos(params.doso_Id);
    };

    const handleDeleteDocumentos = (id) => {
        eliminarDocumentoSoporte(id);
        handleCloseDocumentos(id);
    };

    const columnsDocumentos = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Código del tipo Documento',
            dataIndex: 'tido_Codigo',
            key: 'tido_Codigo',
            sorter: (a, b) => a.tido_Codigo.localeCompare(b.tido_Codigo),
        },
        {
            title: 'Número de Documento',
            dataIndex: 'doso_NumeroDocumento',
            key: 'doso_NumeroDocumento',
            sorter: (a, b) => a.doso_NumeroDocumento.localeCompare(b.doso_NumeroDocumento),
        },
        {
            title: 'Acciones',
            key: 'operationDocumentos',
            render: (params) =>
                <div key={params.doso_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.doso_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClickDocumentos(e, params.doso_Id)}
                            variant="contained"
                            style={{ borderRadius: '10px' }}
                            sx={{
                                backgroundColor: "#634A9E",
                                color: "white",
                                "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            startIcon={<Icon>menu</Icon>}
                        >
                            Opciones
                        </Button>
                        <Menu
                            id={`menu-${params.doso_Id}`}
                            anchorEl={anchorElDocumentos[params.doso_Id]}
                            keepMounted
                            open={Boolean(anchorElDocumentos[params.doso_Id])}
                            onClose={() => handleCloseDocumentos(params.doso_Id)}
                        >
                            <MenuItem onClick={() => handleEditDocumentos(params)}>
                                <Icon>edit</Icon>&nbsp;&nbsp;Editar
                            </MenuItem>
                            <MenuItem onClick={() => handleDeleteDocumentos(params.doso_Id)}>
                                <Icon>delete</Icon>&nbsp;&nbsp;Eliminar
                            </MenuItem>
                        </Menu>
                    </Stack>
                </div>
            ,
        },
    ];


    {/* Tabla Lugar de desembarque*/ }
    const DialogLugarDesembarque = () => {
        setLugarDesembarqueOpenDialog(!LugarDesembarqueOpenDialog);
        setTextLugarDesembarque("");
        setSearchTextLugarDesembarque("");
    }

    const CargarDatosLugarDesembarque = async (code) => {
        if (code == "") {
            setdataLugarDesembarque([]);
        } else {
            const data = await DeclaracionValorService.ListarLugarEmbarque(code);
            setdataLugarDesembarque(data);
        }
    }

    const EnviarData = async () => {
        CargarDatosLugarDesembarque(TextLugarDesembarque);
    }

    const handleSearchChangeLugarDesembarque = (event) => {
        setSearchTextLugarDesembarque(event.target.value);
    };

    const handleChangeLugarDesembarque = (event) => {
        setTextLugarDesembarque(event.target.value);
    };

    const handleChangeFilasLugarDesembarque = (event) => {
        setfilasLugarDesembarque(event.target.value);
    };

    const handleSeleccionarLugarDesembarque = (params) => {
        const lugar = dataLugarDesembarque.filter((Lugar) => Lugar.emba_Id === params.emba_Id).map((item, index) => {
            return {
                value: item.emba_Id,
                label: `${item.emba_Codigo} - ${item.emba_Descripcion}`,
            }
        });

        setLugarDesembarque(lugar);
        setValues1("LugarDesembarque", lugar[0]);

        DialogLugarDesembarque();
    }

    const columnsLugarDesembarque = [
        {
            title: "No.",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, //sorting para Numeros
        },
        {
            title: "Código del lugar de desembarque",
            dataIndex: "emba_Codigo",
            key: "emba_Codigo",
            sorter: (a, b) => a.emba_Codigo.localeCompare(b.emba_Codigo), //sorting para Letras
        },
        {
            title: "Lugar de desembarque",
            dataIndex: "emba_Descripcion",
            key: "emba_Descripcion",
            sorter: (a, b) => a.emba_Descripcion.localeCompare(b.emba_Descripcion), //sorting para Letras
        },
        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.emba_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.emba_Id}`}
                            aria-haspopup="true"
                            onClick={() => handleSeleccionarLugarDesembarque(params)}
                            variant="contained"
                            style={{
                                borderRadius: "10px",
                                backgroundColor: "#634A9E",
                                color: "white",
                            }}
                            startIcon={<Icon>check</Icon>}
                        >
                            Seleccionar
                        </Button>
                    </Stack>
                </div>
            ),
        },
    ];

    const camposToFilterLugarDesembarque = ["key", "emba_Codigo", "emba_Descripcion"];

    const filteredRowsLugarDesembarque = dataLugarDesembarque.filter((row) => {
        if (SearchTextLugarDesembarque === "") {
            return true; // Mostrar todas las filas si el buscador está vacío
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToFilterLugarDesembarque.includes(key)) {
                const formattedValue =
                    typeof value === "number"
                        ? value.toString()
                        : value.toString().toLowerCase();
                const formattedSearchText =
                    typeof SearchTextLugarDesembarque === "number"
                        ? SearchTextLugarDesembarque.toString()
                        : SearchTextLugarDesembarque.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    });

    useEffect(() => {
        if (ListadoItemsFull.length > 0) {
            setListadoItems(ListadoItemsFull.filter(item => item.item_PesoBruto === null));
            setListadoItemsCompletados(ListadoItemsFull.filter(item => item.item_PesoBruto !== null));
        }

        if (documentosSoporteList.length > 0) {
            setCollapseDocumentosSoport(true);
        }


        if (ducaEdit != null) {
            if (ducaEdit.duca_No_Correlativo_Referencia != null) {
                setValues1("NoDuca", ducaEdit.duca_No_Duca, { shouldValidate: true, shouldTouch: true });
                setValues1("NoCorrelativoReferencia", ducaEdit.duca_No_Correlativo_Referencia, { shouldValidate: true, shouldTouch: true });
                setValues1("AduanaRegistro", Aduanas.find(item => item.value == ducaEdit.duca_AduanaRegistro), { shouldValidate: true, shouldTouch: true });
                setValues1("AduanaDestino", Aduanas.find(item => item.value == ducaEdit.duca_AduanaDestino), { shouldValidate: true, shouldTouch: true });

                if (RegimenesAduaneros.length > 0) {
                    setRegimenesAduaneros([RegimenesAduaneros.find(item => item.value === ducaEdit.duca_Regimen_Aduanero)]);
                    setValues1("RegimenAduanero", RegimenesAduaneros.find(item => item.value === ducaEdit.duca_Regimen_Aduanero));
                }

                setValues1("Modalidad", ducaEdit.duca_Modalidad);
                setValues1("Clase", ducaEdit.duca_Clase);
                setValues1("FechaVencimiento", ducaEdit.duca_FechaVencimiento, { shouldValidate: true, shouldTouch: true });

                if (Paises.length > 0) {
                    setPaisesProcedencia(Paises.filter(item => item.value != 97));
                    setValues1("PaisProcedencia", Paises.find(item => item.value == ducaEdit.duca_Pais_Procedencia), { shouldValidate: true, shouldTouch: true });

                    setPaisesDestino(Paises.filter(item => item.value === 97));
                    setValues1("PaisDestino", Paises.find(item => item.value == ducaEdit.duca_Pais_Destino), { shouldValidate: true, shouldTouch: true });
                }

                setValues1("DepositoAduanero", ducaEdit.duca_Deposito_Aduanero, { shouldValidate: true, shouldTouch: true });
                setValues1("Manifiesto", ducaEdit.duca_Manifiesto, { shouldValidate: true, shouldTouch: true });
                setValues1("Titulo", ducaEdit.duca_Titulo, { shouldValidate: true, shouldTouch: true });
            }

            if (ducaEdit.duca_Codigo_Declarante != null && ducaEdit.duca_Codigo_Declarante != "" && ducaEdit.duca_Codigo_Declarante != undefined) {
                setValues2("Codigo_Declarante", ducaEdit.duca_Codigo_Declarante, { shouldValidate: true, shouldTouch: true });
                setValues2("NoIdentificacion_Declarante", ducaEdit.duca_Numero_Id_Declarante, { shouldValidate: true, shouldTouch: true });
                setValues2("NombreRazonSocial_Declarante", ducaEdit.duca_NombreSocial_Declarante, { shouldValidate: true, shouldTouch: true });
                setValues2("DomicilioFiscal_Declarante", ducaEdit.duca_DomicilioFiscal_Declarante, { shouldValidate: true, shouldTouch: true });
                setValues2("Codigo", ducaEdit.duca_Codigo_Transportista, { shouldValidate: true, shouldTouch: true });
                setValues2("Nombre", ducaEdit.duca_Transportista_Nombre, { shouldValidate: true, shouldTouch: true });
                setValues2("ModoTransporte", ModosTransporte.find(item => item.value == ducaEdit.motr_Id), { shouldValidate: true, shouldTouch: true });
            }

            if (ducaEdit.duca_Conductor_Id != null && ducaEdit.duca_Conductor_Id != 0 && ducaEdit.duca_Conductor_Id != undefined) {
                setValues2("duca_Conductor_Id", ducaEdit.duca_Conductor_Id);
                setValues2("NoIdentificador", ducaEdit.cont_NoIdentificacion, { shouldValidate: true, shouldTouch: true });
                setValues2("NoLicenciaConducir", ducaEdit.cont_Licencia, { shouldValidate: true, shouldTouch: true });
                setValues2("PaisExpedicion", Paises.find(item => item.value == ducaEdit.pais_IdExpedicion), { shouldValidate: true, shouldTouch: true });
                setValues2("Nombres", ducaEdit.cont_Nombre, { shouldValidate: true, shouldTouch: true });
                setValues2("Apellidos", ducaEdit.cont_Apellido, { shouldValidate: true, shouldTouch: true });
                setValues2("IdUnidadTransporte", ducaEdit.tran_IdUnidadTransporte, { shouldValidate: true, shouldTouch: true });
                setValues2("PaisRegistro", Paises.find(item => item.value == ducaEdit.id_pais_transporte), { shouldValidate: true, shouldTouch: true });
                setValues2("Marca", Marcas.find(item => item.value == ducaEdit.transporte_marca_Id), { shouldValidate: true, shouldTouch: true });
                setValues2("ChasisVin", ducaEdit.tran_Chasis), { shouldValidate: true, shouldTouch: true };
                setValues2("IdentificacionRemolque", ducaEdit.tran_Remolque, { shouldValidate: true, shouldTouch: true });
                setValues2("CantidadUnidadesCarga", ducaEdit.tran_CantCarga, { shouldValidate: true, shouldTouch: true });
                setValues2("NumeroDispositivo", ducaEdit.tran_NumDispositivoSeguridad, { shouldValidate: true, shouldTouch: true });
                setValues2("Equipamiento", ducaEdit.tran_Equipamiento, { shouldValidate: true, shouldTouch: true });
                setValues2("TamanioEquipamiento", ducaEdit.tran_TamanioEquipamiento, { shouldValidate: true, shouldTouch: true });
                setValues2("TipoCarga", ducaEdit.tran_TipoCarga, { shouldValidate: true, shouldTouch: true });
                setValues2("NIdentificacionContenedor", ducaEdit.tran_IdContenedor, { shouldValidate: true, shouldTouch: true });
                setCollapseConductor(true);
            }

            if (ducaEdit.emba_Codigo != null && ducaEdit.emba_Codigo != "" && ducaEdit.emba_Codigo != undefined) {
                CargarDatosLugarDesembarque(ducaEdit.emba_Codigo.substring(0, 2));
            }
        }
    }, [Aduanas, ModosTransporte, Marcas, ListadoItemsFull, documentosSoporteList])

    useEffect(() => {
        if (selectedDevIds.length === 0) {
            validacion(1);
        } else {
            selectedDevIds.sort((a, b) => a - b);
            if (idsDevasContieneDuca.length > selectedDevIds.length || idsDevasContieneDuca.length < selectedDevIds.length) {
                validacion(1);
            } else if (idsDevasContieneDuca.length === selectedDevIds.length) {
                let allIguales = true;
                idsDevasContieneDuca.forEach((item, index) => {
                    if (item != selectedDevIds[index]) {
                        allIguales = false;
                    }
                })

                if (allIguales) {
                    settabsEstado({
                        tab1: false,
                        tab2: false,
                        tab3: false,
                        tab4: false,
                    });
                } else {
                    validacion(1);
                }
            } else {
                settabsEstado({
                    tab1: false,
                    tab2: false,
                    tab3: false,
                    tab4: false,
                });
            }
        }
    }, [selectedDevIds])

    useEffect(() => {
        if (ducaEdit != null) {
            const lugarDesembarque = dataLugarDesembarque.filter(
                (item) => item.emba_Id === ducaEdit.duca_Lugar_Desembarque)
                .map(item => {
                    return {
                        value: item.emba_Id,
                        label: `${item.emba_Codigo} - ${item.emba_Descripcion}`
                    }
                });

            setLugarDesembarque(lugarDesembarque);
            setValues1("LugarDesembarque", lugarDesembarque[0]);
        }
    }, [dataLugarDesembarque]);

    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/Wpq35kR/DUCA-DECLARACI-N-NICA-CENTROAMERICANA.png"
                alt="Encabezado de la carta"
            />

            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                <AppBar position="static">
                    <Tabs
                        value={valueTabs}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ backgroundColor: "#e5e1fa", color: 'black' }}
                    >
                        <Tab
                            label="Asignar DEVAS a la DUCA"
                            {...a11yProps(0)}
                            disabled={tabsEstado.tab1}
                        />
                        <Tab
                            label="Identificación de la declaración"
                            {...a11yProps(1)}
                            disabled={tabsEstado.tab2}
                        />
                        <Tab
                            label="Declarante, Transportista y Conductor"
                            {...a11yProps(2)}
                            disabled={tabsEstado.tab3}
                        />
                        <Tab
                            label="Mercancías y Documentos de soporte"
                            {...a11yProps(3)}
                            disabled={tabsEstado.tab4}
                        />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={valueTabs}
                    onChangeIndex={handleChangeIndex}
                >
                    <form onSubmit={handleSubmitDevas((_data) => {

                    })}>
                        <TabPanel value={valueTabs} index={0} dir={theme.direction}>
                            <Grid container spacing={3} >
                                <Grid item xs={12}>
                                    <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                                        <Chip label="Asignar DEVAS a una DUCA" />
                                    </Divider>
                                </Grid>
                                <div
                                    className="center"
                                    style={{ width: "95%", margin: "auto", marginTop: "20px" }}
                                >
                                    <Stack direction="row" spacing={1} style={{ justifyContent: "end" }}>
                                        <label className="mt-8">Filas por página:</label>
                                        <FormControl sx={{ minWidth: 50 }} size="small">
                                            {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                                            <Select value={filasDevas} onChange={handleChangeFilasDevas}>
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={20}>20</MenuItem>
                                                <MenuItem value={30}>30</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* Barra de Busqueda en la Tabla */}
                                        <TextField
                                            style={{ borderRadius: "10px" }}
                                            placeholder="Buscar"
                                            value={searchTextDevas}
                                            onChange={handleSearchChangeDevas}
                                            size="small"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton edge="start">
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Stack>
                                    <br />

                                    <Table
                                        locale={{
                                            triggerDesc: "Ordenar descendente",
                                            triggerAsc: "Ordenar ascendente",
                                            cancelSort: "Cancelar",
                                            emptyText: LoadingIcon(),
                                        }}
                                        columns={columnsDevas}
                                        dataSource={filteredRowsDevas}
                                        size="small"
                                        pagination={{
                                            pageSize: filasDevas,
                                            showSizeChanger: false,
                                            className: "custom-pagination",
                                        }}
                                    />
                                </div>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "right", // Alinea los botones al centro horizontalmente
                                        alignItems: "right", // Alinea verticalmente en el centro
                                    }}
                                >
                                    <Button
                                        startIcon={<Icon>arrow_forward</Icon>}
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: "10px", marginRight: "10px" }}
                                        sx={{
                                            backgroundColor: "#634A9E",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#6e52ae" },
                                        }}
                                        onClick={() => {
                                            GuardarDEVAS()
                                        }}
                                        disabled={loadingGuardarDevas}
                                    >
                                       {loadingGuardarDevas ? (
                                            <>
                                                {" "}Procesando...{" "}
                                            </>
                                        ) : (
                                            "Siguiente"
                                        )}
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
                                        onClick={() => {
                                            navigate("/Duca/index");
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </form>

                    <form onSubmit={handleSubmit1((_data) => {
                        guardarTab1();
                    })}>
                        <TabPanel value={valueTabs} index={1} dir={theme.direction}>
                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '0px', marginBottom: '25px' }}>
                                    <Chip color='default' label="Identificación de la Declaración" />
                                </Divider>
                            </Grid>

                            <Grid container spacing={2}>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.RegimenAduanero}
                                        >
                                            Regimen Aduanero:
                                        </FormLabel>
                                        <Controller
                                            name="RegimenAduanero"
                                            error={!!errors1.RegimenAduanero}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={RegimenesAduaneros}
                                                    value={datosTab1.RegimenAduanero ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("RegimenAduanero", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.RegimenAduanero}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.NoDuca}
                                        >
                                            No. de DUCA:
                                        </FormLabel>
                                        <Controller
                                            name="NoDuca"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.NoDuca}
                                                    error={!!errors1.NoDuca}
                                                    inputProps={{
                                                        maxLength: 17,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[A-Za-z0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                        onBlur: () => {
                                                            validarDucaExiste();
                                                        }
                                                    }}
                                                    helperText={errors1?.NoDuca?.message.includes("required") ? "" : errors1?.NoDuca?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.NoCorrelativoReferencia}
                                        >
                                            No. Correlativo o Referencia:
                                        </FormLabel>
                                        <Controller
                                            name="NoCorrelativoReferencia"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.NoCorrelativoReferencia}
                                                    error={!!errors1.NoCorrelativoReferencia}
                                                    inputProps={{
                                                        maxLength: 14,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[A-Za-z0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors1?.NoCorrelativoReferencia?.message.includes("required") ? "" : errors1?.NoCorrelativoReferencia?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.AduanaRegistro}
                                        >
                                            Aduana Registro:
                                        </FormLabel>
                                        <Controller
                                            name="AduanaRegistro"
                                            error={!!errors1.AduanaRegistro}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={Aduanas}
                                                    value={datosTab1.AduanaRegistro ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("AduanaRegistro", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.AduanaRegistro}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.AduanaDestino}
                                        >
                                            Aduana Destino:
                                        </FormLabel>
                                        <Controller
                                            name="AduanaDestino"
                                            error={!!errors1.AduanaDestino}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={Aduanas}
                                                    value={datosTab1.AduanaDestino ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("AduanaDestino", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.AduanaDestino}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>


                                <Grid item xs={4}>
                                    <Controller
                                        name="FechaVencimiento"
                                        control={control1}
                                        render={({ field }) => (
                                            <FormControl
                                                value={datosTab1.FechaVencimiento}
                                                error={!!errors1.FechaVencimiento}
                                                fullWidth={true}
                                            >
                                                <FormLabel>
                                                    Fecha de Vencimiento:
                                                </FormLabel>
                                                <DatePicker
                                                    onChange={(date) => field.onChange(date)}
                                                    value={field.value}
                                                    renderInput={(_props) => (
                                                        <TextField
                                                            {..._props}
                                                            onBlur={field.onBlur}
                                                            error={!!errors1.FechaVencimiento}
                                                            helperText={errors1?.FechaVencimiento?.message.includes("Invalid Date") ? "La fecha ingresada no es válida" : errors1?.FechaVencimiento?.message}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.PaisProcedencia}
                                        >
                                            País de Procedencia:
                                        </FormLabel>
                                        <Controller
                                            name="PaisProcedencia"
                                            error={!!errors1.PaisProcedencia}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={PaisesProcedencia}
                                                    value={datosTab1.PaisProcedencia ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("PaisProcedencia", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.PaisProcedencia}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.PaisDestino}
                                        >
                                            País de Destino:
                                        </FormLabel>
                                        <Controller
                                            name="PaisDestino"
                                            error={!!errors1.PaisDestino}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={PaisesDestino}
                                                    value={datosTab1.PaisDestino ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("PaisDestino", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.PaisDestino}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.DepositoAduanero}
                                        >
                                            Depósito Aduanero / Zona Franca:
                                        </FormLabel>
                                        <Controller
                                            name="DepositoAduanero"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.DepositoAduanero}
                                                    error={!!errors1.DepositoAduanero}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.Modalidad}
                                        >
                                            Modalidad:
                                        </FormLabel>
                                        <Controller
                                            name="Modalidad"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.Modalidad}
                                                    error={!!errors1.Modalidad}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.Clase}
                                        >
                                            Clase:
                                        </FormLabel>
                                        <Controller
                                            name="Clase"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.Clase}
                                                    error={!!errors1.Clase}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>



                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <FormLabel
                                            error={!!errors1.LugarDesembarque}
                                        >
                                            Lugar de Desembarque:
                                        </FormLabel>
                                        <Controller
                                            name="LugarDesembarque"
                                            error={!!errors1.LugarDesembarque}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={LugarDesembarque}
                                                    value={datosTab1.LugarDesembarque ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("LugarDesembarque", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.LugarDesembarque}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={1}>
                                    <Button
                                        fullWidth={true}
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            borderRadius: "10px",
                                            marginTop: "25px"
                                        }}
                                        sx={{
                                            backgroundColor: "#DAD8D8",
                                            color: "black",
                                            "&:hover": { backgroundColor: "#BFBABA" },
                                        }}
                                        onClick={DialogLugarDesembarque}
                                    >
                                        <Icon>search</Icon>
                                    </Button>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.Manifiesto}
                                        >
                                            Manifiesto:
                                        </FormLabel>
                                        <Controller
                                            name="Manifiesto"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.Manifiesto}
                                                    error={!!errors1.Manifiesto}
                                                    inputProps={{
                                                        maxLength: 17,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[A-Za-z0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors1?.Manifiesto?.message.includes("required") ? "" : errors1?.Manifiesto?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors1.Titulo}
                                        >
                                            Titulo:
                                        </FormLabel>
                                        <Controller
                                            name="Titulo"
                                            control={control1}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab1.Titulo}
                                                    error={!!errors1.Titulo}
                                                    inputProps={{
                                                        maxLength: 17,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[A-Za-z0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors1?.Titulo?.message.includes("required") ? "" : errors1?.Titulo?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <FormLabel
                                            error={!!errors1.trli_Id}
                                        >
                                            Ventaja:
                                        </FormLabel>
                                        <Controller
                                            name="trli_Id"
                                            error={!!errors1.trli_Id}
                                            control={control1}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={ListadoVentajas}
                                                    value={datosTab1.trli_Id ?? null}
                                                    onChange={(event, value) => {
                                                        setValues1("trli_Id", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors1.trli_Id}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                marginTop={'10px'}
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
                                    onClick={() => {
                                        if (!isValid1) {
                                            ToastWarning();
                                        }
                                    }}
                                    style={{
                                        borderRadius: "10px",
                                        marginRight: "10px"
                                    }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    type="submit"
                                    disabled={loadingEditarTab1}
                                >
                                    {loadingEditarTab1 ? (
                                        <>
                                            {" "}Guardando...{" "}
                                        </>
                                    ) : (
                                        "Guardar"
                                    )}
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
                                    onClick={(e) => {
                                        navigate("/Duca/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </TabPanel>
                    </form>

                    <form onSubmit={handleSubmit2((_data) => {
                        guardarTab2();
                    })}>
                        <TabPanel value={valueTabs} index={2} dir={theme.direction}>
                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '0px', marginBottom: '25px' }}>
                                    <Chip color='default' label="Declarante" />
                                </Divider>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.Codigo_Declarante}
                                        >
                                            Código:
                                        </FormLabel>
                                        <Controller
                                            name="Codigo_Declarante"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.Codigo_Declarante}
                                                    error={!!errors2.Codigo_Declarante}
                                                    inputProps={{
                                                        maxLength: 15,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors2?.Codigo_Declarante?.message.includes("required") ? "" : errors2?.Codigo_Declarante?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.NoIdentificacion_Declarante}
                                        >
                                            No. Identificación:
                                        </FormLabel>
                                        <Controller
                                            name="NoIdentificacion_Declarante"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.NoIdentificacion_Declarante}
                                                    error={!!errors2.NoIdentificacion_Declarante}
                                                    inputProps={{
                                                        maxLength: 17,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors2?.NoIdentificacion_Declarante?.message.includes("required") ? "" : errors2?.NoIdentificacion_Declarante?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.NombreRazonSocial_Declarante}
                                        >
                                            Nombre o Razón Social:
                                        </FormLabel>
                                        <Controller
                                            name="NombreRazonSocial_Declarante"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.NombreRazonSocial_Declarante}
                                                    error={!!errors2.NombreRazonSocial_Declarante}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.DomicilioFiscal_Declarante}
                                        >
                                            Domicilio Fiscal:
                                        </FormLabel>
                                        <Controller
                                            name="DomicilioFiscal_Declarante"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.DomicilioFiscal_Declarante}
                                                    error={!!errors2.DomicilioFiscal_Declarante}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
                                    <Chip color='default' label="Transportista" />
                                </Divider>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.Codigo}
                                        >
                                            Código:
                                        </FormLabel>
                                        <Controller
                                            name="Codigo"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.Codigo}
                                                    error={!!errors2.Codigo}
                                                    inputProps={{
                                                        maxLength: 5,
                                                        style: {
                                                            textTransform: "uppercase"
                                                        },
                                                        onKeyPress: (event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors2?.Codigo?.message.includes("required") ? "" : errors2?.Codigo?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.Nombre}
                                        >
                                            Nombre:
                                        </FormLabel>
                                        <Controller
                                            name="Nombre"
                                            control={control2}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={datosTab2.Nombre}
                                                    error={!!errors2.Nombre}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors2.ModoTransporte}
                                        >
                                            Modo de Transporte:
                                        </FormLabel>
                                        <Controller
                                            name="ModoTransporte"
                                            error={!!errors2.ModoTransporte}
                                            control={control2}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    noOptionsText="Sin resultados"
                                                    disableClearable={true}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.value === value?.value
                                                    }
                                                    options={ModosTransporte}
                                                    value={datosTab2.ModoTransporte ?? null}
                                                    onChange={(event, value) => {
                                                        setValues2("ModoTransporte", value);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!errors2.ModoTransporte}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{ marginTop: "30px" }}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={5}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked={CollapseConductor}
                                                    onClick={() => {
                                                        setCollapseConductor(!CollapseConductor);
                                                    }}
                                                />
                                            }
                                            label="¿Desea llenar los campos de Conductor?"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>

                            <Collapse in={CollapseConductor}>
                                <Grid item xs={12}>
                                    <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
                                        <Chip color='default' label="Conductor" />
                                    </Divider>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.NoIdentificador}
                                            >
                                                No. Identificación:
                                            </FormLabel>
                                            <Controller
                                                name="NoIdentificador"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.NoIdentificador}
                                                        error={!!errors2.NoIdentificador}
                                                        inputProps={{
                                                            maxLength: 15,
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                        helperText={errors2?.NoIdentificador?.message.includes("required") ? "" : errors2?.NoIdentificador?.message}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.NoLicenciaConducir}
                                            >
                                                No. Licencia de Conducir:
                                            </FormLabel>
                                            <Controller
                                                name="NoLicenciaConducir"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.NoLicenciaConducir}
                                                        error={!!errors2.NoLicenciaConducir}
                                                        inputProps={{
                                                            maxLength: 15,
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                        helperText={errors2?.NoLicenciaConducir?.message.includes("required") ? "" : errors2?.NoLicenciaConducir?.message}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <FormLabel
                                                error={!!errors2.PaisExpedicion}
                                            >
                                                Pais Expedición:
                                            </FormLabel>
                                            <Controller
                                                name="PaisExpedicion"
                                                error={!!errors2.PaisExpedicion}
                                                control={control2}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={Paises}
                                                        value={datosTab2.PaisExpedicion ?? null}
                                                        onChange={(event, value) => {
                                                            setValues2("PaisExpedicion", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors2.PaisExpedicion}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.Nombres}
                                            >
                                                Nombres:
                                            </FormLabel>
                                            <Controller
                                                name="Nombres"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.Nombres}
                                                        error={!!errors2.Nombres}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.Apellidos}
                                            >
                                                Apellidos:
                                            </FormLabel>
                                            <Controller
                                                name="Apellidos"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.Apellidos}
                                                        error={!!errors2.Apellidos}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.IdUnidadTransporte}
                                            >
                                                Id Unidad Transporte:
                                            </FormLabel>
                                            <Controller
                                                name="IdUnidadTransporte"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.IdUnidadTransporte}
                                                        error={!!errors2.IdUnidadTransporte}
                                                        inputProps={{
                                                            maxLength: 15,
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <FormLabel
                                                error={!!errors2.PaisRegistro}
                                            >
                                                Pais de Registro:
                                            </FormLabel>
                                            <Controller
                                                name="PaisRegistro"
                                                error={!!errors2.PaisRegistro}
                                                control={control2}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={Paises}
                                                        value={datosTab2.PaisRegistro ?? null}
                                                        onChange={(event, value) => {
                                                            setValues2("PaisRegistro", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors2.PaisRegistro}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.Marca}
                                            >
                                                Marca:
                                            </FormLabel>
                                            <Controller
                                                name="Marca"
                                                error={!!errors2.Marca}
                                                control={control2}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={Marcas}
                                                        value={datosTab2.Marca ?? null}
                                                        onChange={(event, value) => {
                                                            setValues2("Marca", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors2.Marca}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.ChasisVin}
                                            >
                                                Chasis / Vin:
                                            </FormLabel>
                                            <Controller
                                                name="ChasisVin"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.ChasisVin}
                                                        error={!!errors2.ChasisVin}
                                                        inputProps={{
                                                            maxLength: 17,
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                            onKeyPress: (event) => {
                                                                if (!/[A-Za-z0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                        helperText={errors2?.ChasisVin?.message.includes("required") ? "" : errors2?.ChasisVin?.message}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.IdentificacionRemolque}
                                            >
                                                Identificación del Remolque...
                                                <BootstrapTooltip
                                                    title="o Semirremolque"
                                                    style={{ height: "18px" }}
                                                >
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="IdentificacionRemolque"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.IdentificacionRemolque}
                                                        error={!!errors2.IdentificacionRemolque}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.CantidadUnidadesCarga}
                                            >
                                                Cantidad de Unidades Carga...
                                                <BootstrapTooltip
                                                    title="(remolque y semirremolque)"
                                                    style={{ height: "18px" }}>
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="CantidadUnidadesCarga"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.CantidadUnidadesCarga}
                                                        error={!!errors2.CantidadUnidadesCarga}
                                                        inputProps={{
                                                            maxLength: 5,
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.NumeroDispositivo}
                                            >
                                                Número de Dispositivo Seguridad...
                                                <BootstrapTooltip
                                                    title="(precintos o marchamos)"
                                                    style={{ height: "18px" }}>
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="NumeroDispositivo"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.NumeroDispositivo}
                                                        error={!!errors2.NumeroDispositivo}
                                                        inputProps={{
                                                            maxLength: 3,
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.Equipamiento}
                                            >
                                                Equipamiento:
                                            </FormLabel>
                                            <Controller
                                                name="Equipamiento"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.Equipamiento}
                                                        error={!!errors2.Equipamiento}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.TamanioEquipamiento}
                                            >
                                                Tamaño del equipamiento:
                                            </FormLabel>
                                            <Controller
                                                name="TamanioEquipamiento"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.TamanioEquipamiento}
                                                        error={!!errors2.TamanioEquipamiento}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.TipoCarga}
                                            >
                                                Tipo de Carga:
                                            </FormLabel>
                                            <Controller
                                                name="TipoCarga"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.TipoCarga}
                                                        error={!!errors2.TipoCarga}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors2.NIdentificacionContenedor}
                                            >
                                                Número o Números de Identificación...
                                                <BootstrapTooltip
                                                    title="del o de los Contenedores"
                                                    style={{ height: "18px" }}>
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="NIdentificacionContenedor"
                                                control={control2}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab2.NIdentificacionContenedor}
                                                        error={!!errors2.NIdentificacionContenedor}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Collapse>

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
                                    onClick={() => {
                                        if (!isValid2) {
                                            ToastWarning();
                                        }
                                    }}
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    type="submit"
                                    disabled={loadingEditarTab2}
                                >
                                    {loadingEditarTab2 ? (
                                        <>
                                            {" "}Guardando...{" "}
                                        </>
                                    ) : (
                                        "Guardar"
                                    )}
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
                                    onClick={(e) => {
                                        navigate("/Duca/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </TabPanel>
                    </form>

                    <TabPanel value={valueTabs} index={3} dir={theme.direction}>
                        <Grid item xs={12}>
                            <Divider style={{ marginTop: '0px', marginBottom: '20px' }}>
                                <Chip color='default' label="Mercancias" />
                            </Divider>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1} style={{ justifyContent: "end" }}>
                                <label className='mt-8'>Filas por página:</label>
                                <FormControl sx={{ minWidth: 50 }} size="small">
                                    <Select
                                        value={filasItems}
                                        onChange={handleChangeFilasItems}
                                    >
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Barra de Busqueda en la Tabla */}
                                <TextField
                                    style={{ borderRadius: '10px' }}
                                    placeholder='Buscar'
                                    value={searchTextItems}
                                    onChange={handleSearchChangeItems}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton edge="start">
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                            <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '20px', marginBottom: '20px' }}>
                                <Table
                                    locale={{
                                        triggerDesc: 'Ordenar descendente',
                                        triggerAsc: 'Ordenar ascendente',
                                        cancelSort: 'Cancelar',
                                        emptyText: LoadingIcon(),
                                    }}
                                    columns={columnsItems}
                                    dataSource={filteredRowsItems}
                                    size="small"
                                    pagination={{
                                        pageSize: filasItems,
                                        showSizeChanger: false,
                                        className: "custom-pagination",
                                    }}
                                />
                            </div>
                        </Grid>

                        <form onSubmit={handleSubmit3_Items((_data) => {
                            guardarTab3_Items();
                        })}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.Item_Id}
                                        >
                                            Id Item:
                                        </FormLabel>
                                        <Controller
                                            name="Item_Id"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={true}
                                                    value={datosTab3_Items.Item_Id}
                                                    error={!!errors3_Items.Item_Id}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.CantidadBultos}
                                        >
                                            Cantidad Bultos:
                                        </FormLabel>
                                        <Controller
                                            name="CantidadBultos"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.CantidadBultos}
                                                    error={!!errors3_Items.CantidadBultos}
                                                    inputProps={{
                                                        maxLength: 3,
                                                        onKeyPress: (event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                    helperText={errors3_Items?.CantidadBultos?.message.includes("required") ? "" : errors3_Items?.CantidadBultos?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.ClaseBulto}
                                        >
                                            Clase de Bultos:
                                        </FormLabel>
                                        <Controller
                                            name="ClaseBulto"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.ClaseBulto}
                                                    error={!!errors3_Items.ClaseBulto}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.PesoNeto}
                                        >
                                            Peso Neto:
                                        </FormLabel>
                                        <Controller
                                            name="PesoNeto"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.PesoNeto}
                                                    error={!!errors3_Items.PesoNeto}
                                                    inputProps={{
                                                        maxLength: 12
                                                    }}
                                                    helperText={errors3_Items?.PesoNeto?.message.includes("required") ? "" : errors3_Items?.PesoNeto?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.PesoBruto}
                                        >
                                            Peso Bruto:
                                        </FormLabel>
                                        <Controller
                                            name="PesoBruto"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.PesoBruto}
                                                    error={!!errors3_Items.PesoBruto}
                                                    inputProps={{
                                                        maxLength: 12
                                                    }}
                                                    helperText={errors3_Items?.PesoBruto?.message.includes("required") ? "" : errors3_Items?.PesoBruto?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.CuotaContingente}
                                        >
                                            Cuota Contingente:
                                        </FormLabel>
                                        <Controller
                                            name="CuotaContingente"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.CuotaContingente}
                                                    error={!!errors3_Items.CuotaContingente}
                                                    helperText={errors3_Items?.CuotaContingente?.message.includes("required") ? "" : errors3_Items?.CuotaContingente?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.Acuerdo}
                                        >
                                            Acuerdo:
                                        </FormLabel>
                                        <Controller
                                            name="Acuerdo"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.Acuerdo}
                                                    error={!!errors3_Items.Acuerdo}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.CriterioParaOrigen}
                                        >
                                            Criterio Para Certificar Origen:
                                        </FormLabel>
                                        <Controller
                                            name="CriterioParaOrigen"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.CriterioParaOrigen}
                                                    error={!!errors3_Items.CriterioParaOrigen}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.ReglasAccesorias}
                                        >
                                            Reglas Accesorias:
                                        </FormLabel>
                                        <Controller
                                            name="ReglasAccesorias"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.ReglasAccesorias}
                                                    error={!!errors3_Items.ReglasAccesorias}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.GastosTransporte}
                                        >
                                            Gastos de Transporte:
                                        </FormLabel>
                                        <Controller
                                            name="GastosTransporte"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.GastosTransporte}
                                                    error={!!errors3_Items.GastosTransporte}
                                                    inputProps={{
                                                        maxLength: 12,
                                                    }}
                                                    helperText={errors3_Items?.GastosTransporte?.message.includes("required") ? "" : errors3_Items?.GastosTransporte?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.Seguro}
                                        >
                                            Seguro:
                                        </FormLabel>
                                        <Controller
                                            name="Seguro"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.Seguro}
                                                    error={!!errors3_Items.Seguro}
                                                    inputProps={{
                                                        maxLength: 12,
                                                    }}
                                                    helperText={errors3_Items?.Seguro?.message.includes("required") ? "" : errors3_Items?.Seguro?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth={true}>
                                        <FormLabel
                                            error={!!errors3_Items.OtrosGastos}
                                        >
                                            Otros Gastos:
                                        </FormLabel>
                                        <Controller
                                            name="OtrosGastos"
                                            control={control3_Items}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    disabled={completarItem}
                                                    value={datosTab3_Items.OtrosGastos}
                                                    error={!!errors3_Items.OtrosGastos}
                                                    inputProps={{
                                                        maxLength: 12,
                                                    }}
                                                    helperText={errors3_Items?.OtrosGastos?.message.includes("required") ? "" : errors3_Items?.OtrosGastos?.message}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                </Grid>

                                <Grid item xs={4}>
                                    <Button
                                        fullWidth
                                        disabled={completarItem}
                                        startIcon={<Icon>{isEditItem ? "edit" : "add"}</Icon>}
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            borderRadius: "10px",
                                            marginRight: "10px",
                                            marginTop: "20px"
                                        }}
                                        sx={{
                                            backgroundColor: "#D1AF3C",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#EACB60" },
                                        }}
                                        onClick={() => {
                                            if (!isValid3_Items) {
                                                ToastWarning();
                                            }
                                        }}
                                        type="submit"
                                    >
                                        {isEditItem ? "Editar Mercancía" : "Completar Mercancía"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        <br />
                        <br />
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1} style={{ justifyContent: "end" }}>
                                <label className='mt-8'>Filas por página:</label>
                                <FormControl sx={{ minWidth: 50 }} size="small">
                                    <Select
                                        value={filasItemsCompletados}
                                        onChange={handleChangeFilasItemsCompletados}
                                    >
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Barra de Busqueda en la Tabla */}
                                <TextField
                                    style={{ borderRadius: '10px' }}
                                    placeholder='Buscar'
                                    value={searchTextItemsCompletados}
                                    onChange={handleSearchChangeItemsCompletados}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton edge="start">
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                            <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '20px' }}>
                                <Table
                                    locale={{
                                        triggerDesc: 'Ordenar descendente',
                                        triggerAsc: 'Ordenar ascendente',
                                        cancelSort: 'Cancelar',
                                        emptyText: LoadingIcon(),
                                    }}
                                    columns={columnsItemsCompletados}
                                    dataSource={filteredRowsItemsCompletados}
                                    size="small"
                                    pagination={{
                                        pageSize: filasItemsCompletados,
                                        showSizeChanger: false,
                                        className: "custom-pagination",
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid container spacing={2} style={{ marginTop: "30px" }}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={5}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked={documentosSoporteList.length > 0}
                                                onClick={() => {
                                                    setCollapseDocumentosSoport(!collapseDocumentosSoporte);

                                                    if (!collapseDocumentosSoporte) {
                                                        setIsEditDocumentoSoporte(false);
                                                    }
                                                }}
                                            />
                                        }
                                        label="¿Desea agegar Documentos de Soporte?"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                        <Collapse in={collapseDocumentosSoporte}>
                            <Grid item xs={12}>
                                <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
                                    <Chip color='default' label="Documentos de Soporte" />
                                </Divider>
                            </Grid>

                            <form onSubmit={handleSubmit3_DocumentosSoporte((_data) => {
                                guardarTab3_DocumentosSoporte();
                            })}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.CodigoTipoDocumento}
                                            >
                                                Código del Tipo Documento:
                                            </FormLabel>
                                            <Controller
                                                name="CodigoTipoDocumento"
                                                error={!!errors3_DocumentosSoporte.CodigoTipoDocumento}
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={tiposDocumentos}
                                                        value={datosTab3_DocumentosSoporte.CodigoTipoDocumento ?? null}
                                                        onChange={(event, value) => {
                                                            setValues3_DocumentosSoporte("CodigoTipoDocumento", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors3_DocumentosSoporte.CodigoTipoDocumento}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.NumeroDocumento}
                                            >
                                                Número de Documento:
                                            </FormLabel>
                                            <Controller
                                                name="NumeroDocumento"
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab3_DocumentosSoporte.NumeroDocumento}
                                                        error={!!errors3_DocumentosSoporte.NumeroDocumento}
                                                        inputProps={{
                                                            style: {
                                                                textTransform: "uppercase"
                                                            },
                                                        }}
                                                        helperText={errors3_DocumentosSoporte?.NumeroDocumento?.message.includes("required") ? "" : errors3_DocumentosSoporte?.NumeroDocumento?.message}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Controller
                                            name="EmisionDocumento"
                                            control={control3_DocumentosSoporte}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors3_DocumentosSoporte.EmisionDocumento}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel>
                                                        Fecha Emisión del Documento:
                                                    </FormLabel>
                                                    <DatePicker
                                                        onChange={(date) => field.onChange(date)}
                                                        value={field.value}
                                                        disableFuture={true}
                                                        renderInput={(_props) => (
                                                            <TextField
                                                                {..._props}
                                                                onBlur={field.onBlur}
                                                                error={!!errors3_DocumentosSoporte.EmisionDocumento}
                                                                helperText={errors3_DocumentosSoporte?.EmisionDocumento?.message.includes("Invalid Date") ? "La fecha ingresada no es válida" : errors3_DocumentosSoporte?.EmisionDocumento?.message}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Controller
                                            name="FechaVencimiento"
                                            control={control3_DocumentosSoporte}
                                            render={({ field }) => (
                                                <FormControl
                                                    error={!!errors3_DocumentosSoporte.FechaVencimiento}
                                                    fullWidth={true}
                                                >
                                                    <FormLabel>
                                                        Fecha Vencimiento del Documento:
                                                    </FormLabel>
                                                    <DatePicker
                                                        onChange={(date) => field.onChange(date)}
                                                        value={field.value}
                                                        disablePast={true}
                                                        renderInput={(_props) => (
                                                            <TextField
                                                                {..._props}
                                                                onBlur={field.onBlur}
                                                                error={!!errors3_DocumentosSoporte.FechaVencimiento}
                                                                helperText={errors3_DocumentosSoporte?.FechaVencimiento?.message.includes("Invalid Date") ? "La fecha ingresada no es válida" : errors3_DocumentosSoporte?.FechaVencimiento?.message}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.PaisEmision}
                                            >
                                                País de Emisión:
                                            </FormLabel>
                                            <Controller
                                                name="PaisEmision"
                                                error={!!errors3_DocumentosSoporte.PaisEmision}
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        noOptionsText="Sin resultados"
                                                        disableClearable={true}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value?.value
                                                        }
                                                        options={Paises}
                                                        value={datosTab3_DocumentosSoporte.PaisEmision ?? null}
                                                        onChange={(event, value) => {
                                                            setValues3_DocumentosSoporte("PaisEmision", value);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                error={!!errors3_DocumentosSoporte.PaisEmision}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.Linea}
                                            >
                                                Linea (al que aplica el documento):
                                            </FormLabel>
                                            <Controller
                                                name="Linea"
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab3_DocumentosSoporte.Linea}
                                                        error={!!errors3_DocumentosSoporte.Linea}
                                                        inputProps={{
                                                            maxLength: 4,
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.AutoridadEntidad}
                                            >
                                                Autoridad o Entidad que Emitió...
                                                <BootstrapTooltip
                                                    title="el Documento"
                                                    style={{ height: "18px" }}
                                                >
                                                    <InfoIcon sx={{ color: '#ADADAD' }} />
                                                </BootstrapTooltip>:
                                            </FormLabel>
                                            <Controller
                                                name="AutoridadEntidad"
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab3_DocumentosSoporte.AutoridadEntidad}
                                                        error={!!errors3_DocumentosSoporte.AutoridadEntidad}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors3_DocumentosSoporte.Monto}
                                            >
                                                Monto:
                                            </FormLabel>
                                            <Controller
                                                name="Monto"
                                                control={control3_DocumentosSoporte}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={datosTab3_DocumentosSoporte.Monto}
                                                        error={!!errors3_DocumentosSoporte.Monto}
                                                        inputProps={{
                                                            maxLength: 10,
                                                            onKeyPress: (event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            },
                                                        }}
                                                    ></TextField>
                                                )}
                                            ></Controller>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4} >
                                        <Button
                                            fullWidth
                                            startIcon={<Icon>{isEditDocumentoSoporte ? "edit" : "add"}</Icon>}
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                borderRadius: "10px",
                                                marginRight: "10px",
                                                marginTop: "25px"
                                            }}
                                            sx={{
                                                backgroundColor: "#D1AF3C",
                                                color: "white",
                                                "&:hover": { backgroundColor: "#EACB60" },
                                            }}
                                            onClick={() => {
                                                if (!isValid3_DocumentosSoporte) {
                                                    ToastWarning();
                                                }
                                            }}
                                            type="submit"
                                        >
                                            {isEditDocumentoSoporte ? "Editar Documento" : "Agregar Documento"}
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '20px' }}>
                                            <Table
                                                locale={{
                                                    triggerDesc: 'Ordenar descendente',
                                                    triggerAsc: 'Ordenar ascendente',
                                                    cancelSort: 'Cancelar',
                                                    emptyText: LoadingIcon(),
                                                }}
                                                columns={columnsDocumentos}
                                                dataSource={documentosSoporteList}
                                                size="small"
                                                pagination={{
                                                    pageSize: 10,
                                                    showSizeChanger: false,
                                                    className: "custom-pagination",
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </Collapse>

                        <Grid container spacing={2} my={'15px'}>
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
                                    onClick={() => {
                                        if (ListadoItems.length > 0) {
                                            ToastWarningPersonalizado("Advertencia. ¡No puede finalizar la DUCA ya que esta contiene Items sin completar!")
                                        } else if (ListadoItemsCompletados.length == 0) {
                                            ToastWarningPersonalizado("Advertencia. ¡No puede finalizar la DUCA ya que esta no contiene Items!")
                                        } else if (datosTab1.NoDuca === null || datosTab1.NoDuca === ""){
                                            ToastWarningPersonalizado("Advertencia. ¡No puede finalizar la DUCA ya que el campo 'No. de DUCA' está vacío!")
                                        } else {
                                            setFinalizacionDuca(true);
                                        }
                                    }}
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                >
                                    Finalizar DUCA
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
                                    onClick={(e) => {
                                        navigate("/Duca/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>

                </SwipeableViews>
            </Box>

            <Dialog
                open={LugarDesembarqueOpenDialog}
                fullWidth={true}
                onClose={DialogLugarDesembarque}
                maxWidth={"md"}
            >
                <DialogTitle id="alert-dialog-title">
                    Lugares de Desembarque
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        DialogLugarDesembarque()
                    }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Grid container spacing={2} style={{ marginBottom: "15px" }}>
                        <Grid item xs={8}>
                            <TextField
                                placeholder="Buscar"
                                size="xs"
                                fullWidth={true}
                                value={TextLugarDesembarque}
                                inputProps={{
                                    style: {
                                        textTransform: "uppercase"
                                    }
                                }}
                                onChange={handleChangeLugarDesembarque}
                            ></TextField>
                        </Grid>
                        <Grid item xs={4} >
                            <Button
                                fullWidth={true}
                                startIcon={<Icon>search</Icon>}
                                variant="contained"
                                color="primary"
                                style={{
                                    borderRadius: "10px",
                                    marginTop: "6px"
                                }}
                                sx={{
                                    backgroundColor: '#634A9E',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#6e52ae' },
                                }}
                                onClick={EnviarData}
                            >
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    {/* Declaracion de la tabla */}
                    <div className="center" style={{ width: "95%", margin: "auto" }}>
                        <Stack direction="row" spacing={1} style={{ justifyContent: "end" }}>
                            <label className="mt-8">Filas por página:</label>
                            <FormControl sx={{ minWidth: 50 }} size="small">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={filasLugarDesembarque}
                                    onChange={handleChangeFilasLugarDesembarque}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Barra de Busqueda en la Tabla */}
                            <TextField
                                style={{ borderRadius: "10px" }}
                                placeholder="Buscar"
                                value={SearchTextLugarDesembarque}
                                onChange={handleSearchChangeLugarDesembarque}
                                size="small"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <br />
                        <Table
                            columns={columnsLugarDesembarque}
                            dataSource={filteredRowsLugarDesembarque}
                            size="sm"
                            locale={{
                                triggerDesc: "Ordenar descendente",
                                triggerAsc: "Ordenar ascendente",
                                cancelSort: "Cancelar",
                                emptyText: LoadingIcon(),
                            }}
                            pagination={{
                                pageSize: filasLugarDesembarque,
                                showSizeChanger: false,
                                className: "custom-pagination",
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
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
                        onClick={() => {
                            DialogLugarDesembarque()
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Inicia del Dialog(Modal) de Finalización */}
            <Dialog
                open={finalizacionDuca}
                fullWidth
                onClose={DialogFinalizarDuca}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown
            >
                <DialogTitle id="alert-dialog-title">
                    Confirmación de Finalización
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        DialogFinalizarDuca();
                    }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro(a) de que desea finalizar la DUCA? <br></br>
                        Le recordamos que una vez que la DUCA sea finalizada,
                        no será posible realizar modificaciones a la misma.
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
                            color="primary"
                            style={{ borderRadius: "10px", marginRight: "10px" }}
                            sx={{
                                backgroundColor: "#634A9E",
                                color: "white",
                                "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            onClick={() => {
                                finalizarDuca();
                            }}
                            disabled={loadingFinalizarDuca}
                        >
                            {loadingFinalizarDuca ? (
                                <>
                                    {" "}Finalizando...{" "}
                                </>
                            ) : (
                                "Finalizar"
                            )}
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
                            onClick={DialogFinalizarDuca}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>

        </Card>
    );
}

export default DucaEditar;