import { React, useState, useEffect } from 'react';
import nodeService from 'src/services/nodes';
import VariableItem from './VariableItem';

const VariableWidget = ({ type, selectedNode }) => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    if (selectedNode) {
      nodeService
        .getVariables(selectedNode)
        .then((requestedVariables) => {
          setVariables(requestedVariables.filter((variable) => variable.variable_type === type));
        });
    }
  }, []);

  return (
    <div className="absolute flex h-full w-full flex-col rounded-xl bg-white shadow">

      {/* title */}
      <div className="rounded-t-xl border-b bg-slate-100 p-4 font-medium text-slate-400">
        {type === 'METEOROLOGICAL' ? 'Variables Meteorologicas' : 'Variables Ambientales'}
      </div>

      {/* variables */}
      <ul className="flex list-none flex-col overflow-auto">
        {
          variables.map((variable) => (
            <VariableItem
              key={variable.variable_name}
              node={selectedNode}
              variable={variable}
            />
          ))
        }
      </ul>

    </div>
  );
};

export default VariableWidget;
