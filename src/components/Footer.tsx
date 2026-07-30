import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-[#091325] text-white pt-12 pb-8 font-sans border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand & Address */}
          <div className="space-y-3 md:col-span-1">
            <h2 className="text-xl font-black tracking-tight text-white">Smart Posyandu</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Gedung Balai Desa Mawar Sejahtera, Jl. Mt haryono. No 1, Kota Malang, Jawa Timur, Indonesia
            </p>
          </div>

          {/* Tautan Navigasi */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Tautan Navigasi</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <button onClick={() => onNavigateTab?.('dashboard')} className="hover:text-white transition cursor-pointer">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('balita')} className="hover:text-white transition cursor-pointer">
                  Tentang Program
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab?.('pemeriksaan')} className="hover:text-white transition cursor-pointer">
                  Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Lainnya */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Lainnya</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <a href="#privacy" className="hover:text-white transition">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>

          {/* WhatsApp Layanan */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">WhatsApp Layanan</h3>
            <div>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-full transition shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-800" />
                <span>Chat Kader Sekarang</span>
              </a>
            </div>
            <p className="text-xs font-semibold text-slate-300 pt-1">0812-3456-7890</p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-slate-400 font-medium">
          <p>© 2026 Smart Posyandu - Membangun Generasi Sehat Digital</p>
        </div>
      </div>
    </footer>
  );
};
