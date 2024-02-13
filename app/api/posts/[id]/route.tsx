import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET( req:Request,{params}:{params:{id: string}}){

    try {
        const id = params.id;
        //prisma.post.findUnique
        const post = await prisma.post.findUnique({ where: { id } });
        return NextResponse.json(post);
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch post" });
      }

    
}


export async function PUT(req:Request,{params}:{params:{id: string}}) {


    const session = await getServerSession(authOptions);
    if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { title, content, links, selectedCategory, imageUrl, publicId } = await req.json();
    const id = params.id;

    try{
   //prisma.post.update
    const updatePost = await prisma.post.update({
        where:{id},
        data: {
            title,
            content,
            links,
            imageUrl,
            publicId,
            catName: selectedCategory,
            
        },
        });

        console.log("Post updated");
        return NextResponse.json(updatePost);

    }catch(error){
        //ERROR
        return NextResponse.json(
            { message: "Could not create post." }
            );
    }


}

export async function DELETE(req:Request,{params}:{params:{id: string}}) {

  
    const id = params.id;

    try{
   //prisma.post.update
    const delPost = await prisma.post.delete({
        where:{id}
        });

        console.log("Post deleted");
        return NextResponse.json(delPost);

    }catch(error){
        //ERROR
        return NextResponse.json(
            { message: "Could not create post." }
            );
    }


}