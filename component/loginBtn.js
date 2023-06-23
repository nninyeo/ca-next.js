'use client'

import { signIn } from 'next-auth/react'
import { signOut } from 'next-auth/react'

export default function LoginBtn({ session }){
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

