import { ShieldCheck, HeartHandshake, Lock, CheckCircle2, Award } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white/70 border-t border-[#DCE9E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1F3EC] text-[#176B67] text-xs font-bold uppercase tracking-wider border border-[#CFE6D9]">
            Trust & Clinical Integrity
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#203936] tracking-tight">
            Designed for Safe, Transparent Guidance
          </h2>
          <p className="text-base sm:text-lg text-[#667A76] leading-relaxed">
            CareGuide AI was built on a single uncompromising principle: Artificial Intelligence must empower patients with clarity and safety, never replace qualified clinicians.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-7 border border-[#DCE9E3] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1F3EC] text-[#176B67] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#203936]">
              Clinical Safety Architecture
            </h3>
            <p className="text-sm text-[#667A76] leading-relaxed">
              Every query is screened for red-flag emergency criteria before any algorithmic exploration occurs. We strictly avoid fabricated diagnostic confidence scores or dangerous medical certainty.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#176B67] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#279B91]" />
              <span>Aligned with WHO triage standards</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#DCE9E3] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7F6] text-[#279B91] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#203936]">
              Privacy by Design
            </h3>
            <p className="text-sm text-[#667A76] leading-relaxed">
              Your health symptoms belong to you. We do not sell user health queries, profile personal identities, or track medical history for behavioral advertising. All sessions remain private.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#176B67] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#279B91]" />
              <span>Zero medical data monetization</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#DCE9E3] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1F3EC] text-[#176B67] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#203936]">
              Doctor-Patient Bridge
            </h3>
            <p className="text-sm text-[#667A76] leading-relaxed">
              Instead of ending at an automated summary, we provide targeted department guidance and a four-question doctor checklist so you can walk into your clinic prepared and confident.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#176B67] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#279B91]" />
              <span>Empowering physician conversations</span>
            </div>
          </div>

        </div>

        {/* Emergency Standards Callout for India */}
        <div className="mt-12 bg-gradient-to-r from-[#176B67] to-[#125552] text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#E1F3EC] text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#CFE6D9]" />
              Indian Emergency Services Integration
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Direct Emergency Dispatch Protocols
            </h3>
            <p className="text-sm text-[#E1F3EC]/90 leading-relaxed">
              For any life-threatening symptoms, dial <strong className="text-white underline">112</strong> immediately. The Unified Emergency Response Support System (ERSS) provides single-number assistance across police, fire, and health emergencies nationwide.
            </p>
            <div className="pt-3 flex flex-wrap gap-4 text-xs font-bold">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                112 — National Unified Emergency
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                108 — Emergency Medical & Ambulance
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                102 — Free Maternal & Infant Transport
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
