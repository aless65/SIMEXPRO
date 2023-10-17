import {
    Autocomplete,
    Button,
    Chip,
    Divider,
    FormControl,
    FormHelperText,
    Icon,
    InputAdornment,
    TextField
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Imports de Redireciones
import History from "src/@history/@history";
//Imports de validaciones
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
//Imports tabla
import "src/styles/custom-pagination.css";
//import tabla detalles
//Import service
import ProveedoresService from "./ProveedoresService";
//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
//import Toast
import InputMask from "react-input-mask";
import "react-toastify/dist/ReactToastify.css";
import {
    ToastError,
    ToastSuccessEditar,
    ToastWarning,
    ToastWarningYaExiste
} from "src/styles/toastsFunctions";


function ProveedoresEditar() {
    const load_DDLs = Load_DDLs()

    //variable del service
    const proveedoresService = new ProveedoresService()


    // Campos para el DDL de Paises
    const [paises, setPaises] = useState([]);

    // Campos para el DDL de Provincias
    const [provincias, setProvincias] = useState([]);

    // Campos para el DDL de Ciudades
    const [ciudades, setciudades] = useState([]);

    const location = useLocation();
    const myData = location.state

    const paisesGet = async () => {
        try {
            const data = await load_DDLs.paises()
            setPaises(data)
        } catch (error) {
        }
    };


    const provinciasGet = async (id) => {
        try {
            if (id) {
                const data = await load_DDLs.ProvinciasPorPais(parseInt(id))
                setProvincias(data)
            } else {
                setProvincias([])
            }
        } catch (error) {
        }
    };

    const CiudadesGet = async (id) => {
        try {
            if (id) {
                const data = await load_DDLs.CiudadesPorProvincia(parseInt(id))
                setValue()
                setciudades(data)
            } else {
                setciudades([])
            }
        } catch (error) {
        }
    };

    const validarTelefonoContacto = (value) => {
        if (/^\+504 \d{4}-\d{4}$/.test(value)) {
            return true;
        }
        return false;
    };

    const validarCorreoElectronico = (value) => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            return true;
        }
        return false;
    };

    const defaultValues = {
        id: myData.prov_Id, //id necesario para el editar
        prov_NombreCompania: myData.prov_NombreCompania,
        prov_NombreContacto: myData.prov_NombreContacto,
        prov_Telefono: myData.prov_Telefono,
        prov_CodigoPostal: myData.prov_CodigoPostal,
        Pais: null,
        provincia: null,
        Ciudad: null,
        prov_DireccionExacta: myData.prov_DireccionExacta,
        prov_CorreoElectronico: myData.prov_CorreoElectronico,
        prov_Fax: myData.prov_Fax == null ? "" : myData.prov_Fax,
    };

    //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
    useEffect(() => {

        paisesGet()
        setValue('Pais', { value: parseInt(myData.pais_Id), label: `${myData.pais_Codigo} - ${myData.pais_Nombre}` })

        provinciasGet(parseInt(myData.pais_Id))
        setValue('provincia', { value: parseInt(myData.pvin_Id), label: myData.pvin_Nombre })

        CiudadesGet(parseInt(myData.pvin_Id))
        setValue('Ciudad', { value: parseInt(myData.prov_Ciudad), label: myData.ciud_Nombre })

    }, []);


    /* Esquema del fomulario (validaciones) */
    //En el esquema se eligen las validaciones que el formulario tendra
    const accountSchema = yup.object().shape({
        id: yup.string(),
        prov_NombreCompania: yup.string().trim().required(""),
        prov_NombreContacto: yup.string().trim().required(""),
        prov_Telefono: yup
            .string()
            .trim()
            .required("")
            .test(
                "formato",
                "Número de teléfono incompleto",
                validarTelefonoContacto
            ),
        prov_CodigoPostal: yup.string().trim().required(""),

        Pais: yup.object().required(""),
        provincia: yup.object().required(""),
        Ciudad: yup.object().required(""),
        prov_DireccionExacta: yup.string().trim().required(""),
        prov_CorreoElectronico: yup.string().trim().required("")
            .test(
                "formato",
                "Correo Electrónico Incorrecto",
                validarCorreoElectronico
            ),
        prov_Fax: yup.string().trim(),
    });


    //Constante que nos ayuda para las validaciones con yup para los formularios
    const { handleSubmit, register, reset, control, watch, formState, setValue } =
        useForm({
            defaultValues,
            mode: "all",
            resolver: yupResolver(accountSchema),
        });

    const { isValid, dirtyFields, errors, touchedFields } = formState;

    //Datos del formulario
    const datosWatch = watch();


    //Peticion para crear un registro
    const proveedoresEdit = async () => {
        try {
            const response = await proveedoresService.editar(datosWatch);
            if (response.data.data.messageStatus == "1") {
                History.push("/Proveedores/index");
                ToastSuccessEditar();
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarningYaExiste();
            }
        } catch (error) {
            ToastError();
        }
    };


    const validacion = async () => {
        if (isValid) {
            proveedoresEdit()
        }
        else {

            ToastWarning();
        }
    }
    return (
        <form onSubmit={handleSubmit((_data) => { })}>
            <Card sx={{ minWidth: 275, margin: "40px" }}>
                {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
                <CardMedia
                    component="img"
                    height="200"
                    image="https://i.ibb.co/sVPNb5T/PROVEEDORES.png"
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
                                <Chip label="Editar Proveedor" />
                            </Divider>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_NombreCompania} fullWidth={true}>
                                            <FormLabel>
                                                Nombre de la Compañía:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.prov_NombreCompania}
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
                                    name="prov_NombreCompania"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_NombreContacto} fullWidth={true}>
                                            <FormLabel>
                                                Nombre del Contacto:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.prov_NombreContacto}
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
                                    name="prov_NombreContacto"
                                    control={control}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <InputMask
                                            mask="+504 9999-9999"
                                            value={datosWatch["prov_Telefono"]}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            maskChar=""
                                        >
                                            {() => (

                                                <FormControl error={!!errors.prov_Telefono} fullWidth={true}>
                                                    <FormLabel>
                                                        Teléfono o Celular:
                                                    </FormLabel>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        error={!!errors.prov_Telefono}
                                                        fullWidth={true}
                                                        inputprops={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                    <FormHelperText>{errors.prov_Telefono ? 'Ingrese todo el número de teléfono' : ''} </FormHelperText>
                                                </FormControl>
                                            )}
                                        </InputMask>
                                    )}
                                    name="prov_Telefono"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_CodigoPostal} fullWidth={true}>
                                            <FormLabel>
                                                Código Postal:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                type="number"
                                                error={!!errors.prov_CodigoPostal}
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
                                    name="prov_CodigoPostal"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_CorreoElectronico} fullWidth={true}>
                                            <FormLabel>
                                                Correo Electrónico:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.prov_CorreoElectronico}
                                                variant="outlined"
                                                fullWidth={true}
                                                inputprops={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <FormHelperText>{errors.prov_CorreoElectronico ? 'Ingresé Un Correo Electrónico Valido' : ''} </FormHelperText>
                                        </FormControl>
                                    )}
                                    name="prov_CorreoElectronico"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_Fax} fullWidth={true}>
                                            <FormLabel>
                                                Fax:
                                            </FormLabel>
                                            <TextField
                                                type="number"
                                                {...field}
                                                error={!!errors.prov_Fax}
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
                                    name="prov_Fax"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    name="Pais"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            error={!!errors.Pais}
                                            fullWidth={true}
                                        >
                                            <FormLabel
                                                error={!!errors.Pais}
                                            >
                                                País:
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                disableClearable={true}
                                                id="Pais"
                                                options={paises}
                                                value={datosWatch["Pais"] ?? null}
                                                onChange={async (event, value) => {
                                                    setValue('Pais', value)
                                                    setValue('provincia', null)
                                                    setValue('Ciudad', null)
                                                    provinciasGet(value?.value)
                                                    if (!value) { setValue('pvin_Id', []) }
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={!!errors.Pais}
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
                                    name="provincia"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors.provincia}
                                                
                                            >
                                                Provincia:
                                            </FormLabel>
                                            <Autocomplete
                                                disableClearable={true}
                                                {...field}
                                                disablePortal
                                                id="provincia"
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                options={provincias}
                                               
                                                value={datosWatch["provincia"]}
                                                onChange={(event, value) => {
                                                    setValue('provincia', value)
                                                    setValue('Ciudad', '')
                                                    CiudadesGet(value?.value)
                                                }}
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
                                                
                                            >
                                                Ciudad:
                                            </FormLabel>
                                            <Autocomplete
                                                disableClearable={true}
                                                {...field}
                                                disablePortal
                                                id="Ciudad"
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                options={ciudades}
                                                
                                                value={datosWatch["Ciudad"]}
                                                onChange={(event, value) => {
                                                    setValue('Ciudad', value)

                                                }}
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

                        <Grid item xs={12}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_DireccionExacta} fullWidth={true}>
                                            <FormLabel>
                                                Dirección Exacta:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.prov_DireccionExacta}
                                                variant="outlined"

                                                inputprops={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                    name="prov_DireccionExacta"
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
                                    History.push("/Proveedores/Index");
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

export default ProveedoresEditar;