import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(req, res){


    // mongo에 제시된 js정석적인 방법
    const client = await connectDB;
    if(req.method=='POST') {
        if (req.body.id == '') {
            return res.status(500).json('id써라')
            }
            if (req.body.pw == '') {
                return res.status(500).json('pw써라')
                }
                
        try{
            await client.connect();
            const db = client.db("dbname")
            const coll = await db.collection('guest')

            const docs = [{id: req.body.id, pw: req.body.pw}];
            const result = await coll.insertMany(docs);

            console.log(result.insertedIds);

        }finally {
            await client.close();

        }
        return res.redirect(302, '/list')   
    }


}