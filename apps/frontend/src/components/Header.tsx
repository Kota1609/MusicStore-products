import { Link } from "@tanstack/react-router";
import { Guitar } from "lucide-react";
import AIAssistant from "./AIAssistant";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Guitar className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">Music Store</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/orders"
              className="text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              My Orders
            </Link>
          </nav>

          <div className="flex items-center">
            <AIAssistant />
          </div>
        </div>
      </div>
    </header>
  );
}
