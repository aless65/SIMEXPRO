import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectUser } from 'app/store/userSlice';
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function UserMenu(props) {
  const user = useSelector(selectUser);

  const [userMenu, setUserMenu] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
    userMenuClose();
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.data.displayName}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="text.secondary">
            {user.role.toString()}
            {(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
          </Typography>
        </div>

        {user.data.photoURL ? (
          <Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/sign-in" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Mi Perfil" />
            </MenuItem>

            <MenuItem
              component={NavLink}
              to="/sign-out"
              onClick={() => {
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </MenuItem>

            <MenuItem
              onClick={toggleDialog} // Llamamos a toggleDialog cuando hacemos clic en el botón
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>material-twotone:password</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Reestablecer Contraseña" />
            </MenuItem>
          </>
        )}
      </Popover>





      <Dialog
        open={showDialog} // Usamos el estado 'showDialog' para controlar la apertura del diálogo
        fullWidth={"md"}
        onClose={toggleDialog} // Llamamos a toggleDialog para cerrar el diálogo
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reestablecer Contraseña"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">


            <Grid container spacing={3}>
         
              <Grid item xs={4} style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src='https://i.ibb.co/89knwbt/ico-cambio-contrase-a.png'></img>
              </Grid>

           
              <Grid item xs={8} style={{ marginTop: '5px' }}>
                <Grid container spacing={3}>
                  {/* Etiqueta "Nuevo Usuario" */}
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  </Grid>

                  {/* Left column for TextFields */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      {/* TextField Usuario */}
                      <TextField InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">

                          </InputAdornment>
                        ),

                      }}

                        style={{ borderRadius: '3px', marginTop: '15px' }}

                        label="Contraseña Actual"
                        placeholder="Contraseña Actual"

                      />
                    </FormControl>

                    <FormControl fullWidth>
                      {/* TextField Contraseña */}
                      <TextField InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">

                          </InputAdornment>
                        ),

                      }}

                        style={{ borderRadius: '3px', marginTop: '15px' }}

                        label="Nueva Contraseña"
                        placeholder="Nueva Contraseña"

                      />
                    </FormControl>

                   

                    <FormControl fullWidth>
                      {/* TextField Contraseña */}
                      <TextField InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">

                          </InputAdornment>
                        ),

                      }}

                        style={{ borderRadius: '3px', marginTop: '15px' }}

                        label="Confirmar Nueva Contraseña"
                        placeholder="Confirmar Nueva Contraseña"

                      />
                    </FormControl>

                  </Grid>


                </Grid>


              </Grid>

            </Grid>


          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={toggleDialog}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={toggleDialog}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserMenu;
