import { React, useState } from 'react';

import { useOutletContext, useNavigate, useParams } from 'react-router-dom';

import { Button, ConfirmationDialog, ToggleSwitch } from 'src/components/inputs';
import { Divider, Heading, Label } from 'src/components/ui';
import membersService from 'src/services/members';
import notificationHelper from 'src/utils/notificationHelper';

const MemberManagement = () => {
  const { accountId } = useParams();
  const {
    spaceData, membersData, updateSpaceInstanceRoot, errorHandler,
  } = useOutletContext();
  const selectedMember = membersData.find((m) => m.account_id === parseInt(accountId, 10));
  const navigate = useNavigate();

  const [isConDiaOpen, setIsConDiaOpen] = useState(false);

  const updateMemberRole = async () => {
    try {
      const response = await membersService.updateMemberRole(
        spaceData.space_id,
        selectedMember.account_id,
      );

      notificationHelper.success(response);
      updateSpaceInstanceRoot();
    } catch (error) {
      const goTo = errorHandler(error, updateSpaceInstanceRoot);

      if (goTo)
        navigate(goTo);
    }
  };

  const memberRemoval = async () => {
    try {
      const response = await membersService.removeMember(
        spaceData.space_id,
        selectedMember.account_id,
      );

      notificationHelper.success(response);
      updateSpaceInstanceRoot();
      navigate('..');
    } catch (error) {
      const goTo = errorHandler(error, updateSpaceInstanceRoot);

      if (goTo)
        navigate(goTo);
    }
  };

  return (
    <div className="relative flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Miembro"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <div className="w-full divide-y">
          <div className="flex gap-2.5 pb-5">
            <div className="w-1/2 text-left">
              <Label text="Nombre" />
              <div>
                {selectedMember.first_name}
              </div>
            </div>

            <div className="w-1/2 text-left">
              <Label text="Apellido" />
              <div>
                {selectedMember.last_name}
              </div>
            </div>
          </div>

          <div className="py-5 text-left">
            <Label text="Correo Electrónico" />
            <div>
              {selectedMember.email}
            </div>
          </div>

          <div className="py-5 text-left">
            <ToggleSwitch
              selectedOption={selectedMember.is_admin}
              leftOption={{
                title: 'Usuario',
                value: false,
                color: 'bg-main',
              }}
              rigthOption={{
                title: 'Administrador',
                value: true,
                color: 'bg-main',
              }}
            />
          </div>
        </div>
      </div>

      {
        (spaceData.is_admin) && (
          <div className="flex gap-2.5">
            <Button
              text="Cambiar Rol"
              isTypeButton
              onClick={() => updateMemberRole()}
              color="blue"
            />
            <Button
              text="Remover"
              isTypeButton
              onClick={() => setIsConDiaOpen(true)}
              color="red"
            />
          </div>
        )
      }

      {
          isConDiaOpen && (
          <ConfirmationDialog
            title="Remover Usuario del Espacio"
            description={`Estas seguro de querer remover a "${selectedMember.first_name} ${selectedMember.last_name}" del espacio?`}
            onDecline={{ text: 'Cancelar', action: () => setIsConDiaOpen(false) }}
            onConfirm={{ text: 'Remover', action: () => memberRemoval() }}
          />
          )
        }

    </div>
  );
};

export default MemberManagement;
