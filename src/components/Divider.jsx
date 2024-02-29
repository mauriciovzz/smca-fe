import { React } from 'react';

const Divider = ({ changePadding, changeColor }) => {
  const padding = !changePadding ? 'p-2.5' : changePadding;
  const color = !changeColor ? '' : changeColor;

  return (
    <div className="w-full">
      <div className={`${padding} ${color} w-full border-b`} />
      <div className={`${padding} w-full`} />
    </div>
  );
};

export default Divider;
