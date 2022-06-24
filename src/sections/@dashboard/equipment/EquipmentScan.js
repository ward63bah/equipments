import React, { useCallback, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography, Stack } from '@mui/material';
import Iconify from '../../../components/Iconify';

export default function EquipmentScan(props) {
  const { equipment, equipments, onSelected, onScanQR, onDefaultPage } = props;
  const [data, setData] = useState('No result');
  const [open, setOpen] = useState(false);
  // const [matched, setMatched] = useState(false);
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
    onDefaultPage();
    // setMatched(false);
  };

  const onFindEquipment = (sn) => {
    const index = equipments.findIndex((e) => e.sn === sn);
    if (index !== -1) {
      setData(sn);
      // setMatched(true);
      onScanQR(index);
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
              style={{ width: '50vw', height: '50vh' }}
              scanDelay={500}
              // style={{ width: '200px', heigth: '100px' }}
            />
          ) : (
            <>
              {equipment !== undefined ? (
                <Stack alignItems="center" justifyContent="space-around" mb={1} spacing={1}>
                  <Typography variant={'h6'} style={{ color: 'green' }}>
                    Equipment Founded
                  </Typography>
                  <Typography>Serial Number : {equipment.sn}</Typography>
                  <Typography>Name : {equipment.name}</Typography>
                  <Button
                    // component={Link}
                    target="_blank"
                    // href="https://mantisdashboard.io"
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth
                    startIcon={<Iconify icon="bxs:message-square-edit" />}
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
                    size="medium"
                    fullWidth
                    startIcon={<Iconify icon="fa-solid:history" />}
                    onClick={() => onSelected('history', equipment)}
                  >
                    History
                  </Button>
                </Stack>
              ) : (
                <Stack alignItems="center" justifyContent="space-around" mb={1} spacing={1}>
                  <Typography variant={'h6'} style={{ color: 'red' }}>
                    Equipment not found
                  </Typography>
                </Stack>
              )}
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
