import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { db } from '../../firebase/clientApp'
import { query, collection, onSnapshot, QuerySnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { Todo } from '../../types/Todo.type';
import { AddTodo } from './AddTodo';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const todosArr: Todo[] = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id} as Todo)
      })
      setTodos(todosArr)
    });
    return () => unsubscribe();
  },[]);

  const toggleComplete = async (todo: Todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed:!todo.completed
    })
  };

  const deleteTodo = async (todo: Todo) => {
    await deleteDoc(doc(db, 'todos', todo.id))
  };

  return (
    <>
      <AddTodo/>
      {todos && todos.map((todo) => (
        <TodoItem 
          todo={todo} 
          key={todo.id} 
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </>
  )
}