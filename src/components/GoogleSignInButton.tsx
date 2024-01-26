import React from 'react'
import { Button } from './ui/button'


interface GoogleSignInButtonProps {
    children: React.ReactNode

}

const GoogleSignInButton = ({children}: GoogleSignInButtonProps) => {

    const logInWithGoogle = ()=>{
        console.log('log in with google')
    }
  return (
    <Button 
    className='w-full' 
    onClick={logInWithGoogle}
    >
        {children}
    </Button>
  )
}

export default GoogleSignInButton