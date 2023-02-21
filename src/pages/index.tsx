import Head from 'next/head';
import ToDoList from '@/components/todo/List';
import Nav from '@/components/nav';

export default function Home() {
  return (
    <>
      <Head>
        <title>iDo</title>
        <meta name="description" content="To do list application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="grid grid-cols-1 sm:grid-cols-200">
          <Nav />
          <main>
            <div>
              <ToDoList />
            </div>
          </main>
        </div>
      </>
    </>
  );
}
