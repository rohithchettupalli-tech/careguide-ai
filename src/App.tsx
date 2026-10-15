import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureSection } from './components/FeatureSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SymptomChecker } from './components/SymptomChecker';
import { ResultsView } from './components/ResultsView';
import { HospitalFinder } from './components/HospitalFinder';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import type { AnalysisResult } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showCheckerModal, setShowCheckerModal] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string | undefined>(undefined);

  const handleStartChecker = () => {
    setActiveTab('symptom-checker');
    setShowCheckerModal(true);
    setAnalysisResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHospitalFinder = (department?: string) => {
    setActiveTab('hospitals');
    setSelectedDepartmentFilter(department);
    const el = document.getElementById('hospitals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetAnalysis = () => {
    setAnalysisResult(null);
    setShowCheckerModal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFeature = (featureId: string) => {
    if (featureId === 'symptom-checker') {
      handleStartChecker();
    } else if (featureId === 'hospitals') {
      handleOpenHospitalFinder();
    } else if (featureId === 'how-it-works') {
      setActiveTab('how-it-works');
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F2] text-[#203936] flex flex-col relative selection:bg-[#E1F3EC] selection:text-[#176B67]">
      
      {/* Persisting Ambient Background Mesh (Mint, Aqua & Ivory Gradients) */}
      <div className="fixed inset-0 pointer-events-none medical-bg-pattern z-0 opacity-80" />
      
      {/* Fixed subtle grid overlay for technical precision feel */}
      <div className="fixed inset-0 pointer-events-none subtle-grid z-0 opacity-40" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSymptomChecker={handleStartChecker}
          onOpenHospitalFinder={() => handleOpenHospitalFinder()}
        />

        {/* Main Body Flow */}
        <main className="flex-1">
          
          {/* Active Clinical Analysis Results View */}
          {analysisResult ? (
            <ResultsView
              result={analysisResult}
              onReset={handleResetAnalysis}
              onFindHospitals={handleOpenHospitalFinder}
            />
          ) : showCheckerModal || activeTab === 'symptom-checker' ? (
            /* Symptom Checker Full Experience */
            <div className="py-6">
              <SymptomChecker
                onAnalysisComplete={handleAnalysisComplete}
                onCancel={() => {
                  setShowCheckerModal(false);
                  setActiveTab('home');
                }}
              />
            </div>
          ) : (
            /* Homepage Default Presentation */
            <>
              {/* 1. Hero Section */}
              <HeroSection
                onStartChecker={handleStartChecker}
                onFindHospitals={() => handleOpenHospitalFinder()}
              />

              {/* 2. Feature Section */}
              <FeatureSection onSelectFeature={handleSelectFeature} />

              {/* 3. How It Works Section */}
              <HowItWorksSection onStartJourney={handleStartChecker} />

              {/* 4. Nearby Hospital Finder Section */}
              <HospitalFinder initialDepartmentFilter={selectedDepartmentFilter} />

              {/* 5. About & Clinical Integrity */}
              <AboutSection />
            </>
          )}

        </main>

        {/* Professional Healthcare Footer */}
        <Footer onNavigate={setActiveTab} />

      </div>

    </div>
  );
}

export default App;
