import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import Provider from './Provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log('RootLayout rendering')
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
