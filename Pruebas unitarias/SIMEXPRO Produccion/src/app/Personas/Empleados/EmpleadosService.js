import axios from 'axios';
import instance from 'src/app/auth/services/jwtService/jwtService';


function EmpleadosService () {

    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Empleados/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function listar() {
        try {
            const response = await axiosInstance.get(`Listar?empl_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return {
                  key: index+1,
                  empl_Id: item.empl_Id,
                  empl_Nombres: item.empl_Nombres,
                  empl_Apellidos: item.empl_Apellidos,
                  empl_DNI: item.empl_DNI,
                  escv_Id: item.escv_Id,
                  escv_Nombre: item.escv_Nombre,
                  empl_NombreCompleto:`${item.empl_Nombres} ${item.empl_Apellidos}`,
                  empl_Sexo: item.empl_Sexo,
                  empl_FechaNacimiento: item.empl_FechaNacimiento,
                  empl_Telefono: item.empl_Telefono,
                  empl_DireccionExacta: item.empl_DireccionExacta,
                  pvin_Id: item.pvin_Id,
                  pvin_Nombre: item.pvin_Nombre,
                  pais_Id: item.pais_Id,
                  pais_Codigo: item.pais_Codigo,
                  pais_Nombre: item.pais_Nombre,
                  empl_CorreoElectronico: item.empl_CorreoElectronico,
                  carg_Id: item.carg_Id,
                  carg_Nombre: item.carg_Nombre,
                  empl_EsAduana: item.empl_EsAduana,
                  usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                  usuarioCreacionNombre: item.usuarioCreacionNombre,
                  empl_FechaCreacion: item.empl_FechaCreacion,
                  usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                  usuarioModificacionNombre: item.usuarioModificacionNombre,
                  empl_FechaModificacion: item.empl_FechaModificacion,
                  usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                  usuarioEliminacionNombre: item.usuarioEliminacionNombre,
                  empl_FechaEliminacion: item.empl_FechaEliminacion,
                  empl_Estado: item.empl_Estado,
                  usua_UsuarioActivacion: item.usua_UsuarioActivacion,
                  usuarioActivacionNombre: item.usuarioActivacionNombre,
                  empl_FechaActivacion: item.empl_FechaActivacion,
                  estadoEmpleado: item.empl_Estado == 0 ? 'Habilitado' : 'Deshabilitado'
                };
              });
            return data;
        } catch (error) {
        }
    }

    async function ExportData(){
        try{
            const response = await axiosInstance.get(`Listar?empl_EsAduana=${user["esAduana"].toString()}`);
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    empl_NombreCompleto:`${item.empl_Nombres} ${item.empl_Apellidos}`,
                    empl_DNI: item.empl_DNI,
                    escv_Nombre: item.escv_Nombre,
                    empl_Sexo: item.empl_Sexo,
                    carg_Nombre: item.carg_Nombre,
                    empl_Estado: item.empl_Estado == 0 ? 'Deshabilitado' : 'Habilitado'
                };
            }); 
            return data;
        }
        catch (error)
        {
        }
    };

    async function crear(modelo) {
        try {
            let datos = {
                empl_Nombres: modelo.empl_Nombres.trim(),
                empl_Apellidos: modelo.empl_Apellidos.trim(),
                empl_DNI: modelo.empl_DNI,
                escv_Id: modelo.escv_Id.value,
                empl_NombreCompleto: modelo.empl_Nombres.trim(),
                empl_Sexo: modelo.empl_Sexo,
                empl_FechaNacimiento: modelo.empl_FechaNacimiento,
                empl_Telefono: modelo.empl_Telefono.trim(),
                empl_DireccionExacta: modelo.empl_DireccionExacta.trim(),
                pvin_Id: modelo.pvin_Id.value,
                empl_CorreoElectronico: modelo.empl_CorreoElectronico.trim(),
                carg_Id: modelo.carg_Id.value,
                empl_EsAduana: user['esAduana'],
                usua_UsuarioCreacion: user['uuid'],
                empl_FechaCreacion: instance.formatFechaHora(new Date())
            }
            const response = await axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
        }
    }
    
    async function editar(modelo) {
        try {
            let datos = {
                empl_Id: modelo.empl_Id,
                empl_Nombres: modelo.empl_Nombres.trim(),
                empl_Apellidos: modelo.empl_Apellidos.trim(),
                empl_DNI: modelo.empl_DNI,
                escv_Id: modelo.escv_Id.value,
                empl_NombreCompleto: modelo.empl_Nombres.trim(),
                empl_Sexo: modelo.empl_Sexo,
                empl_FechaNacimiento: modelo.empl_FechaNacimiento,
                empl_Telefono: modelo.empl_Telefono.trim(),
                empl_DireccionExacta: modelo.empl_DireccionExacta.trim(),
                pvin_Id: modelo.pvin_Id.value,
                empl_CorreoElectronico: modelo.empl_CorreoElectronico.trim(),
                carg_Id: modelo.carg_Id.value,
                empl_EsAduana: user['esAduana'],
                usua_UsuarioCreacion: user['uuid'],
                empl_FechaCreacion: instance.formatFechaHora(new Date()),
                usua_UsuarioModificacion: user['uuid'],
                empl_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Editar',datos);
            return response;
        } catch (error) {
        }
    }
   
    async function deshabilitar(data) {
        try {
            let datos = {
                empl_Id: data['empl_Id'],
                usua_UsuarioEliminacion: user['uuid'],
                empl_FechaEliminacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Eliminar',datos);
            return response;
        } catch (error) {
        }
    }

    async function habilitar (data) {
        try {
            let datos = {
                empl_Id: data['empl_Id'],
                usua_UsuarioActivacion: user['uuid'],
                empl_FechaActivacion: instance.formatFechaHora(new Date()),
            }
            const response = await axiosInstance.post('Reactivar',datos);
            return response;
        } catch (error) {
        }
    }
    return{
        listar,
        crear,
        editar,
        deshabilitar,
        habilitar,
        ExportData
    }
}

// const empleadosService = new EmpleadosService();
export default EmpleadosService;