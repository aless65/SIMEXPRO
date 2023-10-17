import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

function RolesService () {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL + "api/Roles/";

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    async function  ListadoRoles() {
        try {

            const response = await axiosInstance.get("Listar?role_Aduana=" + user["esAduana"].toString());
            
            const data = response.data.data.map((item, index) => {

                const detallesJson = JSON.parse(item.detalles)
                let detalles = null

                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {
                            key: index2 + 1,
                            pant_Id: datos['pant_Id'],
                            pant_Nombre: datos['pant_Nombre'],
                        }
                    })
                }

                return {
                    key: index + 1,
                    role_Id: item.role_Id,
                    role_Descripcion: item.role_Descripcion,
                    aduanero: item.aduanero,
                    detalles: detalles,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    role_FechaCreacion: item.role_FechaCreacion,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,
                    role_FechaModificacion: item.role_FechaModificacion
                }
            });
            return data;
        } catch (error) {
            
            
        }
    };

    async function  ExportData() {
        try {

            const response = await axiosInstance.get("Listar?role_Aduana=" + user["esAduana"].toString());
            const data = response.data.data.map((item, index) => {

                const detallesJson = JSON.parse(item.detalles)
                let detalles = null

                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {

                            key: index2 + 1,
                            rolKey: index + 1,
                            pant_Nombre: datos['pant_Nombre'],
                        }
                    })
                }

                return {
                    key: index + 1,
                    role_Descripcion: item.role_Descripcion,
                    detalles: detalles,
                }
            });

            var array = [];
            for (let i = 0; i < data.length; i++) {
                if(data[i].detalles){
                    for (let j = 0; j < data[i].detalles.length; j++) {
                        if(data[i].key == data[i].detalles[j].rolKey){
                            array[i] += ` {No.: ${j +1}, Descripción de la pantalla: ${data[i].detalles[j].pant_Nombre}} `;
                        }                        
                    }
                }else{
                    array.push('');
                }                
                data[i].detalles = array[i].toString().replace('undefined', '');
            }
            return data;
        } catch (error) {
            
            
        }
    };


    async function  CrearRoles(RolesModelo, Pantallas) {
        try {
            const pant_Ids = {
                pantallas: Pantallas.map(item => ({ pant_Id: item.pant_Id }))
            };
            const jsonPantIds = JSON.stringify(pant_Ids);

            let datos = {
                role_Descripcion: RolesModelo.role_Descripcion.trim(),
                role_Aduana: user["esAduana"],
                pant_Ids: jsonPantIds,
                usua_UsuarioCreacion: user['uuid'],
                role_FechaCreacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

    async function  EditarRoles(id, RolesModelo, Pantallas) {
        try {
            const pant_Ids = {
                pantallas: Pantallas.map(item => ({ pant_Id: item.pant_Id }))
            };
            const jsonPantIds = JSON.stringify(pant_Ids);

            let datos = {
                role_Id: id,
                role_Descripcion: RolesModelo.role_Descripcion.trim(),
                role_Aduana: user["esAduana"],
                pant_Ids: jsonPantIds,
                usua_UsuarioModificacion: user['uuid'],
                role_FechaModificacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            
            
        }
    }


    async function  EliminarRoles(data) {
        try {
            let datos = {
                role_Id: data["id"],
                usua_UsuarioEliminacion: user['uuid'],
                role_FechaEliminacion: instance.formatFechaHora(new Date())
            };
            const response = await axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            
            
        }
    }

return{
    CrearRoles,
    EditarRoles,
    ListadoRoles,
    EliminarRoles,
    ExportData,
}

}

export default RolesService;
