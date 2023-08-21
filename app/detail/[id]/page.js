import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import Comment from "./Comment"

export default async function Detail(props){

    const client = await connectDB;
    const db = client.db("dbname")

    // console.log(props.params.id);

    if (result === null) {
        return notFound()
        //page.js대신 notFound페이지를 보여줌
    }

    let result = await db.collection('colname').findOne({_id: new ObjectId(props.params.id)});
    // let comments = await db.collection('colname').findOne({_id: new ObjectId(props.params.id)});


    return(
        <div>
            <h4>상세페이지입니다</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <Comment writeId={props.params.id}/>
        </div>
    )
}