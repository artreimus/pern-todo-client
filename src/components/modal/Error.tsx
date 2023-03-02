import useModal from '@/hooks/useModal';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ErrorModal: React.FC = () => {
  const { error, setError } = useModal();

  return (
    <div className="relative">
      <div className="absolute top-5 right-3 text-white w-3/4 max-w-sm bg-red-400 rounded-md shadow-lg p-4 ml-auto">
        <div className="w-full  flex">
          <div className="md:flex items-center flex-col justify-center">
            <div className="mr-5 tracking-wider">
              <p className="font-normal text-lg break-all">
                {error.message ? error.message : 'Error Message'}
              </p>
            </div>
          </div>
          <div className="text-center md:flex justify-center ml-auto">
            <button
              className="text-2xl  rounded-lg font-extrabold md:order-2"
              onClick={() => setError({ message: '', show: false })}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ErrorModal;
