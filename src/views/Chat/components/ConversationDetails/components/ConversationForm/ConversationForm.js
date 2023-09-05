import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import {
  Avatar,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const useStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  paper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

const ConversationForm = props => {
  const { className, ...rest } = props;

  const {classes} = useStyles();

  const fileInputRef = useRef(null);

  const [value, setValue] = useState('');

  const sender = {
    avatar: '/images/avatars/avatar_11.png'
  };

  const handleChange = event => {
    event.persist();

    setValue(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt='Person'
        src={sender.avatar}
      />
      <Paper
        className={classes.paper}
        elevation={1}
      >
        <Input
          className={classes.input}
          disableUnderline
          onChange={handleChange}
          placeholder='Leave a message'
        />
      </Paper>
      <Tooltip title='Send'>
        <IconButton color={value.length > 0 ? 'primary' : 'default'} size='large'>
          <SendIcon />
        </IconButton>
      </Tooltip>
      <Divider className={classes.divider} />
      <Tooltip title='Attach photo'>
        <IconButton edge='end' onClick={handleAttach} size='large'>
          <AddPhotoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Attach file'>
        <IconButton edge='end' onClick={handleAttach} size='large'>
          <AttachFileIcon />
        </IconButton>
      </Tooltip>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type='file'
      />
    </div>
  );
};

ConversationForm.propTypes = {
  className: PropTypes.string
};

export default ConversationForm;
