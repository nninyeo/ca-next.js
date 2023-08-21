import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){

    const client = await connectDB;
    
    // req.body = "sdf"

    console.log('test');
    console.log(JSON.stringify(req.body));
    
    let session = await getServerSession(req, res, authOptions)
    if (session) {
        req.body.author = session.user.email;
    }

    if(req.method == 'POST') {
        try{

            if(req.body.author == req.body.author){
                console.log(`try: `)
                // console.log(req.body)
                // console.log('JSON.parse(req.body._id):')
                await client.connect();
                const db = client.db("dbname")
                const coll = await db.collection('colname')
    
                const result = await coll.deleteOne({"_id" : new ObjectId(req.body)}) //JSON.parse() 삭제.
                // console.log('오브젝틍아이디=' + ObjectId(req.body._id))
                // res.status(200, ).json('삭제완료')
                // res.writeHead(302, { Location: '/list' });
                // res.end();
                res.status(200).json({ message: '삭제완료', redirect: '/list' });
    
                await client.close();
            }
            else{
                res.status(500).send('본인아님');
            }


        }catch (error) {
            console.log("catch: ")
            await client.close();
            res.status(500).send('서버 오류가 발생했습니다.');
        }
       
        
    }


}