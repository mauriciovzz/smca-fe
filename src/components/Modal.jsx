import React from "react";
import InfoView from "./InfoView";
import VariableView from "./VariableView";

const Modal = ({ nodeLocation, setIsOpen }) => (
  <div
    className="absolute z-40 h-full w-full bg-white bg-opacity-25 p-4 backdrop-blur-sm"
    onClick={() => setIsOpen(false)}
  >
    {/* On Desktop */}
    <div className="hidden h-full w-full sm:flex">
      <div className="grid h-full w-full grid-cols-6 gap-4">
        {/* Info */}
        <div className="relative col-span-1 box-border bg-bluey ">
          <InfoView nodeLocation={nodeLocation} />
        </div>

        {/* Camera */}
        <div className="col-span-2 hidden bg-red-300">Camara</div>

        {/* Variables Meteorologicas */}
        <div className="relative col-span-3 col-start-1 bg-bluey">
          <VariableView
            typeOfView="METEOROLOGICAL"
            nodeLocation={nodeLocation}
          />
        </div>

        {/* Variables Ambientales */}
        <div className="relative col-span-3 bg-bluey">
          <VariableView typeOfView="ENVIROMENTAL" nodeLocation={nodeLocation} />
        </div>
      </div>
    </div>

    {/* On mobile */}
    <div className="flex h-full w-full sm:hidden">
      <div className="grid h-full w-full grid-cols-1 gap-4 overflow-auto">
        {/* Info */}
        <div className="relative box-border bg-bluey ">
          <InfoView nodeLocation={nodeLocation} />
        </div>

        {/* Camera */}
        <div className="hidden bg-red-300">Camara</div>

        {/* Variables Meteorologicas */}
        <div className="relative bg-bluey">
          <VariableView
            typeOfView="METEOROLOGICAL"
            nodeLocation={nodeLocation}
          />
        </div>

        {/* Variables Ambientales */}
        <div className="relative bg-bluey">
          <VariableView typeOfView="ENVIROMENTAL" nodeLocation={nodeLocation} />
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
