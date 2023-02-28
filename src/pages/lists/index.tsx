import AuthModal from '@/components/auth/modal';
import Nav from '@/components/nav';
import ToDoList from '@/components/todo/List';
import React from 'react';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-200">
      <AuthModal />
      <Nav />
      <main>
        <div>
          <ToDoList />
        </div>
      </main>
    </div>
  );
};
export default Login;
