import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { useRouter } from 'next/router';
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){

    //위조가 가능하므로 인증정보를 백에서 받아 처리
    await getServerSession(req, res, authOptions)

    let session = await getServerSession(req, res, authOptions)
    // if (session) {
    //     req.body.author = session.user.name;
    //     //???
    // }
    // mongo에 제시된 js정석적인 방법
    const client = await connectDB;

    if (session == '') {
        req.body.postAuthor = session.user.name;
    }

    if(req.method=='POST') {
            if (req.body.postComment == '') {
            return res.status(500).json('내용써라')
            }
        try{
            await client.connect();
            const db = client.db("dbname")
            const coll = await db.collection('comment')
            const docs = [{parent: req.body.parent, content: req.body.postComment, author: req.body.postAuthor, likeUsers: [] }];
            const result = await coll.insertMany(docs);

            console.log(result.insertedIds);

        }finally {
            await client.close();

        }
        // return res.redirect(302, '/list')   사용금지.
        // res.writeHead(302, { Location: '/list' });
        // res.end();
        res.status(200).json('comment saved')
    }


}