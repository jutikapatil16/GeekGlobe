import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
// import { postsData } from "@/data";
import Image from "next/image";
import { TPost } from "./types";


const getPosts = async() : Promise<TPost[] | null> =>{

  try{
   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts` 
   , 
   {
    cache: "no-store",
   })

   if(res.ok){
     const posts = res.json();
     return posts;
   }
  }catch(error){
  console.log(error);
  }
  return null

}

export default async function Home() {

  const posts = await getPosts();

  return (
    <>
    <CategoriesList/>
  
    {posts && posts.length >0 ?
    (posts.map((post:TPost)=>(
    
      <Post
      key={post.id}
      id={post.id}
      author={post.author}
      authorEmail={post.authorEmail}
      date={post.createdAt}
      thumbnail={post.imageUrl}
      category={post.catName}
      title={post.title}
      content={post.content}
      links={post.links || []}
    />

    ))
    ):(
      <div> NO posts available at the moment.</div>
    )}
    </>
    
  );
}
