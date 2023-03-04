import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ToDoType } from '../list';
import { FiEdit } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import setErrorModal from '@/utils/setErrorModal';
import useModal from '@/hooks/useModal';
import setSuccessModal from '@/utils/setSuccessModal';

type ToDoModalEditProps = {
  setTodos: (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => void;
  setShow: (value: boolean | ((prev: boolean) => boolean)) => void;
  show: boolean;
};

const ToDoModalEdit: React.FC<ToDoModalEditProps & ToDoType> = ({
  description,
  todo_id,
  setTodos,
  setShow,
  show,
  completed,
  due_date,
}) => {
  const [editDescription, setEditDescription] = useState(description);
  const [dueDate, setDueDate] = useState<null | Date>(
    due_date ? new Date(due_date) : null
  );

  const { setError, setSuccess } = useModal();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!show) {
      setEditDescription(description);
    }
  }, [show]);

  const handleEdit = async () => {
    try {
      const response = await axiosPrivate.patch(
        `todos/${todo_id}`,
        JSON.stringify({
          description: editDescription,
          completed,
          due_date: dueDate
            ? new Date(dueDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : dueDate,
        })
      );

      setTodos((prev) =>
        prev.map((item: ToDoType) => {
          if (item.todo_id != todo_id) {
            return item;
          }
          return response?.data?.data[0];
        })
      );

      setShow(false);
      setSuccess(setSuccessModal('Todo edited'));
    } catch (error) {
      setError(setErrorModal(error));
    }
  };

  return (
    <>
      <button
        className="opacity-40 hover:text-green-700"
        onClick={() => setShow((prev) => !prev)}
      >
        <FiEdit />
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
                      <div className="rounded-full border-2 border-green-500 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto text-2xl text-green-600 mb-3">
                        <AiFillEdit />
                      </div>
                      <div className="text-center">
                        <p className="font-bold">Edit your task</p>
                        <p className="text-sm text-gray-700 mt-1 mb-2 text-center">
                          To edit your to-do list, simply select the item you
                          wish to modify and make the necessary changes. Once
                          you've made your updates, be sure to save your changes
                          to ensure they are reflected in your list.
                        </p>
                      </div>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-gray-800 text-sm font-bold mb-1"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        className=" border-2 rounded w-full py-2 px-3 text-black text-sm focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-800 text-sm font-bold mb-1">
                        Date
                      </p>
                      <DatePicker
                        selected={dueDate}
                        onSelect={(date: Date) =>
                          setDueDate((prev) => {
                            if (prev?.getTime() === date.getTime()) {
                              return null;
                            }
                            return date;
                          })
                        }
                        onChange={() => {}}
                        className="border w-full text-gray-800 text-sm px-3 py-2"
                      />
                    </div>

                    <div className="text-center md:flex justify-center">
                      <button
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                        onClick={handleEdit}
                      >
                        Edit Task
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
                <></>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ToDoModalEdit;
