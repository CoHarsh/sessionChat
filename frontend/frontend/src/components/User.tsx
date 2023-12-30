// User.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Button } from "@mui/material";

export const User = () => {
  const [userName, setUserName] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!submitted) {
      setSubmitted(true);
      navigate(`/chat/${sessionId}/${userName}`);
    }
  };

  return (
    <Card>
      <CardContent>
          <div>
            <TextField
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
            <div style={{margin:"20px"}}></div>
            <TextField
              type="text"
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="Enter session ID"
            />
            <br/>
            <button  onClick={handleJoin} className="button">
              Join
            </button>
          </div>
      </CardContent>
    </Card>
  );
};

