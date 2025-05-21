"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/button";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const inputClass =
    "border-b-[3px] border-[#4089FF] focus-visible:outline-none";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/sign_up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/connect_db");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setMessage(errorData.message || "Error submitting form.");
      }
    } catch (error) {
      setMessage("Network error. Try again later.");
    }
  };

  return (
    <>
      <div className="h-[80vh] pb-[60px] flex flex-col items-center justify-center gap-[30px]">
        <h1 className="text-center text-[32px] mb-[60px]">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column justify-center">
            <div className="grid grid-cols-[max-content_250px] gap-4 p-4 m-auto">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                autoComplete="true"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                autoComplete="true"
                required
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={inputClass}
                autoComplete="true"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
                minLength={8}
                required
              />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Button text="Sign Up" mode="light"></Button>
          </div>
        </form>
        {message && <p>{message}</p>}
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[12px]">
            Already using Neura Query?{" "}
            <Link href="/sign_in" className="text-[#4089FF]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
