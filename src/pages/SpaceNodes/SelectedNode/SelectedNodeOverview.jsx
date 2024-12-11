import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, ComponentListItem } from 'src/components/inputs';
import { LocationInformationMap } from 'src/components/maps';
import { Divider, Heading } from 'src/components/ui';
import useScreenWidth from 'src/hooks/useScreenWidth';

const InfoItem = ({ text, value, padding }) => (
  <div className={`${padding} flex w-full flex-col`}>
    <span className="text-xs font-bold">{text}</span>
    <span className="text-sm font-light">{value}</span>
  </div>
);

const SelectedNodeOverview = ({ spaceData, selectedNode, nodeComponentsData }) => {
  const isScreenSmall = useScreenWidth();
  const navigate = useNavigate();

  const [isMapOpen, setIsMapOpen] = useState(false);

  const renderMap = () => {
    if (isScreenSmall) {
      if (isMapOpen) {
        return (
          <div className="absolute size-full">
            <LocationInformationMap
              marker={selectedNode}
              markerColor={spaceData.color}
              showLocationInfo
              isScreenSmall={isScreenSmall}
              closeLocationMap={() => setIsMapOpen(false)}
            />
          </div>
        );
      }
      return null;
    }
    return (
      <LocationInformationMap
        marker={selectedNode}
        markerColor={spaceData.color}
        showLocationInfo
      />
    );
  };

  return (
    <div className="relative grid size-full grid-cols-1 grid-rows-1 gap-5 sm:grid sm:grid-cols-2 sm:grid-rows-1">
      <div className="flex size-full flex-col gap-5 rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <Heading
            text={selectedNode.node_name}
            hasButton
            onButtonClick={() => navigate('..')}
          />

          <Divider changeBottomPadding="p-1.5" />

          <div className="flex size-full flex-col">
            <div className="flex divide-x">
              <InfoItem text="TIPO" value={selectedNode.is_indoor ? 'indoor' : 'outdoor'} padding="pr-2.5" />
              <InfoItem text="ESTADO" value={selectedNode.is_active ? 'activo' : 'inactivo'} padding="px-2.5" />
              <InfoItem text="INTERVALO" value={`${selectedNode.reading_interval} min`} padding="pl-2.5" />
            </div>
            <Divider changePadding="p-1.5" />

            <div className="relative size-full">
              <ul className="small-scrollbar absolute flex size-full flex-col overflow-y-scroll rounded-lg border bg-background text-sm">
                {nodeComponentsData.filter((c) => c.type === 'board').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
                {nodeComponentsData.filter((c) => c.type === 'sensor').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
                {nodeComponentsData.filter((c) => c.type === 'rain_detector').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
                {nodeComponentsData.filter((c) => c.type === 'camera').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
                {nodeComponentsData.filter((c) => c.type === 'other').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5">
          {(spaceData.is_admin) && (
            <Button
              text="Modificar"
              isTypeButton
              onClick={() => navigate('ajustes')}
              color="blue"
            />
          )}

          {(isScreenSmall) && (
            <Button
              text="Ver en Mapa"
              isTypeButton
              onClick={() => setIsMapOpen(true)}
              color="gray"
            />
          )}

        </div>
      </div>

      {renderMap()}
    </div>
  );
};

export default SelectedNodeOverview;
