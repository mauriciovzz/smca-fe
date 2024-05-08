import { React, useState } from 'react';

import Calendar from 'react-calendar';
import './Calendar.css';

import {
  calendarDayIcon, calendarIcon, control, refresh,
} from 'src/assets';

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const calendarNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const ArrowButton = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={onClick}
  >
    <img
      src={control}
      alt="arrow button"
      className={`${(direction === 'right') && 'rotate-180'} h-[28px] w-[28px]  self-center`}
    />
  </button>
);

const DateWidget = ({ selectedNode, selectedDate, changeDate }) => {
  const [dateView, seDateView] = useState(null);

  const formatTime = (date) => {
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours %= 12;
    hours = hours || 12;

    return `${hours} ${ampm}`;
  };

  const changeDay = (offset) => {
    changeDate(new Date(new Date(selectedDate).setDate(selectedDate.getDate() + offset)));
  };

  const changeHour = (offset) => {
    changeDate(undefined, new Date(selectedDate).setHours(selectedDate.getHours() + offset));
  };

  const checkDate = (currentDate) => selectedDate.toDateString() !== currentDate.toDateString();

  const checkHour = (currentHour, limit) => currentHour !== limit;

  const renderDateView = () => {
    switch (dateView) {
      case 'calendar':
        return (
          <div className="h-full w-full text-xs leading-none">
            <Calendar
              onChange={(nextValue) => changeDate(nextValue)}
              value={selectedDate}
              defaultActiveStartDate={new Date()}
              // minDate={new Date(selectedNode.start_date)}
              // maxDate={new Date()}
              locale="es-VE"
            />
          </div>
        );
      default:
        return (
          <div className="flex h-full w-full flex-col justify-center">
            <div className="flex w-full border-b pb-5">
              <div className="flex w-1/6 justify-center">
                {
                  (checkDate(new Date(selectedNode.start_date))) && (
                    <ArrowButton direction="left" onClick={() => changeDay(-1)} />
                  )
                }
              </div>

              <div className="flex w-4/6 items-center justify-center">
                <div className="flex flex-col">
                  <div className="w-[220px]">
                    {dayNames[selectedDate.getDay()]}
                  </div>
                  <div className="w-[220px]">
                    {`${selectedDate.getDate()} de ${calendarNames[selectedDate.getMonth()]}, ${selectedDate.getFullYear()}`}
                  </div>
                </div>
              </div>

              <div className="flex w-1/6 justify-center">
                {
                  (checkDate(new Date())) && (
                    <ArrowButton direction="right" onClick={() => changeDay(1)} />
                  )
                }
              </div>
            </div>

            <div className="flex w-full pt-5">
              <div className="flex w-1/6 justify-center">
                {
                  (checkHour(selectedDate.getHours(), 1)) && (
                    <ArrowButton direction="left" onClick={() => changeHour(-1)} />
                  )
                }
              </div>

              <div className="flex w-4/6 items-center justify-center">
                <div className="w-[220px]">
                  {formatTime(selectedDate)}
                </div>
              </div>

              <div className="flex w-1/6 justify-center">
                {
                  (checkHour(selectedDate.getHours(), 0)) && (
                    <ArrowButton direction="right" onClick={() => changeHour(1)} />
                  )
                }
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full rounded-xl bg-white p-5 text-xl font-medium shadow">
      <div className="flex h-full w-full items-center justify-center pr-5">
        {renderDateView()}
      </div>

      <div className="flex flex-col justify-evenly border-l pl-5">
        <button
          type="button"
          className={`${(dateView === null) && 'bg-graydetails'} flex h-[35px] w-[35px] items-center justify-center rounded-lg hover:bg-graydetails`}
          onClick={() => seDateView(null)}
        >
          <img
            src={calendarDayIcon}
            alt="calendar button"
            className="h-[28px] w-[28px]"
          />
        </button>

        <button
          type="button"
          className={`${(dateView === 'calendar') && 'bg-graydetails'} flex h-[35px] w-[35px] items-center justify-center rounded-lg hover:bg-graydetails`}
          onClick={() => seDateView('calendar')}
        >
          <img
            src={calendarIcon}
            alt="calendar button"
            className="h-[28px] w-[28px]"
          />
        </button>

        <button
          type="button"
          className="flex h-[35px] w-[35px] items-center justify-center rounded-lg hover:bg-graydetails"
          onClick={() => changeDate(new Date(), new Date())}
        >
          <img
            src={refresh}
            alt="refresh button"
            className="h-[28px] w-[28px]"
          />
        </button>
      </div>
    </div>
  );
};

export default DateWidget;
