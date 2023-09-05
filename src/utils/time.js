import moment from 'moment';

export const dateToAppDate = (date) => {
  return moment(date).format('ddd, MMM DD YYYY');
};

export const dateToAppDateTime = (date) => {
  return moment(date).format('DD MMM YYYY, hh:mma');
};

export const dateToAppTime = (date) => {
  return moment(date).format('hh:mma');
};

export const timestampToAppDate = (timestamp) => {
  return moment.unix(timestamp).format('ddd, MMM DD YYYY');
};

export const timestampToAppDateTime = (timestamp) => {
  return moment.unix(timestamp).format('MMM DD YYYY, hh:mma');
};

export const formToApi = (date) => {
  return moment(date).utc().format('ddd MMM DD HH:mm:ss z YYYY');
};

export const calculateAge = (date) => {
  let age = moment(date).fromNow();
  return age.substring(0, age.length - 3);
};
