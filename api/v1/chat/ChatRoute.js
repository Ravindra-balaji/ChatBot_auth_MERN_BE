const express = require("express");
const router = express.Router();
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // make sure .env has this
});

router.post("/", async (req, res) => {
  const { message, persona } = req.body;

  try {
    const response = await cohere.generate({
      model: "command-r-plus",
      prompt: `You are a ${persona} AI assistant. Respond to the following user message: "${message}"`,
      max_tokens: 100,
    });

    const botText = response.generations[0]?.text?.trim();

    return res.status(200).json({
      success: true,
      bot: botText,
    });
  } catch (error) {
    console.error("Error in Cohere API:", error.message);
    return res.status(500).json({
      success: false,
      bot: "Sorry, something went wrong with the AI response.",
    });
  }
});

module.exports = router;
