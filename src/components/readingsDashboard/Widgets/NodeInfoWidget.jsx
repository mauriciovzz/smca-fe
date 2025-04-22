import {
  React, useState, useRef, useEffect,
} from 'react';

import { arrowIcon, componentIcon, nodeIcon } from 'src/assets';
import { Badge, ComponentLabel, Divider } from 'src/components/ui';

const getTextWidth = (text) => {
  const textSpan = document.createElement('span');
  document.body.appendChild(textSpan);

  textSpan.style.font = 'sans-serif';
  textSpan.style.fontSize = `${16}px`;
  textSpan.style.fontWeight = '500';
  textSpan.style.height = 'auto';
  textSpan.style.width = 'auto';
  textSpan.style.position = 'absolute';
  textSpan.style.whiteSpace = 'no-wrap';
  textSpan.innerHTML = text;

  const width = Math.ceil(textSpan.clientWidth);

  document.body.removeChild(textSpan);

  return width;
};

const ComponentItem = ({ component }) => {
  const calculateColumns = () => `grid-cols-${Math.ceil(component.variables.length / 3)}`;

  const calculateWidth = () => {
    const variableWidth = component.variables.reduce(
      (biggest, currentVariable) => {
        const currentVariableWidth = getTextWidth(currentVariable.name);
        return biggest > currentVariableWidth ? biggest : currentVariableWidth;
      },
      -1,
    );

    const columns = Math.ceil(component.variables.length / 3);

    return { width: 32 + 12 * (columns - 1) + ((variableWidth) * columns) };
  };

  return (
    <a
      href={component.datasheet_link}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex h-full rounded-lg border p-2 hover:bg-slate-100"
    >
      <div className={`flex h-full flex-col justify-center ${component.type === 'sensor' && 'border-r pr-2'}`}>
        <ComponentLabel component={component} />

        <div className="w-full text-left ">
          {component.name}
        </div>
      </div>

      {(component.variables.length !== 0) && (
        <div
          className={`${calculateColumns()} grid grid-rows-3 gap-1.5 pl-2 text-sm font-medium`}
          style={calculateWidth()}
        >
          {(component.variables.map((v) => (
            <div
              key={component.component_id + v.variable_id}
              className="flex items-center justify-center rounded border bg-white group-hover:bg-slate-100"
            >
              <div>{v.name}</div>
            </div>
          )))}
        </div>
      )}
    </a>
  );
};

const NodeInformationWidget = ({ selectedNode, nodeComponents, setIsModOpen }) => {
  const [infoView, setInfoView] = useState(null);

  const parseDate = () => {
    const startDate = new Date(selectedNode.start_time_stamp);

    return `${(`0${startDate.getDate()}`).slice(-2)}-${(`0${startDate.getMonth() + 1}`).slice(-2)}-${(`0${startDate.getFullYear()}`).slice(-2)}`;
  };

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

  const renderInfoView = () => {
    switch (infoView) {
      case 'componentsInfo':
        return (
          <div className="relative flex size-full">
            <div className="absolute flex size-full">
              <div
                className="mr-2 hidden w-[31px] justify-center rounded-lg hover:bg-graydetails sm:flex"
                onMouseEnter={() => startScroll('left')}
                onMouseLeave={stopScroll}
              >
                <img
                  src={arrowIcon}
                  alt="left var list scroll"
                  className=" size-[20px] self-center"
                />
              </div>

              <div ref={scrollRef} className="flex size-full space-x-2 overflow-auto scroll-smooth whitespace-nowrap pb-2 sm:hide-scrollbar sm:pb-0">
                {nodeComponents.filter((c) => c.type === 'board').map((c) => <ComponentItem component={c} key={`${c.component_id}`} />)}
                {nodeComponents.filter((c) => c.type === 'sensor').map((c) => <ComponentItem component={c} key={`${c.component_id}`} />)}
                {nodeComponents.filter((c) => c.type === 'rain_detector').map((c) => <ComponentItem component={c} key={`${c.component_id}`} />)}
                {nodeComponents.filter((c) => c.type === 'camera').map((c) => <ComponentItem component={c} key={`${c.component_id}`} />)}
                {nodeComponents.filter((c) => c.type === 'other').map((c) => <ComponentItem component={c} key={`${c.component_id}`} />)}
              </div>

              <div
                className="ml-2 hidden w-[31px] justify-center rounded-lg hover:bg-graydetails sm:flex"
                onMouseEnter={() => startScroll('right')}
                onMouseLeave={stopScroll}
              >
                <img
                  src={arrowIcon}
                  alt="right var list scroll"
                  className="hidden size-[20px] rotate-180 self-center sm:flex"
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex size-full flex-col">
            <div className="flex size-full flex-col">
              <div className="font-semibold leading-none">
                {selectedNode.location_name}
              </div>

              <div className="text-sm leading-none">
                {selectedNode.location}
              </div>
            </div>

            <Divider changePadding="p-1" />

            <div className="grid h-fit w-full grid-cols-2 gap-2 sm:flex sm:grid-cols-none">
              <Badge value={selectedNode.is_visible ? 'public' : 'private'} width="w-full" rounded="rounded-lg" />
              <Badge value={selectedNode.is_indoor ? 'indoor' : 'outdoor'} width="w-full" rounded="rounded-lg" />
              <Badge value={selectedNode.is_active ? 'active' : 'inactive'} width="w-full" rounded="rounded-lg" />
              <div className="flex h-[24px] w-full items-center justify-center rounded-lg bg-slate-500">
                <div className="text-xs font-semibold text-white">{parseDate()}</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex size-full flex-col rounded-xl bg-white p-5 shadow sm:flex-row">
      <div className="flex gap-1 border-b pb-2 sm:flex-col sm:justify-evenly sm:border-b-0 sm:border-r sm:pb-0 sm:pr-5">
        <button
          type="button"
          className="flex h-[36px] w-1/3 items-center justify-center rounded-lg hover:bg-graydetails sm:size-[36px]"
          onClick={() => setIsModOpen(false)}
        >
          <img
            src={arrowIcon}
            alt="go back button"
            className="size-[28px]"
          />
        </button>

        <button
          type="button"
          className={`
            ${(infoView === null) && 'bg-graydetails'} 
            flex h-[36px] w-1/3 items-center justify-center rounded-lg hover:bg-graydetails sm:size-[36px]
          `}
          onClick={() => setInfoView(null)}
        >
          <img
            src={nodeIcon}
            alt="node info button"
            className="size-[28px]"
          />
        </button>

        <button
          type="button"
          className={`
            ${(infoView === 'componentsInfo') && 'bg-graydetails'} 
            flex h-[36px] w-1/3 items-center justify-center rounded-lg hover:bg-graydetails sm:size-[36px]
          `}
          onClick={() => setInfoView('componentsInfo')}
        >
          <img
            src={componentIcon}
            alt="components info button"
            className="size-[28px]"
          />
        </button>
      </div>

      <div className="flex size-full flex-col pt-2 sm:pl-5 sm:pt-0">
        <div className="w-full text-left text-3xl">
          {selectedNode.node_name}
        </div>

        <Divider changePadding="p-1" />

        <div className="flex size-full items-center justify-center">
          {renderInfoView()}
        </div>
      </div>
    </div>
  );
};

export default NodeInformationWidget;
