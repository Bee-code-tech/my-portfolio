export type HighlightTone =
  | "keyword"
  | "string"
  | "comment"
  | "function"
  | "type"
  | "number"
  | "operator"
  | "plain";

export const HIGHLIGHT_COLORS: Record<HighlightTone, string> = {
  keyword: "#c678dd",
  string: "#98c379",
  comment: "#5c6370",
  function: "#61afef",
  type: "#e5c07b",
  number: "#d19a66",
  operator: "#56b6c2",
  plain: "#abb2bf",
};

export type HighlightSegment = {
  text: string;
  tone: HighlightTone;
};

type SyntaxLanguage = "typescript" | "python" | "solidity" | "rust";

const TS_KEYWORDS =
  "import|export|from|default|function|return|const|let|async|await|if|else|new|type|interface";
const PY_KEYWORDS =
  "import|from|class|def|return|as|if|else|for|in|None|True|False";
const SOL_KEYWORDS =
  "pragma|solidity|contract|function|mapping|public|external|payable|require|emit|address|uint256";
const RUST_KEYWORDS =
  "use|pub|mod|fn|let|mut|self|super|Ok|Result|declare_id";

export function getLanguageFromFileName(fileName: string): SyntaxLanguage {
  if (fileName.endsWith(".py")) return "python";
  if (fileName.endsWith(".sol")) return "solidity";
  if (fileName.endsWith(".rs")) return "rust";
  return "typescript";
}

function pushPlain(segments: HighlightSegment[], text: string) {
  if (!text) return;
  const last = segments[segments.length - 1];
  if (last?.tone === "plain") {
    last.text += text;
    return;
  }
  segments.push({ text, tone: "plain" });
}

function tokenize(
  line: string,
  language: SyntaxLanguage,
): HighlightSegment[] {
  const trimmed = line.trimStart();
  const indent = line.slice(0, line.length - trimmed.length);

  if (
    trimmed.startsWith("//") ||
    (language === "python" && trimmed.startsWith("#"))
  ) {
    return [{ text: line, tone: "comment" }];
  }

  const segments: HighlightSegment[] = [];
  if (indent) pushPlain(segments, indent);

  let index = indent.length;
  const source = line;

  while (index < source.length) {
    const rest = source.slice(index);

    const stringMatch = rest.match(/^('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/);
    if (stringMatch) {
      segments.push({ text: stringMatch[0], tone: "string" });
      index += stringMatch[0].length;
      continue;
    }

    const jsxOpen = rest.match(/^<\/?[A-Za-z][\w.-]*/);
    if (jsxOpen && language === "typescript") {
      segments.push({ text: jsxOpen[0], tone: "type" });
      index += jsxOpen[0].length;
      continue;
    }

    const jsxClose = rest.match(/^[\/>]{1,2}/);
    if (jsxClose && language === "typescript") {
      segments.push({ text: jsxClose[0], tone: "operator" });
      index += jsxClose[0].length;
      continue;
    }

    const keywordList =
      language === "python"
        ? PY_KEYWORDS
        : language === "solidity"
          ? SOL_KEYWORDS
          : language === "rust"
            ? RUST_KEYWORDS
            : TS_KEYWORDS;

    const keywordMatch = rest.match(
      new RegExp(`^(${keywordList})\\b`),
    );
    if (keywordMatch) {
      segments.push({ text: keywordMatch[0], tone: "keyword" });
      index += keywordMatch[0].length;
      continue;
    }

    const numberMatch = rest.match(/^\b\d+(?:\.\d+)?\b/);
    if (numberMatch) {
      segments.push({ text: numberMatch[0], tone: "number" });
      index += numberMatch[0].length;
      continue;
    }

    const fnMatch = rest.match(/^[A-Za-z_]\w*(?=\s*\()/);
    if (fnMatch) {
      segments.push({ text: fnMatch[0], tone: "function" });
      index += fnMatch[0].length;
      continue;
    }

    const typeMatch = rest.match(/^[A-Z][\w.]*/);
    if (
      typeMatch &&
      (language === "typescript" ||
        language === "rust" ||
        language === "solidity")
    ) {
      segments.push({ text: typeMatch[0], tone: "type" });
      index += typeMatch[0].length;
      continue;
    }

    const operatorMatch = rest.match(/^[{}()[\];:=<>.,+\-*/&|!?]+/);
    if (operatorMatch) {
      segments.push({ text: operatorMatch[0], tone: "operator" });
      index += operatorMatch[0].length;
      continue;
    }

    const wordMatch = rest.match(/^\w+/);
    if (wordMatch) {
      pushPlain(segments, wordMatch[0]);
      index += wordMatch[0].length;
      continue;
    }

    pushPlain(segments, rest[0] ?? "");
    index += 1;
  }

  return segments.length > 0 ? segments : [{ text: line, tone: "plain" }];
}

export function highlightLine(
  line: string,
  language: SyntaxLanguage,
): HighlightSegment[] {
  if (!line) return [];
  return tokenize(line, language);
}

export function truncateSegments(
  segments: HighlightSegment[],
  maxLength: number,
): HighlightSegment[] {
  if (maxLength <= 0) return [];

  let remaining = maxLength;
  const result: HighlightSegment[] = [];

  for (const segment of segments) {
    if (remaining <= 0) break;

    if (segment.text.length <= remaining) {
      result.push(segment);
      remaining -= segment.text.length;
      continue;
    }

    result.push({
      text: segment.text.slice(0, remaining),
      tone: segment.tone,
    });
    remaining = 0;
  }

  return result;
}
