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

    if (session == null) {
        req.body.postAuthor = 'test4';
    }
    console.log('session: ', session)

    if(req.method=='POST') {
        if (req.body.commentId == '') {
            return res.status(500).json('노id')
            }
        try{
            await client.connect();
            const db = client.db("dbname")
            const coll = await db.collection('comment')

            
            //로직
            //아이디 한번 조회해보고
            //  없으면 DB의 like에 아이디저장
            //  있으면 DB의 like에 아이디 삭제
            let findCursor = await coll.find({ _id: req.body.commentId , likeUsers: req.body.postAuthor })
            const resultArray = await findCursor.toArray();

            console.log('집중테스트:')
            console.log(req.body.postAuthor)
            console.log(req.body.commentId)
            // console.log(findCursor)
            console.log(resultArray)


            if (resultArray.length > 0) {
                // 해당 commentId에 likeUser가 존재함 -> likeUser 삭제
                await coll.updateOne({ _id: req.body.commentId }, { $pull: { likeUsers: req.body.postAuthor } });
                console.log("이프");
              } else {
                console.log("엘즈");
                console.log(req.body.postAuthor);
                // 해당 commentId에 likeUser가 존재하지 않음 -> likeUser 추가
                // await coll.updateMany({ _id: req.body.commentId }, { $set: { likeUsers: [] } });
                await coll.updateOne({ _id: req.body.commentId }, [{ $set: { likeUsers: req.body.postAuthor } }]);
              }


            // if (await findCursor.hasNext()) {
            //     // 해당 commentId에 likeUser가 존재함 -> likeUser 삭제
            //     await coll.updateOne({ _id: req.body.commentId }, { $pull: { likeUsers: req.body.postAuthor } });
            //     console.log("이프")
            // } else {
            //       console.log("엘즈")
            //       console.log(req.body.postAuthor)
            //     // 해당 commentId에 likeUser가 존재하지 않음 -> likeUser 추가
            //     await coll.updateOne({ _id: req.body.commentId }, { $addToSet: { likeUsers: req.body.postAuthor } });
            // }

        }finally {
            await client.close();

        }
        // return res.redirect(302, '/list')   사용금지.
        // res.writeHead(302, { Location: '/list' });
        // res.end();
        res.status(200).json('comment saved')
    }


}