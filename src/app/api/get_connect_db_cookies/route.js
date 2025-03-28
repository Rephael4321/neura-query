import { cookies } from "next/headers";

export async function GET() {
  const cookie = cookies();
  const metadata = (await cookie).get("metadata")?.value;
  const provider = (await cookie).get("provider")?.value;
  const uri = (await cookie).get("uri")?.value;

  if (!metadata || !provider || !uri) {
    return new Response(
      JSON.stringify({
        error: "Missing required cookies",
      }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "OK",
    }),
    {
      status: 200,
    }
  );
}
