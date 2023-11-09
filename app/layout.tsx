import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import nookies from 'nookies';
import { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] })
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'Todos App',
  description: 'Todos App with Next.js and Firebase',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className='text-3xl font-semibold p-6 pb-4 w-full text-center'>Todo app ✅</h1>
        <div className="flex justify-center items-center">
          <Link
            href="https://github.com/ivankhrsh"
            className="text-black-500 p-1 hover:rounded-lg hover:bg-yellow-100 hover:p-1"
          >
            📂 Github
          </Link>
        </div>
        {children}
        <ToastContainer position="top-center" autoClose={2000}/>
      </body>
    </html>
  )
}

