'use client'

import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo';
import SignOut from '../Auth/SignOut';
import TodoItem from './TodoItem';
import { Todo } from '@/app/types/Todo.type';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseClient';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function fetchTodos()  {
    const q = query(collection(db, 'todos'), orderBy('creationTime', 'desc'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const todosArr: Todo[] = [];
      QuerySnapshot.forEach((todo) => {
        const createdAt = new Date(todo.data().creationTime.seconds * 1000)
          .toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

        todosArr.push(
          { ...todo.data(),
            title: todo.data().title,
            description: todo.data().description,
            completed: todo.data().completed,
            createdAt, 
            id: todo.id})
      })
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }

  useEffect(() => {
    fetchTodos();
  },[]);

  return (
    <>
      <SignOut/>
      <AddTodo/>
      {todos.length !== 0 && todos.map((todo) => (
        <TodoItem 
          todo={todo as Todo} 
          key={todo.id}
        />
      ))}
    </>
  )
}