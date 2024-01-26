'use client'
import React from 'react'
import { 
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import GoogleSignInButton from '../GoogleSignInButton'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have more than 8 characters'),
})

type FormValues = z.infer<typeof FormSchema>



const SignInForm = () => {

    const router = useRouter()

    //ONSUBMIT FUNCTION
    const onSubmit = async (values: FormValues)=>{
        console.log("Values")
        const signInData = await signIn('Credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: `${window.location.origin}/`
        })
        if(signInData == undefined){
            console.log("UNDEFINED")
        }
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues:{
            email: '',
            password: ''
        }
      })

    return (
        <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input 
                        placeholder="email" 
                        type='email' 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input 
                        type='password' 
                        placeholder="password" 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <Button className='w-full mt-6' type="submit">Sign In</Button>
        </form>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly 
        before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400
        after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400
        
        '>
            or
        </div>
        <GoogleSignInButton>
            Sign In With Google
        </GoogleSignInButton>
        <p className='text-center text-sm text-gray-600 mt-2'>
            If you dont&apos;t have an account, please&nbsp;
            <Link href='/sign-up' className='text-blue-500 hover:underline'>Sign Up</Link>
        </p>
        
        </Form>
    )
}

export default SignInForm

// name name@gmail.com password