import React from 'react'


const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-2 md:px-60'>
      <div className="logo flex items-center">
        <span className='font-bold text-xl mx-10 '>iTask</span>
      </div>
      <ul className='flex gap-10 mx-20'>
        <a href="#home"><li className='cursor-pointer hover:font-bold transition-all'>Home</li></a>
        <a href="#task"><li className='cursor-pointer hover:font-bold transition-all'>Your-Task</li></a>
      </ul>
    </nav>
  )
}

export default Navbar
