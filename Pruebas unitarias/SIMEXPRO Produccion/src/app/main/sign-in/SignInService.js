import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";
// import user from 'src/app/auth/services/jwtService/dataUser';

function SignInService() {
    const customHeaders = {
        XApiKey: instance.extraerToken(),
    };

    const baseURL = process.env.REACT_APP_API_URL;

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: customHeaders,
    });

    const user = JSON.parse(localStorage.getItem('user'));

    function MakeAleatoryCode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    async function EnviarCorreo(usuario) {
        try {

            let tokenGenerate = MakeAleatoryCode(6)
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/Usuarios/UsuarioCorreo?usua_Nombre=${usuario}`)

            if (response.data) {
                let datos = { token: tokenGenerate, user: usuario, email: response.data.data['messageStatus'] };

                let SendMail = {
                    service_id: 'service_vmi2fud',
                    template_id: 'template_7pts636',
                    user_id: 'v8MonHOTfcrwu9Q4E',
                    template_params: {
                        to_name: usuario,
                        message: tokenGenerate,
                        send_to: response.data.data['messageStatus'],
                    }
                };

                const res = await axios.post(`https://api.emailjs.com/api/v1.0/email/send`, SendMail)

                if (res['status'] == 200) {
                    return datos
                } else {
                    return -1
                }

            } else {
                return "usuario inexistente"
            }

        } catch (error) {
            return error
        }

    }


    async function ReenviarCorreo(data) {
        try {

            let tokenGenerate = MakeAleatoryCode(6)

            let datos = { token: tokenGenerate, user: data['user'], email: data['email'] };

            let SendMail = {
                service_id: 'service_vmi2fud',
                template_id: 'template_7pts636',
                user_id: 'v8MonHOTfcrwu9Q4E',
                template_params: {
                    to_name: data['user'],
                    message: tokenGenerate,
                    send_to: data['email'],
                }
            };

            const res = await axios.post(`https://api.emailjs.com/api/v1.0/email/send`, SendMail)

            if (res['status'] == 200) {
                return datos
            } else {
                return -1
            }

        } catch (error) {
            return error
        }

    }

    async function CambiarContrasenia(user, data) {
        try {
            let datos = {
                "usua_Nombre": user['user'],
                "usua_Contrasenia": data['passwordConfirm'],
            }
            const res = await axios.post(`${process.env.REACT_APP_API_URL}api/Usuarios/CambiarContrasenia`, datos)
            if (res.data) {
                return 1
            } else {
                return 0
            }
        } catch (error) {
            return error
        }

    }



    return {
        EnviarCorreo,
        MakeAleatoryCode,
        ReenviarCorreo,
        CambiarContrasenia,
    };
}

// const usuarioservice = new UsuariosService();
export default SignInService;