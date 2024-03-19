"use client"
import TextEditor from '@/app/_components/TextEditor';
import { Auth, db } from '@/models/Firebase_config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
const NewPost = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    // Handle content change from the TextEditor component
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const savePostInfo = async (e) => {
        e.preventDefault();
        try {
            // Check if the user is authenticated
            const user = Auth.currentUser;
            if (user) {
                // Retrieve user info from Firestore
                const userId = user.uid;
                console.log("User ID:", userId); // Add this line for debugging
                const userDocRef = doc(db, "Users", userId);
                console.log("User Document Reference:", userDocRef); // Add this line for debugging
                const userDocSnap = await getDoc(userDocRef);
                console.log("User Document Snapshot:", userDocSnap); // Add this line for debugging
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
    
                    // Concatenate post info with user info
                    const postInfo = {
                        title: title,
                        summary: summary,
                        content: content,
                    };
    
                    // Save post info to Firestore
                    await updateDoc(doc(db, "Users",userId ), postInfo); // Adjust the document path accordingly
    
                    // Redirect to post page or do other actions
                    router.push('/post');
                } else {
                    alert("User document does not exist");
                }
            } else {
                // Handle case where user is not authenticated
                alert("User is not authenticated");
            }
        } catch (error) {
            console.error("Error saving post info:", error);
        }
    };
    


    return (

        <section className='flex flex-col justify-center mt-10 px-20'>
            <form className='flex flex-col gap-4'>
                <input value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    className='border px-5 py-2 text-[18px]'
                    type="text"
                    placeholder='Title' />
                <input value={summary}
                    onChange={(e) => { setSummary(e.target.value) }}
                    className='border px-5 py-2 text-[18px]'
                    type="text" placeholder='Summary' />
                <input className='border px-5 py-2 text-[18px]' type="file" />
                <div className='flex flex-col mt-6 '>
                    <p className='text-[18px] font-semibold '>Start writing...😁</p>
                    <TextEditor  onChange={handleContentChange} />
                </div>
                <div className='text-center'>
                    <button onClick={savePostInfo} className='px-5 py-2 bg-black rounded-full text-white hover:bg-zinc-600'>Create Post</button>
                </div>
            </form>
        </section>
    )
}

export default NewPost