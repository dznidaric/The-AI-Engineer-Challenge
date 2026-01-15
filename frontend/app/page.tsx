'use client';

import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '@/lib/api';
import styles from './page.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await sendMessage(userMessage.content);
      const assistantMessage: Message = {
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>BEYOND CHATGPT</h1>
        <p className={styles.subtitle}>Mental Coach Interface</p>
      </header>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.welcomeMessage}>
              <p>Welcome. How can I help you today?</p>
              <p className={styles.hint}>Type your message below and press Enter...</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.role === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <div className={styles.messageHeader}>
                <span className={styles.roleLabel}>
                  {message.role === 'user' ? 'YOU' : 'COACH'}
                </span>
                <span className={styles.timestamp}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className={styles.messageContent}>{message.content}</div>
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message..."
              className={styles.input}
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={styles.submitButton}
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
