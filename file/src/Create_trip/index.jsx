/* eslint-disable no-unused-vars */
// import { Input } from 'postcss';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { generateTravelPlan } from '../actual_heart_ai/ai_model';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChatSession } from '@google/generative-ai';

export const CreateTrip = () => {
  const [place, setplace] = useState();
  const [formdata, setdata] = useState({}); // Using an object to store form data

  const input_handle = (name, value) => {
    // Restrict days to a maximum of 90
    if (name === 'noOfDays' && value > 90) {
      toast("91 days is the maximum allowed!");
      alert("I think 90 days is enough to explore a city!! So keep within 90 days :)");
      return;
    }

    // Update formdata state with the new value for the given key
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Applying useEffect to show the data that you've entered
  // It's a React hook that is used to execute whenever the component gets loaded
  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  // To alert the user if required details are missing
  const checktrip = async () => {
    // Validate input: if any required field is missing, show a toast
    if (
      !formdata?.noOfDays ||
      (formdata?.noOfDays > 5 && !formdata?.location) ||
      !formdata?.budget ||
      !formdata?.traveler
    ) {
      toast("Please fill in all the details!");
      return;
    }
    toast.success("Trip details submitted successfully!");

    // Ensure `generateTravelPlan` is a string and perform the `replace` method
    let final_promt = generateTravelPlan; // Assuming `generateTravelPlan` is a string template

    final_promt = final_promt
      .replace('{location}', formdata?.location?.label || 'your destination')
      .replace('{totaldays}', formdata?.noOfDays || 'N/A')
      .replace('{traveler}', formdata?.traveler || 'you and your companions')
      .replace('{budget}', formdata?.budget || 'your budget');

    console.log("Generated AI Prompt:", final_promt);
    toast.success("Prompt Generated! Check console for details.");

    // Send the final prompt to the AI model
    try {
      const result = await ChatSession.sendMessage(final_promt);
      console.log(result?.response?.text());
    } catch (error) {
      console.error("Error while sending message:", error);
      toast.error("Failed to generate trip plan.");
    }
  };
  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10">
        <h2 className="font-bold text-3xl">
          Let us know your preferences
          <p className="mt-3 text-amber-300">days</p>
        </h2>

        <div className="mt-20 flex flex-col gap-9">
          <div>
            <h2 className="text-xl my-3 font-medium">Where you wanna?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setplace(v); // Update place state
                  input_handle('location', v); // Update formdata with location
                },
              }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">How many days</h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={formdata?.noOfDays || ''}
            onChange={(e) => input_handle('noOfDays', e.target.value)} 
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What you have?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => input_handle('budget', item.title)} 
              className={`p-6 border cursor-pointer rounded-lg hover:shadow-lg ${
                formdata?.budget === item.title ? 'shadow-lg border-black' : ''
              }`}
            >
              <h2 className="text-6xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-cyan-700">{item.desc}</h2>
            </div>
          ))}
        </div>

        <h2 className="text-xl my-3 font-medium">Who do you plan on travelling with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => input_handle('traveler', item.people)} 
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formdata?.traveler === item.people ? 'shadow-lg border-black' : ''
              }`}
            >
              <h2 className="text-6xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-cyan-700">{item.desc}</h2>
              <h2 className="text-sm text-cyan-700">{item.people}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-center flex-auto">
        <Button onClick={checktrip}> Generate Trip </Button>
      </div>
    </>
  );
};
