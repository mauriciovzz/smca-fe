import { React } from 'react';

import Select, { components } from 'react-select';

const Menu = (props) => {
  const { children, selectProps } = props;

  return (
    <components.Menu {...props}>
      <div
        className="border-x-[1px]"
      >
        {children}
      </div>
      <button
        type="button"
        className="flex h-[10px] w-full items-center justify-center border bg-white p-4 text-sm font-medium text-sky-600"
        onClick={selectProps.onButtonClick}
        onTouchStart={selectProps.onButtonClick}
      >
        {selectProps.buttonText}
      </button>
    </components.Menu>
  );
};

const ValueContainer = ({ children, getValue, ...props }) => {
  const values = getValue();
  const valueLabel = (values.length === 1) ? '1 variable selecionada' : `${values.length} variables selecionadas`;

  return (
    <components.ValueContainer {...props}>
      {!props.selectProps.inputValue && valueLabel }
    </components.ValueContainer>
  );
};

const VariablesSelect = ({
  variableList, value, onChange, isDisabled, onButtonClick,
}) => (
  <Select
    options={[
      {
        label: 'Variables Meteorologicas',
        options: variableList
          .filter((e) => e.variable_type === 'MET')
          .map((e) => ({ value: e, label: e.variable_name })),
      },
      {
        label: 'Variables Ambientales',
        options: variableList
          .filter((e) => e.variable_type === 'ENV')
          .map((e) => ({ value: e, label: e.variable_name })),
      },
    ]}
    isMulti
    value={value}
    onChange={onChange}
    isSearchable={false}
    isClearable={false}
    hideSelectedOptions={false}
    // true when trying
    closeMenuOnSelect={false}
    isOptionDisabled={() => isDisabled}
    maxMenuHeight={150}
    styles={{
      control: (baseStyles) => ({
        ...baseStyles,
        'border-radius': '0.5rem',
      }),
      menuList: (baseStyles) => ({
        ...baseStyles,
        background: 'white',
      }),
    }}
    components={{ Menu, ValueContainer }}
    buttonText="Agregar variable"
    onButtonClick={onButtonClick}
  />
);

export default VariablesSelect;
