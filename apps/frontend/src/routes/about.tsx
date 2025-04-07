import { createFileRoute } from "@tanstack/react-router";
import { Send, Music, ShoppingCart, MessageSquare, Headphones, Bot, Package, Cpu } from "lucide-react";
import { Link } from "@tanstack/react-router";

import "../demo.index.css";

function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to <span className="text-emerald-600">Music Store</span>
        </h1>
        <p className="text-gray-600 text-lg text-center mb-12">
          Experience the future of online shopping with our AI-powered music store.
          Simply describe what you want, and our intelligent assistant will help you find and purchase your perfect instrument.
        </p>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-8 h-8 text-emerald-600" />
            <h2 className="text-2xl font-semibold">Powered by Model Context Protocol (MCP)</h2>
          </div>
          <div className="space-y-8">
            <p className="text-gray-600 text-lg">
              Our AI assistant is built using the Model Context Protocol (MCP), a cutting-edge framework that enables seamless integration between AI models and backend services. This powerful technology stack creates a truly intelligent shopping experience.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Bot className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-emerald-600 text-lg mb-2">How AI Assistant Works with MCP</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-medium text-gray-800 mb-2">1. Natural Language Processing</h4>
                      <p className="text-gray-600 text-sm">
                        The AI assistant (Claude 3.5 Sonnet) processes your natural language requests, understanding your preferences and requirements for guitars.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-medium text-gray-800 mb-2">2. Product Search and Matching</h4>
                      <p className="text-gray-600 text-sm">
                        Using MCP tools, the AI queries the Products API to find guitars matching your criteria, including specifications, price range, and features.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-medium text-gray-800 mb-2">3. Inventory Verification</h4>
                      <p className="text-gray-600 text-sm">
                        The AI checks product availability through the Fulfillment API, ensuring the guitars you're interested in are in stock.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-medium text-gray-800 mb-2">4. Order Processing</h4>
                      <p className="text-gray-600 text-sm">
                        When you're ready to purchase, the AI uses MCP to submit your order to the Fulfillment API, handling all the necessary details like customer information and product selection.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-medium text-gray-800 mb-2">5. Real-time Updates</h4>
                      <p className="text-gray-600 text-sm">
                        Throughout the process, MCP maintains a persistent connection, allowing the AI to provide real-time updates about order status and any changes in product availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-8 mb-12">
          <p className="text-lg text-gray-700 mb-6">
            Experience the future of guitar shopping with our AI-powered assistant. 
            Simply chat with our AI assistant to explore our collection, get personalized recommendations, 
            and place your order - all through a natural conversation!
          </p>
          <div className="flex justify-center">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Start Chatting with AI
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-semibold">AI Shopping Assistant</h2>
            </div>
            <p className="text-gray-600">
              Our AI assistant is here to help you find the perfect guitar. Just chat naturally about what you're looking for, 
              and it will guide you through the selection process and help you place your order.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-semibold">Expert Guidance</h2>
            </div>
            <p className="text-gray-600">
              Get personalized recommendations based on your preferences, playing style, and budget. 
              Our AI understands guitar specifications and can help you make an informed decision.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            Developed with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/kota-srichandan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline transition-colors"
            >
              Srichandan Kota
            </a>{" "}
            using the magic of MCP
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
});