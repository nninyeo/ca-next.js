
import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://dualssbb:6Ui2oULYz8hiIjTK@cluster0.asccini.mongodb.net/?retryWrites=true&w=majority'
const options = { useNewUrlParser: true }
let connectDB

//dev모드에서 재접속하지않게 중복막아주는 처리
if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }