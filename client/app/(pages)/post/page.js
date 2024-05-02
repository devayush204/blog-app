"use client"
import PostCarousel from '@/app/_components/PostCarousel';
import { Auth, db } from '@/models/Firebase_config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import DetailedPost from './_components/DetailedPost';

const Post = () => {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  const fetchDataFromFirestore = async () => {
    try {
      const usersCollectionRef = collection(db, 'Users');
      const usersCollectionSnapshot = await getDocs(usersCollectionRef);
      const userData = await Promise.all(usersCollectionSnapshot.docs.map(async userDoc => {
        const userId = userDoc.id;
        const userData = userDoc.data();
        const userPostsRef = collection(usersCollectionRef, userId, 'posts');
        const userPostsSnapshot = await getDocs(userPostsRef);
        const postsData = userPostsSnapshot.docs.map(postDoc => ({ id: postDoc.id, ...postDoc.data() }));
        return { id: userId, ...userData, posts: postsData };
      }));
      return { users: userData }; // Return an object containing the users data
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      return { users: [] }; // Return an empty array if an error occurs
    }
  };

  useEffect(() => {
    // Listener for authentication state changes
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData();
      } else {
        // User is not authenticated, handle accordingly
        setPosts([]); // Clear posts data or handle accordingly
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    const { users } = await fetchDataFromFirestore();
    const postsData = users.flatMap(user => user.posts); // Extract posts from users data
    setPosts(postsData);
  };

  const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const modalRef = useRef(null); 

  // Function to open the modal and set the selected post data
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef.current || !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.body.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);


  return (
    <section>
      <section className='flex flex-col mt-4 '>
        <div className='bg-black/5 py-5'>
          <div className='flex items-center justify-center'>
            <p className='text-6xl md:text-3xl xl:text-4xl text-black text-center font-semibold '>Heres the Todays top blogs</p>
          </div>
          <div>
            <PostCarousel />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center px-64 mt-10 overflow-hidden'>
          {posts.map(post => (
            <div onClick={()=> openModal(post)}  className='w-full flex justify-center items-center cursor-pointer gap-4 border-t border-t-zinc-300 py-7 overflow-hidden' key={post.id}>
              <Image width={200} height={200} src={post.fileUrl} alt='img' />
              <div className='flex flex-col gap-2'>
                <h2 className='text-xl font-semibold ' >{post.title}</h2>
                <p className='text-[12px] font-light'>{post.createdAt}</p>
              </div>
            </div>
          ))}
        </div>

      </section>
      <DetailedPost  post={selectedPost} isOpen={isModalOpen} onClose={closeModal} ref={modalRef}  />
      <Link href={'/newpost'}>
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full">
          New Post
        </button>
      </Link>
    </section>
  );
}

export default Post;
