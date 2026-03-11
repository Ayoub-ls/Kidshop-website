import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ProductContext } from '../context/GlobalContext'

const Header = ({page}) => {
  const {navigate} = useContext(ProductContext)
  return (
    <div className='flex justify-between w-screen p-6.5'>
        <Link className='w-8 bg-main rounded-lg p-2'>
            <img className='w-full' src={assets.menu} />
        </Link>
        <h1 className='font-bold text-xl'>{page}</h1>
        <Link onClick={() => navigate('login/')} className='w-8 bg-main rounded-full p-1'>
            <img className='w-full' src={assets.profile} />
        </Link>
    </div>
  )
}

export default Header