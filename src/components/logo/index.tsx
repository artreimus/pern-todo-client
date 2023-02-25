import React from 'react';
import { AiFillApple } from 'react-icons/ai';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center ">
      <h1 className="font-bold text-5xl tracking-wide">iDo</h1>
      <div className="text-5xl">
        <AiFillApple />
      </div>
    </div>
  );
};
export default Logo;
