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

const error = (err) => {
  if (err.response.data.error !== 'TokenExpiredError') toast.error(err.response.data.error, config);
};

export default {
  success,
  info,
  error,
};
