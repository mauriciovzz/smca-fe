import { React, useState } from 'react';
import SelectWithSwitch from './SelectWithSwitch';
import ComponentCreation from 'src/pages/Components/ComponentCreation';

const BoardSelection = ({
  componentList, newNode, setNewNode, updateComponentList,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex grow flex-col divide-y">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
        Selecionar Placas
      </h1>

      <SelectWithSwitch
        title="Principal"
        hasSwitch={false}
        componentList={componentList}
        componentType="BOARD"
        handleSelection={(selectedId) => (
          setNewNode({
            ...newNode,
            boards: { ...newNode.boards, primary: selectedId },
          })
        )}
        onButtonClick={() => setIsOpen(!isOpen)}
      />

      <SelectWithSwitch
        title="Secundaria"
        hasSwitch
        componentList={componentList}
        componentType="BOARD"
        handleSelection={(selectedId) => (
          setNewNode({
            ...newNode,
            boards: { ...newNode.boards, secondary: selectedId },
          })
        )}
        closeSwitch={() => {
          const newObject = newNode;
          newObject.boards.secondary = null;
          setNewNode(newObject);
        }}
        onButtonClick={() => setIsOpen(!isOpen)}
      />

      {
        isOpen && (
          <ComponentCreation
            setIsOpen={setIsOpen}
            componentType="BOARD"
            updateComponentList={updateComponentList}
          />
        )
      }
    </div>
  );
};

export default BoardSelection;
