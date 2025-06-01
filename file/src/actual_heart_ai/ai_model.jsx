// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// You must also set the GEMINI_API_KEY environment variable

import { GoogleGenAI } from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
    // process.env.GEMINI_API_KEY,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.5-pro-preview-05-06';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with
HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place
Details, Place Image Url, Geo Coordinates, ticket Pricing, rating,Time travel each of the location for 3 days with each day plan with best
time to visit in JSON format.`,
        },
      ],
    },
  ];

  try {
    const chatSession = await ai.getGenerativeModel({ model, generationConfig: config }).startChat({
      history: [],
    });

    const result = await chatSession.sendMessage(contents[0].parts[0].text);
    const response = await result.response;
    const text = response.text();
    
    console.log(text);
  } catch (error) {
    console.error('Error generating response:', error);
  }
}

main();
