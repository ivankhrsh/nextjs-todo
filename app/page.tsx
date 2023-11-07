'use client';

import Header from './components/Header';
import TodoList from './components/Todo/TodoList';
import { UserAuth } from './context/AuthContextProvider';

export default function Home() {
  const { user } = UserAuth();

  const styles = {
    main: "flex gap-1 flex-col items-center justify-between",
    title: "text-2xl p-4",
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Todo app ✅</h1>
      <Header />
      {user && <TodoList />}
    </main>
  );
}
