import { React, useState } from 'react';
import TableWithSwitch from './TableWithSwitch';
import SelectWithSwitch from './SelectWithSwitch';
import ComponentCreation from 'src/pages/Components/ComponentCreation';

const OtherComponentsSelection = ({
  componentList, newNode, setNewNode, updateComponentList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newComponentType, setNewComponentType] = useState('');

  return (
    <div className="relative flex grow flex-col divide-y">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
        Selecionar Componentes
      </h1>

      <SelectWithSwitch
        title="Camara"
        hasSwitch
        componentList={componentList}
        componentType="CAMERA"
        handleSelection={(selectedId) => (
          setNewNode({
            ...newNode,
            otherComponents: { ...newNode.otherComponents, camera: selectedId },
          })
        )}
        closeSwitch={() => {
          const newObject = newNode;
          newObject.otherComponents.camera = null;
          setNewNode(newObject);
        }}
        onButtonClick={() => {
          setNewComponentType('CAMERA');
          setIsOpen(!isOpen);
        }}
      />

      <SelectWithSwitch
        title="Pantalla"
        hasSwitch
        componentList={componentList}
        componentType="SCREEN"
        handleSelection={(selectedId) => (
          setNewNode({
            ...newNode,
            otherComponents: { ...newNode.otherComponents, screen: selectedId },
          })
        )}
        closeSwitch={() => {
          const newObject = newNode;
          newObject.otherComponents.screen = null;
          setNewNode(newObject);
        }}
        onButtonClick={() => {
          setNewComponentType('SCREEN');
          setIsOpen(!isOpen);
        }}
      />

      <TableWithSwitch
        title="Otros componentes"
        hasSwitch
        hasVariables={false}
        componentList={componentList}
        componentType="OTHER"
        selectedComponents={newNode.otherComponents.others}
        handleSelection={
          (componentId) => {
            if (newNode.otherComponents.others.includes(componentId)) {
              setNewNode({
                ...newNode,
                otherComponents: {
                  ...newNode.otherComponents,
                  others: newNode.otherComponents.others
                    .toSpliced(newNode.otherComponents.others.indexOf(componentId), 1),
                },
              });
            } else {
              setNewNode({
                ...newNode,
                otherComponents: {
                  ...newNode.otherComponents,
                  others: newNode.otherComponents.others
                    .concat(componentId),
                },
              });
            }
          }
        }
        closeSwitch={
          () => {
            const newObject = newNode;
            newObject.otherComponents.others = [];
            setNewNode(newObject);
          }
        }
        onButtonClick={
          () => {
            setNewComponentType('OTHER');
            setIsOpen(!isOpen);
          }
        }
      />

      {
        isOpen && (
          <ComponentCreation
            setIsOpen={setIsOpen}
            componentType={newComponentType}
            updateComponentList={updateComponentList}
          />
        )
      }
    </div>
  );
};

export default OtherComponentsSelection;
