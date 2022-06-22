import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useCallback } from 'react';
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
import EquipmentDialog from '../sections/@dashboard/equipment/EquipmentDialog';
import EquipmentListToolbar from '../sections/@dashboard/equipment/EquipmentListToolbar';
import EquipmentListHead from '../sections/@dashboard/equipment/EquipmentListHead';
import EquipmentTypeSelector from '../sections/@dashboard/equipment_type/EquipmentTypeSelector';

// mock
// import { equipmentTypes } from '../_mock/equipment_types';
// import { equipments } from '../_mock/equipment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'type', label: 'TYPE', alignRight: false },
  { id: 'id', label: 'SN', alignRight: false },
  { id: 'name', label: 'NAME', alignRight: false },
  { id: 'status', label: 'STATUS', alignRight: false },
  { id: 'edit', label: 'EDIT', alignRight: false },
  { id: 'history', label: 'HISTORY', alignRight: false },
  // { id: 'delete', label: 'DELETE', alignRight: false },
];

// ----------------------------------------------------------------------

export default function Equipment(props) {
  const { equipments, equipmentTypes, filterName, selected, onSelected } = props;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(equipments?.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - equipments.length) : 0;
  const isUserNotFound = equipments.length === 0;

  return (
    <Page title="User">
      <Container maxWidth="xl" fixed>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Equipments
          </Typography>
        </Stack>

        <Card>
          {/* <EquipmentListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <EquipmentTypeSelector equipmentTypes={equipmentTypes} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, maxHeight: 500 }}>
              <Table>
                <EquipmentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={equipments.length}
                  // numSelected={selected.length}
                />
                <TableBody>
                  {equipments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                          <TableCell align="left">{equipmentTypes?.find((e) => e.id === typeId)?.name}</TableCell>
                          <TableCell component="th" id={sn} scope="row" align="left">
                            {sn}
                          </TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{status}</TableCell>
                          <TableCell align="left">
                            <Button
                              // component={Link}
                              target="_blank"
                              // href="https://mantisdashboard.io"
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => onSelected('edit', row)}
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
