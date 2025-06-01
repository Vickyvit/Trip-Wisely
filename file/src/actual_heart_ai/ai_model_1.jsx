import { GoogleGenerativeAI } from "@google/generative-ai";


// Use your Gemini API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Ensure the environment variable is configured correctly

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI({ apiKey });

// Fetch the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Specify the model
});

// Configuration for generation
const generationConfig = {
  temperature: 1, // Controls creativity; higher values make output more random
  topP: 0.95,     // Controls diversity; use lower values for more focused output
  topK: 40,       // Limits the sampling pool for tokens
  maxOutputTokens: 8192, // Limits the maximum output length
  responseMimeType: "application/json", // Ensure plain text output
};

// Function to generate a travel plan prompt
export const generateTravelPlan = async ({ location, days, budget }) => {
  const prompt = `Generate a travel plan for ${location}, for ${days} days with a ${budget} budget. 
    Give me a list of hotel options with the following details: 
    Hotel Name, Hotel Address, Price, Hotel Image URL, Geo-coordinates, Rating, Descriptions. 
    Also, suggest an itinerary for ${days} days with each day’s plan, including:
    Place Name, Place Details, Place Image URL, Geo-coordinates, Ticket Pricing, Rating, Time to Travel to each place. 
    Please format the response in JSON.`;

  try {
    // Start a chat session with the model
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    // Send the message and get the response
    const response = await chatSession.sendMessage({ text: prompt });
    return response;
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
};
