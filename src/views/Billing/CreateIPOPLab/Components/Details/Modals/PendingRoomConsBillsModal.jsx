import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  Grid,
  Modal,
  IconButton,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import React from 'react';

import { Close } from '@mui/icons-material';


const useStyles = makeStyles()((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    maxWidth: '900px'
  },
  patientDetailsWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  AmountToPayItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '0.5px solid #a3a3a3 ',
    padding: '10px 5px'
  }
}));


function PendingRoomConsBillsModal(props) {
  const { classes } = useStyles();
  const { pendingRoomConsBillsModalOpen,
    handlePendingRoomConsBillsModalClose,
    showPreviousBill } = props;



  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={pendingRoomConsBillsModalOpen}
      onClose={handlePendingRoomConsBillsModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={pendingRoomConsBillsModalOpen}>
        <div className={classes.paper}>


          <Card>
            <CardHeader
              title={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>Bill to Pay</div>
                  <div>
                    <IconButton onClick={handlePendingRoomConsBillsModalClose} size='large'>
                      <Close />
                    </IconButton>
                  </div>

                </div>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant='h5'>Patient Details</Typography>
              <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid className={classes.patientDetailsWrapper}>
                  <Typography style={{ marginRight: '10px' }}>Patient Name</Typography>
                  <Typography>loading...</Typography>
                </Grid>
                <Grid className={classes.patientDetailsWrapper} style={{ margin: '5px 20px' }}>
                  <Typography style={{ marginRight: '10px' }}>Patient Name</Typography>
                  <Typography>loading...</Typography>
                </Grid>
                <Grid className={classes.patientDetailsWrapper}>
                  <Typography style={{ marginRight: '10px' }}>Patient Name</Typography>
                  <Typography>loading...</Typography>
                </Grid>
              </Grid>
              <Typography variant='h5' style={{ padding: '10px 0px' }}>Amount to Pay Details</Typography>
              <div>
                <Grid className={classes.AmountToPayItem}>
                  <Typography>No.Of Days Admitted so Far</Typography>
                  <Typography>3 Days</Typography>
                </Grid>
                <Grid className={classes.AmountToPayItem}>
                  <Typography>Room Charges so Far</Typography>
                  <Typography>5000</Typography>
                </Grid>
                <Grid className={classes.AmountToPayItem}>
                  <Typography>Dr.Consultation Charges so Far</Typography>
                  <Typography>3000</Typography>
                </Grid>
                <Grid style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 5px' }}>
                  <Typography variant='h5'>Total Charges To Pay</Typography>
                  <Typography variant='h5'>8000</Typography>
                </Grid>

              </div>

              <Grid container justifyContent='center' style={{ padding: '10px' }}>
                <Button size='small' variant='contained' color='primary' disabled={!showPreviousBill} >Load to bill data </Button>
              </Grid>


            </CardContent>
          </Card>
        </div>


      </Fade>
    </Modal>
  );
}

export default PendingRoomConsBillsModal;