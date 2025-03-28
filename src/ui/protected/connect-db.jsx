"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/button";

export default function ConnectDB() {
  const [formData, setFormData] = useState({
    provider: "neon",
    username: "",
    password: "",
    host: "",
    port: "",
    DBName: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const inputClass =
    "border-[3px] border-[#4089FF] rounded-[25px] px-[8px] py-[2px] focus-visible:outline-none";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/connect_db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/querier");
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
      <h1 className="text-center text-[32px]">Connect your DB</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column justify-center">
          <div className="grid grid-cols-[max-content_250px] gap-4 p-4 m-auto">
            <label htmlFor="provider">Provider</label>
            <select
              id="provider"
              name="provider"
              className={inputClass}
              value={formData.provider}
              onChange={handleChange}
            >
              <option value="neon">Neon</option>
              <option value="supabase">Supabase</option>
            </select>
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
            <label htmlFor="host">Host</label>
            <input
              type="text"
              id="host"
              name="host"
              value={formData.host}
              onChange={handleChange}
              className={inputClass}
              autoComplete="true"
              required
            />
            <label htmlFor="port">Port</label>
            <input
              type="number"
              id="port"
              name="port"
              value={formData.port}
              onChange={handleChange}
              className={inputClass}
              autoComplete="true"
            />
            <label htmlFor="DBName">DB name</label>
            <input
              type="text"
              id="DBName"
              name="DBName"
              value={formData.DBName}
              onChange={handleChange}
              className={inputClass}
              autoComplete="true"
              required
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[10px]">
          <Button text="Connect" mode="light"></Button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
