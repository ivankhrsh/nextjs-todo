import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './context/AuthContextProvider'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={inter.className}>
          {children}
          <ToastContainer/>
        </body>
      </AuthContextProvider>
    </html>
  )
}
