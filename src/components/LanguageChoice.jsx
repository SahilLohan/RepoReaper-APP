import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

function LanguageChoice({ languages, value, onChange, onNext }) {
  return (
    <div className="w-full flex flex-col items-center mt-8">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4 text-center">
        Repo Reaper found these languages in your repository.<br />
        <span className="font-medium text-zinc-400">Which language do you want to proceed with?</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-4 w-auto">
        {languages.map((lang) => (
          <label
            key={lang}
            className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition
              ${
                value === lang
                  ? "bg-fuchsia-800/20 border border-fuchsia-400 shadow-lg"
                  : "bg-zinc-900 border border-zinc-700"
              }`}
          >
            <input
              type="radio"
              name="language"
              value={lang}
              checked={value === lang}
              onChange={() => onChange(lang)}
              className="accent-fuchsia-500"
            />
            <span className="text-zinc-100 font-medium">{lang}</span>
          </label>
        ))}
      </div>
      <button
        disabled={!value}
        onClick={onNext}
        className="mt-7 flex items-center justify-center px-6 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white font-semibold hover:scale-105 hover:shadow-lg transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next Step
      </button>
    </div>
  );
}


export default LanguageChoice;