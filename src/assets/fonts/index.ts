import { Inter, Geist, Geist_Mono, Roboto } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'], // Include weights as needed,
  variable: '--font-inter',
})

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Include weights as needed
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});