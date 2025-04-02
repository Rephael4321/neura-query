import { cookies } from "next/headers";

export async function POST(request) {
  let formData = await request.json();
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token")?.value;
  const uri = (await cookie).get("uri")?.value;
  formData = { uri: uri, ...formData };

  try {
    const response = await fetch(`${process.env.SERVER_ADDRESS}/query_db`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: 200,
      });
    } else if (response.status === 400) {
      const data = await response.json();

      return new Response(JSON.stringify(data), { status: 400 });
    } else if (response.status === 401) {
      const data = await response.json();

      return new Response(JSON.stringify(data), { status: 401 });
    } else if (response.status === 422) {
      const data = await response.json();

      return new Response(JSON.stringify(data), { status: 422 });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Connection failed" }), {
      status: 401,
    });
  }
}
