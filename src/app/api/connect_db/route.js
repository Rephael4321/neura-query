import { URIComposer, PostFetcher } from "@/app/lib/utils";

export async function POST(request) {
  const formData = await request.json();
  const uri = URIComposer(formData);
  const payload = { uri: uri };

  const postFetcher = new PostFetcher({
    fetchUrl: `${process.env.SERVER_ADDRESS}/connect_db`,
    Authorization: true,
    payload: payload,
  });

  const response = await postFetcher.execute();
  return response;
}
