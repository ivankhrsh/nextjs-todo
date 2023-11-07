import { validationSchema } from './validationSchema';
import { UserAuth } from '@/app/context/AuthContextProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const styles = {
  inputContainer: 'mb-4',
  label: 'block text-gray-700 text-sm font-bold mb-2',
  input: 'w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500',
  error: 'text-red-500',
  button: 'w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300',
};

export const LoginForm = () => {
  const { signInWithEmail } = UserAuth();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={({ email, password }) => {
        signInWithEmail(email, password);
      }}
    >
      {() => (
        <Form>
          <div className={styles.inputContainer}>
            <div className={styles.label}>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="text"
                className={styles.input}
              />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <div className={styles.label}>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={styles.input}
              />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
