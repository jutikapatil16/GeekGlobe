"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar(){
//   1.
    const {status, data:session} = useSession();
    const [isPopupVisible ,setisPopupVisible ] = useState(false);

    return <div className="flex justify-between">
        <div >

        <Link href={"/"}>
        <h1 className=" text-dark text-4xl font-sans font-bold  tracking-wide">
        GeekGlobe
        </h1>
        </Link>
        <p className="text-sm">
         Navigating the Waves of Innovation, Together.
        </p>

        </div>
{/* //2. */}
       {status === 'authenticated' ? 
       (
    <>
    <div className={` absolute z-30 right-[250px] top-[90px] bg-white p-6 shadow-lg rounded-md flex-col gap-2 text-left min-w-[160px] ${isPopupVisible?"flex":"hidden"}`}>
    
    <div className="font-bold">{session?.user?.name}</div>
    <div className="font-semibold">{session?.user?.email}</div>
    <Link onClick={() => setisPopupVisible(false)} className="hover:underline" href={"/dashboard"}>Dashboard</Link>
    <Link onClick={() => setisPopupVisible(false)} className="hover:underline" href={"/create-post"}>Create Post</Link>

    <button className="btn" onClick={()=>signOut()}>Sign Out</button>
    </div>

   <div className="flex gap-2 items-center">
   <Link href={"/create-post"} className="hidden md:flex gap-2 items-center mr-6">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
   </svg>
    <span>Create new</span>
   </Link>     
{/* //3.  */}
    <Image src={session?.user?.image || ""} width={50} height={25} alt="profile" className="rounded-full cursor-pointer" onClick={() => setisPopupVisible((prev) => !prev)} />  
    </div>

    </>
       
    )
    :(
       <div className=" flex items-center">
       <Link className="btn" href={"/sign-in"}>Sign In</Link>
       </div>
       )
       }

        
        
      
    </div>
}