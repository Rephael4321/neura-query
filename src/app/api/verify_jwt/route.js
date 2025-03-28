import { VerifyJWT } from "@/app/lib/utils";

export async function GET() {
  const result = await VerifyJWT();

  return Response.json(result, { status: result.valid ? 200 : 401 });
}
