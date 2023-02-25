import React from 'react';
import NavListInput from './Input';
import styles from './index.module.css';
import NavListItem from './Item';

const NavList: React.FC = () => {
  return (
    <div className="w-full">
      <hr className={`${styles.divider} solid border-t-4 mb-3`} />
      <NavListItem />
      <NavListItem />
      <NavListItem />
      <NavListInput />
    </div>
  );
};
export default NavList;
