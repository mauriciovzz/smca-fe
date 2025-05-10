import { React, useState } from 'react';

import {
  ResponsiveContainer,
  AreaChart, Area, LineChart, Line,
  YAxis, XAxis, Legend, ReferenceArea, Tooltip,
} from 'recharts';

import colorHelper from 'src/utils/colorHelper';
import weatherIconHelper from 'src/utils/weatherIconHelper';

import {
  ReadingsWidgetTitle, VariableListScroll, NoReadingsMessage, Scroll,
} from './WidgetsComponents';

const criteriaPollutants = ['pm2.5', 'pm10', 'o2', 'no2', 'so2', 'co'];

const OverviewTab = ({ dateReadings, selectedHour, getSelectedHourValue }) => {
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
    6: [
      { row: 'row-span-2', col: 'col-span-2' },
      { row: 'row-span-2', col: 'col-span-2' },
      { row: 'row-span-2', col: 'col-span-2' },
      { row: 'row-span-2', col: 'col-span-2' },
      { row: 'row-span-2', col: 'col-span-2' },
      { row: 'row-span-2', col: 'col-span-2' },
    ],
  };

  const renderAqiSquare = (layout) => {
    const getBiggestAqi = () => {
      let maxEntry = null;

      for (let i = 0; i < dateReadings.length; i += 1) {
        const item = dateReadings[i];

        if (criteriaPollutants.includes(item.variable_name)) {
          const { dateAqis } = item;

          for (let j = 0; j < dateAqis.length; j += 1) {
            const hourData = dateAqis[j];

            if (hourData.hour === selectedHour && typeof hourData.value === 'number') {
              if (!maxEntry || hourData.value > maxEntry.value) {
                maxEntry = {
                  variable_name: item.variable_name,
                  value: hourData.value,
                };
              }
            }
          }
        }
      }

      return maxEntry;
    };

    const biggestAqi = getBiggestAqi();
    const aqiColor = (biggestAqi === null) ? null : colorHelper.getAqiColor(biggestAqi.value);

    return (
      <div
        className={`${layout[0].row} ${layout[0].col} flex size-full flex-col items-center justify-center rounded-lg border-2 border-graydetails p-2`}
      >
        <div className="font-semibold">ICA</div>
        <div>
          {(biggestAqi !== null)
            ? (<div className={`${aqiColor.bgColor} w-[60px] rounded-xl text-center font-semibold text-black`}>{biggestAqi.value}</div>)
            : (<i className="wi wi-na self-center text-xl text-gray-400" />)}
        </div>
      </div>
    );
  };

  const variables = [];

  for (let i = 0; i < criteriaPollutants.length; i += 1) {
    const match = dateReadings.find((v) => v.variable_name === criteriaPollutants[i]);

    if (match) {
      variables.push(match);
    }
  }

  for (let i = 0; i < dateReadings.length; i += 1) {
    if (!criteriaPollutants.includes(dateReadings[i].variable_name))
      variables.push(dateReadings[i]);
  }

  const calculatesAqi = dateReadings.map((v) => v.variable_name).some((v) => ['pm2.5', 'pm10', 'o2', 'no2', 'so2', 'co'].includes(v));
  const layout = layoutMap[variables.length + (calculatesAqi ? 1 : 0)];

  return (
    <div className="flex size-full pt-2 sm:px-6">
      <div className=" grid size-full grid-cols-6 grid-rows-2 gap-2 text-sm sm:text-base">
        {(calculatesAqi) && (renderAqiSquare(layout))}

        {variables.map((v, i) => {
          const { row, col } = layout[i + (calculatesAqi ? 1 : 0)];
          const varData = getSelectedHourValue(v.variable_name);

          const renderByValueType = () => {
            if (v.value_type === 'presential') {
              return (
                <div
                  key={v.variable_id}
                  className={`${row} ${col} flex size-full flex-col items-center justify-center rounded-lg border-2 border-graydetails p-2`}
                >
                  <div className="font-semibold">{v.variable_name}</div>
                  <div>
                    {(varData.value !== null)
                      ? (<div className={`${(varData.value > 0) && 'font-bold text-red-500'}`}>{varData.value > 0 ? 'presente' : 'no presente'}</div>)
                      : (<i className="wi wi-na self-center text-xl text-gray-400" />)}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={v.variable_id}
                className={`${row} ${col} flex size-full flex-col items-center justify-center rounded-lg border-2 border-graydetails p-2`}
              >
                <div className="font-semibold">{v.variable_name}</div>
                <div>
                  {(varData.value !== null)
                    ? (<div>{`${varData.value} ${v.unit}`}</div>)
                    : (<i className="wi wi-na self-center text-xl text-gray-400" />)}
                </div>
              </div>
            );
          };

          return renderByValueType();
        })}
      </div>
    </div>
  );
};

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

const CustomTooltip = ({ active, payload }) => {
  const getAqiRangeName = (obj) => {
    const aqi = Math.max(
      ...Object.entries(obj)
        .filter(([key]) => key !== 'hour')
        .map(([, value]) => value),
    );

    if (aqi >= 0 && aqi <= 50) {
      return 'Bueno';
    } if (aqi >= 51 && aqi <= 100) {
      return 'Moderado';
    } if (aqi >= 101 && aqi <= 150) {
      return 'Dañino para grupos sensibles';
    } if (aqi >= 151 && aqi <= 200) {
      return 'Dañino';
    } if (aqi >= 201 && aqi <= 300) {
      return 'Muy dañino';
    } if (aqi >= 301 && aqi <= 500) {
      return 'Peligroso';
    }
    return 'Valor fuera de rango';
  };

  if (active && payload && payload.length) {
    return (
      <div className="border bg-white p-1 text-xs">
        <p>{`${payload[0].payload.hour}`}</p>
        <div className="w-full border-b-2" />
        <p>{`ICA : ${getAqiRangeName(payload[0].payload)} `}</p>
        <div className="w-full border-b-2" />
        {Object.entries(payload[0].payload).filter(([key]) => key !== 'hour').map(([key, value]) => (
          <p key={key}>
            {`${key}: ${value !== null ? value : 'No data'}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const AqiChart = ({
  dateReadings, rainReadings, selectedDate, selectedHour, changeDate,
}) => {
  const sortAqiData = () => {
    const includedVars = dateReadings.filter((d) => criteriaPollutants.includes(d.variable_name));
    const result = [];

    if (includedVars.length === 0)
      return result;

    const referenceHours = includedVars[0].dateAqis.map(
      ({ hour }) => (Number.isNaN(Number(hour)) ? hour : Number(hour)),
    );

    referenceHours.forEach((hour) => {
      result.push({ hour });
    });

    includedVars.forEach((v) => {
      const key = v.variable_name;
      v.dateAqis.forEach(({ value }, index) => {
        result[index][key] = value;
      });
    });

    return result;
  };

  const sortedAqis = sortAqiData();

  const aqiMaxValues = sortedAqis.map((entry) => {
    const { hour, ...values } = entry;

    const validValues = Object.values(values).filter((val) => val !== null && Number.isFinite(val));
    const max = validValues.length > 0 ? Math.max(...validValues) : null;

    return { hour, value: max };
  });

  const getWeeklyMinMaxByDay = () => {
    const filtered = dateReadings.filter((d) => criteriaPollutants.includes(d.variable_name));

    const dayMap = {};
    for (let i = 0; i <= 6; i += 1) {
      dayMap[i] = {
        day: i,
        weekDay: null,
        minValues: [],
        maxValues: [],
      };
    }

    filtered.forEach(({ aqiWeekData }) => {
      aqiWeekData.forEach(({
        day, weekDay, min, max,
      }) => {
        if (!dayMap[day].weekDay) {
          dayMap[day].weekDay = weekDay;
        }
        if (min !== null)
          dayMap[day].minValues.push(min);
        if (max !== null)
          dayMap[day].maxValues.push(max);
      });
    });

    return Object.values(dayMap).map(({
      day, weekDay, minValues, maxValues,
    }) => {
      const safeMin = minValues.length ? Math.min(...minValues) : null;
      const safeMax = maxValues.length ? Math.max(...maxValues) : null;

      return {
        day,
        weekDay,
        min: Number.isFinite(safeMin) ? safeMin : null,
        max: Number.isFinite(safeMax) ? safeMax : null,
      };
    });
  };

  const weekAqis = getWeeklyMinMaxByDay();

  const checkRainData = () => {
    if (rainReadings)
      return rainReadings.dateAverages;
    return null;
  };

  return (
    <>
      <Scroll>
        <div className="flex h-full flex-col">
          <div className="flex grow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sortedAqis}
                margin={{
                  top: 10, right: 25, left: 25, bottom: 0,
                }}
              >
                <ReferenceArea x1={0} x2={25} y1={301} y2={500} fill="#7E0023" stroke="#7E0023" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={201} y2={300} fill="#8F3F97" stroke="#8F3F97" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={151} y2={200} fill="#FF0000" stroke="#FF0000" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={101} y2={150} fill="#FF7E00" stroke="#FF7E00" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={51} y2={100} fill="#FFFF00" stroke="#FFFF00" strokeOpacity={1} />
                <ReferenceArea x1={0} x2={25} y1={0} y2={50} fill="#00E400" stroke="#00E400" strokeOpacity={1} />

                {dateReadings
                  .filter((d) => criteriaPollutants.includes(d.variable_name))
                  .map((v) => (
                    <Line
                      key={v.variable_id}
                      type="monotone"
                      dataKey={v.variable_name}
                      stroke={v.color}
                      strokeWidth={2}
                      dot={{
                        stroke: v.color,
                        strokeWidth: 1,
                        r: 3,
                      }}
                      connectNulls
                    />
                  ))}

                <Tooltip content={<CustomTooltip />} />
                <XAxis domain={[1, 24]} hide />
                <YAxis domain={[0, 500]} hide />
                <Legend verticalAlign="top" height={1} fill="white" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex space-x-2 py-2 ">
            {aqiMaxValues
              .map((aqi) => (
                <div
                  key={aqi.hour}
                  className={`${(aqi.hour === selectedHour) && 'rounded-lg border font-semibold'} flex h-[60px] w-[50px] flex-col justify-center space-y-1`}
                >
                  {(aqi.hour === 'sunrise' || aqi.hour === 'sunset')
                    ? (
                      <div className="h-[16px] self-center whitespace-nowrap text-xs text-white" />
                    )
                    : (
                      <div className="self-center whitespace-nowrap text-xs">
                        {`${aqi.hour}`}
                      </div>
                    )}

                  <i
                    className={`
                          ${weatherIconHelper.getReadingIcon(aqi.hour, aqi.value, selectedDate, checkRainData())}
                          self-center text-lg
                        `}
                  />

                  <div className="h-[16px] self-center whitespace-nowrap text-xs">
                    {`${(aqi.hour === 'sunrise' || aqi.hour === 'sunset' || aqi.value === null) ? '' : `${aqi.value}`}`}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Scroll>

      <div className="grid h-[22%] grid-cols-7 gap-2 border-t pt-2">
        {weekAqis.map((day) => (
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
      <div />
    </>
  );
};

const NumericalChart = ({
  variableData, rainReadings, selectedDate, selectedHour, changeDate,
}) => {
  const isPresential = (variableData.value_type === 'presential');

  const checkRainData = () => {
    if (rainReadings)
      return rainReadings.dateAverages;
    return null;
  };

  const printValue = (average) => {
    if ((average.hour === 'sunrise' || average.hour === 'sunset' || average.value === null))
      return '';

    if (isPresential)
      return <div className={`${(average.value > 0) && 'text-red-500'}`}>{(average.value > 0 ? 'si' : 'no')}</div>;

    return average.value;
  };

  const renderDayOfWeekData = (day) => {
    if (isPresential) {
      return (
        <div className="flex size-full items-center justify-center">
          {(day.max > 0)
            ? <div className="text-red-500">si</div>
            : <div>no</div>}
        </div>
      );
    }

    return (day.max)
      ? (
        <div className="flex flex-col items-center justify-center pt-1 text-xs sm:flex-row">
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
      );
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
                {isPresential && <YAxis range={[0, 1]} hide />}
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
                    {printValue(average)}
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

            {renderDayOfWeekData(day)}
          </button>
        ))}
      </div>
    </>
  );
};

const EnvironmentalWidget = ({
  dateReadings, rainReadings, selectedDate, selectedHour, changeDate,
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
            selectedHour={selectedHour}
            dateReadings={dateReadings}
            getSelectedHourValue={getSelectedHourValue}
          />
        );
      case ('ICA'):
        return (
          <AqiChart
            dateReadings={dateReadings}
            rainReadings={rainReadings}
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            changeDate={changeDate}
          />
        );
      default:
        return (
          <NumericalChart
            variableData={dateReadings.find((v) => v.variable_name === selectedVariable)}
            rainReadings={rainReadings}
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            changeDate={changeDate}
          />
        );
    }
  };

  return (
    <div className="absolute flex size-full flex-col rounded-xl bg-white p-5 shadow">
      <ReadingsWidgetTitle title="Contaminantes" />

      {(dateReadings.length !== 0)
        ? (
          <>
            <VariableListScroll
              type="environmental"
              dateReadings={dateReadings}
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

export default EnvironmentalWidget;
