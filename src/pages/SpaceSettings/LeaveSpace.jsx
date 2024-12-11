import React from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const LeaveSpace = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { spaceData } = useOutletContext();

  const handleLeaveSpace = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/api/spaces/${spaceData.space_id}/members/${auth.accountId}/leave`,
      );

      notificationHelper.success(response.data);
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
