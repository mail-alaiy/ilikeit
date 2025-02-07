"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type React from "react";
import axios from "axios";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const Google_Sheet_URL = "https://script.google.com/macros/s/AKfycbw0yFA7_qvPwfRaAxomsyKNwfK2mCEH5HxEz-HdhArpPTIzqXMW8DTcGdQyAwqMmcrT/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setSubmitted(true);
    setAnimationDone(false);
    try {
      const response = await fetch(Google_Sheet_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email, // Passing the email as the parameter
        }),
      });
  
      const data = await response.json();
      if (data.result === 'success') {
        console.log(`Email saved at row ${data.row}`);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
    setAnimationDone(true); // Stop the animation after 2 seconds
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="relative flex items-center">
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`flex-grow px-4 py-2 text-gray-700 bg-white border-2 rounded-lg focus:outline-none transition-all duration-300 ${
              submitted && animationDone
                ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                : submitted
                ? "border-[5px] border-transparent animate-borderColor"
                : "border-gray-300 focus:border-blue-500"
            }`}
            disabled={submitted && animationDone}
            required
          />
          <motion.button
            type="submit"
            className="flex items-center justify-center focus:outline-none transition-all duration-300"
            style={{ height: "500%", width: "3rem" }}
            whileTap={{ scale: 0.9 }}
            disabled={submitted}
          >
            <span className="text-2xl">✅</span>
          </motion.button>
        </div>
      </form>
      {submitted && animationDone && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-600 font-roboto"
        >
          You have been added to the waitlist
        </motion.p>
      )}
      <style>
        {`
          @keyframes borderColor {
            0% { border-color: red; }
            20% { border-color: orange; }
            40% { border-color: yellow; }
            60% { border-color: green; }
            80% { border-color: blue; }
            100% { border-color: purple; }
          }
          .animate-borderColor {
            animation: borderColor 2s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

