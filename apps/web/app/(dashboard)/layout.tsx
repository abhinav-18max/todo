
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster} from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/query/queryclient";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Provider from "@/lib/authProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Todo App',

}

export default function DashLayout({
                                       children,
                                   }: {
    children: any
}) {
    return (

        <main className="h-full text-black">
            <Provider>
                <ReactQueryProvider>
                    {children}
                    <Toaster/>
                </ReactQueryProvider>
            </Provider>
        </main>

    )
}
