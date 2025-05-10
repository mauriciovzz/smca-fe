import { React } from 'react';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Label from '../ui/Label';

const DateRangeInput = ({ dateRange, setDateRange, startLimit }) => (
  <div className="flex w-full flex-col">
    <Label text="Rango de fechas" />
    <DateRangePicker
      onChange={setDateRange}
      value={dateRange}
      clearIcon={null}
      format="dd/MM/y"
      minDate={startLimit}
      maxDate={new Date()}
      locale="es-VE"
      showLeadingZeros
    />
  </div>
);

export default DateRangeInput;
