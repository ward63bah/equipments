import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EquipmentSelector(props) {
  const { equipments, onSelectedEquipment } = props;
  const [selected, setSelected] = useState('');

  const handlerSelected = (event) => {
    setSelected(event?.target?.value);
    onSelectedEquipment(event?.target?.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      {equipments && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">All</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            label="equipment"
            onChange={handlerSelected}
          >
            <MenuItem value={''}>Select</MenuItem>;
            {equipments?.map((equipment) => {
              return <MenuItem value={equipment?.sn}>{equipment?.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}
