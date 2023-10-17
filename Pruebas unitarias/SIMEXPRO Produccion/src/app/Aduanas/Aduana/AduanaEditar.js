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
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import "src/styles/custom-pagination.css";
import { ToastError, ToastSuccess, ToastWarning,ToastWarningYaExiste } from "src/styles/toastsFunctions";
import * as yup from "yup";
import aduanaService from "./AduanaService";


function aduanaEditar() {
    const Load_DDL = Load_DDLs();
    const AduanaService = new aduanaService()
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setciudades] = useState([]);
    const location = useLocation();
    const myData = location.state;

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

    const defaultValues = {
        id: myData.adua_Id,
        adua_Codigo: myData.adua_Codigo,
        adua_Nombre: myData.adua_Nombre,
        adua_Direccion_Exacta: myData.adua_Direccion_Exacta,
        Pais: null,
        provincia: null,
        Ciudad: null,
    };

    useEffect(() => {
        provinciasGet()
        setValue('provincia', { value: parseInt(myData.pvin_Id), label: myData.pvin_Nombre })

        CiudadesGet(parseInt(myData.pvin_Id))
        setValue('Ciudad', { value: parseInt(myData.ciud_Id), label: myData.ciud_Nombre })

    }, []);

    const accountSchema = yup.object().shape({
        adua_Codigo: yup.string().trim().required(""),
        adua_Nombre: yup.string().trim().required(""),
        adua_Direccion_Exacta: yup.string().trim().required(""),
        provincia: yup.object().required(""),
        Ciudad: yup.object().required(""),
    });

    const { handleSubmit, control, watch, formState, setValue } =
        useForm({
            defaultValues,
            mode: "all",
            resolver: yupResolver(accountSchema),
        });
    const { isValid, errors } = formState;
    const datosWatch = watch();

    const aduanaEdit = async () => {
        try {
            const response = await AduanaService.editar(datosWatch);
            if (response.data.data.messageStatus == "1") {
                History.push("/aduana/index");
                ToastSuccess("El registro se ha editado exitosamente");
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste("Ya existe la Empresa");
            }
        } catch (error) {
            
            ToastError("Error inesperado");
        }
    };

    const validacion = async () => {

        if (isValid) {
            aduanaEdit()
        }
        else {
            ToastWarning();
        }
    };

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
                                <Chip label="Editar Aduana" />
                            </Divider>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.adua_Codigo} fullWidth={true}>
                                            <FormLabel>
                                                Código Aduana:
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
                                    name="adua_Codigo"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.adua_Nombre} fullWidth={true}>
                                            <FormLabel>
                                                Nombre del Contacto:
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
                                    name="Provincia"
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
                                                id="Provincia"
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
                            <div className="mb-16">
                                <Controller
                                    name="Ciudad"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors.Ciudad}
                                                disabled={datosWatch['provincia'] != null ? false : true}
                                            >
                                                Ciudades:
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                id="Ciudad"
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                options={ciudades}
                                                disabled={datosWatch['provincia'] != null ? false : true}
                                                value={datosWatch["Ciudad"]}
                                                onChange={(event, value) => {
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

export default aduanaEditar;