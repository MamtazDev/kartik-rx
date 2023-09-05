import React, { useEffect, useState } from 'react';
import { SearchWithDate } from 'components';
import { Box, Card, Typography, FormControl, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { TableView } from 'components/Table';
import BillModal from './components/BillModal';
import {BILL_DISCOUNT_STATUS} from 'utils/patient';
import _keys from 'lodash/keys';
import _filter from 'lodash/filter';
import Loader from 'atoms/Loader';
import { axiosInstance } from 'actions/helpers';
import { addEditObj } from 'utils/helpers/dataHelpers';
import PageHeaderWrapper from 'components/PageHeaderWrapper';

const TABLE_COLUMNS = [
  { id: 'patient_id', label: 'MR No.', align: 'center' },
  { id: 'ip_id', label: 'IP No.', align: 'center' },
  { id: 'patient.full_name', label: 'Patient Name', align: 'center' },
  { id: 'id', label: 'Bill No.', align: 'center' },
  { id: 'amount', label: 'Total Amount', align: 'center' },
  { id: 'discount.amount', label: 'Dis. Amount', align: 'center' },
];

const STATUS = _filter(_keys(BILL_DISCOUNT_STATUS), (item) => item !== 'UNKNOWN');

function DiscountRequests() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(BILL_DISCOUNT_STATUS.PENDING);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [openBill, setOpenBill] = useState(false);
  const [popUpData, setPopUpData] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const handleBillClose = () => setOpenBill(false);
  const handleBillOpen = (editObj) => {
    console.log(editObj);
    setPopUpData(editObj);
    setOpenBill(true);
  };

  const getActionButtons = () => {
    return [
      { 'label': 'View Bill', 'onClick': handleBillOpen, 'color': 'primary' }
    ];
  };

  const handlePendingRequest = async (id, result) => {
    setShowLoader(true);
    axiosInstance.post(`/billing/${id}/set_discount_status/${result}`, {})
      .then((res) => {
        setOpenBill(false);
        setDiscountTableData(value);
      })
      .catch((err) => {
        console.log(err);
        setShowLoader(false);
      });
  };

  const setDiscountTableData = (discountStatus) => {
    setShowLoader(true);
    axiosInstance.get(`/billing/discount_status/${discountStatus}`)
      .then((res) => {
        setData(addEditObj(res.data));
        setShowLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setShowLoader(false);
      });
  };

  const handleChangeStatus = (e) => {
    setShowLoader(true);
    setValue(e.target.value);
    setDiscountTableData(e.target.value);
  };

  useEffect(() => {
    setDiscountTableData(BILL_DISCOUNT_STATUS.PENDING);
  }, []);

  return (
    <PageHeaderWrapper title='Discount Requests' heading='Billing' subHeading='Discount Requests' >
      {/* <SearchWithDate fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} /> */}

      <Card sx={{mt: 1}}>
        <Box p={2} sx={{ width: '100%', typography: 'body1' }}>
          <FormControl component='fieldset' style={{ width: '100%' }}>
            <FormLabel component='legend'>
              <Typography variant='h5'>Discount Status</Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-label='discountStatus'
              name='discountStatus'
              value={value}
              onChange={handleChangeStatus}
              style={{ width: '100%' }}
            >
              <Grid
                container
                item
                xs={12}
                direction='row'
                alignItems='flex-start'
              >
                {
                  STATUS.map((test) => {
                    return (
                      <FormControlLabel
                        key={test}
                        value={test}
                        control={<Radio />}
                        label={test}
                      />
                    );
                  })
                }
              </Grid>
            </RadioGroup>
          </FormControl>
          <TableView
            columns={TABLE_COLUMNS}
            tableData={data}
            loaded={true}
            displayPagination={false}
            actionButtons={getActionButtons()}
          />
        </Box>
      </Card>

      <BillModal
        open={openBill}
        onClose={handleBillClose}
        popUpData={popUpData}
        handlePendingRequest={handlePendingRequest}
      />

      {showLoader && <Loader />}
    </PageHeaderWrapper>
  );
}

export default DiscountRequests;