import React, { useState } from 'react';
import { User } from '../types';

interface LoginViewProps {
  onLoginSuccess: (user: User, redirectTarget: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Harap masukkan alamat Email Anda!');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      if (!res.ok) {
        throw new Error('Gagal melakukan login');
      }

      const data = await res.json();
      onLoginSuccess(data.user, data.redirectTarget);
    } catch (err) {
      setErrorMsg('Gagal masuk. Silakan periksa kembali email Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFillIbu = () => {
    setFullName('Siti Aminah');
    setEmail('siti.aminah@gmail.com');
    setPassword('123456');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* Main Login Box */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 flex flex-col items-center shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">
          Login
        </h1>

        {errorMsg && (
          <div className="w-full mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Nama lengkap
            </label>
            <input
              type="text"
              placeholder="Enter your Full Name here"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your Email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </div>
        </form>

        {/* Google Signup Button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleQuickFillIbu}
            className="px-5 py-2.5 bg-white border border-slate-300 hover:border-slate-400 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-2.5 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sing up with Google
          </button>
        </div>
      </div>
    </div>
  );
};
