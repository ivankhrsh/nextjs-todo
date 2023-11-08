import React from 'react'
import TodoItem from './TodoItem'
import { Timestamp, addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseClient';
import { revalidateTag } from 'next/cache'
import { Todo } from '../../types/Todo.type';
import AddTodo from './AddTodo';
import SignOut from '../Auth/SignOut';

export default async function TodoList() {
  async function fetchTodos() {
    // revalidate: 360 means revalidate each 10 minutes
    const res = await fetch("http://localhost:3000/api/todos", {
      next: {tags: ['todos'], revalidate: 360},
      method: "GET", 
    });
    
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error(`Failed to fetch data. Status code: ${res.status}`);
    }
  }

  const todos: Todo[] = await fetchTodos();
  

  const toggleComplete = async (todo: Todo) => {
    'use server'
    await updateDoc(doc(db, 'todos', todo.id), {
      completed:!todo.completed
    });
    revalidateTag('todos');
  };

  const deleteTodo = async (todo: Todo) => {
    'use server'
    await deleteDoc(doc(db, 'todos', todo.id));
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