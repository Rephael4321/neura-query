import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export class PostFetcher {
  constructor({ fetchUrl, Authorization, payload }) {
    this.fetchUrl = fetchUrl;
    this.Authorization = Authorization;
    this.payload = payload;
  }

  async execute() {
    try {
      if (this.Authorization) {
        return await this.executeProtectedPost();
      } else {
        return await this.executePost();
      }
    } catch (err) {
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
      });
    }
  }

  async executePost() {}

  async executeProtectedPost() {
    const accessToken = await GetAccessTokenCookie();
    const response = await fetch(this.fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(this.payload),
    });

    const responseData = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify(responseData), { status: 200 });
    } else {
      return new Response(JSON.stringify(responseData), {
        status: response.status,
      });
    }
  }
}

export async function VerifyJWT() {
  try {
    const cookie = cookies();
    const accessToken = (await cookie).get("access_token")?.value;

    if (!accessToken) {
      return { valid: false, message: "No token found" };
    }

    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);

    return { valid: true, user: decoded, accessToken: accessToken };
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
      (await cookie).set("access_token", data.jwt_token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });

      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      const errorData = await response.json();
      return new Response(
        JSON.stringify({ message: errorData.detail || "Unknown error" }),
        {
          status: response.status,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Network or parsing error" }),
      {
        status: 500,
      }
    );
  }
}

export function URIComposer(data) {
  if (data.port) {
    return `postgresql+asyncpg://${data.username}:${data.password}@${data.host}:${data.port}/${data.DBName}`;
  } else {
    return `postgresql+asyncpg://${data.username}:${data.password}@${data.host}/${data.DBName}`;
  }
}

export async function GetAccessTokenCookie() {
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token")?.value;
  return accessToken;
}
