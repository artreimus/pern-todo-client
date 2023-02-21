import React, { useState } from 'react';
import { ToDo } from './List';
import ToDoModalEdit from './modal/Edit';
import { v4 as uuidv4 } from 'uuid';
import ToDoModalDelete from './modal/Delete';

type TodoProps = {
  setTodos: (value: ToDo[] | ((prev: ToDo[]) => ToDo[])) => void;
};

const Todo: React.FC<TodoProps & ToDo> = ({
  todo_id,
  description,
  setTodos,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const uniqid = uuidv4();

  return (
    <div className="col-span-2 project flex">
      <input type="checkbox" id={uniqid} />
      <label htmlFor={uniqid} className="task">
        <span className="custom-checkbox"></span>
        {description}
      </label>
      <div className="ml-auto flex justify-center items-center">
        <ToDoModalEdit
          setTodos={setTodos}
          setShow={setShowEdit}
          show={showEdit}
          description={description}
          todo_id={todo_id}
        />
        <ToDoModalDelete
          setTodos={setTodos}
          setShow={setShowDelete}
          show={showDelete}
          todo_id={todo_id}
        />
      </div>

      {/* <div className="py-3 pl-4">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
          />
          <label htmlFor="checkbox" className="sr-only">
            Checkbox
          </label>
        </div>
      </div>
      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
        {todo_id}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {description}
      </td>

      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <ToDoModalEdit
          setTodos={setTodos}
          description={description}
          todo_id={todo_id}
        />
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td> */}
    </div>
  );
};
export default Todo;
