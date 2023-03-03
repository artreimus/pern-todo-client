import React, { useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { AiOutlinePlus } from 'react-icons/ai';
import { ListType } from '.';
import useModal from '@/hooks/useModal';
import setErrorModal from '@/utils/setErrorModal';

type NavListInputProps = {
  setLists: (value: ListType[] | ((prev: ListType[]) => ListType[])) => void;
};

const NavListInput: React.FC<NavListInputProps> = ({ setLists }) => {
  const [title, setTitle] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const { setError } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        'lists',
        JSON.stringify({ title })
      );

      setLists((prev) => [...prev, response?.data.data]);
      setTitle('');
    } catch (error) {
      setError(setErrorModal(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative border-2 border-solid border border-black rounded mt-0">
        <input
          type="text"
          placeholder="New list name"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
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
