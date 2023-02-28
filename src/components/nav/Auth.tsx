import React from 'react';

type NavAuthProps = {};

const NavAuth: React.FC<NavAuthProps> = () => {
  return (
    <div className="border py-3 px-5 rounded-sm mb-3 w-full text-md font-semibold">
      <p>Please login or register</p>
    </div>
  );
};
export default NavAuth;
