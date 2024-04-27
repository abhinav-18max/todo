
import NextAuth, {Awaitable, RequestInternal, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {NextApiRequest, NextApiResponse} from "next";
import { cookies } from "next/headers";
// @ts-ignore
import { parse } from "cookie";

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
export const Options = (req,res) =>{

    return{
        providers: [CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "email", type: "email", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            authorize: async function (credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Promise<User | null>{
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, {
                        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
                    })

                    const apiCookies = response.headers.get("Set-Cookie");
                    if (apiCookies && apiCookies.length > 0) {
                        // @ts-ignore
                           const cookie = apiCookies;
                            const parsedCookie = parse(cookie);
                            const [cookieName, cookieValue] =
                                Object.entries(parsedCookie)[0];
                            const httpOnly = cookie.includes("httponly;");

                            // @ts-ignore
                        cookies().set({
                                name: cookieName,
                                value: cookieValue,
                                httpOnly: httpOnly,
                                maxAge: parseInt(parsedCookie["Max-Age"]),
                                path: parsedCookie.path,
                                sameSite: parsedCookie.samesite,
                                expires: new Date(parsedCookie.expires),
                                secure: true,
                        });

                    }

                    const user_ = await response.json();
                    const user = user_?.user;
                    console.log(user)
                    if (response.status === 201 && user) {

                        return {...user}
                    } else {
                        return null;
                    }
                } catch (e) {
                    console.log(e)
                }


            },

        })],callbacks: {
            async jwt({ token, user,trigger,session}):Promise<any>{
                if(user){
                    token.id = user.id;
                    token.user= user.user;
                    token.email = user.email;

                }
                return token;
            },
            async session({ session, token }):Promise<any> {
                if(token){
                    session.id = token.id;
                    session.user = token.user;
                    session.user = token.email;

                }
                return session;
            }

        },
        pages: {
            signIn: "/signin", error: "/signin",
        },
    }


};
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, Options(req,res));
}
export {handler as GET, handler as POST}