import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Search } from 'components/SearchBar/components';
import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()((theme) => ({
  cardStyle: {
    marginTop: theme.spacing(1),
  },
  cardContentStyle: {
    marginTop: theme.spacing(-2),
    paddingTop: 0,
  },
}));

const SearchWith = (props) => {
  const { baseUrl, setUrl, onSearch, ...rest } = props;
  const {classes} = useStyles();

  const [searchFor, setSearchFor] = useState('mrNo');
  const [value, setValue] = useState({searchText: ''});

  useEffect(() => {
    let url = baseUrl + searchFor +'?' + searchFor + '=' +value;
    setUrl(url);
  }, [baseUrl, searchFor, setUrl, value]);

  const handleTypeChange = (event) => {
    setSearchFor(event.target.value);
  };

  return (
    <Card {...rest} className={classes.cardStyle}>
      <CardHeader title='Search With' />
      <CardContent className={classes.cardContentStyle}>
        <Grid container justifyContent='flex-start' alignItems='center'>
          <Grid container item xs={5} direction='row'>
            <FormControl component='fieldset'>
              <Grid item>
                <RadioGroup
                  row
                  aria-label='searchWith'
                  name='searchWith'
                  value={searchFor}
                  onChange={handleTypeChange}
                >
                  <FormControlLabel
                    value='mrNo'
                    control={<Radio />}
                    label='Mr. No.'
                  />
                  <FormControlLabel
                    value='ipNo'
                    control={<Radio />}
                    label='Ip No.'
                  />
                  <FormControlLabel
                    value='phNo'
                    control={<Radio />}
                    label='Ph No.'
                  />
                  <FormControlLabel
                    value='patientName'
                    control={<Radio />}
                    label='Patient Name'
                  />
                </RadioGroup>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <Search
              placeholder='Search Mr.No./ IP No./ Ph No./ Patient Name'
              onSearch={onSearch}
              value={value}
              setValue={setValue}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SearchWith.propTypes = {
  className: PropTypes.string,
};

export default SearchWith;
