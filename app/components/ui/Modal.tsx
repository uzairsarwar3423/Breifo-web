'use client';

import { useEffect, useRef, useCallback, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling on the background body
      document.body.style.overflow = 'hidden';
      // Optional: Add padding to prevent "layout shift" if scrollbar disappears
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-end sm:justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      {/* Container with mobile "Drawer" style and desktop "Center" style */}
      <div 
        className="
          relative w-full bg-white shadow-2xl 
          /* Mobile: Bottom-up drawer */
          rounded-t-[20px] max-h-[92vh] flex flex-col
          animate-in slide-in-from-bottom sm:slide-in-from-none
          /* Desktop: Centered box */
          sm:rounded-2xl sm:max-w-lg sm:max-h-[min(800px,90vh)]
          sm:zoom-in-95 sm:fade-in duration-300
        "
      >
        {/* Mobile Pull Indicator (Visual hint) */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Improved Touch-friendly Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-2 right-2 sm:top-4 sm:right-4 
            p-3 sm:p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors
            active:scale-95 z-[60]
          "
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto px-6 pb-10 pt-6 sm:py-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}