import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed w-full p-8 flex justify-between items-start mix-blend-difference z-2'>
        <div>
            <a href="#">NØrd Objects</a>
        </div>
        <div className='flex gap-3'>
            <a href="#">Home</a>
            <a href="#">Projects</a>
            <a href="#">About</a>
        </div>
    </nav>
  )
}

export default Navbar