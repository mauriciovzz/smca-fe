import { React, useState, useEffect } from 'react';

import nodesService from 'src/services/nodes';
import readingsService from 'src/services/readings';
import notifications from 'src/utils/notifications';

import DateWidget from './Widgets/DateWidget/DateWidget';
import NodeInfoWidget from './Widgets/NodeInfoWidget';
import PhotoWidget from './Widgets/PhotoWidget';
import ReadingsWidget from './Widgets/ReadingsWidget';

const nodeReadingsDashboard = ({ selectedNode, setIsOpen }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(new Date(2024, 3, 2));
  const [dayUiInfo, setDayUiInfo] = useState({});
  const [dayReadings, setDayReadings] = useState([]);
  const [nodeComponents, setNodeCOmponents] = useState(null);

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

  const getPublicNodeComponents = async () => {
    try {
      const response = await nodesService.getComponents(
        selectedNode.workspace_id,
        selectedNode.node_id,
      );
      setNodeCOmponents(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  const getPrivateComponents = async () => {
    try {
      const response = await nodesService.getComponents(
        selectedNode.workspace_id,
        selectedNode.node_id,
      );
      setNodeCOmponents(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  const getPublicNodeReadings = async () => {
    try {
      getUiInfo();
      getPublicNodeComponents();

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
      getPrivateComponents();

      const response = await readingsService.getPrivateNodeReadings(
        selectedNode.node_id,
        selectedNode.location_id,
        `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      );

      setDayReadings(response.map((v) => ({ ...v, dayAverages: parseAverages(v.dayAverages) })));
      setIsPageLoading(false);
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
        <div className="grid h-full w-full  grid-cols-10 grid-rows-3 gap-4">

          <div className="col-span-5 row-span-1">
            <NodeInfoWidget
              selectedNode={selectedNode}
              nodeComponents={nodeComponents}
              setIsOpen={setIsOpen}
            />
          </div>

          {(true) && (
            <div className="col-span-2 row-span-1">
              <PhotoWidget />
            </div>
          )}

          <div className={`${(true) ? 'col-span-3' : 'col-span-5'} row-span-1`}>
            <DateWidget
              selectedNode={selectedNode}
              selectedDate={selectedDate}
              changeDate={changeDate}
            />
          </div>

          <div className="relative col-span-5 col-start-1 row-span-2">
            <ReadingsWidget
              type="meteorological"
              dayReadings={dayReadings.filter((dr) => dr.type === 'Meteorológica')}
              dayUiInfo={dayUiInfo}
              selectedDate={selectedDate}
              changeDate={changeDate}
            />
          </div>

          <div className="relative col-span-5 row-span-2">
            <ReadingsWidget
              type="enviromental"
              dayReadings={dayReadings.filter((dr) => dr.type === 'Ambiental')}
              dayUiInfo={dayUiInfo}
              selectedDate={selectedDate}
              changeDate={changeDate}
            />
          </div>

        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-full w-full sm:hidden">
        <div className="hide-scrollbar flex w-full flex-col overflow-scroll scroll-smooth">
          <div className="inline-block space-y-4">

            <div className="relative h-[330px]">
              <NodeInfoWidget
                selectedNode={selectedNode}
                nodeComponents={nodeComponents}
                setIsOpen={setIsOpen}
              />
            </div>

            <div className="sticky top-0 z-[100] flex h-fit ">
              <DateWidget
                selectedNode={selectedNode}
                selectedDate={selectedDate}
                changeDate={changeDate}
              />
            </div>

            {(true) && (
              <div className="relative h-fit">
                <PhotoWidget />
              </div>
            )}

            <div className="relative h-[330px]">
              <ReadingsWidget
                type="meteorological"
                dayReadings={dayReadings.filter((dr) => dr.type === 'Meteorológica')}
                dayUiInfo={dayUiInfo}
                selectedDate={selectedDate}
                changeDate={changeDate}
              />
            </div>

            <div className="relative h-[330px]">
              <ReadingsWidget
                type="enviromental"
                dayReadings={dayReadings.filter((dr) => dr.type === 'Ambiental')}
                dayUiInfo={dayUiInfo}
                selectedDate={selectedDate}
                changeDate={changeDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default nodeReadingsDashboard;
