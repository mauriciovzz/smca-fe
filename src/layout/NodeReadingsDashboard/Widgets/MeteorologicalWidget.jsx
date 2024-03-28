import { React, useState, useRef } from 'react';

import { Moon } from 'lunarphase-js';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import { control } from 'src/assets';

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

const MeteorologicalWidget = ({ dayReadings, hasRainSensor, selectedDate }) => {
  const [selectedVariable, setSelectedVariable] = useState('Resumen');
  const centerRef = useRef(null);

  let repeater;
  const scroll = (scrollOffset) => {
    centerRef.current.scrollLeft += scrollOffset;
  };

  const getVariableIndex = (varialeIds) => {
    console.log(varialeIds)
    console.log(dayReadings)
    console.log(dayReadings.findIndex((v) => `${v.component_id}${v.variable_id}` === varialeIds))
    return dayReadings.findIndex((v) => `${v.component_id}${v.variable_id}` === varialeIds);
  }

  const getAverageArrayValue = (variableName, hour) => {
    const time = hour || selectedDate.getHours();

    return dayReadings[getVariableIndex(variableName)]
      .dayAverages
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
      if (false) {
        if (getAverageArrayValue('Rain', hour)) return 'wi wi-day-showers text-orange-700';
      }
      return 'wi wi-day-sunny text-yellow-400';
    }

    const phase = Moon.lunarPhase(selectedDate);
    if (false) {
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

  return (dayReadings !== undefined) && (
    <div className="absolute flex h-full w-full flex-col rounded-xl bg-white p-4 shadow">

      {/* Overview */}
      <div className="flex px-2 pb-2 sm:px-7">

        {/* Temp */}
        <div className="flex items-center justify-start">
          <i className={`${getWeatherIcon(selectedDate.getHours())} self-center text-2xl sm:text-4xl`} />
          {
            // (getAverageArrayValue('Temperatura'))
            //   ? <h1 className="self-center pl-2 text-2xl sm:text-4xl">{`${getAverageArrayValue('Temperatura')} °C`}</h1>
            //   : <i className="wi wi-na self-center pl-2 text-2xl text-gray-400 sm:text-4xl" />
          }
        </div>

        {/* other variables */}
        <div className="flex grow items-center justify-center space-x-1 sm:space-x-4">
          {
            // (dayReadings) && (dayReadings.map(
            //   (v) => (
            //     <div key={`${v.component_id}${v.variable_id}`} className="flex">
            //         <i className={`${getVariableIcon(variable.name)} self-center text-xs sm:text-base`} />
            //         {
            //           (getAverageArrayValue(variable.name))
            //             ? <h1 className="self-center pl-1.5 text-xs sm:text-base">{`${getAverageArrayValue(variable.name)} ${variable.unit}`}</h1>
            //             : <i className="wi wi-na self-center pl-1.5 text-base text-gray-400 sm:text-xl" />
            //         }
            //       </div>
            //     )
            // ))
          }
        </div>

        {/* Title: Tiempo */}
        <div className="flex items-center justify-end text-2xl sm:text-4xl">
          <div>
            Tiempo
          </div>
        </div>
      </div>

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
            (dayReadings) && (dayReadings.map(
              (v) => (
                <div key={`${v.component_id}${v.variable_id}`} className="flex">
                  <button
                    className={`${(`${v.component_id}${v.variable_id}` === selectedVariable) && 'font-semibold'} whitespace-nowrap`}
                    type="button"
                    onClick={() => setSelectedVariable(`${v.component_id}${v.variable_id}`)}
                  >
                    {`${v.variable_name} (${v.component_name})`}
                  </button>
                  <div className="text-gray-300">
                    &nbsp;|&nbsp;
                  </div>
                </div>
              ),
            ))
          }
        </div>
      </div>

      {
        (selectedVariable === 'Resumen')
          ? null
          : (
            <>
              <div className="flex">
                <img
                  src={control}
                  alt="left scroll"
                  className="hidden h-[28px] w-[28px] self-center sm:flex"
                  onMouseEnter={() => { repeater = setInterval(scroll, 100, -20); }}
                  onMouseLeave={() => { clearInterval(repeater); }}
                />

                <div ref={centerRef} className="hide-scrollbar flex overflow-scroll scroll-smooth pt-1">
                  <div className="inline-block">

                    <ResponsiveContainer width="100%" height={62}>
                      <AreaChart
                        data={dayReadings[getVariableIndex(selectedVariable)].dayAverages}
                        margin={{
                          top: 10, right: 25, left: 25, bottom: 0,
                        }}
                      >
                        <Area type="monotone" connectNulls dataKey="value" dot={{ stroke: getChartColor('stroke'), strokeWidth: 2 }} fill={getChartColor('fill')} stroke={getChartColor('stroke')} />
                      </AreaChart>
                    </ResponsiveContainer>

                    <div className="flex space-x-2 py-2 ">
                      {
                        dayReadings[getVariableIndex(selectedVariable)]
                          .dayAverages
                          .map((average) => (
                            <div
                              key={average.time}
                              className={`${(average.time === selectedDate.getHours()) && 'font-semibold shadow'} flex h-[60px] w-[50px] flex-col justify-center`}
                            >
                              <div className="self-center whitespace-nowrap text-xs">
                                {(average.value) ? formatTime(average.time) : ''}
                              </div>
                              <i className={`${getWeatherIcon(average.time, average.value)} self-center text-lg`} />
                              <div className="self-center whitespace-nowrap text-xs">
                                {`${(average.time === 'sunrise' || average.time === 'sunset' || average.value === null) ? '' : `${average.value} ${dayReadings[getVariableIndex(selectedVariable)].unit}`}`}
                              </div>
                            </div>
                          ))
                      }
                    </div>
                  </div>

                </div>

                <img
                  src={control}
                  alt="right scroll"
                  className="hidden h-[28px] w-[28px] rotate-180 self-center sm:flex"
                  onMouseEnter={() => { repeater = setInterval(scroll, 100, 20); }}
                  onMouseLeave={() => { clearInterval(repeater); }}
                />
              </div>

              <div className="flex justify-evenly border-t pt-2">
                {
                  dayReadings[getVariableIndex(selectedVariable)].weekData.map((day) => (
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

export default MeteorologicalWidget;
