import React, { useEffect, useState } from 'react';
import { ToDo } from '../List';
import { FiEdit } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';

type ToDoModalEditProps = {
  setTodos: (value: ToDo[] | ((prev: ToDo[]) => ToDo[])) => void;
  setShow: (value: boolean | ((prev: boolean) => boolean)) => void;
  show: boolean;
};

const ToDoModalEdit: React.FC<ToDoModalEditProps & ToDo> = ({
  description,
  todo_id,
  setTodos,
  setShow,
  show,
}) => {
  const [editDescription, setEditDescription] = useState(description);

  useEffect(() => {
    if (!show) {
      setEditDescription(description);
    }
  }, [show]);

  const handleEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/todos/${todo_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: editDescription }),
      });

      if (!res.ok) {
        throw new Error('An error was encountered while updating the to do');
      }

      const result = await res.json();

      setTodos((prev) =>
        prev.map((item: ToDo) => {
          if (item.todo_id != todo_id) {
            return item;
          }
          return result.data[0];
        })
      );

      setShow(false);
    } catch (error) {
      console.error('handleDelete', error);
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
                    <div className="mb-4">
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
                    <div className="text-center mt-4 md:flex justify-center">
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
