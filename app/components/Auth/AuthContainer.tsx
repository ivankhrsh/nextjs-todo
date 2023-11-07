import React, { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContextProvider';
import 'react-toastify/dist/ReactToastify.css';
import { LoginForm } from './login/LoginForm';
import { SignUpForm } from './registration/RegistrationForm';
import { FormType } from '@/app/types/FormType.type';

const Header = () => {
  const { user, gitHubSignIn, logOut, createUser, signInWithEmail } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormType>(FormType.Login);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoading(false);
    }
    checkAuthentication();
  }, [user]);

  return (
    <div className="w-full flex justify-center">
      {loading ? <p>Loading...</p> : !user ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
          {form === FormType.Login &&<LoginForm/>}
          {form === FormType.Register &&<SignUpForm/>}
          <div className='flex g-2 flex-col'>
            {form !== 'login' && <button
              onClick={() => {
                setForm(FormType.Login)
              }}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>}

            {form !== FormType.Register && <button
              onClick={() => {
                setForm(FormType.Register)
              }}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Register
            </button>}

            <button
              onClick={gitHubSignIn}
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
            >
              Login with Github
            </button>
          </div>
        </div>
      ) : (
        <div className='w-9/12 flex justify-end mb-4'>
          <button 
              className="mt-4 bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={logOut}
          >
            Sign Out
          </button>
        </div>

      )}
    </div>
  )
};

export default Header;
