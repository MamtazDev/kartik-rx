import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import { Divider } from '@mui/material';

import {
  ConversationToolbar,
  ConversationMessages,
  ConversationForm
} from './components';

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.white
  }
}));

const ConversationDetails = props => {
  const { conversation, className, ...rest } = props;

  const {classes} = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ConversationToolbar conversation={conversation} />
      <Divider />
      <ConversationMessages messages={conversation.messages} />
      <Divider />
      <ConversationForm />
    </div>
  );
};

ConversationDetails.propTypes = {
  className: PropTypes.string,
  conversation: PropTypes.object.isRequired
};

export default ConversationDetails;
