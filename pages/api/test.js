// import { connectDB } from '@/util/database'
  //conn DB

export default async function handler(req, res){

    
//   const client = await connectDB;
//   const db = client.db("dbname")

//   let result = await db.collection('colname').find().toArray()

  const test = req.body;
  console.log(test)

    if(req.method == 'GET') {
        console.log(JSON.stringify(req.query))
        res.status(200).end() //.json(result)
    }else
        res.status(500).end()//.json('err.')
}