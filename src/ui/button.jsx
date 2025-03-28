export default function Button({ text, mode }) {
  const lightMode = "bg-[#4089FF] text-[white]";
  const darkMode = "bg-[#FFFFFF] text-[#4089FF]";
  const buttonColorClass = mode === "light" ? lightMode : darkMode;

  return (
    <button
      className={`w-[80px] hover:cursor-pointer rounded-[25px] py-[3px] ${buttonColorClass}`}
    >
      {text}
    </button>
  );
}
