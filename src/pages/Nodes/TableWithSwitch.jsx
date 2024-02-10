import { React, useState } from 'react';
import Switch from 'react-switch';

const TableWithSwitch = ({
  title, hasSwitch, hasVariables, componentList,
  componentType, selectedComponents, handleSelection,
  closeSwitch, onButtonClick,
}) => {
  const [checked, setChecked] = useState(false);

  const handleSwitch = (nextChecked) => {
    if (!nextChecked) closeSwitch();
    setChecked(nextChecked);
  };

  const getButtonText = () => {
    switch (componentType) {
      case 'SENSOR':
        return 'sensor';
      case 'OTHER':
        return 'otro componente';
      default:
        return '';
    }
  };

  return (
    <div className="flex h-full flex-col py-2">

      <div className="flex items-center justify-between pb-1">
        <h2 className="text-lg leading-tight tracking-tight text-gray-900 sm:text-xl">
          {title}
        </h2>

        {
          hasSwitch && (
            <Switch
              checked={checked}
              onChange={(nextChecked) => handleSwitch(nextChecked)}
              onColor="#0284c7"
              handleDiameter={16}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={40}
            />
          )
        }
      </div>

      {
        (hasSwitch ? checked : true) && (
          hasVariables
            ? (
              <div className="small-scrollbar relative flex grow overflow-y-auto rounded-t-lg border bg-white">
                <table className="absolute w-full bg-white text-sm">
                  {
                    componentList
                    && componentList
                      .filter((comp) => comp.component_type === componentType)
                      .map((comp) => (
                        <tbody
                          key={comp.component_id}
                        >
                          <tr>
                            <th className={`${selectedComponents.map((e) => e.component).includes(comp.component_id) && 'bg-red-500'} px-4`}>
                              {comp.component_name}
                            </th>
                          </tr>
                          {
                            (
                              comp.component_variables.map((vari) => (
                                <tr
                                  className="w-full hover:cursor-pointer"
                                  key={`${comp.component_id}-${vari.variable_id}`}
                                  onClick={
                                    () => handleSelection(comp.component_id, vari.variable_id)
                                  }
                                >
                                  <td
                                    className={`${selectedComponents.map((e) => e.component).includes(comp.component_id) && selectedComponents.find((e) => e.component === comp.component_id).variables.includes(vari.variable_id) && 'bg-red-500'} px-8`}
                                  >
                                    {vari.variable_name}
                                  </td>
                                </tr>
                              ))
                            )
                          }
                        </tbody>
                      ))
                  }
                </table>
              </div>
            )
            : (
              <div className="small-scrollbar relative flex grow overflow-y-auto rounded-t-lg border bg-white">
                <table className="absolute w-full bg-white text-sm">
                  {
                    componentList
                    && componentList
                      .filter((comp) => comp.component_type === componentType)
                      .map((comp) => (
                        <tbody key={comp.component_id}>
                          <tr>
                            <th
                              className={`${selectedComponents.includes(comp.component_id) ? 'bg-red-500' : 'bg-white'} px-4`}
                              onClick={() => handleSelection(comp.component_id)}
                            >
                              {comp.component_name}
                            </th>
                          </tr>
                        </tbody>
                      ))
                  }
                </table>
              </div>
            )
        )
      }

      {
        (hasSwitch ? checked : true) && (
          <button
            type="button"
            className="flex h-[10px] w-full items-center justify-center rounded-b-lg border-x border-b bg-white p-4 text-sm font-medium text-sky-600"
            onClick={onButtonClick}
            onTouchStart={onButtonClick}
          >
            {`Agregar ${getButtonText()}`}
          </button>
        )
      }

    </div>
  );
};

export default TableWithSwitch;
