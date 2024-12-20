import { React, useState, useEffect } from 'react';

import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';

import DateWidget from './Widgets/DateWidget/DateWidget';
import NodeInfoWidget from './Widgets/NodeInfoWidget';
// import PhotoWidget from './Widgets/PhotoWidget';
import ReadingsWidget from './Widgets/ReadingsWidget';

const ReadingsDashboard = ({ selectedNode, setIsModOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const isScreenSmall = useScreenWidth();

  const [loadingData, setLoadingData] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateReadings, setDateReadings] = useState([]);
  // const [dayPhotos, setDayPhotos] = useState([]);
  const [nodeComponents, setNodeComponents] = useState(null);

  const parseDate = () => (
    `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
  );

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
      const match = v.dateAverages.find(
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

  // const parsePhotos = (p) => {
  //   const newArray = [];

  //   for (let i = 1; i <= 24; i += 1) {
  //     const match = p.find(
  //       (photoReference) => photoReference.end_hour === i,
  //     );

  //     newArray.push(
  //       {
  //         time: (i === 24) ? 0 : i,
  //         photoPath: (match) ? match.photo_path : null,
  //       },
  //     );
  //   }

  //   return newArray;
  // };

  const getData = async () => {
    try {
      const components = await axiosPrivate.get(
        `/api/spaces/${selectedNode.space_id}/nodes/${selectedNode.node_id}/components`,
      );
      setNodeComponents(components.data);

      // const photos = await photosService.getPublicNodePhotos(
      //   selectedNode.node_id,
      //   selectedNode.location_id,
      //   `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      // );
      // setDayPhotos(photos.length > 0 ? parsePhotos(photos) : []);

      const readings = await axiosPrivate.get(
        `/api/readings/node-readings/${selectedNode.node_id}/${parseDate()}`,
      );
      setDateReadings(readings.data.map((v) => ({ ...v, dateAverages: parseAverages(v) })));

      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedDate]);

  return (
    <div className="absolute z-[100] size-full bg-white/25 p-5 backdrop-blur-sm">
      {
        loadingData
          ? <LoaderSpinner isSmall />
          : (
            <div className="flex size-full">
              {
                (isScreenSmall)
                  ? (
                    <div className="hide-scrollbar flex w-full flex-col overflow-scroll scroll-smooth">
                      <div className="inline-block space-y-4">

                        <div className="relative h-[275px]">
                          <NodeInfoWidget
                            selectedNode={selectedNode}
                            nodeComponents={nodeComponents}
                            setIsModOpen={setIsModOpen}
                          />
                        </div>

                        <div className="sticky top-0 z-[100] flex h-fit ">
                          <DateWidget
                            selectedNode={selectedNode}
                            selectedDate={selectedDate}
                            changeDate={changeDate}
                          />
                        </div>

                        {/* {(dayPhotos.length > 0) && (
                          <div className="relative h-[230px]">
                            <PhotoWidget
                              dayPhotos={dayPhotos}
                              selectedDate={selectedDate}
                            />
                          </div>
                        )} */}

                        <div className="relative h-[330px]">
                          <ReadingsWidget
                            type="meteorological"
                            dateReadings={dateReadings.filter((dr) => dr.type === 'meteorological')}
                            selectedDate={selectedDate}
                            changeDate={changeDate}
                          />
                        </div>

                        <div className="relative h-[330px]">
                          <ReadingsWidget
                            type="enviromental"
                            dateReadings={dateReadings.filter((dr) => dr.type === 'enviromental')}
                            selectedDate={selectedDate}
                            changeDate={changeDate}
                          />
                        </div>
                      </div>
                    </div>
                  )
                  : (
                    <div className="grid size-full grid-cols-10 grid-rows-3 gap-4">
                      <div className="col-span-5 row-span-1">
                        <NodeInfoWidget
                          selectedNode={selectedNode}
                          nodeComponents={nodeComponents}
                          setIsModOpen={setIsModOpen}
                        />
                      </div>

                      {/* {(dayPhotos.length > 0) && (
                        <div className="col-span-2 row-span-1">
                          <PhotoWidget
                            dayPhotos={dayPhotos}
                            selectedDate={selectedDate}
                          />
                        </div>
                      )} */}

                      {/* {`${(dayPhotos.length > 0) ? 'col-span-3' : 'col-span-5'} row-span-1`} */}
                      <div className="col-span-5 row-span-1">
                        <DateWidget
                          selectedNode={selectedNode}
                          selectedDate={selectedDate}
                          changeDate={changeDate}
                        />
                      </div>

                      <div className="relative col-span-5 col-start-1 row-span-2">
                        <ReadingsWidget
                          type="meteorological"
                          dateReadings={dateReadings.filter((dr) => dr.type === 'meteorological')}
                          selectedDate={selectedDate}
                          changeDate={changeDate}
                        />
                      </div>

                      <div className="relative col-span-5 row-span-2">
                        <ReadingsWidget
                          type="enviromental"
                          dateReadings={dateReadings.filter((dr) => dr.type === 'enviromental')}
                          selectedDate={selectedDate}
                          changeDate={changeDate}
                        />
                      </div>
                    </div>
                  )
              }
            </div>
          )
      }
    </div>
  );
};

export default ReadingsDashboard;
