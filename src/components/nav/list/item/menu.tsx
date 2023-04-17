import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useModal from '@/hooks/useModal';
import setErrorModal from '@/utils/setErrorModal';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { ListType } from '..';
import ListItemModalDelete from './modal/Delete';
import ListItemModalEdit from './modal/Edit';

type NavListItemMenuProps = {
  id: number;
  setLists: (value: ListType[] | ((prev: ListType[]) => ListType[])) => void;
  title: string;
};

const NavListItemMenu: React.FC<NavListItemMenuProps> = ({
  id,
  setLists,
  title,
}) => {
  const [show, setShow] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setError } = useModal();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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
          <>
            <div
              className="fixed inset-0 w-full h-full"
              onClick={() => setShow(false)}
            ></div>
            <div className="absolute left-5 top-5 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-2">
              <ListItemModalDelete
                setLists={setLists}
                setShow={setShowDelete}
                show={showDelete}
                list_id={id}
              />
              <ListItemModalEdit
                setLists={setLists}
                list_id={id}
                title={title}
                setShow={setShowEdit}
                show={showEdit}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default NavListItemMenu;
