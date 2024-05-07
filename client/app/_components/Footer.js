import React from 'react'

const Footer = () => {
  return (
    <div>


      <footer className="bg-zinc-100 mt-20">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
            <div className='flex flex-col gap-4 px-5'>
              <p className='text-black font-semibold'>About</p>
              <p className='text-black/60 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste autem culpa deleniti cum, maxime eius nesciunt aut laudantium iusto excepturi!</p>
              <div>
                <p className='text-black text-sm flex gap-2'>Email: <p className='text-black/50'>ayushbhatt204@gmail.com</p></p>
                <p className='text-black text-sm flex gap-2'>Phone: <p className='text-black/50'>+91 7015842605</p></p>
              </div>
            </div>
            <div>
              <h2 className=" font-semibold text-black uppercase mb-4 ">Quick Links</h2>
              <ul className="flex flex-col gap-4 text-black/60">
                <li className="">
                  <a href="#" className="hover:underline">Home</a>
                </li>
                <li className="">
                  <a href="#" className="hover:underline">About</a>
                </li>
                <li className="">
                  <a href="#" className="hover:underline">Post</a>
                </li>
                <li className="">
                  <a href="#" className="hover:underline">Contact Us</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className=" font-semibold text-black uppercase mb-4 ">Category</h2>
              <ul className="flex flex-col gap-4 text-black/60">
                <li className="">
                  <a href="#" className="hover:underline">Anime</a>
                </li>
                <li className="">
                  <a href="#" className="hover:underline">Sports</a>
                </li>
                <li className="">
                  <a href="#" className="hover:underline">Technology</a>
                </li>
                <li className="">
                  <a href="#" className="hover:underline">Entertaintment</a>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-3 items-center'>
              <p className='text-black font-semibold'>Weekly Newsletter</p>
              <p className='text-black/60 text-sm'>Get blogs articles and offer via email</p>
              <div className="relative mt-4">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 fill-black/70" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input type="text" id="email-address-icon" className="bg-gray-50 border outline-none border-gray-300 text-black/60 text-sm rounded-lg  block w-full ps-10 p-2.5  " placeholder="name@gmail.com"/>
              </div>
              <div className=''>
                <button className='bg-blue-500 text-white text-center py-2 w-full rounded-lg px-[70px]'>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer