import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(url)
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      let decodedMessage: string;
      if (typeof event.data === 'string') {
        decodedMessage = event.data;
      } else {
        const decoder = new TextDecoder('utf-8');
        decodedMessage = decoder.decode(new Uint8Array(event.data));
      }

      setMessages((prevMessages) => [...prevMessages, decodedMessage]);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (message.trim() !== '') {
        socket.send(message);
        setMessage('');
      }
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }, [socket, message]);

  return { socket, messages, message, setMessage, sendMessage };
};

const App: React.FC = () => {
  const { socket, messages, message, setMessage, sendMessage } = useWebSocket(process.env.REACT_APP_WSS  as string);

  return (
    <div className="App">
      <div className="Chat">
        <div className="Messages">
          {messages.map((msg, index) => (
            <div key={index} className="Message" style={{ marginBottom: '5px' }}>
              {msg}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={!socket || socket.readyState !== WebSocket.OPEN}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
