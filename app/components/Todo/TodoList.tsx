import React from 'react'
import TodoItem from './TodoItem'
import { Timestamp, addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseClient';
import { revalidatePath, revalidateTag } from 'next/cache'
import { Todo } from '../../types/Todo.type';
import AddTodo from './AddTodo';
import SignOut from '../Auth/SignOut';
import { initAdmin } from '@/app/firebase/firebaseAdmin';
import { getTodos } from '@/app/firebase/firebaseGetData';
// import { getTodos } from '@/app/firebase/firebaseGetData';
// import { initAdmin } from '@/app/firebase/firebaseAdmin';

export default async function TodoList() {
  // fetch from api and then revalidate with revalidateTag('todos') 
  // works well on local, but got problems at build
  async function fetchTodos() {
    // revalidate: 60 means revalidate each 1 minute
    const res = await fetch(`${process.env.PROJECT_URL}/api/todos`, {
      method: "GET",
      next: {tags: ['todos']},
      // next: {tags: ['todos'], revalidate: 60},
    });
    
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error(`Failed to fetch data. Status code: ${res.status}`);
    }
  }
  const todos: Todo[] = await fetchTodos();

  // await initAdmin();
  // let todos = await getTodos();
  console.log(todos);

  const toggleComplete = async (todo: Todo) => {
    'use server'
    await updateDoc(doc(db, 'todos', todo.id), {
      completed:!todo.completed
    })
    revalidateTag('todos');
    //  revalidatePath(`${process.env.PROJECT_URL}/`);
  };

  const deleteTodo = async (todo: Todo) => {
    'use server'
    await deleteDoc(doc(db, 'todos', todo.id));
    //  revalidatePath(`${process.env.PROJECT_URL}/`);
     revalidateTag('todos');
  };

  const handleAddTodo = async (title: string, description: string) => {
    'use server'
    const currentTimestamp = Timestamp.fromDate(new Date());
    await addDoc(collection(db, 'todos'), {
      title,
      description,
      completed: false,
      createdAt: currentTimestamp,
    });
    //  revalidatePath(`${process.env.PROJECT_URL}/`);
    revalidateTag('todos');
  };

  const handleUpdateTodo = async (title: string, description: string, todoId: string) => {
    'use server'
    const currentTimestamp = Timestamp.fromDate(new Date());
    await updateDoc(doc(db, 'todos', todoId), {
      title,
      description,
      createdAt: currentTimestamp,
    });
    //  revalidatePath(`${process.env.PROJECT_URL}/`);
    revalidateTag('todos');
  };

  return (
    <>
      <SignOut/>
      <AddTodo addTodo={handleAddTodo}/>
      {todos.length !== 0 && todos.map((todo) => (
        <TodoItem 
          todo={todo as Todo} 
          key={todo.id} 
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodo={handleUpdateTodo}
        />
      ))}
    </>
  )
}