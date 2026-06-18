import { useState } from 'react';

interface StageDetail {
  title: string;
  duration: string;
  waves: string;
  physiology: string;
  neurotransmitters: string;
  grogginessFactor: string;
}

const STAGE_DETAILS: Record<string, StageDetail> = {
  "Awake": {
    title: "Stage W (Waking State / Latency)",
    duration: "5 to 15 minutes (Initial Onset)",
    waves: "Beta Waves (13-30 Hz) & Alpha Waves (8-12 Hz) while relaxing with eyes closed.",
    physiology: "Full muscle tone, rapid blinking, high metabolic brain consumption, responsive reflexes.",
    neurotransmitters: "High Norepinephrine, Histamine, Orexin, and Serotonin.",
    grogginessFactor: "Zero inertia. Healthy wakefulness is achieved upon smoothly returning to this state."
  },
  "REM": {
    title: "Stage R (Rapid Eye Movement / Dreaming)",
    duration: "10 min (First Cycle) up to 60 min (Final Morning Cycle)",
    waves: "Sawtooth waves, Theta rhythms (4-7 Hz) mirroring active, desynchronized waking states.",
    physiology: "Somatic muscle atonia (paralysis to protect from dream enactment), high heart rate variability, rapid ocular movements.",
    neurotransmitters: "Elevated Acetylcholine (melts memory together), low Norepinephrine and Serotonin.",
    grogginessFactor: "Low-to-moderate. Waking from REM sleep often feels vivid or briefly disorienting due to lingering dream activity, but is generally smooth."
  },
  "Light": {
    title: "Stage N1 & N2 (Non-REM Light Transition)",
    duration: "50-60% of total nighttime sleep (approx. 45-50 min per cycle)",
    waves: "Theta band (4-7 Hz). Features 'Sleep Spindles' (11-16 Hz) and massive 'K-Complexes' for sensory gating.",
    physiology: "Decreased core temperature, lowered breathing rate, muscle relaxation, slowing heart rhythm.",
    neurotransmitters: "Rising GABA and Galanin suppressing active arousal centers.",
    grogginessFactor: "Extremely low. Waking from Stage N1/N2 yields minimal sleep inertia, leaving you feeling instantly sharp and awake."
  },
  "Deep": {
    title: "Stage N3 (Slow-Wave Sleep / Slow-Wave Delta)",
    duration: "20-40 minutes per cycle (dominant in the first half of night)",
    waves: "High-amplitude, highly synchronized slow Delta Waves (0.5 to 4 Hz).",
    physiology: "Lowest systemic blood pressure, profound respiratory regularity, pituitary release of Human Growth Hormone (HGH), cellular tissue healing.",
    neurotransmitters: "Maximum Adenosine accumulation triggers slow-wave sleep; high GABAergic inhibition.",
    grogginessFactor: "Severe Sleep Inertia ('Waking Exhaustion'). Waking during Delta waves causes profound confusion, heavy brain fog, and muscle weakness for 30-90 minutes."
  }
};

export default function HypnogramDiagram() {
  return null;
}
