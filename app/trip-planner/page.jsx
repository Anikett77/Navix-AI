"use client";
import { useState } from "react";

export default function TripPlanner() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Where are you departing from?" }
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    const newMessages = [
      ...messages,
      { role: "user", content: input }
    ];

    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/aimodel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.reply }
    ]);
  }

  return (
    <div>
      <div style={{ minHeight: "300px" }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}