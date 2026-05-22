"use client";
import { useState } from "react";

type ChatRole = "user" | "ai";

type ChatMessage = {
    role: ChatRole;
    text: string;
};

type ChatApiResponse = {
    text?: string;
    error?: string;
};

export default function ChatDemo() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 1. Update UI immediately with the user's message
        const userMessage: ChatMessage = { role: "user", text: input };
        const newMessages: ChatMessage[] = [...messages, userMessage];
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

            const data = (await res.json()) as ChatApiResponse;
            const aiText = data.text ?? data.error ?? "Oops! Something went wrong.";
            const aiMessage: ChatMessage = { role: "ai", text: aiText };

            // 3. Update the UI with Gemini's response
            setMessages([...newMessages, aiMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const fallbackMessage: ChatMessage = {
                role: "ai",
                text: "Oops! Something went wrong.",
            };
            setMessages([...newMessages, fallbackMessage]);
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
                                key={`${msg.role}-${index}`}
                                className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"
                                    }`}
                            >
                                <div
                                    className={`inline-block p-3 rounded-lg max-w-[80%] ${msg.role === "user"
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