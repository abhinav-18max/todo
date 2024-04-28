
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',

}

export default function AuthLayout({
  children,
}: {
  children: any
}) {
  return (
      <main className="h-screen flex flex-col justify-center items-center text-black">
      {children}
          <Toaster/>
      </main>
  )
}
