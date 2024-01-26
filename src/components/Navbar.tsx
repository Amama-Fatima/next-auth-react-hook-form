import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { HandMetal } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='bg-black-50 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='container flex items-center justify-between'>
            <Link href='/'>
                <HandMetal />
            </Link>
            <Link  className={buttonVariants()} href='/sign-in'>sign-in</Link>
        </div>
    </div>
  )
}

export default Navbar