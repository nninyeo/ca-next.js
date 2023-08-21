//error.js: 이 파일이 없으면 상위폴더 타고가면서 찾음.
//global-error.js 만들면 최상위 layout.js 에러 체크가능함.

'use client' //필수

export default function Error({error, reset}){ //props 2개가 들어옴.
    return(
        <div>
            <h4>에러페이지입니닿ㅎㅎ</h4>
            <button onClick={()=>{reset()}}>다시로딩버튼</button>
            {console.log(error)}
        </div>
    )
}