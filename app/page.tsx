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
@import url('/css/styles.css');
@import url('/css/widgets.css');

/* keep previous thread prototype classes for now */
.left-rail { display:flex; flex-direction:column; height:100%; padding: 12px 10px; }
.left-rail-header { display:flex; align-items:center; justify-content:space-between; gap:8px; padding: 4px 4px 8px; }
.product-badge { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; background: var(--color-surface-variant); font-size:11px; letter-spacing:0.04em; text-transform:uppercase; color: var(--color-type-muted); }
.product-dot { width:7px; height:7px; border-radius:999px; background: linear-gradient(135deg, var(--color-action-primary-default-grad-start), #2ec377); box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-action-primary-default) 18%, transparent); }
.view-switcher { display:inline-flex; padding:3px; border-radius:999px; background: var(--color-surface-variant-subtle); gap:2px; }
.view-pill { border:none; background:transparent; color: var(--color-type-muted); font-size:11px; padding:4px 10px; border-radius:999px; cursor:pointer; }
.view-pill.active { background: linear-gradient(90deg, var(--color-action-ai-default-grad-start), var(--color-action-ai-default-grad-end)); color: var(--color-action-primary-on-primary); }
.left-rail-body { margin-top:10px; padding:0 4px; display:flex; flex-direction:column; gap:10px; overflow:auto; }
.section-label { font-size:11px; text-transform:uppercase; letter-spacing:0.16em; color: var(--color-type-muted); padding: 0 4px; }

.thread-list { list-style:none; margin:0; padding: 4px 2px; display:flex; flex-direction:column; gap:6px; overflow:auto; }
.thread-row { display:flex; gap:8px; padding: 7px 8px; border-radius: 10px; background: var(--color-surface-variant); border: 1px solid var(--color-outline-static); }
.thread-title { font-size:13px; font-weight:600; }
.thread-last { font-size:12px; color: var(--color-type-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.thread-meta { display:flex; flex-direction:column; align-items:flex-end; gap:2px; }
.thread-time { font-size:11px; color: var(--color-type-muted); }
.thread-meta-label { font-size:10px; padding: 2px 6px; border-radius:999px; background: color-mix(in srgb, var(--color-status-success-default) 12%, transparent); color: var(--color-status-success-content); }
.thread-workflow-chip { font-size:11px; padding:1px 6px; border-radius:999px; background: color-mix(in srgb, var(--color-action-primary-default) 18%, transparent); }

.center-pane { display:flex; flex-direction:column; height:100%; padding: 12px 14px 12px 16px; }
.center-header { display:flex; align-items:center; justify-content:space-between; gap:16px; padding-bottom:8px; border-bottom: 1px solid var(--color-ui-divider-default); }
.center-title { font-size:15px; font-weight:600; }
.center-subtitle { font-size:12px; color: var(--color-type-muted); }
.center-header-actions { display:flex; gap:6px; }

.chip { border-radius:999px; border:none; padding: 6px 12px; font-size:12px; cursor:pointer; background: linear-gradient(90deg, var(--color-action-primary-default-grad-start), var(--color-action-primary-default-grad-end)); color: var(--color-action-primary-on-primary); }
.chip.secondary { background: transparent; border: 1px solid var(--color-outline-static); color: var(--color-type-default); }
.chip.tertiary { background: transparent; border: 1px solid var(--color-outline-static); color: var(--color-type-muted); }

.chat-window { flex:1; overflow:auto; padding: 10px 2px 8px; display:flex; flex-direction:column; gap:10px; }
.chat-message { display:flex; align-items:flex-start; gap:8px; }
.avatar { width:26px; height:26px; border-radius:999px; background: var(--color-surface-variant); border: 1px solid var(--color-outline-static); display:flex; align-items:center; justify-content:center; font-size:12px; }
.avatar.ai { background: color-mix(in srgb, var(--color-action-primary-default) 18%, transparent); }
.bubble { max-width:80%; border-radius: 12px; padding: 7px 10px 8px; background: var(--color-surface-variant); border: 1px solid var(--color-outline-static); }
.bubble-header { display:flex; justify-content:space-between; gap:12px; font-size:11px; color: var(--color-type-muted); margin-bottom:2px; }
.bubble-body { font-size:13px; color: var(--color-type-default); }

.composer { margin-top:4px; padding-top:8px; border-top: 1px solid var(--color-ui-divider-default); display:flex; flex-direction:column; gap:6px; }
.composer-top-row { display:flex; justify-content:space-between; align-items:center; gap:8px; }
.composer-mode { display:inline-flex; align-items:center; gap:6px; font-size:12px; color: var(--color-type-muted); }
.dot { width:8px; height:8px; border-radius:999px; background: var(--color-status-success-default); }
.dot.live { box-shadow: 0 0 8px color-mix(in srgb, var(--color-status-success-default) 55%, transparent); }
.composer-input-row { display:flex; gap:8px; align-items:flex-end; }
.composer-input { flex:1; resize:none; border-radius:10px; border: 1px solid var(--color-outline-static); background: var(--color-background-base); color: var(--color-type-default); font-size:13px; padding: 7px 9px; }
.composer-input::placeholder { color: var(--color-type-disabled); }
.composer-send { border-radius:999px; border:none; padding: 7px 14px; background: linear-gradient(90deg, var(--color-action-ai-default-grad-start), var(--color-action-ai-default-grad-end)); color: var(--color-action-primary-on-primary); font-size:13px; cursor:pointer; }

.right-pane { height:100%; display:flex; flex-direction:column; padding: 12px 12px 10px; }
.right-header { display:flex; justify-content:space-between; align-items:center; gap:12px; padding-bottom:8px; border-bottom: 1px solid var(--color-ui-divider-default); }
.right-title { font-size:14px; font-weight:600; }
.right-subtitle { font-size:12px; color: var(--color-type-muted); }
.right-body { margin-top:8px; overflow:hidden; display:flex; flex-direction:column; }
.right-body-columns { display:grid; grid-template-columns: minmax(0,1.2fr) minmax(0,1fr); gap:8px; height:100%; }
.right-overview { overflow:auto; display:flex; flex-direction:column; gap:8px; }
.callout, .callout-list, .timeline, .object-pane { border-radius: 12px; padding: 10px; background: var(--color-surface-variant); border: 1px solid var(--color-outline-static); }
.callout-label { font-size:11px; color: var(--color-type-muted); text-transform:uppercase; letter-spacing:0.16em; margin-bottom:4px; }
.callout-title { font-size:13px; font-weight:600; margin-bottom:2px; }
.callout-copy { font-size:12px; color: var(--color-type-muted); margin:0; }
.callout-list ul, .timeline-list { list-style:none; margin: 4px 0 0; padding:0; display:flex; flex-direction:column; gap:4px; }
.badge { display:inline-flex; align-items:center; padding:2px 7px; border-radius:999px; font-size:11px; margin-right:6px; border: 1px solid var(--color-outline-static); }
.badge-layout { background: color-mix(in srgb, var(--color-action-primary-default) 12%, transparent); }
.badge-data { background: color-mix(in srgb, var(--color-status-notification-default) 12%, transparent); }
.badge-collab { background: color-mix(in srgb, var(--color-action-ai-default-grad-start) 12%, transparent); }
.timeline-list li { display:flex; gap:8px; }
.timeline-title { font-size:12px; color: var(--color-type-default); }
.timeline-sub { font-size:11px; color: var(--color-type-muted); }

.nav-item { border-radius: 9px; border: 1px solid transparent; padding: 6px 8px; display:flex; align-items:center; gap:8px; background: transparent; color: var(--color-type-default); font-size:13px; cursor:pointer; }
.nav-item:hover { background: var(--color-action-secondary-hover); }
.nav-item.active { background: var(--color-selection-primary-default); }
.nav-icon { width:18px; height:18px; border-radius:7px; background: var(--color-surface-variant-subtle); display:inline-flex; align-items:center; justify-content:center; font-size:11px; }
`;

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
      <div className="proto-shell">
        <div id="layout-root" className="main-row">
          <div className="panel sidebar">
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
                        <span className="dot" style={{ width: 7, height: 7, marginTop: 2 }} />
                        <div>
                          <div className="timeline-title">Today · 2:14 PM</div>
                          <div className="timeline-sub">Triggered from Figma “Marketing page v3”</div>
                        </div>
                      </li>
                      <li>
                        <span className="dot" style={{ width: 7, height: 7, marginTop: 2, opacity: 0.35 }} />
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
                          <div
                            className="thread-title-row"
                            style={{ display: 'flex', gap: 6, marginBottom: 2, alignItems: 'center' }}
                          >
                            <span className="thread-title">{t.title}</span>
                            {t.isWorkflow && (
                              <span
                                className="thread-workflow-chip"
                                title="Linked to a workflow step"
                              >
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
          </div>

          <div className="panel middle-panel">
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
                  <div
                    key={m.id}
                    className={`chat-message ${m.from === 'ai' ? 'from-ai' : 'from-user'}`}
                  >
                    <div className={m.from === 'ai' ? 'avatar ai' : 'avatar'}>
                      {m.from === 'ai' ? 'A' : 'U'}
                    </div>
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
                  className={isWorkflowThreadsOpen ? 'w-collapsible is-open' : 'w-collapsible'}
                  style={{ marginTop: 8 }}
                >
                  <button
                    className="w-collapsible-trigger"
                    onClick={() => setIsWorkflowThreadsOpen((v) => !v)}
                    aria-expanded={isWorkflowThreadsOpen ? 'true' : 'false'}
                  >
                    <span style={{ fontWeight: 600 }}>
                      Workflow threads ({workflowThreads.length})
                    </span>
                    <span style={{ color: 'var(--color-type-muted)' }}>
                      {isWorkflowThreadsOpen ? 'Hide' : 'Show'}
                    </span>
                  </button>

                  <div className="w-collapsible-content">
                    <div
                      style={{
                        padding: '0 var(--space-2) var(--space-2)',
                        display: 'grid',
                        gap: 6,
                      }}
                    >
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
                          <span style={{ fontSize: 11, color: 'var(--color-type-muted)' }}>{t.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
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
          </div>

          <div
            className="resize-handle"
            onMouseDown={handleMouseDown}
            aria-label="Resize details panel"
            role="separator"
            aria-orientation="vertical"
          >
            <span className="resize-grip" />
          </div>

          <div className="panel right-panel" style={{ width: `${rightWidth}%` }}>
            <div className="right-pane">
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
                          <span className="dot" style={{ width: 7, height: 7, marginTop: 2 }} />
                          <div>
                            <div className="timeline-title">Today · 2:14 PM</div>
                            <div className="timeline-sub">Triggered from Figma “Marketing page v3”</div>
                          </div>
                        </li>
                        <li>
                          <span className="dot" style={{ width: 7, height: 7, marginTop: 2, opacity: 0.35 }} />
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
                          className={
                            selectedObjectId === 'layout' ? 'object-row active' : 'object-row'
                          }
                          onClick={() => setSelectedObjectId('layout')}
                        >
                          <span className="object-dot layout" />
                          <div className="object-main">
                            <div className="object-title">Layout config</div>
                            <div className="object-sub">Panels · Breakpoints · Density</div>
                          </div>
                        </button>

                        <button
                          className={
                            selectedObjectId === 'thread' ? 'object-row active' : 'object-row'
                          }
                          onClick={() => setSelectedObjectId('thread')}
                        >
                          <span className="object-dot thread" />
                          <div className="object-main">
                            <div className="object-title">Selected thread</div>
                            <div className="object-sub">Metadata · Workflow links</div>
                          </div>
                        </button>

                        <button
                          className={
                            selectedObjectId === 'callout' ? 'object-row active' : 'object-row'
                          }
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
        </div>
      </div>
    </>
  )
}
