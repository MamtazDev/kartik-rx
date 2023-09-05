import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import PendingRoomConsBillsModal from './Modals/PendingRoomConsBillsModal';

const useStyles = makeStyles()({
  headingTypography: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    maxWidth: '150px',
    marginLeft: '20px',
  },
});

function Details({ showPreviousBill }) {
  const {classes} = useStyles();

  const [
    pendingRoomConsBillsModalOpen,
    setPendingRoomConsBillsModalOpen,
  ] = useState(false);
  const handlePendingRoomConsBillsModalOpen = () => {
    setPendingRoomConsBillsModalOpen(true);
  };
  const handlePendingRoomConsBillsModalClose = () => {
    setPendingRoomConsBillsModalOpen(false);
  };
  return (
    <>
      <PendingRoomConsBillsModal
        pendingRoomConsBillsModalOpen={pendingRoomConsBillsModalOpen}
        handlePendingRoomConsBillsModalClose={
          handlePendingRoomConsBillsModalClose
        }
        showPreviousBill={showPreviousBill}
      />
      <Card style={{ marginTop: '10px' }}>
        <CardContent>
          <Grid container justifyContent='space-evenly'>
            <Grid item sx={4}>
              <Typography variant='h4' className={classes.headingTypography}>
                Pending Room & Cons.Bills
              </Typography>
              <Grid
                container
                justifyContent='space-bitween'
                alignItems='center'
              >
                <Typography variant='h4'>2000/-</Typography>
                <Button
                  className={classes.button}
                  color='primary'
                  onClick={handlePendingRoomConsBillsModalOpen}
                >
                  Click here for details
                </Button>
              </Grid>
            </Grid>
            <Grid item sx={4}>
              <Typography variant='h4' className={classes.headingTypography}>
                Advance Paid
              </Typography>
              <Grid container justifyContent='space-around' alignItems='center'>
                <Typography variant='h4'>5000/-</Typography>
                <Button className={classes.button} color='primary'>
                  Click here for details
                </Button>
              </Grid>
            </Grid>
            <Grid item sx={4}>
              <Typography variant='h4' className={classes.headingTypography}>
                Pending lab & Service Bills
              </Typography>
              <Grid container justifyContent='space-around' alignItems='center'>
                <Typography variant='h4'>3000/-</Typography>
                <Button className={classes.button} color='primary'>
                  Click here for details
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Details;
