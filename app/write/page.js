'use client'

import { getServerSession } from "next-auth"
import { authOptions } from '@/pages/api/auth/[...nextauth]'


export default async function Write(){
    

    let [src, setSrc] = useState('')

    let session = await getServerSession(authOptions)

    if (session){

        return(
            <div>
                <h4>글쓰기</h4>
                <form action="/api/post/write" method="POST">
                    <input name="title" placeholder="title"></input>
                    <input name="content" placeholder="content"></input>

                    <button type="submit">쓰기</button>
                </form>

                <input type="file" accept="image/*"
                        onChange={async(e)=>{
                            let file = e.target.files[0]
                            let filename = encodeURIComponent(file.name)
                            file.name
                            let res = await fetch('/api/post/image?file=' + filename)
                            res = await res.json()
                        }}
                />
                <input type="file" accept="image/*" onChange={
                    async (e) => {
                    let file = e.target.files[0]
                    let filename = encodeURIComponent(file.name)
                    let res = await fetch('/api/post/image?file=' + filename)
                    res = await res.json()
                    
                    //S3 업로드
                    const formData = new FormData()
                    Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                        formData.append(key, value)
                    })
                    let 업로드결과 = await fetch(res.url, {
                        method: 'POST',
                        body: formData,
                    })
                    console.log(업로드결과)

                    if (업로드결과.ok) {
                        setSrc(업로드결과.url + '/' + filename)
                    } else {
                        console.log('실패')
                    }
                    
                    }
                } />
                <img src={src}/>       
            </div>
        )


    }else{
    

        return <div> 로그인하세요 </div>

    }

}