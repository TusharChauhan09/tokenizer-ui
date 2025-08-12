"use client";

import React, { useState } from "react";
import { InputBox } from "@/components/ui/input-box";
import { ActionButton } from "@/components/ui/action-button";
import { OutputBox } from "@/components/ui/output-box";
import { cn } from "@/lib/utils";
import { BCK_API } from "@/config/url";

const HomePage = () => {
  // State for tokenization flow
  const [inputText, setInputText] = useState("");
  const [tokens, setTokens] = useState("");
  const [encodedResult, setEncodedResult] = useState("");

  // State for decoding flow
  const [decodeInput, setDecodeInput] = useState("");
  const [decodedResult, setDecodedResult] = useState("");

  // Shift value for encoding/decoding
  const [shift, setShift] = useState("5");

  const handleGenerateTokens = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text to tokenize");
      return;
    }

    try {
      console.log("Sending request to tokenize:", inputText);
      const response = await fetch(`${BCK_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence: inputText }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success && data.tokens) {
        // Format tokens as a single-line array string
        const tokenString = `[${data.tokens
          .map((token: string) => `"${token}"`)
          .join(", ")}]`;
        setTokens(tokenString);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error generating tokens:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to generate tokens"
        }`
      );
    }
  };

  const handleEncode = async () => {
    if (!tokens.trim()) {
      alert("Please generate tokens first");
      return;
    }

    try {
      const tokensArray = JSON.parse(tokens);
      console.log("Encoding tokens:", tokensArray);

      const response = await fetch(`${BCK_API}/encode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokens: tokensArray,
          shift: parseInt(shift),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Encode response:", data);

      if (data.success && data.encodedTokens) {
        setEncodedResult(JSON.stringify(data.encodedTokens, null, 2));
        // Auto-populate decode input
        setDecodeInput(JSON.stringify(data.encodedTokens, null, 2));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error encoding:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to encode tokens"
        }`
      );
    }
  };

  const handleDecode = async () => {
    if (!decodeInput.trim()) {
      alert("Please enter encoded tokens to decode");
      return;
    }

    try {
      const tokensArray = JSON.parse(decodeInput);
      console.log("Decoding tokens:", tokensArray);

      const response = await fetch(`${BCK_API}/decode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          encodedTokens: tokensArray,
          shift: parseInt(shift),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Decode response:", data);

      if (data.success && data.decodedSentence) {
        setDecodedResult(data.decodedSentence);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error decoding:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to decode tokens"
        }`
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Disclaimer in top right corner */}
      <div className="fixed top-4 right-4 z-50 max-w-xs bg-yellow-50 border border-yellow-200 rounded-lg p-3 shadow-sm">
        <p className="text-xs text-yellow-800 font-medium">
          ⚠️ Render server may take time to start, please wait for 1 min
        </p>
      </div>

      {/* Centered Title in the middle of the screen */}
      <div className="relative min-h-[400px] flex items-center justify-center bg-white">
        <div className="relative z-10 text-center">
          <h1 className="text-9xl font-bold tracking-wide text-gray-900 jap">
            Tokenizer
          </h1>
          <p className="mt-6 text-5xl jap leading-8 text-gray-600">
            Text tokenization, encoding, and decoding encryption
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <InputBox
              label="enter"
              placeholder="hello hi"
              value={inputText}
              onChange={setInputText}
            />
            <OutputBox
              label="token"
              value={tokens}
              placeholder="['hello','hi']"
            />
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={handleGenerateTokens}>
              Genrate Token
            </ActionButton>
          </div>

          {/* Row 2: Encode Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-900">
                  Shift:
                </label>
                <input
                  type="number"
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-20 px-3 py-2 text-sm border border-gray-300 rounded bg-white text-gray-900"
                  min="1"
                  max="25"
                />
              </div>
              <ActionButton onClick={handleEncode}>encode</ActionButton>
            </div>
            <OutputBox
              label="encoded"
              value={encodedResult}
              placeholder="{1232,e4}"
            />
          </div>

          {/* Decoding Section */}
          <div className="border-t-2 border-gray-300 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col space-y-4">
                <InputBox
                  label="enter"
                  placeholder="Enter encoded tokens to decode..."
                  value={decodeInput}
                  onChange={setDecodeInput}
                />
                <ActionButton onClick={handleDecode}>decode</ActionButton>
              </div>
              <OutputBox
                label="decoded"
                value={decodedResult}
                placeholder="Decoded text will appear here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
