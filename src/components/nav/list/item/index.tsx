import Link from 'next/link';
import React from 'react';
import { ListType } from '..';
import NavListItemMenu from './menu';

type NavListItemProps = {
  title: string;
  setLists: (value: ListType[] | ((prev: ListType[]) => ListType[])) => void;
  id: number;
};

const NavListItem: React.FC<NavListItemProps> = ({ title, id, setLists }) => {
  return (
    <div className="flex flex-row font-semibold text-lg items-center bg-emerald-300 mb-3">
      <NavListItemMenu id={id} setLists={setLists} title={title} />
      <Link
        className="py-3 px-4 rounded-sm w-10/12 flex items-center"
        href={`/lists/${id}`}
      >
        <p className="whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </p>
      </Link>
    </div>
  );
};
export default NavListItem;
