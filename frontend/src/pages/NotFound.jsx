import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-4xl font-bold text-slate-200 mb-2">404</h1>
        <p className="text-slate-400 mb-6">Page Not Found</p>
        <Link to="/" className="px-4 py-2 text-sm bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors">
          Return Home
        </Link>
      </div>
    </main>
  );
}
