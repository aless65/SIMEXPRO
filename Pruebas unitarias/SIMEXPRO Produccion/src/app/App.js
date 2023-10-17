import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import "@mock-api";
import settingsConfig from "app/configs/settingsConfig";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import { selectUser } from "app/store/userSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import rtlPlugin from "stylis-plugin-rtl";
import { AuthProvider } from "./auth/AuthContext";
import instance from "./auth/services/jwtService/jwtService";
import withAppProviders from "./withAppProviders";

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

const App = () => {
  const user = useSelector(selectUser);
  const userData = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("user", JSON.stringify(user));
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);

  if (userData?.time) {
    const fechaHoy = instance.formatFechaHora(new Date());
    const Difference_In_Time =
      new Date(fechaHoy).getTime() - new Date(userData.time).getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days >= 1) {
      localStorage.clear()
    }
  }


  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <ToastContainer />
      <FuseTheme theme={mainTheme} direction={langDirection}>
        <AuthProvider>
          <BrowserRouter>
            <FuseAuthorization
              userRole={user.role}
              loginRedirectUrl={settingsConfig.loginRedirectUrl}
            >
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                classes={{
                  containerRoot:
                    "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                }}
              >
                <FuseLayout layouts={themeLayouts} />
              </SnackbarProvider>
            </FuseAuthorization>
          </BrowserRouter>
        </AuthProvider>
      </FuseTheme>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
