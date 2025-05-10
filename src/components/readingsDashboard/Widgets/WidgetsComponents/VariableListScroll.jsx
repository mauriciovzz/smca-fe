import { React, useRef, useEffect } from 'react';

import { arrowIcon } from 'src/assets';

const Divider = () => <div className="ml-2 border-l" />;

const VariableListScroll = ({
  type, dateReadings, selectedVariable, setSelectedVariable,
}) => {
  // data variables
  const reorderVariables = () => {
    const priorityVariables = (type === 'meteorological')
      ? ['precipitación', 'radiación solar', 'temperatura', 'humedad', 'presión']
      : ['pm2.5', 'pm10', 'o2', 'no2', 'so2', 'co'];

    const result = [];

    for (let i = 0; i < priorityVariables.length; i += 1) {
      const match = dateReadings.find((v) => v.variable_name === priorityVariables[i]);

      if (match) {
        result.push(match);
      }
    }

    if (type === 'environmental') {
      for (let i = 0; i < dateReadings.length; i += 1) {
        if (!priorityVariables.includes(dateReadings[i].variable_name))
          result.push(dateReadings[i]);
      }
    }

    return result;
  };

  const list = reorderVariables(dateReadings);

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
    () => () => cancelAnimationFrame(animationRef.current), // Cleanup on unmount
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
        <div className="flex items-center">
          <button
            className={`${(selectedVariable === 'Resumen') ? 'bg-graydetails' : 'hover:bg-graydetails'} whitespace-nowrap rounded-lg px-2 py-1`}
            type="button"
            onClick={() => setSelectedVariable('Resumen')}
          >
            Resumen
          </button>
        </div>

        {(type === 'environmental')
          && (dateReadings.map((v) => v.variable_name).some((v) => ['pm2.5', 'pm10', 'o2', 'no2', 'so2', 'co'].includes(v)))
          && (
          <>
            <Divider />

            <div className="flex items-center">
              <button
                className={`${(selectedVariable === 'ICA') ? 'bg-graydetails' : 'hover:bg-graydetails'} ml-2 whitespace-nowrap rounded-lg px-2 py-1`}
                type="button"
                onClick={() => setSelectedVariable('ICA')}
              >
                ICA
              </button>
            </div>
          </>
          )}

        {list.map(
          (v) => (
            <div
              key={v.variable_id}
              className="flex"
            >
              <Divider />

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

export default VariableListScroll;
