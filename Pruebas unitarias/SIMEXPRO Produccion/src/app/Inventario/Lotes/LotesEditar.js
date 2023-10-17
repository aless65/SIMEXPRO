import {
    Autocomplete,
    Button,
    Chip,
    Divider,
    FormControl,
    Icon,
    InputAdornment,
    TextField
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircleIcon from '@mui/icons-material/Circle';

import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

//Imports de Redireciones
import History from "src/@history/@history";
//Imports de validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
//Imports tabla
import "src/styles/custom-pagination.css";
//import tabla detalles
//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
//Import service
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
    ToastError,
    ToastErrorPersonalizado,
    ToastSuccessEditar,
    ToastWarning
} from "src/styles/toastsFunctions";
import LotesService from "./LotesService";

function LotesEditar() {
    const load_DDLs = Load_DDLs()

    //variable del service
    const lotesService = LotesService();

    const [materiales, setMateriales] = useState([]);

    const [color, setcolor] = useState([]);

    const [UnidadMedidas, setUnidadMedidas] = useState([]);

    const [area, setarea] = useState([]);

    const [detalleExiste, setDetalleExiste] = useState(true);

    const location = useLocation()
    const data = location.state;

    const materialesGet = async () => {
        try {
            const response = await load_DDLs.Materiales()
            setMateriales(response)
            setValue('mate_Id', response.find(item => item.value === data.mate_Id), {shouldValidate: true, shouldTouch: true})
        } catch (error) {
        }
    };

    const unidadmedidaGet = async () => {
        try {
            const response = await load_DDLs.UnidadMedida()
            setUnidadMedidas(response)
            setValue('unme_Id', response.find(item => item.value === data.unme_Id), {shouldValidate: true, shouldTouch: true})
        } catch (error) {
        }
    };

    const coloresGet = async () => {
        try {
            const response = await load_DDLs.Colores()
            setcolor(response)
            setValue('colr_Id', response.find(item => item.value === data.colr_Id), {shouldValidate: true, shouldTouch: true})
        } catch (error) {
        }
    };

    const areaGet = async () => {
        try {
            const response = await load_DDLs.Areas()
            setarea(response)
            setValue('tipa_Id', response.find(item => item.value === data.tipa_Id), {shouldValidate: true, shouldTouch: true})
        } catch (error) {
        }
    }

    const handleBlur = async () => {
        const formData = getValues();
        try {
            const detallePedido = formData.prod_Id
            if (detallePedido) {
                const response = await lotesService.getPedidosOrdenDetallesInfo(detallePedido);
                const material = materiales.find(item => item.value === response[0].mate_Id)
                setValue('mate_Id', material, {shouldValidate: true, shouldTouch: true})
                setValue('lote_Stock', response[0].prod_Cantidad, {shouldValidate: true, shouldTouch: true})
                setDetalleExiste(true);           
            } else {
                setValue('mate_Id', null, {shouldValidate: true, shouldTouch: true});
                setValue('lote_Stock', '', {shouldValidate: true, shouldTouch: true});         
            }
        }
        catch (error) {
            setValue('mate_Id', null, {shouldValidate: true, shouldTouch: true});
            setValue('lote_Stock', '', {shouldValidate: true, shouldTouch: true});
            setDetalleExiste(false); 
        }
    };

    useEffect(() => {
        if(datosWatch.prod_Id != ""){
            handleBlur
        }
        coloresGet()
        materialesGet()
        unidadmedidaGet()
        areaGet()
        trigger("prod_Id")
        setTimeout(() => {
            trigger()
        },850)
    }, [detalleExiste]);

    const defaultValues = {
        lote_Id: data.lote_Id,
        lote_CodigoLote: data.lote_CodigoLote,
        prod_Id: data.prod_Id ? data.prod_Id : '' ,
        lote_Stock: data.lote_Stock ? data.lote_Stock : '',
        mate_Id: null,
        colr_Id: null,
        lote_Observaciones: data.lote_Observaciones,
        tipa_Id: null,
        unme_Id: null
    };
    
    const accountSchema = yup.object().shape({
        lote_Id: yup.string(),
        prod_Id: yup.string().test("valido", "El numero de pedido orden detalle no existe", () => { return detalleExiste }),
        lote_Stock: yup.number().min(1).max(2147483647).required(""),
        lote_CodigoLote: yup.string().required(""),
        mate_Id: yup.object().required(""),
        lote_Observaciones: yup.string().required(""),
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
                if (datosWatch.lote_Stock <= 0) {
                    ToastErrorPersonalizado('Error. La cantidad que ingresó no puede ser igual o menor 0.')
                } else {
                    const response = await lotesService.editar(datosWatch);
                    if (response.data.data.messageStatus === "1") {
                        ToastSuccessEditar()
                        History.push("/Lotes/Index")
                    } else {
                        ToastError()
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
                                <Chip label="Editar Lote" />
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
                                            disabled={true}
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
                                                      <Icon style={{  color: '#DAD8D8' }}>search</Icon>
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
                                            value={datosWatch["mate_Id"]}
                                            disabled={true}
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
                            <FormControl error={!!errors.lote_Stock} fullWidth={true}>
                                <FormLabel>
                                Cantidad ingresada de material:
                                </FormLabel>
                                <TextField
                                    {...field}
                                    error={!!errors.lote_Stock}
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
                            name='lote_Stock'
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
                                            Unidad de Medida:
                                        </FormLabel>
                                        <Autocomplete
                                            {...field}
                                            disablePortal
                                            isOptionEqualToValue={(option, value) =>
                                                option.value === value.value
                                            }
                                            disableClearable={true}
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

export default LotesEditar;