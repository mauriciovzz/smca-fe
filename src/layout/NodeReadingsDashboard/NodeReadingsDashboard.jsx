import { React, useState, useEffect } from 'react';

import nodesService from 'src/services/nodes';
import photosService from 'src/services/photos';
import readingsService from 'src/services/readings';
import notifications from 'src/utils/notifications';

import DateWidget from './Widgets/DateWidget/DateWidget';
import NodeInfoWidget from './Widgets/NodeInfoWidget';
import PhotoWidget from './Widgets/PhotoWidget';
import ReadingsWidget from './Widgets/ReadingsWidget';

const nodeReadingsDashboard = ({ selectedNode, setIsOpen }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayReadings, setDayReadings] = useState([]);
  const [dayPhotos, setDayPhotos] = useState([]);
  const [nodeComponents, setNodeComponents] = useState(null);

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

  const parsePhotos = (p) => {
    const newArray = [];

    for (let i = 1; i <= 24; i += 1) {
      const match = p.find(
        (photoReference) => photoReference.end_hour === i,
      );

      newArray.push(
        {
          time: (i === 24) ? 0 : i,
          photoPath: (match) ? match.photo_path : null,
        },
      );
    }

    return newArray;
  };

  const getPublicNodeData = async () => {
    try {
      const components = await nodesService.getPublicNodeComponents(
        selectedNode.workspace_id,
        selectedNode.node_id,
      );
      setNodeComponents(components);

      const photos = await photosService.getPublicNodePhotos(
        selectedNode.node_id,
        selectedNode.location_id,
        `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      );
      setDayPhotos(photos.length > 0 ? parsePhotos(photos) : []);

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

  const getPrivateNodeData = async () => {
    try {
      const components = await nodesService.getPrivateNodeComponents(
        selectedNode.workspace_id,
        selectedNode.node_id,
      );
      setNodeComponents(components);

      const readings = await readingsService.getPrivateNodeReadings(
        selectedNode.node_id,
        selectedNode.location_id,
        `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      );
      setDayReadings(readings.map((v) => ({ ...v, dayAverages: parseAverages(v.dayAverages) })));

      const photos = await photosService.getPrivateNodePhotos(
        selectedNode.node_id,
        selectedNode.location_id,
        `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      );
      setDayPhotos(photos.length > 0 ? parsePhotos(photos) : []);

      setIsPageLoading(false);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    if (selectedNode.is_visible) {
      getPublicNodeData();
    } else {
      getPrivateNodeData();
    }
  }, [selectedDate]);

  return (!isPageLoading) && (
    <div className="absolute z-[100] h-full w-full bg-white/25 p-5 backdrop-blur-sm">
      {
        (window.innerWidth <= 640)
          ? (
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

                  {(dayPhotos.length > 0) && (
                    <div className="relative h-[230px]">
                      <PhotoWidget
                        dayPhotos={dayPhotos}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}

                  <div className="relative h-[330px]">
                    <ReadingsWidget
                      type="meteorological"
                      dayReadings={dayReadings.filter((dr) => dr.type === 'Meteorológica')}
                      selectedDate={selectedDate}
                      changeDate={changeDate}
                    />
                  </div>

                  <div className="relative h-[330px]">
                    <ReadingsWidget
                      type="enviromental"
                      dayReadings={dayReadings.filter((dr) => dr.type === 'Ambiental')}
                      selectedDate={selectedDate}
                      changeDate={changeDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <div className="flex h-full w-full">
              <div className="grid h-full w-full grid-cols-10 grid-rows-3 gap-4">

                <div className="col-span-5 row-span-1">
                  <NodeInfoWidget
                    selectedNode={selectedNode}
                    nodeComponents={nodeComponents}
                    setIsOpen={setIsOpen}
                  />
                </div>

                {(dayPhotos.length > 0) && (
                  <div className="col-span-2 row-span-1">
                    <PhotoWidget
                      dayPhotos={dayPhotos}
                      selectedDate={selectedDate}
                    />
                  </div>
                )}

                <div className={`${(dayPhotos.length > 0) ? 'col-span-3' : 'col-span-5'} row-span-1`}>
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
                    selectedDate={selectedDate}
                    changeDate={changeDate}
                  />
                </div>

                <div className="relative col-span-5 row-span-2">
                  <ReadingsWidget
                    type="enviromental"
                    dayReadings={dayReadings.filter((dr) => dr.type === 'Ambiental')}
                    selectedDate={selectedDate}
                    changeDate={changeDate}
                  />
                </div>

              </div>
            </div>
          )
      }
    </div>
  );
};

export default nodeReadingsDashboard;
