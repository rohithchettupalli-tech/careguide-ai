import { 
  ShieldAlert, 
  Building2, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Printer, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall 
} from 'lucide-react';
import type { AnalysisResult } from '../types';

interface ResultsViewProps {
  result: AnalysisResult;
  onReset: () => void;
  onFindHospitals: (department?: string) => void;
}

export const ResultsView = ({
  result,
  onReset,
  onFindHospitals,
}: ResultsViewProps) => {
  const isEmergency = result.isEmergency || result.urgencyLevel === 'emergency';

  const getUrgencyBadge = () => {
    switch (result.urgencyLevel) {
      case 'emergency':
        return {
          label: 'CRITICAL EMERGENCY',
          bg: 'bg-red-600 text-white',
          border: 'border-red-700',
        };
      case 'prompt':
        return {
          label: 'PROMPT MEDICAL ATTENTION',
          bg: 'bg-amber-100 text-amber-900',
          border: 'border-amber-300',
        };
      case 'routine':
        return {
          label: 'ROUTINE APPOINTMENT',
          bg: 'bg-[#E1F3EC] text-[#176B67]',
          border: 'border-[#CFE6D9]',
        };
      case 'self-care':
        return {
          label: 'SUPPORTIVE MONITORING',
          bg: 'bg-[#EAF7F6] text-[#279B91]',
          border: 'border-[#DCE9E3]',
        };
    }
  };

  const badge = getUrgencyBadge();

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* CRITICAL EMERGENCY BANNER: Unmissable and prominent if red flag */}
        {isEmergency && (
          <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-red-700 animate-in fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/25 text-white text-xs font-black tracking-wider uppercase mb-1">
                    Emergency Alert Detected
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Seek Immediate Medical Care
                  </h2>
                  <p className="text-sm text-white/90 mt-2 max-w-xl font-medium leading-relaxed">
                    {result.emergencyReason || 'Critical red flags have been identified that require urgent emergency evaluation.'}
                  </p>
                </div>
              </div>

              {/* Direct Indian Hotline Calling Button */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                <a
                  href="tel:112"
                  className="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-red-50 font-extrabold text-base px-6 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95"
                >
                  <PhoneCall className="w-5 h-5 text-red-600" />
                  <span>Call 112 (India)</span>
                </a>
                <a
                  href="tel:108"
                  className="inline-flex items-center justify-center gap-2 bg-red-800 hover:bg-red-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                >
                  <span>108 Ambulance Hotline</span>
                </a>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 text-xs text-white/80">
              Do not drive yourself. Have someone drive you or wait for an ambulance immediately.
            </div>
          </div>
        )}

        {/* Top Action Bar: Session Metadata + Print & Reset */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#DCE9E3]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#667A76] uppercase tracking-wider">
                Clinical Evaluation Summary
              </span>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.border}`}>
                {badge.label}
              </span>
            </div>
            <div className="text-xs text-[#667A76] mt-0.5">
              Reference ID: {result.id} • Generated at {result.timestamp}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B67] hover:bg-[#E1F3EC] px-3.5 py-2 rounded-xl border border-[#DCE9E3] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save</span>
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#667A76] hover:text-[#203936] hover:bg-[#F7F8F2] px-3.5 py-2 rounded-xl border border-[#DCE9E3] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Check</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: Reported Symptom Summary */}
        <div className="bg-white rounded-3xl border border-[#DCE9E3] p-6 shadow-sm">
          <h3 className="text-xs font-bold text-[#667A76] uppercase tracking-wider mb-3">
            Reported Clinical Profile
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {result.symptomSummary.symptoms.map((s) => (
              <span
                key={s}
                className="bg-[#EAF7F6] text-[#176B67] font-bold text-xs px-3.5 py-1.5 rounded-xl border border-[#CFE6D9]"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-[#DCE9E3] text-xs">
            <div>
              <span className="text-[#667A76] block">Duration</span>
              <span className="font-bold text-[#203936] capitalize">{result.symptomSummary.duration}</span>
            </div>
            <div>
              <span className="text-[#667A76] block">Severity</span>
              <span className="font-bold text-[#203936] capitalize">{result.symptomSummary.severity}</span>
            </div>
            <div>
              <span className="text-[#667A76] block">Age Bracket</span>
              <span className="font-bold text-[#203936] capitalize">{result.symptomSummary.ageGroup}</span>
            </div>
            <div>
              <span className="text-[#667A76] block">Pre-existing</span>
              <span className="font-bold text-[#203936] line-clamp-1">{result.symptomSummary.conditions.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Recommended Next Step Card */}
        <div className="bg-[#176B67] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#E1F3EC] text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                Recommended Care Timeline
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {result.recommendedNextStep.headline}
              </h3>
              <div className="text-sm font-semibold text-[#CFE6D9]">
                Timeframe: {result.recommendedNextStep.timeframe}
              </div>
              <p className="text-xs sm:text-sm text-[#E1F3EC]/90 leading-relaxed max-w-xl">
                {result.recommendedNextStep.guidance}
              </p>
            </div>

            <button
              onClick={() => onFindHospitals(result.suggestedDepartment.name)}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#EAF7F6] text-[#176B67] font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#279B91]" />
              <span>Find Nearby Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SECTION 3: Suggested Medical Department */}
        <div className="bg-white rounded-3xl border border-[#DCE9E3] p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E1F3EC] text-[#176B67] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#667A76] uppercase tracking-wider block">
                  Suggested Department
                </span>
                <h4 className="text-xl font-extrabold text-[#203936]">
                  {result.suggestedDepartment.name}
                </h4>
              </div>
            </div>

            <button
              onClick={() => onFindHospitals(result.suggestedDepartment.name)}
              className="text-xs font-bold text-[#176B67] bg-[#E1F3EC] hover:bg-[#CFE6D9] px-4 py-2.5 rounded-xl border border-[#CFE6D9] transition-colors self-start sm:self-center cursor-pointer"
            >
              Search Hospitals with this Department →
            </button>
          </div>

          <p className="text-sm text-[#667A76] leading-relaxed mb-4">
            {result.suggestedDepartment.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#DCE9E3] text-xs">
            <div className="bg-[#F7F8F2] p-3 rounded-xl border border-[#DCE9E3]">
              <span className="font-bold text-[#203936] block mb-0.5">Specialist Qualification</span>
              <span className="text-[#667A76]">{result.suggestedDepartment.commonSpecialists}</span>
            </div>
            <div className="bg-[#F7F8F2] p-3 rounded-xl border border-[#DCE9E3]">
              <span className="font-bold text-[#203936] block mb-0.5">When to Consult</span>
              <span className="text-[#667A76]">{result.suggestedDepartment.whenToConsult}</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: Exploratory Possibilities (Clearly marked as non-diagnostic!) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-lg font-bold text-[#203936] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#279B91]" />
              Exploratory Considerations for Discussion
            </h3>
            <span className="text-[11px] font-semibold text-[#667A76] bg-[#F7F8F2] px-2.5 py-1 rounded-full border border-[#DCE9E3]">
              Non-Diagnostic Possibilities • No Fake Probabilities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.possibleExplanations.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#DCE9E3] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#176B67] bg-[#E1F3EC] px-2.5 py-0.5 rounded-full border border-[#CFE6D9]">
                      Possibility {idx + 1}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#203936] mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#667A76] leading-relaxed mb-4">
                    {item.context}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-bold text-[#203936] block">
                      Common Correlated Signs:
                    </span>
                    {item.commonSigns.map((sign) => (
                      <div key={sign} className="text-xs text-[#667A76] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#279B91]" />
                        <span>{sign}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE9E3] text-xs text-[#176B67] bg-[#F7F8F2] p-2.5 rounded-xl">
                  <strong>Clinical note:</strong> {item.generalAdvice}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: Critical Red Flags to Watch */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-7">
          <div className="flex items-center gap-2.5 text-amber-900 font-extrabold text-base mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Warning Signs Requiring Immediate Emergency Care</span>
          </div>
          <p className="text-xs text-amber-800 mb-4">
            Seek immediate medical attention at an emergency room or dial 112 if you develop any of the following acute signs:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {result.warningSignsToWatch.map((warning, idx) => (
              <div
                key={idx}
                className="bg-white/90 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Doctor Discussion Checklist */}
        <div className="bg-white rounded-3xl border border-[#DCE9E3] p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#203936] font-bold text-base mb-2">
            <HelpCircle className="w-5 h-5 text-[#176B67]" />
            <span>Recommended Questions for Your Doctor</span>
          </div>
          <p className="text-xs text-[#667A76] mb-4">
            Bring these specific, clinical questions to your doctor's appointment to make the most of your consultation:
          </p>
          <div className="space-y-2.5">
            {result.doctorDiscussionGuide.map((q, idx) => (
              <div
                key={idx}
                className="bg-[#F7F8F2] border border-[#DCE9E3] rounded-2xl p-3.5 text-xs text-[#203936] flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#279B91] shrink-0 mt-0.5" />
                <span className="font-medium">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Disclaimer Banner */}
        <div className="bg-[#F7F8F2] border border-[#DCE9E3] rounded-2xl p-4 text-center text-xs text-[#667A76] leading-relaxed">
          <strong className="text-[#203936]">Clinical Disclaimer:</strong> {result.disclaimer}
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onFindHospitals(result.suggestedDepartment.name)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#176B67] hover:bg-[#125552] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>Find Hospitals for {result.suggestedDepartment.name}</span>
          </button>
          <button
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#203936] hover:bg-[#EAF7F6] font-bold text-sm px-6 py-4 rounded-xl border border-[#DCE9E3] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#667A76]" />
            <span>Check Different Symptoms</span>
          </button>
        </div>

      </div>
    </div>
  );
};
