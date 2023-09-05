/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid/v1';
import { makeStyles } from 'tss-react/mui';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Grid,
  colors
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const useStyles = makeStyles()(theme => ({
  root: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: theme.breakpoints.values.md,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  field: {
    marginTop: theme.spacing(3)
  },
  cancelButton: {
    marginLeft: 'auto'
  },
  confirmButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const AddEditEvent = forwardRef((props, ref) => {
  const {
    event,
    onDelete,
    onCancel,
    onAdd,
    onEdit,
    className,
    ...rest
  } = props;

  const {classes} = useStyles();

  const defaultEvent = {
    name: '',
    fathername: '',
    mothername: '',
    mrNo: '',
    phnNo: '',
    gender: '',
    allDay: false,
    start: moment().toDate(),
    end: moment().toDate()
  };

  const [values, setValues] = useState(event || defaultEvent);

  const mode = event ? 'edit' : 'add';

  const handleFieldChange = e => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleDelete = () => {
    onDelete && onDelete(event);
  };

  const handleAdd = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onAdd({ ...values, id: uuid() });
  };

  const handleEdit = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onEdit(values);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      ref={ref}
    >
      <form>
        <CardContent>
          <Typography
            align='center'
            gutterBottom
            variant='h3'
          >
            {mode === 'add' ? 'Add Patient' : 'Edit Patient'}
          </Typography>
          <Grid
            className={classes.container}
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                className={classes.field}
                fullWidth
                label='Name'
                name='name'
                onChange={handleFieldChange}
                value={values.title}
                variant='outlined'
              />
              <TextField
                className={classes.field}
                fullWidth
                label="Father's Name"
                name='fathername'
                onChange={handleFieldChange}
                value={values.desc}
                variant='outlined'
              />
              <TextField
                className={classes.field}
                fullWidth
                label="Mother's Name"
                name='mothername'
                onChange={handleFieldChange}
                value={values.desc}
                variant='outlined'
              />
              <TextField
                className={classes.field}
                fullWidth
                label='Gender'
                name='gender'
                onChange={handleFieldChange}
                value={values.gender}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                className={classes.field}
                fullWidth
                label='MR No.'
                name='mrno'
                onChange={handleFieldChange}
                value={values.mrNo}
                variant='outlined'
              />
              <TextField
                className={classes.field}
                fullWidth
                label='Phone No.'
                name='phnNo'
                onChange={handleFieldChange}
                value={values.phnNo}
                variant='outlined'
              />
              {/* <FormControlLabel
                className={classes.field}
                control={
                  <Switch
                    checked={values.allDay}
                    name="allDay"
                    onChange={handleFieldChange}
                  />
                }
                label="All day"
              />
              <TextField
                className={classes.field}
                defaultValue={moment(values.start).format('YYYY-MM-DDThh:mm:ss')}
                fullWidth
                label="Start date"
                name="start"
                onChange={handleFieldChange}
                type="datetime-local"
                variant="outlined"
              />
              <TextField
                className={classes.field}
                defaultValue={moment(values.end).format('YYYY-MM-DDThh:mm:ss')}
                disabled={values.allDay}
                fullWidth
                label="End date"
                name="end"
                onChange={handleFieldChange}
                type="datetime-local"
                variant="outlined"
              /> */}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton edge='start' onClick={handleDelete} size='large'>
            <DeleteIcon />
          </IconButton>
          <Button
            className={classes.cancelButton}
            onClick={onCancel}
            variant='contained'
          >
            Cancel
          </Button>
          {mode === 'add' ? (
            <Button
              className={classes.confirmButton}
              onClick={handleAdd}
              variant='contained'
            >
              Add
            </Button>
          ) : (
            <Button
              className={classes.confirmButton}
              onClick={handleEdit}
              variant='contained'
            >
              Save
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
});

AddEditEvent.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default AddEditEvent;
