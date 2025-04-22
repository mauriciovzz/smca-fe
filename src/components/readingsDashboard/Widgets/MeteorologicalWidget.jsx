import { React, useState } from 'react';

import {
  AreaChart, Area, ResponsiveContainer, YAxis, Line, XAxis, ReferenceArea, Tooltip, LineChart,
} from 'recharts';

import colorHelper from 'src/utils/colorHelper';
import weatherIconHelper from 'src/utils/weatherIconHelper';

import {
  ReadingsWidgetTitle, VariableListScroll, NoReadingsMessage, Scroll,
} from './WidgetsComponents';

const layoutMap = {
  1: [
    { row: 'row-span-2', col: 'col-span-6' },
  ],
  2: [
    { row: 'row-span-2', col: 'col-span-3' },
    { row: 'row-span-2', col: 'col-span-3' },
  ],
  3: [
    { row: 'row-span-1', col: 'col-span-6' },
    { row: 'row-span-2', col: 'col-span-3' },
    { row: 'row-span-2', col: 'col-span-3' },
  ],
  4: [
    { row: 'row-span-1', col: 'col-span-3' },
    { row: 'row-span-1', col: 'col-span-3' },
    { row: 'row-span-2', col: 'col-span-3' },
    { row: 'row-span-2', col: 'col-span-3' },
  ],
  5: [
    { row: 'row-span-1', col: 'col-span-3' },
    { row: 'row-span-1', col: 'col-span-3' },
    { row: 'row-span-2', col: 'col-span-2' },
    { row: 'row-span-2', col: 'col-span-2' },
    { row: 'row-span-2', col: 'col-span-2' },
  ],
};

const OverviewTab = ({ dateReadings, getSelectedHourValue }) => {
  const getPrecipitationIcon = ({ value, hour, selectedDate }) => (
    <i className={`${weatherIconHelper.getPrecipitationIcon(value, hour, selectedDate)} self-center text-[42px] sm:text-[42px]`} />
  );

  const getUvIndex = (value) => {
    const uvIndex = value === null ? null : colorHelper.getUvIndexColor(value);

    return (
      <>
        <div className="font-semibold">Indice UV</div>
        <div>
          {(uvIndex !== null)
            ? (<div className={`${uvIndex.bgColor} w-[60px] rounded-xl text-center font-semibold text-black`}>{uvIndex.index}</div>)
            : (<i className="wi wi-na self-center text-xl text-gray-400" />)}
        </div>
      </>
    );
  };

  const variableValues = [];

  variableValues.push(dateReadings.find((v) => v.variable_name === 'precipitación'));
  variableValues.push(dateReadings.find((v) => v.variable_name === 'radiación solar'));
  variableValues.push(dateReadings.find((v) => v.variable_name === 'temperatura'));
  variableValues.push(dateReadings.find((v) => v.variable_name === 'humedad'));
  variableValues.push(dateReadings.find((v) => v.variable_name === 'presión'));

  const layout = layoutMap[variableValues.filter((v) => v !== undefined).length];

  return (
    <div className="flex size-full pt-2 sm:px-6">
      <div className=" grid size-full grid-cols-6 grid-rows-2 gap-2 text-sm sm:text-base">
        {
          variableValues
            .filter((v) => v !== undefined)
            .map((v, i) => {
              const { row, col } = layout[i];
              const varData = getSelectedHourValue(v.variable_name);

              const getVariableInfo = () => {
                switch (v.variable_name) {
                  case 'precipitación':
                    return getPrecipitationIcon(varData);
                  case 'radiación solar':
                    return getUvIndex(varData.value);
                  default:
                    return (
                      <>
                        <div className="font-semibold">{v.variable_name}</div>
                        <div>
                          {(varData.value !== null)
                            ? (<div>{`${varData.value} ${v.unit}` }</div>)
                            : (<i className="wi wi-na self-center text-xl text-gray-400" />)}
                        </div>
                      </>
                    );
                }
              };

              return (
                <div
                  key={v.variable_id}
                  className={`${row} ${col} flex size-full flex-col items-center justify-center rounded-lg border-2 border-graydetails p-2`}
                >
                  {getVariableInfo()}
                </div>
              );
            })
}
      </div>
    </div>
  );
};

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

const variableRanges = {
  temperatura: [0, 50],
  humedad: [0, 100],
  'radiación solar': [0, 11],
  presión: [950, 1050],
  precipitación: [0, 1],
};

const NumericalChart = ({
  variableData, selectedDate, selectedHour, rainData, changeDate,
}) => {
  const checkRainData = () => {
    if (rainData)
      return rainData.dateAverages;
    return null;
  };

  return (
    <>
      <Scroll>
        <div className="flex h-full flex-col">
          <div className="flex grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={variableData.dateAverages}
                margin={{
                  top: 10, right: 25, left: 25, bottom: 0,
                }}
              >
                <Area
                  type="monotone"
                  dataKey="value"
                  fill={variableData.color}
                  stroke={colorHelper.getDarkerColor(
                    variableData.color,
                    0.09,
                  )}
                  dot={{
                    stroke: colorHelper.getDarkerColor(
                      variableData.color,
                      0.09,
                    ),
                    strokeWidth: 2,
                  }}
                  connectNulls
                />
                <YAxis domain={variableRanges[variableData.variable_name]} hide />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex space-x-2 py-2 ">
            {variableData
              .dateAverages
              .map((average) => (
                <div
                  key={average.hour}
                  className={`${(average.hour === selectedHour) && 'rounded-lg border font-semibold'} flex h-[60px] w-[50px] flex-col justify-center space-y-1`}
                >
                  {(average.hour === 'sunrise' || average.hour === 'sunset')
                    ? (
                      <div className="h-[16px] self-center whitespace-nowrap text-xs text-white" />
                    )
                    : (
                      <div className="self-center whitespace-nowrap text-xs">
                        {`${(average.hour === 'sunrise' || average.hour === 'sunset') ? 'd' : `${average.hour}`}`}
                      </div>
                    )}

                  <i
                    className={`
                        ${weatherIconHelper.getReadingIcon(average.hour, average.value, selectedDate, checkRainData())} 
                        self-center text-lg
                      `}
                  />

                  <div className="h-[16px] self-center whitespace-nowrap text-xs">
                    {`${(average.hour === 'sunrise' || average.hour === 'sunset' || average.value === null) ? '' : `${average.value}`}`}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Scroll>

      <div className="grid h-[22%] grid-cols-7 gap-2 border-t pt-2">
        {variableData.weekData.map((day) => (
          <button
            type="button"
            key={day.day}
            className={`
              ${(selectedDate.toDateString() === new Date(day.weekDay).toDateString()) ? 'bg-graydetails' : 'hover:bg-graydetails'}
              flex flex-col items-center justify-center rounded-lg p-1
            `}
            onClick={() => changeDate(new Date(day.weekDay), selectedHour)}
          >
            <div className="text-xs font-bold">
              {dayNames[day.day]}
            </div>

            {(day.max)
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
                <div className="flex size-full items-center justify-center">
                  <i className="wi wi-na text-base" />
                </div>
              )}
          </button>
        ))}
      </div>
    </>
  );
};

const PresentialChart = ({
  variableData, selectedDate, selectedHour, rainData, changeDate,
}) => {
  const checkRainData = () => {
    if (rainData)
      return rainData.dateAverages;
    return null;
  };

  return (
    <>
      <Scroll>
        <div className="flex h-full flex-col">
          <div className="flex grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={variableData.dateAverages}
                margin={{
                  top: 10, right: 25, left: 25, bottom: 0,
                }}
              >
                <Area
                  type="monotone"
                  dataKey="value"
                  fill={variableData.color}
                  stroke={colorHelper.getDarkerColor(
                    variableData.color,
                    0.09,
                  )}
                  dot={{
                    stroke: colorHelper.getDarkerColor(
                      variableData.color,
                      0.09,
                    ),
                    strokeWidth: 2,
                  }}
                  connectNulls
                />
                <YAxis domain={variableRanges[variableData.variable_name]} hide />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex space-x-2 py-2 ">
            {variableData
              .dateAverages
              .map((average) => (
                <div
                  key={average.hour}
                  className={`${(average.hour === selectedHour) && 'rounded-lg border font-semibold'} flex h-[60px] w-[50px] flex-col justify-center space-y-1`}
                >
                  {(average.hour === 'sunrise' || average.hour === 'sunset')
                    ? (
                      <div className="h-[16px] self-center whitespace-nowrap text-xs text-white" />
                    )
                    : (
                      <div className="self-center whitespace-nowrap text-xs">
                        {`${average.hour}`}
                      </div>
                    )}

                  <i
                    className={`
                          ${weatherIconHelper.getReadingIcon(average.hour, average.value, selectedDate, checkRainData())} 
                          self-center text-lg
                        `}
                  />
                </div>
              ))}
          </div>
        </div>
      </Scroll>

      <div className="grid h-[22%] grid-cols-7 gap-2 border-t pt-2">
        {variableData.weekData.map((day) => (
          <button
            type="button"
            key={day.day}
            className={`
              ${(selectedDate.toDateString() === new Date(day.weekDay).toDateString()) ? 'bg-graydetails' : 'hover:bg-graydetails'}
              flex flex-col items-center justify-center rounded-lg p-1
            `}
            onClick={() => changeDate(new Date(day.weekDay), selectedHour)}
          >
            <div className="text-xs font-bold">
              {dayNames[day.day]}
            </div>

            {(day.max !== null)
              ? (
                <div className="flex size-full items-center justify-center">
                  {(day.max > 0)
                    ? <i className="wi wi-rain text-sky-700" />
                    : <i className="wi wi-day-sunny text-yellow-400" />}
                </div>
              )
              : (
                <div className="flex size-full items-center justify-center">
                  <i className="wi wi-na text-base" />
                </div>
              )}
          </button>
        ))}
      </div>
    </>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border bg-white p-1 text-xs">
        <p>{`Hora : ${payload[0].payload.hour}`}</p>
        <p>{`Indice : ${payload[0].payload.indice}`}</p>
        <p>{`Lectura : ${payload[0].payload.lectura}`}</p>
      </div>
    );
  }

  return null;
};

const UvChart = ({
  variableData, selectedDate, selectedHour, rainData, changeDate,
}) => {
  const getAveragesIndexes = (array) => {
    const parsedArray = array.map((r) => {
      if (r.value !== null) {
        const changedValue = Math.round(r.value / 0.1);

        return {
          hour: r.hour,
          lectura: `${r.value} mW/cm²`,
          indice: changedValue,
          value: changedValue > 11 ? 11 : changedValue,
          hourValue: changedValue > 11 ? '+11' : changedValue,
        };
      }

      return {
        hour: r.hour,
        lectura: null,
        indice: null,
        value: null,
      };
    });

    return parsedArray;
  };

  const getWeekDataIndexes = (array) => {
    const parsedArray = array.map((dateData) => {
      let minimun = dateData.min;
      let maximun = dateData.max;

      if (minimun !== null) {
        minimun = Math.round(minimun / 0.1);
        if (minimun > 11)
          minimun = '+11';
      }

      if (maximun !== null) {
        maximun = Math.round(maximun / 0.1);
        if (maximun > 11)
          maximun = '+11';
      }

      return {
        day: dateData.day,
        weekDay: dateData.weekDay,
        min: minimun,
        max: maximun,
      };
    });

    return parsedArray;
  };

  const averagesIndexes = getAveragesIndexes(variableData.dateAverages);
  const weekDataIndexes = getWeekDataIndexes(variableData.weekData);

  const checkRainData = () => {
    if (rainData)
      return rainData.dateAverages;
    return null;
  };

  return (
    <>
      <Scroll>
        <div className="flex h-full flex-col">
          <div className="flex grow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={averagesIndexes}
                margin={{
                  top: 10, right: 25, left: 25, bottom: 0,
                }}
              >
                <ReferenceArea x1={0} x2={25} y1={10.5} y2={12} fill="#8F3F97" stroke="#8F3F97" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={7.5} y2={10.5} fill="#FF0000" stroke="#FF0000" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={5.5} y2={7.5} fill="#FFA500" stroke="#FFA500" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={2.5} y2={5.5} fill="#FFFF00" stroke="#FFFF00" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={0} y2={2.5} fill="#009900" stroke="#009900" strokeOpacity={1} />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#e5e7eb"
                  strokeWidth={2}
                  dot={{
                    stroke: '#e5e7eb',
                    strokeWidth: 1,
                    r: 5,
                  }}
                  connectNulls
                />
                <Tooltip content={<CustomTooltip />} />
                <XAxis domain={[1, 24]} hide />
                <YAxis domain={[0, 12]} hide />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex space-x-2 py-2 ">
            {averagesIndexes
              .map((average) => (
                <div
                  key={average.hour}
                  className={`${(average.hour === selectedHour) && 'rounded-lg border font-semibold'} flex h-[60px] w-[50px] flex-col justify-center space-y-1`}
                >
                  {(average.hour === 'sunrise' || average.hour === 'sunset')
                    ? (
                      <div className="h-[16px] self-center whitespace-nowrap text-xs text-white" />
                    )
                    : (
                      <div className="self-center whitespace-nowrap text-xs">
                        {`${average.hour}`}
                      </div>
                    )}

                  <i
                    className={`
                          ${weatherIconHelper.getReadingIcon(average.hour, average.value, selectedDate, checkRainData())} 
                          self-center text-lg
                        `}
                  />

                  <div className="h-[16px] self-center whitespace-nowrap text-xs">
                    {`${(average.hour === 'sunrise' || average.hour === 'sunset' || average.value === null) ? '' : `${average.hourValue}`}`}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Scroll>

      <div className="grid h-[22%] grid-cols-7 gap-2 border-t pt-2">
        {weekDataIndexes.map((day) => (
          <button
            type="button"
            key={day.day}
            className={`
              ${(selectedDate.toDateString() === new Date(day.weekDay).toDateString()) ? 'bg-graydetails' : 'hover:bg-graydetails'}
              flex flex-col items-center justify-center rounded-lg p-1
            `}
            onClick={() => changeDate(new Date(day.weekDay), selectedHour)}
          >
            <div className="text-xs font-bold">
              {dayNames[day.day]}
            </div>

            {(day.max)
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
                <div className="flex size-full items-center justify-center">
                  <i className="wi wi-na text-base" />
                </div>
              )}
          </button>
        ))}
      </div>
    </>
  );
};

const MeteorologicalWidget = ({
  dateReadings, selectedDate, selectedHour, changeDate,
}) => {
  const [selectedVariable, setSelectedVariable] = useState('Resumen');

  const getSelectedHourValue = (variableName) => {
    const inx = dateReadings.findIndex((v) => v.variable_name === variableName);

    if (inx === -1)
      return null;

    return {
      value: dateReadings[inx].dateAverages.find((v) => (v.hour === selectedHour)).value,
      hour: dateReadings[inx].dateAverages.find((v) => (v.hour === selectedHour)).hour,
      selectedDate,
    };
  };

  const renderChart = () => {
    switch (selectedVariable) {
      case ('Resumen'):
        return (
          <OverviewTab
            selectedDate={selectedDate}
            dateReadings={dateReadings}
            getSelectedHourValue={getSelectedHourValue}
          />
        );
      case ('precipitación'):
        return (
          <PresentialChart
            variableData={dateReadings.find((v) => v.variable_name === selectedVariable)}
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            rainData={dateReadings.find((v) => v.variable_name === 'precipitación')}
            changeDate={changeDate}
          />
        );
      case ('radiación solar'):
        return (
          <UvChart
            variableData={dateReadings.find((v) => v.variable_name === selectedVariable)}
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            rainData={dateReadings.find((v) => v.variable_name === 'precipitación')}
            changeDate={changeDate}
          />
        );
      default:
        return (
          <NumericalChart
            variableData={dateReadings.find((v) => v.variable_name === selectedVariable)}
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            rainData={dateReadings.find((v) => v.variable_name === 'precipitación')}
            changeDate={changeDate}
          />
        );
    }
  };

  const sortDateReadings = () => {
    const variablesOrder = ['precipitación', 'radiación solar', 'temperatura', 'humedad', 'presión'];

    const variables = [];

    for (let i = 0; i < variablesOrder.length; i += 1) {
      const variable = dateReadings.find((v) => v.variable_name === variablesOrder[i]);

      if (variable)
        variables.push(variable);
    }

    return variables;
  };

  return (
    <div className="absolute flex size-full flex-col rounded-xl bg-white p-5 shadow">
      <ReadingsWidgetTitle title="Tiempo" />

      {(dateReadings.length !== 0)
        ? (
          <>
            <VariableListScroll
              type="meteorological"
              dateReadings={sortDateReadings()}
              selectedVariable={selectedVariable}
              setSelectedVariable={setSelectedVariable}
            />

            {renderChart()}
          </>
        )
        : (
          <NoReadingsMessage />
        )}
    </div>
  );
};

export default MeteorologicalWidget;
