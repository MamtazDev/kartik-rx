import React, {useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ConfirmCancelButtons from 'molecules/ConfirmCancelButtons';
import { makeStyles } from 'tss-react/mui';

import Zoom from '@mui/material/Zoom';
import { axiosInstance } from 'actions/helpers';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Loader from 'atoms/Loader';

const useStyles = makeStyles()((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const UrlFnInfoDialog = (props) => {
  const { isOpen, title, onClose, queryUrl, editObj, displayFn } = props;
  const {classes} = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if(isOpen) {
      setLoaded(false);
      axiosInstance.get(queryUrl).then(res => {
        setData(res.data);
        setLoaded(true);
      }).catch(err => {console.log(err);});
    }
  }, [isOpen]);


  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Zoom}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h4'>{title}</Typography>
        <IconButton onClick={onClose} size='large'>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {loaded ? displayFn(data, editObj) :  <Loader />}
      </DialogContent>
    </Dialog>
  );
};

UrlFnInfoDialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  queryUrl: PropTypes.string,
  displayFn: PropTypes.func
};


export default UrlFnInfoDialog;


