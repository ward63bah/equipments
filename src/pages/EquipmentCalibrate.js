import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
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
import { EquipmentListHead } from '../sections/@dashboard/equipment';
import { UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

// mock
// import { equipmentTypes } from '../_mock/equipment_types';
// import { equipments } from '../_mock/equipment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'NAME', alignRight: false },
  { id: 'status', label: 'STATUS', alignRight: false },
  { id: 'update', label: 'STATUS', alignRight: false },
  { id: 'history', label: 'VIEW', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function EquipmentCalibrate(props) {
  const { equipments, onSelected } = props;

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = equipments.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - equipments.length) : 0;

  const filteredEquipment = applySortFilter(equipments, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredEquipment.length === 0;

  return (
    <Page title="User">
      <Container maxWidth="xl" fixed>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Equipment Calibrate Status
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Calibrate
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <EquipmentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={equipments.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredEquipment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <>
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" id={id} scope="row" align="left">
                            <Link color="secondary" component={RouterLink} to="">
                              {id}
                            </Link>
                          </TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">
                            <Button
                              // component={Link}
                              target="_blank"
                              // href="https://mantisdashboard.io"
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => onSelected('', row)}
                              disabled
                            >
                              Available
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              // component={Link}
                              target="_blank"
                              // href="https://mantisdashboard.io"
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => onSelected('update', row)}
                            >
                              Update Status
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
                            >
                              View History
                            </Button>
                          </TableCell>
                          {/* <TableCell align="left">
                            <Button
                              // component={Link}
                              target="_blank"
                              // href="https://mantisdashboard.io"
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => onSelected('delete', row)}
                            >
                              Delete
                            </Button>
                          </TableCell> */}
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={equipments.length}
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
