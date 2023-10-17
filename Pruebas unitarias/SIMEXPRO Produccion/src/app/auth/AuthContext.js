import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import navigationConfig from "app/configs/navigationConfig";
import {
  appendNavigationItem,
  removeNavigationItem,
} from "app/store/fuse/navigationSlice";
import { logoutUser, setUser } from "app/store/userSlice";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  ToastDefault,
  ToastErrorPersonalizado,
} from "src/styles/toastsFunctions";
import jwtService from "./services/jwtService";
import MenuLoad from "./services/menuLoad";
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const menuLoad = MenuLoad();
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  async function DibujarMenu(user) {
    try {
      navigationConfig.forEach((item) => {
        dispatch(removeNavigationItem(item["id"].toString()));
      });

      navigationConfig.forEach((item) => {
        dispatch(appendNavigationItem(item));
      });

      const dibujo = await menuLoad.dibujado(user);

      dibujo.menus.forEach((item) => {
        dispatch(removeNavigationItem(item.toString()));
      });

      dibujo.noAsignadas.forEach((item) => {
        dispatch(removeNavigationItem(item["pant_Identificador"]));
      });
      
     if(dibujo.noAsignadas.some(objeto => objeto.pant_Identificador === "InicioAduana") && 
        dibujo.noAsignadas.some(objeto => objeto.pant_Identificador === "InicioProduccion")){
        }else{
          dispatch(removeNavigationItem("InicioBlank"));
        }

      return true;
    } catch (err) {

      throw Error(false);
    }
  }

  useEffect(() => {
    jwtService.on("onAutoLogin", async () => {
      // dispatch(showMessage({ message: 'Signing in with JWT' }));
      // ToastSuccess("¡Bienvenido!")
      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService

        .signInWithToken()
        .then(async (user) => {
          try {
            await DibujarMenu(user);
            success(user);
          } catch {
            pass("Ocurrió un error mientras se iniciaba sesión.");
            dispatch(logoutUser());
          }

          // success(user, "¡Bienvenido!");
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    jwtService.on("onLogin", async (user) => {
      try {
        // await DibujarMenu(user);
        // window.location.href = user.loginRedirectUrl;
        
        setWaitAuthCheck(true);
        // return <FuseSplashScreen />
        // success(user, "¡Bienvenido!");
      } catch {
        pass("Ocurrió un error mientras se iniciaba sesión.");
        dispatch(logoutUser());
      }
    });

    jwtService.on("onLogout", () => {
      pass();

      dispatch(logoutUser());
    });

    jwtService.on("onAutoLogout", (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on("onNoAccessToken", () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        // dispatch(showMessage({ message }));
        ToastDefault(message);
      }

      setWaitAuthCheck(true);
      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        if(values.payload?.login){
          setWaitAuthCheck(true);
        }else{
          setWaitAuthCheck(false);
        }
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        // dispatch(showMessage({ message }));
        ToastErrorPersonalizado(message);
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
