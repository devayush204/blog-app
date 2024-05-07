import Image from 'next/image';
import React from 'react'

const DetailedPost = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;
  const stripHtmlTags = (htmlString) => {
    // Define a regular expression to match HTML tags
    const htmlTagRegex = /<[^>]*>/g;
    
    // Remove HTML tags from the string using replace method with an empty string
    const strippedString = htmlString.replace(htmlTagRegex, '');

    return strippedString;
};

// Usage example:
const renderPostContent = (content) => {
    const contentWithoutHtmlTags = stripHtmlTags(content);
    return <p>{contentWithoutHtmlTags}</p>;
};
  return (
    <div  className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center px-40 overflow-y-scroll">
      <div className="bg-white p-8 rounded-lg flex gap-5 flex-col ">
        <Image src={post.fileUrl} alt={post.title} width={500} height={300} />
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p>{post.summary}</p>
        <p>{renderPostContent(post.content)}</p>
        {/* <button className='absolute right-5 top-[40%]' onClick={onClose}>X</button> */}
      </div>
    </div>
  )
}

export default DetailedPost