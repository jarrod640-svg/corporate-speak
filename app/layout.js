export const metadata = {
  title: 'Corporate Interpreter - Make Your Meetings Sound Important',
  description: 'Transform simple ideas into impressive corporate jargon. Generate buzzword-laden phrases for meetings, emails, and presentations.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.7;
            }
          }
        `}</style>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
