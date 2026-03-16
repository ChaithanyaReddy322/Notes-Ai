import fetch from "node-fetch";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const generateGeminiResponse = async (prompt) => {
  try {

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables");
    }

    const response = await fetch(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],

          // Control output quality and length
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7,
            topP: 0.9,
            topK: 40
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", errText);
      throw new Error("Gemini API request failed");
    }

    const data = await response.json();

    // Check if candidates exist
    if (!data?.candidates || data.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini");
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Gemini returned empty response");
    }

    // Clean markdown formatting if Gemini adds it
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return cleanText;

  } catch (error) {

    console.error("Gemini Fetch Error:", error.message);

    throw new Error("Gemini API fetch failed");
  }
};