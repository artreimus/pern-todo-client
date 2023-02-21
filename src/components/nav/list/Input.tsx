import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

type inputProps = {};

const NavListInput: React.FC<inputProps> = () => {
  return (
    <form>
      <div className="relative border-2 border-solid border border-black rounded mt-0">
        <input
          type="text"
          placeholder="New list name"
          //   value={description}
          //   onChange={(e) => {
          //     setDescription(e.target.value);
          //   }}
          className="h-5 py-6 pl-5 focus:outline-none w-11/12"
        />
        <button className="text-xl absolute bottom-4 right-3" type="submit">
          <AiOutlinePlus />
        </button>
      </div>
    </form>
  );
};
export default NavListInput;
