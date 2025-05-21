import { PostFetcher } from "@/app/lib/utils";

export async function POST(request) {
  const formData = await request.json();
  const payload = { ...formData };

  const postFetcher = new PostFetcher({
    fetchUrl: `${process.env.SERVER_ADDRESS}/query_ai`,
    Authorization: true,
    payload: payload,
  });

  const response = await postFetcher.execute();
  return response;
}
