// import React, { useState } from "react";

// const ChatGPTPlanner = () => {
//   const [userInput, setUserInput] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generateItinerary = async () => {
//     if (!userInput) return;
//     setLoading(true);

//     const prompt = `
//     I am planning a trip with these filters: ${userInput}.
//     Give me:
//     - A personalized travel plan
//     - Top 10 attractions
//     - Hotel recommendations
//     - A day-wise itinerary
//     `;

//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//         }),
//       });

//       const data = await response.json();
//       setResult(data.choices[0].message.content);
//     } catch (error) {
//       setResult("Error generating itinerary. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Trip Wisely – AI Travel Planner</h1>
//       <input
//         type="text"
//         placeholder="e.g., Paris, 3 days, budget 500 USD, 2 people"
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         className="w-full border p-2 rounded mb-3"
//       />
//       <button
//         onClick={generateItinerary}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {loading ? "Generating..." : "Generate Travel Plan"}
//       </button>

//       {result && (
//         <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded shadow">
//           {result}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatGPTPlanner;
