import { React, useState, useEffect } from 'react';
import averageReadingService from '../services/averageReadings';

const VariableItem = ({ nodeLocation, variable }) => {
  const [averageReadings, setAverageReadings] = useState([{}]);
  const currentDate = new Date();
  const fullDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  const valueColor = (value) =>
    (
      value > 15 ? 'bg-lime-400' : 'bg-red-600'
    );

  useEffect(() => {
    averageReadingService
      .getAll(nodeLocation, variable, fullDate)
      .then((requestedReadings) => {
        const objArray = [];

        for (let i = 0; i < 24; i += 1) {
          const readingMatch = requestedReadings.find((reading) =>
            reading.end_hour === `${i}:00`);

          objArray.push({
            startTime: `${i}:00`,
            endTime: `${i + 1}:00`,
            value: (readingMatch) ? readingMatch.average_reading : null,
            color: (readingMatch) ? valueColor(readingMatch.average_reading) : 'bg-white',
          });
        }
        setAverageReadings(objArray);
      });
  }, []);

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
          {averageReadings.map((reading) =>
            <div key={reading.startTime} className={`w-full flex-1 ${reading.color}`} />)}
        </div>
      </div>
    </li>
  );
};

export default VariableItem;
