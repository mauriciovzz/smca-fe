import { React, useState } from 'react';
import TableWithSwitch from './TableWithSwitch';
import ComponentCreation from 'src/pages/Components/ComponentCreation';

const SensorSelection = ({
  componentList, newNode, setNewNode, updateComponentList,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex grow flex-col divide-y">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
        Selecionar Sensores
      </h1>

      <TableWithSwitch
        title="Lista de sensores"
        hasSwitch={false}
        hasVariables
        componentList={componentList}
        componentType="SENSOR"
        selectedComponents={newNode.sensors}
        handleSelection={
          (componentId, variableId) => {
            const foundComponent = newNode.sensors.length
              ? newNode.sensors
                .map((e) => e.component)
                .includes(componentId)
              : false;
            const hasVariable = foundComponent
              ? newNode.sensors
                .find((e) => e.component === componentId)
                .variables.includes(variableId)
              : false;
            if (foundComponent && hasVariable) {
              setNewNode({
                ...newNode,
                sensors: newNode.sensors.map((e) => {
                  if (e.component === componentId) {
                    if (e.variables.length === 1) return null;
                    return {
                      component: e.component,
                      variables: e.variables.toSpliced(e.variables.indexOf(variableId), 1),
                    };
                  }
                  return e;
                })
                  .filter((e) => e !== null),
              });
            } else {
              setNewNode({
                ...newNode,
                sensors: newNode.sensors.toSpliced(
                  foundComponent
                    ? newNode.sensors.map((e) => e.element).indexOf(componentId)
                    : newNode.sensors.length,
                  1,
                  {
                    component: componentId,
                    variables: foundComponent
                      ? newNode.sensors
                        .find((e) => e.component === componentId)
                        .variables.concat(variableId)
                      : [variableId],
                  },
                ),
              });
            }
          }
        }
        onButtonClick={() => setIsOpen(!isOpen)}
      />

      {
        isOpen && (
          <ComponentCreation
            setIsOpen={setIsOpen}
            componentType="SENSOR"
            updateComponentList={updateComponentList}
          />
        )
      }
    </div>
  );
};

export default SensorSelection;
