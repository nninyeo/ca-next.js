export default function Write(){
    return(
        <div>
            <h4>글쓰기</h4>
            <form action="/api/post/write" method="POST">
                <input name="title" placeholder="title"></input>
                <input name="content" placeholder="content"></input>
                
                <button type="submit">쓰기</button>
            </form>
        </div>
    )
}