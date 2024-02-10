import { React } from 'react';

import Select from 'react-select';

const TypeSelect = ({
  options, value, onChange, isDisabled,
}) => (
  <Select
    options={options}
    value={value}
    onChange={onChange}
    isSearchable={false}
    isDisabled={isDisabled}
    styles={{
      control: (baseStyles) => ({
        ...baseStyles,
        'border-radius': '0.5rem',
      }),
    }}
  />
);

export default TypeSelect;
