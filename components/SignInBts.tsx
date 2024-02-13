"use client"

import Image from "next/image"
import {signIn} from "next-auth/react"
export default function SignInBts() {
  return (
    <div>
        <h1 className='text-center m-2'>Sign In</h1>
        <div className='flex flex-col items-center justify-center p-4'>
         <button onClick={()=>signIn('github')} className="flex flex-wrap border p-4 hover:bg-slate-100/50 rounded-full gap-2 mt-4">
            <span className="mx-4 ">
             <Image src={'/github.svg'} alt={"github-logo"} height={30} width={30}/>
            
            </span>
            Sign in with Github
        </button>   
         <button onClick={()=>signIn('google')} className="flex flex-wrap border p-4 hover:bg-slate-100/50 rounded-full gap-2 mt-4">
            <span className="mx-4 ">
             <Image src={'/google.svg'} alt={"google-logo"} height={30} width={30}/>
            
            </span>
            Sign in with Google
        </button>   
       
        </div>

    </div>
  )
}
