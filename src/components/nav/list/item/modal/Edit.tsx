import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import setErrorModal from '@/utils/setErrorModal';
import useModal from '@/hooks/useModal';
import setSuccessModal from '@/utils/setSuccessModal';
import { ListType } from '../..';

type ListItemModalEditProps = {
  setLists: (value: ListType[] | ((prev: ListType[]) => ListType[])) => void;
  setShow: (value: boolean | ((prev: boolean) => boolean)) => void;
  show: boolean;
  title: string;
  list_id: number;
};

const ListItemModalEdit: React.FC<ListItemModalEditProps> = ({
  title,
  list_id,
  setLists,
  setShow,
  show,
}) => {
  const [editTitle, setEditTitle] = useState(title);

  const { setError, setSuccess } = useModal();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!show) {
      setEditTitle(title);
    }
  }, [show]);

  const handleEdit = async () => {
    try {
      const response = await axiosPrivate.patch(
        `lists/${list_id}`,
        JSON.stringify({
          title: editTitle,
        })
      );

      setLists((prev) =>
        prev.map((item: ListType) => {
          if (item.list_id != list_id) {
            return item;
          }
          return response?.data?.data[0];
        })
      );

      setShow(false);
      setSuccess(setSuccessModal('List edited'));
    } catch (error) {
      setError(setErrorModal(error));
    }
  };

  return (
    <>
      <div className="mb-1" onClick={() => setShow((prev) => !prev)}>
        <div className="cursor-pointer text-gray-700 block px-4 py-1 text-sm">
          Edit
        </div>
      </div>
      {show && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShow(false)}
            ></div>
            <div className="flex items-center min-h-4/5 px-4 py-8">
              <div className="relative w-full p-4 mx-auto bg-white rounded-md shadow-lg max-w-[1000px] w-4/5">
                <div className="sm:flex">
                  <div className="mt-2 w-full">
                    <div className="md:flex items-center flex-col justify-center">
                      <div className="rounded-full border-2 border-green-500 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto text-2xl text-green-600 mb-3">
                        <AiFillEdit />
                      </div>
                      <div className="text-center">
                        <p className="font-bold">Edit your list</p>
                        <p className="text-sm text-gray-700 mt-1 mb-2 text-center">
                          To edit your to-do list, simply select the item you
                          wish to modify and make the necessary changes. Once
                          you've made your updates, be sure to save your changes
                          to ensure they are reflected in your list.
                        </p>
                      </div>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-gray-800 text-sm font-bold mb-1"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        className=" border-2 rounded w-full py-2 px-3 text-black mb-2 text-sm focus:outline-none focus:shadow-outline"
                        id="title"
                        placeholder="title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </div>
                    <div className="text-center md:flex justify-center">
                      <button
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                        onClick={handleEdit}
                      >
                        Edit Title
                      </button>
                      <button
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
                        onClick={() => setShow(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                <></>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ListItemModalEdit;
