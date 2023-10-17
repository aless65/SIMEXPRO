import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Grid} from "@mui/material";

function renderBotonRegresar({ onClick }) {
  return (
        <Button variant="contained"
          style={{ position: 'fixed', top: '76%', right: '5%' }}
          onClick={onClick}
          startIcon={<Icon>arrow_back</Icon>}>
          Regresar</Button>
  );
}

export default renderBotonRegresar;
