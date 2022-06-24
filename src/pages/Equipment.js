import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useCallback, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Grid,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import EquipmentDialog from '../sections/@dashboard/equipment/EquipmentDialog';
import EquipmentListToolbar from '../sections/@dashboard/equipment/EquipmentListToolbar';
import EquipmentListHead from '../sections/@dashboard/equipment/EquipmentListHead';
import EquipmentTypeSelector from '../sections/@dashboard/equipment_type/EquipmentTypeSelector';
import EquipmentStatusSelector from '../sections/@dashboard/equipment/EquipmentStatusSelector';
import EquipmentScan from '../sections/@dashboard/equipment/EquipmentScan';

// mock
// import { equipmentTypes } from '../_mock/equipment_types';
// import { equipments } from '../_mock/equipment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'type-id', label: 'TYPE ID', alignRight: false },
  { id: 'type', label: 'TYPE NAME', alignRight: false },
  { id: 'id', label: 'SN', alignRight: false },
  { id: 'name', label: 'NAME', alignRight: false },
  { id: 'status', label: 'STATUS', alignRight: false },
  { id: 'edit', label: 'EDIT', alignRight: false },
  { id: 'history', label: 'HISTORY', alignRight: false },
  // { id: 'delete', label: 'DELETE', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Equipment(props) {
  const {
    equipment,
    equipments,
    equipmentTypes,
    filtered,
    filterName,
    selected,
    onSelected,
    onFilterType,
    onFilterStatus,
    onFilterName,
    onScanQR,
  } = props;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(filtered?.length);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filtered.length) : 0;
  const isUserNotFound = filtered.length === 0;

  return (
    <Page title="User">
      <Container maxWidth="xl" fixed>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h3" gutterBottom>
            Equipments
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={2} spacing={1}>
          {/* <EquipmentScan equipment={equipment} equipments={equipments} onSelected={onSelected} onScanQR={onScanQR} /> */}
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Equipment
          </Button>
        </Stack>

        <Grid item container xs={12} sm={12} md={12} lg={12} justifyContent="flex-start">
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={1} spacing={1}>
              <Typography variant="h6" gutterBottom>
                Type :
              </Typography>
              <EquipmentTypeSelector equipmentTypes={equipmentTypes} onFilterType={onFilterType} />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={1} spacing={1}>
              <Typography variant="h6" gutterBottom>
                Status :
              </Typography>
              <EquipmentStatusSelector onFilterStatus={onFilterStatus} />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={1} spacing={1}>
              <Typography variant="h6" gutterBottom>
                Search By :
              </Typography>
              <FormControl onChange={(e) => setOrderBy(e.target.value)}>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel value="sn" control={<Radio />} label="SN" />
                  <FormControlLabel value="name" control={<Radio />} label="Name" />
                </RadioGroup>
              </FormControl>
              <EquipmentListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={(e) => onFilterName(e, order, orderBy)}
              />
            </Stack>
          </Grid>
        </Grid>
        {/* <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={1} spacing={1}>
          <Typography variant="h6" gutterBottom>
            Type :
          </Typography>
          <EquipmentTypeSelector equipmentTypes={equipmentTypes} onFilterType={onFilterType} />
          <Typography variant="h6" gutterBottom>
            Status :
          </Typography>
          <EquipmentStatusSelector onFilterStatus={onFilterStatus} />
          <Typography variant="h6" gutterBottom>
            Search By :
          </Typography>
          <FormControl onChange={(e) => setOrderBy(e.target.value)}>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel value="sn" control={<Radio />} label="SN" />
              <FormControlLabel value="name" control={<Radio />} label="Name" />
            </RadioGroup>
          </FormControl>
          <EquipmentListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={(e) => onFilterName(e, order, orderBy)}
          />
        </Stack> */}

        <Card>
          {/* <EquipmentListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <EquipmentTypeSelector equipmentTypes={equipmentTypes} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, maxHeight: 500 }}>
              <Table stickyHeader>
                <EquipmentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filtered.length}
                  // numSelected={selected.length}
                />
                <TableBody>
                  {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { sn, name, status, typeId } = row;
                    // const isItemSelected = selected.indexOf(sn) !== -1;

                    return (
                      <>
                        <TableRow
                          hover
                          key={sn}
                          tabIndex={-1}
                          role="checkbox"
                          // selected={isItemSelected}
                          // aria-checked={isItemSelected}
                        >
                          <TableCell align="left">
                            <Typography>{equipmentTypes?.find((e) => e.id === typeId)?.id}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>{equipmentTypes?.find((e) => e.id === typeId)?.name}</Typography>
                          </TableCell>
                          <TableCell component="th" id={sn} scope="row" align="left">
                            <Typography>{sn}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>{name}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography color={statusColor(status)}>
                              <Iconify icon="carbon:dot-mark" />
                              {status?.toUpperCase()}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              // component={Link}
                              target="_blank"
                              // href="https://mantisdashboard.io"
                              variant="contained"
                              color="primary"
                              size="small"
                              disabled={status === 'delete'}
                              onClick={() => onSelected('edit', row)}
                              startIcon={<Iconify icon="bxs:message-square-edit" />}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              // component={Link}
                              target="_blank"
                              // href="https://mantisdashboard.io"
                              variant="contained"
                              color="warning"
                              size="small"
                              onClick={() => onSelected('history', row)}
                              startIcon={<Iconify icon="fa-solid:history" />}
                            >
                              History
                            </Button>
                          </TableCell>
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

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
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
    </Page>
  );
}
