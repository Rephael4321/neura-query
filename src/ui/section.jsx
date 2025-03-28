export default function Section({ title, content, Component }) {
  return (
    <section className="mx-[20%] my-[4rem]">
      <h2 className="text-[1.5rem] my-[1.2rem] pb-[10px] border-b-[3px] border-[#4089FF]">
        {title}
      </h2>
      <div className="text-[1.1rem]">
        <Component content={content}></Component>
      </div>
    </section>
  );
}
