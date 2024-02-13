import Post from '@/components/Post'
// import { postsData } from '@/data'
import Link from 'next/link'
import { TPost } from '../types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
// import { authOptions } from '../api/auth/[...nextauth]/route';
import { authOptions } from '../utils/authOptions';

//get but with email coz only specific to that user
const getPosts = async(email:string) =>{

  try{
   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}` 
   );
   const {posts} = await res.json();
   return posts;
   
  }catch(error){
  console.log(error);
  }

}

export default async function Dashboard() {
  //session
const session = await getServerSession(authOptions);
if(!session){
  redirect("/sign-in");
}

const email = session?.user?.email;
let posts = [];

if(email){
  posts = await getPosts(email);
}
 
 
return (

<div>

<h1>My posts</h1>

{posts && posts.length >0 ?
    (posts.map((post:TPost)=>(
    
    <Post key={post.id} id= {post.id} title ={post.title} author={post.author} content={post.content} 
    links={post.links|| []}  date={post.createdAt} thumbnail={post.imageUrl} category={post.catName} authorEmail={post.authorEmail}/>

    ))
    ):(
      <div className='bg-slate-100 rounded p-8 mt-4'>
      <div> No posts available at the moment.</div>
      <Link className="underline" href={"/create-post"}>Create new post </Link>
      </div>
    )}
</div>
       
  )
}
