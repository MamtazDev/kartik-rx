import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Input,
  Checkbox,
  Button,
  Typography,
  MenuItem,
  TextField,
  IconButton,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TableView from 'components/Table/Table';
import SearchIcon from '@mui/icons-material/Search';



const useStyles = makeStyles()({
  userDetailesItem: {
    display: 'flex',
    alignItems: 'center'
  },
  changeRoomFormItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px'
  },
  changeTypography: {
    paddingRight: '10px',
    color: '#3f51b5',
    fontWeight: 'bold'
  }
});


let DATAS = [
  {
    id: 1,
    start_date: new Date().toDateString(),
    end_date: new Date().toDateString(),
    room_type: 'NICU',
    bed_no: '20',
    no_of_days: '1',
  },
];


const COLUMNS = [
  { id: 'check_box', label: ' ', align: 'center' },
  { id: 'start_date', label: 'Room Start Date & Time', align: 'center' },
  { id: 'end_date', label: 'Room End Date & Time', align: 'center' },
  { id: 'room_type', label: 'Room Type', align: 'center' },
  { id: 'bed_no', label: 'Bed No', align: 'center' },
  { id: 'no_of_days', label: 'No.of Days', align: 'center' },

];

const ROOM_CHARGES = {
  NICU: {
    cost: 2000,
    rooms: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109]
  },
  ICU: {
    cost: 5000,
    rooms: [200, 201, 202, 203, 204, 205, 206, 207, 208, 209]
  },
  Casualty: {
    cost: 1000,
    rooms: [300, 301, 302, 303, 304, 305, 306, 307, 308, 309]
  },
  'Deluxe Room': {
    cost: 3000,
    rooms: [400, 401, 402, 403, 404, 405, 406, 407, 408, 409]
  },
};



function ChangeIpTable() {

  const classes = useStyles();

  const [selected, setSelected] = useState(null);
  const [changing, setChanging] = useState(null);
  const [datas, setDatas] = useState(DATAS);
  const [changeRoomForm, setChangeRoomForm] = useState({
    room_type: '',
    bed_no: '',
    start_date: new Date().toDateString(),
    room_charges_per_day: '',
    consultation_charges_per_day: ''

  });

  const handleCheck = (id) => {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };

  const handleChangeButton = () => {
    let selectedData = datas.filter((data) => data.id === selected);
    setDatas([...selectedData]);
    setChanging(changing => !changing);
  };

  const handleRoomTypeChange = (event) => {
    setChangeRoomForm({ ...changeRoomForm, room_type: event.target.value, room_charges_per_day: ROOM_CHARGES[event.target.value].cost });
  };



  const handleAddCheckBox = () => {
    return DATAS.map((item) => ({ ...item, check_box: <Checkbox checked={item.id === selected ? true : false} onClick={() => handleCheck(item.id)} /> }));
  };

  return (
    <Card style={{ marginTop: '20px', padding: '0px' }}>
      <CardHeader title={
        <Grid container spacing={1} justifyContent='space-between' alignItems='center'>
          <Grid item xs={2} ><Typography variant='h5'>Change IP Room</Typography> </Grid>

          <Grid item xs={10} >
            <Grid container justifyContent='space-between' alignItems='center' >

              <Grid item xs={12} >
                <Grid className={classes.userDetailesItem}  >
                  <Typography variant='h5' style={{ marginRight: '20px' }}>Mr.No :</Typography>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant='standard'
                    disabled={true}
                    size='small'
                    value={''}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} >
                <Grid className={classes.userDetailesItem}  >

                  <Typography variant='h5' style={{ marginRight: '20px' }}>IP.No :</Typography>
                  <Input placeholder='Eg : 101' variant='outlined' />
                  <IconButton variant='outlined' color='primary' onClick={() => { }} size='large'>
                    <SearchIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid className={classes.userDetailesItem}  >

                  <Typography variant='h5' style={{ marginRight: '20px' }}>Patient Name :</Typography>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant='standard'
                    disabled={true}
                    size='small'
                    value={''}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      } />
      <Divider />

      <CardContent>
        <Divider />
        <PerfectScrollbar options={{ suppressScrollY: true }}>
          <TableView
            columns={COLUMNS}
            tableData={handleAddCheckBox()}
            loaded={true}
            pageTitle={'Change IP Room'}

          />
        </PerfectScrollbar>
        <Grid style={{ margin: '30px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' color='primary' disabled={!selected ? true : false} onClick={handleChangeButton}>Change Room</Button>
        </Grid>

        <Divider />
        {
          selected && changing && (<form>
            <Grid
              container
              fullWidth
              wrap='wrap'
            >
              <Grid item md={4} >
                <Grid className={classes.changeRoomFormItem} justifyContent='space-between'>
                  <Typography className={classes.changeTypography}>Select Room Type : </Typography>
                  <TextField
                    select
                    style={{ minWidth: '200px' }}
                    label='Select Room Type'
                    name='SelectRoomType'
                    onClick={handleRoomTypeChange}
                  >
                    {
                      Object.keys(ROOM_CHARGES).map((item, index) => (<MenuItem key={index} value={item}>{item}</MenuItem>))
                    }

                  </TextField>
                </Grid>
                <Grid className={classes.changeRoomFormItem} justifyContent='space-between'>
                  <Typography className={classes.changeTypography}>Select Bed No : </Typography>
                  <TextField
                    select
                    style={{ minWidth: '200px' }}
                    label='Select Bed No'
                    name='SelectRoomType'
                  >
                    {
                      changeRoomForm.room_type ? ROOM_CHARGES[changeRoomForm.room_type]?.rooms.map((item, index) => (<MenuItem key={index} value={item}>{item}</MenuItem>))
                        : (<MenuItem value='M'>Type 1</MenuItem>)
                    }

                  </TextField>
                </Grid>
              </Grid>
              <Grid item md={4} container justifyContent='space-between'>
                <Grid className={classes.changeRoomFormItem}>
                  <Typography className={classes.changeTypography}>Room Charges Per Day  :  </Typography>
                  <Typography style={{ paddingRight: '10px' }}> {changeRoomForm.room_charges_per_day}</Typography>
                </Grid>
                <Grid className={classes.changeRoomFormItem} >
                  <Typography className={classes.changeTypography}>Room Start Date & Time : </Typography>
                  <Typography style={{ paddingRight: '10px' }}> {new Date().toDateString()}</Typography>
                </Grid>
              </Grid>
              <Grid item md={4} className={classes.changeRoomFormItem}>
                <Typography className={classes.changeTypography}>Consultation Charges Per Day : </Typography>
                <TextField label='Consultation Charges..' />
              </Grid>
            </Grid>
            <Grid className={classes.changeRoomFormItem} style={{ margin: '30px 0', width: '100%', justifyContent: 'center' }}>
              <Button variant='contained' color='primary'>Update Room</Button>
            </Grid>
          </form>)
        }
      </CardContent>
    </Card>
  );
}

export default ChangeIpTable;