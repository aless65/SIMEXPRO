import {
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Grid,
    Collapse
} from "@mui/material";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import History from "src/@history/@history";
import LoadingIcon from "src/styles/iconoCargaTabla";
import DucaService from "./ducaService";
import { CircularProgress } from "@mui/material";

function DucaDetalleAbierto() {
  const location = useParams();
  if (location.state === null) {
    History.back();
  }

  const ducaService = DucaService();
  const [view, setView] = useState(false);
  const [data, setData] = useState([]);
  const [valoresTotales, setValoresTotales] = useState([]);
  const [liquidacionGeneral, setLiquidacionGeneral] = useState([]);
  const [mercancias, setMercancias] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const x = await ducaService.GenerarDuca(location.state);
    if(!x?.data?.data){
     History.back();
     return
    }
    setData(x.data.data);

    setValoresTotales(
      JSON.parse(
        x.data.data[0]?.valoresTotales ? x.data.data[0].valoresTotales : "[{}]"
      )
    );
    setLiquidacionGeneral(
      JSON.parse(
        x.data.data[0]?.liquidacionGeneral
          ? x.data.data[0].liquidacionGeneral
          : "[{}]"
      )
    );
    setMercancias(
      JSON.parse(
        x.data.data[0]?.mercancias ? x.data.data[0].mercancias : "[{}]"
      )
    );
    // setMercancias(JSON.parse(x.data.data[0].mercancias));
    // setDocumentos(JSON.parse(x.data.data[0].documentos));
   
    setTimeout(setView(true), 500);
  }

  function retornarJson(data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  const columnsBultos = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      // sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Cantidad",
      dataIndex: "item_Cantidad_Bultos",
      key: "item_Cantidad_Bultos",
      // sorter: (a, b) => a.deva_Id - b.deva_Id,
    },
    {
      title: "Embalaje",
      dataIndex: "item_ClaseBulto",
      key: "item_ClaseBulto",
      // sorter: (a, b) => a.adua_IngresoNombre.localeCompare(b.adua_IngresoNombre),
    },
    {
      title: "Peso",
      dataIndex: "item_PesoNeto",
      key: "item_PesoNeto",
      // sorter: (a, b) => a.adua_DespachoNombre.localeCompare(b.adua_DespachoNombre),
    },
  ];

  const columnsLiquidacion = [
    {
      title: "Concepto.",
      dataIndex: "lige_TipoTributo",
      key: "lige_TipoTributo",
      // sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Obligación",
      dataIndex: "lige_ModalidadPago",
      key: "lige_ModalidadPago",
      // sorter: (a, b) => a.deva_Id - b.deva_Id,
    },
    {
      title: "Importe Lps",
      dataIndex: "lige_TotalPorTributo",
      key: "lige_TotalPorTributo",
      // sorter: (a, b) => a.adua_IngresoNombre.localeCompare(b.adua_IngresoNombre),
    },
  ];

  const columnsItems = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      // sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "C. Comercial",
      dataIndex: "item_Cantidad",
      key: "item_Cantidad",
      // sorter: (a, b) => a.deva_Id - b.deva_Id,
    },
    {
      title: "Posicion",
      dataIndex: "aran_Codigo",
      key: "aran_Codigo",
      // sorter: (a, b) => a.adua_IngresoNombre.localeCompare(b.adua_IngresoNombre),
    },
    {
      title: "Descripcion",
      dataIndex: "item_CaracteristicasMercancias",
      key: "item_CaracteristicasMercancias",
      // sorter: (a, b) => a.adua_DespachoNombre.localeCompare(b.adua_DespachoNombre),
    },
    {
      title: "Peso",
      dataIndex: "item_PesoNeto",
      key: "item_PesoNeto",
      // sorter: (a, b) => a.adua_DespachoNombre.localeCompare(b.adua_DespachoNombre),
    },
    {
      title: "V USD",
      dataIndex: "item_ValorAduana",
      key: "item_ValorAduana",
      // sorter: (a, b) => a.adua_DespachoNombre.localeCompare(b.adua_DespachoNombre),
    },
  ];

  const Regresar = () => {
    History.push("/Duca/index");
  };

  return (
    <>
      <Card sx={{ minWidth: 275, margin: "40px" }}>
        <CardMedia
          component="img"
          height="200"
          image="https://i.ibb.co/Wpq35kR/DUCA-DECLARACI-N-NICA-CENTROAMERICANA.png"
          alt="Encabezado de la carta"
        />
        <CardContent>

        <Collapse in={!view}>
          <Grid
            container
            width={"100%"}
            spacing={2}
            marginY={"10px"}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <CircularProgress style={{ color: "#634a9e" }} />
            </Grid>
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              Cargando datos...
            </Grid>
          </Grid>
        </Collapse>

        <Collapse in={view}>
          <Grid
            container
            spacing={2}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={12}>
              <Divider>
                <Chip label={"Declaracion Aduanera"}></Chip>
              </Divider>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <p>
                Declaracción:{" "}
                <strong>
                  {data?.length > 0 ? data[0].duca_No_Duca : "----"}
                </strong>{" "}
              </p>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <p>
                Nro Preimpreso:{" "}
                <strong>
                  {" "}
                  {data?.length > 0
                    ? data[0].duca_No_Correlativo_Referencia
                    : "----"}
                </strong>
              </p>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <Grid
                container
                md={12}
                display={"flex"}
                justifyContent={"center"}
              >
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    Regimen Aduanero:{" "}
                    <strong>
                      {" "}
                      {data?.length > 0
                        ? data[0].duca_RegimenAduanero.split(",")[0]
                          ? data[0].duca_RegimenAduanero.split(",")[0]
                          : "----"
                        : "----"}{" "}
                    </strong>
                  </p>
                </Grid>
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    {data?.length > 0
                      ? data[0].duca_RegimenAduanero.split(",")[1]
                        ? data[0].duca_RegimenAduanero.split(",")[1]
                        : "----"
                      : "----"}{" "}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <Grid
                container
                md={12}
                display={"flex"}
                justifyContent={"center"}
              >
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    Importador/Exportador:{" "}
                    <strong>
                      {" "}
                      {data?.length > 0
                        ? data[0].impo_NumRegistro
                          ? data[0].impo_NumRegistro
                          : "----"
                        : "----"}
                    </strong>
                  </p>
                </Grid>
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    {" "}
                    {data?.length > 0
                      ? data[0].impo_Nombre_Raso
                        ? data[0].impo_Nombre_Raso
                        : "----"
                      : "----"}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <p>
                Fecha Oficializacion:{" "}
                <strong>
                  {data?.length > 0
                    ? new Date(data[0].deva_FechaAceptacion).toLocaleString()
                    : "----"}
                </strong>
              </p>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <p>
                Estado Declaracción: <strong>CANCELADA</strong>
              </p>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <Grid
                container
                md={12}
                display={"flex"}
                justifyContent={"center"}
              >
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    Empresa Declarante:{" "}
                    {data?.length > 0
                      ? data[0].duca_Codigo_Declarante
                        ? data[0].duca_Codigo_Declarante
                        : "----"
                      : "----"}
                  </p>
                </Grid>
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    {" "}
                    {data?.length > 0
                      ? data[0].duca_NombreSocial_Declarante
                        ? data[0].duca_NombreSocial_Declarante
                        : "----"
                      : "----"}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <Grid
                container
                md={12}
                display={"flex"}
                justifyContent={"center"}
              >
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    Aduana de Ingreso/Salida:{" "}
                    {data?.length > 0
                      ? data[0].adua_IngresoNombre.split(",")[0]
                      : "----"}
                  </p>
                </Grid>
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    {" "}
                    {data?.length > 0
                      ? data[0].adua_IngresoNombre.split(",")[1]
                      : "----"}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <p>
                País de Origen:{" "}
                {data?.length > 0
                  ? data[0].duca_PaisProcedencia
                    ? data[0].duca_PaisProcedencia
                    : "----"
                  : "----"}
              </p>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <p>
                País Proc/Dest:{" "}
                {data?.length > 0
                  ? data[0].duca_PaisDestino
                    ? data[0].duca_PaisDestino
                    : "----"
                  : "----"}
              </p>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <p>
                Condición de Entrega:{" "}
                {data?.length > 0
                  ? data[0].inco_Codigo
                    ? data[0].inco_Codigo
                    : "----"
                  : "----"}
              </p>
            </Grid>
            <Grid item md={6} display={"flex"} justifyContent={"center"}>
              <Grid
                container
                md={12}
                display={"flex"}
                justifyContent={"center"}
              >
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>Valor Factura, Flete, Seguro y Otros:</p>
                </Grid>
                <Grid item md={12} display={"flex"} justifyContent={"center"}>
                  <p>
                    {valoresTotales?.length > 0
                      ? valoresTotales[0].item_ValorAduana
                        ? valoresTotales[0].item_ValorAduana
                        : "----"
                      : "----"}{" "}
                    +{" "}
                    {mercancias?.length > 0
                      ? mercancias[0].item_GastosDeTransporte
                        ? mercancias[0].item_GastosDeTransporte
                        : "----"
                      : "----"}{" "}
                    +{" "}
                    {mercancias?.length > 0
                      ? mercancias[0].item_Seguro
                        ? mercancias[0].item_Seguro
                        : "----"
                      : "----"}{" "}
                    +{" "}
                    {mercancias?.length > 0
                      ? mercancias[0].item_OtrosGastos
                        ? mercancias[0].item_OtrosGastos
                        : "----"
                      : "----"}
                  </p>
                </Grid>
              </Grid>
            </Grid>

            {/* BULTOS */}

            <Grid item xs={12}>
              <Divider>
                <Chip label={"Bultos"}></Chip>
              </Divider>
            </Grid>
            <Grid item md={12} display={"flex"} justifyContent={"center"}>
              <p>
                Título de Transporte:{" "}
                <strong>0011HN20220110 230011MATI004625C</strong>
              </p>
            </Grid>
            <Grid item md={12} display={"flex"} justifyContent={"center"}>
              <Table
                style={{ width: "95%" }}
                locale={{
                  triggerDesc: "Ordenar descendente",
                  triggerAsc: "Ordenar ascendente",
                  cancelSort: "Cancelar",
                  emptyText: LoadingIcon(),
                }}
                columns={columnsBultos}
                dataSource={mercancias}
                size="small"
                pagination={false}
              />
            </Grid>

            {/* ITEMS */}

            <Grid item xs={12}>
              <Divider>
                <Chip label={"Items"}></Chip>
              </Divider>
            </Grid>
            <Grid item md={12} display={"flex"} justifyContent={"center"}>
              <Table
                style={{ width: "95%" }}
                locale={{
                  triggerDesc: "Ordenar descendente",
                  triggerAsc: "Ordenar ascendente",
                  cancelSort: "Cancelar",
                  emptyText: LoadingIcon(),
                }}
                columns={columnsItems}
                dataSource={mercancias}
                size="small"
                pagination={false}
              />
            </Grid>

            {/* Concepto */}

            <Grid item md={12} display={"flex"} justifyContent={"center"}>
              <p>
                Ultima Autoliquidación:{" "}
                <strong>
                  {liquidacionGeneral.length > 0
                    ? liquidacionGeneral[0]["lige_Id"] * 16
                    : "----"}
                </strong>
              </p>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Chip label={"Conceptos"}></Chip>
              </Divider>
            </Grid>
            <Grid item md={12} display={"flex"} justifyContent={"center"}>
              <Table
                style={{ width: "95%" }}
                locale={{
                  triggerDesc: "Ordenar descendente",
                  triggerAsc: "Ordenar ascendente",
                  cancelSort: "Cancelar",
                  emptyText: LoadingIcon(),
                }}
                columns={columnsLiquidacion}
                dataSource={liquidacionGeneral}
                size="small"
                pagination={false}
              />
            </Grid>
            <Grid item md={12} display={"flex"} justifyContent={"end"}>
              <Grid container md={12} display={"flex"} justifyContent={"end"}>
                <Grid item md={3} display={"flex"} justifyContent={"end"}>
                  <p>Total a pagar:</p>
                </Grid>
                <Grid item md={3} display={"flex"} justifyContent={"end"}>
                  <p>
                    {liquidacionGeneral.length > 0
                      ? liquidacionGeneral[0]["lige_TotalGral"]
                      : "----"}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} display={"flex"} justifyContent={"end"}>
              <Grid container md={12} display={"flex"} justifyContent={"end"}>
                <Grid item md={3} display={"flex"} justifyContent={"end"}>
                  <p>Total a Garantizar:</p>
                </Grid>
                <Grid item md={3} display={"flex"} justifyContent={"end"}>
                  <p>{liquidacionGeneral.length > 0 ? "0000" : "0000"}</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </Collapse>
        </CardContent>
      </Card>
    </>
  );
}

export default DucaDetalleAbierto;
