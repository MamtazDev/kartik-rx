import React, { useContext } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { doctorName } from 'utils/patient';
import { BillItemTypes } from '../../BillItemTypes';
import _filter from 'lodash/filter';
import { BILL_TYPES } from '../../billTypes';
import { BillContext } from '../../commons';
import _find from 'lodash/find';

const useStyles = makeStyles()(() => ({
  serviceNameColumn: {
    minWidth: '200px',
  },
  consDoctorColumn: {
    minWidth: '200px',
  },
  body: {
    '& .MuiTableRow-root': {
      '& .MuiTableCell-root': {
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
      },
    },
  },
}));

const BillingTable = ({
  doctors,
  handleDelete,
  services,
  billSearch,
}) => {
  const { classes } = useStyles();
  const { selectedBillTypeRadio, setBillInstancesData, billinstancesdata } = useContext(BillContext);

  const servicesList = ((selectedBillTypeRadio === BILL_TYPES.LAB_SERVICE_BILL.identifier) || _find(billinstancesdata, { code: BillItemTypes.ROOM })) ? _filter(services, (service) => {
    return (service.type === BillItemTypes.LAB) || (service.type === BillItemTypes.CONSULTATION);
  }) : services;

  const columns = [
    { label: '#' },
    { label: 'Service\xa0Name', className: classes.serviceNameColumn },
    { label: 'Description', className: classes.serviceNameColumn },
    { label: 'Cons\xa0Dr\xa0Name', className: classes.consDoctorColumn },
    { label: 'Rate' },
    { label: 'Qty' },
    { label: 'Total' },
    { label: 'Disc\xa0%' },
    { label: 'Disc\xa0A.' },
    { label: 'Net\xa0Amount' },
    { label: '-', align: 'center' },
  ];

  const getAmounts = (dataType, value, obj) => {
    if (value < 0) {
      value = 0;
    }
    if (dataType === 'info.quantity') {
      obj.info.quantity = value;

      obj.discPerc = (100 * obj.discA) / obj.total || 0;
    }

    if (dataType === 'discPerc') {
      obj.discPerc = value;
      obj.discA = (obj.total * obj.discPerc) / 100;
    }
    if (dataType === 'discA') {
      obj.discA = value;
      obj.discPerc = ((100 * obj.discA) / obj.total).toFixed(2);
    }
    obj.total = obj.info.quantity * obj.info.rate;
    obj.netAmount = obj.total - obj.discA;
    return obj;
  };

  return (
    <PerfectScrollbar>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, key) => (
              <TableCell
                align={column.align}
                key={key}
                className={column.className}
                style={{
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                <Typography>
                  <Box component='span' fontWeight={700}>
                    {column.label}
                  </Box>
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={classes.body}>
          {_filter(billinstancesdata, (instance) => instance.instance_type != BillItemTypes.PAYMENT).map((data, index) => (
            <TableRow tabIndex={-1} key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Autocomplete
                  options={servicesList}
                  getOptionLabel={(option) =>
                    (option.description ? option.description : data?.services)}
                  value={data?.services}
                  onChange={(e, v) => { 
                    let temp = [...billinstancesdata];
                    temp[index].services = v ? v.description : '';
                    temp[index].description = v ? v.description : '';
                    temp[index].info.rate = v?.rate ? v.rate : 0;
                    temp[index].code = v?.code;
                    temp[index].info.quantity = v?.quantity ? v.quantity : 1;
                    temp[index].total = v?.quantity ? v.rate * v.quantity : v.rate;
                    temp[index].netAmount = v?.quantity ? v.rate * v.quantity : v.rate;
                    temp[index].disabled = (data.code === BillItemTypes.ROOM || data.code === BillItemTypes.ROOM_CONSULTATION);
                    temp[index].instance_type = v?.type;

                    setBillInstancesData(temp);
                  }}
                  disabled={billSearch || data.disabled}
                  renderInput={(params) => (
                    <TextField {...params} variant='standard' />
                  )}
                />
              </TableCell>

              <TableCell>
                <TextField
                  variant='standard'
                  value={data.description}
                  onChange={(e, v) => {
                    const temp = [...billinstancesdata];
                    temp[index].description = v;
                    setBillInstancesData(temp);
                  }}
                  disabled={billSearch || data.disabled}
                />
              </TableCell>

              <TableCell>
                <Autocomplete
                  options={doctors}
                  getOptionLabel={(option) => doctorName(option)}
                  value={data.consDr}
                  onChange={(e, v) => {
                    const temp = [...billinstancesdata];
                    temp[index].consDr = v;
                    setBillInstancesData(temp);
                  }}
                  disabled={billSearch || data.disabled}
                  renderInput={(params) => (
                    <TextField {...params} variant='standard' />
                  )}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant='standard'
                  type='number'
                  disabled={true}
                  value={data.info?.rate}
                  style={{ width: '60px' }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant='standard'
                  type='number'
                  name='info.quantity'
                  value={data.info?.quantity}
                  onChange={(e) => {
                    const temp = [...billinstancesdata];
                    temp[index] = getAmounts(
                      e.target.name,
                      e.target.value,
                      temp[index]
                    );

                    setBillInstancesData(temp);
                  }}
                  disabled={billSearch || data.disabled}
                  style={{ width: '40px' }}
                  placeholder='Qty'
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant='standard'
                  type='number'
                  disabled={true}
                  value={data.total}
                  style={{ width: '60px' }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant='standard'
                  type='number'
                  name='discPerc'
                  value={data.discPerc}
                  disabled={billSearch || data.disabled}
                  onChange={(e) => {
                    const temp = [...billinstancesdata];
                    temp[index] = getAmounts(
                      e.target.name,
                      e.target.value,
                      temp[index]
                    );
                    setBillInstancesData(temp);
                  }}
                  style={{ width: '50px' }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant='standard'
                  type='number'
                  name='discA'
                  value={data.discA}
                  disabled={billSearch || data.disabled}
                  onChange={(e) => {
                    const temp = [...billinstancesdata];
                    temp[index] = getAmounts(
                      e.target.name,
                      e.target.value,
                      temp[index]
                    );
                    setBillInstancesData(temp);
                  }}
                  style={{ width: '50px' }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant='standard'
                  type='number'
                  disabled={true}
                  value={data.netAmount}
                  style={{ width: '60px' }}
                />
              </TableCell>
              <TableCell align='center'>
                <IconButton onClick={() => handleDelete(index)} disabled={billSearch || data.disabled} size='large'>
                  <DeleteIcon style={{ fontSize: '20px' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PerfectScrollbar>
  );
};

export default BillingTable;
