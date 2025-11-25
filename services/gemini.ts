import { GoogleGenAI } from "@google/genai";
import { ComfyTheme } from "../types";

export const generateMatrixTheme = async (inputTheme: ComfyTheme): Promise<ComfyTheme> => {
  // Check for API key presence at runtime
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. AI features require a valid API_KEY environment variable.");
  }

  // Initialize the client only when requested
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelId = "gemini-2.5-flash";
  
  const systemInstruction = `
    You are a world-class UI designer specializing in "The Matrix" (1999) aesthetic. 
    Your task is to take a JSON object representing a ComfyUI theme and strictly transform all color values to match a "Matrix" theme.
    
    Style Guide:
    - Backgrounds: Deep black (#000000), very dark grey-greens (#051005).
    - Text: Terminal green (#00FF41), darker green (#008F11).
    - Accents/Slots: Varying neon greens, pale greens, and occasionally a stark white or digital rain silver.
    - Errors: Glitchy red or bright warning orange, but kept digital.
    - Input Fields: Dark console style.
    - ID: Change to "matrix_theme".
    - Name: Change to "The Matrix".

    IMPORTANT: 
    - You MUST return valid JSON.
    - You MUST preserve the exact keys of the input JSON. 
    - Do not add or remove keys, only change values.
  `;

  const prompt = `
    Convert the following ComfyUI theme JSON to a Matrix theme:
    
    ${JSON.stringify(inputTheme)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as ComfyTheme;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};