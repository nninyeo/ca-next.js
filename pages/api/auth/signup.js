
import { connectDB } from "@/util/database"
import bcrypt from 'bcrypt'

export default async function handler(req, res){


    const client = await connectDB;

    if(req.method == 'POST'){

            console.log("123")
        try{
            let hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash;
            console.log(hash)
            console.log(req.body)

            await client.connect();
            const db = client.db("dbname")
            const coll = await db.collection('user_cred')
            // const docs = [{title: req.body.title, content: req.body.content, author: req.body.author}];
            const result = await coll.insertOne(req.body);

            console.log(result.insertedIds);
            return res.status(200).end();
            // res.statusCode = 200;
            // res.setHeader('Content-Type', 'application/json');
            // res.setHeader('Cache-Control', 'max-age=180000');
            // res.end();

        }catch(error){
            // console.log('error', error)
            // res.json(error);
            // res.status(405).end();
            // return res.status(500).send(error);
        };
        // res.writeHead(302, { Location: '/list' });
        // res.end();
        
    }
}