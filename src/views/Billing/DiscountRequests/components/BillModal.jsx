import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { TableView } from 'components/Table';
import { AddDialog } from 'molecules/Dialogs';
import { PATIENT_TYPE, BILL_DISCOUNT_STATUS } from 'utils/patient';


const useStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.spacing(1)

  },
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
  innerCard: {
    maxWidth: '600px',
    padding: '20px'
  },
  itemLabel: {
    marginRight: theme.spacing(2)
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(3)
  }
}));


const COLUMNS = [
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'amount', label: 'Amount', align: 'left' },
];

function BillModal(props) {
  const { open, onClose, popUpData, handlePendingRequest } = props;
  const [data, setData] = React.useState([]);
  const { classes } = useStyles();

  useEffect(() => {
    if (popUpData) {
      setData([
        {
          type: 'Discount Amount',
          amount: popUpData.discount?.amount,
        },
        {
          type: 'Total Amount',
          amount: popUpData.amount,
        },        
      ]);
    }
  }, [popUpData]);

  return (
    <AddDialog
      isOpen={open}
      onClose={onClose}
      title='Discount Request'
      maxWidth='sm'
      fullWidth
      displayActions={false}
    >
      <Grid container spacing={2}>
        <Grid item container xs={4} alignItems='center'>
          <Typography variant='button' className={classes.itemLabel}>Patient Type :  </Typography>
          <Typography> {popUpData.ip_id ? PATIENT_TYPE.IP : PATIENT_TYPE.OP} </Typography>
        </Grid>
        <Grid item container xs={4} alignItems='center'>
          <Typography variant='button' className={classes.itemLabel} >MR No.  :</Typography>
          <Typography>{popUpData.patient_id}</Typography>
        </Grid>
        <Grid item container xs={4} alignItems='center'>
          <Typography variant='button' className={classes.itemLabel} >IP No.  : </Typography>
          <Typography>{popUpData.ip_id}</Typography>
        </Grid>
        <Grid item container xs={4} alignItems='center'>
          <Typography variant='button' className={classes.itemLabel} >Bill No.  :</Typography>
          <Typography>{popUpData.id}</Typography>
        </Grid>
        <Grid item xs={8} container alignItems='center'>
          <Typography variant='button' className={classes.itemLabel} >Patient Name  :</Typography>
          <Typography>{popUpData.patient?.full_name}</Typography>
        </Grid>
      </Grid>

      <Box mt={2}>
        <TableView
          columns={COLUMNS}
          tableData={data}
          loaded={true}
          displayPagination={false}
        />
      </Box>

      {popUpData.discount_status === BILL_DISCOUNT_STATUS.PENDING && (
        <Box className={classes.buttonWrapper}>
          <Button
            color='primary'
            variant='contained'
            style={{ marginRight: '20px' }}
            onClick={() => handlePendingRequest(popUpData.id, BILL_DISCOUNT_STATUS.APPROVED)}
          >
            Approve
          </Button>
          <Button
            color='primary'
            variant='outlined'
            onClick={() => handlePendingRequest(popUpData.id, BILL_DISCOUNT_STATUS.REJECTED)}
          >
            Reject
          </Button>
        </Box>
      )}
    </AddDialog>
  );
}

export default BillModal;