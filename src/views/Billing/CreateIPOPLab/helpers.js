import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import { BILL_TYPES } from './billTypes';

export const prepareCreateBillData = (data) => {
  const instancesList = data.instances.map((instance) => ({
    ...instance,
    discount_amount: instance.discA,
    amount: instance.total,
    info: {
      ...instance.info,
      code: instance.code,
    }
  }));
  const totalAmount = instancesList.reduce((acc, instance) => acc + instance.amount, 0);
  return {
    ...data,
    bill_type: BILL_TYPES.LAB_SERVICE_BILL.identifier,
    // TODO: use billtype from view.
    additional_discount_amount: 0,
    description: '',
    remaining_amount: 0,
    instances: instancesList,
    amount: totalAmount,
  };
};

export const prepareCreateFinalBillData = (data) => {

  const instancesList = data.instances.map((instance) => ({
    ...instance,
    discount_amount: instance.discA,
    amount: instance.total,
    info: {
      ...instance.info,
      code: instance.code,
    }
  }));
  const totalAmount = instancesList.reduce((acc, instance) => acc + instance.amount, 0);

  return {
    ...data,
    bill_type: BILL_TYPES.FINAL_BILL.identifier,
    additional_discount_amount: 0,
    description: '',
    remaining_amount: 0,
    instances: instancesList,
    amount: totalAmount,
  };
};

export const create_instance_object = (services, itemtype) => {
  const item = _find(services, { code: itemtype });
  return {
    description: item.description,
    services: item.description,
    info: {
      rate: item.rate,
      quantity: item.quantity,
    },
    instance_type: itemtype,
    code: itemtype,
    total: item.rate * item.quantity,
    netAmount: item.rate * item.quantity,
    disabled: true,
    consDr: {
      first_name: '',
      last_name: '',
    },
    user_id: 0,
    discount_amount: 0,
    discount: {},
    discPerc: 0,
    discA: 0,
    amount: 0,
  };
};

export const defaultBillInstanceData = {
  description: '',
  services: '',
  consDr: {
    first_name: '',
    last_name: '',
  },
  info: {
    rate: 0,
    quantity: 0,
  },
  instance_type: 'LAB',
  user_id: 0,
  total: 0,
  discount_amount: 0,
  discount: {},
  discPerc: 0,
  discA: 0,
  amount: 0,
  netAmount: 0,
};

export const defaultBillData = {
  patient_id: 1,
  ip_id: 1,
  active: true,
  description: '',
  bill_type: 'IP_OP_BILL',
  amount: 2400.0,
  discount: {},
  discount_status: 'UNKNOWN',
  remaining_amount: 2400.0,
  instances: [],
  ip: {
    id: 1,
    patient_id: 1,
    doctor_id: 1,
    insurance: {
      name: 'string',
      number: 'string'
    },
    registration_type: 'IP',
    active: true,
    admitted_at: 1677805174.888816,
    discharged_at: null,
    ipno: 1,
    doctor: {
      first_name: 'doctor',
      last_name: '1',
      ids: 'u0flfswh'
    }
  },
  patient: {
    first_name: 'patient',
    last_name: '1',
    id: 1,
    gender: 'M',
    phone: 'string',
    mrno: 'nsopiz7m'
  }
};

export const getDefaultBillInstancesData = () => _cloneDeep(defaultBillInstanceData);
export const getDefaultBillData = () => ({
  ...defaultBillData,
  instances: [getDefaultBillInstancesData()]
});