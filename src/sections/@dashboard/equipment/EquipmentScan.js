import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import Iconify from '../../../components/Iconify';

export default function EquipmentScan(props) {
  const [data, setData] = useState('No result');
  const [open, setOpen] = useState(false);
  const constraints = {
    facingMode: { exact: 'environment' },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        Scan
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
          <p>{data}</p>
          <QrReader
            constraints={constraints}
            onResult={(result, error) => {
              if (!result) {
                setData(result?.text);
                console.log('scan', result);
              }

              if (!error) {
                console.info(error);
              }
            }}
            style={{ width: '50vw', heigth: '50vh' }}
            // style={{ width: '200px', heigth: '100px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
