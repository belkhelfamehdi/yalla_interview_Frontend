import React, { type ReactNode } from 'react';
import { LuX } from 'react-icons/lu';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  hideHeader?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/60 backdrop-blur-sm p-4">
      <div className="relative flex flex-col glass-card rounded-3xl overflow-hidden max-w-full max-h-[90vh] animate-float">
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full glass-effect text-gray-600 hover:text-gray-800 hover:bg-white/20 transition-all duration-200"
          onClick={onClose}
        >
          <LuX className="text-xl" />
        </button>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
