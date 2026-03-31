'use client'

import React from 'react'

type ViewMode = 'nav' | 'threads'

type Thread = {
  id: number
  title: string
  lastMessage: string
  time: string
  isWorkflow: boolean
  workflowLabel?: string
}

type ChatMessage = {
  id: string
  from: 'user' | 'ai'
  name: string
  time: string
  text: string
}

const mockThreads: Thread[] = [
  {
    id: 1,
    title: 'Design review helper',
    lastMessage: 'Let’s walk through the Figma file step‑by‑step.',
    time: '2:14 PM',
    isWorkflow: true,
    workflowLabel: 'Workflow · Design QA',
  },
  {
    id: 2,
    title: 'PR #482 summary',
    lastMessage: 'Summarize key changes and risks.',
    time: '1:03 PM',
    isWorkflow: true,
    workflowLabel: 'Workflow · Code review',
  },
  {
    id: 3,
    title: 'Brainstorm marketing copy',
    lastMessage: 'Give me 10 headline options.',
    time: 'Yesterday',
    isWorkflow: false,
  },
  {
    id: 4,
    title: 'General chat',
    lastMessage: 'What are some good OKR examples?',
    time: 'Mon',
    isWorkflow: false,
  },
]

const GLOBAL_CSS = `
:root {
  --s0: 0px;
  --s0_25: 2px;
  --s0_5: 4px;
  --s1: 8px;
  --s1_5: 12px;
  --s2: 16px;
  --s2_5: 20px;
  --s3: 24px;
  --s4: 32px;

  --storm5: #0a1020;
  --storm10: #151b2c;
  --storm15: #1f2536;
  --storm20: #2a3041;
  --storm25: #353b4d;
  --storm30: #404659;
  --storm35: #4c5265;
  --storm50: #71768b;
  --storm60: #8a90a5;
  --storm70: #a5abc0;

  --sky80: #83cfff;
  --indigo60: #6b89ff;
  --flamingo60: #f45695;

  --bg0: var(--storm10);
  --bg1: var(--storm15);
  --surface0: var(--storm15);
  --surface1: var(--storm20);
  --surface2: var(--storm25);
  --line0: var(--storm35);
  --line1: var(--storm50);
  --text0: #ffffff;
  --text1: var(--storm60);

  --ai0: var(--flamingo60);
  --ai1: var(--indigo60);
}

*,*::before,*::after { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
  background: radial-gradient(circle at top left, var(--storm5), var(--bg0));
  color: var(--text0);
}

button, input, select, textarea { font: inherit; }

.app-shell {
  height: 100vh;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) auto;
  grid-template-rows: 100%;
  border-radius: 18px;
  padding: 10px;
  background: radial-gradient(circle at top left, var(--bg1), var(--bg0));
}

.left-rail {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--storm30) 70%, transparent);
  background: radial-gradient(circle at top, var(--surface2), var(--surface0));
  padding: 12px 10px;
  overflow: hidden;
}

.left-rail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 4px 8px;
}

.product-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface2) 70%, transparent);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text1);
}

.product-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--sky80), #2ec377);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--sky80) 18%, transparent);
}

.view-switcher {
  display: inline-flex;
  padding: 3px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface2) 80%, transparent);
  gap: 2px;
}

.view-pill {
  border: none;
  background: transparent;
  color: var(--text1);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
}

.view-pill.active {
  background: linear-gradient(90deg, var(--ai0), var(--ai1));
  color: var(--storm10);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--sky80) 45%, transparent);
}

.left-rail-body {
  margin-top: 10px;
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
}

.section-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text1);
  padding: 0 4px;
}

.callout, .callout-list, .timeline, .object-pane { border-radius: 12px; border: 1px solid color-mix(in srgb, var(--storm35) 85%, transparent); background: radial-gradient(circle at top left, var(--surface2), var(--surface1)); }
.callout { padding: 8px 10px 10px; }
.callout-list, .timeline, .object-pane { padding: 7px 9px 9px; }
.callout-label { font-size: 11px; color: var(--text1); text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 4px; }
.callout-title { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
.callout-copy { font-size: 12px; color: var(--text1); margin: 0; }
.callout-list ul, .timeline-list { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.badge { display: inline-flex; align-items: center; padding: 2px 7px; border-radius: 999px; font-size: 11px; margin-right: 6px; border: 1px solid color-mix(in srgb, var(--storm35) 70%, transparent); }
.badge-layout { background: color-mix(in srgb, var(--ai1) 14%, transparent); }
.badge-data { background: color-mix(in srgb, var(--sky80) 14%, transparent); }
.badge-collab { background: color-mix(in srgb, var(--ai0) 14%, transparent); }
.timeline-list li { display: flex; gap: 8px; }
.dot { width: 8px; height: 8px; border-radius: 999px; background: #2ec377; }
.dot.live { box-shadow: 0 0 8px color-mix(in srgb, #2ec377 55%, transparent); }
.dot.small { width: 7px; height: 7px; }
.dot.small.muted { background: var(--storm50); box-shadow: none; }
.timeline-title { font-size: 12px; color: var(--text0); }
.timeline-sub { font-size: 11px; color: var(--text1); }

.thread-list {
  list-style: none;
  margin: 0;
  padding: 4px 2px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: auto;
}

.thread-row {
  display: flex;
  gap: 8px;
  padding: 7px 8px;
  border-radius: 10px;
  background: radial-gradient(circle at top left, var(--surface2), var(--surface1));
  border: 1px solid color-mix(in srgb, var(--storm35) 85%, transparent);
}

.thread-title { font-size: 13px; font-weight: 500; }
.thread-last { font-size: 12px; color: var(--text1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.thread-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.thread-time { font-size: 11px; color: var(--text1); }
.thread-meta-label { font-size: 10px; padding: 2px 6px; border-radius: 999px; background: color-mix(in srgb, #2ec377 14%, transparent); color: #a7fbed; }
.thread-workflow-chip { font-size: 11px; padding: 1px 6px; border-radius: 999px; background: color-mix(in srgb, var(--ai1) 18%, transparent); }

.nav-item {
  border-radius: 9px;
  border: 1px solid transparent;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--text0);
  font-size: 13px;
  cursor: pointer;
}

.nav-item:hover {
  background: linear-gradient(90deg, color-mix(in srgb, var(--sky80) 12%, transparent), transparent);
}

.nav-item.active {
  border-color: color-mix(in srgb, var(--sky80) 30%, transparent);
  background: linear-gradient(90deg, color-mix(in srgb, var(--sky80) 16%, transparent), transparent);
}

.nav-icon {
  width: 18px;
  height: 18px;
  border-radius: 7px;
  background: radial-gradient(circle at 20% 0, color-mix(in srgb, var(--ai1) 55%, #000), var(--surface1));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.threads-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.threads-subtitle {
  font-size: 11px;
  color: var(--text1);
}

.pill-filter {
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 3px 8px;
  font-size: 11px;
  background: color-mix(in srgb, var(--surface2) 70%, transparent);
  color: var(--text0);
  cursor: pointer;
}

.pill-filter.active {
  border-color: color-mix(in srgb, var(--sky80) 45%, transparent);
  background: linear-gradient(90deg, var(--ai0), var(--ai1));
  color: var(--storm10);
}

.center-pane {
  display: flex;
  flex-direction: column;
  padding: 12px 14px 12px 16px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--storm30) 80%, transparent);
  background: radial-gradient(circle at top, var(--surface2), var(--bg0));
  overflow: hidden;
  margin: 0 8px;
}

.center-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--line0);
}

.center-title { font-size: 15px; font-weight: 500; }
.center-subtitle { font-size: 12px; color: var(--text1); }
.center-header-actions { display: flex; gap: 6px; }

.chip {
  border-radius: 999px;
  border: none;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  background: linear-gradient(90deg, var(--ai0), var(--ai1));
  color: var(--storm10);
}

.chip.secondary {
  background: color-mix(in srgb, var(--surface2) 70%, transparent);
  color: var(--text0);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--storm35) 80%, transparent);
}

.chip.tertiary {
  background: transparent;
  color: var(--text1);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--storm35) 70%, transparent);
}

.chat-window { flex: 1; overflow: auto; padding: 10px 2px 8px; display: flex; flex-direction: column; gap: 10px; }
.chat-message { display: flex; align-items: flex-start; gap: 8px; }
.avatar { width: 26px; height: 26px; border-radius: 999px; background: linear-gradient(135deg, var(--ai1), #00d3f3); display: flex; align-items: center; justify-content: center; font-size: 12px; }
.avatar.ai { background: linear-gradient(135deg, #2ec377, #00d3f3); }
.bubble { max-width: 80%; border-radius: 14px; padding: 7px 10px 8px; background: radial-gradient(circle at top left, var(--surface2), var(--surface1)); border: 1px solid color-mix(in srgb, var(--storm35) 85%, transparent); }
.bubble-header { display: flex; justify-content: space-between; gap: 12px; font-size: 11px; color: var(--text1); margin-bottom: 2px; }
.bubble-body { font-size: 13px; color: var(--text0); }

.composer { margin-top: 4px; padding-top: 8px; border-top: 1px solid var(--line0); display: flex; flex-direction: column; gap: 6px; }
.composer-top-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.composer-mode { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text1); }
.composer-input-row { display: flex; gap: 8px; align-items: flex-end; }
.composer-input { flex: 1; resize: none; border-radius: 10px; border: 1px solid color-mix(in srgb, var(--storm35) 90%, transparent); background: color-mix(in srgb, var(--bg0) 75%, transparent); color: var(--text0); font-size: 13px; padding: 7px 9px; }
.composer-input::placeholder { color: color-mix(in srgb, var(--storm60) 80%, transparent); }
.composer-send { border-radius: 999px; border: none; padding: 7px 14px; background: linear-gradient(90deg, var(--sky80), #2ec377); color: #06120c; font-size: 13px; cursor: pointer; }

.resize-handle { width: 6px; margin: 6px 2px; border-radius: 999px; background: var(--surface1); border: 1px solid var(--line0); display: flex; align-items: center; justify-content: center; cursor: col-resize; }
.grip { width: 2px; height: 54px; border-radius: 999px; background: linear-gradient(to bottom, var(--ai1), #2ec377); }

.right-pane {
  height: 100%;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--storm30) 80%, transparent);
  background: radial-gradient(circle at top right, var(--surface2), var(--bg0));
  min-width: 220px;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  padding: 12px 12px 10px;
  overflow: hidden;
}

.right-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--line0); }
.right-title { font-size: 14px; font-weight: 500; }
.right-subtitle { font-size: 12px; color: var(--text1); }
.right-body { margin-top: 8px; overflow: hidden; display: flex; flex-direction: column; }
.right-body-columns { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 8px; height: 100%; }
.right-overview { overflow: auto; display: flex; flex-direction: column; gap: 8px; }

.object-pane { display: flex; flex-direction: column; min-width: 0; }
.object-pane-header { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px; }
.object-mode-chip { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; padding: 2px 7px; border-radius: 999px; background: color-mix(in srgb, #2ec377 14%, transparent); color: #a7fbed; }
.object-pane-body { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: 6px; height: 100%; }
.object-list { display: flex; flex-direction: column; gap: 4px; }
.object-row { border-radius: 9px; border: 1px solid transparent; background: transparent; padding: 5px 6px; display: flex; align-items: center; gap: 6px; cursor: pointer; color: var(--text0); font-size: 12px; }
.object-row:hover { background: linear-gradient(90deg, color-mix(in srgb, var(--sky80) 12%, transparent), transparent); }
.object-row.active { border-color: color-mix(in srgb, var(--sky80) 45%, transparent); background: linear-gradient(90deg, color-mix(in srgb, var(--sky80) 16%, transparent), transparent); }
.object-dot { width: 9px; height: 9px; border-radius: 999px; background: var(--sky80); }
.object-dot.layout { background: linear-gradient(135deg, var(--ai1), var(--sky80)); }
.object-dot.thread { background: linear-gradient(135deg, #fe8e22, var(--ai0)); }
.object-dot.callout { background: linear-gradient(135deg, var(--ai0), var(--ai1)); }
.object-main { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.object-sub { font-size: 11px; color: var(--text1); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.object-editor { margin-top: 4px; padding: 6px; border-radius: 9px; background: color-mix(in srgb, var(--bg0) 85%, transparent); border: 1px solid color-mix(in srgb, var(--storm35) 90%, transparent); display: flex; flex-direction: column; gap: 6px; overflow: auto; }
.object-editor-title { font-size: 12px; font-weight: 500; }
.field { display: flex; flex-direction: column; gap: 3px; font-size: 11px; color: var(--text1); }
.field-row { display: flex; align-items: center; gap: 6px; }
.field-value { font-size: 11px; color: var(--text0); }
.field-select, .field-textarea, .object-editor input[type='range'] { width: 100%; }
.field-select, .field-textarea { border-radius: 7px; border: 1px solid color-mix(in srgb, var(--storm35) 90%, transparent); background: color-mix(in srgb, var(--bg0) 75%, transparent); color: var(--text0); padding: 4px 6px; font-size: 11px; }
.field-textarea { resize: vertical; }

@media (max-width: 980px) {
  .app-shell { grid-template-columns: 240px minmax(0, 1fr); }
  .right-pane, .resize-handle { display: none; }
}
`

export default function IndexPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>('nav')
  const [rightWidth, setRightWidth] = React.useState(32)
  const [isResizing, setIsResizing] = React.useState(false)
  const [selectedObjectId, setSelectedObjectId] = React.useState<string>('layout')
  const [selectedThreadId, setSelectedThreadId] = React.useState<number>(mockThreads[0]?.id ?? 1)
  const [isWorkflowThreadsOpen, setIsWorkflowThreadsOpen] = React.useState(false)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsResizing(true)
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const container = document.getElementById('layout-root')
      if (!container) return
      const bounds = container.getBoundingClientRect()
      const minRight = 20
      const maxRight = 60
      const fromRightPx = bounds.right - e.clientX
      const pct = (fromRightPx / bounds.width) * 100
      const clamped = Math.min(maxRight, Math.max(minRight, pct))
      setRightWidth(clamped)
    }

    const handleMouseUp = () => {
      if (isResizing) setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  React.useEffect(() => {
    setViewMode('nav')
  }, [])

  const selectedThread = React.useMemo(
    () => mockThreads.find((t) => t.id === selectedThreadId) ?? mockThreads[0],
    [selectedThreadId],
  )

  const workflowThreads = React.useMemo(() => mockThreads.filter((t) => t.isWorkflow), [])

  const threadMessages = React.useMemo<Record<number, ChatMessage[]>>(
    () => ({
      1: [
        {
          id: 'u-1',
          from: 'user',
          name: 'You',
          time: '2:14 PM',
          text: 'Walk through my design and highlight anything risky for implementation.',
        },
        {
          id: 'a-1',
          from: 'ai',
          name: 'Assistant',
          time: '2:14 PM',
          text: 'I’ve grouped this into three areas: layout, data-loading, and collaboration. Hover over any callout in the context panel to see where it maps in the design.',
        },
        {
          id: 'a-2',
          from: 'ai',
          name: 'Assistant',
          time: '2:16 PM',
          text: 'If you want, I can attach this thread to the “Design review” workflow so future runs reuse the same prompts and structure.',
        },
      ],
      2: [
        {
          id: 'u-2',
          from: 'user',
          name: 'You',
          time: '1:03 PM',
          text: 'Summarize PR #482 and call out any risky changes.',
        },
        {
          id: 'a-3',
          from: 'ai',
          name: 'Assistant',
          time: '1:05 PM',
          text: 'I’ll summarize by area (UI, API, tests), then list risks + suggested follow-ups. Want this formatted for a Slack update or a PR comment?',
        },
      ],
      3: [
        {
          id: 'u-3',
          from: 'user',
          name: 'You',
          time: 'Yesterday',
          text: 'Give me 10 headline options for the landing page.',
        },
        {
          id: 'a-4',
          from: 'ai',
          name: 'Assistant',
          time: 'Yesterday',
          text: 'Here are 10 options across punchy, credible, and playful tones. Which direction should I refine?',
        },
      ],
      4: [
        {
          id: 'u-4',
          from: 'user',
          name: 'You',
          time: 'Mon',
          text: 'What are some good OKR examples for an engineering team?',
        },
        {
          id: 'a-5',
          from: 'ai',
          name: 'Assistant',
          time: 'Mon',
          text: 'I’ll share a few OKR sets for reliability, developer experience, and delivery predictability, each with measurable key results.',
        },
      ],
    }),
    [],
  )

  const messagesForSelected = (selectedThread?.id && threadMessages[selectedThread.id]) || []

  return (
    <>
      <style jsx global>{GLOBAL_CSS}</style>
      <div id="layout-root" className="app-shell">
        <div className="left-rail">
          <div className="left-rail-header">
            <div className="product-badge">
              <span className="product-dot" />
              <span>AI Console</span>
            </div>
            <div className="view-switcher">
              <button
                className={viewMode === 'nav' ? 'view-pill active' : 'view-pill'}
                onClick={() => setViewMode('nav')}
              >
                Context
              </button>
              <button
                className={viewMode === 'threads' ? 'view-pill active' : 'view-pill'}
                onClick={() => setViewMode('threads')}
              >
                Threads
              </button>
            </div>
          </div>

          {viewMode === 'nav' ? (
            <div className="left-rail-body">
              <div className="section-label">Workflow context</div>

              <section className="callout">
                <div className="callout-label">Linked step</div>
                <div className="callout-title">Design review · Step 2</div>
                <p className="callout-copy">
                  This step runs after a new Figma link is added. The assistant checks layout,
                  spacing, and component usage against your design system.
                </p>
              </section>

              <section className="callout-list">
                <div className="callout-label">Callouts in this thread</div>
                <ul>
                  <li>
                    <span className="badge badge-layout">Layout</span>
                    Missing responsive state for the right rail at tablet widths.
                  </li>
                  <li>
                    <span className="badge badge-data">Data</span>
                    Loading state uses three different spinners across screens.
                  </li>
                  <li>
                    <span className="badge badge-collab">Collab</span>
                    No clear handoff between design and engineering comments.
                  </li>
                </ul>
              </section>

              <section className="timeline">
                <div className="callout-label">Run history</div>
                <ul className="timeline-list">
                  <li>
                    <span className="dot small" />
                    <div>
                      <div className="timeline-title">Today · 2:14 PM</div>
                      <div className="timeline-sub">Triggered from Figma “Marketing page v3”</div>
                    </div>
                  </li>
                  <li>
                    <span className="dot small muted" />
                    <div>
                      <div className="timeline-title">Yesterday · 4:02 PM</div>
                      <div className="timeline-sub">Manual run from Conversations</div>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          ) : (
            <div className="left-rail-body">
              <div className="threads-header">
                <div>
                  <div className="section-label">Threads</div>
                  <div className="threads-subtitle">Recent conversations across workflows</div>
                </div>
                <button className="chip tertiary">Filter</button>
              </div>
              <div className="threads-filters" style={{ display: 'flex', gap: 4, margin: '2px 0 4px' }}>
                <button className="pill-filter active">All</button>
                <button className="pill-filter">Workflow-linked</button>
                <button className="pill-filter">General</button>
              </div>

              <ul className="thread-list">
                {mockThreads.map((t) => (
                  <li
                    key={t.id}
                    className="thread-row"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedThreadId(t.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedThreadId(t.id)
                    }}
                    aria-label={`Open chat: ${t.title}`}
                    style={{
                      cursor: 'pointer',
                      outline:
                        selectedThreadId === t.id
                          ? '1px solid rgba(131, 207, 255, 0.35)'
                          : undefined,
                    }}
                  >
                    <div className="thread-main" style={{ flex: 1, minWidth: 0 }}>
                      <div className="thread-title-row" style={{ display: 'flex', gap: 6, marginBottom: 2, alignItems: 'center' }}>
                        <span className="thread-title">{t.title}</span>
                        {t.isWorkflow && (
                          <span className="thread-workflow-chip" title="Linked to a workflow step">
                            Workflow step
                          </span>
                        )}
                      </div>
                      <div className="thread-last">{t.lastMessage}</div>
                    </div>
                    <div className="thread-meta">
                      {t.isWorkflow && t.workflowLabel && (
                        <div className="thread-meta-label">{t.workflowLabel}</div>
                      )}
                      <div className="thread-time">{t.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="center-pane">
          <header className="center-header">
            <div>
              <div className="center-title">{selectedThread?.title ?? 'Conversation with AI'}</div>
              <div className="center-subtitle">
                {selectedThread?.isWorkflow && selectedThread.workflowLabel
                  ? selectedThread.workflowLabel
                  : 'General chat'}
              </div>
            </div>
            <div className="center-header-actions">
              <button className="chip">New thread</button>
              <button className="chip secondary">Attach to workflow</button>
            </div>
          </header>

          <div className="chat-window">
            {messagesForSelected.map((m) => (
              <div key={m.id} className={`chat-message ${m.from === 'ai' ? 'from-ai' : 'from-user'}`}>
                <div className={m.from === 'ai' ? 'avatar ai' : 'avatar'}>{m.from === 'ai' ? 'A' : 'U'}</div>
                <div className="bubble">
                  <div className="bubble-header">
                    <span className="name">{m.name}</span>
                    <span className="time">{m.time}</span>
                  </div>
                  <div className="bubble-body">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          {viewMode === 'nav' && (
            <div
              style={{
                borderTop: '1px solid rgba(76, 82, 101, 0.6)',
                paddingTop: 8,
                marginTop: 2,
              }}
            >
              <button
                className="chip tertiary"
                onClick={() => setIsWorkflowThreadsOpen((v) => !v)}
                aria-expanded={isWorkflowThreadsOpen ? 'true' : 'false'}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Workflow threads ({workflowThreads.length})</span>
                <span>{isWorkflowThreadsOpen ? 'Hide' : 'Show'}</span>
              </button>

              {isWorkflowThreadsOpen && (
                <div style={{ marginTop: 8, display: 'grid', gap: 6 }}>
                  {workflowThreads.map((t) => (
                    <button
                      key={t.id}
                      className={t.id === selectedThreadId ? 'nav-item active' : 'nav-item'}
                      onClick={() => setSelectedThreadId(t.id)}
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span className="nav-icon">💬</span>
                        <span>{t.title}</span>
                      </span>
                      <span style={{ fontSize: 11, color: '#a5abc0' }}>{t.time}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="composer">
            <div className="composer-top-row">
              <div className="composer-mode">
                <span className="dot live" />
                Live conversation
              </div>
              <button className="chip tertiary">Save as reusable step</button>
            </div>
            <div className="composer-input-row">
              <textarea
                className="composer-input"
                placeholder="Describe what you want the assistant to do in this workflow step…"
                rows={2}
              />
              <button className="composer-send">Send</button>
            </div>
          </div>
        </div>

        <div
          className="resize-handle"
          onMouseDown={handleMouseDown}
          aria-label="Resize details panel"
          role="separator"
          aria-orientation="vertical"
        >
          <span className="grip" />
        </div>

        <div className="right-pane" style={{ width: `${rightWidth}%` }}>
          <header className="right-header">
            <div>
              <div className="right-title">Workflow context</div>
              <div className="right-subtitle">How this conversation connects to automation</div>
            </div>
            <button className="chip tertiary">Edit workflow</button>
          </header>

          <div className="right-body">
            <div className="right-body-columns">
              <div className="right-overview">
                <section className="callout">
                  <div className="callout-label">Linked step</div>
                  <div className="callout-title">Design review · Step 2</div>
                  <p className="callout-copy">
                    This step runs after a new Figma link is added. The assistant checks layout,
                    spacing, and component usage against your design system.
                  </p>
                </section>

                <section className="callout-list">
                  <div className="callout-label">Callouts in this thread</div>
                  <ul>
                    <li>
                      <span className="badge badge-layout">Layout</span>
                      Missing responsive state for the right rail at tablet widths.
                    </li>
                    <li>
                      <span className="badge badge-data">Data</span>
                      Loading state uses three different spinners across screens.
                    </li>
                    <li>
                      <span className="badge badge-collab">Collab</span>
                      No clear handoff between design and engineering comments.
                    </li>
                  </ul>
                </section>

                <section className="timeline">
                  <div className="callout-label">Run history</div>
                  <ul className="timeline-list">
                    <li>
                      <span className="dot small" />
                      <div>
                        <div className="timeline-title">Today · 2:14 PM</div>
                        <div className="timeline-sub">Triggered from Figma “Marketing page v3”</div>
                      </div>
                    </li>
                    <li>
                      <span className="dot small muted" />
                      <div>
                        <div className="timeline-title">Yesterday · 4:02 PM</div>
                        <div className="timeline-sub">Manual run from Conversations</div>
                      </div>
                    </li>
                  </ul>
                </section>
              </div>

              <aside className="object-pane">
                <div className="object-pane-header">
                  <div className="callout-label">Object inspector</div>
                  <div className="object-mode-chip">Sandbox</div>
                </div>

                <div className="object-pane-body">
                  <div className="object-list">
                    <button
                      className={selectedObjectId === 'layout' ? 'object-row active' : 'object-row'}
                      onClick={() => setSelectedObjectId('layout')}
                    >
                      <span className="object-dot layout" />
                      <div className="object-main">
                        <div className="object-title">Layout config</div>
                        <div className="object-sub">Panels · Breakpoints · Density</div>
                      </div>
                    </button>

                    <button
                      className={selectedObjectId === 'thread' ? 'object-row active' : 'object-row'}
                      onClick={() => setSelectedObjectId('thread')}
                    >
                      <span className="object-dot thread" />
                      <div className="object-main">
                        <div className="object-title">Selected thread</div>
                        <div className="object-sub">Metadata · Workflow links</div>
                      </div>
                    </button>

                    <button
                      className={selectedObjectId === 'callout' ? 'object-row active' : 'object-row'}
                      onClick={() => setSelectedObjectId('callout')}
                    >
                      <span className="object-dot callout" />
                      <div className="object-main">
                        <div className="object-title">Callout template</div>
                        <div className="object-sub">Severity · Tags · Targets</div>
                      </div>
                    </button>
                  </div>

                  <div className="object-editor">
                    {selectedObjectId === 'layout' && (
                      <>
                        <div className="object-editor-title">Layout configuration</div>
                        <label className="field">
                          <span className="field-label">Right panel width</span>
                          <div className="field-row">
                            <input type="range" min={20} max={60} value={rightWidth} readOnly />
                            <span className="field-value">{Math.round(rightWidth)}%</span>
                          </div>
                        </label>
                        <label className="field">
                          <span className="field-label">Density</span>
                          <select className="field-select" defaultValue="comfortable">
                            <option value="comfortable">Comfortable</option>
                            <option value="compact">Compact</option>
                            <option value="cozy">Cozy</option>
                          </select>
                        </label>
                      </>
                    )}

                    {selectedObjectId === 'thread' && (
                      <>
                        <div className="object-editor-title">Thread metadata</div>
                        <label className="field">
                          <span className="field-label">Thread type</span>
                          <select className="field-select" defaultValue="workflow">
                            <option value="workflow">Workflow-linked</option>
                            <option value="general">General</option>
                          </select>
                        </label>
                        <label className="field">
                          <span className="field-label">Display badge</span>
                          <select className="field-select" defaultValue="chain">
                            <option value="chain">Chain icon</option>
                            <option value="pill">Pill label</option>
                            <option value="none">None</option>
                          </select>
                        </label>
                      </>
                    )}

                    {selectedObjectId === 'callout' && (
                      <>
                        <div className="object-editor-title">Callout template</div>
                        <label className="field">
                          <span className="field-label">Default severity</span>
                          <select className="field-select" defaultValue="medium">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </label>
                        <label className="field">
                          <span className="field-label">Auto-tag rules</span>
                          <textarea
                            rows={3}
                            className="field-textarea"
                            defaultValue="If the assistant mentions responsiveness, tag as Layout."
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
