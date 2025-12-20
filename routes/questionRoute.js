import express from "express";

// STEP 1: Import askIslamicQuestion from questionService.js
import { askIslamicQuestion } from "../services/questionService.js"

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    // STEP 2: Get the question from req.body

    const {question} = req.body


    // STEP 3: Validate the question (check if it exists and is a string)

    if(!question || typeof question !== "string") {

      return res.status(400).json({
        status: false,
        message: "write a text it must be string"
      })

    }

    // STEP 4: Call askIslamicQuestion() with the question

    const islamic = await askIslamicQuestion({ question })


    // STEP 5: Send a success response with the answer

    return res.status(200).json({
      status: true,
      message: "succesfully",
      data: islamic

    })


  } catch (error) {
    console.error("Islamic Q&A error:", error);
    res.status(500).json({
      success: false,
      message: "Error answering question",
      error: error.message,
    });
  }
});

export default router;
