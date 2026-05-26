import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Jost, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const jost = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Главный по слэбам — Производство из ценных пород дерева Сочи',
  description: 'Более 1000 слэбов на складе. Дуб, кедр, платан, секвойя и 15+ пород. Производство в Сочи, доставка по всей России.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${jost.variable} ${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className={`${jost.variable} ${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased`}>
        <Navbar />
        <main className="site-main mt-[var(--nav-h)] min-h-[calc(100vh-var(--nav-h))] font-[family-name:var(--font-body)] font-light">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
