"use client";

import { useMemo, type ReactNode } from "react";
import {
  getLanguageFromFileName,
  highlightLine,
  HIGHLIGHT_COLORS,
  truncateSegments,
} from "@/lib/syntax-highlight";
import {
  flattenFileText,
  resolveTerminalView,
  type TerminalFile,
  type TerminalSnippet,
} from "@/lib/expertise-terminals";

function TypingCursor() {
  return (
    <span
      className="ml-px inline-block h-[1.1em] w-[2px] animate-pulse bg-[#528bff] align-text-bottom"
      aria-hidden
    />
  );
}

function renderHighlightedLine(
  line: string,
  fullLine: string,
  fileName: string,
  showCursor: boolean,
) {
  const language = getLanguageFromFileName(fileName);
  const segments = truncateSegments(highlightLine(fullLine, language), line.length);

  return (
    <>
      {segments.map((segment, index) => (
        <span
          key={`${index}-${segment.text}`}
          style={{ color: HIGHLIGHT_COLORS[segment.tone] }}
        >
          {segment.text}
        </span>
      ))}
      {showCursor && <TypingCursor />}
    </>
  );
}

function renderVisibleLines(
  file: TerminalFile,
  visibleChars: number,
  showCursor: boolean,
) {
  const fullText = flattenFileText(file);
  const visible = fullText.slice(0, visibleChars);
  const visibleLines = visibleChars === 0 ? [] : visible.split("\n");
  const visibleLineCount = visibleLines.length;
  const codeLines: ReactNode[] = [];
  const lineNumbers: ReactNode[] = [];

  file.lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const isVisible = index < visibleLineCount;

    lineNumbers.push(
      <div
        key={`num-${lineNumber}`}
        className={`min-h-[1.55rem] text-right ${
          isVisible ? "text-[#484f58]" : "text-[#484f58]/30"
        }`}
      >
        {lineNumber}
      </div>,
    );
  });

  if (visibleLines.length === 0) {
    if (showCursor) {
      codeLines.push(
        <div key="line-0" className="min-h-[1.55rem] whitespace-pre">
          <TypingCursor />
        </div>,
      );
    }
    return { codeLines, lineNumbers };
  }

  visibleLines.forEach((line, index) => {
    const isLastLine = index === visibleLines.length - 1;
    const fullLine = file.lines[index] ?? line;

    codeLines.push(
      <div key={`line-${index}`} className="min-h-[1.55rem] whitespace-pre">
        {renderHighlightedLine(
          line,
          fullLine,
          file.fileName,
          isLastLine && showCursor,
        )}
        {!line && !isLastLine && !showCursor && "\u00A0"}
        {!line && isLastLine && !showCursor && "\u00A0"}
      </div>,
    );
  });

  return { codeLines, lineNumbers };
}

type CodeTerminalProps = {
  snippet: TerminalSnippet;
  progress: number;
};

export function CodeTerminal({ snippet, progress }: CodeTerminalProps) {
  const { activeFileIndex, visibleInFile } = useMemo(
    () => resolveTerminalView(snippet, progress),
    [snippet, progress],
  );

  const activeFile = snippet.files[activeFileIndex];
  const isTyping = progress > 0 && progress < 1;

  const { codeLines, lineNumbers } = useMemo(
    () => renderVisibleLines(activeFile, visibleInFile, isTyping),
    [activeFile, visibleInFile, isTyping],
  );

  return (
    <div className="mt-10 ml-6 flex h-[calc(100%-2.5rem)] w-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-tl-xl border border-[#0d29001a] bg-[#282c34]">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-[#21252b] px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-auto text-[12px] text-[#9da5b4]">
          {snippet.windowTitle}
        </span>
      </div>

      <div className="flex shrink-0 border-b border-white/10 bg-[#21252b]">
        {snippet.files.map((file, index) => {
          const isActive = index === activeFileIndex;

          return (
            <div
              key={file.fileName}
              className={`flex items-center gap-2 px-4 py-2.5 transition-colors duration-300 ${
                isActive
                  ? "border-b-2 border-accent text-[#e6edf3]"
                  : "border-b-2 border-transparent text-[#6b7280]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-[#93c4fc]" : "bg-[#4b5563]"
                }`}
                aria-hidden
              />
              <span className="text-[12px]">{file.fileName}</span>
            </div>
          );
        })}
      </div>

      <div
        key={activeFile.fileName}
        className="terminal-tab-enter min-h-0 flex-1 overflow-auto px-4 pt-4 pb-5 font-mono text-[13px] leading-[1.55]"
      >
        <div className="flex gap-4">
          <div className="w-6 shrink-0 select-none" aria-hidden>
            {lineNumbers}
          </div>
          <div className="min-w-0 flex-1">{codeLines}</div>
        </div>
      </div>
    </div>
  );
}
