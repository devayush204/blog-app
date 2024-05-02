import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/models/Firebase_config';
import Image from 'next/image';

const PostCarousel = () => {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchDataFromFirestore = async () => {
            try {
                const testCollectionRef = collection(db, 'Test');
                const testCollectionSnapshot = await getDocs(testCollectionRef);
                const testData = testCollectionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(testData);
            } catch (error) {
                console.error("Error fetching data from Firestore:", error);
            }
        };

        fetchDataFromFirestore();
    }, []);

    // Function to handle automatic sliding after 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex + 1) % items.length);
        }, 10000); // Slide every 5 seconds

        return () => clearInterval(intervalId);
    }, [items]);

    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex   transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {items.map((item, index) => (
                    <div key={index} className="w-full  py-5  flex-shrink-0 justify-center items-center  flex flex-col gap-4 px-32">

                        <Image className='w-[65vw] h-[300px]' src={item.fileUrl} width={500} alt='img' height={500} />
                        <div className='flex flex-col w-[65vw]   '>
                            <p className='text-xl font-semibold capitalize truncate' style={{ maxWidth: '50em' }}>{item.title}</p>
                            <p className='text-xs capitalize font-light '>{item.createdAt}</p>
                        </div>
                    </div>


                ))}
            </div>

        </div>
    );
}

export default PostCarousel;
