'use client';
//use client상태에서 DB 조회 안됨. get요청으로 서버에 요청을 해야함. 대신 실시간반영가능

import { useEffect, useState } from "react";
// import { getServerSession } from "next-auth"
// import { authOptions } from '@/pages/api/auth/[...nextauth]'

// fetch 함수
const sendComment = (postId, comment, author) => {
  const requestBody = {
    parent: postId,
    postComment: comment,
    postAuthor: author,
  };

  return fetch("/api/comment/new", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const sendiLikeit = (commentId) => {
  const requestBody = {
    commentId: commentId,
  };
  console.log(commentId);

  return fetch("/api/comment/like", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default function Comment(props) {
  // let session = await getServerSession(authOptions)
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [iLikeit, setiLikeit] = useState([]);
  const [commentList, setCommentList] = useState([]);

  const commentSubmit = () => {
    // if(session != '')
    // setAuthor(session.user)

    // console.log("프롭스아이디: " + props.writeId);

    sendComment(props.writeId, comment, author)
      .then((response) => {
        console.log("댓글 전송 성공:" + response.status);
      })
      .catch((error) => {
        console.error("댓글 전송 실패:", error);
      });
  };

  const iLikeitButton = (commendId) => {
    sendiLikeit(commendId)
      .then((response) => {
        console.log("좋아요버튼 성공:" + response.status);
      })
      .catch((error) => {
        console.error("좋아요버튼 실패:", error);
      });
  };

  useEffect(() => {
    fetch("/api/read/comments", {
      method: "POST",
      body: JSON.stringify(props.writeId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json(); // 응답 데이터를 JSON으로 파싱
    }).then((data) => {
      setCommentList(data); // 파싱된 데이터를 state에 설정
      console.log("데이터뽑아");
      console.log(commentList);
    })
      .catch((error) => {
        //인터넷문제 등으로 실패시 실행할코드
        alert("에러발생: " + error);
      });
  }, []);

  // if (session){
  //   return(
  //     <div>
  //     <div>댓글목록보여줄곳</div>
  //     <input
  //       onChange={(e) => {
  //         setComment(e.target.value);
  //       }}
  //     />
  //     <button onClick={commentSubmit}>댓글전송</button>
  //   </div>
  //   )

  //   }else{
  return (
    <div>
      <hr/>
      <div>
        {Array.isArray(commentList) && commentList.length > 0 ? (
          commentList.map((comment) => (
            <div key={comment._id} style={{ display: "flex" }}>
              <p style={{ marginRight: "10px" }}>Author: {comment.author}</p>
              <p style={{ marginRight: "10px" }}>Content: {comment.content}</p>
              <p style={{ marginRight: "10px" }}>좋아요수N: </p>
              <p style={{ marginRight: "10px" }}>좋아요한사람M,M,M: </p>
              <p onClick={ () => iLikeitButton(comment._id) } style={{ marginRight: "10px" }}> ♡♥ </p>
            </div>
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </div>
      <hr/>
      <input
        placeholder="내용"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <input
        placeholder="작성자"
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <button onClick={commentSubmit}>댓글전송</button>
      
    </div>
  );

  // }
}
