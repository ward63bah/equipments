import { faker } from '@faker-js/faker';
import { filter, orderBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import EquipmentCalibrate from './EquipmentCalibrate';
import EquipmentDetail from '../sections/@dashboard/equipment/EquipmentDetail';
import EquipmentScan from '../sections/@dashboard/equipment/EquipmentScan';
import EquipmentFromLink from '../sections/@dashboard/equipment/EquipmentFromLink';
import Equipment from './Equipment';
import EquipmentListToolbar from '../sections/@dashboard/equipment/EquipmentListToolbar';
import EquipmentTypeSelector from '../sections/@dashboard/equipment_type/EquipmentTypeSelector';
import EquipmentStatusSelector from '../sections/@dashboard/equipment/EquipmentStatusSelector';
import NewRepairing from '../sections/repairing/NewRepairing';
import EquipmentStatusHistory from '../sections/@dashboard/equipment/EquipmentStatusHistory';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// mock
import { equipments as _equipments } from '../_mock/equipment';
import { equipmentTypes } from '../_mock/equipment_types';

function descendingComparator(a, b, orderBy) {
  console.log('type/status/name', a, b, orderBy);
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

function applySortFilter(orderBy, array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    if (orderBy === 'name') {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    if (orderBy === 'sn') {
      return filter(array, (_user) => _user.sn.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const { sn } = useParams();
  const navigate = useNavigate();
  // const { location } = useLocation();
  console.log('sn', sn);

  const [show, setShow] = useState(false);
  const [fromLink, setFromLink] = useState(false);
  const [state, setState] = useState('');
  const [equipment, setEquipment] = useState();
  const [equipments, setEquipments] = useState(_equipments);
  const [equipmentsHistory, setEquipmentsHistory] = useState([]);

  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filtered, setFiltered] = useState(_equipments);

  console.log('equipments', equipments);
  useEffect(() => {
    if (sn !== undefined) {
      const index = equipments.findIndex((e) => e.sn === sn);
      if (index !== -1) {
        // onSelected('edit', equipments[index]);
        setEquipment(equipments[index]);
      }
      setFromLink(true);
    }
  }, [sn, setEquipment, setFromLink]);

  const handleFilterByType = useCallback(
    (type) => {
      let updateFiltered = [];
      if (type !== '') {
        updateFiltered = equipments.filter((e) => e.typeId === type);
      } else {
        updateFiltered = equipments;
      }
      if (filterStatus !== '') {
        updateFiltered = updateFiltered.filter((e) => e.status === filterStatus);
      }
      setFilterType(type);
      setFiltered(updateFiltered);
      console.log('filter', updateFiltered);
    },
    [setFilterType, setFiltered, equipments, filterStatus]
  );

  const handleFilterByStatus = useCallback(
    (status) => {
      console.log('status', status);
      let updateFiltered = [];
      if (status !== '') {
        updateFiltered = equipments.filter((e) => e.status === status);
      } else {
        updateFiltered = equipments;
      }
      if (filterType !== '') {
        updateFiltered = updateFiltered.filter((e) => e.typeId === filterType);
      }
      setFilterStatus(status);
      setFiltered(updateFiltered);
      console.log('filter', updateFiltered);
    },
    [setFilterStatus, setFiltered, equipments, filterType]
  );

  const handleFilterByName = useCallback(
    (event, order, orderBy) => {
      if (filterType !== '' || filterStatus !== '') {
        setFiltered(applySortFilter(orderBy, filtered, getComparator(order, orderBy), event.target.value));
      } else {
        setFiltered(applySortFilter(orderBy, equipments, getComparator(order, orderBy), event.target.value));
      }
      setFilterName(event.target.value);
      setOrder(order);
      setOrderBy(orderBy);
      // console.log('filter', );
    },
    [setFilterName, setOrder, setOrderBy, setFiltered, equipments, filtered]
  );

  const handleUpdateEquipment = useCallback(
    (obj) => {
      const index = equipments.findIndex((e) => e.sn === obj.sn);
      if (index !== -1) {
        const convertDate = new Date(obj.date).toISOString().split('T')[0];
        setEquipmentsHistory([
          ...equipmentsHistory,
          { sn: obj.sn, status: obj.status, date: convertDate, description: obj.description },
        ]);
        const updateData = [
          ...equipments.slice(0, index),
          { ...obj, status: obj.status },
          ...equipments.slice(index + 1),
        ];
        setEquipments(updateData);

        let updateFiltered = [];
        if (filterType !== '') {
          updateFiltered = updateData.filter((e) => e.typeId === filterType);
        } else {
          updateFiltered = updateData.filter((e) => e.type !== '');
        }
        if (filterStatus !== '') {
          updateFiltered = updateFiltered.filter((e) => e.status === filterStatus);
        } else {
          updateFiltered = updateFiltered.filter((e) => e.status !== '');
        }
        setFiltered(updateFiltered);
        console.log('update', updateData);
      }
    },
    [setEquipmentsHistory, equipmentsHistory, equipments, setEquipments, filterType, filterName, setFiltered]
  );

  const handleDeleteEquipment = useCallback(
    (sn) => {
      const index = equipments.findIndex((e) => e.sn === sn);
      if (index !== -1) {
        const updateData = equipments.filter((e) => e.sn !== sn);
        setEquipments(updateData);
      }
    },
    [equipments, setEquipments]
  );

  const onSelected = useCallback(
    (state, equipment) => {
      setState(state);
      setEquipment(equipment);
      setShow(true);
    },
    [setState, setEquipment, setShow]
  );

  const handleScanQR = useCallback(
    (index) => {
      setEquipment(equipments[index]);
    },
    [setEquipment, equipments]
  );

  const onDefaultPage = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  const onCloseDialog = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        {/* <Typography variant="h3" sx={{ mb: 3 }}>
          Welcome
        </Typography> */}

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={12} md={4} lg={4}>
            <AppWidgetSummary title="All Equipment" total={equipments?.length} icon={'maki:doctor'} />
          </Grid> */}
          {/* 
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <AppWidgetSummary
              title="Available"
              total={_equipments?.filter((e) => e.status === 'available').length}
              color="success"
              icon={'fluent:presence-available-10-filled'}
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={12} md={2} lg={2}>
            <AppWidgetSummary
              title="Repairing"
              total={equipments?.filter((e) => e.status === 'repairing').length}
              color="warning"
              icon={'icon-park-solid:repair'}
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={12} md={2} lg={2}>
            <AppWidgetSummary
              title="Out Of Service"
              total={equipments?.filter((e) => e.status === 'out of service').length}
              color="error"
              icon={'clarity:no-access-solid'}
            />
          </Grid> */}
          {/* 
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <AppWidgetSummary
              title="Delete"
              total={equipments?.filter((e) => e.status === 'delete').length}
              color="info"
              icon={'fluent:delete-20-filled'}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={12} lg={12} align="right">
            <EquipmentScan
              equipment={equipment}
              equipments={equipments}
              onSelected={onSelected}
              onScanQR={handleScanQR}
              onDefaultPage={onDefaultPage}
            />
          </Grid> */}

          <Grid item xs={12} md={12} lg={12}>
            {/* <EquipmentTypes onSelected={onSelected} /> */}
            <Equipment
              equipment={equipment}
              equipments={equipments}
              filtered={filtered}
              equipmentTypes={equipmentTypes}
              filterName={filterName}
              selected={selected}
              onSelected={onSelected}
              onFilterType={handleFilterByType}
              onFilterStatus={handleFilterByStatus}
              onFilterName={handleFilterByName}
              onScanQR={handleScanQR}
            />
            {fromLink === true && (
              <EquipmentFromLink equipment={equipment} onSelected={onSelected} onDefaultPage={onDefaultPage} />
            )}
            {show && state === 'edit' && (
              <EquipmentDetail
                equipment={equipment}
                equipmentsHistory={equipmentsHistory}
                onCloseDialog={onCloseDialog}
                onUpdateEquipment={handleUpdateEquipment}
                onDeleteEquipment={handleDeleteEquipment}
              />
            )}
            {show && state === 'history' && (
              <EquipmentStatusHistory
                equipment={equipment}
                equipmentsHistory={equipmentsHistory}
                onCloseDialog={onCloseDialog}
              />
            )}
            {/* <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            /> */}
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
