import { AIDEV, ORG, PROBLEM, REPO, SKILL_INSTALL, TOOLS } from "@/data/site";
import { CopyLine } from "./CopyLine";
import { Frame, Heading, Panel, Pill, Section } from "./ui";

export function Hero() {
  return (
    <section id="top" className="grid-bg border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-16 sm:pt-24">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="accent">open source</Pill>
          <Pill>MIT</Pill>
          <Pill>CPU only</Pill>
          <Pill>no LLM</Pill>
          <Pill>no API key</Pill>
        </div>
        <h1 className="mt-8 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Agents write the PRs.
          <br />
          <span className="text-accent">Humans still review them.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-fg-dim sm:text-lg">
          Writing a pull request is now nearly free; reading one is not. <span className="text-fg">rd0</span>{" "}
          is three small checks that remove the review work that should not exist: duplicates, broken
          repo rules and changes nobody asked for. Each leaves one comment with its reasons, before a
          reviewer opens the diff.
        </p>
        <div className="mt-8 grid max-w-3xl gap-2 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="border border-line bg-panel px-3 py-2.5 transition-colors hover:border-accent/50"
            >
              <span className="font-mono text-[15px] font-bold text-accent">{t.name}</span>
              <span className="mt-1 block text-[13.5px] leading-snug text-fg-dim">{t.question}</span>
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#tools"
            className="glow-accent border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-[15px] text-accent transition-colors hover:bg-accent/15"
          >
            See the tools →
          </a>
          <a
            href={ORG}
            className="border border-line px-4 py-2 font-mono text-[15px] text-fg-dim transition-colors hover:border-line-bright hover:text-fg"
          >
            GitHub org
          </a>
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <Section id="problem" index="01" label="the problem">
      <Heading lead="Review debt is" accent="reviewer time spent on work that shouldn't need it." />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PROBLEM.map((p) => (
          <Panel key={p.value} className="p-5">
            <p className="font-mono text-4xl font-bold text-note">{p.value}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-dim">{p.text}</p>
            <p className="mt-3 font-mono text-[12px] text-fg-faint">{p.source}</p>
          </Panel>
        ))}
      </div>
    </Section>
  );
}

export function Tools() {
  return (
    <Section id="tools" index="02" label="the tools">
      <Heading lead="One question each," accent="answered before review." />
      <div className="mt-10 space-y-6">
        {TOOLS.map((t) => (
          <article id={t.id} key={t.id} className="scroll-mt-20">
            <Frame
              title={
                <span>
                  <span className="text-accent">rd0</span>/{t.name.toLowerCase()}
                </span>
              }
              right={<span className="text-fg-faint">{t.status}</span>}
            >
              <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold">{t.name}</h3>
                  <p className="mt-1 text-[17px] text-accent">{t.question}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-fg-dim">{t.pitch}</p>
                  <div className="mt-5 border-l-2 border-note/60 pl-4">
                    <p className="font-mono text-3xl font-bold text-note">{t.stat.value}</p>
                    <p className="mt-1 text-[14px] text-fg">{t.stat.label}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-fg-faint">{t.stat.note}</p>
                  </div>
                  <div className="mt-5">
                    <CopyLine command={t.install} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 font-mono text-[13px]">
                    {t.site && (
                      <a href={t.site} className="border border-accent/50 px-3 py-1 text-accent hover:bg-accent/10">
                        Website →
                      </a>
                    )}
                    <a href={t.repo} className="border border-line px-3 py-1 text-fg-dim hover:text-fg">
                      GitHub
                    </a>
                    {t.pypi && (
                      <a href={t.pypi} className="border border-line px-3 py-1 text-fg-dim hover:text-fg">
                        PyPI
                      </a>
                    )}
                  </div>
                </div>
                <div className="min-w-0 self-center border border-line bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, animated GIF */}
                  <img src={t.gif} alt={t.gifAlt} loading="lazy" className="block h-auto w-full" />
                </div>
              </div>
            </Frame>
          </article>
        ))}
      </div>
    </Section>
  );
}

const SKILL_RUN = `rd0-check.sh --title "truncate() crashes on negative n" \\
  --body-file task.txt --base origin/main

== Fence: changes outside the task
fence: 2 part(s) outside the issue's scope, 4/7 changed lines (57%)
  [high] requirements.txt: changes dependencies; the issue does not ask for that
  [high] utils/dates.py: edits a code file no path, name or term in the issue points to
== Trellis: repo rules and agent slop
  WARN  requirements.txt  [scope] outside the area the PR description names
== Jinx: open PRs that may already do this
  #7  score 0.24  Raise ValueError when truncate gets negative n
      - shares 1 of 3 changed files (utils/text.py)`;

export function Skill() {
  return (
    <Section id="skill" index="03" label="agent skill">
      <Heading lead="Better still:" accent="the agent runs them on itself." />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="min-w-0 space-y-4 text-[15px] leading-relaxed text-fg-dim">
          <p>
            The coding agent already has the task, the diff and the open PRs. The{" "}
            <span className="text-fg">rd0 skill</span> tells it to run all three checks before it opens
            a pull request, then revert or justify each flagged change, apply each rule fix, and stop
            if another PR already does the work.
          </p>
          <ul className="space-y-2">
            <li>
              <span className="text-fg">Claude Code:</span> copy <code>skills/rd0/</code> into{" "}
              <code>.claude/skills/</code>.
            </li>
            <li>
              <span className="text-fg">Codex, Cursor, Copilot, Devin:</span> paste the AGENTS.md
              snippet.
            </li>
            <li>
              <span className="text-fg">Any CI:</span> keep each tool&rsquo;s Action as the independent
              check the agent can&rsquo;t skip.
            </li>
          </ul>
          <p>
            The agent passes the task <span className="text-fg">verbatim</span>, so it cannot widen the
            scope by paraphrasing it.
          </p>
          <CopyLine command={SKILL_INSTALL} />
          <a href={REPO} className="inline-block font-mono text-[13px] text-accent hover:underline">
            Get the skill on GitHub →
          </a>
        </div>
        <Frame title="rd0-check.sh on an agent branch">
          <pre tabIndex={0} role="region" aria-label="rd0-check.sh output" className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-fg-dim">
            {SKILL_RUN}
          </pre>
        </Frame>
      </div>
    </Section>
  );
}

const LIMITS = [
  "No deployment study yet: we measure what the checks catch, not reviewer time saved.",
  "All numbers come from public GitHub data (AIDev, CC BY 4.0); private repos may differ.",
  "Jinx's duplicate labels are silver (from duplicate comments); the human audit is pending.",
  "Fence and Trellis precision against human labels is not measured yet.",
  "Fence needs a task written before the work: an issue, ticket or the agent's prompt.",
];

export function Limits() {
  return (
    <Section id="limits" index="04" label="what we don't claim yet">
      <Heading lead="Honest by default:" accent="here is what is not measured." />
      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {LIMITS.map((l) => (
          <li key={l} className="border border-line bg-panel px-4 py-3 text-[15px] text-fg-dim">
            {l}
          </li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-[12.5px] text-fg-faint">
        Data:{" "}
        <a href={AIDEV} className="hover:text-accent">
          AIDev on Hugging Face
        </a>
        . Every number links back to a committed result file in its tool&rsquo;s repo.
      </p>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-baseline justify-between gap-3 px-5 py-10 font-mono text-[12.5px] text-fg-faint">
        <p>
          <span className="text-accent">rd0</span> · review debt, to zero · MIT licensed
        </p>
        <p className="flex gap-4">
          {TOOLS.map((t) => (
            <a key={t.id} href={t.repo} className="hover:text-accent">
              {t.name}
            </a>
          ))}
          <a href={ORG} className="hover:text-accent">
            ReviewDebtZero
          </a>
        </p>
      </div>
    </footer>
  );
}
