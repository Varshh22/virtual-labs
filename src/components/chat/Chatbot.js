import React, { useState } from "react";
import "../../styles/Chatbot.css"; // ✅ Keeps the existing import

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return; // Prevent empty messages

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botReply = { text: "I'm here to help!", sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <img src="/assets/chatbot.png" alt="Chatbot" className="chatbot-icon" />
        <span>Chatbot</span>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <img
              src={msg.sender === "bot" ? "/assets/chatbot.png" : "/assets/profile.png"}
              alt={msg.sender}
              className="message-avatar"
            />
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default Chatbot;
