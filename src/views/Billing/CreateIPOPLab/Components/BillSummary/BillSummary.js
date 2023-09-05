import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableRow,
  Typography,
  TableHead,
  TableBody,
  Badge,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BillSummary = (props) => {
  const [showMore, setShowMore] = useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [tableTitle, setTableTitle] = useState();

  const { style, className, ...rest } = props;
  const {classes} = style();

  const handleClickHere = (title, tableTitle) => {
    setDialogTitle(title);
    setTableTitle(tableTitle);
    setShowMore(true);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent
        className={classes.cardContentStyle}
        style={{ paddingLeft: '0', paddingBottom: '0' }}
      >
        <>
          <Table>
            <TableRow>
              <TableCell>Total Bill</TableCell>
              <TableCell>
                <Badge badgeContent={4} color='primary'>
                  <div>
                    <Typography variant='body1'>10000/-</Typography>
                  </div>
                </Badge>

                <Button variant='text' size='small'>
                  <Typography
                    variant='caption'
                    onClick={() =>
                      handleClickHere(
                        'Room + Cons Charges To Pay Till Date',
                        'Amount To Pay Details'
                      )
                    }
                  >
                    Click here for details
                  </Typography>
                </Button>
              </TableCell>

              {/* </TableRow>
        <TableRow> */}
              <TableCell>Advance Paid</TableCell>
              <TableCell>
                5000
                <Button variant='text' size='small'>
                  <Typography
                    variant='caption'
                    onClick={() =>
                      handleClickHere(
                        'Advance Amount Paid Till Date',
                        'Advance Payment Details'
                      )
                    }
                  >
                    Click here for details
                  </Typography>
                </Button>
              </TableCell>
              {/* </TableRow>
        <TableRow> */}
              <TableCell>Bill to be paid</TableCell>
              <TableCell>
                5000
                <Button variant='text' size='small'>
                  <Typography
                    variant='caption'
                    onClick={() =>
                      handleClickHere(
                        'Pending Bills To Pay So Far',
                        'Pending Bills to Pay Till Date Details'
                      )
                    }
                  >
                    Click here for details
                  </Typography>
                </Button>
              </TableCell>
            </TableRow>
          </Table>
          <Dialog
            sm
            fullWidth
            open={showMore}
            onClose={() => {
              setShowMore(false);
            }}
          >
            <DialogTitle>
              <Typography variant='h6' className={classes.dialogTitle}>
                {dialogTitle}
              </Typography>
              <IconButton
                className={classes.dialogCloseButton}
                onClick={() => setShowMore(false)}
                size='large'>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <BillDetailsTable tableTitle={tableTitle} />
          </Dialog>
        </>
      </CardContent>
    </Card>
  );
};

export default BillSummary;

const BillDetailsTable = (props) => {
  const { tableTitle } = props;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} direction='column'>
          <Grid item>
            <PatientShortDetails />
          </Grid>
          <Grid item>
            <Typography variant='h5'>{tableTitle}</Typography>
          </Grid>
          <Grid item>
            <DialogBillDetailsTable type={tableTitle} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const PatientShortDetails = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='h5'>Patient Details</Typography>
      </Grid>
      <Grid item container spacing={1} justifyContent='space-between'>
        <Grid item>
          <PatientShortDetailsHeading
            heading='Patient Name'
            value='Loading...'
          />
        </Grid>
        <Grid item>
          <PatientShortDetailsHeading heading='IP Number' value='Loading...' />
        </Grid>
        <Grid item>
          <PatientShortDetailsHeading heading='Room Type' value='Loading...' />
        </Grid>
      </Grid>
    </Grid>
  );
};
const DialogBillDetailsTable = (props) => {
  const { type } = props;
  if (type === 'Amount To Pay Details') {
    return (
      <Table>
        <TableRow>
          <TableCell>No. Of Days Admitted So Far</TableCell>
          <TableCell>3 Days</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Room Charges So Far</TableCell>
          <TableCell>5000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Dr. Consultation Charges So Far</TableCell>
          <TableCell>3500</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Total Charges To Pay</strong>
          </TableCell>
          <TableCell>8500</TableCell>
        </TableRow>
      </Table>
    );
  }
  if (type === 'Advance Payment Details') {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill No.</TableCell>
            <TableCell>Advanced Amount Paid</TableCell>
            <TableCell>Date Of Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>20101345</TableCell>
            <TableCell>Rs. 5000</TableCell>
            <TableCell>31-5-2021</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>20101360</TableCell>
            <TableCell>Rs. 10000</TableCell>
            <TableCell>1-6-2021</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Advance Paid Till Date</TableCell>
            <TableCell>Rs. 15000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  if (type === 'Pending Bills to Pay Till Date Details') {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill No.</TableCell>
            <TableCell>Pending amount to pay </TableCell>
            <TableCell>Date Of Billing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>20101345</TableCell>
            <TableCell>Rs. 5000</TableCell>
            <TableCell>31-5-2021</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>20101360</TableCell>
            <TableCell>Rs. 10000</TableCell>
            <TableCell>1-6-2021</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Pending Amount To Pay</TableCell>
            <TableCell>Rs. 15000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
};
const PatientShortDetailsHeading = (props) => {
  const { heading, value } = props;
  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography variant='h6'>{heading} :</Typography>
      </Grid>
      <Grid item>
        <Typography variant='body1'>{value}</Typography>
      </Grid>
    </Grid>
  );
};
