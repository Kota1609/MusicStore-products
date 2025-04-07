import { useEffect, useRef } from "react";
import { useStore } from "@tanstack/react-store";
import { Send, Bot, User, MessageSquare, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { useChat } from "@ai-sdk/react";
import { genAIResponse } from "../utils/ai";

import { showAIAssistant } from "../store/assistant";

import GuitarRecommendation from "./GuitarRecommendation";

import type { UIMessage } from "ai";

function Messages({ messages }: { messages: Array<UIMessage> }) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-6 rounded-lg bg-emerald-50/50">
          <Bot className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Shopping Assistant</h3>
          <p className="text-gray-600">Ask me anything about our guitars! I'm here to help you find the perfect one.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(({ id, role, content, parts }) => (
        <div
          key={id}
          className={`rounded-lg p-4 ${
            role === "assistant"
              ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50"
              : "bg-white shadow-sm"
          }`}
        >
          {content.length > 0 && (
            <div className="flex items-start gap-3">
              {role === "assistant" ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <ReactMarkdown
                  className="prose max-w-none prose-emerald prose-sm"
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
          )}
          {parts
            .filter((part) => part.type === "tool-invocation")
            .filter(
              (part) => part.toolInvocation.toolName === "recommendGuitar"
            )
            .map((toolCall) => (
              <div
                key={toolCall.toolInvocation.toolName}
                className="max-w-[80%] mx-auto mt-4"
              >
                <GuitarRecommendation id={toolCall.toolInvocation.args.id} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default function AIAssistant() {
  const isOpen = useStore(showAIAssistant);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [],
    fetch: (_url, options) => {
      const { messages } = JSON.parse(options!.body! as string);
      return genAIResponse({
        data: {
          messages,
        },
      });
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => showAIAssistant.setState((state) => !state)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm font-medium">AI Assistant</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[500px] h-[600px] bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">AI Shopping Assistant</h3>
            </div>
            <button
              onClick={() => showAIAssistant.setState((state) => !state)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <Messages messages={messages} />

          <div className="p-4 border-t border-gray-100">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything about our guitars..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
