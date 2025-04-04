e.preventDefault();
setQueryMessage("");

try {
  const response = await fetch("/api/query_db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(queryFormData),
  });

  if (response.ok) {
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
