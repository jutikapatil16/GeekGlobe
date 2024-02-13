import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET( req:Request,{params}:{params:{catName: string}}){


    try {
        const catName = params.catName;
        //prisma.post.findUnique
        const posts = await prisma.category.findUnique({ 
            where: { catName } ,
            include:{ 
                posts: { 
                orderBy: { createdAt: "desc"}  
                } ,
             },

        });
        return NextResponse.json(posts);
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch post" });
      }

    
}


