import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb'

export async function GET(){
    try{
        //prisma.category.findMany
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    }catch(error)
   {
    return NextResponse.json({message:"text"})
   }
}