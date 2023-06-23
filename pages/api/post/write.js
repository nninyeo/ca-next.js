import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { useRouter } from 'next/router';

export default async function handler(req, res){

    // 약간 next에 맞는 변칙
    // if (요청.method == 'POST'){
    //     if (요청.body.title == '') {
    //       return 응답.status(500).json('제목써라')
    //     }
    //     try {
    //       let db = (await connectDB).db('dbname')
    //       let result = db.collection('colname').insertOne(요청.body)
    //       응답.redirect(302, '/list')
    //     } catch (error) {
    //     //   DB에러시 실행할코드~~
    //     }
        
    //   }


    // mongo에 제시된 js정석적인 방법
    const client = await connectDB;
    if(req.method=='POST') {
            if (req.body.title == '') {
            return res.status(500).json('제목써라')
            }
        try{
            await client.connect();
            const db = client.db("dbname")
            const coll = await db.collection('colname')

            const docs = [{title: req.body.title, content: req.body.content}];
            const result = await coll.insertMany(docs);

            console.log(result.insertedIds);

        }finally {
            await client.close();

        }
        // return res.redirect(302, '/list')   사용금지.
        res.writeHead(302, { Location: '/list' });
        res.end();
    }


}