import React from 'react';

import { Backdrop, Button, Divider, Fade, Grid, Modal } from '@mui/material';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
}));

const TESTS = ['CBP', 'Liver function test', 'T3,T4,TSH', 'Blood urea'];

function ShowCancelledTestsModal(props) {
  const {classes} = useStyles();

  const { cancelledModalOpen, handleCancelledModalClose } = props;

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={cancelledModalOpen}
      onClose={handleCancelledModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={cancelledModalOpen}>
        <div className={classes.paper}>
          <Grid container justifyContent='space-between'>
            <Grid item xs={6}>
              Bill No :
            </Grid>
            <Grid item xs={6}>
              Patient Name :
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              Mr No :
            </Grid>
            <Grid item xs={6}>
              IP No :
            </Grid>
          </Grid>

          <Divider style={{ marginTop: '20px', border: '1px solid #2979ff' }} />

          <Grid style={{ color: '#2979ff', marginTop: '5px' }}>
            <h4>Cancelled Tests</h4>
          </Grid>
          <Grid container>
            {TESTS.map((test, index) => {
              return (
                <Grid item key={index} xs={6}>
                  <h4 style={{ marginTop: '20px' }}>{`${index +
                    1} ) ${test}`}</h4>
                </Grid>
              );
            })}
          </Grid>
          <Grid container justifyContent='center' style={{ marginTop: '20px' }}>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleCancelledModalClose}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}

export default ShowCancelledTestsModal;
