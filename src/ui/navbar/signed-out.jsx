import Link from "next/link";
import Button from "@/ui/button";

export default function SignedOut() {
  return (
    <>
      <nav className="fixed flex flex-row justify-between items-center px-[5%] w-[100%] h-[10vh] bg-[#4089FF]">
        <div>
          <Link href="/" className="text-[white] text-[1.8rem]">
            Neura Query
          </Link>
          &nbsp;&nbsp;
          <Link href="/releases" className="text-[white] text-[0.9rem]">
            1.0.3
          </Link>
        </div>
        <div className="flex gap-[10px]">
          <Link href="sign_in">
            <Button text="Sign In" mode="dark"></Button>
          </Link>
          <Link href="sign_up">
            <Button text="Sign Up" mode="dark"></Button>
          </Link>
        </div>
      </nav>
    </>
  );
}
