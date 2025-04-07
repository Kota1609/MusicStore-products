import { Link } from "@tanstack/react-router";
import { Package, Settings, MessageSquare } from "lucide-react";

const USER_APP_URL = import.meta.env.VITE_USER_APP_URL || "http://localhost:3000";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">Admin Portal</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/orders"
              className="text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Orders
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href={USER_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Order with AI</span>
            </a>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
