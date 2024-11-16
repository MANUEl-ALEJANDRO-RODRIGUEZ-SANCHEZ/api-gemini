import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCXee10egPvoClpNUEXRc-HzzcieiPpAPg";

export const POST = async (req) => {
  try {
    // Procesa el JSON del cuerpo de la solicitud
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return new Response(JSON.stringify({ text: response.text() }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Permitir solicitudes desde cualquier origen
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Métodos permitidos
        "Access-Control-Allow-Headers": "Content-Type", // Encabezados permitidos
      },
    });
  } catch (error) {
    console.error("Error al generar contenido:", error);
    return new Response(JSON.stringify({ error: "Error al generar contenido" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Permitir solicitudes desde cualquier origen
      },
    });
  }
};

// Manejo del método OPTIONS para solicitudes preflight
export const OPTIONS = () => {
  return new Response(null, {
    status: 204, // Sin contenido
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
