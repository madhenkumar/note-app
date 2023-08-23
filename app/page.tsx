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
      const apiUrl = '/api/create';
  
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
    <main >
    <div>
      <h1 className="text-center font-bold text-2xl mt-4"> Notes </h1>
      <form onSubmit={e=>{
        e.preventDefault()
        handleSubmit(form)
      }}
      className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'>
        <input type="text"
        placeholder="Title"
        value = {form.title}
        onChange={e=> setForm({...form,title:e.target.value})}
        className="border-2 rounded border-gray-600 p-1"
        />
        <textarea
        placeholder ="Content"
        value = {form.content}
        onChange={e=>setForm({...form,content:e.target.value})}
        className="border-2 rounded border-gray-600 p-1"
        /> 
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add       
          </button>
      </form>
        <Link href="/viewNotes">View Notes</Link>
    </div>  
    
      
    
    </main>
  )
}


