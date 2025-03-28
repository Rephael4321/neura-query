"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ConnectDB from "@/ui/protected/connect-db";

export default function ProtectedConnectDB() {
  const pathname = usePathname();
  const router = useRouter();
  const [jwtValid, setJwtValid] = useState(null);

  useEffect(() => {
    async function checkJWT() {
      try {
        const res = await fetch("/api/verify_jwt");
        const data = await res.json();
        if (data.value) {
          setUser(data.user.sub);
        }
        setJwtValid(data.valid);
      } catch (error) {
        console.error("Error verifying JWT:", error);
        setJwtValid(false);
      }
    }

    checkJWT();
  }, [pathname]);

  useEffect(() => {
    if (jwtValid === false) {
      router.push("/");
    }
  }, [jwtValid, router]);

  return jwtValid ? <ConnectDB /> : null;
}
