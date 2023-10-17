import { Checkbox, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLabels,
  selectSelectedLabels,
  toggleSelectedLabels
} from './store/labelsSlice';

function CalendarAppSidebar() {
  const labels = useSelector(selectLabels);
  const selectedLabels = useSelector(selectSelectedLabels);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col flex-auto min-h-full p-12">
<br></br>
{/* <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/C971B0n/Sin-t-tulo-25-10-cm-203-10-cm-20-10-cm.png"
                alt="Encabezado de la carta"
            /> */}

      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="pb-24 text-3xl font-extrabold tracking-tight"
      >
        PLANIFICACIÓN DE ORDEN
      </motion.span>

      <div className="group flex items-center mt-8 space-x-8 h-24 w-full">
        <Checkbox
          color="default"
          className="p-0"
          checked={selectedLabels.length > 0}
          // indeterminate={selectedLabels}
          onChange={() => {
            if(selectedLabels.length > 0){
              selectedLabels.forEach((label) => {
                dispatch(toggleSelectedLabels(label));
              });
            } else {
              labels.forEach((label) => {
                dispatch(toggleSelectedLabels(label.id));
              });
            }
          }}
        />
{/* 
        <Box className="w-12 h-12 shrink-0 rounded-full" 
        // sx={{ backgroundColor: label.color }}
         /> */}

        <Typography className="flex flex-1 leading-none">{selectedLabels.length > 0 ? 'Deseleccionar todo' : 'Seleccionar todo'}</Typography>
      </div>

      {labels.map((label) => (
        <div key={label.id} className="group flex items-center mt-8 space-x-8 h-24 w-full">
          <Checkbox
            color="default"
            className="p-0"
            checked={selectedLabels.includes(label.id)}
            onChange={() => {
              dispatch(toggleSelectedLabels(label.id));
            }}
          />

          <Box className="w-12 h-12 shrink-0 rounded-full" sx={{ backgroundColor: label.color }} />

          <Typography className="flex flex-1 leading-none">{label.title}</Typography>
        </div>
      ))}
    </div>
  );
}

export default CalendarAppSidebar;
