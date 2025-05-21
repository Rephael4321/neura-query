"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/button";
import Link from "next/link";

export default function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      const response = await fetch("/api/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        console.log(data);
        if (data.has_uri) {
          router.push("/querier");
        } else {
          router.push("/connect_db");
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error submitting form.");
      }
    } catch (error) {
      setMessage("Network error. Try again later.");
    }
  };

  return (
    <>
      <div className="h-[80vh] pb-[60px] flex flex-col items-center justify-center gap-[30px]">
        <h1 className="text-center text-[32px] mb-[60px]">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column justify-center">
            <div className="grid grid-cols-[max-content_250px] gap-4 p-4 m-auto">
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
                required
              />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Button text="Sign In" mode="light"></Button>
          </div>
        </form>
        {message && <p>{message}</p>}
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[12px]">
            New to Neura Query?{" "}
            <Link href="/sign_up" className="text-[#4089FF]">
              Sign up
            </Link>{" "}
            now
          </p>
        </div>
      </div>
    </>
  );
}
