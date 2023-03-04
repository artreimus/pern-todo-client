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
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const List: React.FC = () => {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [list, setList] = useState<ListType | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const { setError } = useModal();
  const { auth } = useAuth();

  const router = useRouter();
  const { id } = router.query;
  const listId = Number(id);

  useCloseModalsOnRouteChange();
  useSortTodos(setTodos, todos);

  useEffect(() => {
    const fetchListTodos = async () => {
      try {
        const responseList = await axiosPrivate.get(`/lists/${listId}`);
        setList(responseList.data.data[0]);
        const responseTodo = await axiosPrivate.get(`todos/list/${listId}`);
        setTodos([...responseTodo.data.data]);
      } catch (error) {
        setError(setErrorModal(error));
      }
    };
    if (listId && auth.user_id) fetchListTodos();
  }, [listId, auth.user_id]);

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
            title={list?.title}
          />
        </div>
      </main>
    </div>
  );
};
export default List;
