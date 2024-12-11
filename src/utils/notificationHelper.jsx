import { toast, Slide } from 'react-toastify';

const config = {
  position: 'top-center',
  transition: Slide,
  closeOnClick: true,
  draggable: false,
};

const success = (message) => {
  toast.success(message, config);
};

const info = (message) => {
  toast.info(message, config);
};

const error = (message) => {
  toast.error(message, config);
};

export default {
  success,
  info,
  error,
};
