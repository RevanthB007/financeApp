"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Field from './Field'
import { AuthFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })




const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = AuthFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "", 
            password: "",
            firstName:"",
            lastName:"",
            address1:"",
            city:"",
            state:"",
            postalCode:"",
            dateOfBirth:"",
            ssn:"",
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) =>{
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true)
        try{
            //sign up with Appwrite and create plaid token
            if(type === 'sign-up'){
            const newUser = await signUp(data)
            setUser(newUser)
            }

            if(type === 'sign-in'){
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })
                if(response){
                    console.log(response)
                    router.push("/");
                }
            }
        }
        catch(error){
            console.log(error)
        }
        finally{
        setIsLoading(false)
        }
    }


    return (
        <section className="auth-form" >
            <header className="flex flex-col gap-5 ms:gap-8">
                <Link href="/" className="cursor-pointer items-center flex gap-1">
                    <Image
                        src="/icons/logo.svg"
                        alt="logo"
                        width={34}
                        height={34}
                        className='size-[24px]
            max-xl:size-14'
                    />
                    <h1 className="text-26 font-bold font-ibm-plex-serif text-black-1">
                        Horizon
                    </h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    </h1>
                    <p>
                        {user ? 'Link your account to get started' : 'Please enter your details'}
                    </p>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* plaid link */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {type === "sign-up" &&
                            <>
                            <div className='flex gap-4'>
                                <Field control={form.control}
                                name="firstName" label="First Name"
                                placeholder='Enter your First Name'/>
                                <Field control={form.control}
                                name="lastName" label="Last Name"
                                placeholder='Enter your Last Name'/>
                            </div>
                            <div className='flex gap-4'>
                                <Field control={form.control}
                                name="state" label="State"
                                placeholder='Enter your State'/>
                                <Field control={form.control}
                                name="postalCode" label="Postal Code"
                                placeholder='Enter your Postal Code'/>
                            </div> 
                            <div className='flex  gap-4'>
                                <Field control={form.control}
                                name="dateOfBirth" label="Date of Birth" type="date" placeholder='YYYY-MM-DD'
                                />
                                <Field control={form.control}
                                name="ssn" label="ssn"
                                placeholder='ssn'/>
                            </div>
                            <div className='flex  gap-4'>                         
                                <Field control={form.control}
                                name="address1" label="Address"
                                placeholder='Enter your Address'/>
                                <Field control={form.control}
                                name="city" label="City"
                                placeholder='Enter your City'/>
                            </div>
                    </>

                            }

                            <Field control={form.control}label='Email' placeholder='Enter you email' type='email' name='email' />

                            <Field control={form.control}label='Password' placeholder='Enter you password'  type='password' name='password' />
                        <div className='flex flex-col gap-4'>
                            <Button type="submit" className='form-btn' disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                    <Loader2 size={20}
                                    className="animate-spin"/>&nbsp;Loading...
                                    </>
                                ): type==='sign-in' ? 'Sign In' : 'Sign Up'}
                            </Button>
                        </div>
                        </form>
                    </Form>
                    <p className='text-14 font-normal'>
                        {type === ' sign-in'? "Dont have an account?": 'Already have an account?'}&nbsp;
                    </p>
                    <Link href={type==='sign-in'?'/sign-up' : '/sign-in'} className='form-link'>
                       {type === 'sign-in'?'Sign Up' : 'Sign In'}
                    </Link>
                </>
            )}
        </section>
    )
}


export default AuthForm