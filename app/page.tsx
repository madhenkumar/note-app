"use client"

import Axios from "axios";
import { getNoteSchema } from '@/schemas/form/formf';
import { useEffect, useState } from 'react';
import { prisma } from '../lib/prisma';
import { GetServerSideProps } from 'next';
import Link from 'next/link';


interface FormData {
  title: string
  content: string
  id: string
}

// Axios.post('/api/create/',{
      //   body: JSON.stringify(data),
      //   headers: {
      //     'Content-type':'application/json'
      //   }
      // })

export default function Home() {

  const [form, setForm] = useState<FormData>({title: '',content: '',id: ''});

  // async function create(data: FormData){
  //   try{  
  //     fetch('http://localhost:3000/api/create/',{
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-type':'application/json'
  //       },
  //       method: 'POST'
  //     }).then(() => setForm({title :'', content:'',id:''}))
  //   }  catch(error){
  //     console.log(error);
  //   }
  // }

  const create = async (data : FormData) => {
    try {
      const apiUrl = 'https://note-app-eta-blue.vercel.app/api/create';
  
      await Axios.post(apiUrl, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          // Add other headers here if necessary
        },
      });
  
      // Assuming setForm is a function to reset your form state
      setForm({ title: '', content: '', id: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (data: FormData) => {
    try {
     create(data) 
    } catch (error) {
      console.log(error);
    }
  }

  return ( 
    <main className="bg-black text-white h-screen p-5" >
    <div>
      <div className="flex justify-between">
      <h1 className="text-center font-bold text-4xl mb-5"> Notes </h1>
      <Link href="/viewNotes" className="underline text-2xl">View Notes</Link>
      </div>


      <form onSubmit={e=>{
        e.preventDefault()
        handleSubmit(form)
      }}
      className='w-full space-y-6 flex flex-col items-stretch'>
        <input type="text"
        placeholder="Title"
        value = {form.title}
        onChange={e=> setForm({...form,title:e.target.value})}
        className="border-2 rounded border-gray-600 p-1 text-black"
        />
        <textarea
        placeholder ="Content"
        value = {form.content}
        onChange={e=>setForm({...form,content:e.target.value})}
        className="border-2 rounded border-gray-600 p-1 text-black"
        /> 
        <button type="submit" className="bg-white text-black rounded p-2 hover:bg-slate-100">
          Add Note       
          </button>
      </form>
    </div>  
    
      
    
    </main>
  )
}


