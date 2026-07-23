import type { Metadata } from 'next'
import { Figtree, Barlow_Condensed, Montserrat } from 'next/font/google'
import './globals.css'
import FloatingNav from './components/nav/FloatingNav'
import Footer from './components/Footer'
import ClientProviders from './components/ClientProviders'
import ScrollToTopButton from './components/ScrollToTopButton'
import Breadcrumbs from './components/Breadcrumbs'
import CursorGlow from './components/CursorGlow'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })
const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Beyond SAS — Fabricación Industrial para Marcas',
  description: 'Diseño, ingeniería, fabricación e implementación de exhibición comercial y arquitectura retail. Bogotá, Colombia.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${figtree.variable} ${barlow.variable} ${montserrat.variable}`}>
      <body>
        <ClientProviders>
          <CursorGlow />
          <FloatingNav />
          <main style={{ position: 'relative' }}>
            <Breadcrumbs />
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
        </ClientProviders>
      </body>
    </html>
  )
}
