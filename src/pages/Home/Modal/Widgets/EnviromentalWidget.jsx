import {
  React, useState, useEffect, useRef,
} from 'react';

import {
  AreaChart, Area, ResponsiveContainer, ReferenceArea,
} from 'recharts';

import {
  control,
} from 'src/assets';
import nodesService from 'src/services/nodes';

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

const EnviromentalWidget = ({ selectedNode, selectedDate }) => {
  const [loadReadings, setLoadReadings] = useState(false);
  const [loadWeekReadings, setLoadWeekReadings] = useState(false);
  const [variables, setVariables] = useState([]);
  const [ranges, setRanges] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState('Resumen');
  const centerRef = useRef(null);

  const parseAveragesArray = (averages) => {
    const newArray = [];

    for (let i = 1; i <= 24; i += 1) {
      const match = averages.find(
        (reading) => reading.end_hour === i,
      );

      if (i === 6 || i === 18) {
        newArray.push(
          {
            time: (i === 6) ? 'sunrise' : 'sunset',
            value: null,
          },
        );
      }

      newArray.push(
        {
          time: i,
          value: (match) ? match.average : null,
        },
      );
    }

    return newArray;
  };

  useEffect(() => {
    nodesService
      .getReadingAverages(selectedNode, '2023-11-04', 'ENV')
      .then((requestedData) => {
        const newData = requestedData.map((variable) => (
          {
            name: variable.name,
            unit: variable.unit,
            averages: parseAveragesArray(variable.averages),
          }
        ));
        setVariables(newData);
        setLoadReadings(!loadReadings);
      });

    nodesService
      .getAveragesRange(selectedNode, '2023-11-04', 'ENV')
      .then((requestedData) => {
        setRanges(requestedData);
        setLoadWeekReadings(!loadWeekReadings);
      });
  }, []);

  let repeater;
  const scroll = (scrollOffset) => {
    centerRef.current.scrollLeft += scrollOffset;
  };

  const getVariableIndex = (variableName) => variables
    .findIndex((variable) => variable.name === variableName);

  const getChartColor = (type) => {
    switch (selectedVariable) {
      case 'Temperatura':
        return (type === 'fill') ? '#FEF08A' : '#fACC15';
      case 'Humedad':
        return (type === 'fill') ? '#BAE6FD' : '#0284C7';
      case 'Presión Atmosférica':
        return (type === 'fill') ? '#D4D4D8' : '#737373';
      case 'Luz UV':
        return (type === 'fill') ? '#A855F7' : '#D8B4FE';
      default:
        return (type === 'fill') ? '#E2E8F0' : '#F1F5F9';
    }
  };

  const getIcon = (hour) => {
    switch (hour) {
      case 'sunrise':
        return 'wi wi-sunrise text-yellow-400';
      case 'sunset':
        return 'wi wi-sunset text-orange-400';
      default:
        return 'wi wi-na text-gray-400';
    }
  };

  const formatTime = (date) => {
    if (date === 'sunrise' || date === 'sunset') return '';

    let hours = date;
    const ampm = (hours >= 12 && hours !== 24) ? 'PM' : 'AM';

    hours %= 12;
    hours = hours || 12;

    return `${hours} ${ampm}`;
  };

  return !(loadReadings && loadWeekReadings) ? null : (
    <div className="absolute flex h-full w-full flex-col rounded-xl bg-white p-4 shadow">

      {/* Title */}
      <div className="px-2 pb-2 text-2xl sm:px-6 sm:text-4xl">
        Contaminantes
      </div>

      {/* Menu */}
      <div className="hide-scrollbar overflow-scroll scroll-smooth border-y px-2 py-1 text-xs sm:px-7 sm:text-sm">
        <div className="flex">
          <div className="flex">
            <button
              className={`${(selectedVariable === 'Resumen') && 'font-semibold'} whitespace-nowrap`}
              type="button"
              onClick={() => setSelectedVariable('Resumen')}
            >
              Resumen
            </button>
            <div className="text-gray-300">
              &nbsp;|&nbsp;
            </div>
          </div>

          {
            variables.map((variable) => (
              <div key={variable.name} className="flex">
                <button
                  className={`${(variable.name === selectedVariable) && 'font-semibold'} whitespace-nowrap`}
                  type="button"
                  onClick={() => setSelectedVariable(variable.name)}
                >
                  {variable.name}
                </button>
                <div className="text-gray-300">
                  &nbsp;|&nbsp;
                </div>
              </div>
            ))
            }
        </div>
      </div>

      {
        (selectedVariable === 'Resumen')
          ? null
          : (
            <>
              {/* chart + readings */}
              <div className="flex">

                {/* left scroll */}
                <img
                  src={control}
                  alt="left scroll"
                  className="hidden h-[28px] w-[28px] self-center sm:flex"
                  onMouseEnter={() => { repeater = setInterval(scroll, 100, -20); }}
                  onMouseLeave={() => { clearInterval(repeater); }}
                />

                {/* Chart + Readings */}
                <div ref={centerRef} className="hide-scrollbar flex overflow-scroll scroll-smooth pt-1">
                  <div className="inline-block">

                    {/* Chart */}
                    <ResponsiveContainer width="100%" height={83}>
                      <AreaChart
                        data={variables[getVariableIndex(selectedVariable)].averages}
                        margin={{
                          top: 10, right: 25, left: 25, bottom: 0,
                        }}
                      >
                        <ReferenceArea x1={0} x2={25} y1={0} y2={50} stroke="#00E400" fill="#00E400" />
                        <ReferenceArea x1={0} x2={25} y1={51} y2={100} stroke="#FFFF00" fill="#FFFF00" />
                        <ReferenceArea x1={0} x2={25} y1={101} y2={150} stroke="#FF7E00" fill="#FF7E00" />
                        <ReferenceArea x1={0} x2={25} y1={151} y2={200} stroke="#FF0000" fill="#FF0000" />
                        <ReferenceArea x1={0} x2={25} y1={201} y2={300} stroke="#8f3f97" fill="#8f3f97" />
                        <ReferenceArea x1={0} x2={25} y1={301} y2={500} stroke="#7E0023" fill="#7E0023" />

                        <Area type="monotone" connectNulls dataKey="value" dot={{ stroke: getChartColor('stroke'), strokeWidth: 2 }} fill={getChartColor('fill')} stroke={getChartColor('stroke')} />
                      </AreaChart>
                    </ResponsiveContainer>

                    {/* readings */}
                    <div className="flex space-x-2 py-2 ">
                      {
                        variables[getVariableIndex(selectedVariable)]
                          .averages
                          .map((reading) => (
                            <div
                              key={reading.time}
                              className={`flex h-[40px] w-[65px] flex-col justify-center ${(reading.time === selectedDate.getHours()) ? 'font-semibold shadow' : ''}`}
                            >
                              {
                                (reading.value)
                                  ? (
                                    <>
                                      <div className="self-center whitespace-nowrap text-xs">
                                        {(reading.value) ? formatTime(reading.time) : 'h'}
                                      </div>
                                      <div className="self-center whitespace-nowrap text-xs">
                                        {`${(reading.time === 'sunrise' || reading.time === 'sunset' || reading.value === null) ? '' : `${reading.value} ${variables[getVariableIndex(selectedVariable)].unit}`}`}
                                      </div>
                                    </>
                                  )
                                  : (
                                    <i className={`self-center text-lg ${getIcon(reading.time)}`} />
                                  )
                              }
                            </div>
                          ))
                      }
                    </div>
                  </div>

                </div>

                {/* right scroll */}
                <img
                  src={control}
                  alt="right scroll"
                  className="hidden h-[28px] w-[28px] rotate-180 self-center sm:flex"
                  onMouseEnter={() => { repeater = setInterval(scroll, 100, 20); }}
                  onMouseLeave={() => { clearInterval(repeater); }}
                />
              </div>

              {/* week */}
              <div className="flex justify-evenly border-t pt-2">
                {
                  ranges[getVariableIndex(selectedVariable)].ranges.map((day) => (
                    <div
                      key={day.day}
                      className="flex flex-col"
                    >
                      <div className="self-center text-xs font-bold">
                        {dayNames[day.day]}
                      </div>
                      {
                        (day.max)
                          ? (
                            <div className="flex pt-1 text-xs">
                              <div>
                                {`${day.max}`}
                              </div>
                              <div className="pl-1 text-gray-400">
                                {`${day.min}`}
                              </div>
                            </div>
                          )
                          : (
                            <i className="wi wi-na self-center text-base" />
                          )
                      }
                    </div>
                  ))
                }
              </div>
            </>
          )
      }
    </div>
  );
};

export default EnviromentalWidget;
