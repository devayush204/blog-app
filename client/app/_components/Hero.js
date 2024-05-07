import React from 'react'
import img from '../../public/hero.jpeg'
import Image from 'next/image'
import img2 from '..//../public/user.jpg'

const Hero = () => {
  return (
    <div className='pb-10'>
      <div className='flex  justify-center relative'>
        <Image className='rounded-2xl h-[450px]  object-cover' src={img} width={1000} height={200} alt='img' />

        <div className='p-5 rounded-2xl bg-white absolute -bottom-10 left-[340px] max-w-[35%] shadow-2xl'>
          <div className='flex flex-col gap-4'>
            <div className='flex text-white text-xs '>
              <p className='bg-[#4B6BFB] px-2 rounded-xl py-1'>Technology</p>
            </div>
            <p className='text-3xl font-semibold text-black'>The Impact of Technology on the Workplace: How Technology is Changing</p>
            <div className='flex  items-center gap-3 text-zinc-400'>
              <span className='flex gap-2 items-center justify-center'>
                <Image className='w-8 rounded-full' src={img2} width={500} height={500} alt='img' />
                <p className='text-xs '>Ayush Bhatt</p>
              </span>
              <p className='text-xs '>April 20, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero