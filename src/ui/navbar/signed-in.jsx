"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/ui/button";

export default function SignedIn({ user }) {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();

    await fetch("/api/sign_out");
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <nav className="fixed flex flex-row justify-between items-center px-[5%] w-[100%] h-[10vh] bg-[#4089FF]">
        <Link href="/" className="text-[white] text-[1.7rem]">
          Neura Query
        </Link>
        <div className="flex gap-[10px] items-center">
          <Link href="connect_db">
            <Button text="Connect" mode="dark"></Button>
          </Link>
          <Link href="querier">
            <Button text="Query" mode="dark"></Button>
          </Link>
          <p className="text-[white] mx-[50px]">
            Hello {user} &nbsp;&nbsp;&nbsp;:&#41;
          </p>
          <form onSubmit={handleLogout}>
            <Button text="Sign Out" mode="dark"></Button>
          </form>
        </div>
      </nav>
    </>
  );
}
