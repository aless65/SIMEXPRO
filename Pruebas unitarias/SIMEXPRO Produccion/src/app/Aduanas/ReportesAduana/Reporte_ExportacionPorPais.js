/* eslint-disable camelcase */
import {
    PDFViewer,
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import {
    Card,
    CardMedia,
    TextField,
    Button,
    Icon,
    Grid,
    FormControl,
    FormLabel,
    InputAdornment,
    Select,
    MenuItem,
    Collapse,
    Autocomplete,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useForm, Controller } from "react-hook-form";
import History from "src/@history/@history";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import * as antd from "antd";
import ReportesAduanaService from "./ReportesAduanaService"
import React, { useState, useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Import ddls
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import {
    ToastInfo, ToastWarningPersonalizado
  } from "src/styles/toastsFunctions";

const { RangePicker } = antd.DatePicker;

const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; // Se suma 1 ya que los meses comienzan en 0
const año = fechaActual.getFullYear();
const hora = fechaActual.getHours();
const minutos = fechaActual.getMinutes();
const segundos = fechaActual.getSeconds();

const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

Font.register({
    family: "Arial",
    fonts: [
        {
            src: `https://db.onlinewebfonts.com/t/8d223b3ad8d4819e9dcf22757e4cc2c4.ttf`,
        },
        {
            src: `https://db.onlinewebfonts.com/t/3d6b457e3aa0c0b78e6fbf0355bc43a6.ttf`,
            fontWeight: "bold",
        },
    ],
});

const styles = StyleSheet.create({
    cellWithLine: {
        position: "relative",
        marginBottom: 10,
    },
    line: {
        top: 20,
        bottom: 0,
        left: 0,
        width: "100%",
        height: 1,
        backgroundColor: "#000000", // Color de la línea
    },
    lineItems: {
        top: 5,
        bottom: 0,
        left: 0,
        width: "100%",
        height: 1,
        backgroundColor: "#000000", // Color de la línea
    },
    page: {
        flexDirection: "column",
        backgroundColor: "white",
        padding: 25,
    },
    header: {
        fontWeight: "bold",
        fontFamily: "Times-Roman",
        fontSize: 14,
        marginBottom: 5,
    },
    innerheader: {
        fontWeight: "bold",
        fontFamily: "Times-Roman",
        fontSize: 14,
        marginBottom: 5,
    },
    image: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        position: "absolute",
        top: 5,
        right: 30,
    },
    imageLogoLetras: {
        alignItems: "center",
        justifyContent: "center",
        top: 0,
    },
    title: {
        top: 70,
        right: 90,
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Times-Roman",
    },
    divisor: {
        fontSize: 18,
        left: 20,
        textAlign: "left",
        fontFamily: "Times-Roman",
    },
    subtitle: {
        top: 69,
        left: 50,
        right: 20,
        bottom: 30,
        fontSize: 15,
        textAlign: "center",
        fontFamily: "Times-Roman",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 9,
        bottom: 20, // Adjust this value as needed
        left: 30,
        right: 30,
        textAlign: "right",
        color: "grey",
    },
    pageUser: {
        position: "absolute",
        fontSize: 9,
        bottom: 20, // Adjust this value as needed
        left: 30,
        right: 30,
        textAlign: "center",
        color: "grey",
    },
    pageDate: {
        position: "absolute",
        fontSize: 9,
        bottom: 20, // Adjust this value as needed
        left: 30,
        right: 30,
        textAlign: "left",
        color: "grey",
    },
    columnsContainer: {
        flexDirection: "column",
    },
    column: {
        marginBottom: 10,
    },
    columnsContainer1: {
        padding: 30,
        top: 0,
        right: 0,
        flexDirection: "row",
        // justifyContent: 'space-between',
    },
    columnsContainer2: {
        top: 0,
        right: 0,
        flexDirection: "row",
        // justifyContent: 'space-between',
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    headerParteIzq: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        position: "absolute",
        top: 0,
    },
    column1: {
        flex: 1,
        marginRight: 15,
    },
    column2: {
        flex: 1,
        marginLeft: 15,
    },
    tableContainer: {
        borderWidth: 1,
        margin: "5px",
        borderColor: "#dedede",
    },
    tableContainerMateriales: {
        borderWidth: 1,
        margin: "5px",
        borderColor: "#ebebeb",
    },
    tableContainerTransparente: {
        borderWidth: 1,
        textAlign: "center",
        margin: "10px",
        borderColor: "white",
    },
    tableTitle: {
        fontSize: 15,
        textAlign: "left",
        padding: 5,
        color: "white",
        backgroundColor: "#634a9eb0",
        fontFamily: "Times-Roman",
    },
    tableHeader: {
        flexDirection: "row",

        backgroundColor: "white",
    },
    tableRow: {
        flexDirection: "row",
        borderColor: "#f9f5ff",
    },
    tableCell: {
        flex: 1,
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
    },
    tableCellMateriales: {
        flex: 1,
        borderWidth: 1,
        borderColor: "black",
        padding: 0,
    },
    tableCellRegistors: {
        flex: 1,
        borderWidth: 0,
        padding: 3,
        textAlign: "left",
        fontSize: 4,
    },
    tableCellRegistorsItem: {
        flex: 1,
        borderWidth: 1,
        borderColor: "white",
        padding: 3,
        textAlign: "left",
        left: 18,
    },
    tableCellRegistorsItemDerecha: {
        flex: 1,
        borderWidth: 1,
        borderColor: "white",
        padding: 3,
        textAlign: "left",
        left: 5,
    },
    encabezadoHeader: {
        borderWidth: 1,
        fontFamily: "Times-Roman",
        borderColor: "white",
        textAlign: "left",
    },
    cellTextHeader: {
        fontSize: 12,
        fontWeight: "bold",
    },
    cellTextHeaderItems: {
        fontSize: 12,
        fontWeight: "bold",
        left: 15,
        bottom: 5,
    },
    cellText: {
        fontSize: 11,
        padding: 2,
    },
    cellTextUnderline: {
        fontSize: 12,
        textDecorationLine: "underline",
    },
    cellTextTabla: {
        fontSize: 10,
        fontFamily: "Times-Roman",
    },
    cellTextRegistros: {
        fontSize: 11,
        fontFamily: "Times-Roman",
    },
    headerCellText: {
        fontSize: 12,
        fontFamily: "Times-Roman",
        textAlign: "center",
        backgroundColor: "#ebebeb",
    },
    detallesTitle: {
        top: 35,
        left: 20,
        fontSize: 20,
        fontFamily: "Times-Roman",
    },
    headerTextoDerecho: {
        top: 10,
        textAlign: "right",
        fontSize: 9,
        fontFamily: "Times-Roman",
    },
    columnsContainer3: {
        top: 0,
        right: 0,
    },
});

function Reporte_ProduccionPorPais() {
    const load_DDLs = Load_DDLs();
    const [data, setData] = useState([]);
    const user = useSelector(selectUser);
    const [Paisesddl, setPaisesddl] = useState([]);
    const [Detalles, setDetalles] = useState([]);
    const [PDF, setPDF] = useState(false);
    const [dateRange, setDateRange] = useState({});
    const [grafica, setGrafica] = useState("");

    const Regresar = () => {
        History.push("/Inicio/Produccion");
    };

    const ExportacionPais = {
        Pais: null,
        FechaInicio: null,
        FechaFin: null,
    };

    const schemaPais = yup.object().shape({
        Pais: yup.object(),
        FechaInicio: yup.date(),
        FechaFin: yup.date(),
    });

    //Declaracion del formulario Orden Compra Detalle
    const {
        reset: resetPaies,
        control: control,
        watch: watchPaiss,
        setValue: setValuePais,
    } = useForm({
        defaultValues: ExportacionPais, //Campos del formulario
        mode: "all",
        resolver: yupResolver(schemaPais), //Esquema del formulario
    });

    //Datos del formulario Orden Compra Detalle
    const datosPaiss = watchPaiss();

    const PaisesGet = async () => {
        try {
            const data = await load_DDLs.paises();
            setPaisesddl(data);
        } catch (error) { }
    };

    useEffect(() => {
        PaisesGet();
    }, []);

    useEffect(() => {
        if (
            datosPaiss.FechaInicio != null &&
            datosPaiss.FechaFin != null &&
            datosPaiss.Pais != null
        ) {
            getdata();
        } else setPDF(false);
    }, [datosPaiss.FechaInicio, datosPaiss.FechaFin, datosPaiss.Pais]);

    const getdata = async () => {
        try {
            const reportesAduanaService = ReportesAduanaService();
            const data2 = await reportesAduanaService.ProduccionPorPaiss(
                datosPaiss.Pais,
                datosPaiss.FechaInicio,
                datosPaiss.FechaFin
            );

            if ( data2 != undefined && data2 != null && data2.length != 0) {
                setData(data2[0]);
                setPDF(true);
            } else {
                setPDF(false);
                ToastWarningPersonalizado("El país o rango de fechas seleccionado no poseen exportaciones.")
            }

        } catch (error) {
        }
    };

    const MyDoc = () => (
        <Document
            title="ReporteProducciónPorPais.pdf"
            creator="SIMEXPRO"
            author="SIMEXPRO"
        >
            <Page size="A4" style={{ ...styles.page }}>
                <View style={styles.headerParteIzq}>
                    {/* Header Image */}
                    <Image
                        src="https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png"
                        style={{ height: 40, width: 210 }}
                    />
                </View>
                <View style={styles.image}>
                    <Image
                        src="https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png"
                        style={{ height: 38, width: 100 }}
                    />
                </View>

                <View style={styles.columnsContainer3}>
                    <Text style={styles.detallesTitle}>Reporte Producción Por País</Text>
                    <Text style={styles.headerTextoDerecho}>
                        Fechas Inicio - Fecha Fin  {" "}
                    </Text>
                    <Text style={styles.headerTextoDerecho}>
                        {data.fechaInicio} - {data.fechaFin}
                    </Text>
                </View>
                <View style={styles.line} />

                <View style={{ marginBottom: 25 }} />
                <View style={{ marginBottom: 5 }} />

                <View style={{ display: "flex" }}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCellRegistorsItem}>
                            <Text style={styles.cellText}>• País seleccionado: {data.pais_Nombre != undefined ? data.pais_Nombre : ' ' || "No encontrado"}</Text>

                        </View>

                        <View style={styles.tableCellRegistorsItem}>
                            {/* <Text style={styles.cellText}>• Total de prendas en el Periodo: {data.length > 0 ? data[0].totalPeriodo : ' ' || "No encontrado"}</Text> */}
                        </View>
                    </View>

                    {/* Tabla */}
                    <View style={{ ...styles.columnsContainer }}>
                        {/* {data &&
                data.map((datos, Index) => (
                  <View key={Index} style={styles.tableContainer}> */}

                        <View
                            style={{
                                ...styles.tableContainerTransparente,
                                border: '1px solid #634a9e',
                                padding: '2%',
                                textTransform: 'uppercase',
                                marginBottom: '-6px',
                            }}
                        >
                            <Text style={{ ...styles.tableTitle, fontWeight: 'bold' }}>
                                {/* Detalle #{Index + 1} */}
                            </Text>
                        </View>


                        <View style={{ ...styles.tableContainerTransparente, textTransform: 'uppercase' }}>

                            {/* Encabezado */}
                            <View style={{ ...styles.tableRow, backgroundColor: '#dcc26599', border: 'none' }} fixed>
                                <View style={styles.tableCellRegistors}>
                                    <Text style={styles.cellText}>Numero Correlarivo</Text>
                                </View>

                                <View style={styles.tableCellRegistors}>
                                    <Text style={styles.cellText}>NO. Duca</Text>
                                </View>

                                <View style={styles.tableCellRegistors}>
                                    <Text style={styles.cellText}>País Procedencia</Text>
                                </View>

                                <View style={styles.tableCellRegistors}>
                                    <Text style={styles.cellText}>País Destino</Text>
                                </View>

                                <View style={styles.tableCellRegistors}>
                                    <Text style={styles.cellText}>Nombre del Declarante</Text>
                                </View>



                            </View>


                            {data && data.detalles ? (
                                data.detalles.map((detalle, detalleIndex) => (
                                    <View key={detalleIndex} style={styles.tableRow}>
                                        <View style={styles.tableCellRegistors}>
                                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.duca_No_Correlativo_Referencia}</Text>
                                        </View>

                                        <View style={styles.tableCellRegistors}>
                                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.duca_No_Duca}</Text>
                                        </View>
                                        <View style={styles.tableCellRegistors}>
                                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.duca_PaisProcedencia}</Text>
                                        </View>

                                        <View style={styles.tableCellRegistors}>
                                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.duca_PaisDestino}</Text>
                                        </View>

                                        <View style={styles.tableCellRegistors}>
                                            <Text style={{ ...styles.cellText, fontSize: 10 }}>{detalle.duca_NombreSocial_Declarante}</Text>
                                        </View>



                                    </View>
                                ))
                            ) : (
                                <View style={{ ...styles.tableRow, textAlign: 'center' }}>
                                    <View style={styles.tableCellRegistors}>
                                        <Text style={styles.cellText}>Orden de compra sin detalles</Text>
                                    </View>
                                </View>
                            )}
                        </View>



                        {/* </View>
                ))} */}




                    </View>
                </View>

                <Text
                    style={styles.pageDate}
                    render={({ }) => `Fecha de Impresión: ${fechaFormateada}`}
                    fixed
                />
                <Text
                    style={{ ...styles.pageUser, textTransform: "capitalize" }}
                    render={({ }) => `Usuario: ${user.data.displayName}`}
                    fixed
                />
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `Página: ${pageNumber} / ${totalPages}`
                    }
                    fixed
                />
            </Page>
        </Document>
    );

    return (
        <>
            <Card sx={{ minWidth: 275, margin: "40px" }}>
                <CardMedia
                    component="img"
                    height="200"
                    className="mb-24"
                    image="https://i.ibb.co/94H2TDv/PRODUCCI-N-POR-REAS.png"
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
                        <Grid
                            item
                            xs={6}
                            style={{
                                maxHeight: "100px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <FormControl fullWidth style={{ height: "100%" }}>
                                <FormLabel className="font-medium text-12" component="legend">
                                    Seleccione un rango de fechas:
                                </FormLabel>
                                <RangePicker
                                    size="large"
                                    style={{ width: "100%", height: "53px", borderRadius: "3px" }} // Ajusta la altura según tus necesidades
                                    placeholder={["Fecha inicio", "Fecha fin"]}
                                    value={dateRange}
                                    onChange={(value) => {
                                        try {
                                            setDateRange(value);
                                            if (value && value.length === 2) {
                                                setValuePais(
                                                    "FechaInicio",
                                                    value[0].format("YYYY-MM-DD")
                                                );
                                                setValuePais("FechaFin", value[1].format("YYYY-MM-DD"));
                                            } else {
                                                setValuePais("FechaInicio", null);
                                                setValuePais("FechaFin", null);
                                            }
                                        } catch (error) {

                                        }

                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            style={{
                                maxHeight: "100px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <FormControl fullWidth style={{ height: "100%" }}>
                                <FormLabel className="font-medium text-12" component="legend">
                                    Seleccione un país:
                                </FormLabel>
                                <Controller
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="Paiss"
                                            isOptionEqualToValue={(option, value) =>
                                                option.value === value?.value
                                            }
                                            size="large"
                                            style={{
                                                width: "100%",
                                                height: "40px",
                                                borderRadius: "3px",
                                            }} // Ajusta la altura según tus necesidades
                                            options={Paisesddl}
                                            value={datosPaiss.Pais ?? null}
                                            disableClearable={true}
                                            onChange={(event, value) => {
                                                setValuePais("Pais", value);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Selecione un País"
                                                />
                                            )}
                                        />
                                    )}
                                    name="Pais"
                                    control={control}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" />,
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Collapse in={PDF}>
                                <PDFDownloadLink document={<MyDoc />} fileName="Reporte.pdf">
                                    {" "}
                                </PDFDownloadLink>
                                <PDFViewer style={{ width: "100%", height: "100vh" }}>
                                    <MyDoc />
                                </PDFViewer>
                            </Collapse>
                        </Grid>
                    </Grid>
                </CardContent>

                <Button
                    variant="contained"
                    style={{ position: "fixed", top: "76%", right: "5%" }}
                    onClick={Regresar}
                    startIcon={<Icon>arrow_back</Icon>}
                >
                    Regresar
                </Button>
            </Card>
        </>
    );
}
export default Reporte_ProduccionPorPais;
