import {
  React, useState, useEffect, useRef,
} from 'react';

import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';

import CameraWidget from './Widgets/CameraWidget';
import DateWidget from './Widgets/DateWidget';
import EnvironmentalWidget from './Widgets/EnvironmentalWidget';
import FullScreenPhoto from './Widgets/FullScreenPhoto';
import MeteorologicalWidget from './Widgets/MeteorologicalWidget';
import NodeInfoWidget from './Widgets/NodeInfoWidget';

const ReadingsDashboard = ({ selectedNode, setIsModOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const isScreenSmall = useScreenWidth();

  const [loadingData, setLoadingData] = useState(true);
  const [reloadInfo, setReloadInfo] = useState(false);
  const [showCameraWidget, setShowCameraWidget] = useState(false);
  const [openCurrentPhoto, setOpenCurrentPhoto] = useState(false);

  const nd = new Date();
  const [selectedDate, setSelectedDate] = useState(nd);
  const [selectedHour, setSelectedHour] = useState(nd.getHours());

  const lastDateRef = useRef(null);

  const [nodeComponents, setNodeComponents] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentDateReadings, setCurrentDateReadings] = useState([]);

  // Date functions
  const currentDate = new Date();
  const nodeStartDate = new Date(selectedNode.start_time_stamp);

  const formatDate = () => {
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const year = String(selectedDate.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  const getDateOnly = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const changeDate = (newDate, newHour) => {
    const incomingDate = newDate;
    let incomingHour = newHour;

    if (incomingDate.toDateString() === nodeStartDate.toDateString()) {
      if (incomingHour < nodeStartDate.getHours())
        incomingHour = nodeStartDate.getHours() + 1;
    }

    if (incomingDate.toDateString() === currentDate.toDateString()) {
      if (incomingHour > currentDate.getHours())
        incomingHour = currentDate.getHours();
    }

    setSelectedDate(incomingDate);
    setSelectedHour(incomingHour);
  };

  const reload = () => {
    setReloadInfo((prev) => !prev);
  };

  // API calls
  const getCurrentPhoto = async () => {
    try {
      const photo = await axiosPrivate.get(
        `/api/photos/${selectedNode.space_id}/${selectedNode.node_id}/${selectedNode.location_id}/${formatDate()}/${selectedHour}`,
        { responseType: 'blob' },
      );

      const url = URL.createObjectURL(photo.data);
      setCurrentPhoto(url);
    } catch (error) {
      if (error.status === 404)
        setCurrentPhoto(null);
      else
        errorHandler(error);
    }
  };

  const confirmCameraWidget = async (components) => {
    if (components.some((c) => c.type === 'camera')) {
      setShowCameraWidget(true);
      getCurrentPhoto();
    } else
      try {
        const hasPhotos = await axiosPrivate.get(
          `/api/photos/${selectedNode.space_id}/${selectedNode.node_id}/${selectedNode.location_id}/${formatDate()}`,
        );

        if (hasPhotos.data) {
          setShowCameraWidget(true);
          getCurrentPhoto();
        } else {
          setShowCameraWidget(false);
        }
      } catch (error) {
        errorHandler(error);
      }
  };

  const getCurrentDateReadings = async () => {
    const readings = await axiosPrivate.get(
      `/api/readings/${selectedNode.space_id}/${selectedNode.node_id}/${selectedNode.location_id}/${formatDate()}`,
    );
    setCurrentDateReadings(readings.data);
  };

  const getComponents = async () => {
    try {
      const components = await axiosPrivate.get(
        `/api/spaces/${selectedNode.space_id}/nodes/${selectedNode.node_id}/components`,
      );
      setNodeComponents(components.data);
      confirmCameraWidget(components.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    const und = new Date();
    setSelectedDate(und);
    setSelectedHour(und.getHours());

    getComponents();
    getCurrentDateReadings();

    lastDateRef.current = getDateOnly(selectedDate);

    setLoadingData(false);
  }, [reloadInfo]);

  useEffect(() => {
    const curDate = getDateOnly(selectedDate);
    const lastDate = lastDateRef.current;

    if (!lastDate || curDate.getTime() !== lastDate.getTime()) {
      confirmCameraWidget(nodeComponents);
      getCurrentDateReadings();
    }
  }, [selectedDate]);

  useEffect(() => {
    getCurrentPhoto();
  }, [selectedHour]);

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
                    <>
                      <div className="hide-scrollbar flex w-full flex-col overflow-scroll scroll-smooth">
                        <div className="inline-block space-y-4">

                          <div className="relative h-[275px]">
                            <NodeInfoWidget
                              selectedNode={selectedNode}
                              nodeComponents={nodeComponents}
                              setIsModOpen={setIsModOpen}
                              reload={reload}
                            />
                          </div>

                          <div className="sticky top-0 z-[100] flex h-fit ">
                            <DateWidget
                              selectedDate={selectedDate}
                              selectedHour={selectedHour}
                              nodeStartDate={nodeStartDate}
                              currentDate={currentDate}
                              changeDate={changeDate}
                            />
                          </div>

                          {(showCameraWidget) && (
                            <div className="relative h-[230px]">
                              <CameraWidget
                                currentPhoto={currentPhoto}
                                photoName={`${selectedNode.node_id}_${selectedNode.location_id}_${formatDate()}_${selectedHour}.jpg`}
                                setOpenCurrentPhoto={setOpenCurrentPhoto}
                              />
                            </div>
                          )}

                          <div className="relative h-[380px]">
                            <MeteorologicalWidget
                              dateReadings={currentDateReadings.filter((v) => v.variable_type === 'meteorological')}
                              selectedDate={selectedDate}
                              selectedHour={selectedHour}
                              changeDate={changeDate}
                            />
                          </div>

                          <div className="relative h-[380px]">
                            <EnvironmentalWidget
                              dateReadings={currentDateReadings.filter((v) => v.variable_type === 'enviromental')}
                              rainReadings={currentDateReadings.find((v) => v.variable_name === 'precipitación')}
                              selectedDate={selectedDate}
                              selectedHour={selectedHour}
                              changeDate={changeDate}
                            />
                          </div>
                        </div>
                      </div>

                      {openCurrentPhoto && (
                        <FullScreenPhoto
                          currentPhoto={currentPhoto}
                          setOpenCurrentPhoto={setOpenCurrentPhoto}
                        />
                      )}
                    </>
                  )
                  : (
                    <>
                      <div className="grid size-full grid-cols-10 grid-rows-3 gap-4">
                        <div className="col-span-5 row-span-1">
                          <NodeInfoWidget
                            selectedNode={selectedNode}
                            nodeComponents={nodeComponents}
                            setIsModOpen={setIsModOpen}
                            reload={reload}
                          />
                        </div>

                        {(showCameraWidget) && (
                          <div className="col-span-2 row-span-1">
                            <CameraWidget
                              currentPhoto={currentPhoto}
                              photoName={`${selectedNode.node_id}_${selectedNode.location_id}_${formatDate()}_${selectedHour}.jpg`}
                              setOpenCurrentPhoto={setOpenCurrentPhoto}
                            />
                          </div>
                        )}

                        <div className={`${(showCameraWidget) ? 'col-span-3' : 'col-span-5'} row-span-1`}>
                          <DateWidget
                            selectedDate={selectedDate}
                            selectedHour={selectedHour}
                            nodeStartDate={nodeStartDate}
                            currentDate={currentDate}
                            changeDate={changeDate}
                          />
                        </div>

                        <div className="relative col-span-5 col-start-1 row-span-2">
                          <MeteorologicalWidget
                            dateReadings={currentDateReadings.filter((v) => v.variable_type === 'meteorological')}
                            selectedDate={selectedDate}
                            selectedHour={selectedHour}
                            changeDate={changeDate}
                          />
                        </div>

                        <div className="relative col-span-5 row-span-2">
                          <EnvironmentalWidget
                            dateReadings={currentDateReadings.filter((v) => v.variable_type === 'enviromental')}
                            rainReadings={currentDateReadings.find((v) => v.variable_name === 'precipitación')}
                            selectedDate={selectedDate}
                            selectedHour={selectedHour}
                            changeDate={changeDate}
                          />
                        </div>
                      </div>

                      {openCurrentPhoto && (
                        <FullScreenPhoto
                          currentPhoto={currentPhoto}
                          setOpenCurrentPhoto={setOpenCurrentPhoto}
                        />
                      )}
                    </>
                  )
              }
            </div>
          )
      }
    </div>
  );
};

export default ReadingsDashboard;
