import AuthModal from '@/components/auth/modal';
import Nav from '@/components/nav';
import { ListType } from '@/components/nav/list';
import ToDoList, { ToDoType } from '@/components/todo/list';
import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useCloseModalsOnRouteChange from '@/hooks/useCloseModalsOnRoute';
import useModal from '@/hooks/useModal';
import useSortTodos from '@/hooks/useSortTodos';
import setErrorModal from '@/utils/setErrorModal';
import React, { useEffect, useState } from 'react';

const List: React.FC = () => {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [listId, setListId] = useState<null | number>(null);

  const axiosPrivate = useAxiosPrivate();
  const { setError } = useModal();
  const { auth } = useAuth();

  useCloseModalsOnRouteChange();
  useSortTodos(setTodos, todos);

  useEffect(() => {
    const fetchListTodos = async () => {
      try {
        const responseTodo = await axiosPrivate.get(`todos/today`);
        setTodos([...responseTodo.data.data]);
        setListId(responseTodo.data.defaultListId.list_id);
      } catch (error) {
        setError(setErrorModal(error));
      }
    };
    if (auth.user_id) fetchListTodos();
  }, [auth.user_id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-200">
      <AuthModal />
      <Nav />
      <main>
        <div>
          <ToDoList
            list_id={listId}
            todos={todos}
            setTodos={setTodos}
            title={'My Day'}
          />
        </div>
      </main>
    </div>
  );
};
export default List;
