import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Drawer, Grid, Typography, Button, Hidden } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

const useStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const TableEditBar = props => {
  const {
    selected,
    className,
    onMarkPaid,
    onMarkUnpaid,
    onDelete,
    ...rest
  } = props;

  const {classes} = useStyles();
  const open = selected.length > 0;

  return (
    <Drawer
      anchor='bottom'
      open={open}
      // eslint-disable-next-line react/jsx-sort-props
      PaperProps={{ elevation: 1 }}
      variant='persistent'
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Grid
          alignItems='center'
          container
          spacing={2}
        >
          <Hidden mdDown>
            <Grid
              item
              md={3}
            >
              <Typography
                color='textSecondary'
                variant='subtitle1'
              >
                {selected.length} selected
              </Typography>
            </Grid>
          </Hidden>
          <Grid
            item
            md={6}
            xs={12}
          >
            <div className={classes.actions}>
              <Button onClick={onMarkPaid}>
                <CheckIcon className={classes.buttonIcon} />
                Mark Paid
              </Button>
              <Button onClick={onMarkUnpaid}>
                <CloseIcon className={classes.buttonIcon} />
                Mark Unpaid
              </Button>
              <Button onClick={onDelete}>
                <DeleteIcon className={classes.buttonIcon} />
                Delete
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
};

TableEditBar.propTypes = {
  className: PropTypes.string,
  onDelete: PropTypes.func,
  onMarkPaid: PropTypes.func,
  onMarkUnpaid: PropTypes.func,
  selected: PropTypes.array.isRequired
};

export default TableEditBar;
