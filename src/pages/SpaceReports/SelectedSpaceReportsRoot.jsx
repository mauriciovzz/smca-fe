import React from 'react';

import { useParams } from 'react-router-dom';

import ReportsRoot from 'src/pages/Reports';

const SelectedSpaceReportsRoot = () => {
  const { spaceId } = useParams();

  return (
    <ReportsRoot spaceId={spaceId} />
  );
};

export default SelectedSpaceReportsRoot;
