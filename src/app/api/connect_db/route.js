import { URIComposer } from "@/app/lib/utils";
import { cookies } from "next/headers";

export async function POST(request) {
  const formData = await request.json();
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token")?.value;
  const uri = URIComposer(formData);

  try {
    const response = await fetch(`${process.env.SERVER_ADDRESS}/fetch_metadata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uri: uri, provider: formData.provider }),
    });

    if (response.ok) {
      const data = await response.json();

      (await cookie).set("uri", uri, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });
      (await cookie).set("provider", formData.provider, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });
      (await cookie).set("metadata", data.message | "None", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });

      return new Response(
        JSON.stringify({
          uri: formData.uri,
          provider: formData.provider,
        }),
        {
          status: 200,
        }
      );
    } else if (response.status === 401) {
      const data = await response.json();

      return new Response(JSON.stringify(data), { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Connection failed" }), {
      status: 401,
    });
  }
}
