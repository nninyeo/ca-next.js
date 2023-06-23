
export default function handler(req, res){
    const currentTime = new Date().toLocaleString();
    // console.log(456)
    return res.status(200).json(currentTime)
}