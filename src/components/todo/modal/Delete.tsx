import React from 'react';
import { ToDoType } from '../list';
import { BsExclamationTriangle, BsTrash } from 'react-icons/bs';
import { axiosPrivate } from '@/api/axios';
import setErrorModal from '@/utils/setErrorModal';
import useModal from '@/hooks/useModal';
import setSuccessModal from '@/utils/setSuccessModal';

type ToDoModalDeleteProps = {
  setTodos: (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => void;
  setShow: (value: boolean | ((prev: boolean) => boolean)) => void;
  show: boolean;
  todo_id: number;
};

const ToDoModalDelete: React.FC<ToDoModalDeleteProps> = ({
  todo_id,
  setTodos,
  setShow,
  show,
}) => {
  const { setError, setSuccess } = useModal();

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`todos/${todo_id}`);
      setTodos((prev) =>
        prev.filter((item: ToDoType) => {
          return item.todo_id != todo_id;
        })
      );
      setShow(false);
      setSuccess(setSuccessModal('Todo deleted'));
    } catch (error) {
      setError(setErrorModal(error));
    }
  };

  return (
    <>
      <button
        className="opacity-40 hover:text-red-700 ml-2"
        onClick={() => setShow((prev) => !prev)}
      >
        <BsTrash />
      </button>
      {show && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShow(false)}
            ></div>
            <div className="flex items-center min-h-4/5 px-4 py-8">
              <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="sm:flex">
                  <div className="mt-2 w-full">
                    <div className="md:flex items-center flex-col justify-center">
                      <div className="rounded-full border-2 border-red-500 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto text-2xl text-red-600 mb-3">
                        <BsExclamationTriangle />
                      </div>
                      <div className="text-center">
                        <p className="font-bold">Delete your task</p>
                        <p className="text-sm text-gray-700 mt-1">
                          You will lose this task once deleted. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                    <div className="text-center mt-4 md:flex justify-center">
                      <button
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                        onClick={handleDelete}
                      >
                        Delete Task
                      </button>
                      <button
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
                        onClick={() => setShow(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ToDoModalDelete;
