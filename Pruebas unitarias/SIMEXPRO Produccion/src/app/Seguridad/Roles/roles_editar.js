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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import History from 'src/@history/@history';
import { ToastError, ToastInfo, ToastSuccess, ToastWarning, ToastWarningPersonalizado } from 'src/styles/toastsFunctions';
import * as yup from 'yup';
import PantallasService from '../Pantallas/PantallasService';
import RolesService from './rolesservice';


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function RolesEditar() {
    const RolesServices = RolesService();
    const PantallasServices = PantallasService();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const location = useLocation();
    const { role, nombre, pantallas } = location.state;
    const [descripcion, setDescripcion] = useState(nombre);

    //Constante de los datos que serán requeridos para el formulario
    const RolesSchema = yup.object().shape({
        role_Descripcion: yup.string().required(),
    });
    const Navigate = useNavigate();



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


    useEffect(() => {
        setValue('role_Descripcion', nombre)
        ListadoPantallasLeft()
        ListadoPantallasRight()
    }, []);  //Constante para cargar datos a las tablas      

    const ListadoPantallasLeft = async () => {
        try {
            let leftPantallas;
    
            // Verificar si 'right' está vacío
            if (right.length === 0) {
                leftPantallas = await PantallasServices.ListadoPantallas();
            } else {
                leftPantallas = await PantallasServices.ListadoPantallasLeft(pantallas);
            }
    
            setLeft(leftPantallas);
        } catch (error) {
            
        }
    };
    
    
    const ListadoPantallasRight = async () => {
        try {
            const rightPantallas = await PantallasServices.ListadoPantallasRight(pantallas);
            setRight(rightPantallas || []); // Asegurarse de manejar el caso en que 'rightPantallas' sea nulo o indefinido
        } catch (error) {
            
        }
    };



    const RolesViewModel = {
        role_Descripcion: "",            
    };



    //Constante que nos ayuda para las validaciones con yup para los formularios
    const { handleSubmit, control, watch, formState, setValue } = useForm({
        RolesViewModel,
        mode: "all",
        resolver: yupResolver(RolesSchema),
    });

    const { errors, isValid } = formState;

    const RolesModelo = watch();

    const EditarRol = async () => {
        const formData = watch();
        const response = await RolesServices.EditarRoles(role, formData, right)
        return response
    }

    const EditarRoles = async () => {
        if (isValid) {
            if (right.length === 0) {
                ToastWarningPersonalizado('Seleccione al menos una pantalla.')
            }
            else {
                const response = await EditarRol();
                if (response.data.data.messageStatus == 1) {
                    ToastSuccess('Registro editado exitosamente.')
                    History.push("/Roles/Index")
                }
                else if (response.data.data.messageStatus.includes('UNIQUE')) {
                    ToastWarningPersonalizado('El registro ya existe')
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


                <Grid item xs={6} sx={{ marginTop: "30px", marginBottom: '20px' }}>
                    <Controller
                        render={({ field }) => (
                            <FormControl error={!!errors.role_Descripcion} fullWidth={true}>
                                <FormLabel
                                    className="font-medium text-10"
                                    component="legend"
                                >
                                    Descripción del rol:
                                </FormLabel>
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    error={!!errors.role_Descripcion}
                                    fullWidth={true}
                                    value={RolesModelo['role_Descripcion']}
                                    // Utiliza field.onChange para actualizar el estado
                                    onChange={(e) => {
                                        field.onChange(e); // Actualiza el valor en el Controller
                                        setDescripcion(e.target.value); // Actualiza el valor en el estado local
                                    }}
                                    inputProps={{
                                        startadornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                        )}
                        name="role_Descripcion"
                        control={control}
                    />

                </Grid>
            </Grid>




            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                        onClick={EditarRoles}
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

export default RolesEditar;