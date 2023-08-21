'use client'

import { useEffect } from "react"

export default function DarkMode(){

    useEffect(()=>{
        //쿠키 나이지정해야 닫아도 안없어짐. 디폴트0
        let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
        if (쿠키값 == ''){
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 365)
        }
    },[])

    return(
        <span>🌙</span>
    )
}