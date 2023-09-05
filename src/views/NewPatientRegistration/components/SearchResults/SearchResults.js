import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Radio,
  Typography,
  CardHeader,
  Card,
  Grid,
  FormControlLabel,
} from '@mui/material';
import PropTypes from 'prop-types';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  newRegOption: {
    padding: theme.spacing(2, 0),
    marginLeft: 0,
  },
}));

const SearchResults = (props) => {
  const { classes } = useStyles();
  const patients = props.patients;
  const [checked, setChecked] = useState();
  let rows = [];
  patients.map((patient, index) => {
    rows.push({
      select: (
        <Radio
          onChange={() => setChecked(patient.mrno)}
          value={patient.id}
          checked={checked === patient.mrno}
        />
      ),
      ...patient,
      name: patient.first_name + ' ' + patient.last_name,
      mrNo: patient.id,
    });
  });

  const handleSelect = () => {
    props.setSelectedMrNo(checked);
    props.onDialogueChange(false);
  };

  let alertMessage =
    'Alert : The patient\'s phone number has ' +
    rows.length +
    ' registration. Kindly select';

  return (
    <>
      <Typography variant='h5'>{alertMessage}</Typography>
      <Table sx={{mt: 2}} aria-label='caption table'>
        <caption>
          <Grid
            container
            direction='column'
            justifyContent='space-evenly'
            alignItems='flex-start'
          >
            {rows.length > 0 && (
              <Grid
                container
                direction='row'
                justifyContent='space-evenly'
                alignItems='center'
              >
                <Grid item xs={5}>
                  <hr />
                </Grid>
                <Grid item>
                  <Typography>Or</Typography>
                </Grid>
                <Grid item xs={5}>
                  <hr />
                </Grid>
              </Grid>
            )}
            <Grid item alignContent='flex-end'>
              <FormControlLabel
                value='new'
                className={classes.newRegOption}
                control={
                  <Radio
                    onChange={() => setChecked(null)}
                    checked={checked === null}
                  />
                }
                label='Register a new patient again with this phone number'
              />
            </Grid>
            <Grid
              container
              direction='row'
              justifyContent='space-evenly'
              alignItems='center'
            >
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSelect}
                >
                  Proceed
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </caption>
        {rows.length > 0 && (
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Mr.&nbsp;No.</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.full_name}>
              <TableCell>{row.select}</TableCell>
              <TableCell component='th' scope='row'>
                {row.full_name}
              </TableCell>
              <TableCell>{row.mrNo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

SearchResults.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default SearchResults;
