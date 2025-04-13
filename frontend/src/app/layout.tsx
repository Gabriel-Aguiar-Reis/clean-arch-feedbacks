import '@/styles/globals.css'
import { Providers } from '@/app/providers'
import { SonnerToaster } from '@/components/ui/sonner'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <main>{children}</main>
          <SonnerToaster />
        </Providers>
      </body>
    </html>
  )
}
