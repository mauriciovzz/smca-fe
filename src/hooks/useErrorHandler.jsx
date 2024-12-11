import { useNavigate } from 'react-router-dom';

import useLogout from 'src/hooks/useLogout';
import notificationHelper from 'src/utils/notificationHelper';

const useErrorHandler = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const errorHandler = async (error, revalidator) => {
    const errorMessage = error?.response?.data?.message;

    switch (error?.response?.status) {
      case 400: {
        notificationHelper.error(errorMessage);
        break;
      }
      case 401: {
        notificationHelper.error(errorMessage);
        break;
      }
      case 403: {
        if (errorMessage === 'RefreshTokenExpiredError') {
          notificationHelper.error('La sesión ha expirado.');
          logout(true);
          navigate('/iniciar-sesion');
        }

        if (errorMessage === 'SpaceAccessDenied') {
          notificationHelper.error('No formas parte del espacio indicado.');
          navigate('/espacios');
        }

        if (errorMessage === 'NotSpaceAdmin') {
          notificationHelper.error('No tienes los permisos necesarios para realizar esta acción.');
          navigate('..');
          revalidator();
        }

        if (errorMessage === 'CanNotUpdateSelf') {
          notificationHelper.error('Un administrador no puede editarse a si mismo.');
        }
        break;
      }
      case 404: {
        if (errorMessage === 'SpaceDoesNotExist') {
          notificationHelper.error('El espacio indicado no se encuentra registrado.');
          navigate('/espacios');
        }

        if (errorMessage === 'AccountDoesNotExist') {
          notificationHelper.error('Su cuenta no se encuentra registrada.');
          logout(true);
          navigate('/');
        }

        if (errorMessage === 'LocationDoesNotExist') {
          notificationHelper.error('La ubicacion no se encuentra registrada.');
          navigate('..');
        }

        if (errorMessage === 'VariableDoesNotExist') {
          notificationHelper.error('La variable no se encuentra registrada.');
          navigate('..');
          revalidator();
        }

        if (errorMessage === 'ComponentDoesNotExist') {
          notificationHelper.error('El componente no se encuentra registrado.');
          navigate('..');
          revalidator();
        }

        if (errorMessage === 'NodeDoesNotExist') {
          notificationHelper.error('El nodo indicado no se encuentra registrado.');
          navigate('../..');
        }

        if (errorMessage === 'AccountNotInSpace') {
          notificationHelper.error('La cuenta indicada no forma parte del espacio.');
          navigate('..');
        }

        if (errorMessage === 'EmailNotFound') {
          notificationHelper.error('El correo electrónico ingresado no se encuentra registrado en el sistema.');
        }
        break;
      }
      case 409: {
        notificationHelper.error(errorMessage);
        break;
      }
      case 500: {
        notificationHelper.error(errorMessage);
        break;
      }
      default:
        console.log(error);
    }
  };

  return errorHandler;
};

export default useErrorHandler;
