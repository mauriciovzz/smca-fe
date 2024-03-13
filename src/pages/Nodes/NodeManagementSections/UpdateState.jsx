import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, Label,
} from 'src/components';
import { ConfirmationDialog } from 'src/layout';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

const UpdateState = ({ selectedNode, updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [states, setStates] = useState([]);
  const [isConDiaOpen, setIsConDiaOpen] = useState(false);

  const [selectedState, setSelectedState] = useState(selectedNode.state);

  const getStates = async () => {
    const response = await nodesService.getStates();
    setStates(response);
  };

  useEffect(() => {
    getStates();
  }, []);

  const renderStateInfo = () => {
    switch (selectedState) {
      case 'Activo':
        return (
          <div className="flex h-fit flex-col space-y-2.5 rounded-3xl border-2 border-active p-5">
            <p className="text-justify text-sm text-slate-400">
              Este estado indica que el nodo esta funcionando con normalidad.
            </p>
            <Divider changePadding="p-1" changeColor="border-active" />
            <p className="text-justify text-sm text-slate-400">
              {`El sistema almacenará todas las lectura realizada por 
              el nodo mientras el mismo se encuentra en este estado.`}
            </p>
          </div>
        );
      case 'Inactivo':
        return (
          <div className="flex h-fit flex-col space-y-2.5 rounded-3xl border-2 border-inactive p-5">
            <p className="text-justify text-sm text-slate-400">
              Este estado indica que el nodo pauso su funcionamiento.
            </p>
            <Divider changePadding="p-1" changeColor="border-inactive" />
            <p className="text-justify text-sm text-slate-400">
              {`El sistema no almacenará ninguna lectura realizada por 
              el nodo mientras el mismo se encuentra en este estado.`}
            </p>
          </div>
        );
      case 'Terminado':
        return (
          <div className="flex h-fit flex-col space-y-2.5 rounded-3xl border-2 border-terminated p-5">
            <p className="text-justify text-sm text-slate-400">
              Este estado indica que el nodo cesó su funcionamiento.
            </p>
            <Divider changePadding="p-1" changeColor="border-terminated" />
            <p className="text-justify text-sm text-slate-400">
              {`El sistema guardara las lecturas realizada por 
              el nodo, pero el mismo no se podra modificar.`}
            </p>
          </div>
        );
      default:
        return (
          <div />
        );
    }
  };

  const handleStateUpdate = async () => {
    try {
      const response = await nodesService.updateState(
        selectedWorkspace.workspace_id,
        selectedNode.node_id,
        { stateId: states.find((st) => st.state === selectedState).node_state_id },
      );

      notifications.success(response);
      updateNodes();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="relative flex grow flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Actualizar Estado"
        hasButton
        onButtonClick={() => changeView('ManagementMenu')}
      />

      <Divider />

      <div className="flex grow flex-col space-y-5">
        <div>
          <Label text="Estado" />
          <div className="flex h-fit  w-full overflow-hidden rounded-2xl border-2 bg-white font-medium ">
            <button
              type="button"
              className={`${(selectedState === 'Activo') ? 'rounded-2xl bg-active text-white' : 'bg-white text-slate-400'} flex w-full items-center justify-center p-1`}
              onClick={() => setSelectedState('Activo')}
            >
              Activo
            </button>

            <button
              type="button"
              className={`${(selectedState === 'Inactivo') ? 'rounded-2xl bg-inactive text-white' : 'bg-white text-slate-400'} flex w-full items-center justify-center p-1`}
              onClick={() => setSelectedState('Inactivo')}
            >
              Inactivo
            </button>

            <button
              type="button"
              className={` ${(selectedState === 'Terminado') ? 'rounded-2xl bg-terminated text-white' : 'bg-white text-slate-400'} flex w-full items-center justify-center p-1`}
              onClick={() => setSelectedState('Terminado')}
            >
              Terminado
            </button>
          </div>
        </div>

        {renderStateInfo()}
      </div>

      <Button
        text="Guardar Cambios"
        typeIsButton
        onClick={(selectedState === 'Terminado') ? () => setIsConDiaOpen(true) : () => handleStateUpdate()}
        color="blue"
        disabled={selectedNode.state === selectedState}
      />

      {
        isConDiaOpen && (
        <ConfirmationDialog
          title="Terminar Nodo"
          description={`
            Estas seguro de querer terminar el funcionaminto del nodo "${selectedNode.node_name}"?
            Este cambio no se podrá deshacer.
          `}
          onDecline={() => setIsConDiaOpen(false)}
          onConfirm={() => handleStateUpdate()}
        />
        )
      }
    </div>
  );
};

export default UpdateState;
