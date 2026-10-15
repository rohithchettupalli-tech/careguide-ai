import React from 'react';
import { 
  Stethoscope, 
  ShieldAlert, 
  Building2, 
  MapPinned, 
  ArrowUpRight,
  Sparkles,
  AlertTriangle,
  Compass,
  Navigation
} from 'lucide-react';

interface FeatureSectionProps {
  onSelectFeature: (featureId: string) => void;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'symptom-guidance',
      title: 'AI Symptom Guidance',
      badge: 'Interactive Triage',
      badgeColor: 'bg-[#E1F3EC] text-[#176B67] border-[#CFE6D9]',
      description: 'Describe your symptoms in natural language and receive understandable, cautious health guidance grounded in clinical logic.',
      icon: Stethoscope,
      iconBg: 'bg-[#E1F3EC] text-[#176B67] border border-[#CFE6D9]',
      actionText: 'Start symptom check',
      highlightTag: 'Non-diagnostic',
      secondaryIcon: Sparkles,
      onClick: () => onSelectFeature('symptom-checker'),
    },
    {
      id: 'emergency-awareness',
      title: 'Emergency Awareness',
      badge: 'Critical Safety Gate',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      description: 'Identify potential warning signs and prioritize urgent care when necessary. Screens for critical red flags before standard analysis.',
      icon: ShieldAlert,
      iconBg: 'bg-red-50 text-red-600 border border-red-200',
      actionText: 'Review red-flag criteria',
      highlightTag: 'Dial 112 / 108',
      secondaryIcon: AlertTriangle,
      onClick: () => onSelectFeature('symptom-checker'),
    },
    {
      id: 'medical-department',
      title: 'Medical Department',
      badge: 'Specialty Matching',
      badgeColor: 'bg-[#EAF7F6] text-[#279B91] border-[#DCE9E3]',
      description: 'Explore which medical department may be appropriate for your symptoms to prevent unnecessary visits to the wrong specialists.',
      icon: Building2,
      iconBg: 'bg-[#EAF7F6] text-[#279B91] border border-[#CFE6D9]',
      actionText: 'Explore medical specialties',
      highlightTag: 'Targeted care',
      secondaryIcon: Compass,
      onClick: () => onSelectFeature('symptom-checker'),
    },
    {
      id: 'nearby-hospitals',
      title: 'Nearby Hospitals',
      badge: 'Live Geolocation',
      badgeColor: 'bg-[#E7EFFB] text-[#176B67] border-[#DCE9E3]',
      description: 'Find nearby healthcare facilities and access available directions, emergency department contacts, ICU status, and phone numbers.',
      icon: MapPinned,
      iconBg: 'bg-[#E7EFFB] text-[#176B67] border border-[#DCE9E3]',
      actionText: 'Locate nearby facilities',
      highlightTag: 'Turn-by-turn routes',
      secondaryIcon: Navigation,
      onClick: () => onSelectFeature('hospitals'),
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Editorial Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1F3EC] text-[#176B67] text-xs font-bold uppercase tracking-wider border border-[#CFE6D9]">
            Comprehensive Care Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#203936] tracking-tight">
            Everything You Need to Find Your Next Step
          </h2>
          <p className="text-base sm:text-lg text-[#667A76] leading-relaxed">
            Four interconnected tools working together to take you from uncertainty to informed, safe medical engagement.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            const ActionIcon = feature.secondaryIcon;
            return (
              <div
                key={feature.id}
                onClick={feature.onClick}
                className="group relative bg-white rounded-3xl p-6 border border-[#DCE9E3] hover:border-[#279B91] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                {/* Top Row: Icon + Badge */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-13 h-13 rounded-2xl ${feature.iconBg} flex items-center justify-center transition-transform group-hover:scale-105 duration-200`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Highlight */}
                  <div className="mb-2.5">
                    <h3 className="text-xl font-bold text-[#203936] group-hover:text-[#176B67] transition-colors flex items-center gap-1.5">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#667A76] leading-relaxed mb-6 font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Interactive Affordance */}
                <div className="pt-4 border-t border-[#DCE9E3]/70 flex items-center justify-between text-xs font-semibold text-[#176B67] group-hover:text-[#279B91] transition-colors">
                  <span className="flex items-center gap-1.5">
                    <ActionIcon className="w-3.5 h-3.5" />
                    {feature.actionText}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#E1F3EC] group-hover:bg-[#176B67] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Clinical Safety Banner below features */}
        <div className="mt-12 bg-white rounded-2xl border border-[#DCE9E3] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-[#E1F3EC] text-[#176B67] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#203936]">
                Patient Safety & Clinical Responsibility Standard
              </div>
              <div className="text-xs text-[#667A76] mt-0.5">
                CareGuide AI follows WHO and ICMR triage recommendations. No automated prescription or definitive diagnosis is ever generated.
              </div>
            </div>
          </div>
          <button
            onClick={() => onSelectFeature('how-it-works')}
            className="text-xs font-bold text-[#176B67] hover:text-[#279B91] bg-[#F7F8F2] hover:bg-[#EAF7F6] px-4 py-2.5 rounded-xl border border-[#DCE9E3] transition-colors shrink-0 cursor-pointer"
          >
            Read Safety Principles →
          </button>
        </div>

      </div>
    </section>
  );
};
