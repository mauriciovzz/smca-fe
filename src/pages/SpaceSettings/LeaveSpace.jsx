import React from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import membersService from 'src/services/members';
import notificationHelper from 'src/utils/notificationHelper';

const LeaveSpace = () => {
  const { auth } = useAuth();
  const { spaceData, errorHandler } = useOutletContext();
  const navigate = useNavigate();

  const handleLeaveSpace = async () => {
    try {
      const response = await membersService.leaveSpace(
        spaceData.space_id,
        auth.accountId,
      );

      notificationHelper.success(response);
      navigate('/espacios');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Abandonar Espacio"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <p className="text-justify text-gray-500">
          Si estás seguro de querer abandonar este espacio,
          haz clic en el botón &quot;Abandonar Espacio&quot;.
        </p>
      </div>

      <Button
        text="Abandonar Espacio"
        isTypeButton
        onClick={() => handleLeaveSpace()}
        color="red"
      />
    </div>
  );
};

export default LeaveSpace;
