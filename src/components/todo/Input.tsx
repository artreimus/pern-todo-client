import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ToDo } from './List';

type ToDoInputProps = {
  todos: ToDo[];
  setTodos: (value: ToDo[] | ((prev: ToDo[]) => ToDo[])) => void;
};

const ToDoInput: React.FC<ToDoInputProps> = ({ todos, setTodos }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!description) {
        throw new Error('Please provide description');
      }

      const response = await fetch('http://localhost:5000/api/v1/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('An error was encountered while deleting the to do');
      }

      const result = await response.json();

      setTodos((prev) => [...prev, result.data]);
    } catch (error) {
      console.error('handleSubmit', error);
    }
  };

  console.log(todos);

  return (
    <form className="col-span-2" onSubmit={handleSubmit}>
      <div className="relative border-2 border-solid border border-black rounded">
        <input
          type="text"
          placeholder="New list name"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="h-5 py-5 pl-3 mr-10 w-11/12 focus:outline-none bg-transparent"
        />
        <button className="text-xl absolute bottom-2.5 right-3" type="submit">
          <AiOutlinePlus />
        </button>
      </div>
    </form>
  );
};
export default ToDoInput;
