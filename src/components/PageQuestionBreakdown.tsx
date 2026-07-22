import React from "react";
import { Check, AlertCircle } from "lucide-react";

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface PracticalExample {
  scenario: string;
  steps: string[];
  result: string;
}

export interface ComparisonData {
  title: string;
  optionA: { name: string; details: string; outcome: string };
  optionB: { name: string; details: string; outcome: string };
}

export interface UseCase {
  title: string;
  description: string;
}

export interface Pitfall {
  mistake: string;
  impact: string;
  fix: string;
}

export interface PageQuestionBreakdownProps {
  mainQuestion: string;
  quickAnswer: string;
  keyTerms: KeyTerm[];
  practicalExample: PracticalExample;
  comparison: ComparisonData;
  useCases: UseCase[];
  pitfalls: Pitfall[];
}

export const PageQuestionBreakdown: React.FC<PageQuestionBreakdownProps> = ({
  mainQuestion,
  quickAnswer,
  keyTerms,
  practicalExample,
  comparison,
  useCases,
  pitfalls,
}) => {
  return (
    <div className="w-full space-y-8 my-8 font-sans text-slate-800 dark:text-slate-200" id="independent-question-guide">
      {/* 1. Primary Question & Direct Answer */}
      <div className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-xl p-4 sm:p-5 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white leading-snug font-serif">
          {mainQuestion}
        </h2>
        <p className="text-base sm:text-lg text-[#374151] dark:text-slate-300 leading-relaxed">
          {quickAnswer}
        </p>
      </div>

      {/* 2. Key Terms */}
      {keyTerms && keyTerms.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white font-serif">
            Key Concepts Explained
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyTerms.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-sm font-semibold text-[#7C3AED] dark:text-violet-400">
                  {item.term}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Practical Example */}
      {practicalExample && (
        <div className="space-y-3 pt-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white font-serif">
            Practical Step-by-Step Example
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
            <strong>Scenario:</strong> {practicalExample.scenario}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {practicalExample.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 pt-1">
            <Check className="w-4 h-4 shrink-0" />
            <span>Result: {practicalExample.result}</span>
          </p>
        </div>
      )}

      {/* 4. Comparison */}
      {comparison && (
        <div className="space-y-3 pt-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white font-serif">
            {comparison.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-[#7C3AED] dark:text-violet-400 text-sm sm:text-base">
                {comparison.optionA.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {comparison.optionA.details}
              </p>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                Outcome: {comparison.optionA.outcome}
              </p>
            </div>
            <div className="space-y-1 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                {comparison.optionB.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {comparison.optionB.details}
              </p>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 pt-1">
                Outcome: {comparison.optionB.outcome}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Use Cases */}
      {useCases && useCases.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white font-serif">
            Practical Applications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {useCases.map((uc, idx) => (
              <div key={idx} className="space-y-0.5">
                <h4 className="font-bold text-xs sm:text-sm text-[#111827] dark:text-white">
                  • {uc.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-3">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Pitfalls */}
      {pitfalls && pitfalls.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-lg sm:text-xl font-bold text-rose-800 dark:text-rose-400 font-serif flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Common Pitfalls & How to Avoid Them
          </h3>
          <div className="space-y-3">
            {pitfalls.map((p, idx) => (
              <div key={idx} className="text-xs sm:text-sm space-y-1 text-slate-700 dark:text-slate-300">
                <p>
                  <strong className="text-rose-700 dark:text-rose-400">Mistake:</strong> {p.mistake}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  <em>Impact:</em> {p.impact}
                </p>
                <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                  <em>Better Approach:</em> {p.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

