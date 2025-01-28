import React, { useState } from "react";
import chatbotIcon from '../assets/Chatbot.png';
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the chatbot visibility

  // Function to toggle the chatbot window
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating Chatbot Icon */}
      <div
        onClick={toggleChatbot}
        className="fixed bottom-8 right-8 transition-all cursor-pointer bg-[#6cacff] rounded-full p-4 shadow-lg hover:shadow-xl "
        style={{
          animation: "jump 1s infinite alternate", 
        }}
      >
      <img src={chatbotIcon} alt="Chatbot" style={{ width: '50px', height: '50px' }} />
      </div>

      {/* Chatbot Iframe */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-96 z-50">
          <div className="relative w-full h-full">
            <iframe
              src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/21/05/20250121052347-QK1TKS8Q.json"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="Chatbot"
            ></iframe>

            {/* Close Button */}
            <button
              onClick={toggleChatbot}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
