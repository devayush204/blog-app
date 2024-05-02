import Image from 'next/image';
import React from 'react'

const DetailedPost = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;
  return (
    <div  className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center px-40">
      <div className="bg-white p-8 rounded-lg flex gap-5 flex-col ">
        <Image src={post.fileUrl} alt={post.title} width={500} height={300} />
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p>{post.summary}</p>
        <p>{post.content}</p>
        {/* <button className='absolute right-5 top-[40%]' onClick={onClose}>X</button> */}
      </div>
    </div>
  )
}

export default DetailedPost