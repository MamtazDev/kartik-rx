import moment from 'moment';
import _ceil from 'lodash/ceil';

export const calculateDaysBetween = (startDate, endDate) => {
  if(!startDate) return 0;
  const _startDate = moment(parseFloat(startDate) * 1000);
  const _endDate = endDate ? moment(parseFloat(endDate) * 1000) : moment();
  const days = _ceil(_endDate.diff(_startDate, 'days', true));
  return days;
};