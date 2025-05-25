"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function loginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onlogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);

      console.log("login Success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col item-center justify-center items-center min-h-screen py-10">
      <h1 className="text-4xl text-amber-200">
        {loading ? "Processing..." : "Login"}
      </h1>
      <hr/>
      <label htmlFor="email" className="m-2 font-medium text-2xl ">
        Email
      </label>
      <input
        type="email"
        className="p-2 border rounded-2xl mt-2"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password" className="m-2 font-medium text-2xl ">
        password
      </label>
      <input
        type="password"
        className="p-2 border rounded-2xl mt-2"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onlogin}
        className="m-4 text-2xl border-amber-200 border-2 rounded-xl py-1 font-bold px-4 text-amber-200 cursor-pointer hover:text-black hover:bg-amber-200 duration-500 "
      >
        {buttonDisabled ? "No login" : "Login"}
      </button>
      <Link href="/signup" className="text-blue-600">
        visit SignUp page
      </Link>
    
    </div>
  );
}

export default loginPage;
