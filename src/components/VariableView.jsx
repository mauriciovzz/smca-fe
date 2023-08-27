import { React, useState, useEffect } from 'react';
import variableService from '../services/variables';
import VariableItem from './VariableItem';

const VariableView = ({ typeOfView, nodeLocation }) => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    if (nodeLocation) {
      variableService
        .getAll(nodeLocation)
        .then((requestedVariables) =>
          setVariables(requestedVariables.filter((v) =>
            v.variable_type === typeOfView)));
    }
  }, []);

  return (
    <div className="absolute flex h-full w-full flex-col ">
      <div className="bg-white px-4 py-2 font-semibold text-bluey">
        {(typeOfView === 'METEOROLOGICAL') ? 'Variables Meteorologicas' : 'Variables Ambientales'}
      </div>

      <ul className="flex list-none flex-col overflow-auto p-5">
        {variables.map((variable) =>
          (
            <VariableItem
              key={variable.variable_name}
              nodeLocation={nodeLocation}
              variable={variable}
            />
          ))}
      </ul>
    </div>
  );
};

export default VariableView;
