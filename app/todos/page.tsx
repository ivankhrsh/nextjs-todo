import React from 'react'
import TodoList from '../components/Todo/TodoList';

const Todos = () => {
  return (
    <main className='flex gap-1 flex-col items-center justify-between'>
      <TodoList />
    </main>
  )
}

export default Todos;