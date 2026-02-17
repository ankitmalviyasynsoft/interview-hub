import { Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from '@/_components/providers/ThemeProvider'
import { ReduxProvider } from '@/providers/reduxProvider/Redux.provider'
import { Toaster } from '@/_components/ui/sonner'

import AuthProvider from '@/providers/authProvider/AuthProvider'
import LayoutWrapper from '@/_layouts/layout-wrapper/LayoutWrapper'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className="antialiased">
        <ReduxProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <LayoutWrapper>{children}</LayoutWrapper>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
