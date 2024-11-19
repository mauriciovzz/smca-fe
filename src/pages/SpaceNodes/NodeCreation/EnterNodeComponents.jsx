import { React, useState } from 'react';

import {
  AddNewItemButton, SelectionBar, ComponentSelectionItem, VariableSelectionItem,
} from 'src/components/inputs';
import ComponentCreation from 'src/pages/SpaceComponents/ComponentCreation';

const EnterNodeComponents = ({
  text, color,
  spaceComponentsData, spaceVariablesData,
  selectedComponents, selectComponent,
  isSensorSelector,
  previousPage, nextPage,
}) => {
  const [isComCreOpen, setIsComCreOpen] = useState(false);

  return (
    <div className="flex size-full flex-col gap-2.5 bg-white sm:gap-5">
      <SelectionBar
        text={text}
        leftAction={previousPage}
        rightAction={nextPage}
      />

      <div className="relative flex size-full flex-col">
        <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">

          {
            (!isSensorSelector)
              ? (spaceComponentsData.map((component) => (
                <ComponentSelectionItem
                  key={`${component.component_id}`}
                  component={component}
                  selectedComponents={selectedComponents}
                  onClick={selectComponent}
                  color={color}
                />
              )))
              : (spaceComponentsData.map((component) => (
                <VariableSelectionItem
                  key={`${component.component_id}`}
                  component={component}
                  selectedComponents={selectedComponents}
                  onClick={selectComponent}
                  color={color}
                />
              )))
          }

          <AddNewItemButton
            text="Agregar Componente"
            onClick={() => setIsComCreOpen(true)}
          />
        </ul>
      </div>

      {isComCreOpen && (
        <div className="absolute left-0 top-0 size-full">
          <ComponentCreation
            onClose={() => setIsComCreOpen(false)}
            sideLoadedVariables={spaceVariablesData}
          />
        </div>
      )}
    </div>
  );
};

export default EnterNodeComponents;
