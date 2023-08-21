'use client'

import { signIn } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function LoginBtn({ session }){


    //로컬스토리지 사용하기: useEffect필요. 클라이언트 렌더링 하는곳에서 사용
    //이런상황에선 늦게적용되서 문제임. 이럴땐 쿠키써야함.
    // useEffect(()=>{
    //     if (typeof window != 'undefined'){
    //         localStorage.setItem('mode', 'dark')
    //     }
    // },[])


    return (
        <div>
            {
                session 
                ? 
                <div>
                    <label>
                        {session.user.image && 
                            <img 
                                src={session.user.image} 
                                alt="Profile Image" 
                                style={{ width: '40px', height: '40px' }}/>
                        }
                        {session && <p>{session.user.name}님 로그인중</p>}
                    </label>
                    <button onClick={()=>{ signOut() }}>로그아웃버튼</button> 
                </div>
                :
                <div>
                    <button onClick={() => { signIn() }}>login</button>
                </div>
            }
        </div>
    )
}

