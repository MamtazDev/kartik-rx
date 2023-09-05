import _reduce from 'lodash/reduce';
import _get from 'lodash/get';

export const getAmount = ({ data, key }) => {
  return _reduce(data, (sum, bill) => {
    return sum + _get(bill, key, 0);
  }, 0);
};

export default getAmount;