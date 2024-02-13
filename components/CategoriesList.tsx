import { TCategory } from "@/app/types";
import {categoriesData} from "@/data";
import Link from "next/link";

const getCategories = async() : Promise<TCategory[] | null> =>{

  try{
   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)

   if(res.ok){
     const categories = res.json();
     return categories;
   }
  }catch(error){
  console.log(error);
  
  }
  return null

}

export default  async function CategoriesList() {
    // console.log(categoriesData);

  const categories = await getCategories();
  return (
    <div className="gap-2 flex flex-auto">
        {categories && categories.map((category:TCategory)=>
        <Link className="m-2 px-3 py-1 rounded-md bg-slate-900 text-white" href={`/categories/${category.catName}`}>
            {category.catName}
        </Link>
        )}
    </div>
  )
}
