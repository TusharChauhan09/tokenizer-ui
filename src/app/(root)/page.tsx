"use client";

import React, { useState } from "react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { InputBox } from "@/components/ui/input-box";
import { ActionButton } from "@/components/ui/action-button";
import { OutputBox } from "@/components/ui/output-box";
import { cn } from "@/lib/utils";

const HomePage = () => {
  // State for tokenization flow
  const [inputText, setInputText] = useState("");
  const [tokens, setTokens] = useState("");
  const [encodeTokens, setEncodeTokens] = useState("");
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
      const response = await fetch(
        "https://tokenizer-api-axrr.onrender.com/api/tokens",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sentence: inputText }),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success && data.tokens) {
        setTokens(JSON.stringify(data.tokens, null, 2));
        // Auto-populate encode input
        setEncodeTokens(JSON.stringify(data.tokens, null, 2));
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
    if (!encodeTokens.trim()) {
      alert("Please enter tokens to encode");
      return;
    }

    try {
      const tokensArray = JSON.parse(encodeTokens);
      console.log("Encoding tokens:", tokensArray);

      const response = await fetch(
        "https://tokenizer-api-axrr.onrender.com/api/tokens/encode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokens: tokensArray,
            shift: parseInt(shift),
          }),
        }
      );

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

      const response = await fetch(
        "https://tokenizer-api-axrr.onrender.com/api/tokens/decode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            encodedTokens: tokensArray,
            shift: parseInt(shift),
          }),
        }
      );

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
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated Grid Pattern Background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Tokenizer API
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Powerful text tokenization, encoding, and decoding with Caesar
            cipher encryption
          </p>
        </div>

        {/* Tokenization and Encoding Flow */}
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Section: Gen Token Button */}
          <div className="flex justify-center">
            <ActionButton onClick={handleGenerateTokens}>
              gen token
            </ActionButton>
          </div>

          {/* Main Flow: Enter -> Token -> Encode */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Enter Input */}
            <div className="lg:col-span-1">
              <InputBox
                label="enter"
                placeholder="hello hi"
                value={inputText}
                onChange={setInputText}
              />
            </div>

            {/* Token Output */}
            <div className="lg:col-span-1">
              <OutputBox
                label="token"
                value={tokens}
                placeholder="['hello','hi']"
              />
            </div>

            {/* Encode Section */}
            <div className="lg:col-span-1 flex flex-col space-y-3">
              <InputBox
                placeholder="Enter tokens to encode..."
                value={encodeTokens}
                onChange={setEncodeTokens}
              />
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-foreground">
                  Shift:
                </label>
                <input
                  type="number"
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-gray-800 rounded bg-transparent text-foreground"
                  min="1"
                  max="25"
                />
              </div>
              <ActionButton onClick={handleEncode}>encode</ActionButton>
            </div>
          </div>

          {/* Encoded Output */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"></div>
            <div className="lg:col-span-1">
              <OutputBox
                label="encode"
                value={encodedResult}
                placeholder="{1232,e4}"
              />
            </div>
          </div>

          {/* Decoding Section - Separate Flow */}
          <div className="border-t-2 border-gray-800/30 pt-8 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Decode Input */}
              <div className="lg:col-span-1">
                <InputBox
                  label="enter"
                  placeholder="Enter encoded tokens to decode..."
                  value={decodeInput}
                  onChange={setDecodeInput}
                />
                <div className="mt-3">
                  <ActionButton onClick={handleDecode}>decode</ActionButton>
                </div>
              </div>

              {/* Decoded Output */}
              <div className="lg:col-span-1">
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
    </div>
  );
};

export default HomePage;
