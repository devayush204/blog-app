"use client"
import TextEditor from '@/app/_components/TextEditor';
import React, { useState } from 'react'
const NewPost = ({setContent}) => {
    const [title, setTitle] = useState('');
    const [summmary, setSummary] = useState('');
    

    return (

        <section className='flex flex-col justify-center mt-10'>
            <form className='flex flex-col gap-4'>
                <input value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    className='border px-5 py-2 text-[18px]'
                    type="text"
                    placeholder='Title' />
                <input value={summmary}
                    onChange={(e) => { setSummary(e.target.value) }}
                    className='border px-5 py-2 text-[18px]'
                    type="text" placeholder='Summary' />
                <input className='border px-5 py-2 text-[18px]' type="file" />
                <div className='flex flex-col '>
                    <p className='text-[18px] font-semibold '>Start writing...😁</p>
                    <TextEditor setContent={setContent} />
                </div>
                <div className='text-center'>
                    <button  className='px-5 py-2 bg-black rounded-full text-white hover:bg-zinc-600'>Create Post</button>
                </div>
            </form>
        </section>
    )
}

export default NewPost