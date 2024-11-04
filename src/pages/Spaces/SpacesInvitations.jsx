import { React } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import invitationsService from 'src/services/invitations';
import notificationHelper from 'src/utils/notificationHelper';

const SpacesInvitations = () => {
  const { auth } = useAuth();
  const { invitationsData, updateSpaceRoot, errorHandler } = useOutletContext();

  const navigate = useNavigate();

  const handleInvitationResponse = async (spaceId, wasAccepted) => {
    try {
      const response = await invitationsService.invitationResponse(
        spaceId,
        auth.accountId,
        { wasAccepted },
      );

      notificationHelper.success(response);
      updateSpaceRoot();
    } catch (error) {
      errorHandler(error, updateSpaceRoot);
    }
  };

  return (
    <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Invitaciones"
        hasButton
        onButtonClick={() => navigate('/espacios')}
      />

      <Divider />

      <div className="relative size-full space-y-5 overflow-hidden">
        <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
          {
            (invitationsData.length !== 0)
              ? (
                invitationsData.map((invitation) => (
                  <li
                    key={invitation.space_id}
                    className="flex h-fit w-full flex-col space-y-2.5 border-b bg-white p-5 shadow"
                  >
                    <div>
                      <div className="break-words font-semibold">
                        {invitation.name}
                      </div>
                      <div className="text-xs">
                        {`Invitado por: ${invitation.first_name} ${invitation.last_name}`}
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <Button
                        text="Aceptar"
                        isTypeButton
                        onClick={() => handleInvitationResponse(invitation.space_id, true)}
                        color="blue"
                      />
                      <Button
                        text="Rechazar"
                        isTypeButton
                        onClick={() => handleInvitationResponse(invitation.space_id, false)}
                        color="red"
                      />
                    </div>
                  </li>
                ))
              )
              : (
                <li className="flex h-fit w-full flex-col space-y-2.5 border-b bg-white p-5 text-center shadow">
                  No tienes invitaciones a otros espacios
                </li>
              )
          }
        </ul>
      </div>
    </div>
  );
};

export default SpacesInvitations;
