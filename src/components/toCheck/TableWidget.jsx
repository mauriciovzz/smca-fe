import React from 'react';

const TableWidget = ({
  title, headers, rows,
  buttonText, onTableButtonClick,
}) => (
  <div className="flex h-full w-full flex-col space-y-2.5 overflow-hidden rounded-lg bg-white p-5 shadow">

    <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
      {title}
    </h1>

    <div className="relative h-full w-full">

      {/* desktop */}
      <div className="small-scrollbar absolute hidden h-full w-full overflow-y-auto rounded-xl bg-slate-100 shadow sm:flex">
        <table className="h-fit w-full text-sm">
          <thead className="sticky top-0 bg-slate-100 text-left font-medium text-slate-400">
            <tr>
              {
                headers.map((header) => <th key={header} className="p-4">{header}</th>)
              }
            </tr>
            <tr>
              <th colSpan={headers.length} className="h-[1px] bg-slate-200 p-0"> </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {
              rows && rows.data.map((row) => (
                <tr
                  key={row.key}
                  className="border-b border-slate-100 text-slate-500 hover:cursor-pointer hover:bg-slate-200"
                  onClick={row.onClick}
                >
                  {
                    row.rowData.map((data, index) => <td key={data} className={`${rows.style[index]} p-4`}>{data}</td>)
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* mobile */}
      <div className="small-scrollbar absolute flex h-full w-full overflow-y-auto rounded-xl bg-white shadow sm:hidden">
        <table className="h-full w-full overflow-y-auto text-xs">
          {
            rows
            && rows.data.map((row) => (
              <tbody
                key={row.key}
                className="divide-y-[1px] divide-slate-100 border-slate-500 text-slate-500 hover:divide-slate-200 hover:bg-slate-200"
                onClick={row.onClick}
              >
                {
                  headers.map((header, index) => (
                    <tr key={header + row.rowData[index]}>
                      <th className={`${(index === 0) && 'bg-slate-100'} p-2`}>{header}</th>
                      <td className={`${(index === 0) && 'bg-slate-100'} ${rows.style[index]} w-full p-2`}>{row.rowData[index]}</td>
                    </tr>
                  ))
                }
              </tbody>
            ))
            }
        </table>
      </div>
    </div>

    <button
      type="button"
      className="flex h-[8%] items-center justify-center rounded-lg bg-sky-600 text-sm font-medium text-white shadow hover:bg-sky-700 sm:text-base"
      onClick={onTableButtonClick}
    >
      {buttonText}
    </button>
  </div>
);

export default TableWidget;
