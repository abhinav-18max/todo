'use server'
import axios from "axios";
import {redirect} from 'next/navigation'

const API = process.env.API_ROUTE

export async function reguser(data: any) {
    let res: any
    try {
        res = await axios.post(`${API}/user/register`, data)
        // console.log(res.status)

    } catch (err) {
        console.error(err)
        return "Something went wrong"
    } finally {
        if (res.status === 201) redirect('/signin')
    }


}
export async function login(data: any) {
    let res: any
    try {
        res = await axios.post(`${API}/auth/login`, data)
        // console.log(res.status)

    } catch (err) {
        console.error(err)
        return "Something went wrong"
    } finally {
        if (res.status === 201) redirect('/profile')
    }
}