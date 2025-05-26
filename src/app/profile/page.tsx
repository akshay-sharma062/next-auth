'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import toast from "react-hot-toast";



export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")
  const getUserDetails = async()=>{
    try {
      const response = await axios.post("/api/users/me")
      console.log(response)
      setData(response.data.data._id)
    } catch (error:any) {
      console.log("profile not found");
      toast.error(error.message);
    }
  }
  const Logout=async()=>{
          try {
            await axios.post("/api/users/logout")
            toast.success("logout success")
            router.push("/login")
          } catch (error:any) {
          console.log(error.message);
          toast.error(error.message);
          }

  }
  return (
    <div>
      <div className="flex flex-col item-center justify-center items-center min-h-screen py-10">
      <h1 className="text-4xl text-amber-200">
        Profile
      </h1>
      <h2>{data === "noyhing"?"Nothing....":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
        onClick={getUserDetails}
        className="m-4 text-2xl border-amber-200 border-2 rounded-xl py-1 font-bold px-4 text-amber-200 cursor-pointer hover:text-black hover:bg-amber-200 duration-500 "
      >
        Get user details
      </button>
      <button
        onClick={Logout}
        className="m-4 text-2xl border-amber-200 border-2 rounded-xl py-1 font-bold px-4 text-amber-200 cursor-pointer hover:text-black hover:bg-amber-200 duration-500 "
      >
        Logout
      </button>
      </div>
    </div>
  )
}


