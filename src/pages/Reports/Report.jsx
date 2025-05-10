import {
  React, useState, useRef, useEffect,
} from 'react';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { arrowIcon } from 'src/assets';
import { Button } from 'src/components/inputs';
import { Heading } from 'src/components/ui';

const ListScroll = ({ reportData, selectedVariable, setSelectedVariable }) => {
  // scroll variables
  const scrollSpeed = 3;

  const scrollRef = useRef(null);
  const scrollDirection = useRef(null);
  const animationRef = useRef(null);

  const smoothScroll = () => {
    if (scrollRef.current && scrollDirection.current) {
      scrollRef.current.scrollLeft += scrollDirection.current === 'right' ? scrollSpeed : -scrollSpeed;
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  };

  const startScroll = (direction) => {
    scrollDirection.current = direction;
    animationRef.current = requestAnimationFrame(smoothScroll);
  };

  const stopScroll = () => {
    scrollDirection.current = null;
    cancelAnimationFrame(animationRef.current);
  };

  useEffect(
    () => () => cancelAnimationFrame(animationRef.current),
    [],
  );

  return (
    <div className="flex w-full border-y py-1 text-sm">
      <div
        className="mr-1 hidden w-[31px] items-center justify-center rounded-lg hover:bg-graydetails sm:flex"
        onMouseEnter={() => startScroll('left')}
        onMouseLeave={stopScroll}
      >
        <img
          src={arrowIcon}
          alt="left var list scroll"
          className=" size-[20px]"
        />
      </div>

      <div ref={scrollRef} className="flex w-full overflow-auto scroll-smooth pb-1 sm:hide-scrollbar sm:pb-0">
        {reportData.map(
          (v) => (
            <div
              key={v.variable_id}
              className="flex"
            >
              <div className="ml-2 border-l" />

              <button
                className={`${(v.variable_name === selectedVariable) ? 'bg-graydetails' : 'hover:bg-graydetails'} ml-2 whitespace-nowrap rounded-lg px-2 py-1`}
                type="button"
                onClick={() => setSelectedVariable(v.variable_name)}
              >
                {(v.unit !== null && v.variable_name !== 'radiación solar') ? `${v.variable_name} (${v.unit})` : `${v.variable_name}`}
              </button>
            </div>
          ),
        )}
      </div>

      <div
        className="ml-1 hidden w-[31px] items-center justify-center rounded-lg hover:bg-graydetails sm:flex"
        onMouseEnter={() => startScroll('right')}
        onMouseLeave={stopScroll}
      >
        <img
          src={arrowIcon}
          alt="left var list scroll"
          className=" size-[20px] rotate-180"
        />
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
};

const formatValue = (valueType, value) => {
  if (valueType === 'presential') {
    if (value === null)
      return null;

    return value === 0 ? 'no' : 'si';
  }

  return value;
};

const ReportTable = ({ variableData }) => {
  const hourHeaders = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="small-scrollbar absolute size-full overflow-auto rounded-lg">
      <table className="w-full table-fixed rounded-lg border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="w-[105px] border bg-gray-200 px-2 py-1 text-left">Fecha / Hora</th>
            {hourHeaders.map((hour) => (
              <th key={hour} className="w-[50px] border bg-gray-100 px-2 py-1 text-center">
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variableData.data.map((row) => (
            <tr key={row.date}>
              <td className="border px-2 py-1 text-center">{formatDate(row.date)}</td>
              {row.readings.map((val, i) => (
                <td key={`${row.date}-${i + 1}`} className="border px-2 py-1 text-center">{formatValue(variableData.value_type, val)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Report = ({ selectedLocation, reportData, onClose }) => {
  const [selectedVariable, setSelectedVariable] = useState(
    (reportData.length === 0) ? null : reportData[0].variable_name,
  );

  useEffect(() => {
    setSelectedVariable((reportData.length === 0) ? null : reportData[0].variable_name);
  }, [reportData]);

  const exportToExcel = () => {
    const sanitizeFileName = (s) => `${s.replace(/[\\/*?"<>|:]/g, '').trim()}.xlsx`;

    const workbook = XLSX.utils.book_new();

    reportData.forEach((variable) => {
      const sheetData = [];

      sheetData.push([]);
      const locationRow = [`REPORTE - ${selectedLocation.location_name}: ${selectedLocation.location}`];
      sheetData.push(locationRow);

      sheetData.push([]);
      const titleRow = [`${variable.variable_name} ${(variable.unit !== null) ? `(${variable.unit})` : ''}`];
      sheetData.push(titleRow);

      sheetData.push([]);
      const headers = ['Fecha / Hora', ...Array.from({ length: 24 }, (_, i) => `${i + 1}`)];
      sheetData.push(headers);

      variable.data.forEach(({ date, readings }) => {
        sheetData.push([
          formatDate(date),
          ...readings.map((reading) => formatValue(variable.value_type, reading)),
        ]);
      });

      const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

      // Merge the variable name row across columns (2nd row: index 1)
      worksheet['!merges'] = [
        { s: { r: 1, c: 0 }, e: { r: 1, c: 24 } },
        { s: { r: 3, c: 0 }, e: { r: 3, c: 24 } },
      ];

      // Set column widths — first column fits "Fecha / Hora"
      worksheet['!cols'] = [
        { wch: 'Fecha / Hora'.length },
        ...Array(24).fill({ wch: 5 }),
      ];

      XLSX.utils.book_append_sheet(workbook, worksheet, variable.variable_name);
    });

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, sanitizeFileName(`reporte ${selectedLocation.location_name}`));
  };

  return (reportData.length !== 0)
    ? (
      <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col space-y-5 pb-5">
          <Heading
            text="Reporte"
            hasButton
            onButtonClick={() => onClose()}
          />

          <ListScroll
            reportData={reportData}
            selectedVariable={selectedVariable}
            setSelectedVariable={setSelectedVariable}
          />

          <div className="relative size-full overflow-hidden rounded-lg border">
            {(selectedVariable !== null) && (
              <ReportTable
                variableData={reportData.find((v) => v.variable_name === selectedVariable)}
              />
            )}
          </div>
        </div>

        <Button
          text="Descargar reporte"
          isTypeButton
          onClick={() => exportToExcel()}
          color="blue"
        />
      </div>
    )
    : (
      <div className="flex size-full flex-col items-center justify-center rounded-lg bg-white p-5 shadow">
        <div className="font-bold">
          Ingrese los datos solicitados
        </div>
        <div className="font-bold">
          para generar un reporte
        </div>
      </div>
    );
};

export default Report;
