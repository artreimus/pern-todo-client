import { ToDoType } from '@/components/todo/list';
import React, { useEffect } from 'react';
import useSort from './useSort';

const useSortTodos = (
  setTodos: (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => void,
  todos: ToDoType[]
) => {
  const { sortOption } = useSort();

  useEffect(() => {
    const sortTodos = (dataArr: ToDoType[]) => {
      if (sortOption.type === 'name' && sortOption.order === 'asc') {
        const result = dataArr.sort((a: ToDoType, b: ToDoType) => {
          let x = a.description;
          let y = b.description;
          if (x > y) {
            return 1;
          } else if (x < y) {
            return -1;
          }
          return 0;
        });

        setTodos(result);
      }

      if (sortOption.type === 'name' && sortOption.order === 'desc') {
        const result = dataArr.sort((a: ToDoType, b: ToDoType) => {
          let x = a.description;
          let y = b.description;
          if (x < y) {
            return 1;
          } else if (x > y) {
            return -1;
          }
          return 0;
        });
        setTodos(result);
      }

      if (sortOption.type === 'date' && sortOption.order === 'asc') {
        const result = dataArr.sort((a: ToDoType, b: ToDoType) => {
          let dateX: any = a.due_date ? new Date(a.due_date) : 0;
          let dateY: any = b.due_date ? new Date(b.due_date) : 0;
          let x = a.description;
          let y = b.description;

          if (dateX && dateY) return dateX - dateY;
          if (dateX) return -1;
          if (dateY) return 1;
          if (x < y) {
            return -1;
          } else if (x > y) {
            return 1;
          }
          return 0;
        });

        setTodos(result);
      }

      if (sortOption.type === 'date' && sortOption.order === 'desc') {
        const result = dataArr.sort((a: ToDoType, b: ToDoType) => {
          let dateX: any = a.due_date ? new Date(a.due_date) : 0;
          let dateY: any = b.due_date ? new Date(b.due_date) : 0;
          let x = a.description;
          let y = b.description;

          if (dateX && dateY) return dateY - dateX;
          if (dateX) return -1;
          if (dateY) return 1;
          if (x < y) {
            return -1;
          } else if (x > y) {
            return 1;
          }
          return 0;
        });

        setTodos(result);
      }
    };
    if (todos?.length) {
      sortTodos([...todos]);
    }
  }, [sortOption.type, sortOption.order, todos.length]);
};
export default useSortTodos;
