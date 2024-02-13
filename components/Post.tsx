import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


interface PostProps {
  id: string;
  author: string;
  date: string;
  title: string;
  content: string;
  thumbnail?: string;
  authorEmail?: string;
  category?: string;
  links: string[];
}

export default async function Post(
  { id,
    author,
    date,
    category,
    links,
    title,
    content,
    authorEmail,
    thumbnail }: PostProps) {

  const session = await getServerSession(authOptions);
  const isEditable = session && session?.user?.email === authorEmail;
  const authorname = session?.user?.name

//date converter
  const dateObject = new Date(date);
  const formattedDate: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const fdate = dateObject.toLocaleDateString("en-US", formattedDate);

  return (
    <div className="mt-4 ">
      <div className="my-2">
        posted by: <span className="font-bold">{authorname}</span> on {fdate}
      </div> 

      <div className="">
        {thumbnail?(<Image src={thumbnail} width={500} height={500} alt={"img"} className="rounded-lg object-center"/>):(<Image
            src={"/thumbnail-placeholder.png"} width={600} height={600}
            alt={title}
            className="object-cover rounded-md object-center"
          />)}
      </div>

      <button className="mt-2">
      {category&&<Link key={id} className="mt-2 px-3 py-1 rounded-md bg-slate-900 text-white" href={`/categories/${category}`}>
            {category}
        </Link>}
      </button>

      <h1>
        {title}
      </h1>

      <div className="text-md font-sans">
        {content}
      </div>

      <div className="flex cursor-pointer items-center underline text-slate-500 hover:text-slate-700">
        <span><Image className=" m-2" src={'/link.svg'} alt={"link-logo"} height={20} width={20}/></span>
        {links && (
        <div className="overflow-hidden mx-4 ">
          {links.map((link)=>(<div><Link href={link}>{link}</Link></div>))}
        </div>
        )}



      </div>

      {
        isEditable && (
          <div className="flex gap-4" >
            <Link  key={id}className="  text-dark bg-slate-50" href={`edit-post/${id}`}>Edit</Link>
            <DeleteButton id={id} />
          </div>
        )
       }
        
    </div>
  );
}

