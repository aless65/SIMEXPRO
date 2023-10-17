import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
    Button,
    FormControl,
    Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Autocomplete,
    Divider,
    Chip,

} from "@mui/material";


import * as React from "react";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { height } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";

//Imports de Redireciones
import History from "src/@history/@history";
//Imports de validaciones
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//Imports tabla
import { Badge, Dropdown, Space, Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
//Import service
import LotesService from "./LotesService";
import InputMask from "react-input-mask";
import "react-toastify/dist/ReactToastify.css";
import {
    ToastSuccessGuardado,
    ToastWarning,
    ToastError,
    ToastErrorPersonalizado,
    ToastWarningYaExiste,
    ToastWarningPersonalizado
} from "src/styles/toastsFunctions";
import RefreshIcon from '@mui/icons-material/Refresh';
import CircleIcon from '@mui/icons-material/Circle';

function LotesCrear() {
    const load_DDLs = Load_DDLs()

    //variable del service
    const lotesService = LotesService();

    const [PedidosOrden, setPedidosOrden] = useState([]);

    const [materiales, setMateriales] = useState([]);

    const [color, setcolor] = useState([]);

    const [UnidadMedidas, setUnidadMedidas] = useState([]);

    const [area, setarea] = useState([]);

    const [detalleExiste, setDetalleExiste] = useState(true);

    const [DeshabilitarMaterial, setDeshabilitarMaterial] = useState(false);

    const materialesGet = async () => {
        try {
            const data = await load_DDLs.Materiales()
            setMateriales(data)
        } catch (error) {
        }
    };

    const unidadmedidaGet = async () => {
        try {
            const data = await lotesService.UnidadMedida()
            setUnidadMedidas(data)
        } catch (error) {
        }
    };

    const areaGet = async () => {
        try {
            const data = await load_DDLs.Areas()
            setarea(data)
        } catch (error) {
        }
    }

    const coloresGet = async () => {
        try {
            const data = await load_DDLs.Colores()
            setcolor(data)
        } catch (error) {
        }
    };

    const pedidosordenGet = async () => {
        try {
            const data = await load_DDLs.PedidoOrdenDetalle2()
            
            setPedidosOrden(data)
         
        } catch (error){
        }
    }

    const handleBlur = async () => {
        const formData = getValues();
        try {
            const detallePedido = formData.prod_Id
            if (detallePedido) {
                const response = await lotesService.getPedidosOrdenDetallesInfo(detallePedido);
                const material = materiales.find(item => item.value === response[0].mate_Id)
                setValue('mate_Id', material)
                setValue('cantidadIngresada', response[0].prod_Cantidad)
                setDetalleExiste(true);
                setDeshabilitarMaterial(true); // Deshabilitar el campo Material
            } else {
                setValue('mate_Id', null);
                setValue('cantidadIngresada', '');
                setDeshabilitarMaterial(false); // Habilitar el campo Material
            }
        }
        catch (error) {
            setValue('mate_Id', null);
            setValue('cantidadIngresada', '');
            setDetalleExiste(false);
            setDeshabilitarMaterial(false); // Habilitar el campo Material
        }
    };

    useEffect(() => {
        materialesGet()
        unidadmedidaGet()
        areaGet()
        coloresGet()
        pedidosordenGet()
        trigger("prod_Id")
    }, [detalleExiste]);

    const defaultValues = {
        prod_Id: '',
        lote_CodigoLote: '',
        cantidadIngresada: '',
        mate_Id: null,
        lote_Observaciones: '',
        tipa_Id: null,
        unme_Id: null,
        colr_Id: null,
        // colr_CodigoHtml: null,
    };

    const accountSchema = yup.object().shape({
        prod_Id: yup.string().test("valido", "El numero de pedido orden detalle no existe", () => { return detalleExiste }),
        lote_Stock: yup.number().min(1).max(2147483647).required(""),
        mate_Id: yup.object().required(""),
        lote_Observaciones: yup.string().required(""),
        lote_CodigoLote: yup.string().required(""),
        tipa_Id: yup.object().required(""),
        unme_Id: yup.object().required(""),
        colr_Id: yup.object().required(""),
    });

    //Declaracion del formulario
    const { handleSubmit, register, reset, control, watch, formState, setValue, trigger, getValues } =
        useForm({
            defaultValues, //Campos del formulario
            mode: "all",
            resolver: yupResolver(accountSchema), //Esquema del formulario
        });

    const { isValid, dirtyFields, errors, touchedFields } = formState;

    //Datos del formulario
    const datosWatch = watch();

    const lotesCreate = async () => {
        try {
            if (isValid) {
                if (datosWatch.cantidadIngresada <= 0) {
                    ToastErrorPersonalizado('Error. La cantidad que ingresó no puede ser igual o menor 0.')
                } else {
                    const response = await lotesService.crear(datosWatch);
                    if (response.data.data.messageStatus === "1") {
                        ToastSuccessGuardado()
                        History.push("/Lotes/Index")
                    } else if (response.data.data.messageStatus.includes('UNIQUE')) {
                        ToastWarningPersonalizado('Advertencia. El codigo del lote ya existe.')
                    }
                }
            } else {
                ToastWarning()
            }
        } catch (error) {
        }
    }
    //Peticion para crear un registro
    return (
        <form onSubmit={handleSubmit((_data) => { })}>
            <Card sx={{ minWidth: 275, margin: "40px" }}>
                {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
                <CardMedia
                    component="img"
                    height="200"
                    image="https://i.ibb.co/w4zKLJs/LOTES.png"
                    alt="Encabezado de la carta"
                />

                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                            <Divider style={{ marginTop: "0px" }}>
                                <Chip label="Agregar lote" />
                            </Divider>
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.lote_CodigoLote} fullWidth={true}>
                                        <FormLabel>
                                            Código Lote:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            error={!!errors.lote_CodigoLote}
                                            variant="outlined"
                                            inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name='lote_CodigoLote'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.prod_Id} fullWidth={true}>
                                        <FormLabel
                                        >
                                            N° de detalle de orden de pedido:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            error={!!errors.prod_Id}
                                            helperText={errors?.prod_Id?.message}
                                            variant="outlined"
                                            fullWidth={true}
                                            onBlur={handleBlur}
                                            placeholder="..."
                                            type="number"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Icon style={{ color: '#DAD8D8' }}>search</Icon>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name="prod_Id"
                                control={control}
                            />

                        </Grid>


                        <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <FormControl fullWidth={true}>
                                        <FormLabel

                                            error={!!errors.mate_Id}
                                        >
                                            Material:
                                        </FormLabel>
                                        <Autocomplete
                                            {...field}
                                            disablePortal
                                            isOptionEqualToValue={(option, value) =>
                                                option.value === value.value
                                            }
                                            disableClearable={true}
                                            options={materiales}
                                            disabled={DeshabilitarMaterial}
                                            value={datosWatch["mate_Id"]}
                                            onChange={(event, value) => {
                                                setValue('mate_Id', value)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={!!errors.mate_Id}
                                                    InputLabelProps={{ shrink: true }}

                                                />
                                            )}
                                        />
                                    </FormControl>
                                )}
                                name="mate_Id"
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={6}>

                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.cantidadIngresada} fullWidth={true}>
                                        <FormLabel>
                                            Cantidad ingresada de material:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            error={!!errors.cantidadIngresada}
                                            type="number"
                                            variant="outlined"
                                            inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name='cantidadIngresada'
                                control={control}
                            />

                        </Grid>


                        <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={field.value === "0"} fullWidth={true}>
                                        <FormLabel

                                            error={!!errors.tipa_Id}
                                        >
                                            Área de embalaje:
                                        </FormLabel>
                                        <Autocomplete
                                            {...field}
                                            disablePortal
                                            isOptionEqualToValue={(option, value) =>
                                                option.value === value.value
                                            }
                                            disableClearable={true}
                                            options={area}
                                            value={datosWatch["tipa_Id"]}
                                            onChange={(event, value) => {
                                                setValue('tipa_Id', value)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={!!errors.tipa_Id}
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                )}
                                name="tipa_Id"
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.lote_Observaciones} fullWidth={true}>
                                        <FormLabel>
                                            Observaciones:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            error={!!errors.lote_Observaciones}
                                            variant="outlined"
                                            inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name='lote_Observaciones'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={field.value === "0"} fullWidth={true}>
                                        <FormLabel

                                            error={!!errors.colr_Id}
                                        >
                                            Color:
                                        </FormLabel>
                                        <Autocomplete
                                            {...field}
                                            disablePortal
                                            
                                            isOptionEqualToValue={(option, value) =>
                                                option.value === value.value
                                            }
                                            disableClearable={true}
                                            options={color}
                                            renderOption={(props, option) => (
                                                <li {...props}>
                                                    <CircleIcon style={{color: option.color}}/>
                                                  {option.label}
                                                </li>
                                              )}
                                            onChange={(event, value) => {
                                                setValue('colr_Id',value)
                                            }}
                                            renderInput={(params) => (
                                                <>
                                               
                                                <TextField
                                                    {...params}
                                                    error={!!errors.colr_Id}
                                                    InputLabelProps={{ shrink: true }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        startAdornment: (
                                                          <InputAdornment position="end">
                                                            <CircleIcon style={{color: datosWatch.colr_Id? datosWatch.colr_Id['color'] : "white"}}/>
                                                          </InputAdornment>
                                                        )
                                                      }}
                                                      />
                                                      </>
                                            )}
                                        />
                                    </FormControl>
                                )}
                                name="colr_Id"
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={field.value === "0"} fullWidth={true}>
                                        <FormLabel

                                            error={!!errors.unme_Id}
                                        >
                                            Unidad de medida:
                                        </FormLabel>
                                        <Autocomplete
                                            {...field}
                                            disableClearable={true}
                                            disablePortal
                                            isOptionEqualToValue={(option, value) =>
                                                option.value === value.value
                                            }
                                            options={UnidadMedidas}
                                            value={datosWatch["unme_Id"]}
                                            onChange={(event, value) => {
                                                setValue('unme_Id', value)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={!!errors.unme_Id}
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                )}
                                name="unme_Id"
                                control={control}
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
                                onClick={lotesCreate}
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
                                onClick={() => {
                                    History.push("/Lotes/Index");
                                }}
                            >
                                Cancelar
                            </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
}

export default LotesCrear;