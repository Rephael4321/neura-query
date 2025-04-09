import Release from "@/ui/releases/release";

export default function Releases() {
  return (
    <div className="mx-[20%]">
      <h1 className="text-[2rem] my-[24px]">Releases</h1>
      <Release
        title="1.1.4 - 04/04/2025"
        description="Added logger. Now Neura Query will log queries and commands on the API, enabling convenient way to debug errors, like DB commands failing when they shouldn't."
      ></Release>
      <Release
        title="1.1.3 - 04/04/2025"
        description="No need to supply provider name anymore. Neura Query will figure out by itself what is the SQL engine type, and use to create queries accordingly."
      ></Release>
      <Release
        title="1.1.2 - 04/04/2025"
        description="New design for connection page. Now you can use a demo DB to work with the AI."
      ></Release>
      <Release
        title="1.1.1 - 04/04/2025"
        description="New design for query window. With a new looking design, now it is much more convenient to query the AI and read the results."
      ></Release>
      <Release
        title="1.1.0 - 02/04/2025"
        description="Enhanced AI prompts are on the go. Now Neura Query can support a wide variety of human queries. It can actually support general questions about your DB and response in much more elaborate manner."
      ></Release>
      <Release
        title="1.0.3 - 31/03/2025"
        description="New update! Now Neura Query will refresh its metadata cache whenever it is changed."
      ></Release>
      <Release
        title="1.0.2 - 30/03/2025"
        description="Client now receives and updates GUI with DB commands and their results automatically."
      ></Release>
      <Release
        title="1.0.1 - 30/03/2025"
        description="Metadata and provider information moved from cookies on client side to api server. This move makes fetching this information much faster by making it accessible from the api server itself. It also reduces the payload size sent in every request. And most importantly, cookies has limitations of 4096 Bytes size, meaning metadata cannot be stored if it is to big, moving to api server solves this problem."
      ></Release>
      <Release
        title="1.0.0 - 28/03/2025"
        description="Neura Query is released for the first time :)."
      ></Release>
    </div>
  );
}
