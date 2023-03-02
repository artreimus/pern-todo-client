import useModal from '@/hooks/useModal';
import axios from 'axios';

const setErrorModal = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      show: true,
      message: error?.response?.data?.message,
    };
  } else if (error instanceof Error)
    return {
      show: true,
      message: error?.message,
    };

  return {
    show: true,
    message: 'An error was encountered',
  };
};

export default setErrorModal;
