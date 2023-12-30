import {} from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Admin } from "./components/Admin";
import { User } from "./components/User";
import ChatRoom from "./components/ChatRoom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Base Url.</>} />
        <Route path="/chat" element={<User/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/chat/:sessionId/:name" element={<ChatRoom/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
