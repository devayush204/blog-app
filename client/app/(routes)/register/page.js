"use client"
import { Auth, db } from '@/models/Firebase_config';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const register = () => {
  const router = useRouter();

  // const [username, setusername] = useState('');  //this one is used to when we use mongodb for storage
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  //this one is used to when we use mongodb for storage
  // const registerInfo = async (e) => {
  //   e.preventDefault();

  //   const response = await fetch('http://localhost:6969/register', {
  //     method: 'POST',
  //     body: JSON.stringify({username, password}),
  //     headers: {
  //         'Content-Type':'application/json'
  //     }
  // })


  // }


   //function to generate random srting
  //  const generateRandomString = () => {
  //   const characters = "ABCDEFGHIJKLOMONOPjdjshdjshdj1878327831";
  //   let result = '';
  //   for (let i = 0; i < 10; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length));
  //   }
  //   return result;
  // }


    //function for logging in user the first time
    const registerUserInfo = async (e) => {
      e.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(Auth, Email, password);
        const userId = userCredential.user.uid;
        // const id = generateRandomString().toString(); // generate id here
        console.log(userCredential);
        await saveToFirestore(Email, password, userId);
        router.push('/post');
      } catch (error) {
        console.error(error);
      }
    };
  
    //saving user info to firestore
    const saveToFirestore = async (Email, password, userId) => {
      const userDocRef = doc(db, "Users", userId);
      try {
        // Add user data
        await setDoc(userDocRef, {
          Email:Email,
          password:password,
          id:userId
        });
      } catch (error) {
        console.error("Error saving to Firestore:", error);
      }
    };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg flex flex-col gap-4">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Start writing Blogs</h1>



          
            <p className="text-center text-lg font-medium">Sign in to your account</p>

            <div>
              <label  className="sr-only">Email</label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={Email}
                  onChange={(e) => { setEmail(e.target.value) }}
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
              <label className="sr-only">Password</label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
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
              onClick={registerUserInfo}
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have account!
              <a className="underline" href="#">Login </a>
            </p>
          
        </div>
      </div>
    </section>
  )
}

export default register