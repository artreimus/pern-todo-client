import React, { useEffect, useState } from 'react';
import Todo from '.';
import ToDoInput from './Input';
import styles from './list.module.css';

type toDoListProps = {};

export type ToDo = {
  todo_id: number;
  description: string;
};

const ToDoList: React.FC<toDoListProps> = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  async function getTodos() {
    const res = await fetch('http://localhost:5000/api/v1/todos');
    const data = await res.json();
    setTodos(data.data);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div
      className={`${styles.list} sm:mt-10 sm:rounded-tl-3xl sm:px-5 py-2 sm:py-5 sm:ml-3`}
    >
      <div className={`grid grid-cols-2 w-11/12 mx-auto`}>
        <div className="col-span-2 md:flex md:justify-between md:items-center mb-2">
          <h2 className="font-extrabold text-5xl tracking-wide mb-2 lg:mb-0">
            My Day
          </h2>
          <p className="text-neutral-500 opacity-80">
            Remaining {todos.length > 1 ? 'tasks' : 'task'}:{' '}
            <span>{todos.length}</span>
          </p>
        </div>
        {todos.map((todo) => (
          <Todo
            key={todo.todo_id}
            todo_id={todo.todo_id}
            description={todo.description}
            setTodos={setTodos}
          />
        ))}
        <ToDoInput todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};
export default ToDoList;
