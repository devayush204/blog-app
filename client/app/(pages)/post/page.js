"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Hero from '@/app/_components/Hero';
import Advertisement from '@/app/_components/Advertisement';
import GridPost from '@/app/_components/GridPost';

const Post = () => {

  return (
    <section>
      <section className='flex flex-col mt-4 '>
        <div className='py-10'>
          <Hero />
        </div>

        <Advertisement />
        <div className='px-5 md:px-44 mt-10'>
          <p className='text-2xl font-semibold my-3' >Latest Blogs</p>
          <GridPost />
        </div>
        <div className='flex justify-center items-center my-5'>
          <Link href={'/post'} className='px-4 py-2 border border-gray-300 rounded-lg hover:text-black/70 hover:bg-zinc-200 text-black/50'>View all posts</Link>
        </div>
        <Advertisement />

      </section>
      <Link href={'/newpost'}>
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-4 rounded-full">
          New Post
        </button>
      </Link>
    </section>
  );
}

export default Post;
