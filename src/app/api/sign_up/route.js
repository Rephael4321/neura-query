import { GetAccessToken } from "@/app/lib/utils";

export async function POST(request) {
  return GetAccessToken(`${process.env.SERVER_ADDRESS}/sign_up`, request);
}
