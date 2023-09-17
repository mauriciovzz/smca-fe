import { React, useState, useEffect } from 'react';
import averageReadingService from 'src/services/averageReadings';

const VariableItem = ({ node, variable }) => {
  const [averageReadings, setAverageReadings] = useState([]);

  const valueColor = () => 'bg-lime-400';

  useEffect(() => {
    const currentDate = new Date();
    const fullDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    averageReadingService
      .getAll(node, variable, fullDate)
      .then((requestedReadings) => {
        const objArray = [];

        for (let i = 0; i < 24; i += 1) {
          const end_hour = i < 9 ? `0${i + 1}:00:00` : `${i + 1}:00:00`;
          const readingMatch = requestedReadings.find(
            (reading) => reading.end_hour === end_hour,
          );

          objArray.push({
            startTime: i < 10 ? `0${i}:00` : `${i}:00`,
            endTime: i + 1 < 10 ? `0${i + 1}:00` : `${i + 1}:00`,
            value: readingMatch ? readingMatch.average_value : null,
            color: readingMatch ? valueColor() : 'bg-slate-200',
          });
        }
        setAverageReadings(objArray);
      });
  }, []);

  return (
    <li className="flex w-full justify-between border-b border-slate-100 px-4 py-2 font-normal text-slate-500">

      {/* Name */}
      <div className="w-full basis-1/3">
        {variable.variable_name}
      </div>

      {/* Readings */}
      <div className="flex w-full basis-2/3 divide-x divide-white">
        {
          averageReadings.map((reading) => (
            <div
              key={variable.variable_name + reading.startTime}
              className={`w-full flex-1 ${reading.color}`}
              data-tooltip-id="my-tooltip"
              data-tooltip-variant="info"
              data-tooltip-content={`${reading.startTime} - ${reading.endTime} : ${
                reading.value === null
                  ? 'no reading'
                  : `${reading.value} ${variable.variable_unit}`
              }`}
            />
          ))
        }
      </div>
    </li>
  );
};

export default VariableItem;
