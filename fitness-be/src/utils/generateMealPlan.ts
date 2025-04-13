import OpenAI from "openai";
import 'dotenv/config';


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export async function generateMealPlan(goal: string): Promise<string> {
  const prompt = `Create a 1-day meal plan for someone trying to ${goal} weight. Include breakfast, lunch, dinner, and snacks.`;

  try {
    
    const response = await client.responses.create({
      model: "gpt-4o",
      input: prompt
  });

  return response.output_text || "No meal plan generated.";
  } catch (error) {
    throw error
  }


}




