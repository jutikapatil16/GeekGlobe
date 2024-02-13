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
      {category&&<Link className="mt-2 px-3 py-1 rounded-md bg-slate-900 text-white" href={`/categories/${category}`}>
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
      {links && (
        <div className="my-4 flex flex-col gap-3">
          {links.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>

              <Link className="link" href={link}>
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}



      </div>

      {
        isEditable && (
          <div className="flex gap-4" >
            <Link className="  text-dark bg-slate-50" href={`edit-post/${id}`}>Edit</Link>
            <DeleteButton id={id} />
          </div>
        )
       }
        
    </div>
  );
}

