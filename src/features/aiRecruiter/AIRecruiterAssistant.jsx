import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaExpand,
  FaMicrochip,
  FaMicrophone,
} from "react-icons/fa";

import "./AIRecruiterAssistant.css";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import SuggestedPrompts from "./SuggestedPrompts";


function AIRecruiterAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = {
      sender: "user",
      text: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(async () => {
  try {
    const response = await fetch(
      "${API_BASE_URL}/api/ai/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          history: messages,
        }),
      }
    );

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "AI service is temporarily unavailable.",
      },
    ]);
  }

  setIsTyping(false);
}, 1200);
  };
  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setInput(transcript);

      setTimeout(() => {
        sendMessage(transcript);
      }, 400);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };
  return (
    <>
      <motion.button
        className="ai-launcher"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRobot />
        <span>AI Recruiter</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="ai-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="ai-chat-modal"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
            >
              <div className="ai-chat-header">
                <div className="ai-header-left">
                  <div className="ai-avatar">
                    <FaMicrochip />
                  </div>

                  <div>
                    <h3>AI Recruiter Assistant</h3>
                    <p>Candidate Intelligence Interface</p>
                  </div>
                </div>

                <div className="ai-header-actions">
                  <button>
                    <FaExpand />
                  </button>

                  <button onClick={() => setIsOpen(false)}>
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="ai-chat-body">
                {messages.length < 4 && (
                  <>
                    <div className="ai-welcome-card">
                      <h2>Hello Recruiter 👋</h2>
                      <p>
                        I’m Vishal’s AI recruiter assistant. Ask me anything
                        about skills, certifications, projects, leadership, or
                        role fit.
                      </p>
                    </div>

                    <SuggestedPrompts onPromptClick={sendMessage} />
                    <a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="resume-download-btn"
>
  Download Resume
</a>
                  </>
                )}

                {messages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    sender={msg.sender}
                    text={msg.text}
                  />
                ))}

                {isTyping && <TypingIndicator />}

                <div ref={chatEndRef}></div>
              </div>

              <div className="ai-chat-input">
                <input
                  type="text"
                  value={input}
                  placeholder="Ask about candidate qualifications..."
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && sendMessage()
                  }
                />

                <button
                  className={`mic-btn ${isListening ? "listening" : ""}`}
                  onClick={startVoiceRecognition}
                >
                  <FaMicrophone />
                </button>

                <button onClick={() => sendMessage()}>
                  Send
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIRecruiterAssistant;