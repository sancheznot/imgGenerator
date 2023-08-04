import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const response = NextResponse;
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(Request) {
  const body = await Request.json();

  const responseOpenai = await openai.createImage({
    prompt: body.prompt,
    n: 1,
    size: "1024x1024",
  });
  const image_url = responseOpenai.data.data[0].url;
  return response.json({ url: image_url });
}
