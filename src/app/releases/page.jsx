import Release from "@/ui/releases/release";

export default function Releases() {
  return (
    <div className="mx-[20%]">
      <h1 className="text-[2rem] my-[24px]">Releases</h1>
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
