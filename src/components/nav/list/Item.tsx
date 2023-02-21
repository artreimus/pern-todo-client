import Link from 'next/link';
import React from 'react';
import { FaBars } from 'react-icons/fa';

type NavListItemProps = {};

const NavListItem: React.FC<NavListItemProps> = () => {
  return (
    <div className="flex flex-col font-semibold text-lg items-center">
      <Link
        href="/tasks"
        className="bg-emerald-300 py-3 px-5 rounded-sm mb-3 w-full flex items-center"
      >
        <div className="mr-4">
          <FaBars />
        </div>
        Tasks
      </Link>
    </div>
  );
};
export default NavListItem;
