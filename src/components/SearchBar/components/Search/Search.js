import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Paper, Button, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.icon,
  },
  searchInput: {
    flexGrow: 1,
  },
  searchButton: {
    marginLeft: theme.spacing(2),
  },
}));

const Search = (props) => {
  const {
    placeholder,
    onSearch,
    formState,
    setFormState,
    value,
    setValue,
    className,
    ...rest
  } = props;

  const {classes} = useStyles();

  const handleChange = (event, a) => {
    setValue({ [event.target.name]: event.target.value });
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Paper className={classes.search} elevation={1}>
        <SearchIcon className={classes.searchIcon} />
        {setValue !== null ? (
          <Input
            className={classes.searchInput}
            name='searchText'
            disableUnderline
            placeholder={placeholder}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch(value.searchText);
              }
            }}
            value={value.searchText}
          />
        ) : (
          <Input
            className={classes.searchInput}
            disableUnderline
            placeholder={placeholder}
          />
        )}
      </Paper>
      <Button
        className={classes.searchButton}
        onClick={() => onSearch(value.searchText)}
        size='large'
        variant='contained'
        disabled={value.searchText === ''}
      >
        Search
      </Button>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
};

export default Search;
