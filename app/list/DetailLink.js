'use client'

import { useRouter } from "next/navigation"

export default function DetailLink(){

    let router = useRouter()//client mode only, it imported from navigation, NOT router.
    // let 현재url = usePathname()
    // let SearchParameter쿼리스트링 = useSearchParams()
    // let dynamicRoute에입력한내용 = useParams()

    return(
        <button onClick={()=>{ router.push('/')}}>메인으로</button>
        
        // <button onClick={()=>{ router.refresh()}}>soft Refresh - 새로고침</button>
        // <button onClick={()=>{ router.prefetch('/url')}}>미리땡겨둠</button>, <link>에 이미 내장되어있음.
    )
}