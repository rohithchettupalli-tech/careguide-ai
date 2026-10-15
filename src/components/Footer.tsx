import { ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

const CURRENT_YEAR = 2026;

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-[#203936] text-[#E1F3EC] border-t border-[#176B67] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#176B67] to-[#279B91] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#176B67] rounded-[9px] flex items-center justify-center relative overflow-hidden">
                  <svg className="w-5 h-5 text-[#E1F3EC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  CareGuide<span className="text-[#279B91]">AI</span>
                </span>
                <span className="text-[10px] text-[#CFE6D9] uppercase font-semibold tracking-wider">
                  Intelligent Healthcare Assistant
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E1F3EC]/80 leading-relaxed max-w-sm">
              Empowering individuals with safe, cautious, non-diagnostic symptom guidance, medical department matching, and immediate emergency awareness.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#CFE6D9]">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Active Healthcare SaaS
              </span>
              <span>•</span>
              <span>v2.4 Production</span>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#E1F3EC]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('symptom-checker')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Symptom Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hospitals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Find Nearby Hospitals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Clinical Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Departments (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-[#E1F3EC]/80">
              <li>General Medicine</li>
              <li>Pulmonology</li>
              <li>Cardiology</li>
              <li>Gastroenterology</li>
              <li>Neurology & Spine</li>
              <li>ENT & Sinus Care</li>
            </ul>
          </div>

          {/* Emergency Hotlines Box (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              Emergency Lines (India)
            </h4>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="text-[#E1F3EC]/80">National Emergency</span>
                <a href="tel:112" className="font-extrabold text-red-300 hover:text-white">
                  112
                </a>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="text-[#E1F3EC]/80">Medical Ambulance</span>
                <a href="tel:108" className="font-extrabold text-white hover:text-red-300">
                  108
                </a>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="text-[#E1F3EC]/80">Maternal & Child</span>
                <a href="tel:102" className="font-extrabold text-white hover:text-red-300">
                  102
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#E1F3EC]/80">Health Helpline</span>
                <a href="tel:104" className="font-extrabold text-white hover:text-red-300">
                  104
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Clinical Disclaimer Row */}
        <div className="pt-8 pb-4 text-xs text-[#E1F3EC]/70 leading-relaxed border-b border-white/10">
          <p>
            <strong className="text-white">Important Clinical Disclaimer:</strong> CareGuide AI is an educational triage navigation platform designed to provide cautious health information and assist in discovering appropriate medical specialties and nearby accredited healthcare facilities. CareGuide AI does not make official medical diagnoses, prescribe pharmaceuticals, or substitute for the clinical judgment of an MBBS/MD qualified physician. If you are experiencing symptoms that could indicate a life-threatening medical emergency (such as severe chest pain, breathing difficulty, sudden speech disruption, or severe trauma), call 112 immediately or proceed to the nearest emergency room.
          </p>
        </div>

        {/* Bottom Copyright & Hackathon presentation note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E1F3EC]/60 gap-4">
          <p>© {CURRENT_YEAR} CareGuide AI. Designed with clinical safety and user empathy.</p>
          <div className="flex items-center gap-1 text-[#CFE6D9]">
            <span>Crafted for high-impact healthcare innovation</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </div>
        </div>

      </div>
    </footer>
  );
};
