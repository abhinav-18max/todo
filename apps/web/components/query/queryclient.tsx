"use client"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


export default function ReactQueryProvider({children}:{children:React.ReactNode}){
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnMount: true,
            }
        }
    });
    return(
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
