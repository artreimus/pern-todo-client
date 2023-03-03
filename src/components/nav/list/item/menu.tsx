import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useModal from '@/hooks/useModal';
import setErrorModal from '@/utils/setErrorModal';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { ListType } from '..';

type NavListItemMenuProps = {
  id: number;
  setLists: (value: ListType[] | ((prev: ListType[]) => ListType[])) => void;
};

const NavListItemMenu: React.FC<NavListItemMenuProps> = ({ id, setLists }) => {
  const [show, setShow] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setError } = useModal();

  const handleDelete = async () => {
    try {
      const response = await axiosPrivate.delete(`lists/${id}`);
      setLists((prev) => prev.filter((list) => list.list_id !== id));
    } catch (error) {
      console.error('handleDelete', error);
      setError(setErrorModal(error));
    }
  };

  return (
    <>
      <div className="relative">
        <button
          className="mr-2 ml-4"
          onClick={(e) => {
            e.stopPropagation();
            setShow((prev) => !prev);
          }}
        >
          <FaBars />
        </button>

        {show && (
          <div className="absolute left-5 top-5 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="my-1 " onClick={handleDelete}>
              <div className="cursor-pointer text-gray-700 block px-4 py-1 text-sm">
                Delete
              </div>
            </div>
            <div className="mb-1">
              <div className="cursor-pointer text-gray-700 block px-4 py-1 text-sm">
                Edit
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default NavListItemMenu;
