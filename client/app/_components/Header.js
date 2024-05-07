"use client"
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import { useAuthState } from "react-firebase-hooks/auth"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Auth } from '@/models/Firebase_config'
import logo from '../../public/logo2.png'
import logo2 from '../../public/logo.png'

const Header = () => {
    const [user] = useAuthState(Auth)
    const router = useRouter()

    const logOut = async () => {
        await signOut(Auth)
        router.push("/register")
    }

    const data = [
        {
            "id": 1,
            "title": "home"
        },
        {
            "id": 2,
            "title": "blogs"
        },
        {
            "id": 3,
            "title": "about"
        },
        {
            "id": 4,
            "title": "contact"
        },
    ]

    
    return (
        <div className="flex justify-between items-center px-10 md:px-20s">
            <div className="md:block hidden">
                <a href="/">
                    <Image className='object-contain w-[150px]  ' src={logo2} width={300} height={300} alt="Logo" />
                </a>
            </div>

            <div >
                <p className="font-bold text-[40px] hidden">Blogs Here</p>
            </div>

            <div className='hidden md:block '>
                <ul className='flex px-5 items-center justify-center'>
                    {data.map((item, index) => (
                        <li className='capitalize px-5 text-lg font-semibold text-black/80' key={item.id}>{item.title}</li>
                    ))}
                </ul>
            </div>

            <div className='hiddin md:block'>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search"  className="block w-full px-4 py-2.5 ps-10 text-sm text-gray-800 outline-none  rounded-full bg-zinc-100 " placeholder="Search Post"  />
                </div>
            </div>


            {user ?
                <div className='flex gap-10 items-center'>
                    <div className='flex items-center'>
                        <Image src={"/user.jpg"} width={500} height={500} className='w-[50px] h-[50px] rounded-full ' alt="logo" />
                        <Link className='whitespace-nowrap capitalize' href={'/profile'}>
                            {(user?.email && user?.email.split('@')[0])}
                        </Link>
                    </div>
                    <button
                        onClick={logOut}
                        className='bg-black rounded-full text-white px-5 py-2'>
                        Logout
                    </button>
                </div>
                :
                <div className="flex gap-4 text-[17px]">
                    <Link href={"/register"}>
                        <button className="bg-purple-500 rounded-full text-white font-semibold py-2 px-4">Register</button>
                    </Link>
                    <Link href={"/login"}>
                        <button className="bg-purple-500 rounded-full text-white font-semibold py-2 px-4" >Login</button>
                    </Link>
                </div>
            }
        </div>

    )
}

export default Header