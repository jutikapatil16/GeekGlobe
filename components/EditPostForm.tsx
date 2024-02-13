'use client'

import { categoriesData } from "@/data";
import CategoriesList from "./CategoriesList";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TCategory, TPost } from "@/app/types";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";


export default function EditPostForm({post}:{post:TPost}) {
    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const [publicId, setPublicId] = useState("");
    const [error, setError] = useState("")


    const router = useRouter();

    //fetching all fategories 
    useEffect(() => {
        const fetchAllCategories = async () => {
            const res = await fetch("/api/categories");
            const catNames = await res.json();
            setCategories(catNames);
        };
        fetchAllCategories();

       const initValues = () =>{
        setTitle(post.title);
        setContent(post.content);
        setSelectedCategory(post.catName||"");
        setImageUrl("");
        setPublicId("");


       }

       initValues();
    }, [post.title,
        post.content,
        post.imageUrl,
        post.publicId,
        post.catName,
        post.links,]);


    // link added to link array 
    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (linkInput.length != 0) {
            setLinks((prev) => [...prev, linkInput])
            setLinkInput("");
        }
    };


    const deleteLink = (index: number) => {
        setLinks((prev) => prev.filter((_, i) => i !== index))
    };

    //**************** */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            const errorMessage = "Title and content are required";
            setError(errorMessage);
            return;
        }

        try {

            const res = await fetch(`/api/posts/${post.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    links,
                    selectedCategory,
                    imageUrl,
                    publicId,
                }),
            });

            if (res.ok) {
                router.push('/dashboard')
                toast.success("Post updated successfully")
                router.refresh();
            }
        }
        catch (error) {
            //ERROR
            console.log(error)
        }
    }


    const handleImageUpload = async (result: CldUploadWidgetResults) => {

        const info = result.info as object;

        if ("secure_url" in info && "public_id" in info) {
            const url = info.secure_url as string;
            const id = info.public_id as string;

            setImageUrl(url);
            console.log(url)
            setPublicId(id);
            console.log(id)
        }

    }


    return (


        <div>
            <h1 className="text-center mt-8">Update a Post</h1>
            <form onSubmit={handleSubmit} action="">
                <input onChange={(e) => setTitle(e.target.value)} className="border rounded-sm text-md  w-full mt-4 items-center p-4" type="text" placeholder="Title" value={title} />
                <textarea onChange={(e) => setContent(e.target.value)} className="border rounded-sm text-md mt-4 w-full p-6" placeholder="Content" value={content}></textarea>
                <div >
                    {/* link array items are mapped one by one  */}


                    {links && links.map((link, i) => <div key={i}>

                        <div className="mx-2 flex gap-4 istems-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>
                            <Link href={link}>
                                <span className=" text-indigo-500 font-bold">{link}</span>
                            </Link>

                            <span className="cursor-pointer" onClick={() => deleteLink(i)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </span>
                        </div>



                    </div>)}

                    <div className="flex gap-4">
                        <input className="w-full mt-4 border rounded-sm text-md  p-4" type="text" placeholder="Place the link and click on Add" onChange={(e) => setLinkInput(e.target.value)} value={linkInput} />
                        {/* when clicked  on button addLink function is called*/}
                        <button className="btn flex gap-4 mt-4 items-center" onClick={addLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add
                        </button>
                    </div>


                </div>

                <CldUploadButton uploadPreset="dwuyqwo6" onUpload={handleImageUpload} className={` ${imageUrl && "pointer-events-none"}`} >
                    <div className="relative">
                    <div className=" h-48 mt-4 lg:w-[770px] md:w-64 bg-slate-200 grid place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                    </div>

                    
                    {imageUrl && <Image src={imageUrl} fill className="object-cover inset-0 absolute" alt={"image"} />}

                    </div>

                </CldUploadButton>

                <select onChange={(e) => setSelectedCategory(e.target.value)} className="w-full border rounded-dm text-md mt-4 p-4" value={selectedCategory}>
                    <option className="p-4" value="">Select A Category</option>
                    {categories && categories.map((category) =>
                        <option className="m-2 px-3 py-1 rounded-md bg-slate-900 text-white" key={category.id} value={category.catName}>
                            {category.catName}
                        </option>
                    )}
                </select>

                <button className=" btn primary-btn mt-4 w-full" type="submit">Update Post</button>

                {error && <div className="p-2 text-red-600">{error}</div>}
            </form>
        </div>
    )
}
