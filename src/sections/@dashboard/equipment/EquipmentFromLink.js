import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography, Stack } from '@mui/material';
import Iconify from '../../../components/Iconify';

export default function EquipmentFromLink(props) {
  const { equipment, onSelected, onDefaultPage } = props;
  const [open, setOpen] = useState(true);
  //   const [equipment, setEquipment] = useState();
  console.log('scan', equipment);

  const handleClose = () => {
    setOpen(false);
    onDefaultPage();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h4">QR SCANNER</Typography>
        </DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant={'contained'} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
