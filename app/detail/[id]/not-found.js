
//이 페이지는 404에러로 못걸르는 에러들을 걸르기위함. page.js같은 다른곳에서 import해서 사용
//return notFound()로 사용함. 애 역시 상위폴더 타고가면서 not-found.js을 찾음.
//즉, app폴더에 하나 만들어두면 공용으로 쓰기때매 편함.

export default function Loading(){
    return(
        <h4> 없는 페이지입니다...</h4>
        //
    )
}