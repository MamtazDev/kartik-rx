import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Loader from 'atoms/Loader';

import Button from '@mui/material/Button';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from 'tss-react/mui';
import Divider from '@mui/material/Divider';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Search } from 'components/SearchBar/components';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';


const useStyles = makeStyles()((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  noPad: {
    padding: theme.spacing(0),
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  },
  createButtonStyles: {
    color: green[500],
    float: 'right',
    marginRight: '20%',
    marginTop: '15%',
  },
  searchSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

const ROWS_PER_PAGE_OPTIONS = [5, 8, 13];
const ROWS_PER_PAGE = 8;

// A table view component shared across all the views of admin page
// i.e. user_manage/courses/offerings....
const TableView = (props) => {
  const { classes } = useStyles();

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
  };

  const renderTableData = (props, currentPage) => {
    const {
      columns,
      tableData,
      loaded,
      actionButtons,
      pageTitle,
      onSearch,
      handleDelete,
      headerActionButtons,
    } = props;

    if (!loaded) {
      return (
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Grid
            item
            style={{ alignSelf: 'center', position: 'fixed', top: '50%' }}
          >
            <Loader />
          </Grid>
        </Grid>
      );
    }

    const getCellContent = (row, column) => {
      if (row.components && row.components[column.id]) {
        if (row.components.del) {
          return (
            <IconButton onClick={() => handleDelete(row.key)} size='large'>
              {row.components[column.id]}
            </IconButton>
          );
        }
        return row.components[column.id];
      }

      return <Typography>{_get(row, column.id)}</Typography>;
    };

    return (
      <div>
        {onSearch && (
          <Grid className={classes.searchSection} container spacing={3}>
            <Grid item></Grid>
            <Grid item style={{ paddingBottom: 0 }}>
              <Search className={classes.search} onSearch={onSearch} />
            </Grid>
          </Grid>
        )}
        {props.displayPagination && (
          <Typography
            color='textSecondary'
            gutterBottom
            variant='body2'
            style={{ marginTop: '5px' }}
          >
            {tableData.length
              ? `${tableData.length} Records found. Page ${currentPage + 1} of
              ${Math.ceil(tableData.length / rowsPerPage)}`
              : '0 Records found.'}
          </Typography>
        )}
        <Card>
          {(pageTitle || !_isEmpty(headerActionButtons)) && (
            <>
              <CardHeader
                action={
                  headerActionButtons &&
                  _map(headerActionButtons, (actionButton) => (
                    <Button
                      key={`${actionButton.label}_action`}
                      variant='outlined'
                      onClick={() =>
                        actionButton.onClick({})
                      }
                    >
                      {actionButton.label}
                    </Button>
                  ))
                }
                title={pageTitle}
              />
              <Divider />
            </>
          )}
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  {/* HEAD */}
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={column.className}
                        >
                          <Typography>
                            <Box component='span' fontWeight={700}>
                              {column.label}
                            </Box>
                          </Typography>
                        </TableCell>
                      ))}
                      {actionButtons.length > 0 && (
                        <TableCell key='actionbuttons'>
                          <Typography>
                            <Box component='span' fontWeight={700}>
                              Actions
                            </Box>
                          </Typography>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>

                  {/* Content */}
                  <TableBody>
                    {_map(
                      tableData.slice(
                        currentPage * rowsPerPage,
                        currentPage * rowsPerPage + rowsPerPage
                      ),
                      (row, index) => {
                        return (
                          <TableRow tabIndex={-1} key={row.id + `_${index}`}>
                            {_map(columns, (column) => (
                              <TableCell key={column.id} align={column.align}>
                                {getCellContent(row, column)}
                              </TableCell>
                            ))}
                            {actionButtons.length > 0 && (
                              <TableCell>
                                {actionButtons &&
                                  _map(actionButtons, (actionButton, index) => (
                                    <Button
                                      key={row.id + `_${index}_action`}
                                      size='small'
                                      color={actionButton.color}
                                      variant={actionButton.variant || 'outlined'}
                                      // TODO: fix this, have styles more common?
                                      style={{
                                        color: actionButton.color
                                          ? actionButton.color
                                          : green[500],
                                        marginRight: '2%',
                                        marginTop: '1%',
                                        ...actionButton?.style
                                      }}
                                      onClick={() =>
                                        actionButton.onClick(row.editObj)
                                      }
                                    >
                                      {actionButton.label}
                                    </Button>
                                  ))}
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
            {!tableData.length && !props.handleAdd && (
              <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
              >
                <Grid item style={{ alignSelf: 'center', marginTop: '3%' }}>
                  <Typography variant='h5'>No data found.</Typography>
                </Grid>
              </Grid>
            )}
            {props.handleAdd && (
              <Box m={1}>
                <Button startIcon={<AddIcon />} onClick={props.handleAdd}>
                  Add
                </Button>
              </Box>
            )}
          </CardContent>
          {props.displayPagination && (
            <CardActions className={classes.actions}>
              <TablePagination
                component='div'
                count={tableData.length}
                onPageChange={handlePageChange}
                page={currentPage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardActions>
          )}
        </Card>
      </div>
    );
  };

  return renderTableData(props, currentPage);
};

TableView.propTypes = {
  columns: PropTypes.array,
  tableData: PropTypes.array,
  pageTitle: PropTypes.string,
  createLabel: PropTypes.string,
  editLabel: PropTypes.string,
  loaded: PropTypes.bool,
  onSearch: PropTypes.func,
  displayPagination: PropTypes.bool,
  // TODO: Put in proper shape
  headerActionButtons: PropTypes.array,
  actionButtons: PropTypes.array,
  className: PropTypes.string,
};

TableView.defaultProps = {
  createLabel: 'New',
  editLabel: 'Edit',
  headerActionButtons: [],
  actionButtons: [],
  displayPagination: false,
};

export default TableView;
