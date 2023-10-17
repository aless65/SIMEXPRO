/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import {
    Button,
    Icon
} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Document, Image, PDFDownloadLink, PDFViewer, Page, Text, View } from "@react-pdf/renderer";
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import PruebaPdfsService from "./PruebaPdfsService";

function PruebaPdfs() {

    const pruebaPdfsService = PruebaPdfsService();

    const getUploadParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }

    const handleChangeStatus = ({ meta, file }, status) => {
    }

    const handleSubmit = (files) => {
        files.map(f => pruebaPdfsService.cargarArchivos(f.file));
    }

    const MyDoc = () => (
        <Document title="Reporte.pdf" creator="SIMEXPRO" author="SIMEXPRO" >
            <Page
                size="A4"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        padding: 10,
                    }}
                >
                    <Text>Y Ahí estaba yo, con tanto por dar...</Text>
                    <Image
                        src="https://picsum.photos/600/400"
                        alt="random image"
                        style={{ maxWidth: "600px", maxHeight: "400" }}
                    />
                    <Text
                        style={{
                            color: "gray",
                            fontStyle: "italic",
                            fontSize: "10px",
                        }}
                    >
                    </Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <Card sx={{ minWidth: 275, margin: "40px" }}>
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    styles={{ dropzone: { minWidth: 200, minHeight: 250, maxHeight: 500, margin: 10 } }}
                    accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    inputContent="Haz click aquí para agregar archivos o arrastralos a esta zona"
                    inputWithFilesContent="Agregar archivos"
                    submitButtonContent="Guardar"
                    maxFiles={3}
                />
            </Card>

            <Card sx={{ minWidth: 275, margin: "40px", height: "700px" }}>
                <PDFDownloadLink document={<MyDoc />} fileName="Reporte.pdf">
                    <Button
                        startIcon={<Icon>download</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "10px" }}
                        sx={{
                            backgroundColor: "#DAD8D8",
                            color: "black",
                            "&:hover": { backgroundColor: "#BFBABA" },
                        }}
                        onClick={() => {}}
                    >
                        Descargar Reporte
                    </Button>
                </PDFDownloadLink>
                <PDFViewer style={{ width: "100%", height: "100vh" }} >
                    <MyDoc />
                </PDFViewer>
            </Card>

            <Card sx={{ minWidth: 275, margin: "40px", height: "650px" }}>
                <iframe style={{ width: '100%', height: '100vh' }} src={'https://cdn.filestackcontent.com/GrgMAFGYRryCaWOJhGX7'} />
            </Card>

            <Grid
                item
                xs={12}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >

                <Button
                    startIcon={<Icon>download</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px" }}
                    sx={{
                        backgroundColor: "#DAD8D8",
                        color: "black",
                        "&:hover": { backgroundColor: "#BFBABA" },
                    }}
                    onClick={() => {
                        location.href = "https://cdn.filestackcontent.com/GrgMAFGYRryCaWOJhGX7";
                    }}
                >
                    Descarga PDF
                </Button>

                <Button
                    startIcon={<Icon>download</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "10px" }}
                    sx={{
                        backgroundColor: "#DAD8D8",
                        color: "black",
                        "&:hover": { backgroundColor: "#BFBABA" },
                    }}
                    onClick={() => {
                        location.href = "https://cdn.filestackcontent.com/QwOfw5cT8CkSY0xwtUv6";
                    }}
                >
                    Descarga WORD
                </Button>
            </Grid>
        </div>
        // <Card sx={{ minWidth: 275, margin: "40px" }}>
        //     <PickerInline 
        //         apikey={'Abp6Y2MZNTla3VKwreDiez'}

        //     />
        // </Card>
    )
}

export default PruebaPdfs;