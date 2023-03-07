import React, { useEffect, useState } from 'react';
import AuthModal from '@/components/auth/modal';
import Nav from '@/components/nav';
import ToDoList, { ToDoType } from '@/components/todo/list';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import setErrorModal from '@/utils/setErrorModal';
import { ListType } from '@/components/nav/list';
import useCloseModalsOnRouteChange from '@/hooks/useCloseModalsOnRoute';
import useSortTodos from '@/hooks/useSortTodos';
import SkeletonListLoader from '@/components/skeleton/ListLoader';
import useSkeleton from '@/hooks/useSkeleton';
import useEndSkeletonLoaderOnRouteChange from '@/hooks/useEndSkeletonLoaderOnRouteChange';

const UserList: React.FC = () => {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [listId, setListId] = useState<null | number>(null);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { setError } = useModal();
  const { setListLoading } = useSkeleton();

  useCloseModalsOnRouteChange();
  useEndSkeletonLoaderOnRouteChange();
  useSortTodos(setTodos, todos);

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        setListLoading(true);
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
      } finally {
        setListLoading(false);
      }
    };
    if (auth.user_id) fetchAllTodos();
  }, [auth.user_id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-200">
      <AuthModal />
      <Nav />
      <main>
        <ToDoList list_id={listId} todos={todos} setTodos={setTodos} />
      </main>
    </div>
  );
};
export default UserList;
