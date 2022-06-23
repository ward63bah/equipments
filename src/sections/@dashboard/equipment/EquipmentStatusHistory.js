import * as React from 'react';
import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
  Link,
  Collapse,
  Box,
} from '@mui/material';
import Scrollbar from '../../../components/Scrollbar';
import EquipmentHistoryHead from './EquipmentHistoryHead';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'DATE', alignRight: false },
  { id: 'status', label: 'STATUS', alignRight: false },
  { id: 'description', label: 'DESCRIPTION', alignRight: false },
  // { id: 'delete', label: 'DELETE', alignRight: false },
];

export default function EquipmentStatusHistory(props) {
  const { equipment, equipmentsHistory, onCloseDialog } = props;
  const [open, setOpen] = React.useState(true);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');

  console.log('table', equipment, equipmentsHistory);

  const filtered = useMemo(() => {
    return equipmentsHistory
      .filter((e) => e.sn === equipment.sn)
      .map((e) => {
        return {
          ...e,
          date: e.date.toString(),
        };
      });
  }, [equipment, equipmentsHistory]);

  const [rowsPerPage, setRowsPerPage] = useState(filtered?.length);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCloseDialog();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filtered.length) : 0;
  const isNotFound = filtered.length === 0;

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
        <DialogTitle id="alert-dialog-title">{equipment.name} HISTORY</DialogTitle>
        <DialogContent>
          <Container maxWidth="xl" fixed>
            <Card>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800, maxHeight: 500 }}>
                  <Table stickyHeader>
                    <EquipmentHistoryHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={filtered.length}
                      // numSelected={selected.length}
                    />
                    <TableBody>
                      {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { date, status, description } = row;
                        // const isItemSelected = selected.indexOf(sn) !== -1;

                        return (
                          <>
                            <TableRow
                              hover
                              key={date}
                              tabIndex={-1}
                              role="checkbox"
                              // selected={isItemSelected}
                              // aria-checked={isItemSelected}
                            >
                              <TableCell component="th" id={date} scope="row" align="left">
                                {date}
                              </TableCell>
                              <TableCell align="left">{status}</TableCell>
                              <TableCell align="left">{description}</TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            {/* <SearchNotFound searchQuery={filterName} /> */}
                            No data history
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 30]}
                component="div"
                count={filtered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
