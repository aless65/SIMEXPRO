import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";

const LoadingIcon = (cargando) => {
  let icono = (
    <Grid
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      marginY={"10px"}
    >
      <Grid item xs={12}>
        <CircularProgress style={{ color: "#634a9e" }} />
      </Grid>
      <Grid item xs={12}>
        Cargando...
      </Grid>
    </Grid>
  );

  if (cargando == null) {
    return null;
  } else if (cargando.length > 0) {
    return null;
  } else {
    return icono;
  }
};

export default LoadingIcon;
