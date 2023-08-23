"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

type UpdateBlogParams = {
  title: string;
  content: string;
  id: string;
};
// const updateBlog = async (note: UpdateBlogParams) => {
//   const res = axios.put(`/api/create/${note.id}`, {
//     method: "PUT",
//     body: JSON.stringify({ title: note.title, content: note.content }),
//     //@ts-ignore
//     "Content-Type": "application/json",
//   });
//   return (await res).json();
// };


const updateBlog = async (note: UpdateBlogParams) => {
  try {
    const response = await axios.put(`salodpezp.vercel.app/api/create/${note.id}`, {
      title: note.title,
      content: note.content,
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Add other headers here if necessary
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error; // You can handle the error or rethrow it as needed
  }
};



const getBlogById = async (id: string) => {
  const res = await fetch(`/api/create/${id}`);
  const data = await res.json();
  return data.post;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && contentRef.current) {
          titleRef.current.value = data.title;
          contentRef.current.value = data.content;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (titleRef.current && contentRef.current) {
        await updateBlog({
          title: titleRef.current?.value,
          content: contentRef.current?.value,
          id: params.id,
        });
       
        await router.push("/");
      }
    };


return (
    <Fragment>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit your note
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
            <textarea
              ref={contentRef}
              placeholder="Enter content"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Update
              </button>
            </div>
          </form>
          {/* <button
            onClick={handleDelete}
            className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg  m-auto mt-2 hover:bg-red-500"
          >
            Delete
          </button> */}
        </div>
    
      </div>
      
    </Fragment>
  );
};

export default EditBlog;