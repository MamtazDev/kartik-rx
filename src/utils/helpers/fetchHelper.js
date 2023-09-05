import { prepareErrorWithMsg } from 'utils/helpers/errorHandlers';
import { axiosInstance } from 'actions/helpers';
import _castArray from 'lodash/castArray';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';

const fetchCommon = (url, payloadObj, successPaylod, failurePayload, { dispatch }) => {
  payloadObj.headers = {
    'Content-Type': 'application/json'
  };

  fetch(url, payloadObj).then(res => {
    if (!res.ok) {
      return prepareErrorWithMsg(res);
    }
    return res.json();
  }).then(res => {
    if (!successPaylod.payload)
      successPaylod.payload = {};

    successPaylod.payload.data = res;
    dispatch(successPaylod);
  }).catch(err => {
    console.log('fetch err::', err);

    if (!failurePayload.payload)
      failurePayload.payload = {};

    failurePayload.payload.message = err.message;
    dispatch(failurePayload);
  });
};

const saveCommon = (url, payloadObj, successPaylod, failurePayload, { dispatch }) => {
  payloadObj.headers = {
    'Content-Type': 'application/json'
  };

  fetch(url, payloadObj).then(res => {
    if (!res.ok) {
      return prepareErrorWithMsg(res);
    }
    dispatch(successPaylod);
  }).catch(err => {
    console.log('fetch err::', err);

    if (!failurePayload.payload)
      failurePayload.payload = {};

    failurePayload.payload.message = err.message;
    dispatch(failurePayload);
  });
};


const axiosCommon = (type, url, payloadObj, successPayload, failurePayload, { dispatch }) => {
  let req;
  if (type === 'get') {
    req = axiosInstance.get(url);
  } else {
    req = axiosInstance.post(url, payloadObj);
  }

  req.then(res => {
    let payload = {};
    if (successPayload.payload)
      payload = { ...successPayload.payload };

    payload.data = res.data;

    _map(_castArray(successPayload.type), (action_type) => {
      dispatch({
        type: action_type,
        payload
      });
    });
  }).catch(err => {
    console.log('request err::', err);

    let payload = {};
    if (failurePayload.payload)
      payload = { ...failurePayload.payload };

    payload.message = err.message;

    _map(_castArray(failurePayload.type), (action_type) => {
      dispatch({
        type: action_type,
        payload
      });
    });
  });
};

const axiosGetCommon = (url, payloadObj, successPaylod, failurePayload, { dispatch }) => {
  let urlModified;
  if (_isEmpty(payloadObj)) {
    urlModified = url;
  } else {
    const params = new URLSearchParams({
      ...payloadObj
    }).toString();

    urlModified = `${url}?${params}`;
  }

  axiosCommon('get', urlModified, payloadObj, successPaylod, failurePayload, { dispatch });
};

const axiosPostCommon = (url, payloadObj, successPaylod, failurePayload, { dispatch }) => {
  axiosCommon('post', url, payloadObj, successPaylod, failurePayload, { dispatch });
};

export {
  fetchCommon,
  saveCommon,
  axiosGetCommon,
  axiosPostCommon,
};