import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCXee10egPvoClpNUEXRc-HzzcieiPpAPg";

export const POST = async (req) => {
  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return new Response(JSON.stringify({ text: response.text() }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error al generar contenido:', error);
    return new Response(JSON.stringify({ error: 'Error al generar contenido' }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
