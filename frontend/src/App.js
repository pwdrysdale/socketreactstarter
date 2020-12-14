import react, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function App() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useState(() => {
    socketRef.current = io.connect("/");
    socketRef.current.on("connected", (id) => setUserId(id));
  }, []);

  socketRef.current.on("chatMessage", (message) => {
    setChat([...chat, message]);
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(message);
    socketRef.current.emit("chatMessage", { userId, message });
    setMessage("");
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {chat.map((x) => (
        <p>
          {x.message} - {x.userId}
        </p>
      ))}
    </div>
  );
}

export default App;
