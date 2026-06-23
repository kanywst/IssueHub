'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import './Chatbot.css';

// ── Response map ──────────────────────────────────────────────────────────────
// `today` and `time` are computed on call, not at module load
type ResponseValue = string | (() => string) | (() => void);

const responseObj: Record<string, ResponseValue> = {
  hello: 'Hey! How are you doing?',
  hey: "Hey! What's up?",
  today: () => new Date().toDateString(),
  time: () => new Date().toLocaleTimeString(),
  ping: 'Pong',
  rn: () => '__EMAIL_FLOW__',
  about: 'My role is to increase website traffic.',
};

// ── Email validation via zod ──────────────────────────────────────────────────
const emailSchema = z.string().email();

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  text: string;
  type: 'bot' | 'user';
  isWelcome?: boolean;
}

let msgId = 0;
const nextId = () => ++msgId;

// ── Component ─────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Type here');
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [welcomeRendered, setWelcomeRendered] = useState(false);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input and render welcome on first open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 260);
      if (!welcomeRendered) {
        setMessages([{ id: nextId(), text: '', type: 'bot', isWelcome: true }]);
        setWelcomeRendered(true);
      }
    }
  }, [isOpen, welcomeRendered]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const addMessage = (text: string, type: 'bot' | 'user' = 'bot') =>
    setMessages(prev => [...prev, { id: nextId(), text, type }]);

  const removeLastMessage = () => setMessages(prev => prev.slice(0, -1));

  // ── Email flow ─────────────────────────────────────────────────────────────
  function startEmailFlow() {
    setIsEmailMode(true);
    addMessage('Please enter your email:');
    setPlaceholder('your@email.com');
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const submitEmail = async (email: string) => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      addMessage('Invalid email. Please try again.');
      return;
    }

    addMessage(email, 'user');
    setInputValue('');
    addMessage('Sending... ⏳');

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        'YOUR_SERVICE',
        'YOUR_TEMPLATE',
        { user_email: email, user: 'IssueHub' },
        { publicKey: 'YOUR_APIKEY' }
      );
      removeLastMessage();
      addMessage('Email sent successfully! ✅');
    } catch (err) {
      removeLastMessage();
      addMessage('Failed to send. Please try again. ❌');
      console.error(err);
    }

    setIsEmailMode(false);
    setPlaceholder('Type here');
  };

  // ── Message handler ────────────────────────────────────────────────────────
  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    if (isEmailMode) {
      submitEmail(text);
      return;
    }

    addMessage(text, 'user');
    setInputValue('');

    setTimeout(() => {
      const res = responseObj[text.toLowerCase()];

      if (typeof res === 'function') {
        const result = res();
        if (result === '__EMAIL_FLOW__') {
          startEmailFlow();
        } else if (typeof result === 'string') {
          addMessage(result);
        }
      } else if (typeof res === 'string') {
        addMessage(res);
      } else {
        addMessage("Sorry, I didn't understand that. Try: hello, today, time, ping, rn.");
      }
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Chat window */}
      <div
        className={`chatbot-container${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="IssueBot chat"
        aria-modal="false"
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-logo">
            <Image src="/images/logo.png" alt="IssueBot logo" width={32} height={32} />
          </div>
          <span className="chatbot-title">IssueBot</span>
          <button
            type="button"
            className="chatbot-minimize-btn"
            aria-label="Minimize chat"
            onClick={() => setIsOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <line
                x1="4"
                y1="13"
                x2="14"
                y2="13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="chatbot-body" ref={chatBodyRef} aria-live="polite">
          {messages.map(msg =>
            msg.isWelcome ? (
              <WelcomeMessage key={msg.id} onNotify={startEmailFlow} />
            ) : (
              <div
                key={msg.id}
                className={msg.type === 'user' ? 'chatbot-user-msg' : 'chatbot-bot-msg'}
              >
                {msg.text}
              </div>
            )
          )}
        </div>

        {/* Input */}
        <div className="chatbot-input-row">
          <input
            ref={inputRef}
            type={isEmailMode ? 'email' : 'text'}
            className="chatbot-input"
            placeholder={placeholder}
            value={inputValue}
            aria-label="Chat message"
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="chatbot-send-btn"
            aria-label="Send message"
            onClick={handleSend}
          >
            <Image src="/images/send.png" alt="" width={24} height={24} aria-hidden />
          </button>
        </div>
      </div>

      {/* Bubble toggle */}
      <button
        type="button"
        className={`chatbot-bubble${isOpen ? ' open' : ''}`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={() => setIsOpen(v => !v)}
      >
        <svg
          className="icon-chat"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 2C7.477 2 3 6.477 3 12c0 1.89.52 3.66 1.43 5.18L3 22l5.07-1.38A9.96 9.96 0 0013 22c5.523 0 10-4.477 10-10S18.523 2 13 2z"
            fill="white"
          />
        </svg>
        <svg
          className="icon-close"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="4"
            y1="4"
            x2="16"
            y2="16"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="16"
            y1="4"
            x2="4"
            y2="16"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </>
  );
}

// ── Welcome sub-component ─────────────────────────────────────────────────────
function WelcomeMessage({ onNotify }: { onNotify: () => void }) {
  const [dismissed, setDismissed] = useState(false);

  const handleClick = () => {
    setDismissed(true);
    onNotify();
  };

  return (
    <div className="chatbot-bot-msg chatbot-welcome">
      <span>Hi! How can I help you today?</span>
      {!dismissed && (
        <>
          <span className="chatbot-recommended-label">Recommended</span>
          <button type="button" className="chatbot-option-btn" onClick={handleClick}>
            Receive notifications
          </button>
        </>
      )}
    </div>
  );
}
