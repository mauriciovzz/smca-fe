import { React, useState, useEffect } from 'react';
import averageReadingService from '../services/averageReadings';

const VariableItem = ({ nodeLocation, variable }) => {
  const [averageReadings, setAverageReadings] = useState([]);
  const currentDate = new Date();
  const fullDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  useEffect(() => {
    averageReadingService
      .getAll(nodeLocation, variable, fullDate)
      .then((requestedReadings) =>
        setAverageReadings(requestedReadings));
  }, []);

  const valueColor = (value) =>
    (
      value > 15 ? 'bg-lime-400' : 'bg-red-600'
    );

  return (
    <li
      key={variable.variable_name}
      className="mb-2 w-full font-poppins text-[16px] font-normal text-white"
    >
      <div className="flex justify-between">
        <div className="flex w-full">
          {variable.variable_name}
        </div>

        <div className="flex w-full">
          {averageReadings.map((value) => {
            const color = valueColor(value);
            return <div key={value} className={`w-full flex-1 ${color}`} />;
          })}
        </div>
      </div>
    </li>
  );
};

export default VariableItem;
