import { React, useState } from 'react';

import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({
  preGlobalFilteredRows, globalFilter, setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((v) => {
    setGlobalFilter(v || undefined);
  }, 200);

  return (
    <span className="flex grow items-center text-gray-700">
      Buscar:
      <input
        type="text"
        className="ml-1 w-full rounded-lg border-gray-300 py-0.5"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={(count === 1) ? `${count} registro...` : `${count} registros...`}
      />
    </span>
  );
};

export default GlobalFilter;
