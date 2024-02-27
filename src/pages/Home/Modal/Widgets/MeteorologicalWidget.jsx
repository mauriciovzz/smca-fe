import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  AreaChart, Area, ResponsiveContainer,
} from 'recharts';
import {
  Moon,
} from 'lunarphase-js';
import {
  control,
} from 'src/assets';
// import nodesService from 'src/services/nodes';

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

const MeteorologicalWidget = ({ selectedNode, selectedDate }) => {
  const [loadReadings, setLoadReadings] = useState(false);
  const [loadWeekReadings, setLoadWeekReadings] = useState(false);
  const [variables, setVariables] = useState([]);
  const [rain, setRain] = useState(false);
  const [rangess, setRanges] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState('Temperatura');
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
    // nodesService
    //   .getReadingAverages(selectedNode, '2023-11-04', 'MET')
    //   .then((requestedData) => {
    //     const newData = requestedData.map((variable) => (
    //       {
    //         name: variable.name,
    //         unit: variable.unit,
    //         averages: parseAveragesArray(variable.averages),
    //       }
    //     ));
    //     setVariables(newData);
    //     setRain(variables.find((variable) => variable.name === 'Rain'));
    //     setLoadReadings(!loadReadings);
    //   });

    // nodesService
    //   .getAveragesRange(selectedNode, '2023-11-04', 'MET')
    //   .then((requestedData) => {
    //     setRanges(requestedData);
    //     setLoadWeekReadings(!loadWeekReadings);
    //   });
  }, []);

  let repeater;
  const scroll = (scrollOffset) => {
    centerRef.current.scrollLeft += scrollOffset;
  };

  const getVariableIndex = (variableName) => variables
    .findIndex((variable) => variable.name === variableName);

  const getAverageArrayValue = (variableName, hour) => {
    const time = hour || selectedDate.getHours();

    return variables[getVariableIndex(variableName)]
      .averages
      .find((element) => (element.time === time))
      .value;
  };

  const getVariableIcon = (variableName) => {
    switch (variableName) {
      case 'Humedad':
        return 'wi wi-humidity';
      case 'Presión Atmosférica':
        return 'wi wi-barometer';
      case 'Luz UV':
        return 'wi wi-hot';
      default:
        return 'wi wi-na';
    }
  };

  const getChartColor = (type) => {
    switch (selectedVariable) {
      case 'Temperatura':
        return (type === 'fill') ? '#FEF08A' : '#facc15';
      case 'Humedad':
        return (type === 'fill') ? '#BAE6FD' : '#0284c7';
      case 'Presión Atmosférica':
        return (type === 'fill') ? '#D4D4D8' : '#737373';
      case 'Luz UV':
        return (type === 'fill') ? '#a855f7' : '#d8b4fe';
      default:
        return (type === 'fill') ? '#e2e8f0' : '#f1f5f9';
    }
  };

  const getWeatherIcon = (hour, data) => {
    if (hour === 'sunrise') return 'wi wi-sunrise text-yellow-400';
    if (hour === 'sunset') return 'wi wi-sunset text-orange-400';
    if (data === null) return 'wi wi-na text-gray-400';

    if (hour > 5 && hour < 18) {
      if (rain) {
        if (getAverageArrayValue('Rain', hour)) return 'wi wi-day-showers text-orange-700';
      }
      return 'wi wi-day-sunny text-yellow-400';
    }

    const phase = Moon.lunarPhase(selectedDate);
    if (rain) {
      if (getAverageArrayValue('Rain', hour)) {
        if (phase === 'New' || phase === 'Full') return 'wi wi-night-showers text-sky-700';
        return 'wi wi-night-alt-showers text-sky-700';
      }
    }
    switch (phase) {
      case 'New':
        return 'wi wi-moon-alt-new text-gray-400';
      case 'Waxing Crescent':
        return 'wi wi-moon-alt-waxing-crescent-4 text-gray-400';
      case 'First Quarter':
        return 'wi wi-moon-alt-first-quarter text-gray-400';
      case 'Waxing Gibbous':
        return 'wi wi-moon-alt-waxing-gibbous-2 text-gray-400';
      case 'Full':
        return 'wi wi-moon-alt-full text-gray-400';
      case 'Waning Gibbous':
        return 'wi wi-moon-alt-waning-gibbous-4 text-gray-400';
      case 'Last Quarter':
        return 'wi wi-moon-alt-third-quarter text-gray-400';
      case 'Waning Crescent':
        return 'wi wi-moon-alt-waning-crescent-4 text-gray-400';
      default:
        return 'wi wi-night-clear text-yellow-400';
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

      {/* Overview */}
      <div className="flex px-2 pb-2 sm:px-7">

        {/* Temp */}
        <div className="flex items-center justify-start">
          <i className={`${getWeatherIcon(selectedDate.getHours())} self-center text-2xl sm:text-4xl`} />
          {
            (getAverageArrayValue('Temperatura'))
              ? <h1 className="self-center pl-2 text-2xl sm:text-4xl">{`${getAverageArrayValue('Temperatura')} °C`}</h1>
              : <i className="wi wi-na self-center pl-2 text-2xl text-gray-400 sm:text-4xl" />
          }
        </div>

        {/* other variables */}
        <div className="flex grow items-center justify-center space-x-1 sm:space-x-4">
          {
            variables.map((variable) => {
              if (variable.name !== 'Temperatura') {
                return (
                  <div
                    key={variable.name}
                    className="flex"
                  >
                    <i className={`${getVariableIcon(variable.name)} self-center text-xs sm:text-base`} />
                    {
                      (getAverageArrayValue(variable.name))
                        ? <h1 className="self-center pl-1.5 text-xs sm:text-base">{`${getAverageArrayValue(variable.name)} ${variable.unit}`}</h1>
                        : <i className="wi wi-na self-center pl-1.5 text-base text-gray-400 sm:text-xl" />
                    }
                  </div>
                );
              }
              return null;
            })
          }
        </div>

        {/* Title: Tiempo */}
        <div className="flex items-center justify-end text-2xl sm:text-4xl">
          <div>
            Tiempo
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="hide-scrollbar overflow-scroll scroll-smooth border-y px-2 py-1 text-xs sm:px-7 sm:text-sm">
        <div className="flex">
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

      {/* chart and readings */}
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
            <ResponsiveContainer width="100%" height={62}>
              <AreaChart
                data={variables[getVariableIndex(selectedVariable)].averages}
                margin={{
                  top: 10, right: 25, left: 25, bottom: 0,
                }}
              >
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
                      className={`${(reading.time === selectedDate.getHours()) && 'font-semibold shadow'} flex h-[60px] w-[50px] flex-col justify-center`}
                    >
                      <div className="self-center whitespace-nowrap text-xs">
                        {(reading.value) ? formatTime(reading.time) : ''}
                      </div>
                      <i className={`${getWeatherIcon(reading.time, reading.value)} self-center text-lg`} />
                      <div className="self-center whitespace-nowrap text-xs">
                        {`${(reading.time === 'sunrise' || reading.time === 'sunset' || reading.value === null) ? '' : `${reading.value} ${variables[getVariableIndex(selectedVariable)].unit}`}`}
                      </div>
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
          rangess[getVariableIndex(selectedVariable)].ranges.map((day) => (
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
    </div>
  );
};

export default MeteorologicalWidget;
