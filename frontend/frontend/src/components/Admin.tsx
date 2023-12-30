import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";

const ADMIN_PASSWORD = "ADMIN_PASSWORD";
const BASE_URL = "http://localhost:3000";

export const Admin = () => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const socket = io(BASE_URL);
    setSocket(socket);

    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("joinAdmin", {
        password: ADMIN_PASSWORD,
      });
    });
  }, []);

  const handleCreateSession = () => {
    socket.emit("createSession", {
      sessionId: roomId,
    });
    setSessionId(roomId);
  };

  if (!sessionId) {
    return (
      <Card variant="outlined" style={styles.card}>
        <CardContent>
          <Typography variant="h5" component="div" style={styles.title}>
            Create Session
          </Typography>
          <TextField
            type="text"
            placeholder="Enter roomId"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            style={styles.input}
          />
          <br />
          <Button
            type="button"
            onClick={handleCreateSession}
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Create Session
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined" style={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div" style={styles.title}>
          Session Created
        </Typography>
        <Typography variant="body1" style={styles.sessionText}>
          Your work is over. Thank you.!! - {sessionId}
        </Typography>
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    maxWidth: 400,
    margin: "auto",
    marginTop: 50,
  },
  title: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 10,
    width: "100%",
  },
  button: {
    width: "100%",
  },
  sessionText: {
    textAlign: "center",
  },
};

// export default Admin;
