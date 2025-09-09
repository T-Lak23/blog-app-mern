import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function aiResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `Write a blog post titled "${prompt}". At the beginning start with a plain paragraph tag introducing the content — no <h1> tag should be used as the title is already defined. Then use proper HTML structure with headings starting from <h2> onward. Ensure the post is SEO-friendly for Google ranking, includes relevant keywords naturally, and is at least 1000 words long. It should be complete and must include a conclusion at the end. Return only the HTML content that goes inside the <body> tag — do not include the <body> tag itself, any newline characters (\\n), or any inline styles. Do not use <style> tags or define any CSS. Focus on clarity, readability, and semantic structure.`,
  });
  //   console.log(response.text);
  let content = response.text;

  // Remove triple backticks and optional "html" label
  content = content.replace(/^```html\s*/, "").replace(/```$/, "");

  // Remove escaped newlines
  content = content.replace(/\\n/g, "");
  content = content.replace(/<br\s*\/?>/gi, "");

  return content;
  //   return;
}

export default aiResponse;
