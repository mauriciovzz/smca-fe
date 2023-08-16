import { useState, useEffect } from "react";
import variableService from "../services/variables";
import VariableItem from "./VariableItem";

const VariableView = ({ typeOfView, node }) => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    variableService
      .getAll(node)
      .then((requestedVariables) =>
        setVariables(requestedVariables));
  }, []);

  return (
    <div className="absolute flex h-full w-full flex-col ">
      <div className="bg-white px-4 py-2 font-semibold text-bluey">
        {typeOfView ? "Variables Meteorologicas" : "Variables Ambientales"}
      </div>

      <ul className="flex list-none flex-col overflow-auto p-5">
        {variables.map((variable) => (
          <VariableItem
            key={node.type + node.id + variable.id}
            node={node}
            variable={variable}
          />
        ))}
      </ul>
    </div>
  );
};

export default VariableView;
