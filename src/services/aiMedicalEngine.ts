import type { AnalysisInput, AnalysisResult, UrgencyLevel, DepartmentRecommendation, PossibleExplanation } from '../types';
import { RED_FLAG_SYMPTOMS, DEPARTMENTS_INFO } from '../data/medicalData';

export function checkImmediateRedFlags(symptoms: string[], notes?: string): { isRedFlag: boolean; matchedReason?: string } {
  const combined = [...symptoms, notes || ''].join(' ').toLowerCase();

  const severePatterns = [
    { pattern: /(chest pain|crushing chest|chest pressure|heart attack|radiating to (arm|jaw|back))/i, reason: 'Severe or radiating chest pain can indicate acute cardiac ischemia or myocardial infarction.' },
    { pattern: /(difficulty breathing|cannot breathe|gasping|severe shortness of breath|suffocating|choking)/i, reason: 'Severe acute breathlessness requires immediate clinical evaluation to prevent respiratory compromise.' },
    { pattern: /(slurred speech|facial droop|face drooping|arm weakness|paralysis|one side of body|stroke)/i, reason: 'Sudden weakness on one side or speech difficulty are recognized hallmark signs of acute stroke (FAST).' },
    { pattern: /(coughing up blood|hemoptysis|vomiting blood)/i, reason: 'Active blood expectoration or hematemesis indicates significant internal airway or gastrointestinal distress.' },
    { pattern: /(thunderclap|worst headache of my life|sudden severe headache)/i, reason: 'Sudden intense thunderclap headache requires rapid exclusion of subarachnoid hemorrhage or acute neurological event.' },
    { pattern: /(unconscious|passed out|blackout|syncope|fainting with chest pain)/i, reason: 'Loss of consciousness combined with distress requires urgent medical screening.' },
    { pattern: /(anaphylaxis|swelling of (lips|tongue|throat)|throat closing)/i, reason: 'Rapid airway compromise or acute anaphylaxis requires immediate adrenaline and emergency resuscitation.' },
  ];

  for (const item of severePatterns) {
    if (item.pattern.test(combined)) {
      return { isRedFlag: true, matchedReason: item.reason };
    }
  }

  for (const rf of RED_FLAG_SYMPTOMS) {
    if (combined.includes(rf.toLowerCase())) {
      return { isRedFlag: true, matchedReason: `Reported symptom "${rf}" is a recognized medical red flag requiring prompt urgent triage.` };
    }
  }

  return { isRedFlag: false };
}

export async function analyzeSymptoms(input: AnalysisInput): Promise<AnalysisResult> {
  // Simulate clinical triage analysis delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const redFlagCheck = checkImmediateRedFlags(input.primarySymptoms, input.notes);
  const combinedText = [...input.primarySymptoms, input.notes || ''].join(' ').toLowerCase();

  let urgencyLevel: UrgencyLevel = 'routine';
  let isEmergency = false;
  let emergencyReason: string | undefined = undefined;

  if (redFlagCheck.isRedFlag || (input.severity === 'severe' && (combinedText.includes('chest') || combinedText.includes('breath')))) {
    urgencyLevel = 'emergency';
    isEmergency = true;
    emergencyReason = redFlagCheck.matchedReason || 'Your reported symptoms match clinical warning thresholds requiring immediate professional attention.';
  } else if (input.severity === 'severe' || input.duration === 'longer' || (input.conditions.length > 0 && !input.conditions.includes('None / None Known'))) {
    urgencyLevel = 'prompt';
  } else if (input.severity === 'moderate') {
    urgencyLevel = 'prompt';
  } else {
    urgencyLevel = 'self-care';
  }

  // Determine Primary Department
  let department: DepartmentRecommendation = DEPARTMENTS_INFO['General Medicine'];

  if (isEmergency) {
    department = DEPARTMENTS_INFO['Emergency Medicine'];
  } else if (combinedText.includes('cough') || combinedText.includes('breath') || combinedText.includes('wheezing') || combinedText.includes('phlegm') || combinedText.includes('lung')) {
    department = DEPARTMENTS_INFO['Pulmonology'];
  } else if (combinedText.includes('chest') || combinedText.includes('palpitation') || combinedText.includes('flutter') || combinedText.includes('cardiac') || combinedText.includes('hypertension')) {
    department = DEPARTMENTS_INFO['Cardiology'];
  } else if (combinedText.includes('stomach') || combinedText.includes('abdominal') || combinedText.includes('vomit') || combinedText.includes('nausea') || combinedText.includes('reflux') || combinedText.includes('digest')) {
    department = DEPARTMENTS_INFO['Gastroenterology'];
  } else if (combinedText.includes('headache') || combinedText.includes('migraine') || combinedText.includes('dizziness') || combinedText.includes('vertigo') || combinedText.includes('numbness')) {
    department = DEPARTMENTS_INFO['Neurology'];
  } else if (combinedText.includes('throat') || combinedText.includes('ear') || combinedText.includes('sinus') || combinedText.includes('nasal') || combinedText.includes('runny nose')) {
    department = DEPARTMENTS_INFO['ENT'];
  }

  // Generate Cautious Exploratory Possibilities (Non-diagnostic!)
  const possibleExplanations: PossibleExplanation[] = [];

  if (combinedText.includes('cough') || combinedText.includes('fever') || combinedText.includes('throat')) {
    possibleExplanations.push({
      title: 'Upper Respiratory Viral Syndrome or Bronchial Irritation',
      context: 'Common inflammatory response of the airways, frequently triggered by seasonal viruses, environmental irritants, or post-nasal drip.',
      commonSigns: ['Mild fever', 'Scratchy throat', 'Fatigue', 'Intermittent dry cough'],
      generalAdvice: 'Adequate hydration, warm fluid intake, steam inhalation, and monitoring temperature fluctuations.',
    });
    possibleExplanations.push({
      title: 'Acute Bronchitis or Secondary Bacterial Involvement',
      context: 'Inflammation of bronchial passages that may develop following a lingering upper airway infection.',
      commonSigns: ['Productive cough with colored mucus', 'Chest soreness during coughing', 'Mild low-grade fever'],
      generalAdvice: 'Requires clinical auscultation by a physician if symptoms persist beyond 7 to 10 days.',
    });
  } else if (combinedText.includes('headache') || combinedText.includes('dizziness')) {
    possibleExplanations.push({
      title: 'Tension-Type Headache or Cervicogenic Strain',
      context: 'Muscle contraction and tension across the scalp, neck, and shoulder girdle, often aggravated by screen fatigue or postural strain.',
      commonSigns: ['Dull band-like pressure across temples', 'Neck stiffness', 'Tenderness on scalp palpation'],
      generalAdvice: 'Ergonomic adjustments, hydration, gentle neck stretches, and scheduled visual breaks.',
    });
    possibleExplanations.push({
      title: 'Vestibular Irritation or Primary Migraine Variant',
      context: 'Neurovascular hypersensitivity or temporary inner-ear equilibrium fluctuation.',
      commonSigns: ['Photophobia (light sensitivity)', 'Phonophobia (sound sensitivity)', 'Mild postural unsteadiness'],
      generalAdvice: 'Rest in a quiet, darkened room and avoid sudden head positional shifts until reviewed.',
    });
  } else if (combinedText.includes('stomach') || combinedText.includes('abdominal') || combinedText.includes('acid') || combinedText.includes('reflux')) {
    possibleExplanations.push({
      title: 'Gastroesophageal Reflux or Acid Peptic Disturbance',
      context: 'Regurgitation of gastric acid into the lower esophagus, common after irregular meal schedules, spicy food, or high stress.',
      commonSigns: ['Substernal burning', 'Sour taste in mouth', 'Upper abdominal fullness'],
      generalAdvice: 'Avoid recumbent posture for 2 hours post meals, reduce caffeine/acidic intake, and consume smaller frequent meals.',
    });
    possibleExplanations.push({
      title: 'Acute Gastroenteritis or Mild Food Intolerance',
      context: 'Self-limiting mucosal irritation of the stomach and intestines due to dietary indiscretion or mild enteric pathogen.',
      commonSigns: ['Intermittent abdominal cramping', 'Nausea', 'Loose stools or loss of appetite'],
      generalAdvice: 'Oral rehydration solution (ORS), tender electrolyte-rich diet, and prompt checkup if dehydration signs occur.',
    });
  } else {
    possibleExplanations.push({
      title: 'Generalized Physical Strain or Transient Systemic Fatigue',
      context: 'Physiological response to sleep deficit, elevated metabolic demand, mild dehydration, or early prodromal immune activation.',
      commonSigns: ['Generalized weakness', 'Heavy limbs', 'Reduced concentration'],
      generalAdvice: 'Structured rest, consistent sleep schedule, and balanced electrolyte intake.',
    });
    possibleExplanations.push({
      title: 'Primary Care Symptom Evaluation Recommended',
      context: 'Non-specific physical signs that benefit from a holistic baseline physical examination and basic metabolic laboratory panel.',
      commonSigns: ['Non-localized discomfort', 'Mild intermittent changes in energy'],
      generalAdvice: 'Maintain a 48-hour symptom log to review with a family physician or internist.',
    });
  }

  // Recommended Next Steps
  let recommendedNextStep = {
    headline: 'Schedule a General Consultation',
    timeframe: 'Within 24 to 48 Hours',
    guidance: 'Your symptoms appear non-critical at this time, but having a qualified medical practitioner evaluate you will ensure proper treatment and peace of mind.',
  };

  if (urgencyLevel === 'emergency') {
    recommendedNextStep = {
      headline: 'Seek Immediate Emergency Medical Care',
      timeframe: 'Immediate — Do Not Delay',
      guidance: 'Dial 112 (India National Emergency) or your nearest local hospital emergency room immediately. Avoid driving yourself; seek emergency ambulance transport.',
    };
  } else if (urgencyLevel === 'prompt') {
    recommendedNextStep = {
      headline: 'Seek Prompt Medical Consultation',
      timeframe: 'Same-Day or Within 24 Hours',
      guidance: 'Given the reported severity and duration, you should be evaluated promptly by a physician to prevent symptoms from worsening or complications developing.',
    };
  } else if (urgencyLevel === 'self-care') {
    recommendedNextStep = {
      headline: 'Supportive Home Monitoring & Rest',
      timeframe: 'Observe for 48–72 Hours',
      guidance: 'Practice gentle rest and symptom management. If symptoms escalate or new red-flag warning signs arise, schedule a prompt clinic appointment.',
    };
  }

  // Warning Signs to Watch
  const warningSignsToWatch = [
    'Onset of high fever (> 102°F / 38.9°C) that fails to respond to standard antipyretics',
    'Sudden worsening of breathing ease or inability to speak in complete sentences',
    'Development of chest tightness, irregular pounding heart, or pain radiating to arms/back',
    'Inability to keep liquids down for more than 12–24 hours, leading to dizziness or dry mouth',
    'Confusion, unusual lethargy, or extreme uncharacteristic weakness',
    'Sudden focal neurological signs (facial asymmetry, limb numbness, slurred speech)',
  ];

  // Doctor Discussion Guide
  const doctorDiscussionGuide = [
    `"Based on my ${input.primarySymptoms.join(', ')} lasting ${input.duration}, what primary diagnostic evaluations or blood markers do you recommend?"`,
    '"Are there specific prescription therapies or supportive treatments appropriate for my current stage of symptoms?"',
    '"Are there any specific activities, foods, or over-the-counter medications I should strictly avoid right now?"',
    '"What exact signs or symptom changes should trigger an immediate visit to the Emergency Room?"',
  ];

  return {
    id: 'cg-' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ', ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    isEmergency,
    emergencyReason,
    urgencyLevel,
    symptomSummary: {
      symptoms: input.primarySymptoms.length > 0 ? input.primarySymptoms : ['Unspecified General Symptom'],
      duration: input.duration,
      severity: input.severity,
      ageGroup: input.ageGroup,
      conditions: input.conditions.length > 0 ? input.conditions : ['None reported'],
    },
    possibleExplanations,
    recommendedNextStep,
    suggestedDepartment: department,
    warningSignsToWatch,
    doctorDiscussionGuide,
    disclaimer: 'CareGuide AI is an educational clinical guidance aid designed for healthcare navigation. It does NOT provide definitive medical diagnoses, prescriptions, or emergency life-support decisions. Always consult a licensed healthcare professional for medical diagnosis and treatment.',
  };
}
