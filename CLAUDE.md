# Design System Template

## Atlas Design System — Component API Reference

This prototype uses `@diligentcorp/atlas-react-bundle` with MUI. ONLY use the component APIs documented here. Do NOT guess at props — if a prop is not listed, it does not exist.

## App Shell

### AppLayout
The top-level layout wrapper. Provides sidebar navigation and org header.

```tsx
<AppLayout navigation={<Navigation />} orgName="Connected Compliance">
  <Outlet />
</AppLayout>
```

**Props:**
- `navigation` (ReactNode) — sidebar nav content
- `orgName` (string) — organization name shown in the header
- `children` (ReactNode) — page content

### RoutedNavLink
Sidebar navigation item. Import from `@diligentcorp/atlas-react-bundle/global-nav`.

```tsx
<RoutedNavLink to="/reports" label="Reports">
  <ReportsIcon slot="icon" />
</RoutedNavLink>
```

**Props:**
- `to` (string) — route path
- `label` (string) — nav item text
- `children` — icon element with `slot="icon"`

### Icons
Import from `@diligentcorp/atlas-react-bundle/icons/<IconName>`. Known icons: `Home`, `ComplianceEthics`, `Reports`, `Settings`, `Text`, `BoardGroup`.

## Page Components

### PageHeader
Page title with optional breadcrumbs and action buttons.

```tsx
<PageHeader
  pageTitle="Reports"
  pageSubtitle="Generated compliance reports"
  breadcrumbs={<OverflowBreadcrumbs ... />}
  buttonArray={<Button variant="contained">Create report</Button>}
/>
```

**Props:**
- `pageTitle` (string) — main heading
- `pageSubtitle` (string) — description below title
- `breadcrumbs` (ReactNode) — OverflowBreadcrumbs component
- `buttonArray` (ReactNode) — action buttons on the right

**DO NOT use `actions` prop — it does not exist. Use `buttonArray` for action buttons.**

### OverflowBreadcrumbs
Breadcrumb navigation. Used inside PageHeader.

```tsx
<OverflowBreadcrumbs
  leadingElement={<NavLink to="/home">Home</NavLink>}
  items={[{ id: "reports", label: "Reports", url: "/reports" }]}
  hideLastItem
  aria-label="Breadcrumbs"
>
  {({ label, url }) => <NavLink to={url}>{label}</NavLink>}
</OverflowBreadcrumbs>
```

**Props:**
- `leadingElement` (ReactNode) — first breadcrumb
- `items` (array) — `{ id: string, label: string, url: string }[]`
- `hideLastItem` (boolean) — hide the last breadcrumb (current page)
- `aria-label` (string)
- `children` (render function) — `({ label, url }) => ReactNode`

### StatusIndicator
Colored status badge with label.

```tsx
<StatusIndicator label="Stable" color="success" />
```

**Props:**
- `label` (string) — status text
- `color` — `"success" | "warning" | "error" | "information" | "generic"`

## AI Chat Components

All imported from `@diligentcorp/atlas-react-bundle`.

### AIChatContextProvider
Wraps the chat UI. Must be the outermost chat wrapper.
- `initialHasStartedChat` (boolean)

### AIChatUI
The chat interface container.
- `chatContent` (ReactNode) — the message list
- No other required props

### AIChatContent
Container for chat messages. Children are message components.

### AIChatUserMessage
- `alignment` — `"end"`
- `message` (string) — message text
- `header` (ReactNode) — AIChatMessageHeader

### AIChatAIMessage
- `header` (ReactNode) — AIChatMessageHeader
- `children` — AIChatMessageTextBlock or AIChatThinkingIndicator

### AIChatMessageHeader
- `name` (string)
- `time` (string)
- `avatar` (ReactNode) — AIChatMessageAvatar

### AIChatMessageAvatar
- `uniqueId` (string)
- `initials` (string)

### AIChatMessageTextBlock
Wraps text content inside AIChatAIMessage. Children = string.

### AIChatThinkingIndicator
- `label` (string) — e.g. "Thinking…"

### AIChatBox
Input box for typing messages. Used inside AIChatUI.

### useAIChatContext
Hook that returns `{ sendMessage, isGenerating }`.

## MUI Typography Variants

Use these MUI variant names — they are custom Atlas variants:
- `h1`, `h2`, `h3` — headings
- `body1` — body text
- `labelSm` — small bold label (table headers, card titles)
- `labelXs` — extra-small label (deltas, metadata)
- `textSm` — small regular text (descriptions, secondary content)

## Layout Patterns

- Use `Container` with `sx={{ py: 3 }}` for page padding
- Use `Stack gap={3}` or `gap={4}` for vertical section spacing
- Use `Stack direction="row"` for horizontal layouts
- Use `Box` with border styling for metric cards: `border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2`
- Tables: `Table size="small"` with custom cell padding via sx

## Don'ts

- **DO NOT** use `actions` prop on PageHeader — use `buttonArray`
- **DO NOT** guess at component props — only use what is documented above
- **DO NOT** hardcode colors — use MUI theme palette (`text.primary`, `text.secondary`, `divider`, etc.)
- **DO NOT** import components from paths not shown here
- **DO NOT** use `@mui/icons-material` — use Atlas icons from `@diligentcorp/atlas-react-bundle/icons/<Name>`