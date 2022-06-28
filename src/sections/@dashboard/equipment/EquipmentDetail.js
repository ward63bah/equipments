import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Grid, Card, TextField, Stack } from '@mui/material';
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
            color: 'white',
            background: 'red',
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

  console.log('equipment', equipment, latest);

  function importAll(r) {
    const images = {};
    r.keys().map((item, index) => {
      images[item.replace('./', '')] = r(item);
      return images;
    });
    return images;
  }
  const images = importAll(require.context('./../../../img/EQUIPMENT', false, /\.(png|jpe?g|svg|jpeg|jpg)$/));

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
  const [curDate, setCurDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleUpdateEquipment = () => {
    if (curDate && status !== '') {
      onUpdateEquipment({ ...equipment, status, date: curDate, description });
      onCloseDialog();
    }
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
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h4">{equipment?.name}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} align="center">
              {/* <img src={picture} alt={equipment.name} /> */}
              <img
                src={images[`${equipment.sn}.jpg`]}
                alt={equipment?.name}
                style={{
                  width: '30vw',
                  maxHeight: '50vh',
                  align: 'center',
                  border: '1px solid gray',
                  borderRadius: 20,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  Serial Number
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField id="outlined-basic" label="" variant="outlined" value={equipment?.sn} disabled fullWidth />
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
                    value={equipment?.name}
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
                    defaultValue={latest?.status.toUpperCase()}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    defaultValue={latest?.date === undefined ? 'No data' : latest?.date}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    defaultValue={latest?.description === undefined ? 'No data' : latest?.description}
                    disabled
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            {latest.status !== 'out of service' && (
              <>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={2}
                  align="center"
                  style={{ alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}
                >
                  <Iconify icon="carbon:direction-straight-right" width={50} height={50} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                  <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      Change Status
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <EquipmentStatusSelector
                        latestStatus={latest?.status}
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
                        // value={format(curDate, 'yyyy-MM-dd')}
                        onChange={(e) => setCurDate(e.target.value)}
                        // onChange={(e) => {
                        //   const convert = new Date(e.target.value);
                        //   convert.setHours(23);
                        //   convert.setMinutes(59);
                        //   convert.setSeconds(59);
                        //   convert.setMilliseconds(999);
                        //   setCurDate(convert);
                        // }}
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
          {latest.status === 'out of service' ? (
            <Button autoFocus variant="contained" color="error" onClick={handleDeleteEquipment}>
              {/* <Button autoFocus variant="contained" color="error" onClick={handleUpdateEquipment}> */}
              Delete Equipment
            </Button>
          ) : (
            <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={1} spacing={1}>
              <Button onClick={handleUpdateEquipment} variant="contained" color="primary" fullWidth>
                Update Data
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">
                Close
              </Button>
            </Stack>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
