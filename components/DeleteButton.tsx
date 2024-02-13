'use client'

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function DeleteButton({ id }: { id: string }) {
  
  const router = useRouter();
  const DeleteButton = async () => {

    const confirmed = window.confirm("are you sure you want to delete?");


    if (confirmed) {
      try {
        const res = await fetch(`api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type":"application/json"
          }

        }
        );

        if (res.ok) {
          console.log("post deleted")
          toast.success("Post deleted successfully")
          router.refresh();
        }
      } catch (error) {
        console.log(error)
      }

     
    }
    

  }


  return (
    <button onClick={DeleteButton} className="text-red-600 bg-slate-50 cursor-pointer font-bold"> Delete </button>
  )
}
