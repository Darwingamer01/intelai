import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const ai = new GoogleGenAI({ apiKey: "AIzaSyBkvkI9Dnv79EpKY1r1mX1cdq5ImQDLHiw" });

export async function main(imageUrl: string, text: string) {
  // Fetch the image as a Blob
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  // Optionally, create a File if needed:
  const file = new File([blob], "image.jpg", { type: blob.type });

  // Upload the file to Gemini
  const image = await ai.files.upload({
    file: file,
  });
  const uri = image?.uri;
  const genResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      createUserContent([
        `${text}`,
        createPartFromUri(uri ?? "/default/uri", image?.mimeType || "application/octet-stream"),
      ]),
    ],
  });
  const cleanedResponse = genResponse.text?.replace(/\*/g, "");
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



