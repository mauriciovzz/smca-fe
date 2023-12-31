import { toast, Slide } from 'react-toastify';

const success = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    transition: Slide
  });
};

const info = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
    transition: Slide
  });
};

const error = (err) => {
  console.log(err);
  toast.error(err.response.data.error, {
    position: toast.POSITION.TOP_CENTER,
    transition: Slide
  });
};

export default {
  success,
  info,
  error
}