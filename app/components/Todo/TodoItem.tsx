'use client'
import React, { FC, useState, useEffect } from 'react';
import { Todo } from '../../types/Todo.type';
import { EditTodo } from './EditTodo';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseClient';
import { revalidateTag } from 'next/cache';

interface Props {
  todo: Todo;
  toggleComplete: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  updateTodo: (title: string, description: string, todoId: string) => void;
}

const styles = {
  container: "bg-white shadow-md p-4 rounded-md mb-2 w-9/12 flex justify-between items-center",
  title: "cursor-pointer text-xl font-semibold mb-2",
  description: "text-gray-700",
  date: "text-gray-400",
  editButton: "px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
  deleteButton: "px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600",
};

const TodoItem: FC<Props> = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { title, description, completed, createdAt } = todo;

  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleDelete = () => {
    deleteTodo(todo);
  };

  const handleToggle = () => {
    toggleComplete(todo);
  };


  if (isEditing) {
    return (
      <div className={styles.container}>
        <EditTodo todo={todo} toggleEditing={toggleEditing} updateTodo={updateTodo} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 mb-2 cursor-pointer"
            checked={completed}
            onChange={handleToggle}
          />
          <h2
            className={`cursor-pointer text-xl font-semibold mb-2 ${completed ? 'line-through' : ''} ${styles.title}`}
            onClick={handleToggle}
          >
            {title}
          </h2>
        </div>
        <p className={styles.description}>{description}</p>
        <p className={styles.date}>{createdAt}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={toggleEditing} className={styles.editButton}>
          Edit
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
