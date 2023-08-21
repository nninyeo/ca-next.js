// 'use client'
// import Link from 'next/link'
// import DetailLink from "@/app/list/DetailLink";

// export default function ListItem({ result }) {
//     const parsedResult = JSON.parse(result);
//     return (
//         <div>

//             {
//                 parsedResult.map((item, index) => (
//                     <div className="list-item" key={index}>
//                         <Link prefetch={false} href={`/detail/${item._id}`}>
//                             <h4>{item.title}</h4>
//                         </Link>
//                         <Link href={`/edit/${item._id}`}>✏️</Link>
//                         <DetailLink></DetailLink>

//                         <span onClick={() => {
//                             fetch('/api/post/delete/', {
//                                 method: 'POST',  //성공시실행
//                                 body: item._id //JSON.stringify(..)
//                             }).then((response) => {
//                                 // console.log('지움'+item._id)
//                                 if (response.ok) {
//                                     console.log('삭제 성공');
//                                     window.location.href = '/list'; // 리다이렉션 수행
//                                 } else {
//                                     console.log('삭제 실패');
//                                 }

//                             }).catch((error) => {
//                                 //인터넷문제 등으로 실패시 실행할코드
//                                 console.log("에러발생" + error)
//                             })
//                         }}>🗑️</span>

//                         <p>{item.content}</p>
//                     </div>
//                 ))}

//         </div>
//     )
// }








'use client'
import Link from 'next/link'
import DetailLink from "@/app/list/DetailLink";


export default function ListItem({ result }) {

    const parsedResult = JSON.parse(result);

    const handleDelete = (postId, e) => {
        const listItem = document.querySelector(`#list-item-${postId}`);
        fetch('/api/post/delete/', {
            method: 'POST',  
            body: postId,
        }).then((response) => {
            if (response.ok) {
                console.log('삭제 성공');
                if(listItem){
                    listItem.style.opacity = 0;
                    setTimeout(()=>{
                        listItem.style.display = "none";
                    },600)
                    // console.log(listItem)
                }
                // window.location.href = '/list'; // 리다이렉션 수행
            } else {
                console.log('삭제 실패');
            }
        }).catch((error) => {
            //인터넷문제 등으로 실패시 실행할코드
            alert("에러발생: " + error)
        });
    };
    const handleTest1 = (postId, e) => {
        
        fetch('/api/test?name=kim&age=22', {
            // method: 'POST',  
            // body: postId,
        }).then((response) => {
            //do
        }).catch((error) => {
            //인터넷문제 등으로 실패시 실행할코드
            alert("에러발생: " + error)
        });
    };
    const handleTest2 = (postId, e) => {
        
        fetch('/api/abc/어쩌구', {
            // method: 'POST',  
            // body: postId,
        }).then((response) => {
            //do
        }).catch((error) => {
            //인터넷문제 등으로 실패시 실행할코드
            alert("에러발생: " + error)
        });
    };

    return (
        <div>
            {
                parsedResult.map((item, index) => (
                    <div className="list-item" id={`list-item-${item._id}`} key={index}>
                        <Link prefetch={false} href={`/detail/${item._id}`}>
                            <h4>{item.title}</h4>
                            <h4>{item.author}</h4>
                        </Link>
                        <Link href={`/edit/${item._id}`}>✏️</Link>
                        <DetailLink></DetailLink>
                        <span onClick={(e) => handleDelete(item._id, e)}>🗑️</span>
                        <span onClick={(e) => handleTest1(item._id, e)}>TEST1 </span>
                        <span onClick={(e) => handleTest2(item._id, e)}>TEST2 </span>

                        <p>{item.content}</p>
                    </div>
                ))}

        </div>
    )
}