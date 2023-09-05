import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
// import { BillDetails } from "..";
import CloseIcon from '@mui/icons-material/Close';
import { PATIENT_TYPE } from 'utils/patient';
import {BillContext} from '../../commons';

const BillParticulars = (props) => {
  const {
    style,
    className,
    ...rest
  } = props;
  const { classes } = style();

  const {patientData, patientType} = useContext(BillContext);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        style={{
          padding: 0,
        }}
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>Patient Details</div>
          </div>
        }
      />
      <CardContent
        style={{
          padding: 0,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <div className={classes.statsItem}> */}
            <PatientDetails
              disabled={true}
              fullWidth
              details={patientData}
            />
            {/* </div> */}
          </Grid>

          <Grid item xs={12}>
            {patientType === PATIENT_TYPE.IP && (
              <AdmissionDetails
                disabled={true}
                details={patientData}
              />
            )}
            {/* </div> */}
          </Grid>

          <Grid item xs={12}></Grid>
        </Grid>
        {/* </div> */}
      </CardContent>
    </Card>
  );
};

export default BillParticulars;

const PatientDetails = (props) => {
  const { fullWidth, details } = props;

  const Details = () => (
    <>
      <Grid
        xs={fullWidth ? 6 : 12}
        container
        item
        spacing={1}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={6}>
          <TypographyBody
            text='Name'
            value={details.name}
            disabled={props.disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <TypographyBody
            text="Mother's Name"
            value={details.mother_name}
            disabled={props.disabled}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction='row'
        spacing={1}
        style={{ marginTop: '8px' }}
        xs={fullWidth ? 6 : 12}
      >
        <Grid item xs={3}>
          <TypographyBody
            text='Age'
            value={details.age}
            disabled={props.disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <TypographyBody
            text='Sex'
            value={details.sex}
            disabled={props.disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <TypographyBody
            text='Mobile No'
            value={details.phone}
            disabled={props.disabled}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <div>
      <Grid container direction='column' spacing={0}>
        {fullWidth ? (
          <Grid container direction='row' spacing={1}>
            <Details />
          </Grid>
        ) : (
          <Details />
        )}

        <Grid container item spacing={1} style={{ marginTop: '8px' }}>
          <Grid item xs={12}>
            <TypographyBody
              text='Address'
              disabled={props.disabled}
              value={details.address}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const AdmissionDetails = (props) => {
  const { details } = props;

  return (
    <div>
      <Grid container direction='column' spacing={0}>
        <Grid item>
          <TypographyHeading text='Admission Details' />
        </Grid>
        <Grid container item spacing={1} style={{ marginTop: '8px' }}>
          {/* Admission and discharge details */}
          <Grid item xs={4}>
            <TypographyBody
              text='Admission Date and Time'
              disabled={props.disabled}
              value={details.ip.admissionTimeandDate}
            />
          </Grid>
          <Grid item xs={4}>
            <TypographyBody
              text='Discharge Date and Time'
              disabled={props.disabled}
              value={details.ip.dischargeTimeandDate}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={1} style={{ marginTop: '8px' }}>
          {/* Room details */}
          <Grid item xs={4}>
            <TypographyBody
              text='Room No.'
              disabled={props.disabled}
              value={details.assigned_room.name}
            />
          </Grid>
          <Grid item xs={4}>
            <TypographyBody
              text='Room Type'
              disabled={props.disabled}
              value={details.assigned_room.room_type.name}
            />
          </Grid>
          <Grid item xs={4}>
            <TypographyBody
              text='Room Charges per day'
              disabled={props.disabled}
              value={details.assigned_room.amount}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const TypographyHeading = (props) => {
  return (
    <div style={{ marginBottom: '.5rem' }}>
      <FormLabel component='legend'>
        <Typography variant='h5'> {props.text}</Typography>
      </FormLabel>
    </div>
  );
};

const TypographyBody = (props) => {
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      fullWidth
      label={props.text}
      variant='standard'
      value={props.value}
      disabled={props.disabled}
      size='small'
    />
  );
};
