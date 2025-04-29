import { cookies } from "next/headers";

export async function GET() {
  const cookie = cookies();
  (await cookie).delete("access_token");
  return new Response(
    JSON.stringify({
      message: "Logged out successfully",
    }),
    {
      status: 200,
    }
  );
}
