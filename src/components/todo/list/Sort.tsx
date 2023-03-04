import useSort from '@/hooks/useSort';
import React, { useEffect, useState } from 'react';
import { BsSortDown } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { ToDoType } from '.';

type TodoListSortProps = {
  setTodos: (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => void;
};

const TodoListSort: React.FC<TodoListSortProps> = ({ setTodos }) => {
  const [show, setShow] = useState(false);
  const { setSortOption, sortOption } = useSort();

  const SORT_OPTIONS = [
    { text: 'A to Z', type: 'name', order: 'asc' },
    { text: 'Z to A', type: 'name', order: 'desc' },
    { text: 'Date Ascending', type: 'date', order: 'asc' },
    { text: 'Date Descending', type: 'date', order: 'desc' },
  ];

  const handleSelectSort = async ({
    type,
    order,
  }: {
    type: string;
    order: string;
  }) => {
    setSortOption({ type, order });
    setShow(false);
  };

  const optionElements = SORT_OPTIONS.map((option, index) => (
    <div
      key={index}
      className={`cursor-pointer text-gray-700 block px-4 py-1 text-sm ${
        sortOption.type === option.type && sortOption.order === option.order
          ? 'font-bold'
          : 'font-normal'
      }`}
      onClick={() => {
        handleSelectSort({ type: option.type, order: option.order });
      }}
    >
      {option.text}
    </div>
  ));

  return (
    <>
      <div className="relative">
        <button
          className="mr-2 ml-4 font-bold opacity-60 text-gray-800 flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            setShow((prev) => !prev);
          }}
        >
          <BsSortDown className="mr-1 text-xl" />
          Sort
        </button>

        {show && (
          <div className="absolute left-5 top-5 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="my-1">{optionElements}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default TodoListSort;
