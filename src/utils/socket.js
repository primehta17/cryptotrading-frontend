// src/utils/socket.js
const socket = new WebSocket("ws://localhost:5000"); // backend URL

socket.onopen = () => console.log(" WebSocket connected");
socket.onclose = () => console.log(" WebSocket disconnected");
socket.onerror = (err) => console.error(" WebSocket error:", err);

export default socket;
