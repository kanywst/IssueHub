'use client';

import { useEffect, useRef, useState } from 'react';
import './Chatbot.css';

// ── Responses ────────────────────────────────────────────────────────────────
type ResponseValue = string | (() => void);

// startEmailFlow se define abajo; la referencia se resuelve en runtime
const responseObj: Record<string, ResponseValue> = {
  hello: 'Hey! How are you doing?',
  hey: "Hey! What's Up",
  today: new Date().toDateString(),
  time: new Date().toLocaleTimeString(),
  ping: 'Pong',
  rn: () => (responseObj.__triggerEmail as () => void)?.(),
  about: 'My role is to increase website traffic',
};

// ── EmailJS ───────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    emailjs: {
      init: (opts: { publicKey: string }) => void;
      send: (
        serviceId: string,
        templateId: string,
        params: Record<string, string>
      ) => Promise<unknown>;
    };
  }
}

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
  const [emailJsReady, setEmailJsReady] = useState(false);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load EmailJS script once
  useEffect(() => {
    if (document.getElementById('emailjs-script')) {
      setEmailJsReady(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'emailjs-script';
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      window.emailjs.init({ publicKey: 'De3J97q5iJ8M72LB0' });
      setEmailJsReady(true);
    };
    document.head.appendChild(script);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 260);
      if (!welcomeRendered) {
        setMessages([{ id: nextId(), text: '', type: 'bot', isWelcome: true }]);
        setWelcomeRendered(true);
      }
    }
  }, [isOpen, welcomeRendered]);

  // Wire up the rn shortcut to startEmailFlow
  useEffect(() => {
    responseObj.__triggerEmail = startEmailFlow;
  });

  // ── Helpers ────────────────────────────────────────────────────────────────
  const addMessage = (text: string, type: 'bot' | 'user' = 'bot') => {
    setMessages(prev => [...prev, { id: nextId(), text, type }]);
  };

  const removeLastMessage = () => {
    setMessages(prev => prev.slice(0, -1));
  };

  // ── Email flow ─────────────────────────────────────────────────────────────
  function startEmailFlow() {
    setIsEmailMode(true);
    addMessage('Please enter your email:');
    setPlaceholder('your@email.com');
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const submitEmail = async (email: string) => {
    if (!email.includes('@') || !email.includes('.')) {
      addMessage('Invalid email. Try again.');
      return;
    }

    addMessage(email, 'user');
    setInputValue('');
    addMessage('Sending... ⏳');

    try {
      if (!emailJsReady) throw new Error('EmailJS not ready');
      await window.emailjs.send('service_2fc5v5k', 'template_d3d70zp', {
        user_email: email,
        user: 'test',
      });
      removeLastMessage();
      addMessage('Email sent ✅');
    } catch (err) {
      removeLastMessage();
      addMessage('Failed to send ❌');
      console.error(err);
    }

    setIsEmailMode(false);
    setPlaceholder('Type here');
  };

  // ── User message handler ───────────────────────────────────────────────────
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
        res();
      } else {
        addMessage((res as string) || 'Please try something else');
      }
    }, 500);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Chat window */}
      <div className={`chat-container${isOpen ? ' open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="logo">
            <img src="/Imagenes/logo.png" alt="IssueBot logo" />
          </div>
          <div className="title">IssueBot</div>
          <button className="minimize-btn" title="Minimizar" onClick={() => setIsOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line
                x1="4"
                y1="13"
                x2="14"
                y2="13"
                stroke="#161616"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map(msg =>
            msg.isWelcome ? (
              <WelcomeMessage key={msg.id} onNotify={startEmailFlow} />
            ) : (
              <div
                key={msg.id}
                className={msg.type === 'user' ? 'user-message' : 'chatbot-message'}
              >
                {msg.text}
              </div>
            )
          )}
        </div>

        {/* Input */}
        <div className="chat-input">
          <div className="input-sec">
            <input
              ref={inputRef}
              type="text"
              id="txtInput"
              placeholder={placeholder}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyUp={handleKeyUp}
            />
          </div>
          <div className="send" onClick={handleSend}>
            <img src="/Imagenes/send.png" alt="send" />
          </div>
        </div>
      </div>

      {/* Bubble */}
      <div className={`chat-bubble${isOpen ? ' open' : ''}`} onClick={() => setIsOpen(v => !v)}>
        <svg className="icon-chat" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M13 2C7.477 2 3 6.477 3 12c0 1.89.52 3.66 1.43 5.18L3 22l5.07-1.38A9.96 9.96 0 0013 22c5.523 0 10-4.477 10-10S18.523 2 13 2z"
            fill="white"
          />
        </svg>
        <svg className="icon-close" width="20" height="20" viewBox="0 0 20 20" fill="none">
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
      </div>
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
    <div className="chatbot-message welcome-wrapper">
      Hi! How can I help you today?
      {!dismissed && (
        <>
          <span className="recommended-label">Recommended</span>
          <button className="option-btn" onClick={handleClick}>
            Receive notifications
          </button>
        </>
      )}
    </div>
  );
}
