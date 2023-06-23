export default function Time(){
    return(
        <div>
            <h4>타임</h4>
            <form action="/api/time/time" method="GET">
                <button type="submit">요청</button>
            </form>
        </div>
    )
}