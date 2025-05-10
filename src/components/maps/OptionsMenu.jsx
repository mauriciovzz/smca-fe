import { React, useState } from 'react';

import { layersIcon } from 'src/assets';
import { Divider, Label } from 'src/components/ui';
import colorHelper from 'src/utils/colorHelper';

const icaOptions = [
  {
    name: 'todas',
    cols: 'col-span-2',
  },
  {
    name: 'pm2.5',
    cols: 'col-span-1',
  },
  {
    name: 'pm10',
    cols: 'col-span-1',
  },
  {
    name: 'o3',
    cols: 'col-span-1',
  },
  {
    name: 'no2',
    cols: 'col-span-1',
  },
  {
    name: 'so2',
    cols: 'col-span-1',
  },
  {
    name: 'co',
    cols: 'col-span-1',
  },
];

const concentrationOptions = [
  {
    name: 'pm2.5',
    cols: 'col-span-1',
    unit: 'μg/m3',
  },
  {
    name: 'pm10',
    cols: 'col-span-1',
    unit: 'μg/m3',
  },
  {
    name: 'o3',
    cols: 'col-span-1',
    unit: 'ppm',
  },
  {
    name: 'no2',
    cols: 'col-span-1',
    unit: 'ppb',
  },
  {
    name: 'so2',
    cols: 'col-span-1',
    unit: 'ppb',
  },
  {
    name: 'co',
    cols: 'col-span-1',
    unit: 'ppm',
  },
];

const meteorologyOptions = [
  {
    name: 'temperatura',
    cols: 'col-span-2',
  },
  {
    name: 'humedad',
    cols: 'col-span-2',
  },
  {
    name: 'presión',
    cols: 'col-span-2',
  },
  {
    name: 'precipitación',
    cols: 'col-span-2',
  },
  {
    name: 'radiación solar',
    cols: 'col-span-2',
  },
];

const nodeTypesOptions = [
  {
    name: 'todos',
    cols: 'col-span-2',
  },
  {
    name: 'indoor',
    cols: 'col-span-1',
  },
  {
    name: 'outdoor',
    cols: 'col-span-1',
  },
];

const LegendItem = ({ color, upperText, lowerText }) => {
  const { bgColor, borderColor } = colorHelper.getCircleColor(color);

  return (
    <div className="flex h-fit w-full items-center">
      <div className={`${bgColor} ${borderColor} size-[28px] shrink-0 grow-0 rounded-full border-2`} />
      <div className="pl-2.5 text-xs">
        <div className="font-normal">{upperText}</div>
        <div className="font-extralight">{lowerText}</div>
      </div>
    </div>
  );
};

const OptionButton = ({
  cols, name, selectedOption, setSelectedOption,
}) => (
  <button
    type="button"
    className={`${selectedOption === name ? 'bg-graydetails' : 'hover:bg-graydetails'}
                ${cols}
                cursor-pointer rounded-lg border text-center text-sm`}
    onClick={() => setSelectedOption(name)}
  >
    {name}
  </button>
);

const AqiLegend = ({ setIsLegendOpen }) => (
  <div className="flex h-[371px] flex-col">
    <div className="flex h-[324px] flex-col">
      <Label text="Indice de calidad aire" />
      <div className="grid h-full grid-cols-1 content-between">
        <LegendItem color="aqi1" upperText="Bueno" lowerText="(0-50)" />
        <LegendItem color="aqi2" upperText="Moderado" lowerText="(51-100)" />
        <LegendItem color="aqi3" upperText="Dañino para grupos sensibles (101-150)" lowerText="" />
        <LegendItem color="aqi4" upperText="Dañino" lowerText="(151-200)" />
        <LegendItem color="aqi5" upperText="Muy dañino" lowerText="(201-300)" />
        <LegendItem color="aqi6" upperText="Peligroso" lowerText="(301-500)" />
        <LegendItem color="black" upperText="Sin datos" />
      </div>
    </div>

    <Divider changePadding="p-1.5" />
    <button
      type="button"
      className="cursor-pointer rounded-lg border text-center text-sm hover:bg-graydetails"
      onClick={() => setIsLegendOpen(false)}
    >
      Regresar
    </button>
  </div>
);

const ConcentrationsLegend = ({ setIsLegendOpen, selectedVariable }) => (
  <div className="flex h-[371px] flex-col">
    <div className="flex h-[324px] flex-col">
      <Label text="Nodos" />
      <div className="grid h-[77px] grid-cols-1 content-around">
        <LegendItem color="main" upperText="Con datos" />
        <LegendItem color="black" upperText="Sin datos" />
      </div>

      <Divider changePadding="p-1.5" />
      <div className="flex grow flex-col">
        <Label text="Unidades" />
        <table className="h-full">
          {concentrationOptions.map((c, i) => (
            <tr className={`${(i + 1) !== concentrationOptions.length && 'border-b'}
                            ${selectedVariable === c.name ? 'font-bold' : 'font-medium'}`}
            >
              <td className="text-sm">
                {c.name}
              </td>
              <td className="text-xs">{c.unit}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>

    <Divider changePadding="p-1.5" />
    <button
      type="button"
      className="cursor-pointer rounded-lg border text-center text-sm hover:bg-graydetails"
      onClick={() => setIsLegendOpen(false)}
    >
      Regresar
    </button>
  </div>
);

const MeteorologyLegend = ({ setIsLegendOpen }) => (
  <div className="flex h-[371px] flex-col">

    <div className="flex h-[91px] flex-col">
      <Label text="Nodos" />
      <div className="grid h-full grid-cols-1 content-between">
        <LegendItem color="main" upperText="Con datos" />
        <LegendItem color="black" upperText="Sin datos" />
      </div>
    </div>

    <Divider changePadding="p-1.5" />

    <div className="flex grow flex-col">
      <Label text="Indice UV" />
      <div className="grid h-full grid-cols-1 content-between">
        <LegendItem color="uvi1" upperText="Bajo (0-2)" />
        <LegendItem color="uvi2" upperText="Moderado (3-5)" />
        <LegendItem color="uvi3" upperText="Alto (6-7)" />
        <LegendItem color="uvi4" upperText="Muy alto (8-10)" />
        <LegendItem color="uvi5" upperText="Extremo (11+)" />
      </div>
    </div>

    <Divider changePadding="p-1.5" />
    <button
      type="button"
      className="cursor-pointer rounded-lg border text-center text-sm hover:bg-graydetails"
      onClick={() => setIsLegendOpen(false)}
    >
      Regresar
    </button>
  </div>
);

const OptionsMenu = ({
  viewType, setViewType,
  selectedVariable, setSelectedVariable,
  selectedNodeTypes, setSelectedNodeTypes,
}) => {
  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const getOptionsArray = () => {
    switch (viewType) {
      case 'Concentraciones':
        return concentrationOptions;
      case 'Meteorología':
        return meteorologyOptions;
      default:
        return icaOptions;
    }
  };

  const handleSelection = (event) => {
    switch (event.target.value) {
      case 'Concentraciones':
        setSelectedVariable('pm2.5');
        break;
      case 'Meteorología':
        setSelectedVariable('temperatura');
        break;
      default:
        setSelectedVariable('todas');
    }

    setViewType(event.target.value);
  };

  const renderMenu = () => {
    if (isLegendOpen) {
      switch (viewType) {
        case 'Concentraciones':
          return (
            <ConcentrationsLegend
              setIsLegendOpen={setIsLegendOpen}
              selectedVariable={selectedVariable}
            />
          );
        case 'Meteorología':
          return <MeteorologyLegend setIsLegendOpen={setIsLegendOpen} />;
        default:
          return <AqiLegend setIsLegendOpen={setIsLegendOpen} />;
      }
    }

    return (
      <div className="flex h-[371px] flex-col">
        <div className="flex h-fit w-full flex-col">
          <Label text="Vista" />
          <select
            name="viewType"
            id="viewType"
            value={viewType}
            onChange={handleSelection}
            className="h-[34px] w-full rounded-lg border border-gray-300 px-2 py-0.5 text-sm focus:border-main focus:ring-1 focus:ring-main"
          >
            <option value="ICA">ICA</option>
            <option value="Concentraciones">Concentraciones</option>
            <option value="Meteorología">Meteorología</option>
          </select>
        </div>

        <Divider changePadding="p-1.5" />
        <div className="flex h-fit w-full flex-col">
          <Label text="Variables" />
          <div className="grid grid-cols-2 grid-rows-5  gap-1">
            {getOptionsArray().map((v) => (
              <OptionButton
                key={v.name}
                cols={v.cols}
                name={v.name}
                selectedOption={selectedVariable}
                setSelectedOption={setSelectedVariable}
              />
            ))}
          </div>
        </div>

        <Divider changePadding="p-1.5" />
        <div className="flex h-fit w-full flex-col">
          <Label text="Tipos de Nodos" />
          <div className="grid grid-cols-2 gap-1">
            {nodeTypesOptions.map((v) => (
              <OptionButton
                key={v.name}
                cols={v.cols}
                name={v.name}
                selectedOption={selectedNodeTypes}
                setSelectedOption={setSelectedNodeTypes}
              />
            ))}
          </div>
        </div>

        <Divider changePadding="p-1.5" />
        <button
          type="button"
          className="cursor-pointer rounded-lg border text-center text-sm hover:bg-graydetails"
          onClick={() => setIsLegendOpen(true)}
        >
          Leyenda
        </button>
      </div>
    );
  };

  return (isOptionsMenuOpen)
    ? (
      <div className="absolute bottom-0 right-0 z-[1000] m-5 h-[505] w-1/2 sm:w-[200px]">
        <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow sm:h-[505] sm:w-[200px]">
          {renderMenu()}

          <Divider changePadding="p-1.5" />
          <button
            type="button"
            className="cursor-pointer rounded-lg border text-center text-sm shadow hover:bg-graydetails"
            onClick={() => setOptionsMenuOpen(false)}
          >
            Cerrar Menu
          </button>
          <div />
        </div>
      </div>
    )
    : (
      <button
        type="button"
        className="absolute bottom-0 right-0 z-[1000] m-5 flex size-[50px] cursor-pointer items-center justify-center rounded-lg bg-white shadow hover:bg-graydetails"
        onClick={() => setOptionsMenuOpen(true)}
      >
        <img
          src={layersIcon}
          alt="layers menu button"
          className="size-[25px]"
        />
      </button>
    );
};

export default OptionsMenu;
