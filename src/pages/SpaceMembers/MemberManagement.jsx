import { React, useState } from 'react';

import { useOutletContext, useNavigate, useParams } from 'react-router-dom';

import { Button, ConfirmationDialog, ToggleSwitch } from 'src/components/inputs';
import { Divider, Heading, Label } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const MemberManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { spaceData, membersData, updateMembersData } = useOutletContext();

  const { accountId } = useParams();
  const selectedMember = membersData
    .find((m) => m.account_id === parseInt(accountId, 10));

  const [isConDiaOpen, setIsConDiaOpen] = useState(false);

  const updateMemberRole = async () => {
    try {
      const response = await axiosPrivate.put(
        `/api/spaces/${spaceData.space_id}/members/${selectedMember.account_id}`,
      );

      notificationHelper.success(response.data);
      updateMembersData();
    } catch (error) {
      errorHandler(error, updateMembersData);
    }
  };

  const memberRemoval = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/api/spaces/${spaceData.space_id}/members/${selectedMember.account_id}/remove`,
      );

      notificationHelper.success(response.data);
      updateMembersData();
      navigate('..');
    } catch (error) {
      errorHandler(error, updateMembersData);
      setIsConDiaOpen(false);
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
        (spaceData.is_admin) && (auth.accountId !== selectedMember.account_id) && (
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
