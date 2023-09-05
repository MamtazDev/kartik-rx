export const PAYMENT_OPTIONS = {
  UPI: {
    identifier: 'UPI',
    displayText: 'UPI',
    popupDialog: 'Enter UPI transaction id',
    transactionIdDisplay: true,
    disableProceedBtn: true,
  },
  CARD: {
    identifier: 'CARD',
    displayText: 'Credit/Debit Card',
    popupDialog: 'Enter transaction id',
    transactionIdDisplay: true,
    disableProceedBtn: true,
  },
  CASH: {
    identifier: 'CASH',
    displayText: 'CASH',
    popupDialog: 'By clicking on confirm button you are confirming that you have received the cash payment from the patient.',
    transactionIdDisplay: false,
    disableProceedBtn: false,
  },
  PENDING: {
    identifier: 'PENDING',
    displayText: 'PENDING',
    popupDialog: 'Payment is pending. Please confirm once payment is received.',
    transactionIdDisplay: false,
    disableProceedBtn: false,
  },
};
  