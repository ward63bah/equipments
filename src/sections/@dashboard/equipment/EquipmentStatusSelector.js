import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const statusList = ['available', 'repairing', 'out of service'];
export default function EquipmentStatusSelector(props) {
  const { latestStatus, onFilterStatus } = props;
  const [status, setStatus] = useState('');

  const handlerFilterByStatus = (event) => {
    setStatus(event.target.value);
    onFilterStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      {latestStatus === undefined ? (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">All</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="status"
            autoFocus
            onChange={handlerFilterByStatus}
          >
            <MenuItem value={''}>All</MenuItem>;
            {statusList?.map((status) => {
              return <MenuItem value={status}>{status}</MenuItem>;
            })}
          </Select>
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">select status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="status"
            autoFocus
            onChange={handlerFilterByStatus}
          >
            <MenuItem value={''}>Select</MenuItem>;
            {statusList
              ?.filter((status) => status !== latestStatus)
              .map((status) => {
                return <MenuItem value={status}>{status}</MenuItem>;
              })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}
