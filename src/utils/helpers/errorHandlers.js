
export const prepareErrorWithMsg = (res) => {
  // Takes a response object and throws and error with response message
  return res.json().then(err => {
    let error = {
      ...err,
      message: err.message,
      error: new Error(res.status)
    };
    throw error;
  });
};