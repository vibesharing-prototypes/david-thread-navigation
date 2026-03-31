import './globals.css'

export const metadata = {
  title: 'Thread navigation prototype',
  description: 'Three-panel console prototype with resizable panes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

