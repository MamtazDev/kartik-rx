import {timestampToAppDateTime} from 'utils/time';
import _ceil from 'lodash/ceil';
import _map from 'lodash/map';

export const PatientData = (patientData, billNo, created_time) => {

  const {full_name, age, sex, phone, ip, op, assigned_room, patient_id } = patientData;

  const PatientDataHeader = {
    'Name: ': full_name,
    'Age / Gender': age + ' / ' + sex,
    'Mobile No': phone,
    'Doctor': op ? (op.doctor?.full_name) : (ip.doctor?.full_name),
    'Department': 'Department Name',
    ...!op && {'Ward / Bed No': assigned_room.name +', '+ assigned_room.room_type.name},
    'Source Type': 'Hospital',
    ...!op && {'IP No': ip.ipno},
    'MR No': patient_id,
    'Bill No': billNo,
    'Bill Date': timestampToAppDateTime(created_time),
    ...!op && {'Admission Date': ip.admissionTimeandDate},
    ...!op && {'Discharge Date': ip.dischargeTimeandDate},
  };

  const rows = _map(Object.keys(PatientDataHeader), (key) => {
    return [{ text: key }, { text: PatientDataHeader[key] }];
  });

  const half = _ceil(rows.length / 2);
  const leftColumn = rows.slice(0, half);
  const rightColumn = rows.slice(half,rows.length);

  return {
    layout: {
      hLineColor: (i, node) => {
        return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
      },
      vLineColor: (i, node) => {
        return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
      },
    },
    table: {
      widths: ['auto', '*',  'auto', '*'],
      body: _map(leftColumn,(row, i) => [
        { text: row[0].text, bold: true, style: 'textBody' },
        { text: ': ' + row[1].text, style: 'textBody' },
        { text: rightColumn[i] ? rightColumn[i][0].text : '', style: 'textBody', bold: true },
        { text: rightColumn[i] ? ': ' + rightColumn[i][1].text : '', style: 'textBody' },
      ]),
    }
  };
};
  