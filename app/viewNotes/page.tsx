"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

async function fetchBlogs() {
    
  try {
    const response = await axios.get('https://note-app-eta-blue.vercel.app/api/create', {});
    // 
    // Axios automatically checks for response status and throws an error if it's not OK (e.g., 404 or 500 errors)

    return response.data.posts;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; // You can handle the error or rethrow it as needed
  }

  }




  // eslint-disable-next-line @next/next/no-async-client-component
  export default function Home() {
    const [posts, setPosts] = useState([]);
    async function getPosts() {
      const posts = await fetchBlogs();
      setPosts(posts);
    }
    // console.log(posts);
    void getPosts();
    return (
      <main className="bg-black text-white" >
         <div className="w-full mx-auto space-y-6 flex flex-col items-stretch p-5">
         <h1 className="text-4xl font-bold mb-5">Your notes</h1>
         <Link href="/" className="text-2xl bg-white text-black w-full flex p-2 rounded-md justify-center hover:bg-slate-100">Go Back Home</Link>
         <ul>
         {posts?.reverse().map((note: any)=>(
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between hover:bg-slate-950">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 key={note.id} className="text-2xl font-extrabold dark:text-white">{note.title}</h2>
                    <p className="text-sm">{note.content}</p>
                  </div>
 
                  <Link href ={`/viewNotes/edit/${note.id}`} className="mr-3 underline">Edit</Link>
                </div>
          </div>
        </li>
      ))}
      </ul>
        </div>

</main>
    );
  }