'use client';

import { useState } from 'react';

export default function WaitlistForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Store email in localStorage (for demo purposes)
    const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
    if (existingEmails.includes(email)) {
      setMessage('This email is already on the waitlist.');
      setIsSubmitting(false);
      return;
    }

    existingEmails.push(email);
    localStorage.setItem('waitlistEmails', JSON.stringify(existingEmails));

    setMessage('Thank you! You\'ve been added to the waitlist.');
    setEmail('');
    setIsSubmitting(false);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md max-md:mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-50"
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </button>
      </div>
      {message && (
        <p className={`text-sm ${message.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
