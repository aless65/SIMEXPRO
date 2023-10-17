// --------ESTE ES EL BUENO--------
import React, { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardMedia, Grid, Icon, Input, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as filestack from 'filestack-js';
import { ToastError, ToastSuccess, ToastWarningPersonalizado } from "src/styles/toastsFunctions";
import documentoDeSancionesService from "./DocumentoDeSancionesService";

//https://cdn.filestackcontent.com/k93gz6GuSN2Ze22w0mBQ

//const client = filestack.init("Abp6Y2MZNTla3VKwreDiez");

const client = filestack.init("AkGIMOlfhTTOX2REgcOtWz");

function DocumentosDeSanciones() {
    const docuService = documentoDeSancionesService();

    const [file, setFile] = useState();
    const [documentosSanciones, setDocumentosSanciones] = useState([]);
    const [uploadedFileURL, setUploadedFileURL] = useState(null)

    const handleFileChange = (event) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const getDocumentosSanciones = async () => {
        const respuest = await docuService.getDocumentosSanciones();
        setDocumentosSanciones(respuest);
    }

    useEffect(() =>{
        getDocumentosSanciones();
    }, [])

    useEffect(() =>{
        if(documentosSanciones.length > 0){
            setUploadedFileURL(documentosSanciones[0].dosa_UrlDocumento);
        }   
    }, [documentosSanciones])

    const nombreArchivo = {
        nombreArchivo: ""
    }

    const schemaNombreArchivo = yup.object().shape({
        nombreArchivo: yup.string().nullable().required()
    });

    const { handleSubmit: handleSubmit1, reset: reset1, control: control1, formState: formState1, watch: watch1, setValue: setValues1 } = useForm({
        defaultValues: nombreArchivo,
        mode: "all",
        resolver: yupResolver(schemaNombreArchivo),
    });

    const datos = watch1();

    const { isValid: isValid1, dirtyFields: dirtyFields1, errors: errors1 } = formState1;

    const handleSubmit = async () => {
        if (file !== undefined) {
            if (formState1.isValid) {
                if(file.type === "application/pdf"){
                    const data = await client.upload(file, {}, { filename: `${datos.nombreArchivo}.pdf` });
    
                    if(data.url != null){
                        
                        setUploadedFileURL(data.url);
                        const response = await docuService.guardarUrlArchivo(datos, data.url);
    
                        if(response.data.data != null){
                            if(response.data.data.messageStatus === "1"){
                                ToastSuccess();
                            }else{
                                ToastError();
                            }
                        }
                        reset1();

                    }else{
                        ToastError();
                    }
                }else{
                    ToastWarningPersonalizado("Advertencia. Debe seleccionar un archivo PDF.");
                }
            }
        } else {
            ToastWarningPersonalizado("Advertencia. Debe seleccionar un archivo para realizar la operación.")
        }
    }

    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                className="mb-24"
                image="https://i.ibb.co/zfqvS4j/documentos-de-sanciones.png"
                alt="Encabezado de la carta"
            />

            <form onSubmit={handleSubmit1((_data) => {
                handleSubmit();
            })}>
                <Grid container style={{ marginBottom: "20px" }} spacing={3}>
                    <Grid item xs={4}>
                        <FormControl style={{ marginLeft: "32px" }} fullWidth={true}>
                            <FormLabel
                                error={!!errors1.nombreArchivo}
                            >
                                Nombre del documento:
                            </FormLabel>
                            <Controller
                                name="nombreArchivo"
                                control={control1}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        
                                        value={datos.nombreArchivo}
                                        error={!!errors1.nombreArchivo}
                                    ></TextField>
                                )}
                            ></Controller>
                        </FormControl>
                    </Grid>
                    <Grid item xs={0.5}></Grid>
                    <Grid item xs={4}>
                        <input type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            style={{
                                marginTop: "30px"
                            }}
                        />
                    </Grid>
                    <Grid item xs={3.2}>
                        <Button
                            fullWidth={true}
                            startIcon={<Icon>upload</Icon>}
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: "10px", marginTop: "30px"}}
                            sx={{
                                backgroundColor: "#634A9E",
                                color: "white",
                                "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            type="submit"
                            onClick={() => {
                                if (!isValid1) {
                                    ToastWarningPersonalizado("Advertencia. Debe ingresar un nombre para el documento");
                                }
                            }}
                        >
                            Subir Documento
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <iframe src={uploadedFileURL} style={{ width: "100%", height: "100vh" }} ></iframe>
                </Grid>
            </Grid>
        </Card>
    );
}

export default DocumentosDeSanciones;