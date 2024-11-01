import React from 'react';

const BackdropBlur = ({ index }) => (
  <div className={`${index} absolute left-0 top-0 size-full bg-slate-300/25 p-4 backdrop-blur-sm`} />
);

export default BackdropBlur;
