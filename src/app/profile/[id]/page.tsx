'use client'


import React from 'react'


export default function page({params}:any) {
  return (
    <div className='flex flex-col item-center justify-center items-center min-h-screen py-10'>
        <h1 className="text-4xl text-amber-200">
        Profile
      </h1>
      <h2 className='text-amber-200 p-4 bg-emerald-900'>{params.id}</h2>
      
    </div>
  )
}
 
