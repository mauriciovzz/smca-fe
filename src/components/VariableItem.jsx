import { React, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import averageReadingService from '../services/averageReadings';

const VariableItem = ({ nodeLocation, variable }) => {
  const [averageReadings, setAverageReadings] = useState([{}]);
  const currentDate = new Date();
  const fullDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  const valueColor = () =>
    'bg-lime-400';

  useEffect(() => {
    averageReadingService
      .getAll(nodeLocation, variable, fullDate)
      .then((requestedReadings) => {
        const objArray = [];

        for (let i = 0; i < 24; i += 1) {
          const readingMatch = requestedReadings.find(
            (reading) =>
              reading.end_hour === `${i + 1}:00:00`,
          );

          objArray.push({
            startTime: (i < 10) ? `0${i}:00` : `${i}:00`,
            endTime: (i + 1 < 10) ? `0${i + 1}:00` : `${i + 1}:00`,
            value: readingMatch
              ? readingMatch.average_value
              : null,
            color: readingMatch
              ? valueColor()
              : 'bg-white',
          });
        }
        setAverageReadings(objArray);
      });
  }, []);

  return (
    <li className="mb-2 w-full font-poppins text-[16px] font-normal text-white">
      <div className="flex justify-between">
        <div className="flex w-full">{variable.variable_name}</div>

        <div className="flex w-full divide-x divide-bluey">
          {averageReadings.map((reading) =>
            (
              <div
                key={variable.variable_name + reading.startTime}
                className={`w-full flex-1 ${reading.color}`}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`${reading.startTime} - ${reading.endTime} : ${reading.value === null ? 'no reading' : `${reading.value} ${variable.variable_unit}`}`}
                data-tooltip-variant="info"
              />
            ))}
          <Tooltip id="my-tooltip" place="top-start" />
        </div>
      </div>
    </li>
  );
};

export default VariableItem;
