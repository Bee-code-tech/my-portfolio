export type TerminalFile = {
  fileName: string;
  lines: string[];
};

export type TerminalSnippet = {
  windowTitle: string;
  files: TerminalFile[];
};

function getFileCharCount(file: TerminalFile) {
  return file.lines.reduce((total, line, lineIndex) => {
    const newline = lineIndex < file.lines.length - 1 ? 1 : 0;
    return total + line.length + newline;
  }, 0);
}

export function flattenFileText(file: TerminalFile) {
  return file.lines.join("\n");
}

export function getTerminalCharCount(snippet: TerminalSnippet) {
  return snippet.files.reduce((total, file) => total + getFileCharCount(file), 0);
}

export function resolveTerminalView(snippet: TerminalSnippet, progress: number) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const totalChars = getTerminalCharCount(snippet);
  const visibleTotal = Math.floor(clamped * totalChars);

  let activeFileIndex = 0;
  let visibleInFile = 0;
  let offset = 0;

  for (let index = 0; index < snippet.files.length; index += 1) {
    const fileChars = getFileCharCount(snippet.files[index]);

    if (visibleTotal < offset + fileChars) {
      activeFileIndex = index;
      visibleInFile = visibleTotal - offset;
      return { activeFileIndex, visibleInFile, totalChars };
    }

    offset += fileChars;
    activeFileIndex = index;
    visibleInFile = fileChars;
  }

  return { activeFileIndex, visibleInFile, totalChars };
}

export const expertiseTerminals: TerminalSnippet[] = [
  {
    windowTitle: "TheTechOD — Full stack",
    files: [
      {
        fileName: "app/page.tsx",
        lines: [
          "import gsap from 'gsap'",
          "import { Hero } from '@/components/Hero'",
          "",
          "export default function Home() {",
          "  return (",
          '    <main className="min-h-screen bg-zinc-950">',
          "      <Hero />",
          "      <section className=\"px-6 py-24\" />",
          "    </main>",
          "  )",
          "}",
        ],
      },
      {
        fileName: "app/api/projects/route.ts",
        lines: [
          "import { NextResponse } from 'next/server'",
          "import { db } from '@/lib/db'",
          "",
          "export async function GET() {",
          "  const projects = await db.project.findMany({",
          "    orderBy: { createdAt: 'desc' },",
          "    take: 12,",
          "  })",
          "",
          "  return NextResponse.json({ projects })",
          "}",
          "",
          "export async function POST(request: Request) {",
          "  const body = await request.json()",
          "  const project = await db.project.create({ data: body })",
          "  return NextResponse.json(project, { status: 201 })",
          "}",
        ],
      },
    ],
  },
  {
    windowTitle: "TheTechOD — ML pipeline",
    files: [
      {
        fileName: "train.py",
        lines: [
          "import torch",
          "import torch.nn as nn",
          "from transformers import AutoModel",
          "",
          "class InferenceHead(nn.Module):",
          "  def forward(self, x):",
          "    logits = self.encoder(x)",
          "    return torch.softmax(logits, dim=-1)",
          "",
          "model = AutoModel.from_pretrained(",
          '  "meta-llama/Llama-3-8b",',
          "  torch_dtype=torch.bfloat16,",
          '  device_map="auto",',
          ")",
          "",
          "loss = model(**batch).loss",
          "loss.backward()",
          "optimizer.step()",
          "scheduler.zero_grad()",
        ],
      },
    ],
  },
  {
    windowTitle: "TheTechOD — On-chain layer",
    files: [
      {
        fileName: "PortfolioVault.sol",
        lines: [
          "// SPDX-License-Identifier: MIT",
          "pragma solidity ^0.8.24;",
          "",
          "contract PortfolioVault {",
          "  mapping(address => uint256) public balances;",
          "",
          "  function deposit() external payable {",
          "    balances[msg.sender] += msg.value;",
          "    emit Deposit(msg.sender, msg.value);",
          "  }",
          "",
          "  function withdraw(uint256 amount) external {",
          "    require(balances[msg.sender] >= amount);",
          "    balances[msg.sender] -= amount;",
          "    payable(msg.sender).transfer(amount);",
          "  }",
          "}",
        ],
      },
      {
        fileName: "lib.rs",
        lines: [
          "use anchor_lang::prelude::*;",
          "",
          "declare_id!(\"TechOD11111111111111111111111111111111\");",
          "",
          "#[program]",
          "pub mod portfolio_escrow {",
          "  use super::*;",
          "",
          "  pub fn initialize(ctx: Context<Initialize>) -> Result<()> {",
          "    ctx.accounts.vault.bump = *ctx.bumps.get(\"vault\").unwrap();",
          "    Ok(())",
          "  }",
          "}",
        ],
      },
    ],
  },
];
