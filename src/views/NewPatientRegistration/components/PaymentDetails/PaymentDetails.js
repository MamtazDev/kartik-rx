import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Box,
} from '@mui/material';

import { doctorName } from 'utils/patient';
import { axiosInstance } from 'actions/helpers';
import _ from 'lodash';
import RadioGroupRx from 'atoms/RadioGroup';
import TextFieldRx from 'atoms/TextField';
import { PATIENT_TYPE } from 'utils/patient';
import { PAYMENT_OPTIONS } from 'views/Billing/CreateIPOPLab/paymentOptions';

const useStyles = makeStyles()((theme) => ({
  root: {
    // width: theme.breakpoints.values.lg,
    // maxWidth: '100%',
    // margin: '0 auto',
    // padding: theme.spacing(3, 3, 6, 3)
  },
  options: {
    marginTop: theme.spacing(-2),
  },
  patientType: {
    marginTop: theme.spacing(1),
  },
}));

const PaymentDetails = (props) => {
  const { className, patient, consDoctor, onSubmit, control, registration_info, ...rest } = props;

  const { classes } = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardHeader title='Payment Details' />
        <CardContent className={classes.options}>
          <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
              <PaymentDetailsHeader
                control={control}
              />
            </Grid>
            <Grid
              container
              justifyContent='center'
              alignContent='center'
              spacing={4}
              direction='row'
            >
              <Grid item xs={6}>
                <PaymentPatientDetails
                  registration_info={registration_info}
                  patient={patient}
                  consdrname={doctorName(consDoctor)}
                  control={control}
                />
              </Grid>
              <Grid item xs={6}>
                <PaymentOptions />
              </Grid>
            </Grid>
            <Box mt={2} alignItems='center' justify='center'>
              <Button fullWidth color='primary' variant='contained' onClick={onSubmit}>
                Proceed to Pay
              </Button>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

PaymentDetails.propTypes = {
  className: PropTypes.string,
  consDoctor: PropTypes.object,
  onSubmit: PropTypes.func,
  control: PropTypes.object,
  registration_info: PropTypes.object,
  patient: PropTypes.object,
};

const PaymentDetailsHeader = (props) => {
  const { control } = props;

  return (
    <div>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Select</FormLabel>
        <RadioGroupRx
          control={control}
          row
          aria-label='patientType'
          name='registration_info.registration_type'
        >
          <FormControlLabel value={PATIENT_TYPE.OP} control={<Radio />} label={PATIENT_TYPE.OP} />
          <FormControlLabel value={PATIENT_TYPE.IP} control={<Radio />} label={PATIENT_TYPE.IP} />
        </RadioGroupRx>
      </FormControl>
    </div>
  );
};

PaymentDetailsHeader.propTypes = {
  control: PropTypes.object,
};

const PaymentPatientDetails = (props) => {
  let { registration_info, consdrname, patient, control } = props;

  return (
    <div>
      {registration_info.registration_type === PATIENT_TYPE.OP ? (
        <OpPatientDetails
          consdrname={consdrname}
          patient={patient}
          control={control}
        />
      ) : (
        <IpPatientDetails consdrname={consdrname} patient={patient} registration_info={registration_info} control={control} />
      )}
    </div>
  );
};

PaymentPatientDetails.propTypes = {
  consdrname: PropTypes.string,
  registration_info: PropTypes.object,
  patient: PropTypes.object,
  control: PropTypes.object,
};


const PaymentOptions = () => {
  return (
    <div>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Payment Mode</FormLabel>
            <RadioGroup
              row
              aria-label='paymentType'
              name='paymentType'
            // value={paymentType}
            // onChange={handlePaymentChange}
            >
              <Grid
                container
                direction='row'
                justifyContent='space-between'
                alignItems='flex-start'
              >
                <Grid item xs={4}>
                  <FormControlLabel
                    value={PAYMENT_OPTIONS.CASH.identifier}
                    control={<Radio />}
                    label={PAYMENT_OPTIONS.CASH.displayText}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value={PAYMENT_OPTIONS.UPI.identifier}
                    control={<Radio />}
                    label={PAYMENT_OPTIONS.UPI.displayText}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value={PAYMENT_OPTIONS.CARD.identifier}
                    control={<Radio />}
                    label={PAYMENT_OPTIONS.CARD.displayText}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction='row'
                justifyContent='space-between'
                alignItems='flex-start'
              >
                <Grid item xs={4}>
                  <FormControlLabel
                    value='wallet'
                    control={<Radio />}
                    label='Wallet'
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value='gpay'
                    control={<Radio />}
                    label='GPay'
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value='netBanking'
                    control={<Radio />}
                    label='Net Banking'
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

const OpPatientDetails = (props) => {
  const { control, patient, consdrname } = props;

  return (
    <div>
      <Grid
        container
        direction='column'
        alignItems='flex-start'
        justifyContent='flex-start'
        spacing={2}
      >
        <Grid container item xs={6}>
          <TextField
            fullWidth
            disabled
            id='mrNo'
            value={patient.mrno}
          />
        </Grid>
        <Grid container item xs={12}>
          <TextField
            fullWidth
            disabled
            id='consdrname'
            label='Cons. Dr. Name'
            value={
              consdrname === undefined
                ? 'Please Select a Doctor'
                : consdrname
            }
          />
        </Grid>
        <Grid container item xs={12}>
          <TextFieldRx
            control={control}
            fullWidth
            id='amount'
            name='registration_info.amount'
            label='Registration Fee'
          />
        </Grid>
      </Grid>
    </div>
  );
};

OpPatientDetails.propTypes = {
  consdrname: PropTypes.string,
  patient: PropTypes.object,
  control: PropTypes.object,
};

const prepareRoomData = (data) => {
  let finalData = {};
  data.forEach(room => {
    if (finalData[room.type])
      finalData[room.type].push(room);
    else
      finalData[room.type] = [room];
  });

  return finalData;
};

const IpPatientDetails = (props) => {
  const { control, patient, registration_info, consdrname } = props;
  const [roomsData, setRoomsData] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [charges, setCharges] = useState(0);

  useEffect(() => {
    //call the api for room
    async function getRooms() {
      let data = prepareRoomData((await axiosInstance.get('/rooms/available')).data);
      setRoomsData(data);
      let roomTypes = (_.keys(data)).map(room => (
        <MenuItem key={room} value={room}>{room}</MenuItem>
      ));
      setRoomType(roomTypes);
    }
    getRooms();
  }, []);

  useEffect(() => {
    let roomType = registration_info.room_type;
    if (!roomsData[roomType])
      return;

    let rooms = roomsData[roomType].map((room) => (
      <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
    ));
    setRoomOptions(rooms);
    setCharges(roomsData[roomType].price);
  }, [registration_info.room_type, roomsData]);


  return (
    <div>
      <Grid container direction='column' justifyContent='space-between' spacing={2}>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              disabled
              id='mrNo'
              label='Mr.No.'
              value={patient.mrno}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              disabled
              id='ipNo'
              label='IP No'
              value={patient.ipno}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled
              id='consdrname'
              label='Cons Dr. Name'
              value={consdrname}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2} xs={12}>
          <Grid item xs={6}>
            <TextFieldRx
              control={control}
              select
              name='registration_info.room_type'
              label='Room Type'
              fullWidth
            >
              {roomType}
            </TextFieldRx>
          </Grid>
          <Grid item xs={6}>
            <TextFieldRx
              control={control}
              select
              label='Room Number'
              name='registration_info.room'
              fullWidth
            >
              {roomOptions}
            </TextFieldRx>
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12}>
            <TextFieldRx
              control={control}
              fullWidth
              id='amount'
              name='registration_info.amount'
              label='Registration Fee'
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

IpPatientDetails.propTypes = {
  consdrname: PropTypes.string,
  registration_info: PropTypes.object,
  patient: PropTypes.object,
  control: PropTypes.object,
};

export default PaymentDetails;
