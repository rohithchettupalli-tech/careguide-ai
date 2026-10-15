import { 
  FileText, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface HowItWorksSectionProps {
  onStartJourney: () => void;
}

export const HowItWorksSection = ({ onStartJourney }: HowItWorksSectionProps) => {
  const steps = [
    {
      number: '01',
      title: 'Describe Your Symptoms',
      subtitle: 'Natural Language & Structured Inputs',
      description: 'Enter how you feel in everyday words or pick from guided symptom categories. Specify duration, severity, and any pre-existing health context with complete privacy.',
      icon: FileText,
      iconColor: 'text-[#176B67]',
      iconBg: 'bg-[#E1F3EC] border-[#CFE6D9]',
      keyPoints: [
        'No medical jargon needed',
        'Multi-symptom correlation',
        'Duration & severity rating',
      ],
    },
    {
      number: '02',
      title: 'Receive Helpful Guidance',
      subtitle: 'Safety Screening & Non-Diagnostic Triage',
      description: 'Our engine immediately screens for critical red-flag signs requiring emergency intervention (Dial 112). It then provides balanced, cautious possibilities to discuss with a physician.',
      icon: ShieldCheck,
      iconColor: 'text-[#279B91]',
      iconBg: 'bg-[#EAF7F6] border-[#DCE9E3]',
      keyPoints: [
        'Instant emergency screening',
        'Exploratory possibilities only',
        'No false confidence percentages',
      ],
    },
    {
      number: '03',
      title: 'Find the Right Care',
      subtitle: 'Specialty Matching & Facility Routes',
      description: 'Explore the exact medical department recommended for your situation, review 4 tailored questions for your doctor, and locate verified nearby hospitals with 24/7 emergency support.',
      icon: HeartHandshake,
      iconColor: 'text-[#176B67]',
      iconBg: 'bg-[#E1F3EC] border-[#CFE6D9]',
      keyPoints: [
        'Targeted specialty guidance',
        'Doctor conversation guide',
        'Verified hospital ER contacts',
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#FFFFFF]/60 border-y border-[#DCE9E3] relative overflow-hidden">
      
      {/* Background radial accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 subtle-dots opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1F3EC] text-[#176B67] text-xs font-bold uppercase tracking-wider border border-[#CFE6D9]">
            Transparent Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#203936] tracking-tight">
            A Simpler Journey to Better Care
          </h2>
          <p className="text-base sm:text-lg text-[#667A76] leading-relaxed">
            Healthcare navigation should never be ambiguous or anxiety-inducing. Here is how CareGuide AI works in three grounded steps.
          </p>
        </div>

        {/* Steps Container: Responsive Grid with Progression Lines */}
        <div className="relative">
          
          {/* Desktop Connecting Line (hidden on mobile/tablet) */}
          <div className="hidden lg:block absolute top-28 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#176B67] via-[#279B91] to-[#176B67] -z-0 opacity-25" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white rounded-3xl p-7 border border-[#DCE9E3] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-extrabold text-[#176B67]/30 tracking-tight group-hover:text-[#176B67] transition-colors">
                          {step.number}
                        </span>
                        <div className={`w-12 h-12 rounded-2xl ${step.iconBg} border flex items-center justify-center ${step.iconColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#667A76] uppercase tracking-wider bg-[#F7F8F2] px-2.5 py-1 rounded-full border border-[#DCE9E3]">
                        Phase {idx + 1}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-xl font-bold text-[#203936] mb-1">
                      {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#279B91] mb-3">
                      {step.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#667A76] leading-relaxed mb-6 font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Bullet points for clarity */}
                  <div className="pt-4 border-t border-[#DCE9E3] space-y-2">
                    {step.keyPoints.map((point) => (
                      <div key={point} className="flex items-center gap-2 text-xs text-[#203936]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#279B91] shrink-0" />
                        <span className="font-medium">{point}</span>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Box at Bottom */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartJourney}
            className="group inline-flex items-center gap-2.5 bg-[#176B67] hover:bg-[#125552] text-white font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Try the Symptom Checker Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#667A76]">
            <HelpCircle className="w-3.5 h-3.5 text-[#279B91]" />
            <span>Takes under 90 seconds. 100% anonymous & private.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
