import { React } from 'react';

import { useTable, useGlobalFilter, useFilters } from 'react-table';

import GlobalFilter from './GlobalFilter';

const Table = ({ columns, data, onRowClick }) => {
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
    state, preGlobalFilteredRows, setGlobalFilter,
  } = useTable({ columns, data, autoResetFilters: false }, useGlobalFilter, useFilters);

  return (
    <div className="flex grow flex-col gap-2.5 pb-2.5">
      <div className="flex gap-x-2.5">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        {
          headerGroups.map((headerGroup) => (
            headerGroup.headers.map((column) => (
              column.Filter ? (
                <div key={column.id} className="flex items-center">
                  <label htmlFor={column.id}>
                    {column.render('Header')}
                    :
                  </label>
                  {column.render('Filter')}
                </div>
              ) : null
            ))))
        }
      </div>

      <div className="relative h-full w-full">
        <div className="small-scrollbar absolute hidden h-full w-full overflow-y-scroll rounded-lg bg-slate-100 shadow sm:flex">
          <table {...getTableProps()} className="h-fit w-full table-fixed text-sm">
            <thead className="bg-slate-100 text-left text-slate-400">
              {
                headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} className="p-4">{column.render('Header')}</th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>

            <tbody {...getTableBodyProps()} className="divide-y-[1px] divide-slate-100 bg-white">
              {
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="text-slate-500 hover:cursor-pointer hover:bg-slate-200"
                      onClick={() => onRowClick(row.original)}
                    >
                      {
                        row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="p-4">{cell.render('Cell')}</td>
                        ))
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default Table;
