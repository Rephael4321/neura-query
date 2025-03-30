export default function Release({ title, description }) {
  return (
    <section className="my-[24px]">
      <div className="underline text-[#4089ff]">
        <h2 className="text-[1.4rem] text-[black]">{title}</h2>
      </div>
      <p>{description}</p>
    </section>
  );
}
