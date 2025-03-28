import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function VerifyJWT() {
  try {
    const cookie = cookies();
    const accessToken = (await cookie).get("access_token")?.value;

    if (!accessToken) {
      return { valid: false, message: "No token found" };
    }

    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);

    return { valid: true, user: decoded };
  } catch (error) {
    return { valid: false, message: "Invalid or expired token" };
  }
}

export async function GetAccessToken(endpoint, request) {
  const formData = await request.json();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      const cookie = cookies();
      (await cookie).set("access_token", data.access_token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });

      return new Response(
        JSON.stringify({
          access_token: data.access_token,
          token_type: data.token_type,
        }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }
}

export function TableMatcher(str) {
  const tables = [];

  const tablePattern = /Table\(([^()]*|\((?:[^()]*|\([^()]*\))*\))*\)/g;

  const matches = str.match(tablePattern);

  if (matches) {
    matches.forEach((match) => {
      tables.push(match);
    });
  }

  return tables;
}

export function URIComposer(data) {
  return `postgresql+asyncpg://${data.username}:${data.password}@${data.host}/${data.DBName}`;
}
