// import { connectDB } from '@/util/database'
//   //conn DB

// //누군가 방문시 60초 캐싱한 데이터를 보여줌. 단 미방문시에는 60초이상일수있음.(페이지단위로), =ISR
// export const revalidate = 60;

// export default async function handler(req, res){


    
//   const client = await connectDB;
//   const db = client.db("dbname")

//   let result = await db.collection('colname').find().toArray()



//     if(req.method == 'GET') {
//         return res.status(200).json(result)
//     }else
//         return res.status(500).json('err.')
// }



import { connectDB } from '@/util/database'
  //conn DB



export default async function handler(req, res){

    //캐쉬 사용
    await fetch('/URL', {cache : 'force-cache'})  

    //늘 새로요청
    await fetch('/URL', {cache : 'no-store'})

    //60초마다 캐싱된 데이터를 갱신
    await fetch('/URL', {next : {revalidate : 60}})  




    if(req.method == 'GET') {
        return res.status(200).json(result)
    }else
        return res.status(500).json('err.')
}