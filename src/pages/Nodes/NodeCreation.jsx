import {
  React, useState, useEffect, useContext,
} from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { AuthContext } from 'src/context/authProvider';
import componentsService from 'src/services/components';

import BoardSelection from './BoardSelection';
import OtherComponentsSelection from './OtherComponentsSelection';
import SensorSelection from './SensorSelection';

const CustomDot = ({
  onClick, active, index, carouselState,
}) => {
  const slideNames = ['Agregar Nodo', 'Componentes', 'Ubicacion', 'Confirmar'];
  const slideNamesM = ['AN', 'Comp', 'Ubi', 'Con'];

  return (
    <li>
      <button
        type="button"
        className={`${active && 'font-semibold'} text-xs sm:text-base`}
        onClick={() => onClick()}
      >
        {(carouselState.deviceType === 'desktop') ? slideNames[index] : slideNamesM[index]}
      </button>
    </li>
  );
};

const NodeCreation = () => {
  const [componentList, setComponentList] = useState(null);
  const [newNode, setNewNode] = useState({
    boards: {
      primary: null,
      secondary: null,
    },
    sensors: [],
    otherComponents: {
      camera: null,
      screen: null,
      others: [],
    },
    node_type: null,
    coordenates: {
      lat: null,
      long: null,
    },
  });
  const { logout } = useContext(AuthContext);

  const updateComponentList = () => {
    componentsService
      .getAll()
      .then((allComponents) => setComponentList(allComponents))
      .catch((err) => {
        if (err.response.data.error === 'La sesión expiró') logout(err);
      });
  };

  useEffect(() => {
    updateComponentList();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex h-full w-full flex-col gap-5">
        <Carousel
          className="grow"
          containerClass="h-full sm:order-2"
          sliderClass="h-full"
          showDots
          renderDotsOutside
          customDot={<CustomDot />}
          dotListClass="relative justify-around rounded-lg bg-white p-2.5 shadow sm:order-1"
          swipeable={false}
          draggable={false}
          arrows={false}
          responsive={responsive}
        >

          {/* Agregar Nodo */}
          <div className="flex h-full flex-col space-x-0 rounded-lg bg-white p-5 shadow sm:flex-row sm:space-x-5 sm:space-y-0">
            Agregar Nodo
          </div>

          {/* Components */}
          <div className="h-full w-full">

            {/* desktop */}
            <div className="hidden h-full w-full space-x-5 sm:flex">

              {/* Placas */}
              <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
                <BoardSelection
                  componentList={componentList}
                  newNode={newNode}
                  setNewNode={setNewNode}
                  updateComponentList={updateComponentList}
                />
              </div>

              {/* Sensores */}
              <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
                <SensorSelection
                  componentList={componentList}
                  newNode={newNode}
                  setNewNode={setNewNode}
                  updateComponentList={updateComponentList}
                />
              </div>

              {/* Otros componentes */}
              <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
                <OtherComponentsSelection
                  componentList={componentList}
                  newNode={newNode}
                  setNewNode={setNewNode}
                  updateComponentList={updateComponentList}
                />
              </div>
            </div>

            {/* mobile */}
            <div className="grid h-full grid-cols-1 grid-rows-1 rounded-lg bg-white shadow sm:hidden">
              <Carousel
                showDots
                renderDotsOutside
                swipeable={false}
                arrows={false}
                responsive={responsive}
                dotListClass="relative px-2.5 pb-2.5"
                sliderClass="h-full"
                className="h-full"
              >
                {/* Placas */}
                <div className="flex h-full w-full flex-col p-5">
                  <BoardSelection
                    componentList={componentList}
                    newNode={newNode}
                    setNewNode={setNewNode}
                    updateComponentList={updateComponentList}
                  />
                </div>

                {/* Sensores */}
                <div className="flex h-full w-full flex-col p-5">
                  <SensorSelection
                    componentList={componentList}
                    newNode={newNode}
                    setNewNode={setNewNode}
                    updateComponentList={updateComponentList}
                  />
                </div>

                {/* Otros componentes */}
                <div className="flex h-full w-full flex-col p-5">
                  <OtherComponentsSelection
                    componentList={componentList}
                    newNode={newNode}
                    setNewNode={setNewNode}
                    updateComponentList={updateComponentList}
                  />
                </div>
              </Carousel>
            </div>

          </div>

          {/* Location */}
          {/* <LocationsView
            onMarkerClick={
              (location) => {
                if (
                  newNode.coordenates.lat === location.lat
                  && newNode.coordenates.long === location.long
                ) {
                  setNewNode({
                    ...newNode,
                    coordenates: { lat: null, long: null },
                  });
                } else {
                  setNewNode({
                    ...newNode,
                    coordenates: { lat: location.lat, long: location.long },
                  });
                }
              }
            }
            tableTitle="Selecionar ubicacion"
            tableRowClick={
              (location) => {
                if (
                  newNode.coordenates.lat === location.lat
                  && newNode.coordenates.long === location.long
                ) {
                  setNewNode({
                    ...newNode,
                    coordenates: { lat: null, long: null },
                  });
                } else {
                  setNewNode({
                    ...newNode,
                    coordenates: { lat: location.lat, long: location.long },
                  });
                }
              }
            }
          /> */}

          {/* Confirm */}
          <div className="">
            Confirm
          </div>

        </Carousel>
      </div>
    </div>
  );
};

export default NodeCreation;
