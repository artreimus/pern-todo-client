import React, { useEffect, useState } from 'react';
import Todo from '.';
import ToDoInput from './Input';

export type ToDoType = {
  todo_id: number;
  list_id: number;
  description: string;
  completed: boolean;
  due_date?: string | null;
};

type TodoListProps = {
  list_id: number | null;
  todos: ToDoType[];
  setTodos: (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => void;
};

const ToDoList: React.FC<TodoListProps> = ({ list_id, todos, setTodos }) => {
  return (
    <div
      className={`list sm:mt-10 sm:rounded-tl-3xl sm:px-5 py-2 sm:py-5 sm:ml-3`}
    >
      <div className={`grid grid-cols-2 w-11/12 mx-auto`}>
        <div className="col-span-2 md:flex md:justify-between md:items-center mb-4">
          <h2 className="font-extrabold text-5xl tracking-wide mb-2 lg:mb-0">
            My Day
          </h2>
          <p className="text-neutral-500 opacity-80">
            Remaining {todos?.length > 1 ? 'tasks' : 'task'}:{' '}
            <span>{todos?.length ?? 0}</span>
          </p>
        </div>
        {todos?.map((todo) => (
          <Todo
            key={todo.todo_id}
            list_id={todo.list_id}
            todo_id={todo.todo_id}
            description={todo.description}
            completed={todo.completed}
            due_date={
              todo.due_date
                ? new Date(todo.due_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : null
            }
            setTodos={setTodos}
          />
        ))}
        <ToDoInput setTodos={setTodos} list_id={list_id} />
      </div>
    </div>
  );
};
export default ToDoList;
