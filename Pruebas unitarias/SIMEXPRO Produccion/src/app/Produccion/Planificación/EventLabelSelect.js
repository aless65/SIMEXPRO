import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { forwardRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLabelById, selectLabels } from './store/labelsSlice';
import Load_DDLs from "src/app/loadDDLs/Load_DDL";
import { useLocation } from "react-router-dom";
import History from "src/@history/@history";

const load_DDL = Load_DDLs()

const EventLabelSelect = forwardRef((props, ref) => {
  const { value, onChange, className } = props;
  const labels = useSelector(selectLabels);
  const selectedLabel = useSelector((state) => selectLabelById(state, value));
  const location = useLocation();
  const DatosPrincipales = location.state;
  

  
  
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth className={className}>
      <InputLabel id="select-label">Procesos</InputLabel>
      <Select
        labelId="select-label"
        id="label-select"
        value={value}
        label="Procesos"
        onChange={handleChange}
        ref={ref}
        classes={{ select: 'flex items-center space-x-12' }}
        style={{width: '350px' }}
      >
        {DatosPrincipales == null ? labels.map((label) => (
          <MenuItem value={label.id} key={label.id} className="space-x-12">
            <Box
              className="w-12 h-12 shrink-0 rounded-full"
              sx={{ backgroundColor: label.color }}
            />
            <span>{label.title}</span>
          </MenuItem>
        ))  :  DatosPrincipales.map((label) => (
          <MenuItem value={label.value} key={label.value} className="space-x-12">
            <Box
              className="w-12 h-12 shrink-0 rounded-full"
              sx={{ backgroundColor: label.color }}
            />
            <span>{label.label}</span>
          </MenuItem>
        )) 
        }
      </Select>
    </FormControl>
  );
});

export default EventLabelSelect;
