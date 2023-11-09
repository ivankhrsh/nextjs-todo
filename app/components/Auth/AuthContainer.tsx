import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { LoginForm } from './login/LoginForm';
import { SignUpForm } from './registration/RegistrationForm';
import { FormType } from '@/app/types/FormType.type';
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGithub } from '@/app/firebase/firebaseClient';
import { toast } from 'react-toastify';

const AuthContainer = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormType>(FormType.Login);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await currentUser.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.push("/todos");
          toast.success('Welcome!')
        }
      });
    })
    return () => unsubscribe()
  }, []);


  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      ) : (
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
            onClick={signInWithGithub}
            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Login with Github
          </button>
        </div>
      </div>
      )}
    </div>
  )
};

export default AuthContainer;