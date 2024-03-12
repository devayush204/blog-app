"use client"
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import { useAuthState } from "react-firebase-hooks/auth"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Auth } from '@/models/Firebase_config'

const Header = () => {
    const [user] = useAuthState(Auth)
    const router = useRouter()

    const logOut = async () => {
        await signOut(Auth)
        router.push("/register")
    }
    return (
        <div className="flex justify-between items-center">
            <div className="md:block hidden">
                <a href="/">
                    <Image src={"/logo.png"} width={180} height={130} alt="Logo" />
                </a>
            </div>

            <div >
                <p className="font-bold text-[40px]">Blogs Here</p>
            </div>


            {user ?
                <div className='flex gap-10 items-center'>
                    <div className='flex items-center'>
                        <img src={"/user.jpg"} className='w-[50px] h-[50px] rounded-full ' alt="logo" />
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