import { MongoClient } from 'mongodb'
import { connectDB } from '@/util/database'
import Link from "next/link"

import ListItem from "./ListItem";

//Forced Dynamic rendering
export const dynamic = 'force-dynamic'

export default async function List() {

  //conn DB
  const client = await connectDB;
  const db = client.db("dbname")

  let result = await db.collection('colname').find().toArray()
  // console.log(result)
//   console.log(result[0].title)

    return (
      <div className="list-bg">
        <ListItem result={JSON.stringify(result)} />


      </div>
    )
  } 