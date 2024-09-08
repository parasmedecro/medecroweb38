
import { NextResponse } from "next/server";
import { getWeatherSummary } from "@/gemini";

export async function POST(request) {
  const { weatherData } = await request.json();

  const geminiPrompt = `
    Pretend you're a weather news presenter presenting LIVE on television. 
    Be energetic and full of charisma. Introduce yourself as Francis and say you are LIVE from Los Angeles. 
    State the city you are providing a summary for. Then give a summary of today's weather only. 
    Make it easy for the viewers to understand what to do to prepare for those weather conditions 
    such as wear SPF if the UV is high, etc. Use the uv_index data provided to give UV advice. 
    Provide a joke regarding the weather. Assume the data came from your team at the news office and not the user.
    Weather data: ${JSON.stringify(weatherData)}
  `;

  try {
    const result = await getWeatherSummary(geminiPrompt);
    console.log("DATA IS: ", result);

    return NextResponse.json(result); 
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return NextResponse.json({ error: "Failed to fetch weather summary." });
  }
}
