import { motion } from 'framer-motion';
import { Checkbox, IconButton } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import {
  openLabelsDialog,
  selectLabels,
  selectSelectedLabels,
  toggleSelectedLabels,
} from './store/labelsSlice';
import CardMedia from '@mui/material/CardMedia';

function CalendarAppSidebar() {
  const labels = useSelector(selectLabels);
  const selectedLabels = useSelector(selectSelectedLabels);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col flex-auto min-h-full p-12">
<br></br>
<CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/C971B0n/Sin-t-tulo-25-10-cm-203-10-cm-20-10-cm.png"
                alt="Encabezado de la carta"
            />



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
