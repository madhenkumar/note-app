"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'

async function fetchBlogs() {
    
    const res = await fetch("/api/create/",{
      next: {
        revalidate: 10,
      },
      
    });
    const data = await res.json();
    return data.posts; 
  }




  // eslint-disable-next-line @next/next/no-async-client-component
  export default async function Home() {
    const posts = await fetchBlogs();
    // console.log(posts);
  
    return (
      <main >
         <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
         <ul>
         {posts?.map((note: any)=>(
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h2 key={note.id} className="text-2xl font-extrabold dark:text-white">{note.title}</h2>
                  <p className="text-sm">{note.content}</p>
                  <Link href ={`/viewNotes/edit/${note.id}`}>Edit</Link>
                </div>
          </div>
        </li>
      ))}
      </ul>
        </div>
        <Link href="/">Home</Link>

</main>
    );
  }