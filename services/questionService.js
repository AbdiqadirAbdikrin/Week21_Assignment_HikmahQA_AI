import OpenAI from "openai";
import "dotenv/config";
import prisma from "../lib/prisma.js";
import { Content } from "openai/resources/containers/files.mjs";
// import { json, text } from "body-parser";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function answerQuestion({ question }) {
  // STEP 1: Create a systemMessage variable that trains the AI to be an Islamic Q&A assistant
  // - Use only Quran and Sahih Hadith as sources
  // - Always include a disclaimer that this is NOT a fatwa
  // - Return JSON with: answer, evidence (quran array, hadith array), disclaimer
const systemMessage = `
You are an Islamic Q&A assistant.

Your role:
- Answer questions about Islam using **only** the Qur'an and **authentic (Sahih) Hadith** as your sources.
- If you are not reasonably sure of an answer from these sources, say you do not know and encourage the user to ask a qualified scholar.
- You are **not** issuing fatwas; you are only providing general educational information.

Style and constraints:
- Be clear, concise, and respectful.
- Do **not** mention or rely on opinions from specific madhhabs, scholars, or contemporary fatwa sites unless they are directly explaining Qur'an or Sahih Hadith and this is necessary for clarity.
- If the question is about a personal, sensitive, or complex legal issue, emphasize that the user must consult a qualified scholar or mufti in their locality.

Evidence:
- For every answer, provide supporting evidence from:
  - The Qur'an: include surah name (or number) and verse number(s).
  - Sahih Hadith: include the collection name (e.g. Sahih al-Bukhari, Sahih Muslim) and hadith number or reference if possible.
- If no clear evidence exists, explain briefly and say that the matter requires a scholar.

Output format (VERY IMPORTANT):
- Always respond as a single JSON object **only**, with no extra text before or after.
- The JSON object must have exactly these keys:
  - "answer": A clear, plain-language answer to the user's question.
  - "evidence": An object with:
      "quran": an array of Qur'an evidence objects, each like:
          { "reference": "Surah X:Verse Y-Z", "text": "<relevant translated meaning or summary>" }
      "hadith": an array of Hadith evidence objects, each like:
          { "reference": "Sahih al-Bukhari #123", "text": "<relevant hadith text or summary>" }
  - "disclaimer": A short disclaimer making it clear this is **not** a fatwa and that users must consult qualified scholars for religious rulings.

Do not include any keys other than "answer", "evidence", and "disclaimer".
Do not wrap the JSON in markdown or any other formatting.
`;
                                                                                                                                                                                                                                                                                           



  // STEP 2: Create a userMessage variable with the question

  const userMessage = `

  question: "${question}"

  
  `


  // STEP 3: Call client.responses.create() with model "gpt-4o" and json_object format

  const response = await client.responses.create({
    model: "gpt-5.1",
    input: [
      {role: "system", content: systemMessage},
      {role: "user", content: userMessage}
    ],

    text: {
      format:{
        type: "json_object"
      }
    }

  })


  // STEP 4: Get response.output_text and check if it's empty
 const rawResponse = response.output_text


 if(!rawResponse) {
  
  throw new Error("empty ai response");

 }


  // STEP 5: Parse the JSON response with JSON.parse()

  let parsed;

  try{

    parsed = JSON.parse(rawResponse)

  }catch(error){
    throw new Error(error)
  }




  // STEP 6: Save to database using prisma.question.create()

  //   await prisma.Question.create({
  //   data: {
  //     question: parsed.input,
  //     answer: parsed.answer,
  //     evidence: parsed.evidence
  //   }
  // })


  // STEP 7: Return the parsed response

return parsed;

}

export async function askIslamicQuestion({ question }) {
  try {
    return await answerQuestion({ question });
  } catch (error) {
    throw error;
  }
}
