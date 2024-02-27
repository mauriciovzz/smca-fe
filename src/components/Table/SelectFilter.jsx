import { React, useMemo } from 'react';

const SelectFilter = ({
  column: {
    filterValue, setFilter, preFilteredRows, id,
  },
}) => {
  const options = useMemo(() => {
    const opts = new Set();
    preFilteredRows.forEach((row) => {
      opts.add(row.values[id]);
    });
    return [...opts.values()];
  }, [id, preFilteredRows]);

  const getTypeName = (type) => {
    switch (type) {
      case 'BOARD':
        return 'Placas';
      case 'SENSOR':
        return 'Sensores';
      case 'CAMERA':
        return 'Camaras';
      case 'SCREEN':
        return 'Pantallas';
      case 'OTHER':
        return 'Otros';
      case 'MET':
        return 'Meteorológicas';
      case 'ENV':
        return 'Ambientales';
      default:
        return '';
    }
  };

  return (
    <select
      name={id}
      id={id}
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="ml-1 w-full rounded-lg border-gray-300 py-0.5"
    >
      <option value="">Todas</option>
      {
        options.map((option) => (
          <option key={option} value={option}>
            {getTypeName(option)}
          </option>
        ))
      }
    </select>
  );
};

export default SelectFilter;
