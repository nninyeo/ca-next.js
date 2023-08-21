import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(req, res){

    let comments = ""
    // mongo에 제시된 js정석적인 방법
    const client = await connectDB;
    if(req.method=='POST') {
            if (req.body._id == '') {
            return res.status(500).json('no')
            }
        try{
            await client.connect();
            const db = client.db("dbname")
            const coll = await db.collection('comment')

            comments = await coll.find({parent: req.body}).toArray();
            // console.log("writeId" + req.body)
            // await comments.forEach(console.log);
        }finally {
            await client.close();
        }
        return res.status(200).json(comments)
    }
}