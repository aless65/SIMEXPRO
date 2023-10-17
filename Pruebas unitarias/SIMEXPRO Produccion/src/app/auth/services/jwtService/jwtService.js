import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import History from 'src/@history/@history';
import { ToastDefault } from 'src/styles/toastsFunctions';
import jwtServiceConfig from './jwtServiceConfig';
/* eslint-disable camelcase */

let interval = null;

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }
  

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'No se pudo iniciar sesión');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    } else {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      let dataPeticion = {
        "usua_Nombre": email,
        "usua_Contrasenia": password
      }

      axios
        .post(`${process.env.REACT_APP_API_URL}api/Usuarios/Login`, dataPeticion)
        // .post(`api/Usuarios/Login`, dataPeticion)
        .then(response => {
          if (response.data.data) {
            let user = {
              "login": true,
              "uuid": response.data.data['usua_Id'],
              "loginRedirectUrl": response.data.data['usua_URLInicial'],
              "from": "Phynomo.net",
              "rolDesc": response.data.data['role_Descripcion'],
              "role": response.data.data['usua_EsAdmin'] ? response.data.data['empl_EsAduana']? "Admin Aduana": 'Admin Producción' : response.data.data['role_Descripcion'],
              // "role": ['Admin Aduana','Admin Producción'],
              "correo": response.data.data['empl_CorreoElectronico'],
              "roleId": response.data.data['role_Id'],
              "esAdmin": response.data.data['usua_EsAdmin'],
              "esAduana": response.data.data['empl_EsAduana'],
              "Empleado": response.data.data['emplNombreCompleto'],
              "data": {
                "displayName": response.data.data['usua_Nombre'],
                "photoURL": response.data.data['usua_Image'],
                "email": response.data.data['usua_Correo'],
                "settings": {
                  "layout": {},
                  "theme": {}
                },
                "shortcuts": [
                  "apps.calendar",
                  "apps.mailbox",
                  "apps.contacts"
                ]
              },
              "time": this.formatFechaHora(new Date())
            }
            this.checker()
            this.updater(response.data.data['empl_EsAduana'])
            localStorage.setItem("user", JSON.stringify(user));
            this.setSession(this.encriptador(email + 'pñwerpaphaperyasevnolapoenmegrnadeo' + password + 'pñwerpaphaperyasevnolapoenmegrnadeo' + response.headers['authorization']));
            resolve(user);
            this.emit('onLogin', user);
          } else {
            reject(response);
          }
        }).catch = (error) => {
          reject(error);
        };
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      let access_token = this.getAccessToken();
      let datos = this.desencriptador(access_token).split('pñwerpaphaperyasevnolapoenmegrnadeo');

      let dataPeticion = {
        "usua_Nombre": datos[0],
        "usua_Contrasenia": datos[1]
      }

      axios
        .post(`${process.env.REACT_APP_API_URL}api/Usuarios/Login`, dataPeticion)
        // .post(`api/Usuarios/Login`, dataPeticion)
        .then(response => {
          if (response.data.data) {
            let user = {
              "login": false,
              "uuid": response.data.data['usua_Id'],
              "loginRedirectUrl": response.data.data['usua_URLInicial'],
              "from": "Phynomo.net",
              "rolDesc": response.data.data['role_Descripcion'],
              "role": response.data.data['usua_EsAdmin'] ? response.data.data['empl_EsAduana']? "Admin Aduana": 'Admin Producción' : response.data.data['role_Descripcion'],
              // "role": ['Admin Aduana','Admin Producción'],
              "correo": response.data.data['empl_CorreoElectronico'],
              "roleId": response.data.data['role_Id'],
              "esAdmin": response.data.data['usua_EsAdmin'],
              "esAduana": response.data.data['empl_EsAduana'],
              "Empleado": response.data.data['emplNombreCompleto'],
              "empId": response.data.data['empl_Id'],
              "data": {
                "displayName": response.data.data['usua_Nombre'],
                "photoURL": response.data.data['usua_Image'],
                "email": response.data.data['usua_Correo'],
                "settings": {
                  "layout": {},
                  "theme": {}
                },
                "shortcuts": [
                  "apps.calendar",
                  "apps.mailbox",
                  "apps.contacts"
                ]
              },
              "time": this.formatFechaHora(new Date())
            }
            this.checker()
            this.updater(response.data.data['empl_EsAduana'])
            localStorage.setItem("user", JSON.stringify(user));
            this.setSession(this.encriptador(datos[0] + 'pñwerpaphaperyasevnolapoenmegrnadeo' + datos[1] + 'pñwerpaphaperyasevnolapoenmegrnadeo' + response.headers['authorization']));
            // this.setSession(response.data.access_token);
            resolve(user);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      // axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      // delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  // isAuthTokenValid = (access_token) => {
  //   if (!access_token) {
  //     return false;
  //   }
  //   const decoded = jwtDecode(access_token);
  //   const currentTime = Date.now() / 1000;
  //   if (decoded.exp < currentTime) {
  //     console.warn('access token expired');
  //     return false;
  //   }

  //   return true;
  // };


    // function to check for inactivity and log out
    checkForInactivity = () => {
      // Get Expire Time from Local Storage
      const expireTime = localStorage.getItem("expireTime");

      // If Expire Time is earlier than now, log out
        if (expireTime < Date.now()) {
          // localStorage.clear('expireTime')
          History.push("/")
          clearInterval(interval)
          this.logout();
          ToastDefault('Sesión cerrada')
      }
    };
  
    updateExpireTime = (data) => {
      const data2 = JSON.parse(localStorage.getItem("user"));
      let awatiTime = data2['esAduana'] !== null? data2['esAduana'] ? 30 : 10 : data ? 30 : 10
      const expireTime = Date.now() + 1000 * 60 * awatiTime;
      // const expireTime = Date.now() + 5000 ;
  
      localStorage.setItem("expireTime", expireTime);
    };
  
    checker = () =>{
      interval = setInterval(()=>{
        this.checkForInactivity();
      },1000)
  
      return () => clearInterval(interval);
  
    }
  
    updater = (data) => {
      this.updateExpireTime(data);
      // set event listeners
      window.addEventListener("click", this.updateExpireTime);
      window.addEventListener("keypress", this.updateExpireTime);
      window.addEventListener("scroll", this.updateExpireTime);
      window.addEventListener("mousemove", this.updateExpireTime);
      // clean up
      return () => {};
      window.removeEventListener("click", this.updateExpireTime);
      window.removeEventListener("keypress", this.updateExpireTime);
      window.removeEventListener("scroll", this.updateExpireTime);
      window.removeEventListener("mousemove", this.updateExpireTime);
    };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };

  encriptador(Texto) {
    const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_CONTRASENIA_KEY);
    const iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_CONTRASENIA_IV);

    const encrypted = CryptoJS.AES.encrypt(Texto, key, { iv }).toString();
    return encrypted;
  }

  desencriptador(Encriptado) {
    const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_CONTRASENIA_KEY);
    const iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_CONTRASENIA_IV);

    const decrypted = CryptoJS.AES.decrypt(Encriptado, key, { iv }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  extraerToken() {
    const getToken = this.getAccessToken();
    if (getToken) {
      let token = this.desencriptador(getToken).split('pñwerpaphaperyasevnolapoenmegrnadeo');
      return this.desencriptador(token[2]);
    } else {
      return '';
    }
  }

  formatFechaHora = (date) => {
    const year = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const hora = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
  };

}

const instance = new JwtService();

export default instance;