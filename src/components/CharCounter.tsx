"use client";

import { useState } from "react";

const MAX_CHARS = 500;

export function CharCounter() {
  const [text, setText] = useState("");

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === "" ? 0 : text.split("\n").length;
  const remaining = MAX_CHARS - charCount;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        글자 카운터
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="텍스트를 입력하세요..."
        rows={8}
        className="w-full resize-none rounded-xl border border-black/10 bg-zinc-50 p-4 text-sm text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{charCount}</span>
            글자
          </span>
          <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{wordCount}</span>
            단어
          </span>
          <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{lineCount}</span>
            줄
          </span>
        </div>

        <span
          className={`text-sm font-medium ${
            isOverLimit
              ? "text-red-500"
              : remaining <= 50
              ? "text-amber-500"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {isOverLimit ? `${Math.abs(remaining)}자 초과` : `${remaining}자 남음`}
        </span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isOverLimit
              ? "bg-red-500"
              : remaining <= 50
              ? "bg-amber-400"
              : "bg-blue-500"
          }`}
          style={{ width: `${Math.min((charCount / MAX_CHARS) * 100, 100)}%` }}
        />
      </div>

      {text.length > 0 && (
        <button
          onClick={() => setText("")}
          className="mt-3 text-xs text-zinc-400 underline-offset-2 hover:text-zinc-600 hover:underline dark:hover:text-zinc-300"
        >
          지우기
        </button>
      )}
    </div>
  );
}
