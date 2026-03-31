import React from 'react'
import './App.css'

type ViewMode = 'nav' | 'threads'

type Thread = {
  id: number
  title: string
  lastMessage: string
  time: string
  isWorkflow: boolean
  workflowLabel?: string
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

function App() {
  const [viewMode, setViewMode] = React.useState<ViewMode>('nav')
  const [rightWidth, setRightWidth] = React.useState(32)
  const [isResizing, setIsResizing] = React.useState(false)

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
      if (isResizing) {
        setIsResizing(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  return (
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
              Nav
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
            <div className="section-label">Workspace</div>
            <nav className="nav-list">
              <button className="nav-item active">
                <span className="nav-icon">◎</span>
                <span>Home</span>
              </button>
              <button className="nav-item">
                <span className="nav-icon">⚡</span>
                <span>Workflows</span>
              </button>
              <button className="nav-item">
                <span className="nav-icon">💬</span>
                <span>Conversations</span>
              </button>
              <button className="nav-item">
                <span className="nav-icon">📊</span>
                <span>Analytics</span>
              </button>
            </nav>

            <div className="section-label">Workflow steps</div>
            <ul className="workflow-list">
              <li className="workflow-item">
                <div className="workflow-pill">Design review</div>
                <span className="workflow-sub">3 linked threads</span>
              </li>
              <li className="workflow-item">
                <div className="workflow-pill">Launch checklist</div>
                <span className="workflow-sub">1 in progress</span>
              </li>
              <li className="workflow-item">
                <div className="workflow-pill">Customer feedback loop</div>
                <span className="workflow-sub">Live</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="left-rail-body">
            <div className="section-label">Threads</div>
            <ul className="thread-list">
              {mockThreads.map((t) => (
                <li key={t.id} className="thread-row">
                  <div className="thread-main">
                    <div className="thread-title-row">
                      <span className="thread-title">{t.title}</span>
                      {t.isWorkflow && (
                        <span className="thread-workflow-chip" title="Linked to a workflow step">
                          ⛓
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
            <div className="center-title">Conversation with AI</div>
            <div className="center-subtitle">Prototype of a conversational workflow console</div>
          </div>
          <div className="center-header-actions">
            <button className="chip">New thread</button>
            <button className="chip secondary">Attach to workflow</button>
          </div>
        </header>

        <div className="chat-window">
          <div className="chat-message from-user">
            <div className="avatar">U</div>
            <div className="bubble">
              <div className="bubble-header">
                <span className="name">You</span>
                <span className="time">2:14 PM</span>
              </div>
              <div className="bubble-body">
                Walk through my design and highlight anything risky for implementation.
              </div>
            </div>
          </div>

          <div className="chat-message from-ai">
            <div className="avatar ai">A</div>
            <div className="bubble">
              <div className="bubble-header">
                <span className="name">Assistant</span>
                <span className="time">2:14 PM</span>
              </div>
              <div className="bubble-body">
                I’ve grouped this into three areas: layout, data-loading, and collaboration. Hover
                over any callout in the right panel to see where it maps in the design.
              </div>
            </div>
          </div>

          <div className="chat-message from-ai">
            <div className="avatar ai">A</div>
            <div className="bubble">
              <div className="bubble-header">
                <span className="name">Assistant</span>
                <span className="time">2:16 PM</span>
              </div>
              <div className="bubble-body">
                I can also attach this conversation to the “Design review” workflow so future runs
                reuse the same prompts and structure.
              </div>
            </div>
          </div>
        </div>

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
          <section className="callout">
            <div className="callout-label">Linked step</div>
            <div className="callout-title">Design review · Step 2</div>
            <p className="callout-copy">
              This step runs after a new Figma link is added. The assistant checks layout, spacing,
              and component usage against your design system.
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
      </div>
    </div>
  )
}

export default App
