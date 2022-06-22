import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Grid, Card, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Iconify from '../../components/Iconify';

import EquipmentSelector from '../@dashboard/equipment/EquipmentSelector';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            // color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NewRepairing(props) {
  const { equipments, onAddRepairing } = props;
  const [open, setOpen] = useState(false);

  const [equipment, setEquipment] = useState('');
  const [repairingDate, setRepairingDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSelectedEquipment = useCallback(
    (sn) => {
      setEquipment(sn);
    },
    [setEquipment]
  );

  const onSubmit = () => {
    if (equipment !== '') {
      onAddRepairing({ sn: equipment, repairingDate, description });
      handleClose(true);
    }
  };

  return (
    <div>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        New repairing
      </Button>
      <Dialog onClose={handleClose} open={open} minWidth={'lg'}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add new repairing
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  Equipment
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <EquipmentSelector equipments={equipments} onSelectedEquipment={onSelectedEquipment} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  Repairing Date
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField id="outlined-basic" label="" variant="outlined" value={repairingDate} disabled fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  Description
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    type="text"
                    variant="outlined"
                    value={description}
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
