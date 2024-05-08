import { React, useState, useEffect } from 'react';

import { close } from 'src/assets';
import readingsService from 'src/services/readings';
import notifications from 'src/utils/notifications';

import CameraWidget from './Widgets/CameraWidget';
import DateWidget from './Widgets/DateWidget/DateWidget';
import EnviromentalWidget from './Widgets/EnviromentalWidget';
import MeteorologicalWidget from './Widgets/MeteorologicalWidget';
import NodeInfoWidget from './Widgets/NodeInfoWidget';

const nodeReadingsDashboard = ({ selectedNode, setIsOpen }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayUiInfo, setDayUiInfo] = useState({});
  const [dayReadings, setDayReadings] = useState([]);

  const changeDate = (newDate, newHour) => {
    const currentDate = newDate || selectedDate;
    const currenTime = (newHour) ? new Date(newHour) : selectedDate;

    setSelectedDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currenTime.getHours(),
      ),
    );
  };

  const parseAverages = (v) => {
    const newArray = [];

    for (let i = 1; i <= 24; i += 1) {
      const match = v.dayAverages.find(
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
          time: (i === 24) ? 0 : i,
          value: (match) ? match.average : null,
        },
      );
    }

    return newArray;
  };

  const getUiInfo = async () => {
    try {
      const response = await readingsService.getUiInfo(
        selectedNode.node_id,
        selectedNode.location_id,
        `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      );

      setDayUiInfo(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  const getPublicNodeReadings = async () => {
    try {
      getUiInfo();

      const response = await readingsService.getPublicNodeReadings(
        selectedNode.node_id,
        selectedNode.location_id,
        `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      );

      setDayReadings(response.map((v) => ({ ...v, dayAverages: parseAverages(v) })));
      setIsPageLoading(false);
    } catch (err) {
      notifications.error(err);
    }
  };

  const getPrivateNodeReadings = async () => {
    try {
      getUiInfo();

      const response = await readingsService.getPrivateNodeReadings(
        selectedNode.node_id,
        selectedNode.location_id,
        `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      );

      setDayReadings(response.map((v) => ({ ...v, dayAverages: parseAverages(v.dayAverages) })));
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    if (selectedNode.is_visible) {
      getPublicNodeReadings();
    } else {
      getPrivateNodeReadings();
    }
  }, [selectedDate]);

  return (!isPageLoading) && (
    <div className="absolute z-[100] h-full w-full bg-white/25 p-5 backdrop-blur-sm">

      {/* Desktop */}
      <div className="hidden h-full w-full sm:flex">
        <div className="grid h-full w-full  grid-cols-12 grid-rows-3 gap-4">

          {/* <div className={`${(true) ? 'col-span-4' : 'col-span-6'} row-span-1`}> */}
          <div className="col-span-4 row-span-1">
            <NodeInfoWidget selectedNode={selectedNode} />
          </div>

          {/* Camera Widget */}
          {(true) && (
            <div className="relative col-span-2 row-span-1">
              <CameraWidget selectedNode={selectedNode} />
            </div>
          )}

          {/* Date Widget */}
          <div className="col-span-5 row-span-1">
            <DateWidget
              selectedNode={selectedNode}
              selectedDate={selectedDate}
              changeDate={changeDate}
            />
          </div>

          {/* Close button */}
          <div className="col-span-1 row-span-1 flex items-center justify-center">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-white shadow">
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
          </div>

          {/* Meteorological Widget */}
          <div className="relative col-span-6 col-start-1 row-span-2">
            <MeteorologicalWidget
              dayReadings={dayReadings.filter((dr) => dr.type === 'Meteorológica')}
              dayUiInfo={dayUiInfo}
              selectedDate={selectedDate}
              changeDate={changeDate}
            />
          </div>

          {/* Envormental Widget */}
          <div className="relative col-span-6 row-span-2">
            <EnviromentalWidget
              dayReadings={dayReadings.filter((dr) => dr.type === 'Ambiental')}
              selectedDate={selectedDate}
            />
          </div>

        </div>
      </div>

      {/* Mobile */}
      {/* <div className="flex h-full w-full sm:hidden">
        <div className="hide-scrollbar flex w-full flex-col overflow-scroll scroll-smooth">
          <div className="inline-block space-y-4">

            <div className="flex h-[50px] space-x-4 ">

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

            <div className="relative h-[140px]">
              <NodeInfoWidget selectedNode={selectedNode} />
            </div>

            {selectedNode.camera && (
              <div className="relative flex h-[140px]">
                <CameraWidget selectedNode={selectedNode} />
              </div>
            )}

            <div className="flex h-[140px] flex-col items-center justify-center r
            ounded-xl bg-white px-4 py-2 text-xl font-medium shadow">
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

            <div className="flex h-[140px] items-center
            overflow-hidden rounded-xl bg-white px-10 text-xs shadow">
              <Calendar
                onChange={changeDate}
                value={selectedDate}
                minDate={new Date(selectedNode.start_date)}
                maxDate={new Date()}
                locale="es-VE"
              />
            </div>

            <div className="relative h-[290px]">
              <MeteorologicalWidget
                dayReadings={dayReadings.filter((dr) => dr.type === 'Meteorológica')}
                hasRainSensor={selectedNode.rain}
                selectedDate={selectedDate}
              />
            </div>

            <div className="relative h-[290px]">
              <EnviromentalWidget
                dayReadings={dayReadings.filter((dr) => dr.type === 'Ambiental')}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default nodeReadingsDashboard;
