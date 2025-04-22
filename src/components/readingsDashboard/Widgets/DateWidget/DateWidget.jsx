import {
  React, useState, useEffect, useRef,
} from 'react';

import Calendar from 'react-calendar';
import './Calendar.css';

import {
  calendarDayIcon, calendarIcon, arrowIcon, refresh,
} from 'src/assets';

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const calendarNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const DayArrowButton = ({
  selectedDate, comparingDate, direction, onClick,
}) => (
  <div className="flex w-1/6 items-center justify-center">
    {(selectedDate.toDateString() !== comparingDate.toDateString()) && (
      <button
        type="button"
        onClick={onClick}
        className="flex size-[30px] items-center justify-center rounded-lg hover:bg-graydetails"
      >
        <img
          src={arrowIcon}
          alt="arrow button"
          className={`${(direction === 'right') && 'rotate-180'} size-[20px]`}
        />
      </button>
    )}
  </div>
);

const HourArrowButton = ({
  selectedDate, comparingDate, selectedHour, direction, onClick,
}) => {
  const showButton = () => {
    if (selectedDate.toDateString() === comparingDate.toDateString()) {
      if (direction === 'left') {
        if (comparingDate.getHours() + 1 === selectedHour)
          return false;
      } else if (comparingDate.getHours() === selectedHour)
        return false;
    }
    return true;
  };

  return (
    <div className="flex w-1/6 items-center justify-center">
      {
        (showButton()) && (
          <button
            type="button"
            onClick={() => onClick()}
            className="flex size-[30px] items-center justify-center rounded-lg hover:bg-graydetails"
          >
            <img
              src={arrowIcon}
              alt="arrow button"
              className={`${(direction === 'right') && 'rotate-180'} size-[20px]`}
            />
          </button>
        )
      }
    </div>
  );
};

const DateWidget = ({
  selectedDate, selectedHour, nodeStartDate, currentDate, changeDate,
}) => {
  const [componentActiveStartDate, setComponentActiveStartDate] = useState(undefined);
  const [dateView, setDateView] = useState(null);

  const ref = useRef(null);

  useEffect(() => {
    const { offsetHeight } = ref.current;
    const root = document.querySelector(':root');
    root.style.setProperty('--calendar-height', `${offsetHeight}px`);
  }, []);

  // Date change
  const calendarChange = (newDate) => {
    const updatedDate = new Date(newDate);
    const updatedHour = selectedHour;

    changeDate(updatedDate, updatedHour);
    setDateView(null);
  };

  const onResetClick = () => {
    const newDate = currentDate;
    const newHour = newDate.getHours() === 0 ? 24 : newDate.getHours();

    changeDate(newDate, newHour);
  };

  const nextHour = () => {
    let newHour = selectedHour + 1;
    const newDate = new Date(selectedDate);

    if (newHour > 24) {
      newHour = 1;
      newDate.setDate(newDate.getDate() + 1);
    }

    changeDate(newDate, newHour);
  };

  const prevHour = () => {
    let newHour = selectedHour - 1;
    const newDate = new Date(selectedDate);

    if (newHour < 1) {
      newHour = 24;
      newDate.setDate(newDate.getDate() - 1);
    }

    changeDate(newDate, newHour);
  };

  const nextDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);

    const newHour = selectedHour;

    changeDate(newDate, newHour);
  };

  const prevDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);

    const newHour = selectedHour;

    changeDate(newDate, newHour);
  };

  // render view
  const renderDateView = () => {
    switch (dateView) {
      case 'calendar':
        return (
          <div className="size-full text-xs leading-none">
            <Calendar
              value={selectedDate}
              onChange={calendarChange}
              minDate={nodeStartDate}
              maxDate={currentDate}
              activeStartDate={componentActiveStartDate}
              onActiveStartDateChange={
                ({ activeStartDate }) => setComponentActiveStartDate(activeStartDate)
              }
              locale="es-VE"
              showFixedNumberOfWeeks
            />
          </div>
        );
      default:
        return (
          <div className="flex size-full flex-col justify-center">
            <div className="flex h-[65%] w-full border-b pb-5">
              <DayArrowButton
                selectedDate={selectedDate}
                comparingDate={nodeStartDate}
                selectedHour={selectedHour}
                direction="left"
                onClick={() => prevDate()}
              />

              <div className="flex w-4/6 items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="h-fit text-sm">
                    {dayNames[selectedDate.getDay()]}
                  </div>
                  <div className="h-full">
                    {`${selectedDate.getDate()} de ${calendarNames[selectedDate.getMonth()]}`}
                  </div>
                  <div className="h-fit text-sm">
                    {selectedDate.getFullYear()}
                  </div>
                </div>
              </div>

              <DayArrowButton
                selectedDate={selectedDate}
                comparingDate={currentDate}
                selectedHour={selectedHour}
                direction="right"
                onClick={() => nextDate()}
              />
            </div>

            <div className="flex h-[35%] w-full pt-5">
              <HourArrowButton
                selectedDate={selectedDate}
                comparingDate={nodeStartDate}
                selectedHour={selectedHour}
                direction="left"
                onClick={() => prevHour()}
              />

              <div className="flex w-4/6 flex-col items-center justify-center">
                <div className="text-sm">
                  Hora
                </div>
                <div>
                  {selectedHour}
                </div>
              </div>

              <HourArrowButton
                selectedDate={selectedDate}
                comparingDate={currentDate}
                selectedHour={selectedHour}
                direction="right"
                onClick={() => nextHour()}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex size-full rounded-xl bg-white p-5 text-lg font-medium shadow">
      <div ref={ref} className="flex size-full items-center justify-center pr-5">
        {renderDateView()}
      </div>

      <div className="flex flex-col justify-evenly border-l pl-5">
        <button
          type="button"
          className={`${(dateView === null) && 'bg-graydetails'} flex size-[35px] items-center justify-center rounded-lg hover:bg-graydetails`}
          onClick={() => setDateView(null)}
        >
          <img
            src={calendarDayIcon}
            alt="calendar button"
            className="size-[28px]"
          />
        </button>

        <button
          type="button"
          className={`${(dateView === 'calendar') && 'bg-graydetails'} flex size-[35px] items-center justify-center rounded-lg hover:bg-graydetails`}
          onClick={() => setDateView('calendar')}
        >
          <img
            src={calendarIcon}
            alt="calendar button"
            className="size-[28px]"
          />
        </button>

        <button
          type="button"
          className="flex size-[35px] items-center justify-center rounded-lg hover:bg-graydetails"
          onClick={() => onResetClick()}
        >
          <img
            src={refresh}
            alt="refresh button"
            className="size-[28px]"
          />
        </button>
      </div>
    </div>
  );
};

export default DateWidget;
