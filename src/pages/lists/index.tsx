import React, { useEffect, useState } from 'react';
import AuthModal from '@/components/auth/modal';
import Nav from '@/components/nav';
import ToDoList, { ToDoType } from '@/components/todo/List';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import setErrorModal from '@/utils/setErrorModal';
import { ListType } from '@/components/nav/list';
import useCloseModalsOnRouteChange from '@/hooks/useCloseModalsOnRoute';

const UserList: React.FC = () => {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [listId, setListId] = useState<null | number>(null);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { setError } = useModal();

  useCloseModalsOnRouteChange();

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        // Get user's lists
        const response = await axiosPrivate.get(`lists/user/${auth?.user_id}`);
        // Get all todos from lists
        const lists = response?.data.data;
        const listIds = lists.map((list: ListType) => {
          if (list.default_user_list) setListId(list.list_id);
          return list.list_id;
        });
        let todosArr: ToDoType[] = [];
        for (let i = 0; i < listIds.length; i++) {
          const response = await axiosPrivate.get(`todos/list/${listIds[i]}`);
          todosArr = todosArr.concat(response?.data.data);
        }
        setTodos(todosArr);
      } catch (error) {
        setError(setErrorModal(error));
      }
    };
    if (auth.user_id) fetchAllTodos();
  }, [auth.user_id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-200">
      <AuthModal />
      <Nav />
      <main>
        <div>
          <ToDoList list_id={listId} todos={todos} setTodos={setTodos} />
        </div>
      </main>
    </div>
  );
};
export default UserList;
