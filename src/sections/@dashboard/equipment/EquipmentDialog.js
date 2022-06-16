import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EquipmentDialog({ state, selected, openDialog, onCloseDialog }) {
  const [open, setOpen] = React.useState(openDialog);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCloseDialog();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          <Button
            variant={'contained'}
            // color={state === 'detail' ? 'success' : state === 'history' ? 'warning' : 'error'}
          >
            {state}
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selected.SN} {selected.NAME}
          </DialogContentText>
          {/* {state === 'edit'
            ? `This dialog will show and edit equipment`
            : state === 'history'
            ? `This dialog will show calibrate history table`
            : `This dialog will require your confirm to delete equipment`} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
