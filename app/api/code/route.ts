import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const intructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explaination.",
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { messages } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });
    if (!configuration.apiKey)
      return new NextResponse("OpenAI api key not configured.", {
        status: 500,
      });
    if (!messages)
      return new NextResponse("Messages are required.", { status: 400 });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [intructionMessage, ...messages],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error: unknown) {
    console.error("[CODE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
