import Link from 'next/link';
import React, { useState } from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import { FaPencilAlt, FaCalendarWeek } from 'react-icons/fa';
import { Inter } from '@next/font/google';
import { GiHamburgerMenu } from 'react-icons/gi';
import NavList from './list';
import Logo from '../logo';
import NavUser from './User';
import useAuth from '@/hooks/useAuth';
import NavAuth from './Auth';
import useModal from '@/hooks/useModal';

const inter = Inter({ subsets: ['latin'] });

const Nav: React.FC = () => {
  const { auth } = useAuth();
  const { navOpen: open, setNavOpen: setOpen } = useModal();

  return (
    <nav
      className={`flex flex-col bg-white${inter.className} mb-2 sm:max-w-xs`}
    >
      <div className="flex items-center justify-between px-5 pt-3 pb-2 sm:pt-6 text-5xl">
        <Link href="/">
          <Logo />
        </Link>
        <button
          className="text-3xl sm:hidden"
          onClick={() => setOpen((prev: boolean) => !prev)}
        >
          <GiHamburgerMenu />
        </button>
      </div>
      <div
        className={`absolute sm:relative bg-white w-full z-10 ${
          open
            ? 'top-16 opacity-100'
            : '-top-full sm:top-5 opacity-0 sm:opacity-100'
        } pb-5 ease-in duration-200`}
      >
        <hr className="solid border-t-3 mt-2 border-gray-500 w-full mb-4 sm:hidden" />
        <div className="w-11/12 m-auto">
          {auth.accessToken ? <NavUser email={auth.email} /> : <NavAuth />}
        </div>
        <div className="flex flex-col font-semibold text-lg items-center w-11/12 m-auto">
          <Link
            href="/lists"
            className="bg-red-500 py-3 px-5 rounded-sm mb-3 w-full flex items-center"
          >
            <div className="mr-4">
              <FaPencilAlt />
            </div>
            Tasks
          </Link>
          <Link
            href="/lists/day"
            className="bg-amber-200 py-3 px-5 rounded-sm mb-3 w-full flex items-center"
          >
            <div className="mr-4 text-xl">
              <BsFillSunFill />
            </div>
            My Day
          </Link>
          <Link
            href="/lists/week"
            className="bg-sky-400 py-3 px-5 rounded-sm mb-3 w-full flex items-center"
          >
            <div className="mr-4">
              <FaCalendarWeek />
            </div>
            My Week
          </Link>
          <NavList />
        </div>
      </div>
    </nav>
  );
};
export default Nav;
