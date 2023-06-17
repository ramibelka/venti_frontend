import React, { useState } from "react";
import DMConversation from "../components/DMConversation";
import "./Messages.css";

const DMs = () => {
  const [dmData] = useState([
    {
      id: 1,
      user: "User 1",
      conversation: [
        { text: "Message 1", isSender: false },
        { text: "Message 2", isSender: true },
        // ...
      ],
    },
    {
      id: 2,
      user: "User 2",
      conversation: [
        { text: "Message 1", isSender: false },
        { text: "Message 2", isSender: true },
        // ...
      ],
    },
    {
      id: 3,
      user: "User 3",
      conversation: [
        { text: "Message 1", isSender: false },
        { text: "Message 2", isSender: true },
        // ...
      ],
    },
    // Add more user objects as needed
  ]);

  const [selectedDM, setSelectedDM] = useState(null);

  const handleDMClick = (dm) => {
    setSelectedDM(dm);
  };

  return (
    <div className="dm-page">
      <div className="dm-list">
        {/* Render the list of DM items */}
        {dmData.map((dm) => (
          <div
            key={dm.id}
            onClick={() => handleDMClick(dm)}
            className={`dm-item ${selectedDM && selectedDM.id === dm.id ? "active" : ""}`}
          >
            {/* Render DM item content */}
            <span>{dm.user}</span>
          </div>
        ))}
      </div>
      <div className="dm-conversation">
        {/* Render the selected DM conversation */}
        {selectedDM && (
          <DMConversation dm={selectedDM.conversation} />
        )}
      </div>
    </div>
  );
};

export default DMs;
