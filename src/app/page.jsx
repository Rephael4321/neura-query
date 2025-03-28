import Section from "@/ui/section";
import List from "@/ui/list";
import Paragraph from "@/ui/paragraph";
import Image from "next/image";


export default function Home() {
  const items = [
    "AI driven - use your own language",
    "Connect and query with your own database",
    "Support SQL queries",
  ];

  return (
    <>
      <section className="mx-[15%] h-[65vh] flex flex-row items-center justify-around">
        <div>
          <h1 className="text-[1.6rem] mb-[0.8rem]">
            Hello from{" "}
            <span className="text-[2rem] text-[#4089FF]">Neura Query</span>
          </h1>
          <p>An AI driven database queries generator</p>
        </div>
        <Image
          className=""
          src="/logo.svg"
          alt="neura query image"
          width={350}
          height={350}
          priority
        ></Image>
      </section>
      <Section
        title="Use your own language to query various databases"
        content="Neura Query is designed to convert human languages to SQL
          language, and executing the queriers against your database. The system
          elevates the power of GPT AI models to ease the process of querying
          databases, by removing the need to master database languages."
        Component={Paragraph}
      ></Section>
      <Section title="Key features" content={items} Component={List}></Section>
      <Section
        title="How it works?"
        content="After you log in into Neura Query, you supply your database connection
          details. Then in every request of yours, the web page upload your
          query along with some metadata about your database, allowing the AI to
          understand what tables you have and respond accordingly. Then the AI
          creates the database query for you and send it back to your web page."
        Component={Paragraph}
      ></Section>
    </>
  );
}
