import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const ai = new GoogleGenAI({ apiKey: "AIzaSyCoqvBypN6qTDFB6aEUtmWPx0loa8hPPX4" });

export async function main(imagePath: string, text: string) {
  const image = await ai.files.upload({
    file: `${imagePath}`,
  });
  const uri = image?.uri;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      createUserContent([
        `${text}`,
        createPartFromUri(uri ?? "/default/uri", image?.mimeType || "application/octet-stream"),
      ]),
    ],
  });
  console.log(response.text);
}

export async function mainText(text:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${text}`,
  });
  const cleanedResponse = response?.text?.replace(/\*/g, "");
  return cleanedResponse;
}


interface historyProps {
  history: Array<{
    role: "user" | "model";
    parts: [{text:string}];
  }>;
}

export async function multiMain({history}:historyProps, message:string) {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: history,
  });

  const response1 = await chat.sendMessage({
    message: message,
  });
    const cleanedResponse = response1.text?.replace(/\*/g, "");
  console.log("Chat response 1:", response1.text);
  return cleanedResponse;
  }



