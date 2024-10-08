import { React, useState, useRef } from 'react';

import { Moon } from 'lunarphase-js';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import { control } from 'src/assets';
import colors from 'src/utils/colors';

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

const Divider = () => <div className="ml-2 border-l" />;

const ReadingsWidget = ({
  type, dayReadings, selectedDate, changeDate,
}) => {
  const [selectedVariable, setSelectedVariable] = useState('Resumen');

  // Graph scroll
  const centerRefGraph = useRef(null);
  let graphRepeater;
  const graphScroll = (o) => { centerRefGraph.current.scrollLeft += o; };
  const updateGraphRepeater = (o) => { graphRepeater = setInterval(graphScroll, 100, o); };

  // Variable list scroll
  const centerRefVarList = useRef(null);
  let varListRepeater;
  const varListScroll = (o) => { centerRefVarList.current.scrollLeft += o; };
  const updateVarListRepeater = (o) => { varListRepeater = setInterval(varListScroll, 100, o); };

  const getReadingValue = (variableName, hour) => {
    const time = hour || selectedDate.getHours();
    const inx = dayReadings.findIndex((v) => v.variable_name === variableName);

    return (inx !== -1)
      ? dayReadings[inx].dayAverages.find((element) => (element.time === time)).value
      : null;
  };

  const getReadingTime = (date) => {
    if (date === 'sunrise' || date === 'sunset') return '';

    let hours = date;
    const ampm = (hours >= 12 && hours !== 24) ? 'PM' : 'AM';

    hours %= 12;
    hours = hours || 12;

    return `${hours} ${ampm}`;
  };

  const checkForRainSensor = () => dayReadings
    .map((v) => v.variable_name)
    .includes('lluvia');

  const getWeatherIcon = (hour, data) => {
    if (hour === 'sunrise') return 'wi wi-sunrise text-yellow-400';
    if (hour === 'sunset') return 'wi wi-sunset text-orange-400';
    if (data === null) return 'wi wi-na text-gray-400';

    if (hour > 5 && hour < 18) {
      if (checkForRainSensor()) {
        if (getReadingValue('lluvia', hour)) return 'wi wi-day-showers text-orange-700';
      }
      return 'wi wi-day-sunny text-yellow-400';
    }

    const phase = Moon.lunarPhase(selectedDate);
    if (checkForRainSensor()) {
      if (getReadingValue('lluvia', hour)) {
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

  const getGridSize = (index) => {
    let varCount = dayReadings.filter((v) => v.variable_name !== 'lluvia').length;
    if (type === 'meteorological') varCount += 1;

    let rows = '';
    let cols = '';

    if (varCount < 4) rows = 'row-span-6';
    else if (varCount < 9) rows = 'row-span-3';
    else rows = 'row-span-2';

    if (72 % varCount === 0) {
      if (varCount < 4) cols = `col-span-${12 / varCount}`;
      else if (varCount < 9) cols = `col-span-${12 / (varCount / 2)}`;
      else cols = 'col-span-4';
    } else if (varCount < 9) {
      if (index < ((varCount - 1) / 2) + 1) cols = `col-span-${12 / ((varCount - 1) / 2)}`;
      else cols = `col-span-${12 / (((varCount - 1) / 2) + 1)}`;
    } else if (varCount === 10) {
      if (index < 3) cols = 'col-span-6';
      else cols = 'col-span-3';
    } else if (varCount === 11) {
      if (index < 4) cols = 'col-span-4';
      else cols = 'col-span-3';
    }

    return `${rows} ${cols}`;
  };

  return (dayReadings !== undefined) && (
    <div className="absolute flex h-full w-full flex-col rounded-xl bg-white p-5 shadow">
      <div className="pb-2 sm:px-6">
        <div className="text-2xl sm:text-4xl">
          {(type === 'meteorological') ? 'Tiempo' : 'Contaminantes'}
        </div>
      </div>

      {
        (dayReadings.length === 0)
          ? (
            <div className="flex h-full w-full flex-col">
              <div className="border-t px-2 py-1 text-xs sm:px-7 sm:text-sm" />

              <div className="flex h-full w-full items-center justify-center">
                <b className="w-2/3 text-center sm:w-full">
                  No existen lecturas realizadas en esta fecha
                </b>
              </div>
            </div>
          )
          : (
            <>
              <div className="flex w-full border-y py-1 text-sm">
                <div
                  className="mr-1 hidden w-[31px] items-center justify-center rounded-lg hover:bg-graydetails sm:flex"
                  onMouseEnter={() => updateVarListRepeater(-20)}
                  onMouseLeave={() => clearInterval(varListRepeater)}
                >
                  <img
                    src={control}
                    alt="left var list scroll"
                    className=" h-[20px] w-[20px]"
                  />
                </div>

                <div ref={centerRefVarList} className="flex w-full overflow-auto scroll-smooth pb-1 sm:hide-scrollbar sm:pb-0">
                  <div className="flex items-center">
                    <button
                      className={`${(selectedVariable === 'Resumen') ? 'bg-graydetails' : 'hover:bg-graydetails'} whitespace-nowrap rounded-lg px-2 py-1`}
                      type="button"
                      onClick={() => setSelectedVariable('Resumen')}
                    >
                      Resumen
                    </button>
                  </div>

                  {
                    dayReadings.filter((v) => v.variable_name !== 'lluvia').map(
                      (v, index) => (
                        <div
                          key={v.name}
                          className="flex"
                        >
                          <Divider />

                          <button
                            className={`${(index === selectedVariable) ? 'bg-graydetails' : 'hover:bg-graydetails'} ml-2 whitespace-nowrap rounded-lg px-2 py-1`}
                            type="button"
                            onClick={() => setSelectedVariable(index)}
                          >
                            {(v.unit !== null) ? `${v.variable_name} (${v.unit})` : `${v.variable_name}`}
                          </button>
                        </div>
                      ),
                    )
                  }
                </div>

                <div
                  className="ml-1 hidden w-[31px] items-center justify-center rounded-lg hover:bg-graydetails sm:flex"
                  onMouseEnter={() => updateVarListRepeater(20)}
                  onMouseLeave={() => clearInterval(varListRepeater)}
                >
                  <img
                    src={control}
                    alt="left var list scroll"
                    className=" h-[20px] w-[20px] rotate-180"
                  />
                </div>
              </div>

              {
                (selectedVariable === 'Resumen')
                  ? (
                    <div className="flex h-full w-full pt-2 sm:px-6">
                      <div className="grid h-full w-full grid-cols-12 grid-rows-6 gap-2 text-sm sm:text-base">
                        {
                          (type === 'meteorological') && (
                            <div className={`${getGridSize(1)} flex h-full w-full items-center justify-center rounded-lg border`}>
                              <i className={`${getWeatherIcon(selectedDate.getHours())} self-center text-2xl sm:text-5xl`} />
                            </div>
                          )
                        }

                        {
                          dayReadings.filter((vtf) => vtf.variable_name !== 'lluvia').map((v, index) => (
                            <div key={v.variable_id} className={`${getGridSize((type === 'meteorological') ? index + 2 : index + 1)} flex h-full w-full flex-col items-center justify-center rounded-lg border`}>
                              <div className="font-semibold">
                                {v.variable_name}
                              </div>
                              <div>
                                {
                                  (getReadingValue(v.variable_name) !== null)
                                    ? (
                                      <div className="flex">
                                        <div>
                                          {getReadingValue(v.variable_name)}
                                        </div>
                                        {
                                          (v.unit !== null) && (
                                            <div>
                                              &nbsp;
                                              {v.unit}
                                            </div>
                                          )
                                        }
                                      </div>
                                    )
                                    : (
                                      <i className={`${getWeatherIcon(null, null)} self-center text-gray-400`} />
                                    )
                                }
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                  : (
                    <>
                      <div className="flex grow">
                        <img
                          src={control}
                          alt="left graph scroll"
                          className="mr-1 hidden h-[28px] w-[28px] self-center rounded-lg hover:bg-graydetails sm:flex"
                          onMouseEnter={() => updateGraphRepeater(-20)}
                          onMouseLeave={() => clearInterval(graphRepeater)}
                        />

                        <div ref={centerRefGraph} className="flex overflow-auto scroll-smooth sm:hide-scrollbar ">
                          <div className="flex h-full flex-col">
                            <div className="flex grow">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                  data={dayReadings[selectedVariable].dayAverages}
                                  margin={{
                                    top: 10, right: 25, left: 25, bottom: 0,
                                  }}
                                >
                                  <Area
                                    type="monotone"
                                    dataKey="value"
                                    fill={dayReadings[selectedVariable].color}
                                    stroke={colors.getDarkerColor(
                                      dayReadings[selectedVariable].color,
                                      0.09,
                                    )}
                                    dot={{
                                      stroke: colors.getDarkerColor(
                                        dayReadings[selectedVariable].color,
                                        0.09,
                                      ),
                                      strokeWidth: 2,
                                    }}
                                    connectNulls
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>

                            <div className="flex space-x-2 py-2 ">
                              {
                                dayReadings[selectedVariable]
                                  .dayAverages
                                  .map((average) => (
                                    <div
                                      key={average.time}
                                      className={`${(average.time === selectedDate.getHours()) && 'rounded-lg border font-semibold'} flex h-[60px] w-[50px] flex-col justify-center space-y-1`}
                                    >
                                      <div className="self-center whitespace-nowrap text-xs">
                                        {getReadingTime(average.time)}
                                      </div>

                                      <i className={`${getWeatherIcon(average.time, average.value)} self-center text-lg`} />

                                      <div className="h-[16px] self-center whitespace-nowrap text-xs">
                                        {`${(average.time === 'sunrise' || average.time === 'sunset' || average.value === null) ? '' : `${average.value}`}`}
                                      </div>
                                    </div>
                                  ))
                              }
                            </div>
                          </div>
                        </div>

                        <img
                          src={control}
                          alt="right graph scroll"
                          className="ml-1 hidden h-[28px] w-[28px] rotate-180 self-center rounded-lg hover:bg-graydetails sm:flex"
                          onMouseEnter={() => updateGraphRepeater(20)}
                          onMouseLeave={() => clearInterval(graphRepeater)}
                        />
                      </div>

                      <div className="grid grid-cols-7 gap-2 border-t pt-2">
                        {
                          dayReadings[selectedVariable].weekData.map((day) => (
                            <button
                              type="button"
                              key={day.day}
                              className="flex flex-col items-center justify-center rounded-lg p-1 hover:bg-graydetails"
                              onClick={() => changeDate(new Date(day.weekDay))}
                            >
                              <div className="text-xs font-bold">
                                {dayNames[day.day]}
                              </div>
                              {
                                (day.max)
                                  ? (
                                    <div className="flex flex-col pt-1 text-xs sm:flex-row">
                                      <div>
                                        {day.max}
                                      </div>
                                      <div className="text-gray-400 sm:pl-1">
                                        {day.min}
                                      </div>
                                    </div>
                                  )
                                  : (
                                    <div className="flex h-full w-full items-center justify-center">
                                      <i className="wi wi-na text-base" />
                                    </div>
                                  )
                              }
                            </button>
                          ))
                        }
                      </div>
                    </>
                  )
              }
            </>
          )
      }
    </div>
  );
};

export default ReadingsWidget;
