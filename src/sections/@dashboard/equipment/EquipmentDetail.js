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
import Iconify from '../../../components/Iconify';

import EquipmentStatusSelector from './EquipmentStatusSelector';

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

export default function EquipmentDetail(props) {
  const { equipment, equipmentsHistory, onCloseDialog, onUpdateEquipment, onDeleteEquipment } = props;
  const [open, setOpen] = useState(true);

  const latest = useMemo(() => {
    const data = equipmentsHistory
      .filter((e) => e.sn === equipment.sn)
      .map((e) => {
        return {
          ...e,
          date: e.date.toString(),
        };
      });
    return data.length > 0 ? data[data.length - 1] : equipment;
  }, [equipment, equipmentsHistory]);

  function importAll(r) {
    const images = {};
    r.keys().map((item, index) => {
      images[item.replace('./', '')] = r(item);
      return images;
    });
    return images;
  }
  const images = importAll(require.context('./../../../img/EQUIPMENT', false, /\.(png|jpe?g|svg)$/));

  const handleClickOpen = () => {
    setOpen(true);
    onCloseDialog();
  };
  const handleClose = () => {
    setOpen(false);
    onCloseDialog();
  };

  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [curDate, setCurDate] = useState(new Date());

  const handleUpdateEquipment = () => {
    onUpdateEquipment({ ...equipment, status, date: curDate, description });
    onCloseDialog();
  };

  const handleDeleteEquipment = () => {
    // onDeleteEquipment(equipment.sn);
    onUpdateEquipment({ ...equipment, status: 'delete', date: curDate, description });
    onCloseDialog();
  };

  const statusColor = (status) => {
    let color = 'gray';
    if (status === 'available') {
      color = 'green';
    } else if (status === 'repairing') {
      color = 'orange';
    } else if (status === 'out of service') {
      color = 'red';
    } else {
      color = 'gray';
    }
    return color;
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog onClose={handleClose} open={open} maxWidth={'md'}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {equipment?.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} align="center">
              {/* <img src={picture} alt={equipment.name} /> */}
              <img
                src={images[`${equipment.sn}.jpg`]}
                alt={equipment.name}
                style={{ width: '30vw', maxHeight: '50vh', align: 'center' }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  Serial Number
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField id="outlined-basic" label="" variant="outlined" value={equipment.sn} disabled fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  Name
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={equipment.name}
                    disabled
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={equipment.status !== 'out of service' ? 5 : 12}>
              <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  Latest Status
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={latest ? latest.status.toUpperCase() : equipment.status.toUpperCase()}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={latest ? latest.date : new Date()}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={latest ? latest.description : '-'}
                    disabled
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            {equipment.status !== 'out of service' && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={2} style={{ alignItems: 'center', alignSelf: 'center' }}>
                  <Button variant="text" size="large" endIcon={<Iconify icon="carbon:direction-straight-right" />}>
                    Change
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                  <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      Change Status
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <EquipmentStatusSelector
                        latestStatus={equipment.status}
                        onFilterStatus={(status) => setStatus(status)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        id="outlined-basic"
                        type="date"
                        label=""
                        variant="outlined"
                        value={curDate}
                        onChange={(e) => setCurDate(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="description (optional)"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          {equipment.status === 'out of service' ? (
            <Button autoFocus variant="contained" color="error" onClick={handleDeleteEquipment}>
              {/* <Button autoFocus variant="contained" color="error" onClick={handleUpdateEquipment}> */}
              Delete Equipment
            </Button>
          ) : (
            <Button autoFocus onClick={handleUpdateEquipment} variant="contained" color="primary">
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
