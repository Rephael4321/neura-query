"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectPage({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function checkJWT() {
      try {
        const res = await fetch("/api/verify_jwt");
        const data = await res.json();
        setAccessToken(data.accessToken);
      } catch (error) {
        console.error("Error verifying JWT:", error);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }

    checkJWT();
  }, [pathname]);

  useEffect(() => {
    if (!loading && accessToken === null) {
      router.push("/");
    }
  }, [loading, accessToken, router]);

  return accessToken ? <>{children}</> : null;
}
