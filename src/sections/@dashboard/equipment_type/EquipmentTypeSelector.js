import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EquipmentTypeSelector(props) {
  const { equipmentTypes, onFilterType } = props;
  const [type, setType] = useState('');

  const handlerFilterByType = (event) => {
    setType(event.target.value);
    onFilterType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{type !== '' ? type : 'All Type'}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label={type !== '' ? equipmentTypes?.find((e) => e.id === type).name : 'All Type'}
          onChange={handlerFilterByType}
        >
          <MenuItem value={''}>All</MenuItem>;
          {equipmentTypes?.map((type) => {
            return <MenuItem value={type.id}>{type.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
