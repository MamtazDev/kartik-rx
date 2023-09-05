import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { axiosInstance } from 'actions/helpers';
import TextFieldRx from 'atoms/TextField';
import React, { useEffect, useState } from 'react';
const useStyles = makeStyles()((theme) => ({
  options: {
    marginTop: theme.spacing(-2),
  },
}));

const RoomDetails = (props) => {
  const {
    className,
    patient,
    consDoctor,
    onSubmit,
    control,
    selectedPatientRegistrationType,
    registration_info,
    setValue,
    errors,
    ...rest
  } = props;

  const [roomsData, setRoomsData] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);

  const { classes } = useStyles();
  const prepareRoomData = (data) => {
    let finalData = {};
    data.forEach((room) => {
      if (finalData[room.type]) finalData[room.type].push(room);
      else finalData[room.type] = [room];
    });

    return finalData;
  };

  useEffect(() => {
    let roomType = registration_info.room_type;
    if (!roomsData[roomType]) return;
    let rooms = roomsData[roomType].map((room) => (
      <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
    ));
    setRoomOptions(rooms);
  }, [registration_info.room_type]);

  useEffect(() => {
    let roomType = registration_info.room_type;
    let roomNumber = registration_info.room_id;
    if (!roomNumber) return;

    setValue(
      'registration_info.roomChargesPerDay',
      roomsData[roomType].filter((ele) => ele.id === roomNumber)[0].amount
    );
    setValue(
      'registration_info.consultation_charges',
      roomsData[roomType].filter((ele) => ele.id === roomNumber)[0]
        .consultation_charges
    );
  }, [registration_info.room_type, registration_info.room_id]);

  useEffect(() => {
    async function getRooms() {
      let data = prepareRoomData(
        (await axiosInstance.get('/rooms/available')).data
      );

      setRoomsData(data);
      let roomTypes = Object.keys(data).map((room) => (
        <MenuItem key={room} value={room}>
          {room}
        </MenuItem>
      ));
      setRoomType(roomTypes);
    }
    getRooms();
  }, []);

  console.log(roomsData, 'RD');
  return (
    <div className={className}>
      <Card>
        <CardHeader title='Room Details' />
        <CardContent className={classes.options}>
          {Object.keys(roomsData).length === 0 && (
            <div style={{ position: 'relative', height: '10px' }}>
              <Typography
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '-20px',
                }}
              >
                * No Rooms are available
              </Typography>
            </div>
          )}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                select
                name='registration_info.room_type'
                label='Select Room type'
                fullWidth
                rules={{
                  required: {
                    value:
                      selectedPatientRegistrationType === 'IP' ? true : false,
                    message: 'You must Select room type',
                  },
                }}
                error={Boolean(errors?.registration_info?.room_type)}
                helperText={
                  errors?.registration_info?.room_type
                    ? errors?.registration_info.room_type.message
                    : false
                }
              >
                {roomType}
              </TextFieldRx>
            </Grid>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                select
                label='Select Bed number'
                name='registration_info.room_id'
                fullWidth
                rules={{
                  required: {
                    value:
                      selectedPatientRegistrationType === 'IP' ? true : false,
                    message: 'You must Select room number',
                  },
                }}
                error={Boolean(errors?.registration_info?.room_id)}
                helperText={
                  errors?.registration_info?.room_id
                    ? errors?.registration_info.room_id.message
                    : false
                }
              >
                {roomOptions}
              </TextFieldRx>
            </Grid>

            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                value={registration_info.roomChargesPerDay}
                name='registration_info.roomChargesPerDay'
                label='Room charges per day'
                fullWidth
                rules={{
                  required: {
                    value:
                      selectedPatientRegistrationType === 'IP' ? true : false,
                    message: 'You must enter room charges per day',
                  },
                }}
                error={Boolean(errors?.registration_info?.roomChargesPerDay)}
                helperText={
                  errors?.registration_info?.roomChargesPerDay
                    ? errors?.registration_info.roomChargesPerDay.message
                    : false
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldRx
                control={control}
                label='Consultation charges per day'
                name='registration_info.consultation_charges'
                fullWidth
                rules={{
                  required: {
                    value:
                      selectedPatientRegistrationType === 'IP' ? true : false,
                    message: 'You must enter consultation charges per day',
                  },
                }}
                error={Boolean(
                  errors?.registration_info?.consultationChargesPerDay
                )}
                helperText={
                  errors?.registration_info?.consultationChargesPerDay
                    ? errors?.registration_info.consultationChargesPerDay
                      .message
                    : false
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomDetails;
