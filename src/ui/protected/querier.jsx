"use client";

import { useState } from "react";
import Button from "@/ui/button";

export default function Querier() {
  const [textFormData, setTextFormData] = useState({ query: "" });
  const [queryFormData, setQueryFormData] = useState({ query: "" });
  const [queryResult, setQueryResult] = useState({ result: "" });
  const [textMessage, setTextMessage] = useState("");
  const [queryMessage, setQueryMessage] = useState("");

  const handleQueryChange = (e) => {
    setQueryFormData({ query: e.target.value });
  };

  const handleTextChange = (e) => {
    setTextFormData({ query: e.target.value });
  };

  const handleResultChange = (e) => {
    setQueryResult({ result: e.target.value });
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setQueryMessage("");

    try {
      const response = await fetch("/api/query_db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryFormData),
      });

      if (response.ok) {
        const data = await response.json();
        let result;
        if (data.message.type === "str") {
          result = data.message.message;
        } else if (data.message.type === "list") {
          result = data.message.message
            .map((item) =>
              Object.entries(item)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")
            )
            .join(" | ");
        }
        setQueryResult({ result: result });
      } else {
        const errorData = await response.json();
        setQueryMessage(errorData.detail || "Error submitting form.");
      }
    } catch (error) {
      console.log(error);
      setQueryMessage("Network error. Try again later.");
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setTextMessage("");

    try {
      const response = await fetch("/api/query_ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(textFormData),
      });

      if (response.ok) {
        const data = await response.json();
        const command = data.command;
        let result;
        if (data.result.type === "str") {
          result = data.result.message;
        } else if (data.result.type === "list") {
          result = data.result.message
            .map((item) =>
              Object.entries(item)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")
            )
            .join(" | ");
        }
        setQueryResult({ result: result });
        setQueryFormData({ query: command });
      } else {
        const errorData = await response.json();
        setTextMessage(errorData.message || "Error submitting form.");
      }
    } catch (error) {
      console.log(error);
      setTextMessage("Network error. Try again later.");
    }
  };

  const textareaClass =
    "border-[3px] border-[gray] focus-visible:outline-none my-[10px] p-[10px] resize-none";
  return (
    <div className="flex flex-row">
      <div className="flex flex-col m-[24px] flex-1">
        <form className="flex flex-col flex-1" onSubmit={handleQuerySubmit}>
          <textarea
            name="db_query"
            id="db_query"
            value={queryFormData.query}
            onChange={handleQueryChange}
            className={`${textareaClass} h-[200px]`}
            placeholder="DB Query"
          ></textarea>
          <Button text={"Run"} mode="light"></Button>
          {queryMessage && <p>{queryMessage}</p>}
        </form>
        <form className="flex flex-col flex-1" onSubmit={handleTextSubmit}>
          <textarea
            name="human_query"
            id="human_query"
            value={textFormData.query}
            onChange={handleTextChange}
            className={`${textareaClass} h-[200px]`}
            placeholder="Ask me anything about DB queries"
          ></textarea>
          <Button text={"Send"} mode="light"></Button>
          {textMessage && <p>{textMessage}</p>}
        </form>
      </div>
      <div className="m-[24px] flex-1">
        <textarea
          name="query_result"
          id="query_result"
          value={queryResult.result}
          onChange={handleResultChange}
          className={`${textareaClass} w-[100%] h-[100%] cursor-default`}
          placeholder="Query result"
          readOnly
        ></textarea>
      </div>
    </div>
  );
}
