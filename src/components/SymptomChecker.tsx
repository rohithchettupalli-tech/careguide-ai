import { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  User, 
  HeartPulse, 
  Loader2,
  AlertTriangle,
  Stethoscope,
  Info
} from 'lucide-react';
import { COMMON_SYMPTOMS, PRE_EXISTING_CONDITIONS } from '../data/medicalData';
import type { AnalysisInput, AnalysisResult } from '../types';
import { analyzeSymptoms, checkImmediateRedFlags } from '../services/aiMedicalEngine';

interface SymptomCheckerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onCancel?: () => void;
}

export const SymptomChecker = ({
  onAnalysisComplete,
  onCancel,
}: SymptomCheckerProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  
  // Step 2 details
  const [duration, setDuration] = useState<AnalysisInput['duration']>('1-3 days');
  const [severity, setSeverity] = useState<AnalysisInput['severity']>('moderate');
  const [ageGroup, setAgeGroup] = useState<AnalysisInput['ageGroup']>('adult');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['None / None Known']);
  const [notes, setNotes] = useState('');

  // Loading state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStepMessage, setAnalysisStepMessage] = useState('Initiating red-flag screening...');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Live Red Flag Check: Instant emergency warning
  const liveRedFlag = useMemo(() => {
    return checkImmediateRedFlags(selectedSymptoms, [searchQuery, customSymptom, notes].join(' '));
  }, [selectedSymptoms, searchQuery, customSymptom, notes]);

  // Filtered symptom suggestions
  const filteredSymptoms = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return COMMON_SYMPTOMS.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleToggleSymptom = (name: string) => {
    setValidationError(null);
    if (selectedSymptoms.includes(name)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== name));
    } else {
      setSelectedSymptoms([...selectedSymptoms, name]);
      setSearchQuery('');
    }
  };

  const handleAddCustomSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom.trim()]);
      setCustomSymptom('');
      setValidationError(null);
    }
  };

  const handleToggleCondition = (condition: string) => {
    if (condition === 'None / None Known') {
      setSelectedConditions(['None / None Known']);
      return;
    }
    const cleanConditions = selectedConditions.filter((c) => c !== 'None / None Known');
    if (cleanConditions.includes(condition)) {
      const updated = cleanConditions.filter((c) => c !== condition);
      setSelectedConditions(updated.length ? updated : ['None / None Known']);
    } else {
      setSelectedConditions([...cleanConditions, condition]);
    }
  };

  const handleProceedToStep2 = () => {
    if (selectedSymptoms.length === 0) {
      setValidationError('Please select or describe at least one symptom to proceed.');
      return;
    }
    setValidationError(null);
    setCurrentStep(2);
  };

  const handleProceedToStep3 = () => {
    setCurrentStep(3);
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setValidationError(null);

    // Multi-stage loading narrative for clinical feedback
    setAnalysisStepMessage('1/4 Screening for emergency red flags...');
    await new Promise((r) => setTimeout(r, 300));

    setAnalysisStepMessage('2/4 Correlating symptom timeline & severity...');
    await new Promise((r) => setTimeout(r, 350));

    setAnalysisStepMessage('3/4 Matching relevant clinical specialties...');
    await new Promise((r) => setTimeout(r, 350));

    setAnalysisStepMessage('4/4 Compiling doctor discussion points...');
    await new Promise((r) => setTimeout(r, 200));

    try {
      const result = await analyzeSymptoms({
        primarySymptoms: selectedSymptoms,
        duration,
        severity,
        ageGroup,
        conditions: selectedConditions,
        notes,
      });
      setIsAnalyzing(false);
      onAnalysisComplete(result);
    } catch {
      setIsAnalyzing(false);
      setValidationError('An error occurred during triage processing. Please try again.');
    }
  };

  return (
    <div id="symptom-checker" className="py-12 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-[#DCE9E3] shadow-xl overflow-hidden transition-all">
          
          {/* Top Header Banner */}
          <div className="bg-[#176B67] text-white p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#E1F3EC] text-xs font-semibold mb-2">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Clinical Triage Navigator
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Intelligent Symptom Checker
                </h2>
                <p className="text-sm text-[#E1F3EC]/90 mt-1 max-w-xl">
                  Receive structured, cautious guidance and determine whether urgent care, a specialist, or general consultation is best for you.
                </p>
              </div>

              {onCancel && (
                <button
                  onClick={onCancel}
                  className="self-start sm:self-center p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Close checker"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Stepper Progression Tabs */}
            <div className="mt-8 pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-xs font-semibold">
              <button
                onClick={() => setCurrentStep(1)}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all cursor-pointer ${
                  currentStep === 1
                    ? 'bg-white text-[#176B67] shadow-sm font-bold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  1
                </span>
                <span className="hidden sm:inline">Symptoms</span>
              </button>

              <button
                onClick={() => selectedSymptoms.length > 0 && setCurrentStep(2)}
                disabled={selectedSymptoms.length === 0}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all ${
                  selectedSymptoms.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${
                  currentStep === 2
                    ? 'bg-white text-[#176B67] shadow-sm font-bold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  2
                </span>
                <span className="hidden sm:inline">Severity & Context</span>
              </button>

              <button
                onClick={() => selectedSymptoms.length > 0 && setCurrentStep(3)}
                disabled={selectedSymptoms.length === 0}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all ${
                  selectedSymptoms.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${
                  currentStep === 3
                    ? 'bg-white text-[#176B67] shadow-sm font-bold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  3
                </span>
                <span className="hidden sm:inline">Review & Analyze</span>
              </button>
            </div>
          </div>

          {/* CRITICAL SAFETY: Real-Time Red Flag Warning Alert */}
          {liveRedFlag.isRedFlag && (
            <div className="bg-red-50 border-b-2 border-red-500 p-4 sm:p-5 flex items-start gap-4 animate-in fade-in">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-red-900 tracking-wide uppercase flex items-center gap-1.5">
                    Critical Red Flag Alert Detected
                  </h4>
                  <a
                    href="tel:112"
                    className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                  >
                    Dial 112 Now
                  </a>
                </div>
                <p className="text-xs text-red-800 mt-1 font-medium leading-relaxed">
                  {liveRedFlag.matchedReason}
                </p>
                <p className="text-[11px] text-red-700 mt-2 font-semibold">
                  Do not delay urgent emergency care or wait for standard form completion. Seek immediate emergency transport.
                </p>
              </div>
            </div>
          )}

          {/* Step Contents */}
          <div className="p-6 sm:p-8">
            
            {/* STEP 1: Symptom Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#203936]">
                    What symptoms are you experiencing?
                  </h3>
                  <p className="text-xs text-[#667A76] mt-0.5">
                    Type a symptom, pick common chips, or add your own description.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-[#279B91]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search symptoms (e.g., headache, dry cough, dizziness, fever)..."
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F7F8F2] border border-[#DCE9E3] rounded-2xl text-sm text-[#203936] placeholder-[#667A76] focus:outline-none focus:ring-2 focus:ring-[#176B67] focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#667A76] hover:text-[#203936]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Search Autocomplete Suggestions */}
                {filteredSymptoms.length > 0 && (
                  <div className="bg-white border border-[#DCE9E3] rounded-2xl shadow-lg p-2 max-h-56 overflow-y-auto space-y-1">
                    {filteredSymptoms.map((symptom) => (
                      <button
                        key={symptom.id}
                        onClick={() => handleToggleSymptom(symptom.name)}
                        className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          selectedSymptoms.includes(symptom.name)
                            ? 'bg-[#E1F3EC] text-[#176B67] font-semibold'
                            : 'hover:bg-[#F7F8F2] text-[#203936]'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">{symptom.name}</span>
                          <span className="text-[11px] text-[#667A76]">{symptom.category} • {symptom.description}</span>
                        </div>
                        {selectedSymptoms.includes(symptom.name) ? (
                          <CheckCircle2 className="w-4 h-4 text-[#176B67]" />
                        ) : (
                          <Plus className="w-4 h-4 text-[#667A76]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Symptoms Tag Summary */}
                {selectedSymptoms.length > 0 && (
                  <div className="bg-[#EAF7F6] border border-[#CFE6D9] rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#176B67] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selected Symptoms ({selectedSymptoms.length})
                      </span>
                      <button
                        onClick={() => setSelectedSymptoms([])}
                        className="text-[11px] text-[#667A76] hover:text-red-600 font-semibold cursor-pointer"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <span
                          key={symptom}
                          className="inline-flex items-center gap-1.5 bg-white text-[#176B67] font-semibold text-xs px-3 py-1.5 rounded-xl border border-[#DCE9E3] shadow-2xs"
                        >
                          <span>{symptom}</span>
                          <button
                            onClick={() => handleToggleSymptom(symptom)}
                            className="hover:text-red-500 p-0.5 rounded focus:outline-none cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Select Common Symptom Chips */}
                <div>
                  <div className="text-xs font-bold text-[#667A76] uppercase tracking-wider mb-2.5">
                    Frequently Reported Symptoms
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_SYMPTOMS.slice(0, 10).map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom.name);
                      return (
                        <button
                          key={symptom.id}
                          onClick={() => handleToggleSymptom(symptom.name)}
                          className={`text-xs font-medium px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#176B67] text-white border-[#176B67] shadow-xs'
                              : 'bg-white text-[#203936] border-[#DCE9E3] hover:border-[#279B91] hover:bg-[#F7F8F2]'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {symptom.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add Custom Symptom Form */}
                <form onSubmit={handleAddCustomSymptom} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={customSymptom}
                    onChange={(e) => setCustomSymptom(e.target.value)}
                    placeholder="Cannot find your symptom? Type it here..."
                    className="flex-1 px-4 py-2.5 bg-[#F7F8F2] border border-[#DCE9E3] rounded-xl text-xs text-[#203936] focus:outline-none focus:ring-2 focus:ring-[#176B67]"
                  />
                  <button
                    type="submit"
                    disabled={!customSymptom.trim()}
                    className="px-4 py-2.5 bg-[#279B91] hover:bg-[#176B67] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </form>

                {/* Validation Error Message */}
                {validationError && (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Bottom Step Actions */}
                <div className="pt-4 border-t border-[#DCE9E3] flex justify-end">
                  <button
                    onClick={handleProceedToStep2}
                    className="inline-flex items-center gap-2 bg-[#176B67] hover:bg-[#125552] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>Continue to Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Duration, Severity, and Context */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#203936]">
                    Timeline, Severity & Health Context
                  </h3>
                  <p className="text-xs text-[#667A76] mt-0.5">
                    Helps the clinical engine calibrate urgency and provide appropriate timeframe recommendations.
                  </p>
                </div>

                {/* Duration Radio Options */}
                <div>
                  <label className="text-xs font-bold text-[#203936] uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#279B91]" />
                    How long have you had these symptoms?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {(
                      [
                        { id: 'hours', label: '< 24 Hours' },
                        { id: '1-3 days', label: '1 – 3 Days' },
                        { id: '4-7 days', label: '4 – 7 Days' },
                        { id: '1-2 weeks', label: '1 – 2 Weeks' },
                        { id: 'longer', label: 'Over 2 Weeks' },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDuration(item.id)}
                        className={`p-3 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                          duration === item.id
                            ? 'bg-[#176B67] text-white border-[#176B67] shadow-xs'
                            : 'bg-white text-[#203936] border-[#DCE9E3] hover:border-[#279B91] hover:bg-[#F7F8F2]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity Cards */}
                <div>
                  <label className="text-xs font-bold text-[#203936] uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-[#279B91]" />
                    Overall Symptom Severity
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setSeverity('mild')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        severity === 'mild'
                          ? 'bg-[#E1F3EC] border-[#176B67] ring-1 ring-[#176B67]'
                          : 'bg-white border-[#DCE9E3] hover:border-[#279B91]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#176B67]">Mild</div>
                      <div className="text-[11px] text-[#667A76] mt-1">
                        Noticeable but does not interrupt daily routine or sleep.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeverity('moderate')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        severity === 'moderate'
                          ? 'bg-[#EAF7F6] border-[#279B91] ring-1 ring-[#279B91]'
                          : 'bg-white border-[#DCE9E3] hover:border-[#279B91]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#279B91]">Moderate</div>
                      <div className="text-[11px] text-[#667A76] mt-1">
                        Disrupts standard activities, work, or requires resting.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeverity('severe')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        severity === 'severe'
                          ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500'
                          : 'bg-white border-[#DCE9E3] hover:border-[#279B91]'
                      }`}
                    >
                      <div className="text-xs font-bold text-amber-700">Severe / Intense</div>
                      <div className="text-[11px] text-[#667A76] mt-1">
                        Incapacitating pain or severe discomfort requiring evaluation.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Age Group */}
                <div>
                  <label className="text-xs font-bold text-[#203936] uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#279B91]" />
                    Age Group
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(
                      [
                        { id: 'child', label: 'Child (Under 18)' },
                        { id: 'young-adult', label: 'Young Adult (18-35)' },
                        { id: 'adult', label: 'Adult (36-60)' },
                        { id: 'senior', label: 'Senior (60+)' },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setAgeGroup(item.id)}
                        className={`p-3 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                          ageGroup === item.id
                            ? 'bg-[#176B67] text-white border-[#176B67] shadow-xs'
                            : 'bg-white text-[#203936] border-[#DCE9E3] hover:border-[#279B91]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pre-existing Conditions */}
                <div>
                  <label className="text-xs font-bold text-[#203936] uppercase tracking-wider block mb-2">
                    Pre-existing Conditions (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRE_EXISTING_CONDITIONS.map((condition) => {
                      const isSelected = selectedConditions.includes(condition);
                      return (
                        <button
                          key={condition}
                          type="button"
                          onClick={() => handleToggleCondition(condition)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#176B67] text-white border-[#176B67]'
                              : 'bg-white text-[#667A76] border-[#DCE9E3] hover:border-[#279B91]'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {condition}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Free Text Notes */}
                <div>
                  <label className="text-xs font-bold text-[#203936] uppercase tracking-wider block mb-1.5">
                    Additional Context / Observations
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="E.g., Started after travel, worse at night, tried paracetamol with little relief..."
                    className="w-full p-3 bg-[#F7F8F2] border border-[#DCE9E3] rounded-xl text-xs text-[#203936] focus:outline-none focus:ring-2 focus:ring-[#176B67]"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-[#DCE9E3] flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#667A76] hover:text-[#203936] px-4 py-2.5 rounded-xl border border-[#DCE9E3] hover:bg-[#F7F8F2] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Symptoms</span>
                  </button>
                  <button
                    onClick={handleProceedToStep3}
                    className="inline-flex items-center gap-2 bg-[#176B67] hover:bg-[#125552] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>Review & Confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review & Summary before Analysis */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#203936]">
                    Review Your Healthcare Profile
                  </h3>
                  <p className="text-xs text-[#667A76] mt-0.5">
                    Verify the information before generating your structured clinical guidance.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-[#F7F8F2] rounded-2xl border border-[#DCE9E3] p-5 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#667A76] uppercase tracking-wider block mb-2">
                      Reported Symptoms ({selectedSymptoms.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSymptoms.map((s) => (
                        <span
                          key={s}
                          className="bg-white text-[#176B67] font-semibold text-xs px-3 py-1.5 rounded-lg border border-[#DCE9E3]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-[#DCE9E3]">
                    <div>
                      <span className="text-[11px] text-[#667A76] font-medium block">Duration</span>
                      <span className="text-xs font-bold text-[#203936] capitalize">{duration}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#667A76] font-medium block">Severity</span>
                      <span className="text-xs font-bold text-[#203936] capitalize">{severity}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#667A76] font-medium block">Age Bracket</span>
                      <span className="text-xs font-bold text-[#203936] capitalize">{ageGroup}</span>
                    </div>
                  </div>

                  {selectedConditions.length > 0 && (
                    <div className="pt-3 border-t border-[#DCE9E3]">
                      <span className="text-[11px] text-[#667A76] font-medium block mb-1">Pre-existing</span>
                      <span className="text-xs font-semibold text-[#203936]">
                        {selectedConditions.join(', ')}
                      </span>
                    </div>
                  )}

                  {notes && (
                    <div className="pt-3 border-t border-[#DCE9E3]">
                      <span className="text-[11px] text-[#667A76] font-medium block mb-1">Notes</span>
                      <span className="text-xs italic text-[#203936]">"{notes}"</span>
                    </div>
                  )}
                </div>

                {/* Important Clinical Disclaimer Notice */}
                <div className="bg-[#EAF7F6] border border-[#CFE6D9] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#203936]">
                  <Info className="w-5 h-5 text-[#176B67] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-[#176B67]">Non-Diagnostic Medical Guidance:</strong>{' '}
                    This tool synthesizes your inputs against clinical triage protocols to suggest departments and next steps. It does not replace a physical examination, diagnostic bloodwork, or clinical advice from an MBBS/MD physician.
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#DCE9E3] flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={isAnalyzing}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#667A76] hover:text-[#203936] px-4 py-2.5 rounded-xl border border-[#DCE9E3] hover:bg-[#F7F8F2] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Adjust Details</span>
                  </button>

                  <button
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing}
                    className="inline-flex items-center gap-2.5 bg-[#176B67] hover:bg-[#125552] disabled:opacity-70 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#E1F3EC]" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#CFE6D9]" />
                        <span>Analyze Symptoms</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Loading state indicator */}
                {isAnalyzing && (
                  <div className="p-4 bg-[#F7F8F2] rounded-2xl border border-[#DCE9E3] flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-[#176B67] animate-spin" />
                    <span className="text-xs font-semibold text-[#176B67] animate-pulse">
                      {analysisStepMessage}
                    </span>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
