"use client";

import { useState } from "react";
import Button from "@/ui/button";
import TableResult from "@/ui/table-result";

export default function Querier() {
  const [textFormData, setTextFormData] = useState({ query: "" });
  const [queryFormData, setQueryFormData] = useState({ query: "" });
  const [queryResult, setQueryResult] = useState({
    type: "",
    message: "",
    titles: [],
    rows: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [queryWindow, setQueryWindow] = useState("AI");

  const handleQueryChange = (e) => {
    setQueryFormData({ query: e.target.value });
  };

  const handleTextChange = (e) => {
    setTextFormData({ query: e.target.value });
  };

  const handleResultChange = (e) => {
    setQueryResult({ result: e.target.value });
  };

  const handleAskAIClick = (e) => {
    setQueryWindow(e.target.value);
  };

  const handleAskDBClick = (e) => {
    setQueryWindow(e.target.value);
  };

  const handleAPIRequest = async (e, endpoint, formData) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const command = data.command;
        if (data.result.type === "str") {
          setQueryResult({
            type: data.result.type,
            message: data.result.message,
            titles: [],
            rows: [],
          });
        } else if (data.result.type === "list") {
          const titles = Object.entries(data.result.message[0]).map(
            ([key, value]) => `${key}`
          );
          const rows = data.result.message.map((item) =>
            Object.entries(item).map(([key, value]) => `${value}`)
          );
          setQueryResult({
            type: data.result.type,
            message: "",
            titles: titles,
            rows: rows,
          });
        }
        setQueryFormData({ query: command });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error submitting form.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Network error. Try again later.");
    }
  };

  const handleQuerySubmit = async (e) => {
    handleAPIRequest(e, "/api/query_db", queryFormData);
  };

  const handleTextSubmit = async (e) => {
    handleAPIRequest(e, "/api/query_ai", textFormData);
  };

  const handleErrorMessageClick = async () => {
    setErrorMessage("");
  };

  return (
    <>
      <div className="flex flex-row justify-center relative">
        {errorMessage ? (
          <div className="flex items-center gap-[10px] absolute text-[#721c24] bg-[#dc3545] px-[0.5rem] py-[0.25rem] rounded-[0.25rem] top-[2rem]">
            <div>Error: {errorMessage}</div>
            <div
              onClick={handleErrorMessageClick}
              className="text-[1.5rem] cursor-pointer"
            >
              &times;
            </div>
          </div>
        ) : null}
        <div
          name="query_result"
          id="query_result"
          onChange={handleResultChange}
          className="w-[50%] h-[55vh] overflow-auto pt-[25px]"
        >
          {queryResult.type === "str" ? (
            queryResult.message
          ) : (
            <TableResult
              titles={queryResult.titles}
              rows={queryResult.rows}
            ></TableResult>
          )}
        </div>
      </div>
      <form
        className="flex flex-col flex-1 bg-[#4089ff] w-[50%] h-[30vh] p-[0.75rem] rounded-[25px] m-[auto] justify-between"
        onSubmit={queryWindow === "AI" ? handleTextSubmit : handleQuerySubmit}
      >
        <textarea
          name={queryWindow === "AI" ? "human_query" : "db_query"}
          id={queryWindow === "AI" ? "human_query" : "db_query"}
          value={
            queryWindow === "AI" ? textFormData.query : queryFormData.query
          }
          onChange={queryWindow === "AI" ? handleTextChange : handleQueryChange}
          className={`focus-visible:outline-none h-[100%] p-[5px] resize-none placeholder-[black] text-[black]`}
          placeholder={
            queryWindow === "AI"
              ? "Ask me anything related to your DB"
              : "Type DB queries here"
          }
        ></textarea>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-[10px]">
            <div onClick={handleAskAIClick}>
              <Button
                text="Ask AI"
                mode={queryWindow === "AI" ? "query-light-on" : "query-light"}
                type="button"
                value="AI"
              ></Button>
            </div>
            <div onClick={handleAskDBClick}>
              <Button
                text="Query DB"
                mode={queryWindow === "AI" ? "query-light" : "query-light-on"}
                type="button"
                value="DB"
              ></Button>
            </div>
          </div>
          <Button
            text={queryWindow === "AI" ? "Send" : "Run"}
            mode="query-light"
            type="submit"
            value=""
          ></Button>
        </div>
      </form>
    </>
  );
}
