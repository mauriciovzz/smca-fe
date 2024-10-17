import { React } from 'react';

const Divider = ({ changePadding, noBottomPadding, changeColor }) => {
  const padding = !changePadding ? 'p-2.5' : changePadding;
  const color = !changeColor ? '' : changeColor;

  return (
    <div className="w-full">
      <div className={`${padding} ${color} w-full border-b`} />
      <div className={`${noBottomPadding ? '' : padding} w-full`} />
    </div>
  );
};

export default Divider;
