// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Laventa UI',
  description: 'Modern UI component library',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
