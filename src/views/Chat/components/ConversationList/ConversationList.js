import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import {
  Toolbar,
  Input,
  IconButton,
  Tooltip,
  Divider,
  List
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import useRouter from 'utils/useRouter';
import { ConversationListItem } from './components';

const useStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  searchInput: {
    flexGrow: 1
  }
}));

const ConversationList = props => {
  const { conversations, className, ...rest } = props;

  const {classes} = useStyles();
  const router = useRouter();
  const selectedConversation = router.match.params.id;

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder='Search contacts'
        />
        <Tooltip title='Search'>
          <IconButton edge='end' size='large'>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <List disablePadding>
        {conversations.map((conversation, i) => (
          <ConversationListItem
            active={conversation.id === selectedConversation}
            conversation={conversation}
            divider={i < conversations.length - 1}
            key={conversation.id}
          />
        ))}
      </List>
    </div>
  );
};

ConversationList.propTypes = {
  className: PropTypes.string,
  conversations: PropTypes.array.isRequired
};

export default ConversationList;
