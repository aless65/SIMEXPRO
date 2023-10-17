/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import { yupResolver } from "@hookform/resolvers/yup";
import { Chip } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import OrdenDeProcesosService from "src/app/Produccion/OrdenDeProcesos/OrdenDeProcesosService";
import instance from "src/app/auth/services/jwtService/jwtService";
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import "src/styles/custom-pagination.css";
import LoadingIcon from "src/styles/iconoCargaTabla";
import { ToastError, ToastSuccessGuardado, ToastWarning } from "src/styles/toastsFunctions";
import * as yup from "yup";

function OrdenDeProcesosCrear() {
  const load_DDLs = Load_DDLs()
  const ordenDeProcesosService = OrdenDeProcesosService();
  // Campos para el DDL de Empleado
  const [empleados, setEmpleados] = useState({});
  const [searchText, setSearchText] = useState("");

  // Campos para el DDL de tbPedidosProduccion
  // Campos para el DDL de Proceso
  const [Proceso, setProceso] = useState([]);

  // Campos para el DDL de Modulo
  const [Modulo, setModulo] = useState([]);
  //Verifica si el detalle de PO ingresado existe
  const [DataTabla, setDataTabla] = useState([]);
  const [filas, setFilas] = React.useState(10);

  async function ddlModulo(id) {
    try {
      setModulo(await load_DDLs.ModuloPorProceso(id));
    } catch (error) {
      
    }
  }
  //Verifica si el detalle de PO ingresado existe
  const [detalleExiste, setDetalleExiste] = useState(true);
  const empleadosGet = async () => {
    try {
      const data = await load_DDLs.Empleados()
      setEmpleados(data)
    } catch (error) {
      
    }
  };


  const procesoGet = async (id) => {
    try {
      const data = await load_DDLs.ProcesosFiltrados(id)
      setProceso(data)
    } catch (error) {
      
    }
  };
  // CAMBIAR DESPUES PQ ESTA FEO
  const customHeaders = {
    XApiKey: instance.extraerToken(),
  };

  const baseURL = process.env.REACT_APP_API_URL + "api/AsignacionesOrden/";

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: customHeaders
  });

  const [resp, setresp] = useState([]);
  const getOrdenCompraDetallesInfo = async (id) => {
    const response = await axiosInstance.get(`Find?id=${id}`);
    setresp(await axiosInstance.get(`Find?id=${id}`))
    otrafuncion(response)
    if (response.data.message === "Sequence contains no elements") {
      toast.warning("Este detalle no existe", {
        theme: 'dark',
        style: {
          backgroundColor: '#111827'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
    else {
      const data = response.data.data;
      if (data.asor_Id === null) {
        toast.warning("Digite un detalle de PO que no este terminado", {
          theme: 'dark',
          style: {
            backgroundColor: '#111827'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }
      else if (data.asor_Id > 0) {
        toast.warning("Este detalle ya esta empezado", {
          theme: 'dark',
          style: {
            backgroundColor: '#111827'
          },
          autoClose: 1500,
          closeOnClick: true
        });
        return data;
      }
      else {
        return data;
      }
    }

  }
const otrafuncion = (response) => {
}

  const handleBlur = async () => {

    const formData = getValues();
    try {
      if(formData.codigo != "" && formData.id != "")
      {
      const detallePO = formData.codigo + " - " + formData.id
      if (detallePO) {
        const response = await getOrdenCompraDetallesInfo(detallePO);

        procesoGet(formData.code_Id)
        setValue('color', response.colr_Nombre);
        setValue('estilo', response.esti_Descripcion);
        setValue('talla', response.tall_Nombre);
        setValue('validacion', response.validacion);
        setDetalleExiste(true);
      } else {
        setValue('color', '');
        setValue('estilo', '');
        setValue('talla', '');
      }
      
     }
     else
     {
       
       setValue('color', '');
       setValue('estilo', '');
       setValue('talla', '');
     }
    }
    catch (error) {

      setValue('color', '');
      setValue('estilo', '');
      setValue('talla', '');

      setDetalleExiste(false);
    }
    
  };



  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, // sorting para Numeros
    },
    {
      title: "Descripcion Material",
      dataIndex: "mate_Descripcion",
      key: "mate_Descripcion",
      sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion), // sorting para Numeros
    },
    {
      title: "Estado",
      dataIndex: "ppro_Estados",
      key: "ppro_Estados",
      sorter: (a, b) => a.ppro_Estados.localeCompare(b.ppro_Estados), // sorting para Numeros
    },
    {
      title: "Stock",
      dataIndex: "lote_Stock",
      key: "lote_Stock",
      sorter: (a, b) => a.lote_Stock.localeCompare(b.lote_Stock), // sorting para Numeros
    },
  ];

  // Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const camposToFilter = ["key", "ppro_Id", "ppro_Id", "lote_Id"
    , "lote_Stock", "ppde_Cantidad", "mate_Id", "mate_Descripcion"
    , "tipa_Id", "tipa_area", "ppro_Estados", "usua_UsuarioCreacion", "usuarioCreacionNombre", "ppde_FechaCreacion",
    , "usua_UsuarioModificacion", "usuarioModificacionNombre", "ppde_FechaModificacion", "ppde_Estado"
  ];

  // Constante que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
    if (searchText === "") {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === "number"
            ? value.toString()
            : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === "number"
            ? searchText.toString()
            : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });
  const getItems = async () => {
    try {
      if (modelo.ppro_Id !== null || modelo.ppro_Id !== 0) {
     
        const data = await load_DDLs.PedidoOrdenDetalleFiltrar(modelo.ppro_Id)
        if(data[0].ppro_Estados === "Entregada")
        {
          setValue("ppro_Id", "")
          
          toast.warning("Este pedido ya fue entregado", {
            theme: 'dark',
            style: {
              backgroundColor: '#111827'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        }
        else
        {

          if (!data.length > 0) {
            toast.warning("Este pedido no contiene datos", {
              theme: 'dark',
              style: {
                backgroundColor: '#111827'
              },
              autoClose: 1500,
              closeOnClick: true
            });
          }
          else {}
          setDataTabla(data)
        }
      }
      else {
        setDataTabla(null)
      }
    }
    catch (error) {
      
    }

  }
  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    empleadosGet()
  }, []);

  const defaultValues = {
    ensa_Id: null,
    codigo: "",
    id: "",
    ensa_Cantidad: null,
    empl_Id: null,
    code_Id: "", // Detalle de PO
    talla: "",
    color: "",
    estilo: "",
    ensa_FechaInicio: "",
    ensa_Fechalimite: "",
    ppro_Id: "",  // PedidosProduccion
    proc_Id: null,  // Proceso
    modu_Id: null, // Modulo
    usua_UsuarioCreacion: null,
    ensa_FechaCreacion: "",
    colr_Nombre: "",
    esti_Descripcion: "",
    tall_Nombre: ""
  };

  const EmpleadosSchema = yup.object().shape({
    ensa_Cantidad: yup.number().min(1).required(""),
    empl_Id: yup.object().required(""),
    code_Id: yup.string().required(""),
    codigo: yup.string().required(""),
    id: yup.string().required(""),
    ensa_FechaInicio: yup.date().nullable().required("").min(new Date(1900, 0, 1), "Ingrese una fecha mayor a 01/01/1900"),
    ensa_Fechalimite: yup.date().nullable().required("").min(yup.ref("ensa_FechaInicio"), "No puede ingresar fechas menor a la de incio"),
    ppro_Id: yup.string().required(""),
    proc_Id: yup.object().required(""),
    modu_Id: yup.object().required(""),
    talla: yup.string().required(""),
    color: yup.string().required(""),
    estilo: yup.string().required(""),
  });

  // Constante que nos ayuda para las validaciones con yup para los formularios
  const { handleSubmit, register, reset, control, watch, getValues, formState, setValue, trigger } =
    useForm({
      defaultValues,
      mode: "all",
      resolver: yupResolver(EmpleadosSchema),
    });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const modelo = watch();

  const OrdenProcesosCreate = async () => {
    const response = await ordenDeProcesosService.crear(modelo)
    return response
  }

  const validacion = async () => {
    try{
      
      if (isValid) {
        const response = await OrdenProcesosCreate();
        if (response.data.data.messageStatus === "1") {
          ToastSuccessGuardado()
          History.push("/OrdenProcesos/Index")
        } else {
          
          ToastError()
        }
      } else {
        ToastWarning()
      }
    }
    catch (error)
    {
      console.error(error)
    }
  }


  return (
    <form onSubmit={handleSubmit((_data) => { })}>
      <Card sx={{ minWidth: 275, margin: "40px" }}>
        {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta) */}
        <CardMedia
          component="img"
          height="200"
          image="https://i.ibb.co/TtV62Xs/RDEN-DE-PROCESOS.png"
          alt="Encabezado de la carta"
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >

          {/* Aqui se debe lograr que al ingresar el numero del P.O sea como una busqueda ebn la que le carguen los detalles de esa P.o que esran en los otros campos (color, estilo, talla) */}
          <Grid container spacing={3}>

            <Grid item xs={3}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.codigo} fullWidth={true}>
                    <FormLabel


                    >
                      Codigo de P.O.
                    </FormLabel>
                    <TextField
                      {...field}
                      error={!!errors.codigo}
                      variant="outlined"
                      fullWidth={true}
                      onBlur={handleBlur}
                      onChange={(event) => {
                        setValue("codigo", event.target.value)
                      }}
                      inputprops={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="codigo"
                control={control}
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.id} fullWidth={true}>
                    <FormLabel


                    >
                      Id de P.O.
                    </FormLabel>
                    <TextField
                      {...field}
                      error={!!errors.id}
                      variant="outlined"
                      fullWidth={true}
                      onBlur={handleBlur}
                      onChange={(event) => {
                        setValue("id", event.target.value)
                        setValue("code_Id", event.target.value)
                      }}
                      inputprops={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="id"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.code_Id} fullWidth={true}>
                    <FormLabel


                    >
                      Talla
                    </FormLabel>
                    <TextField
                      {...field}
                      error={!!errors.code_Id}
                      variant="outlined"
                      disabled
                      fullWidth={true}  
                      onBlur={handleBlur}
                      inputprops={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="talla"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.code_Id} fullWidth={true}>
                    <FormLabel


                    >
                      Color
                    </FormLabel>
                    <TextField
                      {...field}
                      error={!!errors.code_Id}
                      variant="outlined"
                      fullWidth={true}
                      disabled
                      onBlur={handleBlur}
                      inputprops={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="color"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.code_Id} fullWidth={true}>
                    <FormLabel


                    >
                      Estilo
                    </FormLabel>
                    <TextField
                      disabled
                      {...field}
                      error={!!errors.code_Id}
                      variant="outlined"
                      fullWidth={true}
                      onBlur={handleBlur}
                      inputprops={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="estilo"
                control={control}
              />
            </Grid>
            {/* options={DatosDDL.aduanas} */}


            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={field.value === "0"} fullWidth={true}>
                    <FormLabel


                      error={!!errors.proc_Id}>
                      Proceso
                    </FormLabel>
                    <Autocomplete
                      disableClearable={true}
                      {...field}
                      disablePortal
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      options={Proceso}
                      value={modelo["proc_Id"]}
                      onChange={(event, value) => {
                        setValue('proc_Id', value)
                        setValue('modu_Id', null)
                        ddlModulo(value?.value)
                        if (!value) { setValue('pvin_Id', []) }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.proc_Id}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </FormControl>
                )}
                name="proc_Id"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={field.value === "0"} fullWidth={true}>
                    <FormLabel


                      error={!!errors.modu_Id}>
                      Módulo o línea de producción asignada
                    </FormLabel>
                    <Autocomplete
                      disableClearable={true}
                      {...field}
                      disablePortal
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      options={Modulo}
                      value={modelo["modu_Id"]}
                      onChange={(event, value) => { setValue('modu_Id', value) }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.modu_Id}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </FormControl>
                )}
                name="modu_Id"
                control={control}
              />
            </Grid>


            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={field.value === "0"} fullWidth={true}>
                    <FormLabel


                      error={!!errors.empl_Id}>
                      Encargado
                    </FormLabel>
                    <Autocomplete
                      disableClearable={true}
                      {...field}
                      disablePortal
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      options={empleados}
                      value={modelo["empl_Id"]}
                      onChange={(event, value) => { setValue('empl_Id', value) }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.empl_Id}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </FormControl>
                )}
                name="empl_Id"
                control={control}
              />
            </Grid>
            {/* <Typography>{isValid ? 'Valido' : 'no valido'}</Typography> */}
            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.ensa_Cantidad} fullWidth>
                    <FormLabel


                    >
                      Cantidad
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.ensa_Cantidad}
                      placeholder="0"
                      fullWidth={true}
                      inputProps={{
                        type: "number",
                        min: 0,
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="ensa_Cantidad"
                control={control}
              />
            </Grid>



            <Grid item xs={6}>
              <Controller
                name="ensa_FechaInicio"
                control={control}
                render={({ field }) => (
                  <FormControl
                    error={!!errors.ensa_FechaInicio}
                    fullWidth={true}
                  >
                    <FormLabel


                    >
                      Fecha de Inicio
                    </FormLabel>
                    <DatePicker
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                      required
                      minDate={new Date(1900, 0, 1)}
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          onBlur={field.onBlur}
                          error={!!errors.ensa_FechaInicio}
                          helperText={errors?.ensa_FechaInicio?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errors?.ensa_FechaInicio?.message}
                        />
                      )}
                      className="w-full"
                    />

                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="ensa_Fechalimite"
                control={control}
                render={({ field }) => (
                  <FormControl
                    error={!!errors.ensa_Fechalimite}
                    fullWidth={true}
                  >
                    <FormLabel


                    >
                      Fecha límite
                    </FormLabel>
                    <DatePicker
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                      required
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          onBlur={field.onBlur}
                          error={!!errors.ensa_Fechalimite}
                          helperText={errors?.ensa_Fechalimite?.message.includes("Invalid Date") ? "La fecha ingresada no es valida" : errors?.ensa_Fechalimite?.message}
                        />
                      )}
                      className="w-full"
                    />

                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "0px" }}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip style={{ fontSize: '12px' }} label="Pedidos a Producción" />
              </Divider>
            </Grid>

            
              <Grid item xs={6} style={{ margin: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Controller
          render={({ field }) => (
            <FormControl error={!!errors.ppro_Id} style={{ width: '100%' }}>
              <FormLabel>No. de Pedido Producción</FormLabel>
              <TextField
                {...field}
                variant="outlined"
                error={!!errors.ppro_Id}
                placeholder=""
                onBlur={getItems}
                inputProps={{
                  type: 'text',
                  startadornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </FormControl>
          )}
          name="ppro_Id"
          control={control}
        />
        <IconButton
          style={{ marginTop: '20px', padding: '15px', marginLeft: '5px', borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
          sx={{ '&:hover': { backgroundColor: '#6e52ae' } }}
          edge="start"
        >
          <SearchIcon />
        </IconButton>
      </div>
    </Grid>
            <Grid item xs={12}>
              <div style={{ maxHeight: '200px', marginTop: '10px', overflowY: 'scroll' }}> {/* Establece la altura máxima y el scroll */}
                <Table
                  locale={{
                    triggerDesc: "Ordenar descendente",
                    triggerAsc: "Ordenar ascendente",
                    cancelSort: "Cancelar",
                    emptyText: LoadingIcon(),
                  }}
                  columns={columns}
                  dataSource={filteredRows}
                  size="small"
                  pagination={{
                    pageSize: filas,
                    showSizeChanger: false,
                    className: "custom-pagination",
                  }}
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
                  History.push("/OrdenProcesos/Index");
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </form>
  );
}

export default OrdenDeProcesosCrear;

