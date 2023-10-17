import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";


function TratadosService() {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/TratadosLibreComercio/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get(`Listar?unme_EsAduana=${user["esAduana"].toString()}`);

            
            
            
            const data = response.data.data.map((item, index) => {
                let detalles = null;
                console.log(item.detalles)
                if (item.detalles) {
                  const detallesJson = JSON.parse(item.detalles);
                  detalles = detallesJson.map((datos, index2) => {
                    return {
                      key: datos['key'],
                      patr_Id: datos['patr_Id'], 
                      trli_Id: datos['trli_Id'], 
                      pais_Id: datos['pais_Id'],
                      pais_Codigo: datos['pais_Codigo'],
                      pais_Nombre: datos['pais_Nombre'],
                      pais_prefijo: datos['pais_prefijo']
    
                    };
                  });
                }

                return {
                    key: index + 1
                    ,trli_Id: item.trli_Id
                    ,trli_NombreTratado: item.trli_NombreTratado
                    ,detalles: detalles
                    ,usuarioCreacionNombre: item.usuarioCreacionNombre
                    ,usuarioModificadorNombre: item.usuarioModificadorNombre
                    ,trli_FechaInicio: item.trli_FechaInicio
                    ,usua_UsuarioCreacion: item.usua_UsuarioCreacion
                    ,trli_FechaCreacion: item.trli_FechaCreacion
                    ,usua_UsuarioModificacion: item.usua_UsuarioModificacion
                    ,trli_FechaModificacion: item.trli_FechaModificacion
                };
            });
            return data;
        } catch (error) {
        }
    }


    async function ExportData() {
        try {
            const response = await axiosInstance.get(`Listar?unme_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    unme_Descripcion: item.unme_Descripcion,
                };
            });
            return data;
        }
        catch (error) {

        }
    };
    async function crear(data) {
        try {
            let datos = {
                unme_Descripcion: data['nombre'].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user['uuid'],
                unme_EsAduana: user["esAduana"],
                unme_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Insertar', datos);
            return response;
        } catch (error) {
        }
    }

    async function editar(data, Id) {
        try {
            let datos = {
                unme_Id: Id,
                unme_Descripcion: data['nombre'].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user['uuid'],
                unme_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Editar', datos);
            return response;
        } catch (error) {
        }
    }

    async function eliminar(idEliminar) {
        try {
            let datos = {
                unme_Id: idEliminar,
                usua_UsuarioEliminacion: user['uuid'],
                unme_FechaEliminacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Eliminar', datos);
            return response;
        } catch (error) {
        }
    }

    return {
        listar,
        crear,
        editar,
        eliminar,
        ExportData
    };
}

export default TratadosService;