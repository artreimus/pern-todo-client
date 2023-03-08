import React, { useState, FunctionComponent } from 'react';
import { AiOutlineCalendar, AiOutlinePlus } from 'react-icons/ai';
import { ToDoType } from './list';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import setErrorModal from '@/utils/setErrorModal';
import useModal from '@/hooks/useModal';

type ToDoInputProps = {
  setTodos: (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => void;
  list_id: number | null;
};

const ToDoInput: React.FC<ToDoInputProps> = ({ setTodos, list_id }) => {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<null | Date>(null);

  const { setError } = useModal();

  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!description) {
        throw new Error('Please provide todo description');
      }

      const response = await axiosPrivate.post(
        'todos',
        JSON.stringify({
          description,
          list_id,
          due_date: dueDate
            ? new Date(dueDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : dueDate,
        })
      );

      setTodos((prev) => [...prev, response.data.data]);
      setDescription('');
      setDueDate(null);
    } catch (error) {
      setError(setErrorModal(error));
    }
  };

  const ReactDatePickerInput = React.forwardRef<
    HTMLInputElement,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >((props, ref) => (
    <input
      ref={ref}
      {...props}
      id="date-picker"
      className="bg-transparent hidden"
    />
  ));

  ReactDatePickerInput.displayName = 'ReactDatePickerInput';

  return (
    <form className="col-span-2" onSubmit={handleSubmit}>
      <div className="border-2 border-solid border-black rounded flex flex-col py-2">
        <div className="flex relative">
          <div className="w-full mr-5">
            <input
              type="text"
              placeholder="New list name"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              minLength={1}
              maxLength={100}
              className="h-5 pt-1 pb-2 pl-3  w-full focus:outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center text-xl ml-auto mr-5">
            <DatePicker
              selected={dueDate}
              onSelect={(date: Date) =>
                setDueDate((prev) => {
                  if (prev?.getTime() === date.getTime()) {
                    return null;
                  }
                  return date;
                })
              }
              onChange={() => {}}
              customInput={<ReactDatePickerInput />}
            ></DatePicker>
            <label htmlFor="date-picker" className="text-lg mr-4">
              <AiOutlineCalendar />
            </label>
            <button type="submit">
              <AiOutlinePlus />
            </button>
          </div>
        </div>
        {dueDate && (
          <div className="text-xs pl-3 font-semibold">
            {dueDate.toDateString()}
          </div>
        )}
      </div>
    </form>
  );
};
export default ToDoInput;
