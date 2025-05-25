"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);

      console.log("signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col item-center justify-center items-center min-h-screen py-10">
      <h1 className="text-4xl text-amber-200">
        {loading ? "Processing..." : "SignUp"}
      </h1>
      <hr />
      <label htmlFor="username" className="m-2 font-medium text-2xl ">
        username
      </label>
      <input
        type="text"
        className="p-2 border rounded-2xl mt-2 "
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
        onClick={onSignUp}
        className="m-4 text-2xl border-amber-200 border-2 rounded-xl py-1 font-bold px-4 text-amber-200 cursor-pointer hover:text-black hover:bg-amber-200 duration-500 "
      >
        {buttonDisabled ? "no Signup" : "SignUp"}
      </button>
      <Link href="/login" className="text-blue-600">
        visit login page
      </Link>
    </div>
  );
}

export default SignupPage;
