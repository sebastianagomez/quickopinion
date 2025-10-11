import React from 'react';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Quick<span className="text-primary">Opinion</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
