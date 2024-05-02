"use client"
import React, { useState } from 'react';
import { Auth, db, storage } from '@/models/Firebase_config';
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextEditor from '@/app/_components/TextEditor';
import { useRouter } from 'next/navigation';

const NewPost = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null); // State to hold the selected file
    const [progress, setProgress] = useState(0); // State to track upload progress

    // Handle content change from the TextEditor component
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const fileUpload = (file) => {
        const storageRef = ref(storage, 'file-upload/' + file?.name);
        const uploadTask = uploadBytesResumable(storageRef, file, file?.type);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress);
                if (progress === 100) {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => savePostInfo(file, downloadURL))
                        .catch(error => console.error('Error:', error));
                }
            },
            (error) => {
                console.error('Upload error:', error);
                toast.error('Upload error: ' + error.message);
            },
            () => {
                console.log('Upload complete');
            }
        );
    };


    const savePostInfo = async (file, fileUrl) => {
        try {
            // Check if the user is authenticated
            const user = Auth.currentUser;
            if (user) {
                // Retrieve user info from Firestore
                const userId = user.uid;
                const userDocRef = doc(db, "Users", userId);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const currentDate = new Date();
                    const options = { day: 'numeric', month: 'short', year: 'numeric' };
                    const formattedDate = currentDate.toLocaleDateString('en-US', options);


                    // Concatenate post info with user info
                    const postInfo = {
                        title: title,
                        summary: summary,
                        content: content,
                        fileName: file?.name, // Add the file name to the post info
                        fileUrl: fileUrl, // Add the file URL to the post info
                        createdAt: formattedDate // Add the created timestamp
                    };

                    // Save post info to Firestore
                    const userPostsRef = collection(userDocRef, 'posts');
                    await addDoc(userPostsRef, postInfo);
                    console.log("Post info saved successfully");

                    toast.success("Your blog has been saved");

                    // Redirect to post page or do other actions
                    router.push('/post');
                } else {
                    // alert("User document does not exist");
                    toast.error("User documents not found..signup first");
                }
            } else {
                // Handle case where user is not authenticated
                alert("User is not authenticated");
                toast.error("You've to login first!..to upload such blogs");
            }
        } catch (error) {
            console.error("Error saving post info:", error);
            toast.error("Error saving post info");
        }
    };

    const MAX_TITLE_WORDS = 15;
    const MAX_SUMMARY_WORDS = 25;
    const MAX_CONTENT_WORDS = 50;
    

    const handleSavePost = (e) => {
        e.preventDefault();
        
        // Check word count for title
        const titleWords = title.trim().split(/\s+/).length;
        if (titleWords < MAX_TITLE_WORDS) {
            return toast.error("Title should not exceed 50 words");
        }
    
        // Check word count for summary
        const summaryWords = summary.trim().split(/\s+/).length;
        if (summaryWords < MAX_SUMMARY_WORDS) {
            return toast.error("Summary should not exceed 50 words");
        }
    
        // Check word count for content
        const contentWords = content.trim().split(/\s+/).length;
        if (contentWords < MAX_CONTENT_WORDS) {
            return toast.error("Content should not exceed 50 words");
        }
    
        // Proceed with saving the post
        if (file) {
            fileUpload(file);
        } else {
            savePostInfo(null, '');
        }
    };

    return (
        <section className='flex flex-col justify-center mt-10 px-20'>
            <form className='flex flex-col gap-4'>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className='border px-5 py-2 text-[18px]' type="text" placeholder='Title' />
                <input value={summary} onChange={(e) => setSummary(e.target.value)} className='border px-5 py-2 text-[18px]' type="text" placeholder='Summary' />
                <input onChange={handleFileChange} className='border px-5 py-2 text-[18px]' type="file" />
                <div className='flex flex-col mt-6 '>
                    <p className='text-[18px] font-semibold '>Start writing...😁</p>
                    <TextEditor onChange={handleContentChange} />
                </div>
                <div className='text-center'>
                    <button onClick={handleSavePost} className='px-5 py-2 bg-black rounded-full text-white hover:bg-zinc-600'>Create Post</button>
                </div>
            </form>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    );
};

export default NewPost;
