import useModal from '@/hooks/useModal';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const SuccessModal: React.FC = () => {
  const { success, setSuccess } = useModal();

  return (
    <div className="relative">
      <div className="absolute top-5 right-3 text-white w-screen max-w-sm bg-green-400 rounded-md shadow-lg p-4 ml-auto">
        <div className="w-full flex">
          <div className="md:flex items-center flex-col justify-center">
            <div className="mr-5 tracking-wider">
              <p className="font-normal text-lg break-all capitalize">
                {success.message ? success.message : 'Success'}
              </p>
            </div>
          </div>
          <div className="text-center md:flex justify-center ml-auto">
            <button
              className="text-2xl  rounded-lg font-extrabold md:order-2"
              onClick={() => setSuccess({ message: '', show: false })}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      </div>
      <></>
    </div>
  );
};
export default SuccessModal;
