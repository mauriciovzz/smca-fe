import { React, useState } from 'react';

import { Button, TextInput, DateRangeInput } from 'src/components/inputs';
import { Divider, Heading, Label } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';
import notificationHelper from 'src/utils/notificationHelper';

import Report from './Report';

const ReportsCreation = ({ selectedLocation, onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const isScreenSmall = useScreenWidth();

  const [isReportOpen, setIsReportOpen] = useState(false);

  const [selectedVariables, setSelectedVariables] = useState([]);
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(),
  ]);

  const [reportData, setReportData] = useState([]);

  const handleSelection = (variableId) => {
    setSelectedVariables((prevSelected) => {
      if (prevSelected.includes(variableId)) {
        return prevSelected.filter((id) => id !== variableId);
      }
      return [...prevSelected, variableId];
    });
  };

  const handleRequestReport = async () => {
    if (selectedVariables.length === 0) {
      notificationHelper.error('Ninguna variable seleccionada');
    } else {
      try {
        const response = await axiosPrivate.post(
          '/api/readings/generate-report',
          {
            locationId: selectedLocation.location_id,
            dateRange,
            selectedVariables,
          },
        );

        notificationHelper.success('Reporte generado');
        setReportData(response.data);
        setIsReportOpen(true);
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  return (
    <div className="relative grid size-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <Heading
            text="Crear Reporte"
            hasButton
            onButtonClick={() => onClose()}
          />

          <Divider />

          {(!isScreenSmall)
            ? (
              <div className="flex grow flex-col space-y-5 pb-5">
                <div className="flex space-x-5">
                  <div className="flex-1">
                    <TextInput
                      id="locName"
                      type="text"
                      disabled
                      labelText="Ubicación"
                      value={selectedLocation.location_name}
                    />
                  </div>
                  <div className="w-fit">
                    <DateRangeInput
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      startLimit={new Date(selectedLocation.earliest_reading_date)}
                    />
                  </div>
                </div>

                <div className="relative flex grow flex-col">
                  <Label text="Variables" />
                  <div className="relative flex grow flex-col">
                    <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
                      {selectedLocation.variables_read.map((variable) => (
                        <li
                          key={variable.variable_id}
                          className={`${selectedVariables.includes(variable.variable_id) ? 'bg-main text-white' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-2.5 shadow`}
                        >
                          <button
                            type="button"
                            onClick={() => handleSelection(variable.variable_id)}
                            className="flex h-fit w-full space-x-5 text-left"
                          >
                            <div className="flex size-full flex-col">
                              {variable.variable_name}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
            : (
              <div className="flex grow flex-col space-y-5 pb-5">
                <TextInput
                  id="locName"
                  type="text"
                  disabled
                  labelText="Ubicación"
                  value={selectedLocation.location_name}
                />
                <DateRangeInput
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  startLimit={new Date(selectedLocation.earliest_reading_date)}
                />
                <div className="relative flex grow flex-col">
                  <Label text="Variables" />
                  <div className="relative flex grow flex-col">
                    <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
                      {selectedLocation.variables_read.map((variable) => (
                        <li
                          key={variable.variable_id}
                          className={`${selectedVariables.includes(variable.variable_id) ? 'bg-main text-white' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b p-2.5 shadow`}
                        >
                          <button
                            type="button"
                            onClick={() => handleSelection(variable.variable_id)}
                            className="flex h-fit w-full space-x-5 text-left"
                          >
                            <div className="flex size-full flex-col">
                              {variable.variable_name}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
        </div>

        <Button
          text="Generar reporte"
          isTypeButton
          onClick={() => handleRequestReport()}
          color="blue"
        />
      </div>

      {(!isScreenSmall) && (
        <Report
          selectedLocation={selectedLocation}
          reportData={reportData}
          onClose={() => setReportData([])}
        />
      )}

      {(isScreenSmall) && (isReportOpen) && (
        <div className="absolute size-full">
          <Report
            selectedLocation={selectedLocation}
            reportData={reportData}
            onClose={() => setIsReportOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ReportsCreation;
