import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {

    const { title, content, links, selectedCategory, imageUrl, publicId } = await req.json();

    //EMAIL
    const session = await getServerSession(authOptions);
    const authorEmail = session?.user?.email as string;
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }

    //TITLE AND CONTENT
    if (!title || !content) {
        return NextResponse.json(
          { error: "Title and content are required." },
          { status: 500 }
        );
    }

    try{
   //prisma.post.create
    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            links,
            imageUrl,
            publicId,
            catName: selectedCategory,
            authorEmail,
        },
        });

        console.log("Post created");
        return NextResponse.json(newPost);

    }catch(error){
        //ERROR
        return NextResponse.json(
            { message: "Could not create post." }
            );
    }


}

export async function GET() {

    //using author and in descending order
    try {
        const posts = await prisma.post.findMany();
    
        return NextResponse.json(posts);
      } 
    catch(error)
   {
    //ERROR
    console.log(error);
    return NextResponse.json(
      { message: "Some error occured" },
      { status: 500 }
    );
   }
}