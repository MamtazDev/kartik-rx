import React, { useEffect, useState, useCallback, useContext } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Page } from 'components';
import Header from 'components/Header';
import {
  BillDetails,
  BillingForm,
  BillParticulars,
  BillSummary,
  BillTypeSelection,
} from './Components';

import uuid from 'uuid/v1';
import { Button, ButtonGroup } from '@mui/material';
import { axiosInstance } from 'actions/helpers';

import PreviousBillDetails from './Components/PreviousBillDetails';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router';
import { PATIENT_TYPE, patientName, BILL_DISCOUNT_STATUS } from 'utils/patient';
import SnackbarCustom from 'atoms/snackbar';
import { getSnackbarErrorObj, INITIAL_SNACKBAR_DATA } from 'atoms/snackbar/helpers';
import _map from 'lodash/map';
import _find from 'lodash/find';
import { calculateAge, timestampToAppDateTime } from 'utils/time';
import { useSearchParams } from 'react-router-dom';
import { prepareCreateBillData, getDefaultBillInstancesData, getDefaultBillData, prepareCreateFinalBillData } from './helpers';
import ListDetailsDialog from 'molecules/Dialogs/ListDetailsDialog';
import { BillContext } from './commons';
import { LoaderContext, SnackbarContext } from 'globalContexts';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import PaymentDialog from 'views/Billing/CreateIPOPLab/Components/PaymentDialog';
import { BILL_TYPES } from './billTypes';
import { getAmount } from './getAmount';
import { BillItemTypes } from './BillItemTypes';
import { calculateDaysBetween } from './CalculateDaysBetween';
import _filter from 'lodash/filter';
import PrintInvoice from '../CreateInvoice/FinalBill/FinalBill';
import IpOpBill from '../CreateInvoice/IpOpBill/IpOpBill';
import AdvanceBill from '../CreateInvoice/AdvanceBill/AdvanceBill';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(2, 2, 2, 3),
  },
  cardStyle: {
    marginTop: theme.spacing(1),
  },
  gridStyle: {
    spacing: '{2}',
  },
  cardContentStyle: {
    marginTop: theme.spacing(-2),
  },
  divStyle: {
    padding: 0,
  },
  ButtonStyle: {
    marginTop: theme.spacing(1),
  },
  dialogCloseButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  statsContainer: {
    width: '100%',
    padding: '0',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    gridGap: '0',
    border: `1px solid ${theme.palette.divider}`,
    borderRight: '0px',
  },
  statsItem: {
    padding: theme.spacing(1),
    flexGrow: 1,
    borderRight: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    fontSize: '.75rem',
  },
}));

const defaultPatientDetails = {
  name: '',
  mother_name: '',
  id: 0,
  age: '',
  sex: '',
  phone: '',
  address: '',
  ip: {
    admissionTimeandDate: '',
  },
  roomType: '',
  ipNo: '',
  assigned_room: {
    name: '',
    type: '',
    amount: 0,
    room_type: {
      name: '',
    },
  },
};

const getConsDoctorFromPatientData = (patientData) => {
  if (!patientData) return null;

  if (patientData.ip) {
    return patientData.ip.doctor;
  }
  return patientData.op.doctor;
};

const CreateIPOPLab = (props) => {
  const { classes } = useStyles();
  const { search } = useLocation();
  const history = useHistory();
  const urlParams = new URLSearchParams(props.location.search);

  const getDetailsFromQuery = () => {
    return {
      mrNo: urlParams.get('mrNo'),
      ipNo: urlParams.get('ipNo'),
      billNo: urlParams.get('billNo'),
    };
  };

  const billSearchViaUrl = getDetailsFromQuery();

  const [patientType, setPatientType] = useState(PATIENT_TYPE.OP);
  const [headData, setHeadData] = useState({
    mrNo: '',
    ipNo: '',
    consDoctor: '',
    refDoctor: '',
    disabled: false,
  });
  const [services, setServices] = useState([]);
  // const [rooms, setRooms] = useState([]);
  const [pendingAndAdvance, setPendingAndAdvance] = useState({
    room_bills: [],
    advance_bills: [],
    pharmacy_services_bills: [],
  });
  const [doctors, setDoctors] = useState([]);
  const [managers, setManagers] = useState([]);
  const [showPreviousBill, setShowPreviousBill] = useState(false);
  const [patientData, setPatientData] = useState({ ...defaultPatientDetails });
  const [searchBill, setSearchBill] = useState('');
  const [billSearch, setBillSearch] = useState(false);
  const [billinstancesdata, setBillInstancesData] = useState([getDefaultBillInstancesData()]);
  const [billdata, setBillData] = useState(getDefaultBillData());
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [showListDetailsDialog, setShowListDetailsDialog] = useState(false);
  const [listDetailsDialogData, setListDetailsDialogData] = useState({ onClick: () => { }, listData: [] });
  const [paymentType, setPaymentType] = useState('');
  const [payableAmount, setPayableAmount] = useState(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [selectedBillTypeRadio, setSelectedBillTypeRadio] = useState(BILL_TYPES.LAB_SERVICE_BILL.identifier);

  const patientBlockedStatus = patientData.ip.discharged_at ? true : false;
  const finalBillIsPresent = _find(pendingAndAdvance.lab_and_services_bills, {bill_type: BILL_TYPES.FINAL_BILL.identifier}) ? true : false ;

  const { setShowLoader } = useContext(LoaderContext);
  const { setSnackbarData } = useContext(SnackbarContext);
  const patientIpNo = patientData.ipNo ? patientData.ipNo : billSearchViaUrl.ipNo;

  const filteredLabService = _filter(pendingAndAdvance.lab_and_services_bills, (item) => item.bill_type !== BILL_TYPES.FINAL_BILL.identifier);

  const pendingRoom = (getAmount({ data: pendingAndAdvance.room_bills, key: 'room_amount' }) + getAmount({ data: pendingAndAdvance.room_bills, key: 'room.consultation_charges' })) * calculateDaysBetween(pendingAndAdvance.room_bills[0]?.startdate, pendingAndAdvance.room_bills[0]?.enddate);
  const paidAdvance = getAmount({ data: pendingAndAdvance.advance_bills, key: 'amount' }) - getAmount({ data: pendingAndAdvance.advance_bills, key: 'remaining_amount' });
  const pendingAdvance = getAmount({ data: pendingAndAdvance.advance_bills, key: 'remaining_amount' });
  const pendingLabService = getAmount({ data: filteredLabService, key: 'remaining_amount' });
  const discountAmount = billdata.discount_status === BILL_DISCOUNT_STATUS.APPROVED ? billdata.discount.amount : 0;
  const paymentModeUsed = billdata?.instances[ billdata.instances.length - 1]?.info.payment_mode;

  useEffect(() => {
    paymentModeUsed && setPaymentType(paymentModeUsed);
  }, [paymentModeUsed]);

  const hospitalInfo = {
    name: 'SRI KRISHNA CHILDREN HOSPITAL',
    address: '(A unit of Bhavitha Healthcare Pvt Ltd) 2-7-730, CENTRAL EXCISE COLONY, OPP. SUBEDARI P.S, SUBEDARI, WARANGAL-506001',
    contactno: '0870-2447291,2447292',
    gstno: 'GST No :36AACCB7112M1Z0',
  };

  let billRemainingAmount;
  if(selectedBillTypeRadio === BILL_TYPES.FINAL_BILL.identifier) 
    billRemainingAmount = billdata.amount - discountAmount - paidAdvance;
  else 
    billRemainingAmount = billdata.amount - billdata.discount.amount;

  const handleCancel = () => {
    setShowPreviousBill(false);
    setHeadData({
      mrNo: '',
      ipNo: '',
      billNo: '',
      consDoctor: '',
      refDoctor: '',
      disabled: false,
    });
    setPatientData({ ...defaultPatientDetails });
    setBillInstancesData([getDefaultBillInstancesData()]);
    handleBillSearchCancel();
  };

  const axiosGetRequest = async (url, dataSetter) => {
    try {
      const { data } = await axiosInstance.get(url);
      dataSetter(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBillItems = async () => {
    try {
      const { data } = await axiosInstance.get('/billing/get_bill_items');

      const typeRoom = _find(data, { type: BillItemTypes.ROOM });
      typeRoom.rate = getAmount({ data: [pendingAndAdvance.room_bills[0]], key: 'room_amount' });
      typeRoom.description = 'Room Charges';
      typeRoom.quantity = calculateDaysBetween(pendingAndAdvance.room_bills[0]?.startdate, pendingAndAdvance.room_bills[0]?.enddate);

      const typeRoomConsultation = _find(data, { type: BillItemTypes.ROOM_CONSULTATION });
      typeRoomConsultation.rate = getAmount({ data: [pendingAndAdvance.room_bills[0]], key: 'room.consultation_charges' });
      typeRoomConsultation.description = 'Room Consultation Charges';
      typeRoomConsultation.quantity = calculateDaysBetween(pendingAndAdvance.room_bills[0]?.startdate, pendingAndAdvance.room_bills[0]?.enddate);

      setServices(data);
    } catch (err) {
      console.log(err);
    }
  };

  // const getServices = async () => axiosGetRequest('/billing/get_bill_items', setServices);
  const getDoctors = async () => axiosGetRequest('/doctors', setDoctors);
  const getManagers = async () => axiosGetRequest('/users/managers', setManagers);

  const handleBillSearchCancel = () => {
    setBillSearch(false);
    setSearchBill('');
    setBillInstancesData([getDefaultBillInstancesData()]);
  };


  const handleBillSearch = async (billId) => {
    let searchBillId = billId ? billId : searchBill;
    setSearchBill(searchBillId);
    setShowLoader(true);
    try {
      if (!searchBillId) {
        setSnackbarData({ ...getSnackbarErrorObj('Please enter bill id') });
        return;
      }
      const { data } = await axiosInstance.get(`/billing/${searchBillId}/for_patient/${patientData.patient_id}`);
      setBillSearch(true);
      setBillData(data);
      setSelectedBillTypeRadio(data.bill_type);

      setBillInstancesData(
        data.instances.map((data) => {
          let discountAmount = data.discount_amount;
          let total = data.info.rate * data.info.quantity;
          // TODO : (sahillede940) : changed service to description as service is not present in the response
          return {
            ...data,
            services: data.description,
            code: data.info.code,
            netAmount: total - discountAmount,
            total: total,
            discPerc: 0,
            discA: discountAmount,
          };
        })
      );
      setShowLoader(false);
    } catch (error) {
      if (error.response.data?.detail) {
        setSnackbarData({ ...getSnackbarErrorObj(error.response.data.detail) });
      } else {
        setSnackbarData({ ...getSnackbarErrorObj('Something went wrong') });
      }
      setShowLoader(false);
      console.log(error);
    }
  };

  const handleCreateBill = async () => {
    try {
      const data = prepareCreateBillData({ ...patientData, instances: [...billinstancesdata], discount: {} });
      
      const resp = await axiosInstance.post('/billing/create_bill', data);
      setShowListDetailsDialog(true);
      setListDetailsDialogData({
        onClick: () => {
          if (patientIpNo) history.push(`/create_ip_op_lab?billNo=${resp.data.id}&ipNo=${patientIpNo}`);
          else history.push(`/create_ip_op_lab?billNo=${resp.data.id}&mrNo=${patientData.id}`);
          window.location.reload();
        },
        listData: [
          { label: 'Bill ID', value: resp.data.id },
          { label: 'Patient MrNo', value: patientData.id },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateFinalBill = async () => {
    try {
      const data = prepareCreateFinalBillData({ ...patientData, instances: [...billinstancesdata], discount: {} });

      const resp = await axiosInstance.post('/billing/create_bill', data);
      setShowListDetailsDialog(true);
      setListDetailsDialogData({
        onClick: () => {
          if (patientIpNo) history.push(`/create_ip_op_lab?billNo=${resp.data.id}&ipNo=${patientIpNo}`);
          else history.push(`/create_ip_op_lab?billNo=${resp.data.id}&mrNo=${patientData.id}`);
          window.location.reload();
        },
        listData: [
          { label: 'Bill ID', value: resp.data.id },
          { label: 'Patient MrNo', value: patientData.id },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdvanceBill = async (advanceBillAmount) => {
    try {
      const data = {
        patient_id: patientData.id,
        ip_id: patientIpNo,
        active: true,
        description: '',
        bill_type: BILL_TYPES.ADVANCE_BILL.identifier,
        amount: advanceBillAmount,
        remaining_amount: 0,
        discount_status: BILL_DISCOUNT_STATUS.UNKNOWN,
        discount: {},
        instances: [],
      };
      const resp = await axiosInstance.post('/billing/create_bill', data);
      setShowListDetailsDialog(true);
      setListDetailsDialogData({
        onClick: () => {
          history.push(`/create_ip_op_lab?billNo=${resp.data.id}&ipNo=${patientIpNo}`);
          window.location.reload();
        },
        listData: [
          { label: 'Bill ID', value: resp.data.id },
          { label: 'Patient MrNo', value: patientData.id },
        ],
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSetPaymentDetailsBill = async (props) => {
    try {
      const paytype = paymentType.toUpperCase();
      const data = {
        payment_id: Number(transactionId),
        payment_mode: paytype,
        payment_amount: Number(billRemainingAmount)
      };
      const resp = await axiosInstance.post(`/billing/${searchBill}/set_payment_details`, data);
      setShowPaymentDialog(false);
      setShowPaymentDetails(true);

      const { data: _data } = resp;
      setListDetailsDialogData({
        onClick: () => {
          if (patientIpNo) history.push(`/create_ip_op_lab?billNo=${_data.bill_id}&ipNo=${patientIpNo}`);
          else history.push(`/create_ip_op_lab?billNo=${_data.bill_id}&mrNo=${patientData.id}`);
          window.location.reload();
        },
        listData: [
          { label: 'Bill ID', value: _data.bill_id },
          { label: 'Patient MrNo', value: patientData.id },
          { label: 'Paid Amount', value: _data.amount },
          { label: 'Payment Mode', value: _data.info.payment_mode },
          { label: 'Transaction Id', value: _data.info.payment_id },
        ],
      });
    } catch (err) {
      console.log('err', err);
    }
  };


  const handleSearch = useCallback(async (passedData) => {
    let data;
    let finalPatientType = passedData?.patientType ? passedData?.patientType : patientType;
    let finalMrNo = passedData?.mrNo ? passedData?.mrNo : headData.mrNo;
    let finalIpNo = passedData?.ipNo ? passedData?.ipNo : headData.ipNo;
    setShowLoader(true);

    try {
      const searchQueryParams = finalPatientType === PATIENT_TYPE.OP ? { mrno: finalMrNo } : { ipno: finalIpNo };
      data = await axiosInstance.post('/patients/search', searchQueryParams);
      if (data.data.length === 0) {
        setSnackbarData({ ...getSnackbarErrorObj('No patient found') });
        setShowLoader(false);
        return;
      }

      if (finalPatientType === PATIENT_TYPE.IP) {
        const { data: pendingAndAdvance } = await axiosInstance.get(
          `billing/active_bills_segregated/${finalIpNo}`
        );
        setPendingAndAdvance(pendingAndAdvance);
      }

      if (data.data.length === 0) {
        setSnackbarData({ ...getSnackbarErrorObj('No patient found') });
        setShowLoader(false);
        return;
      }

      let req;
      if(data.data[0].ipopno) {
        req = axiosInstance.get(
          `/patients/ipop_patient_with_details/${data.data[0].ipopno}`
        );
      } else {  
        req = axiosInstance.get(
          `/patients/patient_with_details/${data.data[0].id}`
        );
      }

      const { data: patientData } = await req;

      setHeadData((current) => ({
        ...current,
        mrNo: data.data[0].id,
        consDoctor: getConsDoctorFromPatientData(patientData),
        disabled: true,
      }));
      
      setPatientData((current) => ({
        ...current,
        ...patientData,
        patient_id: patientData.id,
        name: patientName(patientData),
        age: calculateAge(patientData.dob),
        sex: patientData.gender,
        ip: {
          ...patientData.ip,
          admissionTimeandDate: timestampToAppDateTime(patientData?.ip?.admitted_at),
          dischargeTimeandDate: patientData?.ip?.discharged_at ? timestampToAppDateTime(patientData.ip.discharged_at) : '-',
        },
        // TODO: cleanup. This is a hack to get the room type in the bill.
        ipNo: headData.ipNo,
        roomType: patientData?.ip?.roomType,
      }));

      setShowLoader(false);
    } catch (err) {
      setShowLoader(false);
      console.error(err);
    }
  });

  useEffect(() => {
    if (search) {
      if (billSearchViaUrl.mrNo) {
        setPatientType(PATIENT_TYPE.OP);
        setHeadData((current) => ({ ...current, mrNo: billSearchViaUrl.mrNo }));
        handleSearch({ patientType: PATIENT_TYPE.OP, mrNo: billSearchViaUrl.mrNo });
      }
      if (billSearchViaUrl.ipNo) {
        setPatientType(PATIENT_TYPE.IP);
        setHeadData((current) => ({ ...current, ipNo: billSearchViaUrl.ipNo }));
        handleSearch({ patientType: PATIENT_TYPE.IP, ipNo: billSearchViaUrl.ipNo });
      }
    }
  }, []);

  useEffect(() => {
    if (search && billSearchViaUrl.billNo && patientData.patient_id) {
      setHeadData((current) => ({ ...current, billNo: billSearchViaUrl.billNo }));
      setSearchBill(`${billSearchViaUrl.billNo}`);
      handleBillSearch(`${billSearchViaUrl.billNo}`);
    }
  }, [patientData.patient_id]);

  useEffect(() => {
    getBillItems();
    // getRooms();
    getDoctors();
    getManagers();
  }, [patientData]);

  const pageButtons = billSearch ? [
    {
      name: 'Cancel',
      color: 'secondary',
      onClick: handleCancel,
      hidden: patientBlockedStatus,
    },
    {
      name: 'Proceed To Pay',
      color: 'primary',
      onClick: () => setShowPaymentDialog(true),
      disabled: billdata?.discount_status !== BILL_DISCOUNT_STATUS.APPROVED || !paymentType,
      hidden: ((selectedBillTypeRadio !== BILL_TYPES.FINAL_BILL.identifier) ? billdata.remaining_amount <= 0 : false) || patientBlockedStatus,
    },
  ] : [
    {
      name: 'Cancel',
      color: 'secondary',
      onClick: handleCancel,
      hidden: patientBlockedStatus,
    },
    { name: 'Save Bill',
      color: 'primary', 
      onClick: selectedBillTypeRadio === BILL_TYPES.LAB_SERVICE_BILL.identifier ? handleCreateBill : handleCreateFinalBill, 
    },
  ];

  return (
    <BillContext.Provider
      value={{
        patientType,
        patientData,
        headData,
        doctors,
        managers,
        services,
        billinstancesdata,
        setBillInstancesData,
        billdata,
        selectedBillTypeRadio,
        setSelectedBillTypeRadio,
        patientBlockedStatus,
        pendingAndAdvance,
        setPendingAndAdvance,
        handleBillSearch,
        paidAdvance,
        pendingAdvance,
        pendingLabService,
        pendingRoom
      }}
    >
      <PageHeaderWrapper className={classes.root} title='Create OP/IP Form' heading='Billing' subHeading='Create OP/IP/Lab Bill'>
        <BillTypeSelection
          style={useStyles}
          className={classes.cardStyle}
          setPatientType={setPatientType}
          setHeadData={setHeadData}
          handleSearch={handleSearch}
        />

        <BillParticulars
          style={useStyles}
          className={classes.cardStyle}
        />
        {patientData.patient_id &&
          <>
            {(patientType === PATIENT_TYPE.IP) && (
              <BillSummary
                pendingAndAdvance={pendingAndAdvance}
                style={useStyles}
                className={classes.cardStyle}
                services={services}
              />
            )}
            {patientIpNo && <PreviousBillDetails
              handleBillSearch={handleBillSearch}
              ipNo={patientIpNo}
            />}

            {((!patientBlockedStatus && !finalBillIsPresent) || billSearch) && <BillingForm
              style={useStyles}
              className={classes.cardStyle}
              showPreviousBill={showPreviousBill}
              setShowPreviousBill={setShowPreviousBill}
              searchBill={searchBill}
              setSearchBill={setSearchBill}
              handleBillSearch={handleBillSearch}
              billSearch={billSearch}
              handleBillSearchCancel={handleBillSearchCancel}
              setAdvanceAmount={setAdvanceAmount}
              handleAdvanceBill={handleAdvanceBill}
              pendingAndAdvance={pendingAndAdvance}
            />}

            {billSearch && (<BillDetails
              setPaymentType={setPaymentType}
              setPayableAmount={setPayableAmount}
              payableAmount={payableAmount}
              paymentType={paymentType}
              advanceAmount={advanceAmount}
              style={useStyles}
              className={classes.cardStyle}
              paymentStatus={((selectedBillTypeRadio !== BILL_TYPES.FINAL_BILL.identifier) ? billdata.remaining_amount <= 0 : false) || patientBlockedStatus}
            />)}

            {((!patientBlockedStatus && !finalBillIsPresent) || billSearch) && <ButtonGroup
              orientation='horizontal'
              style={{ width: '100%', marginTop: '10px' }}
            >
              {billSearch && <>
                {billdata.bill_type === BILL_TYPES.ADVANCE_BILL.identifier ?
                  <AdvanceBill billdata={billdata} hospitalInfo={hospitalInfo} />
                  : <IpOpBill billdata={billdata} hospitalInfo={hospitalInfo} /> }
              </>}
              {_map(pageButtons, (button) => {
                const { name, color, onClick, disabled, hidden } = button;
                return (
                  <React.Fragment key={name}>
                    {!hidden && <Button
                      key={name}
                      color={color}
                      variant={color === 'secondary' ? 'outlined' : 'contained'}
                      style={{ width: '100%' }}
                      onClick={onClick}
                      disabled={disabled}
                    >
                      {button.name}
                    </Button>}
                  </React.Fragment>
                );
              }
              )}
            </ButtonGroup>}

            <ListDetailsDialog
              isOpen={showListDetailsDialog}
              onClose={() => setShowListDetailsDialog(false)}
              title='Bill Info'
              listData={listDetailsDialogData.listData}
              displayActions={false}
              onButtonClick={listDetailsDialogData.onClick}
            />
            <ListDetailsDialog
              isOpen={showPaymentDetails}
              onClose={() => setShowPaymentDetails(false)}
              title='Bill Info'
              listData={listDetailsDialogData?.listData}
              displayActions={false}
              onButtonClick={listDetailsDialogData.onClick}
            />
            {paymentType && <PaymentDialog
              isOpen={showPaymentDialog}
              onClose={() => setShowPaymentDialog(false)}
              transactionId={transactionId}
              setTransactionId={setTransactionId}
              displayActions={false}
              paymentType={paymentType}
              onButtonClick={handleSetPaymentDetailsBill}
              billRemainingAmount={billRemainingAmount}
              payableAmount={payableAmount} />}
          </>}
        {(patientBlockedStatus) && <PrintInvoice hospitalInfo={hospitalInfo} handleCancel={handleCancel}/>}
      </PageHeaderWrapper>
    </BillContext.Provider>
  );
};

export default CreateIPOPLab;