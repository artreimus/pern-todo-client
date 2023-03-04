import React, { useState } from 'react';
import { ToDoType } from './list';
import ToDoModalEdit from './modal/Edit';
import { v4 as uuidv4 } from 'uuid';
import ToDoModalDelete from './modal/Delete';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import setErrorModal from '@/utils/setErrorModal';
import useModal from '@/hooks/useModal';

type TodoProps = {
  setTodos: (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => void;
};

const Todo: React.FC<TodoProps & ToDoType> = ({
  todo_id,
  description,
  setTodos,
  completed,
  due_date,
  list_id,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { setError } = useModal();

  const axiosPrivate = useAxiosPrivate();

  const handleCompletedChange = async () => {
    try {
      const response = await axiosPrivate.patch(
        `todos/${todo_id}`,
        JSON.stringify({ description, completed: !completed, due_date })
      );

      setTodos((prev) =>
        prev.map((item: ToDoType) => {
          if (item.todo_id != todo_id) {
            return item;
          }
          return response?.data.data[0];
        })
      );
    } catch (error) {
      setError(setErrorModal(error));
    }
  };

  const uniqid = uuidv4();

  return (
    <div className="relative col-span-2 project flex">
      <input
        type="checkbox"
        id={uniqid}
        checked={completed}
        onChange={handleCompletedChange}
      />
      <label htmlFor={uniqid} className="text-md">
        <span className="custom-checkbox"></span>
        {description}
      </label>
      {due_date && (
        <div className="text-xxs font-semibold absolute bottom-1 left-11  text-gray-500">
          {due_date}
        </div>
      )}
      <div className="ml-auto flex justify-center items-center">
        <ToDoModalEdit
          setTodos={setTodos}
          setShow={setShowEdit}
          show={showEdit}
          todo_id={todo_id}
          description={description}
          completed={completed}
          list_id={list_id}
          due_date={due_date}
        />
        <ToDoModalDelete
          setTodos={setTodos}
          setShow={setShowDelete}
          show={showDelete}
          todo_id={todo_id}
        />
      </div>
    </div>
  );
};
export default Todo;
