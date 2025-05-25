'use client'

import axios from 'axios'
import Link from 'next/link'
// import {  useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


export default function verifyEmail() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    // const router = useRouter()

    const verifyUserEmail = async ()=>{
        try {
           const response = await axios.post("api/users/verifyemail",{token})
            setVerified(true)
            setError(false)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }
    }
    useEffect(()=>{
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken||"")
        // const {query}= router;
        // const urlToken = query.token

    },[])
    useEffect(()=>{
        if (token.length > 0) {
            setError(false)
            verifyUserEmail()
        }
    },[token])
  return (
    <>
    
    
    <div className='flex flex-col item-center justify-center items-center min-h-screen py-10'>
        <h1 className="text-4xl text-amber-200"> verifyEmail</h1>
        <h2 className='text-2xl bg-amber-300 text-black'> {token ? `${token}` : "no token"}</h2>
      
        {verified && (
            <div>
                <h2  className='text-2xl'>verified</h2>
                <button className='m-4 text-2xl border-amber-200 border-2 rounded-xl py-1 font-bold px-4 text-amber-200 cursor-pointer hover:text-black hover:bg-amber-200 duration-500 '><Link href='/login'>Login</Link></button>
            </div>
        )}
        {error && (
            <div>
                <h2  className='text-2xl'>Error</h2>
                
            </div>
        )}
    </div>
    </>
  )
}

 
