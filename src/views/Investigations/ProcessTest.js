import React, { useState, useEffect } from 'react';
import { Page, Header, SearchWithDate } from 'components';
import InvestigationsBase, {VIEW_TYPES} from './components/InvestigationsBase';
import { axiosInstance } from 'actions/helpers';
import {timestampToAppDateTime} from 'utils/time';

const ProcessTest = () => {
  return (
    <InvestigationsBase
      viewType={VIEW_TYPES.PROCESS}
    />
  );
};

export default ProcessTest;
