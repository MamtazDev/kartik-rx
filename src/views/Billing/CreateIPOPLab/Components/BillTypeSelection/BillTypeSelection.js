import React, {useContext} from 'react';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { PATIENT_TYPE } from 'utils/patient';
import { BillContext } from '../../commons';

const BillTypeSelection = (props) => {
  const {
    style,
    className,
    setPatientType,
    setHeadData,
    handleSearch,
    ...rest
  } = props;

  const { classes } = style();
  const {headData, patientType} = useContext(BillContext);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent
        className={classes.cardContentStyle}
        style={{ paddingLeft: '0', paddingBottom: '0' }}
      >
        <Grid
          container
          spacing={1}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item xs={3}>
            <PatientTypeSelection
              patientType={patientType}
              setPatientType={setPatientType}
              headData={headData}
            />
          </Grid>
          <Grid item xs={9}>
            <PatientFields
              setHeadData={setHeadData}
              handleSearch={handleSearch}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const PatientTypeSelection = (props) => {
  const { patientType, setPatientType, headData } = props;

  return (
    <FormControl component='fieldset' disabled={headData.disabled}>
      <FormLabel component='legend'>
        <strong>Select Patient Type</strong>
      </FormLabel>
      <RadioGroup
        row
        aria-label='patientType'
        name='patientType'
        value={patientType}
        onChange={(event) => setPatientType(event.target.value)}
      >
        <FormControlLabel value={PATIENT_TYPE.OP} control={<Radio />} label={PATIENT_TYPE.OP} />
        <FormControlLabel value={PATIENT_TYPE.IP} control={<Radio />} label={PATIENT_TYPE.IP} />
      </RadioGroup>
    </FormControl>
  );
};

const PatientFields = ({
  setHeadData,
  handleSearch,
}) => {
  const {patientType, headData, doctors, patientData} = useContext(BillContext);

  return (
    <div>
      <Grid container direction='row' spacing={1}>
        <Grid item xs={6} container>
          <TextField
            style={{ width: '70%' }}
            id='standard-basic'
            label='Mr. No.'
            variant='standard'
            disabled={patientType === PATIENT_TYPE.IP || headData.disabled}
            value={headData.mrNo}
            onChange={(e) =>
              setHeadData((current) => ({ ...current, mrNo: e.target.value }))
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          {patientType === PATIENT_TYPE.OP && (
            <IconButton
              variant='outlined'
              color='primary'
              onClick={handleSearch}
              disabled={headData.disabled}
              size='large'>
              <SearchIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={6}>
          {patientType === PATIENT_TYPE.IP && (
            <>
              <TextField
                style={{ width: '70%' }}
                id='standard-basic'
                label='IP. No.'
                variant='standard'
                disabled={headData.disabled}
                value={headData.ipNo}
                onChange={(e) =>
                  setHeadData((current) => ({
                    ...current,
                    ipNo: e.target.value,
                  }))
                }
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <IconButton
                variant='outlined'
                color='primary'
                onClick={handleSearch}
                disabled={headData.disabled}
                size='large'>
                <SearchIcon />
              </IconButton>
            </>
          )}
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            style={{ width: '70%' }}
            options={doctors}
            getOptionLabel={(option) =>
              option.full_name ? option.full_name : ''
            }
            value={headData.consDoctor}
            onChange={(e, v) => {
              setHeadData((current) => ({ ...current, consDoctor: v }));
            }}
            disabled={headData.disabled}
            renderInput={(params) => (
              <TextField {...params} variant='standard' label='Cons Dr.' />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            style={{ width: '70%' }}
            options={['Dr. ABC', 'DR. PQR']}
            disabled={headData.disabled}
            renderInput={(params) => (
              <TextField {...params} variant='standard' label='Ref Dr.' />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BillTypeSelection;

const TextLabel = (props) => {
  const { heading, value } = props;
  return (
    <div style={{ padding: '.2em' }}>
      <Grid container direction='row' spacing={1}>
        <Grid item>
          <TitleHeading text={heading} />
        </Grid>
        <Grid item>:</Grid>
        <Grid item>
          <TitleValue value={value} />
        </Grid>
      </Grid>
    </div>
  );
};
const TitleHeading = (props) => {
  return (
    <Typography>
      <strong>{props.text}</strong>
    </Typography>
  );
};
const TitleValue = (props) => {
  const { value } = props;
  // if (value === 'Loading...'){
  //   return <CircularProgress size="1rem"/>
  // }
  return <Typography>{value}</Typography>;
};
