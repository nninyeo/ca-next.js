export default function Guest(){
    return(
        <div>
            <h4>회원가입</h4>
            <form action="/api/guest" method="POST">
                <input name="id" placeholder="ID"></input>
                <input name="pw" placeholder="PW"></input>
                
                <button type="submit">가입하기</button>
            </form>
        </div>
    )
}