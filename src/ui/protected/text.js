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
    setTextMessage(errorData.message || "Error submitting form.");
  }
} catch (error) {
  console.log(error);
  setTextMessage("Network error. Try again later.");
}
