import React from "react";
import { X } from "lucide-react";

export const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-900">
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => (
  <div className="mt-4 text-gray-700">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-900">{children}</h2>
);

export const DialogDescription = ({ children }) => (
  <p className="mt-2 text-sm text-gray-600">{children}</p>
);