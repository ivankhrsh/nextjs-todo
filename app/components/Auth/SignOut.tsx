'use client'
import React from 'react'
import { toast } from 'react-toastify';
import { auth } from '@/app/firebase/firebaseClient';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();
  async function signOutUser() {
    //Sign out with the Firebase client
    await signOut(auth);

    //Clear the cookies in the server
    const response = await fetch("http://localhost:3000/api/signOut", {
      method: "POST",
    });

    if (response.status === 200) {
      router.push("/");
      toast.info('Sign out successfully')
    }
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className='w-9/12 flex justify-end mb-4'>
        <button 
           className="mt-4 bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={signOutUser}
          >
            Sign Out
        </button>
      </div>
    </div>
  )
}

export default SignOut;