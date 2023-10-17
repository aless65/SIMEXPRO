import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FormLabel, Icon, InputAdornment, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import History from 'src/@history/@history';
import { ToastError, ToastInfo, ToastSuccess, ToastWarning, ToastWarningPersonalizado, ToastWarningYaExiste } from 'src/styles/toastsFunctions';
import * as yup from 'yup';
import PantallasService from '../Pantallas/PantallasService';
import RolesService from './rolesservice';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function RolesCrear() {
    const RolesServices = RolesService()
    const PantallasServices = PantallasService()
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const Navigate = useNavigate();

    //Constante de los datos por defecto que tendran los formulario
    const RolesViewModel = {
        role_Descripcion: "",
        role_Aduana: false
    };
    //Constante de los datos que serán requeridos para el formulario
    const RolesSchema = yup.object().shape({
        role_Descripcion: yup.string().required(""),
    });

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    useEffect(() => {
        ListadoPantallas()
    }, []);  //Constante para cargar datos a las tablas      


    const ListadoPantallas = async () => {
        try {
            setLeft(await PantallasServices.ListadoPantallas())
        } catch (error) {
            
        }
    };

    const customList = (items) => (
        <Paper sx={{ width: 350, height: 250, overflow: 'auto', borderColor: '#c6b1c9', borderWidth: 1, borderStyle: 'solid' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const pant_Id = `transfer-list-item-${value.id}-label`;

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': pant_Id,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={pant_Id} primary={` ${value.pant_Nombre}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );



    //Constante que nos ayuda para las validaciones con yup para los formularios
    const { handleSubmit, control, watch, formState } = useForm({
        RolesViewModel,
        mode: "all",
        resolver: yupResolver(RolesSchema),
    });

    const { errors, isValid } = formState;

    const RolesModelo = watch();

    const CrearRoles = async () => {
        const response = await RolesServices.CrearRoles(RolesModelo, right)
        return response
    }

    const GuardarRoles = async () => {
        if (isValid) {
            if (right.length === 0) {
                ToastWarningPersonalizado('Seleccione al menos una pantalla.')
            }
            else {
                const response = await CrearRoles();
                if (response.data.data.messageStatus == 1) {
                    ToastSuccess('Registro agregado exitosamente.')
                    History.push("/Roles/Index")
                }
                else if (response.data.data.messageStatus.includes('UNIQUE')) {
                    ToastWarningYaExiste()
                }
                else {
                    ToastError('Ha ocurrido un error.')
                }
            }
        }
        else {
            ToastWarning('Hay campos vacios.')
        }
    }


    return (
        <form onSubmit={handleSubmit((_data) => { })}>

            <Card sx={{ minWidth: 275, margin: '40px' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image="https://i.ibb.co/gMjB52g/ROLES.png"
                    alt="Encabezado de la carta"
                />

                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    <Grid item xs={3}></Grid>


                    <Grid item xs={6}>
                        <div className=" mb-16">
                            <FormControl fullWidth>
                                <FormLabel error={!!errors.role_Descripcion} id="group-label">Descripción del rol:</FormLabel>
                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="outlined"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                            error={!!errors.role_Descripcion}
                                        ></TextField>
                                    )}
                                    name="role_Descripcion"
                                    control={control}
                                >
                                </Controller>
                            </FormControl>
                        </div>

                    </Grid>



                </Grid>


                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>{customList(left)}</Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleAllRight}
                                    disabled={left.length === 0}
                                    aria-label="move all right"
                                >
                                    ≫
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleAllLeft}
                                    disabled={right.length === 0}
                                    aria-label="move all left"
                                >
                                    ≪
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>{customList(right)}</Grid>
                    </Grid>
                </CardContent>



                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "right",
                        marginBottom: '15px',
                        marginRight: '15px'
                    }}
                >
                    <Button
                        startIcon={<Icon>check</Icon>}
                        variant="contained"
                        color="primary"
                        style={{
                            borderRadius: "10px",
                            marginRight: "10px",
                        }}
                        sx={{
                            backgroundColor: "#634A9E",
                            color: "white",
                            "&:hover": { backgroundColor: "#6e52ae" },
                        }}
                        onClick={GuardarRoles}
                        type="submit"
                    >
                        Guardar
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
                        onClick={(e) => {
                            Navigate("/Roles/Index");
                        }}                    >
                        Cancelar
                    </Button>
                </Grid>
            </Card>
        </form>

    )
}

export default RolesCrear;