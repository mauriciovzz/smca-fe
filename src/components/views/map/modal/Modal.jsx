import React from 'react';
import close from 'src/assets/close.svg';
import NodeInformationWidget from './NodeInformationWidget';
import VariableWidget from './VariableWidget';

const Modal = ({ selectedNode, setIsOpen }) => (
  <div className="absolute z-40 h-full w-full bg-white/25 p-4 backdrop-blur-sm">

    {/* On Desktop */}
    <div className="hidden h-full w-full sm:flex">
      <div className="grid h-full w-full grid-cols-6 gap-4">

        <div className="relative col-span-1">
          <NodeInformationWidget selectedNode={selectedNode} />
        </div>

        <div className="col-span-2 hidden bg-red-300">Camara</div>

        <div className="relative col-start-6 flex justify-end">
          <button
            type="button"
            className="absolute flex content-start"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={close}
              alt="close button"
              className="h-[28px] w-[28px] object-contain"
            />
          </button>
        </div>

        <div className="relative col-span-3 col-start-1">
          <VariableWidget type="METEOROLOGICAL" selectedNode={selectedNode} />
        </div>

        <div className="relative col-span-3">
          <VariableWidget type="ENVIROMENTAL" selectedNode={selectedNode} />
        </div>
      </div>
    </div>

    {/* On mobile */}
    <div className="flex h-full w-full sm:hidden">
      <div className="grid h-full w-full grid-cols-1 gap-4 overflow-auto">

        <div className="relative">
          <NodeInformationWidget selectedNode={selectedNode} />
        </div>

        <div className="hidden bg-red-300">Camara</div>

        <div className="relative bg-bluey">
          <VariableWidget
            typeOfView="METEOROLOGICAL"
            selectedNode={selectedNode}
          />
        </div>

        <div className="relative bg-bluey">
          <VariableWidget typeOfView="ENVIROMENTAL" selectedNode={selectedNode} />
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
