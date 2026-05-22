### 1. Dependencies

Before starting, ensure the students have installed the official Google Gen AI
SDK in their Next.js project:

```bash
npm install @google/genai
```

---

### 2. The Secure Backend (Route Handler)

**File:** `app/api/chat/route.js`

_Teaching Point for Students:_ Emphasize that this code runs on the **server**.
This is why it is safe to use our `GEMINI_API_KEY` here—it will never be sent to
the user's browser.

```javascript
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// 1. Initialize the AI client.
// It automatically picks up GEMINI_API_KEY from your .env.local file!
const ai = new GoogleGenAI({});

export async function POST(req) {
  try {
    // 2. Parse the incoming message from our React frontend
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, {
        status: 400,
      });
    }

    // 3. Call the Gemini API (using the fast 2.5 Flash model)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    // 4. Send the text response back to the frontend
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to connect to Gemini API" }, {
      status: 500,
    });
  }
}
```

---

### 3. The Frontend Chat UI (Client Component)

**File:** `app/page.js` (or `app/components/Chat.jsx`)

_Teaching Point for Students:_ Highlight the `"use client"` directive. Show them
how we manage the `messages` state and make a standard HTTP `fetch` to our
custom API route rather than hitting Google directly from the browser.

```javascript
"use client";
import { useState } from "react";

export default function ChatDemo() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Update UI immediately with the user's message
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Send the message to our secure Next.js backend
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // 3. Update the UI with Gemini's response
      setMessages([...newMessages, { role: "ai", text: data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, {
        role: "ai",
        text: "Oops! Something went wrong.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col h-screen font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">KISE AI Assistant</h1>

      {/* Chat History Window */}
      <div className="flex-1 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
        {messages.length === 0
          ? (
            <p className="text-gray-400 text-center mt-10">
              Start a conversation with Gemini...
            </p>
          )
          : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        {isLoading && (
          <p className="text-gray-500 text-sm italic ml-2">
            Gemini is typing...
          </p>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

---

### 4. Deploying at the End of the Day (Firebase)

When you hit the 1:15 PM module, you can deploy this instantly using Firebase's
experimental Web Frameworks support. The students just need to run:

```bash
# Login to Firebase
npx firebase login

# Initialize hosting
npx firebase init hosting
```

_When prompted by Firebase:_

- Select **"Use an existing project"** (the one they made in the
  pre-requisites).
- Firebase will auto-detect Next.js! When it asks: _“Detected an existing
  Next.js codebase in the current directory, should we use this?”_ -> **Yes**.
- Select the region and hit enter.

Then, just run:

```bash
npx firebase deploy
```
