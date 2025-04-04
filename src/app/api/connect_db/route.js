import { URIComposer } from "@/app/lib/utils";
import { cookies } from "next/headers";

export async function POST(request) {
  const formData = await request.json();
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token")?.value;
  const uri = URIComposer(formData);

  try {
    const response = await fetch(
      `${process.env.SERVER_ADDRESS}/fetch_metadata`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ uri: uri }),
      }
    );

    if (response.ok) {
      (await cookie).set("uri", uri, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });

      return new Response(JSON.stringify({}), { status: 200 });
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
