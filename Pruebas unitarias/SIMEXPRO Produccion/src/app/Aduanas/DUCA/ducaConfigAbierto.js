import { lazy } from "react";

const DucaDetalleAbierto = lazy(() => import("./duca_DetalleAbierto"));

const DucaConfigAbierto = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: null,
  routes: [
    {
      path: "Duca/DetalleAbierto/:state",
      element: <DucaDetalleAbierto />,
    },
  ],
};

export default DucaConfigAbierto;
