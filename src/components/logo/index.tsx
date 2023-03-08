import React from 'react';
import { AiFillApple } from 'react-icons/ai';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <h1 className="font-bold tracking-wide">iDo</h1>
      <div>
        <AiFillApple />
      </div>
    </div>
  );
};
export default Logo;
