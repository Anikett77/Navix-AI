import React from 'react'

const Navbar = () => {
  return (
    <div className=' text-black bg-white/20 justify-between flex items-center backdrop-blur-sm' >
      <ul className='justify-start flex'>
        <img className='' src='https://www.planaitrip.site/logo.svg'></img>
        <li className='my-5 ml-3 font-bold text-xl'>Navix AI</li>
        </ul>
        <ul className='justify-center gap-8 flex'>
      <a href='/'>
      <h2 className='hover:text-orange-600 hover:scale-105 text-lg transition-all'>Home</h2></a>
      <a href='/pricing'>
      <h2 className='hover:text-orange-600 hover:scale-105 text-lg transition-all'>Pricing</h2></a>
      <a href='/contact'>
      <h2 className='hover:text-orange-600 hover:scale-105 text-lg transition-all'>Contact</h2></a>
      </ul>
      <ul className='mt-2'>
      <a className=' p-2 rounded-lg bg-orange-600 px-4 cursor-pointer' href='/login'>Create New trip</a>
      <button className='rounded-4xl bg-orange-600 p-2.5 px-4 mx-3 '>A</button>
      </ul>
    </div>
  )
}

export default Navbar
