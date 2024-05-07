"use client"
import { Auth, db } from '@/models/Firebase_config';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import DetailedPost from '../(pages)/post/_components/DetailedPost';

const GridPost = () => {

    // states 
    const [posts, setPosts] = useState([]);
    const [profilePic, setProfilePic] = useState([]);
    const [userName, setUserName] = useState([]);
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

    const fetchUserData = async () => {
        try {
            const usersCollectionRef = collection(db, 'Users');
            const usersCollectionSnapshot = await getDocs(usersCollectionRef);
            const userData = usersCollectionSnapshot.docs.map(userDoc => ({ id: userDoc.id, ...userDoc.data() }));
            if (userData.length > 0) {
                const firstUser = userData[0];
                setUserName(firstUser.Email.split('@')[0]);
                setProfilePic(firstUser.profileImg);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
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

    // Utility function to truncate text after a certain number of words and add an ellipsis
    const truncateText = (text, maxWords) => {
        // Split the text into an array of words
        const words = text.split(/\s+/);

        // Truncate the array to the maximum number of words
        const truncatedWords = words.slice(0, maxWords);

        // Check if the truncated words array has less words than the original text
        if (truncatedWords.length < words.length) {
            // If true, add an ellipsis to the last word
            truncatedWords[truncatedWords.length - 1] += '...';
        }

        // Join the truncated words back into a string, preserving line breaks
        const truncatedText = truncatedWords.join(' ');

        return truncatedText;
    };
    return (
        <section>
            {/* <button onClick={fetchUserData} >clockcd</button> */}
            <div className='grid grid-cols-1 md:grid-cols-3 overflow-hidden gap-8'>
                {posts.map(post => (
                    <div onClick={() => openModal(post)} className='w-full flex flex-col justify-cen cursor-pointer gap-4 border border-t-zinc-300 rounded-xl p-2 overflow-hidden hover:scale-110 transition-all' key={post.id}>
                        <div className='w-full '>
                            <Image className='object-cover h-[200px] w-full rounded-xl' width={900} height={900} src={post.fileUrl} alt='img' />
                        </div>
                        <div>
                            <p className='text-blue-500 text-xs ml-3 font-semibold  capitalize'>{post?.category}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className="text-xl font-semibold truncate whitespace-normal">
                                {truncateText(post.title, 15)}
                            </h2>
                            <div className='flex gap-2'>
                                {/* <div className='flex gap-2'>
                                    <Image className='w-8 rounded-full' alt='profileImg' width={500} height={500} src={profilePic} />
                                    <p>{userName}</p>
                                </div> */}
                                <p className='text-[12px] font-light'>{post.createdAt}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <DetailedPost post={selectedPost} isOpen={isModalOpen} onClose={closeModal} ref={modalRef} />

        </section>
    )
}

export default GridPost