export default function Button({ text, mode, type, value }) {
  const lightMode = "bg-[#4089FF] text-[white]";
  const darkMode = "bg-[#FFFFFF] text-[#4089FF]";
  const queryLightMode = "border border-solid border-[black] text-[black]";
  const queryLightModeOn = "border border-solid border-[white] text-[black] bg-[white]";
  let buttonColorClass;
  if (mode === "light") {
    buttonColorClass = lightMode;
  } else if (mode === "dark") {
    buttonColorClass = darkMode;
  } else if (mode === "query-light") {
    buttonColorClass = queryLightMode;
  } else if (mode === "query-light-on") {
    buttonColorClass = queryLightModeOn
  }

  return (
    <button
      type={type}
      value={value}
      className={`w-[90px] hover:cursor-pointer rounded-[25px] py-[3px] ${buttonColorClass}`}
    >
      {text}
    </button>
  );
}
