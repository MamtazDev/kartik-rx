import React, { useState } from 'react';
import InvestigationsBase, {VIEW_TYPES} from '../Investigations/components/InvestigationsBase';

function CancelledTest() {
  return (
    <InvestigationsBase
      viewType={VIEW_TYPES.CANCELLED}
    />
  );
}

export default CancelledTest;
