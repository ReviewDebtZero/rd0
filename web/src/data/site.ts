/** Every public URL in one place, so the domain swap later is one edit. */
export const SITE = "https://rd0.netlify.app";
export const ORG = "https://github.com/ReviewDebtZero";
export const REPO = `${ORG}/rd0`;
export const AIDEV = "https://huggingface.co/datasets/hao-li/AIDev";

export const SKILL_INSTALL =
  'pip install rd0-jinx rd0-trellis "git+https://github.com/ReviewDebtZero/rd0-fence#subdirectory=packages/rd0-fence"';

export type Tool = {
  id: string;
  name: string;
  question: string;
  pitch: string;
  gif: string;
  gifAlt: string;
  install: string;
  repo: string;
  site?: string;
  pypi?: string;
  stat: { value: string; label: string; note: string };
  status: string;
};

export const TOOLS: Tool[] = [
  {
    id: "jinx",
    name: "Jinx",
    question: "Is another open PR already doing this?",
    pitch:
      "Checks every new pull request against the open ones and leaves one comment when it finds a likely duplicate, naming the PR it matches and why.",
    gif: "/jinx.gif",
    gifAlt: "Two PRs change the same lines and Jinx scores the match 1.00",
    install: "pip install rd0-jinx",
    repo: `${ORG}/rd0-jinx`,
    site: "https://rd0-jinx.netlify.app",
    pypi: "https://pypi.org/project/rd0-jinx/",
    stat: {
      value: "1.9",
      label: "false alarms per 100 PRs with no known duplicate",
      note: "Shipping duplicate bots: 4.5 to 5.5. On ranking the right PR first, Jinx (91.7%) ties the strong methods and the plain link rule scores higher (93.6%).",
    },
    status: "v0.1.0 on PyPI",
  },
  {
    id: "trellis",
    name: "Trellis",
    question: "Does it break the rules written in AGENTS.md?",
    pitch:
      "Shows which agent rules nothing enforces, writes the ESLint, Ruff or import-linter config for the ones a tool can check, and flags agent slop: workaround comments, bare suppressions, commented-out code.",
    gif: "/trellis.gif",
    gifAlt: "trellis audit reports which AGENTS.md rules are enforced; trellis scan flags problems in an agent PR, each with a fix",
    install: "pip install rd0-trellis",
    repo: `${ORG}/rd0-trellis`,
    pypi: "https://pypi.org/project/rd0-trellis/",
    stat: {
      value: "0",
      label: "LLM calls or API keys",
      note: "Ratchets: a PR fails only when a rule set to error gets more hits than before, so old debt never blocks new work. Benchmark in progress.",
    },
    status: "v0.1.0 on PyPI",
  },
  {
    id: "fence",
    name: "Fence",
    question: "Does it change more than the issue asked for?",
    pitch:
      "Reads the linked issue, then labels every changed file: in scope, or out of scope with a reason (unrelated code, CI, dependencies, docs, formatting).",
    gif: "/fence.gif",
    gifAlt: "An issue and a PR, the fence CLI run, and the comment the Fence Action posted",
    install: "pip install git+https://github.com/ReviewDebtZero/rd0-fence#subdirectory=packages/rd0-fence",
    repo: `${ORG}/rd0-fence`,
    stat: {
      value: "56.6%",
      label: "of 51,697 agent PRs with a scoped issue have a part Fence flags",
      note: "Fence's own flags on AIDev; precision is not measured yet. On human scope-creep labels, plain PR size ranks better than Fence (AUROC 0.757 vs 0.577).",
    },
    status: "early: PyPI release pending",
  },
];

export const PROBLEM = [
  {
    value: "1 in 5",
    text: "duplicate agent PRs had already been reviewed by a human before anyone noticed the duplicate.",
    source: "311 cross-author duplicates in AIDev, Jinx study",
  },
  {
    value: "44%",
    text: "of agent-PR reverts come from unintended side effects (22.3%) or overengineering (22.1%), more than from functional bugs (17.7%).",
    source: "MSR 2026 study of 33,580 agent PRs",
  },
  {
    value: "6 ms",
    text: "per PR for a Jinx check on a CI machine's CPU (4 threads): cheap enough to run on every push, with no LLM.",
    source: "Jinx latency benchmark",
  },
];
