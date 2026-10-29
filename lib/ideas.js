// 3 starter AI project ideas per branch.
export const IDEAS = {
  CSE: [
    "A resume screener that scores resumes against a job description using an LLM.",
    "A study-buddy chatbot that answers questions from your own class notes (PDF upload).",
    "A code-review bot that explains bugs in pasted code in plain English.",
  ],
  IT: [
    "A support-ticket classifier that tags tickets by urgency and routes them to a team.",
    "A smart FAQ bot for your college website that answers admission questions.",
    "A log-file analyser that summarises errors and suggests likely fixes.",
  ],
  ECE: [
    "A sensor-data dashboard that flags anomalies from a temperature or vibration CSV.",
    "A voice-command assistant that turns spoken commands into simple device actions.",
    "A signal-noise cleaner demo: upload a noisy audio clip and visualise the filtered result.",
  ],
  EEE: [
    "A power-usage predictor that forecasts next week's electricity bill from past readings.",
    "A fault-detection tool that spots abnormal patterns in transformer or motor data.",
    "A solar-panel output estimator using weather data and a simple ML model.",
  ],
  MECH: [
    "A predictive-maintenance model that estimates machine failure risk from vibration data.",
    "A 3D-print failure detector that classifies photos as good print or defect.",
    "A material-selection assistant that recommends materials from your requirements.",
  ],
  CIVIL: [
    "A crack-detection tool that flags cracks in photos of walls and bridges.",
    "A construction cost estimator that predicts budget from area, floors and materials.",
    "A traffic-flow predictor for a busy Nagpur junction using sample count data.",
  ],
};

export function randomIdea(branch, previous) {
  const list = IDEAS[branch] || IDEAS.CSE;
  const pool = list.length > 1 ? list.filter((i) => i !== previous) : list;
  return pool[Math.floor(Math.random() * pool.length)];
}
