import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";


export default async function Edit(props){

    
    const client = await connectDB;
    const db = client.db("dbname")

    // console.log(props.params.id);

    let result = await db.collection('colname').findOne({_id: new ObjectId(props.params.id)});

    

    return(
        <div>
            <h4>글수정</h4>
            <form action="/api/edit" method="POST">
                <input name="_id" defaultValue={props.params.id} style={{display : 'none'}}/>
                <input name="title" placeholder="title" defaultValue={result.title}/>
                <input name="content" placeholder="content" defaultValue={result.content}/>
                
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
}