import { GetAccessToken } from "@/app/lib/utils";

export async function POST(request) {
  const obj = await GetAccessToken(
    `${process.env.SERVER_ADDRESS}/sign_in`,
    request
  );
  return obj;
}
