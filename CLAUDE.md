# Thread navigation

## Project Structure

This is a **Next.js 14 App Router** project deployed via VibeSharing.

- app/page.tsx — **Main page. This is what visitors see.** Edit this file.
- app/layout.tsx — Root layout (HTML head, global styles)
- app/globals.css — Tailwind CSS styles
- public/ — Static assets (images, fonts, standalone HTML)

## IMPORTANT: File Placement Rules

**NEVER put HTML files in the repo root.** Next.js does not serve files from the root directory. They will be invisible to visitors.

Where files go:
- React components → app/page.tsx or app/components/
- Static HTML files → public/ directory (served at /filename.html)
- Images/assets → public/ directory
- CSS → app/globals.css (Tailwind) or public/ (plain CSS)

If you have a standalone HTML prototype, either:
1. **Preferred:** Convert it to a React component in app/page.tsx
2. **Alternative:** Place it in public/prototype.html and update app/page.tsx to redirect:
   \`\`\`tsx
   import { redirect } from "next/navigation";
   export default function Page() { redirect("/prototype.html"); }
   \`\`\`

## Tech Stack

- Next.js 14, React 18, Tailwind CSS, TypeScript

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Deployment

Push to main to deploy. Vercel auto-deploys within ~30-60 seconds.

\`\`\`bash
git add .
git commit -m "Update prototype"
git push origin main
\`\`\`

**Do NOT use vercel CLI, vercel deploy, zip upload, or any API endpoint. Just git push.**
