import React, { useState } from 'react';
import { ShieldAlert, Menu, X, ArrowRight, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSymptomChecker: () => void;
  onOpenHospitalFinder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSymptomChecker,
  onOpenHospitalFinder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'symptom-checker', label: 'Symptom Checker' },
    { id: 'hospitals', label: 'Find Hospitals' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === 'symptom-checker') {
      onOpenSymptomChecker();
    } else if (id === 'hospitals') {
      onOpenHospitalFinder();
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F8F2]/90 backdrop-blur-md border-b border-[#DCE9E3] transition-all">
      {/* Top micro-bar for clinical trust & emergency hotline notice */}
      <div className="bg-[#176B67] text-[#E1F3EC] px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-[#279B91] animate-ping" />
              Verified Clinical Triage System
            </span>
            <span className="hidden sm:inline text-white/70">| Non-diagnostic triage & healthcare navigation</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/80 hidden md:inline">Emergency in India?</span>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1 font-bold text-white bg-[#DC2626]/80 hover:bg-[#DC2626] px-2 py-0.5 rounded transition-colors text-[11px]"
            >
              <ShieldAlert className="w-3 h-3" />
              Dial 112
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B67] rounded-lg"
          aria-label="CareGuide AI Home"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#176B67] to-[#279B91] p-0.5 shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center">
            <div className="w-full h-full bg-[#176B67] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              {/* Medical Cross + Spark */}
              <svg className="w-6 h-6 text-[#E1F3EC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E1F3EC] rounded-full border-2 border-[#176B67] flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-[#279B91] rounded-full" />
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-[#203936] tracking-tight group-hover:text-[#176B67] transition-colors">
                CareGuide<span className="text-[#279B91] ml-0.5">AI</span>
              </span>
              <span className="bg-[#E1F3EC] text-[#176B67] text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#CFE6D9]">
                PRO
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#667A76] tracking-wide uppercase">
              Intelligent Healthcare Assistant
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FFFFFF]/70 p-1.5 rounded-full border border-[#DCE9E3] shadow-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#176B67] text-white shadow-xs'
                    : 'text-[#667A76] hover:text-[#203936] hover:bg-[#EAF7F6]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="text-sm font-medium text-[#667A76] hover:text-[#176B67] px-3 py-2 transition-colors cursor-pointer"
          >
            Clinical Safety
          </button>
          <button
            onClick={onOpenSymptomChecker}
            className="group inline-flex items-center gap-2 bg-[#176B67] hover:bg-[#125552] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#203936] hover:text-[#176B67] hover:bg-[#E1F3EC] rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#DCE9E3] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#E1F3EC] text-[#176B67]'
                    : 'text-[#203936] hover:bg-[#EAF7F6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-[#DCE9E3] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSymptomChecker();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#176B67] text-white font-semibold py-3 rounded-xl shadow-xs cursor-pointer"
            >
              <span>Start Symptom Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHospitalFinder();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#E1F3EC] text-[#176B67] font-semibold py-3 rounded-xl hover:bg-[#CFE6D9] transition-colors cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Find Nearby Hospitals</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
