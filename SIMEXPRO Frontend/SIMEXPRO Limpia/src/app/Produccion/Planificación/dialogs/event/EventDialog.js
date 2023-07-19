import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils/FuseUtils';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { Popover } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { FormControl, Icon, InputAdornment, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Fragment } from 'react';
import {
  addEvent,
  closeEditEventDialog,
  closeNewEventDialog,
  removeEvent,
  selectEventDialog,
  updateEvent,
} from '../../store/eventsSlice';
import EventLabelSelect from '../../EventLabelSelect';
import EventModel from '../../model/EventModel';
import { selectFirstLabelId } from '../../store/labelsSlice';
import CardMedia from '@mui/material/CardMedia';
const defaultValues = EventModel();

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

function EventDialog(props) {
  const [open, setOpen] = useState(false); // Agregar estado para controlar el modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const eventDialog = useSelector(selectEventDialog);
  const firstLabelId = useSelector(selectFirstLabelId);

  const { reset, formState, watch, control, getValues } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const start = watch('start');
  const end = watch('end');
  const id = watch('id');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (eventDialog.type === 'edit' && eventDialog.data) {
      reset({ ...eventDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (eventDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...eventDialog.data,
        extendedProps: {
          ...defaultValues.extendedProps,
          label: firstLabelId,
        },
        id: FuseUtils.generateGUID(),
      });
    }
  }, [eventDialog.data, eventDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (eventDialog.props.open) {
      initDialog();
    }
  }, [eventDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return eventDialog.type === 'edit'
      ? dispatch(closeEditEventDialog())
      : dispatch(closeNewEventDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
    const data = getValues();
    if (eventDialog.type === 'new') {
      dispatch(addEvent(data));
    } else {
      dispatch(updateEvent({ ...eventDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeEvent(id));
    closeComposeDialog();
  }







  return (

    <Popover
      {...eventDialog.props}
      anchorReference="anchorPosition"
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      onClose={closeComposeDialog}
      component="form"
    >



      <br></br>

      <img src='https://i.ibb.co/vz0XJyB/AGREGAR.png' width={250} style={{ alignItems: 'center', marginLeft: '125px' }}></img>

      <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-20 sm:p-32 w-480">
        <div className="flex sm:space-x-20 mb-10">



          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              heroicons-outline:pencil-alt
            </FuseSvgIcon>
            <FormControl>
              <TextField
                style={{ borderRadius: '10px', width: '350px' }}
                label="# Detalle de PO" />
            </FormControl>


          </Grid>




        </div>
        <div className="flex sm:space-x-20 mb-10">



          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>


            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:dry_cleaning
            </FuseSvgIcon>
            <FormControl>
              <TextField
                style={{ borderRadius: '10px', width: '100px' }}
                label="Estilo" />
            </FormControl>
            <FormControl>
              <TextField
                style={{ borderRadius: '10px', width: '75px', marginLeft: '15px' }}
                label="Talla" />
            </FormControl>
            <FormControl>
              <TextField
                style={{ borderRadius: '10px', width: '145px', marginLeft: '15px' }}
                label="Color" />
            </FormControl>
          </Grid>




        </div>
        <div className="flex sm:space-x-20 mb-10">



          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>


            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:calendar_today
            </FuseSvgIcon>

            <Grid item xs={6}>
              <FormControl>
                <DateTimePicker
                  renderInput={(_props) => (

                    <TextField
                      style={{ borderRadius: '10px', width: '168px' }}
                      className="w-full"
                      {..._props} />
                  )}
                  className="w-full" />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl>
                <DateTimePicker
                  renderInput={(_props) => (

                    <TextField
                      style={{ borderRadius: '10px', width: '168px', marginLeft: '15px' }}
                      className="w-full"
                      {..._props} />
                  )}
                  className="w-full" />
              </FormControl>
            </Grid>
          </Grid>
        </div>

        <div className="flex sm:space-x-20 mb-10">

          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>

            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:settings
            </FuseSvgIcon>


            <FormControl
              fullWidth
            >
              <InputLabel htmlFor="grouped-native-select">Proceso</InputLabel>
              <Select
                style={{ borderRadius: '10px', width: '350px' }}
                label="Proceso" />
            </FormControl>
          </Grid>


        </div>

        <div className="flex sm:space-x-20 mb-10">

          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>

            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:volunteer_activism
            </FuseSvgIcon>


            <FormControl>
              <InputLabel htmlFor="grouped-native-select">Empleado Encargado</InputLabel>
              <Select
                style={{ borderRadius: '10px', width: '220px' }}
                label="Empleado Encargado" />
            </FormControl>
            <FormControl>
              <TextField
                type='number'
                style={{ borderRadius: '10px', width: '115px', marginLeft: '15px' }}
                label="Cantidad" />
            </FormControl>
          </Grid>


        </div>
        <div className="flex sm:space-x-20 mb-10">



          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:animation
            </FuseSvgIcon>
            <FormControl>
              <TextField
                style={{ borderRadius: '10px', width: '350px' }}
                label="Lotes Asignados"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleOpen}>
                        <FuseSvgIcon color="action" style={{ width: '24px', height: '24px' }}>
                          heroicons-outline:plus-circle
                        </FuseSvgIcon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }} />
            </FormControl>


          </Grid>




        </div>
        <br></br>

        <div className="flex sm:space-x-20 mb-10">
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} style={{ marginLeft: '100px' }}>
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={closeComposeDialog}
            >
              Guardar  </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#DAD8D8', color: 'black',
                "&:hover": { backgroundColor: '#BFBABA' },
              }}
              onClick={closeComposeDialog}
            >
              Cancelar </Button>
          </Grid>
        </div>
      </div>




      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginLeft: '75px' }}>
            ASIGNAR LOTES
          </Typography>
          <br></br>
          <div className="flex sm:space-x-20 mb-10">
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
              style={{ marginTop: '10px' }}>
              <FormControl>
                <TextField
                  style={{ borderRadius: '10px', width: '328px' }}
                  label="N° de Lote" />
              </FormControl>
            </Grid>
          </div>


          <div className="flex sm:space-x-20 mb-10">

            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
              style={{ marginTop: '10px' }}>
              <FormControl>
                <InputLabel htmlFor="grouped-native-select">Material</InputLabel>
                <Select
                  style={{ borderRadius: '10px', width: '328px' }}
                  label="Material" />
              </FormControl>
            </Grid>

          </div>

          <div className="flex sm:space-x-20 mb-10">
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
              style={{ marginTop: '10px' }}>
              <FormControl>
                <TextField
                  style={{ borderRadius: '10px', width: '328px' }}
                  label="Stock" />
              </FormControl>
            </Grid>
          </div>
          <br></br>
          <div className="flex sm:space-x-20 mb-10">
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} style={{ marginLeft: '50px' }}>
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={handleClose}
              >
                Guardar  </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8', color: 'black',
                  "&:hover": { backgroundColor: '#BFBABA' },
                }}
                onClick={handleClose}
              >
                Cancelar </Button>
            </Grid>
          </div>

        </Box>
      </Modal>
    </Popover>
  );
}

export default EventDialog;
