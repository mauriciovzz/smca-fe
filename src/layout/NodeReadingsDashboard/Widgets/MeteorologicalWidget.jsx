import { React, useState, useRef } from 'react';

import { Moon } from 'lunarphase-js';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import { control } from 'src/assets';

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

const Divider = () => <div className="text-gray-300">&nbsp;|&nbsp;</div>;

const MeteorologicalWidget = ({
  dayReadings, dayUiInfo, selectedDate, changeDate,
}) => {
  const [selectedVariable, setSelectedVariable] = useState('Resumen');

  // Graph scroll
  const centerRefGraph = useRef(null);
  let graphRepeater;

  const graphScroll = (scrollOffset) => {
    centerRefGraph.current.scrollLeft += scrollOffset;
  };

  const updateGraphRepeater = (offset) => {
    graphRepeater = setInterval(graphScroll, 100, offset);
  };

  // Variable list scroll
  const centerRefVarList = useRef(null);
  let varListRepeater;

  const varListScroll = (scrollOffset) => {
    centerRefVarList.current.scrollLeft += scrollOffset;
  };

  const updateVarListRepeater = (offset) => {
    varListRepeater = setInterval(varListScroll, 100, offset);
  };

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

  const getChartColor = (type) => {
    switch (dayReadings[selectedVariable].variable_name) {
      case 'temperatura':
        return (type === 'fill') ? '#FEF08A' : '#facc15';
      case 'humedad':
        return (type === 'fill') ? '#BAE6FD' : '#0284c7';
      case 'presión atmosférica':
        return (type === 'fill') ? '#D4D4D8' : '#737373';
      case 'luz uv':
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
      if (dayUiInfo.has_rain) {
        if (getReadingValue('lluvia', hour)) return 'wi wi-day-showers text-orange-700';
      }
      return 'wi wi-day-sunny text-yellow-400';
    }

    const phase = Moon.lunarPhase(selectedDate);
    if (dayUiInfo.has_rain) {
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

  return (dayReadings !== undefined) && (dayUiInfo !== undefined) && (
    <div className="absolute flex h-full w-full flex-col rounded-xl bg-white p-5 shadow">
      <div className="px-2 pb-2 sm:px-6">
        <div className="text-2xl sm:text-4xl">
          Tiempo
        </div>
      </div>

      {
        (dayReadings.length === 0)
          ? (
            <div className="flex h-full w-full flex-col">
              <div className="border-t px-2 py-1 text-xs sm:px-7 sm:text-sm" />

              <div className="flex h-full w-full items-center justify-center">
                <b>
                  No existen lecturas realizadas en esta fecha
                </b>
              </div>
            </div>
          )
          : (
            <>
              {/* Variable list */}
              <div className="flex w-full border-y py-1 text-xs sm:text-sm">
                <div className="flex w-[28px] justify-center">
                  <img
                    src={control}
                    alt="left var list scroll"
                    className="hidden h-[20px] w-[20px] self-center sm:flex"
                    onMouseEnter={() => updateVarListRepeater(-20)}
                    onMouseLeave={() => clearInterval(varListRepeater)}
                  />
                </div>

                <div ref={centerRefVarList} className="hide-scrollbar flex w-full overflow-scroll scroll-smooth">
                  <div className="flex">
                    <button
                      className={`${(selectedVariable === 'Resumen') && 'font-semibold'} whitespace-nowrap`}
                      type="button"
                      onClick={() => setSelectedVariable('Resumen')}
                    >
                      Resumen
                    </button>
                    <Divider />
                  </div>

                  {
                    dayReadings.filter((v) => v.variable_name !== 'lluvia').map(
                      (v, index) => (
                        <div
                          key={v.variable_id}
                          className="flex"
                        >
                          <button
                            className={`${(index === selectedVariable) && 'font-semibold'} whitespace-nowrap`}
                            type="button"
                            onClick={() => setSelectedVariable(index)}
                          >
                            {v.variable_name}
                          </button>

                          {
                              (dayReadings.filter((vv) => vv.variable_name !== 'lluvia').length - 1 !== index) && (<Divider />)
                          }
                        </div>
                      ),
                    )
                  }
                </div>

                <div className="flex w-[28px] justify-center">
                  <img
                    src={control}
                    alt="right var list scroll"
                    className="hidden h-[20px] w-[20px] rotate-180 self-center sm:flex"
                    onMouseEnter={() => updateVarListRepeater(20)}
                    onMouseLeave={() => clearInterval(varListRepeater)}
                  />
                </div>
              </div>

              {
                (selectedVariable === 'Resumen')
                  ? (
                    // <div className="flex h-full w-full px-6 pt-2">
                    //   <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-2 bg-red-100">
                    //     {/* <div className="flex h-[200px] w-[530px] bg-white">
                    //       <div className="h-[90px] w-[90px] bg-blue-400 mr-[20px]">
                    //         Temperatura
                    //       </div>
                    //       <div className="h-[90px] w-[90px] bg-blue-400 mr-[20px]">
                    //         test
                    //       </div>
                    //       <div className="h-[90px] w-[90px] bg-blue-400 mr-[20px]">
                    //         test
                    //       </div>
                    //       <div className="h-[90px] w-[90px] bg-blue-400 mr-[20px]">
                    //         test
                    //       </div>
                    //       <div className="h-[90px] w-[90px] bg-blue-900">
                    //         test
                    //       </div>
                    //     </div> */}

                    //     <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                    //       <div className="flex h-[68px] w-[68px] items-center justify-center">
                    //         <i className={`${getWeatherIcon(selectedDate.getHours())} self-center text-2xl sm:text-5xl`} />
                    //       </div>
                    //     </div>

                    //     <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                    //       <div className="font-semibold">
                    //         Temperatura
                    //       </div>
                    //       <div className="flex items-center justify-start">
                    //         {
                    //           (dayUiInfo.has_temp) && (dayReadings.length !== 0) && (getReadingValue('temperatura') !== null) && (
                    //             <h1 className="self-center pl-2 text-2xl sm:text-3xl">{`${getReadingValue('temperatura')} °C`}</h1>
                    //           )
                    //         }
                    //       </div>
                    //     </div>

                    //     <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                    //       <div className="font-semibold">
                    //         Humedad
                    //       </div>
                    //       <div className="flex items-center justify-start">
                    //         {
                    //           (dayUiInfo.has_hum) && (dayReadings.length !== 0) && (getReadingValue('humedad') !== null) && (
                    //             <h1 className="self-center pl-2 text-2xl sm:text-3xl">{`${getReadingValue('humedad')} %`}</h1>
                    //           )
                    //         }
                    //       </div>
                    //     </div>

                    //     <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                    //       <div className="font-semibold">
                    //         Presión Atmosférica
                    //       </div>
                    //       <div className="flex items-center justify-start">
                    //         {
                    //           (dayUiInfo.has_hum) && (dayReadings.length !== 0) && (getReadingValue('presión atmosférica') !== null) && (
                    //             <h1 className="self-center pl-2 text-2xl sm:text-3xl">{`${getReadingValue('presión atmosférica')} hPa`}</h1>
                    //           )
                    //         }
                    //       </div>
                    //     </div>

                    //     <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                    //       <div className="flex h-[68px] w-[68px] items-center justify-center">
                    //         <i className={`${getWeatherIcon(selectedDate.getHours())} self-center text-2xl sm:text-5xl`} />
                    //       </div>
                    //     </div>

                    //     <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                    //       <div className="font-semibold">
                    //         Temperatura
                    //       </div>
                    //       <div className="flex items-center justify-start">
                    //         {
                    //           (dayUiInfo.has_temp) && (dayReadings.length !== 0) && (getReadingValue('temperatura') !== null) && (
                    //             <h1 className="self-center pl-2 text-2xl sm:text-3xl">{`${getReadingValue('temperatura')} °C`}</h1>
                    //           )
                    //         }
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <div className="flex h-full w-full bg-sky-200 px-6 pt-2">
                      <div className="grid h-full w-full grid-cols-12 grid-rows-6 gap-2 bg-sky-400">
                        <div className="h-full w-full bg-green-100 col-span-4 row-span-6">
                          hehe sun
                        </div>
                        {
                          [1,2].map((v) => (
                            <div className="h-full w-full bg-green-100 col-span-4 row-span-6">
                              hehe
                              {v}
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
                          className="hidden h-[28px] w-[28px] self-center sm:flex"
                          onMouseEnter={() => updateGraphRepeater(-20)}
                          onMouseLeave={() => clearInterval(graphRepeater)}
                        />

                        <div ref={centerRefGraph} className="hide-scrollbar flex overflow-scroll scroll-smooth pt-1">
                          <div className="flex h-full flex-col">
                            <div className="flex grow">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                  data={dayReadings[selectedVariable].dayAverages}
                                  margin={{
                                    top: 10, right: 25, left: 25, bottom: 0,
                                  }}
                                >
                                  <Area type="monotone" connectNulls dataKey="value" dot={{ stroke: getChartColor('stroke'), strokeWidth: 2 }} fill={getChartColor('fill')} stroke={getChartColor('stroke')} />
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
                                      className={`${(average.time === selectedDate.getHours()) && 'font-semibold shadow'} flex h-[60px] w-[50px] flex-col justify-center space-y-1`}
                                    >
                                      <div className="self-center whitespace-nowrap text-xs">
                                        {getReadingTime(average.time)}
                                      </div>

                                      <i className={`${getWeatherIcon(average.time, average.value)} self-center text-lg`} />

                                      <div className="h-[16px] self-center whitespace-nowrap text-xs">
                                        {`${(average.time === 'sunrise' || average.time === 'sunset' || average.value === null) ? '' : `${average.value} ${dayReadings[selectedVariable].unit}`}`}
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
                          className="hidden h-[28px] w-[28px] rotate-180 self-center sm:flex"
                          onMouseEnter={() => updateGraphRepeater(20)}
                          onMouseLeave={() => clearInterval(graphRepeater)}
                        />
                      </div>

                      <div className="flex justify-evenly border-t pt-2">
                        {
                          dayReadings[selectedVariable].weekData.map((day) => (
                            <button
                              type="button"
                              key={day.day}
                              className="flex flex-col"
                              onClick={() => changeDate(new Date(day.weekDay))}
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

export default MeteorologicalWidget;
