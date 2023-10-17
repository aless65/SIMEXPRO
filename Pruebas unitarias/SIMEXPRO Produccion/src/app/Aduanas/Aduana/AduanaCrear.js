import { yupResolver } from "@hookform/resolvers/yup";
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Icon,
    InputAdornment,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import "src/styles/custom-pagination.css";
//import { ToastError, ToastSuccess, ToastWarning } from "src/styles/toastsFunctions";
import * as yup from "yup";
import AduanaService from "./AduanaService";
//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
    ToastSuccess,
    ToastWarning,
    ToastError,
    ToastDefault,
    ToastWarningYaExiste
} from "src/styles/toastsFunctions";

import TextArea from "antd/es/input/TextArea";



function aduanaCrear() {
    const Load_DDL = Load_DDLs();
    const aduanaService = new AduanaService()
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setciudades] = useState([]);

    const provinciasGet = async () => {
        try {
            const data = await Load_DDL.ProvinciasFiltradaPorPaisYesAduana(97,true);
            setProvincias(data)
        } catch (error) {
            
        }
    };

    const CiudadesGet = async (id) => {
        try {
            if (id) {
                const data = await Load_DDL.CiudadesPorProvincia(parseInt(id))
                setValue()
                setciudades(data)
            } else {
                setciudades([])
            }
        } catch (error) {
            
        }
    };

    const formatChars = {
        '*': '[0-9]'
    };

    const defaultValues = {
        adua_Codigo: "",
        adua_Nombre: "",
        adua_Direccion_Exacta: "",
        provincia: null,
        Ciudad: null, //para los campos que son ddl poner null
    };

    useEffect(() => {
        provinciasGet();
    }, []);

    const accountSchema = yup.object().shape({
        adua_Codigo: yup.string().trim().required(""),
        adua_Nombre: yup.string().trim().required(""),
        adua_Direccion_Exacta: yup.string().trim().required(""),
        Ciudad: yup.object().nullable().required(""),
        provincia: yup.object().nullable().required(""),
    });

    const { handleSubmit, control, watch, formState, setValue } =
        useForm({
            defaultValues,
            mode: "all",
            resolver: yupResolver(accountSchema),
        });
    const { isValid, errors } = formState;
    const datosWatch = watch();

    const aduanaCreate = async () => {
        try {
            const response = await aduanaService.crear(datosWatch);
            if (response.data.data.messageStatus == "1") {
                History.push("/Aduana/index");
                ToastSuccess("El registro se ha insertado exitosamente");
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste("Ya existe la Aduana");
            }
        } catch (error) {
            
            ToastError("Error inesperado");
        }
    };

    const validacion = async () => {
        if (isValid) {
            aduanaCreate()
        }
        else {
            ToastWarning();
        }
    }

    return (
        <form onSubmit={handleSubmit((_data) => { })}>
            <Card sx={{ minWidth: 275, margin: "40px" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image="https://i.ibb.co/r0frJNT/ADUANAS.png"
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
                                <Chip label="Crear Aduanas" />
                            </Divider>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    name="adua_Codigo"
                                    control={control}
                                    render={({ field }) => (
                                        <InputMask
                                            mask="****"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            maskChar=""
                                            formatChars={formatChars}
                                        >
                                            {() => (
                                                <FormControl error={!!errors.adua_Codigo} fullWidth={true}>
                                                    <FormLabel>
                                                        Código de la Aduana:
                                                    </FormLabel>
                                                    <TextField
                                                        {...field}
                                                        error={!!errors.adua_Codigo}
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
                                        </InputMask>
                                    )}
                                ></Controller>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.adua_Nombre} fullWidth={true}>
                                            <FormLabel>
                                                Nombre Aduana:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.adua_Nombre}
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
                                    name="adua_Nombre"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    name="provincia"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            error={!!errors.provincia}
                                            fullWidth={true}
                                        >
                                            <FormLabel
                                                error={!!errors.provincia}
                                            >
                                                Provincia:
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                id="provincia"
                                                options={provincias}
                                                value={datosWatch["provincia"] ?? null}
                                                onChange={async (event, value) => {
                                                    setValue('provincia', value)
                                                    setValue('Ciudad', null)
                                                    CiudadesGet(value?.value)
                                                    if (!value) { setValue('ciud_Id', []) }
                                                }}
                                                disableClearable={true}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={!!errors.provincia}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                )}
                                            />

                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    name="Ciudad"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            error={!!errors.Ciudad}
                                            fullWidth={true}
                                        >
                                            <FormLabel
                                                error={!!errors.Ciudad}
                                                disabled={datosWatch['Ciudad'] != null ? false : true}
                                            >
                                                Ciudades:
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                id="Ciudad"
                                                options={ciudades}
                                                value={datosWatch["Ciudad"] ?? null}
                                                onChange={async (event, value) => {
                                                    setValue('Ciudad', value)
                                                }}
                                                disableClearable={true}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={!!errors.Ciudad}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.adua_Direccion_Exacta} fullWidth={true}>
                                            <FormLabel>
                                                Dirección Exacta:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.adua_Direccion_Exacta}
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
                                    name="adua_Direccion_Exacta"
                                    control={control}
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
                                onClick={validacion}
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
                                    History.push("/aduana/Index");
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

export default aduanaCrear;
