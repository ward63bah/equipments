import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography, Stack } from '@mui/material';
import Iconify from '../../../components/Iconify';

export default function EquipmentScan(props) {
  const { equipment, equipments, onSelected, onScanQR } = props;
  const [data, setData] = useState('No result');
  const [open, setOpen] = useState(false);
  //   const [equipment, setEquipment] = useState();

  const constraints = {
    facingMode: { exact: 'environment' },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData('No result');
  };

  const onFindEquipment = (sn) => {
    const index = equipments.findIndex((e) => e.sn === sn);
    if (index !== -1) {
      setData(sn);
      onScanQR(equipments[index]);
      //   setEquipment(equipments[index]);
    }
  };

  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="fluent:qr-code-20-regular" />} onClick={handleClickOpen}>
        Scan QR
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">QR SCANNER</DialogTitle>
        <DialogContent>
          <Typography>Serial Number : {data}</Typography>
          {data === 'No result' ? (
            <QrReader
              constraints={constraints}
              onResult={(result, error) => {
                if (result !== undefined) {
                  onFindEquipment(result?.text);
                  // setData(result?.text);
                  console.log('scan', result?.text);
                }

                if (error !== undefined) {
                  console.info(error);
                }
              }}
              style={{ width: '50vw', heigth: '50vh' }}
              // style={{ width: '200px', heigth: '100px' }}
            />
          ) : (
            <>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={1} spacing={1}>
                <Button
                  // component={Link}
                  target="_blank"
                  // href="https://mantisdashboard.io"
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => onSelected('edit', equipment)}
                >
                  Edit
                </Button>
                <Button
                  // component={Link}
                  target="_blank"
                  // href="https://mantisdashboard.io"
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() => onSelected('history', equipment)}
                >
                  History
                </Button>
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
