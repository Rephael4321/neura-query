"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/button";

export default function ConnectDB() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e, connectionDetails) => {
    try {
      const response = await fetch("/api/connect_db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(connectionDetails),
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

  const handleDBConnectionRequest = async (e) => {
    e.preventDefault();
    setMessage("");
    handleSubmit(e, formData);
  };

  const handleDemoConnectionRequest = async (e) => {
    e.preventDefault();
    setMessage("");
    const response = await fetch("/api/get_demo_connection_details");
    const demoConnectionDetails = await response.json();
    handleSubmit(e, demoConnectionDetails);
  };

  return (
    <div className="flex justify-around mx-[15%]">
      <div className="flex flex-col">
        <h2 className="text-center text-[32px] py-[2rem]">
          Connect your own DB
        </h2>
        <form
          onSubmit={handleDBConnectionRequest}
          className="flex flex-col flex-1 items-center"
        >
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
      </div>
      {/* This section has been disabled due to Nadav Gothait request. */}
      {/* <div className="flex flex-col">
        <h2 className="text-center text-[32px] py-[2rem]">&nbsp;</h2>
        <div className="flex flex-1 items-center">
          <span className="self-center text-[32px]">OR</span>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-center text-[32px] py-[2rem]">Use our demo</h2>
        <form
          onSubmit={handleDemoConnectionRequest}
          className="flex flex-1 items-center"
        >
          <button className="w-[250px] h-[100px] rounded-[0.5rem] text-[2rem] bg-[#4089FF] text-[white] hover:cursor-pointer">
            I'm in
          </button>
        </form>
      </div> */}
      {message && <p>{message}</p>}
    </div>
  );
}
