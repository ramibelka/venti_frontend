import React, { useEffect, useRef, useState } from "react";
import "../containers/Messages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTie, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const DMConversation = ({ dm }) => {
  const messagesEndRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState(dm);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (messageText.trim() !== "") {
      const newMessage = {
        text: messageText,
        isSender: true
      };

      setConversation([...conversation, newMessage]);
      setMessageText(""); // Clear the message input field
      scrollToBottom(); // Scroll to the latest message
    }
  };

  return (
    <div className="dm-conversation-container">
      <div className="dm-messages">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`dm-message ${message.isSender ? "sender" : "receiver"}`}
          >
            {!message.isSender && (
              <div className="user-icon">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
            )}
            <div className="message-content">
              <p>{message.text}</p>
            </div>
            {message.isSender && (
              <div className="user-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Send message input and button */}
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default DMConversation;
