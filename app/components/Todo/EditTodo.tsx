// 'use client'

import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import { validationSchema } from './validationSchema';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseClient';
import { Todo } from '@/app/types/Todo.type';
import { revalidateTag } from 'next/cache';

interface Props {
  todo: Todo;
  toggleEditing: () => void;
  updateTodo: (title: string, description: string, todoId: string) => void;
}

const styles = {
  label: 'block text-gray-700 text-sm font-bold mb-2',
  input: 'w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500',
  error: 'text-red-500',
  button: 'w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300',
  cancelButton: 'px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600',
};

export const EditTodo: FC<Props> = ({ todo, toggleEditing, updateTodo }) => {
  return (
    <Formik
      initialValues={{
        title: todo.title,
        description: todo.description,
      }}
      validationSchema={validationSchema}
      onSubmit={({ title, description }) => {
        updateTodo(title, description, todo.id);
        toggleEditing();
      }}
    >
      {() => (
        <Form className='w-full mb-4'>
          <div className="mb-4">
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              className={styles.input}
            />
            <ErrorMessage name="title" component="div" className={styles.error} />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <Field
              id="description"
              name="description"
              type="text"
              className={styles.input}
            />
            <ErrorMessage name="description" component="div" className={styles.error} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="submit"
              className={styles.button}
            >
              Submit
            </button>
            <button onClick={toggleEditing} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
