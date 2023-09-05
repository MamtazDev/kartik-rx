import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from 'tss-react/mui';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import axios from 'utils/axios';

const useStyles = makeStyles()((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 400,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const BillList = (props) => {
  const { className, ...rest } = props;
  const {classes} = useStyles();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    let mounted = true;
    // console.log("here");

    async function fetchBills() {
      try {
        let result = await axios.get('/api/billingList/1234');
        console.log(result);
        let billsData = result.data.billsList;
        await setBills(billsData);
      } catch (error) {
        console.log(error);
      }
    }
    // const fetchTasks = () => {
    //   axios.get("/api/billingList/1234").then((response) => {
    //     if (mounted) {
    //       console.log(response)
    //       setBills(response.data.billsList);
    //     }
    //   });
    // };

    fetchBills();

    return () => {
      mounted = false;
    };
  }, []);

  let headers = ['Date', 'Catgry', 'Description', 'Paid', 'Pending'];
  let responseHead = ['date', 'type', 'dis','paid_amount','pending_amount'];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title='Bills' />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((bill) => {
                return (
                  <TableRow key={bill.id}>
                    {responseHead.map((header) => {
                      let comp = bill[header];
                      return(
                        <TableCell key={header}>{comp}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {/* <div className={classes.inner}>
            <List>
              {bills.map((bill, i) => (
                <BillItem
                  divider={i < bills.length - 1}
                  key={bill.id}
                  bill={bill}
                />
              ))}
            </List>
          </div> */}
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color='primary'
          //   component={RouterLink}
          size='small'
          //   to='/kanban-board'
          variant='text'
        >
          See all
          <ArrowForwardIcon className={classes.arrowForwardIcon} />
        </Button>
      </CardActions>
    </Card>
  );
};

BillList.propTypes = {
  className: PropTypes.string,
};

export default BillList;
