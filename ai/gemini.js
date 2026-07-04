import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function explainFailure(errorDetails) {
  const prompt = `
You are a Senior Software Development Engineer in Test.

Analyze the following Playwright test failure.

Return:

1. What failed
2. Probable root cause
3. Suggested fix

Failure:

${errorDetails}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}