'use client'

import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import { validationSchema } from './validationSchema';
import { handleAddTodo } from '@/app/firebase/firebaseActions';

const styles = {
  label: 'block text-gray-700 text-sm font-bold mb-2',
  input: 'w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500',
  error: 'text-red-500',
  button: 'w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300',
};

const AddTodo: FC = () => {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
      }}
      validationSchema={validationSchema}
      onSubmit={({ title, description }, { resetForm }) => {
        handleAddTodo(title, description)
        resetForm();
      }}
    >
      {() => (
        <Form className='w-9/12 mb-4'>
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={styles.button}
            >
              Add New Todo
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTodo;