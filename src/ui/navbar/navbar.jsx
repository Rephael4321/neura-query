"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SignedOut from "./signed-out";
import SignedIn from "./signed-in";

export default function Navbar() {
  const pathname = usePathname();
  const [jwtValid, setJwtValid] = useState(null);
  const [sub, setSub] = useState(null);

  useEffect(() => {
    async function checkJWT() {
      try {
        const res = await fetch("/api/verify_jwt");
        const data = await res.json();
        if (data.valid) {
          setSub(data.user.sub);
        }
        setJwtValid(data.valid);
      } catch (error) {
        console.error("Error verifying JWT:", error);
        setJwtValid(false);
      }
    }

    checkJWT();
  }, [pathname]);

  return (
    <>
      {jwtValid ? <SignedIn user={sub}></SignedIn> : <SignedOut></SignedOut>}
      <div id="spacer" className="w-[100%] h-[10vh]"></div>
    </>
  );
}
