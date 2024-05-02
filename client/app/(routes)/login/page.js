"use client"
import { Auth, db } from '@/models/Firebase_config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const login = () => {

  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loginInProgress, setLoginInProgress] = useState(false)

  // Function to check user credentials in Firestore
 const checkUserCredentials = async (email, password) => {
  const usersCollectionRef = collection(db, 'Users');
  const querySnapshot = await getDocs(query(usersCollectionRef, where('Email', '==', email)));

  if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Verify the password (you may need to implement your own logic for this)
      if (userData.password === password) {
          return true; // Credentials are valid
      }
  }

  return false; // Credentials are invalid
};

// Signing in with email and password
const signInPassword = async (e) => {
  e.preventDefault();

  try {
      // setLoginInProgress(true);

      // Check user credentials in Firestore
      const isValidCredentials = await checkUserCredentials(email, password);

      if (isValidCredentials) {
          // If credentials are valid, sign in with Firebase Auth
          await signInWithEmailAndPassword(Auth, email, password);
          toast.success("You have successfully logged in!");
          router.push('/post');
          console.log('Signed in successfully');
      } else {
          console.log('Invalid credentials');
          toast.error("The provided credentials were not recognized.");
      }
  } catch (err) {
      console.error(err);
  } 
  // finally {
  //     setLoginInProgress(false);
  // }
};
  return (
    <section>
       <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Your pending Blogs</h1>

          

          <div  className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Sign in to your account</p>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              onClick={signInPassword}
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?
              <a className="underline" href="#">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default login