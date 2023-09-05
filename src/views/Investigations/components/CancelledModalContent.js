import React from 'react';

import { Backdrop, Button, Divider, Fade, Grid, Modal } from '@mui/material';

import { makeStyles } from 'tss-react/mui';

const CancelledModalContent = (props) => {
  const { data, editObj } = props;

  return (
    <div>
      <Grid container justifyContent='space-between'>
        <Grid item xs={6}>
          Bill No : {editObj.bill_id}
        </Grid>
        <Grid item xs={6}>
          Patient Name : {editObj.patient_name}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          Mr No : {editObj.patient_id}
        </Grid>
        <Grid item xs={6}>
          IP No : {editObj.ip_id}
        </Grid>
      </Grid>

      <Divider />

      <Grid container>
        {data.map((test, index) => {
          return (
            <Grid item key={index} xs={6}>
              <h4 style={{ marginTop: '20px' }}>{`${index +
                1} ) ${test.description}`}</h4>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CancelledModalContent;
