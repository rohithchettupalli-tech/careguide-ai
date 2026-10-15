import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  Building2, 
  Search, 
  Stethoscope, 
  Clock, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onStartChecker: () => void;
  onFindHospitals: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartChecker,
  onFindHospitals,
}) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Decorative ambient background gradients and organic shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E1F3EC]/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-[#EAF7F6]/80 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#CFE6D9]/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Small Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1F3EC] border border-[#CFE6D9] text-[#176B67] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#176B67]" />
              <span className="text-xs font-bold tracking-wider uppercase">
                INTELLIGENT HEALTHCARE NAVIGATION
              </span>
            </div>

            {/* Main Headline with Teal Gradient Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#203936] tracking-tight leading-[1.12]">
              Better Health Decisions Start With the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176B67] via-[#279B91] to-[#176B67]">
                Right Guidance.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#667A76] max-w-2xl leading-relaxed font-normal">
              Understand your symptoms, recognize important warning signs, explore the right medical department, and find nearby healthcare facilities — all in one simple experience.
            </p>

            {/* CTA Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onStartChecker}
                className="group inline-flex items-center justify-center gap-3 bg-[#176B67] hover:bg-[#125552] text-white font-bold text-base px-7 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Start Symptom Check</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onFindHospitals}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#EAF7F6] text-[#176B67] font-bold text-base px-6 py-4 rounded-xl border border-[#DCE9E3] shadow-xs hover:border-[#279B91] transition-all cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-[#279B91]" />
                <span>Find Nearby Hospitals</span>
              </button>
            </div>

            {/* Reassurance Message */}
            <div className="pt-2 flex items-start sm:items-center gap-2.5 text-xs text-[#667A76]">
              <ShieldCheck className="w-4 h-4 text-[#279B91] shrink-0 mt-0.5 sm:mt-0" />
              <p>
                <strong className="text-[#203936] font-semibold">Clear guidance for your next step.</strong> Professional medical care when you need it.
              </p>
            </div>

            {/* Clinical Trust Points */}
            <div className="pt-4 border-t border-[#DCE9E3]/80 w-full grid grid-cols-3 gap-3 sm:gap-6">
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-[#176B67]">100%</span>
                <span className="text-xs text-[#667A76] font-medium">Non-Diagnostic Safety First</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-[#176B67]">Instant</span>
                <span className="text-xs text-[#667A76] font-medium">Emergency Red-Flag Scan</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-[#176B67]">Verified</span>
                <span className="text-xs text-[#667A76] font-medium">Hospital ER Direct Lines</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Layered Healthcare Application Preview */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Background Glow Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#CFE6D9]/40 to-[#EAF7F6]/60 rounded-3xl transform -rotate-1 scale-102 filter blur-xs" />

              {/* Main Container Card */}
              <div className="relative bg-white rounded-3xl border border-[#DCE9E3] shadow-xl p-5 sm:p-6 space-y-4">
                
                {/* Header Mockup Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE9E3]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#E1F3EC] flex items-center justify-center text-[#176B67]">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#203936]">Active Clinical Session</div>
                      <div className="text-[10px] text-[#667A76] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Screening active • Red-flags checked
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#176B67] bg-[#EAF7F6] px-2 py-0.5 rounded-full border border-[#DCE9E3]">
                    Step 2 of 3
                  </span>
                </div>

                {/* Symptom Input Preview Pill */}
                <div className="bg-[#F7F8F2] border border-[#DCE9E3] rounded-xl p-3 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5 text-xs text-[#203936] font-medium">
                    <Search className="w-4 h-4 text-[#279B91]" />
                    <span>Dry cough, low-grade fever, 3 days...</span>
                  </div>
                  <span className="text-[10px] bg-[#E1F3EC] text-[#176B67] font-semibold px-2 py-0.5 rounded-md">
                    Analyzed
                  </span>
                </div>

                {/* Layered Element 1: Premium Symptom Summary Card */}
                <div className="bg-gradient-to-br from-white to-[#F7F8F2] rounded-2xl border border-[#DCE9E3] p-4 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#203936] uppercase tracking-wider">
                      Reported Profile
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      No Critical Red Flags
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs font-medium bg-[#EAF7F6] text-[#176B67] px-2.5 py-1 rounded-lg border border-[#DCE9E3]">
                      Persistent Dry Cough
                    </span>
                    <span className="text-xs font-medium bg-[#EAF7F6] text-[#176B67] px-2.5 py-1 rounded-lg border border-[#DCE9E3]">
                      Fever (100.2°F)
                    </span>
                    <span className="text-xs font-medium bg-[#F7F8F2] text-[#667A76] px-2 py-1 rounded-lg border border-[#DCE9E3]">
                      Duration: 3 Days
                    </span>
                  </div>
                </div>

                {/* Layered Element 2: Department Recommendation Card */}
                <div className="bg-[#176B67] text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 w-20 h-20 bg-white/10 rounded-full pointer-events-none" />
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] font-medium text-[#E1F3EC] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#CFE6D9]" />
                        Suggested Department
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">
                        General Medicine / Pulmonology
                      </div>
                      <div className="text-xs text-[#E1F3EC]/90 mt-1 line-clamp-1">
                        Best suited for upper respiratory evaluation and auscultation.
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Layered Element 3: Mini Hospital Map Preview Card */}
                <div className="bg-white rounded-2xl border border-[#DCE9E3] p-3 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF7F6] border border-[#CFE6D9] flex items-center justify-center text-[#176B67] shrink-0">
                      <MapPin className="w-5 h-5 text-[#279B91]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#203936] line-clamp-1">
                        Manipal Hospital, Old Airport Rd
                      </div>
                      <div className="text-[11px] text-[#667A76] flex items-center gap-2">
                        <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                          ● 24/7 ER Open
                        </span>
                        <span>• 2.4 km away</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onFindHospitals}
                    className="text-xs font-bold text-[#176B67] hover:text-[#279B91] bg-[#E1F3EC] px-3 py-1.5 rounded-lg border border-[#CFE6D9] transition-colors cursor-pointer"
                  >
                    View Map
                  </button>
                </div>

                {/* Floating Micro Badge */}
                <div className="bg-[#F7F8F2] border border-[#DCE9E3] rounded-xl px-3 py-2 flex items-center justify-between text-[11px] text-[#667A76]">
                  <span className="flex items-center gap-1.5 font-medium text-[#203936]">
                    <Clock className="w-3.5 h-3.5 text-[#279B91]" />
                    Recommended Consultation Window
                  </span>
                  <span className="font-bold text-[#176B67] bg-white px-2 py-0.5 rounded border border-[#DCE9E3]">
                    Within 24–48 Hours
                  </span>
                </div>

              </div>

              {/* Floating Accent Pill (Top Right) */}
              <div className="hidden sm:flex absolute -top-5 -right-5 bg-white border border-[#DCE9E3] rounded-2xl py-2 px-3.5 shadow-lg items-center gap-2.5 animate-float">
                <div className="w-7 h-7 rounded-lg bg-[#E1F3EC] flex items-center justify-center text-[#176B67]">
                  <Activity className="w-4 h-4 text-[#176B67]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#667A76] uppercase font-bold">Triage Status</div>
                  <div className="text-xs font-bold text-[#203936]">Prompt Care Advised</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
