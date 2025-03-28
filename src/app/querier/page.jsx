"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Querier from "@/ui/protected/querier";

export default function ProtectedQuerier() {
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
    async function fetchCookies() {
      const response = await fetch("/api/get_connect_db_cookies");
      return response;
    }

    if (jwtValid === false) {
      router.push("/");
    } else {
      fetchCookies().then((isOK) => {
        if (!isOK.ok) {
          router.push("/connect_db");
        }
      });
    }
  }, [jwtValid, router]);

  return jwtValid ? <Querier /> : null;
}
