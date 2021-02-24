import React from 'react'
import { useCookies } from 'react-cookie'

export default function SignOut(){
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    removeCookie('token')
    document.location = '/players'
    return <></>
}