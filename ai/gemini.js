import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export async function explainFailure({ error, url, title, screenshot }) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('[AI] GEMINI_API_KEY not set — skipping AI failure analysis');
    return '# AI Analysis Skipped\n\nGEMINI_API_KEY environment variable is not configured.';
  }

  const prompt = `
You are a Senior SDET performing a root cause analysis on a Playwright test failure.

## Failure Context
- **Page URL:** ${url}
- **Page Title:** ${title}
- **Error Message:** ${error}
- **Screenshot Path:** ${screenshot}

## Your Task
Respond ONLY in the following markdown structure:

### What Failed
One sentence describing the observable failure.

### Root Cause (Probable)
2-3 bullet points identifying likely causes.

### Suggested Fixes
Numbered list of concrete code changes to investigate or apply.

### Stability Improvements
One improvement to make this test more resilient to flakiness.
`.trim();

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (aiError) {
    console.error('[AI] Gemini analysis failed:', aiError.message);
    return `# AI Analysis Failed\n\nError: ${aiError.message}`;
  }
}
