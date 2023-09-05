
export const patientName = (patient) => {
  if (patient.first_name)
    return patient.first_name + ' ' + patient.last_name;

  return '';
};

export const doctorName = (doctor) => {
  if (!doctor)
    return '-';

  let name = patientName(doctor);
  if (name !== '')
    name = 'Dr. ' + name;

  return name;
};


export const statusView = (patient) => {
  return patient.active_status.log_info.description[0];
};


export const PATIENT_TYPE = {
  IP: 'IP',
  OP: 'OP',
};

export const BILL_DISCOUNT_STATUS = {
  UNKNOWN: 'UNKNOWN',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};
