"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

async function fetchBlogs() {
    
  try {
    const response = await axios.get('https://note-iyx4ofndz-salodpezp.vercel.app/api/create', {});

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