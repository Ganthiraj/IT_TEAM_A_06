import React, { useState } from 'react';
import './chatbot.css';
import Navbar from './navbar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      setMessages([
        ...messages,
        { message: input, isUser: true },
        { message: <LoadingMessage />, isUser: false, isLoading: true },
      ]);

      try {
        const response = await axios.post('http://localhost:3003/distilbert', {
          question: input,
        });

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const loadingIndex = updatedMessages.findIndex((msg) => msg.isLoading);
          updatedMessages[loadingIndex] = {
            message: response.data.answer,
            isUser: false,
            isLoading: false,
          };
          return updatedMessages;
        });
      } catch (error) {
        console.error('Error fetching DistilBERT answer:', error);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const loadingIndex = updatedMessages.findIndex((msg) => msg.isLoading);
          updatedMessages[loadingIndex] = {
            message: 'Error processing question',
            isUser: false,
            isLoading: false,
          };
          return updatedMessages;
        });
      }

      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <Navbar />
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            <FontAwesomeIcon icon={faArrowRight} className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

const LoadingMessage = () => (
  // Replace this with your preferred loading message and spinner
  <div className="loading-message">
    <div className="spinner">
      <div className="spinner-circle"></div>
      <div className="spinner-line"></div>
    </div>
  </div>
);
export default Chatbot;
