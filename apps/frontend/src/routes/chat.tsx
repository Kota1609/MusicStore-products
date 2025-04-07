import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { useChat } from "@ai-sdk/react";

import { genAIResponse } from "../utils/ai";

import type { UIMessage } from "ai";

import "../demo.index.css";

function InitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto w-full">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-transparent bg-clip-text">
          AI Shopping Assistant
        </h1>
        <p className="text-gray-600 mb-6 w-2/3 mx-auto text-lg">
          Ask me anything about our guitars, and I'll help you find the perfect one for you.
        </p>
        {children}
      </div>
    </div>
  );
}

function ChattingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-0 right-0 left-0 bg-white/90 backdrop-blur-sm border-t border-emerald-100">
      <div className="max-w-3xl mx-auto w-full px-4 py-4">{children}</div>
    </div>
  );
}

function Messages({ messages }: { messages: Array<UIMessage> }) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!messages.length) {
    return null;
  }

  return (
    <div ref={messagesContainerRef} className="flex-1 overflow-y-auto pb-24">
      <div className="max-w-3xl mx-auto w-full px-4">
        {messages.map(({ id, role, content }) => (
          <div
            key={id}
            className={`py-6 ${
              role === "assistant"
                ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50"
                : "bg-transparent"
            }`}
          >
            <div className="flex items-start gap-4 max-w-3xl mx-auto w-full">
              {role === "assistant" ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-sm font-medium text-white flex-shrink-0 shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700 flex-shrink-0 shadow-sm">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <ReactMarkdown
                  className="prose max-w-none prose-emerald"
                  rehypePlugins={[
                    rehypeRaw,
                    rehypeSanitize,
                    rehypeHighlight,
                    remarkGfm,
                  ]}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: genAIResponse,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {messages.length === 0 ? (
        <InitalLayout>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 max-w-xl mx-auto w-full"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything about our guitars..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </InitalLayout>
      ) : (
        <>
          <Messages messages={messages} />
          <ChattingLayout>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything about our guitars..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </ChattingLayout>
        </>
      )}
    </div>
  );
}

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});
