import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import theme from 'theme';
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  TextField,
} from '@mui/material';
import { BillingForm } from 'views/Billing/CreateIPOPLab/Components';

const useStyles = makeStyles()({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    }
  },
  cardStyle: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(2, 0, 1, 2),
    minWidth: 120,
  },
});

const TabPanel = (props) => {
  const { headers, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <BillingForm />}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function BillTab() {
  const {classes} = useStyles();
  const [billType, setBillType] = useState('All');

  let options = [
    'All',
    'Room Type',
    'Dr Visit',
    'Investigaion',
    'Service',
    'OT Package',
    'IP Advance',
    'IP Cancellation',
    'Pharmacy',
    'Pharmacy Return',
  ];

  let headers = {
    'All': ['Del','Bill\xa0Time','Code','Service\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'Room Type': ['Del','Bill\xa0Time','Code','Service\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'Dr Visit': ['Del','Bill\xa0Time','Code','Dr\xa0Visit','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'Investigaion': ['Del','Bill\xa0Time','Code','Service\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'Service': ['Del','Bill\xa0Time','Code','Service\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'OT Package': ['Del','Bill\xa0Time','Code','Package\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'IP Advance': ['Del','Bill\xa0Time','Code','Service\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'IP Cancellation': ['Del','Bill\xa0Time','Code','Service\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'Pharmacy': ['Del','Bill\xa0Time','Code','Service\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
    'Pharmacy Return': ['Del','Bill\xa0Time','Code','Service\xa0Name','Cons\xa0Dr\xa0Name','Rate','Qty','Total','Disc\xa0%','Disc\xa0A.','Net\xa0Amount','Pekg\xa0ID','Pekg\xa0Name'],
  };

  const handleChange = (event) => {
    setBillType(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <FormControl className={classes.formControl}>
          <TextField select fullWidth variant='outlined' label='Filter Bills by' value={billType} onChange={handleChange}>
            {options.map((opt) => (
              <MenuItem value={opt} key={opt}>{opt}</MenuItem>
            ))}
          </TextField>
        </FormControl>
        {options.map((opt) => (
          <TabPanel key={opt} index={opt} value={billType} headers={headers[opt]}>
            {opt}
          </TabPanel>
        ))}
      </CardContent>
    </Card>
  );
}
