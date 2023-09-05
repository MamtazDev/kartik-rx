import React from 'react';

import { makeStyles } from 'tss-react/mui';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Button,
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles()(theme => ({
  root: {},
  viewReport: {
    padding: theme.spacing(1),
    flexGrow: 1,
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  },
}));

const ViewReport = (props) => {
  const {classes} = useStyles();

  return (
    <div className={props.statsContainerClass}>
      <div className={classes.viewReport}>
        <Typography
          align='center'
          variant='h6'
        >
          <Button
            color='primary'
            component={RouterLink}
            size='small'
            to='/kanban-board'
            variant='text'
          >
                    View Report
            <ArrowForwardIcon className={classes.arrowForwardIcon} />
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default ViewReport;