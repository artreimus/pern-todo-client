import AuthModal from '@/components/auth/modal';
import Nav from '@/components/nav';
import { ListType } from '@/components/nav/list';
import ToDoList, { ToDoType } from '@/components/todo/list';
import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useCloseModalsOnRouteChange from '@/hooks/useCloseModalsOnRoute';
import useEndSkeletonLoaderOnRouteChange from '@/hooks/useEndSkeletonLoaderOnRouteChange';
import useModal from '@/hooks/useModal';
import useSkeleton from '@/hooks/useSkeleton';
import useSortTodos from '@/hooks/useSortTodos';
import setErrorModal from '@/utils/setErrorModal';
import React, { useEffect, useState } from 'react';

const List: React.FC = () => {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [listId, setListId] = useState<null | number>(null);

  const axiosPrivate = useAxiosPrivate();
  const { setError } = useModal();
  const { auth } = useAuth();

  const { setListLoading } = useSkeleton();

  useCloseModalsOnRouteChange();
  useEndSkeletonLoaderOnRouteChange();
  useSortTodos(setTodos, todos);

  useEffect(() => {
    const fetchListTodos = async () => {
      try {
        setListLoading(true);
        const responseTodo = await axiosPrivate.get(`todos/today`);
        setTodos([...responseTodo.data.data]);
        setListId(responseTodo.data.defaultListId.list_id);
      } catch (error) {
        setError(setErrorModal(error));
        setListLoading(true);
      } finally {
        setListLoading(false);
      }
    };
    if (auth.user_id) fetchListTodos();
  }, [auth.user_id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-200">
      <AuthModal />
      <Nav />
      <main>
        <ToDoList
          list_id={listId}
          todos={todos}
          setTodos={setTodos}
          title={'My Day'}
        />
      </main>
    </div>
  );
};
export default List;
