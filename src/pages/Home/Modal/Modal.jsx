import {
  React,
  useState,
} from 'react';

import Calendar from 'react-calendar';
import './Calendar.css';

import {
  close,
  refresh,
} from 'src/assets';

import CameraWidget from './Widgets/CameraWidget';
import EnviromentalWidget from './Widgets/EnviromentalWidget';
import MeteorologicalWidget from './Widgets/MeteorologicalWidget';
import NodeInfoWidget from './Widgets/NodeInfoWidget';

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const Modal = ({ selectedNode, setIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChange = (nextValue) => {
    setSelectedDate(
      new Date(
        nextValue.getFullYear(),
        nextValue.getMonth(),
        nextValue.getDate(),
        selectedDate.getHours(),
        selectedDate.getMinutes(),
        selectedDate.getSeconds(),
      ),
    );
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours %= 12;
    hours = hours || 12;

    return `${hours} ${ampm}`;
  };

  return (
    <div className="absolute z-40 h-full w-full bg-white/25 p-4 backdrop-blur-sm">

      {/* Desktop */}
      <div className="hidden h-full w-full sm:flex">
        <div className="grid h-full w-full  grid-cols-12 grid-rows-3 gap-4">

          {/* Info Widget */}
          <div className={`relative ${(selectedNode.camera) ? 'col-span-4' : 'col-span-6'} row-span-1`}>
            <NodeInfoWidget selectedNode={selectedNode} />
          </div>

          {/* Camera Widget */}
          {selectedNode.camera && (
            <div className="relative col-span-2 row-span-1">
              <CameraWidget selectedNode={selectedNode} />
            </div>
          )}

          {/* Date Widget */}
          <div className="col-span-2 row-span-1 flex flex-col items-center justify-center rounded-xl bg-white px-4 py-2 text-xl font-medium shadow">
            <div>
              {dayNames[selectedDate.getDay()]}
              <br />
            </div>
            <div>
              {`${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}`}
              <br />
            </div>
            <div>
              {formatTime(selectedDate)}
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="col-span-3 row-span-1 flex items-center overflow-hidden rounded-xl bg-white px-10 text-xs shadow">
            <Calendar
              onChange={onChange}
              value={selectedDate}
              minDate={new Date(selectedNode.start_date)}
              maxDate={new Date()}
              locale="es-VE"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <div className="grid h-full w-full grid-rows-2 gap-4">

              {/* Close */}
              <div className="row-span-1 flex items-center justify-center rounded-xl bg-white shadow">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={close}
                    alt="close button"
                    className="h-[28px] w-[28px]"
                  />
                </button>
              </div>

              {/* Refresh */}
              <div className="row-span-1 flex items-center justify-center rounded-xl bg-white shadow ">
                <button
                  type="button"
                  onClick={() => setSelectedDate(new Date())}
                >
                  <img
                    src={refresh}
                    alt="close button"
                    className="h-[28px] w-[28px]"
                  />
                </button>
              </div>
            </div>

          </div>

          {/* Meteorological Widget */}
          <div className="relative col-span-6 col-start-1 row-span-2">
            <MeteorologicalWidget
              selectedNode={selectedNode}
              selectedDate={selectedDate}
            />
          </div>

          {/* Envormental Widget */}
          <div className="relative col-span-6 row-span-2">
            <EnviromentalWidget
              selectedNode={selectedNode}
              selectedDate={selectedDate}
            />
          </div>

        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-full w-full sm:hidden">
        <div className="hide-scrollbar flex w-full flex-col overflow-scroll scroll-smooth">
          <div className="inline-block space-y-4">

            {/* Buttons */}
            <div className="flex h-[50px] space-x-4 ">

              {/* Close */}
              <div className="flex grow items-center justify-center rounded-xl bg-white shadow">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={close}
                    alt="close button"
                    className="h-[28px] w-[28px]"
                  />
                </button>
              </div>

              {/* Refresh */}
              <div className="flex grow items-center justify-center rounded-xl bg-white shadow ">
                <button
                  type="button"
                  onClick={() => setSelectedDate(new Date())}
                >
                  <img
                    src={refresh}
                    alt="close button"
                    className="h-[28px] w-[28px]"
                  />
                </button>
              </div>

            </div>

            {/* Info Widget */}
            <div className="relative h-[140px]">
              <NodeInfoWidget selectedNode={selectedNode} />
            </div>

            {/* Camera Widget */}
            {selectedNode.camera && (
              <div className="relative flex h-[140px]">
                <CameraWidget selectedNode={selectedNode} />
              </div>
            )}

            {/* Date Widget */}
            <div className="flex h-[140px] flex-col items-center justify-center rounded-xl bg-white px-4 py-2 text-xl font-medium shadow">
              <div>
                {dayNames[selectedDate.getDay()]}
                <br />
              </div>
              <div>
                {`${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}`}
                <br />
              </div>
              <div>
                {formatTime(selectedDate)}
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="flex h-[140px] items-center overflow-hidden rounded-xl bg-white px-10 text-xs shadow">
              <Calendar
                onChange={onChange}
                value={selectedDate}
                minDate={new Date(selectedNode.start_date)}
                maxDate={new Date()}
                locale="es-VE"
              />
            </div>

            {/* Meteorological Widget */}
            <div className="relative h-[290px]">
              <MeteorologicalWidget
                selectedNode={selectedNode}
                selectedDate={selectedDate}
              />
            </div>

            {/* Envormental Widget */}
            <div className="relative h-[290px]">
              <EnviromentalWidget
                selectedNode={selectedNode}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Modal;
