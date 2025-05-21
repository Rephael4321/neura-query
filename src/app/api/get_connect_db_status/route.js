import { PostFetcher } from "@/app/lib/utils";

export async function POST(request) {
  const formData = await request.json();
  const recordId = formData.recordId;
  const topicName = formData.topicName;
  const payload = { record_id: recordId, topic_name: topicName };

  const postFetcher = new PostFetcher({
    fetchUrl: `${process.env.SERVER_ADDRESS}/get_request_status`,
    Authorization: true,
    payload: payload,
  });

  const response = await postFetcher.execute();
  return response;
}
