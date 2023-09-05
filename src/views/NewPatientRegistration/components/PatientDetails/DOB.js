import React from 'react';
import Typography from '@mui/material/Typography';

function calculateDetailedAge(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);

  const years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();
  const days = today.getDate() - birth.getDate();

  return `${years}Y ${months}M ${days}D`;
}

const DetailedAge = ({ birthdate }) => {
  const age = calculateDetailedAge(birthdate);

  return (
    <Typography variant='h5'>
      Age: {age}
    </Typography>
  );
};

export default DetailedAge;
