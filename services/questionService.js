import OpenAI from "openai";
import "dotenv/config";
import prisma from "../lib/prisma.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function answerQuestion({ question }) {
  // STEP 1: Create a systemMessage variable that trains the AI to be an Islamic Q&A assistant
  // - Use only Quran and Sahih Hadith as sources
  // - Always include a disclaimer that this is NOT a fatwa
  // - Return JSON with: answer, evidence (quran array, hadith array), disclaimer


  // STEP 2: Create a userMessage variable with the question


  // STEP 3: Call client.responses.create() with model "gpt-4o" and json_object format


  // STEP 4: Get response.output_text and check if it's empty


  // STEP 5: Parse the JSON response with JSON.parse()


  // STEP 6: Save to database using prisma.question.create()


  // STEP 7: Return the parsed response

}

export async function askIslamicQuestion({ question }) {
  try {
    return await answerQuestion({ question });
  } catch (error) {
    throw error;
  }
}
