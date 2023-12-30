// ChatRoom.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card, CardContent, TextField, Button, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = "http://localhost:3000";

const ChatRoom = () => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState("");
  const [newWroteMessage, setNewWroteMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
    const navigate = useNavigate();
    const {sessionId,name} = useParams();
  useEffect(() => {
    const solve = ()=>{
      try {
        const newSocket = io(BASE_URL);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            newSocket.emit("join", {
            sessionId,
            name,
          });
        });

        newSocket.on("init", ({ userId }) => {
          setUserId(userId);
        });

        newSocket.on("chat", ({ username, content }) => {
          setChats((prevChats) => [...prevChats, { username, content }]);
        });

        newSocket.on("error", (errorMsg) => {
          setError(errorMsg);

          // Remove the error after 5 seconds
          setTimeout(() => {
            setError("");
          }, 5000);
        });

        return () => {
          newSocket.disconnect(); // Disconnect the socket on unmount
        };
      } catch (error) {
        console.error("Socket connection error:", error);
        setError("Error connecting to the server. Please try again later.");
      }
    }
    solve();
  }, []);

  var cardStyle = {
    display: 'block',
    width: '40vw',
    transitionDuration: '0.3s',
}
  return (
    <Card className="chat-room-card" style={cardStyle}>
      <CardContent className="chatBox">
        {error && <Alert severity="error">{error}</Alert>}
        <div className="chatContent">
          {chats.length > 0 ? (
            <div>
              {chats.map((chat, index) => (
                <div key={index}>
                  <strong>{chat.username}:</strong> {chat.content}
                </div>
              ))}
            </div>
          ) : (
            <div>No Chats yet!</div>
          )}
        </div>
        <div style={{margin:"20px"}}></div>

        <TextField
          type="text"
          value={newWroteMessage}
          placeholder="Write something."
          fullWidth
          onChange={(e) => setNewWroteMessage(e.target.value)}
        />
        <br/>
        <div style={{margin:"20px"}}></div>

        <Button
          variant="contained"
          onClick={() => {
            if (!newWroteMessage) {
              setError("Please enter a message.");
              return;
            }
              socket.emit("chat", {
                userId,
                sessionId,
                content: newWroteMessage,
              });
              setNewWroteMessage("");
          }}
        >
          Send
        </Button>
        <span style={{margin:"10px"}}></span>
        <Button
          variant="contained"
          onClick={() => {
            
            try {
              socket.emit("leave", {
                userId,
                sessionId,
              });
              navigate("/chat");
            } catch (error) {
              // Handle the error here
              console.error("Error emitting chat:", error);
              setError("Error sending message. Please try again.");
            }
          }}
        >
          Leave
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChatRoom;
