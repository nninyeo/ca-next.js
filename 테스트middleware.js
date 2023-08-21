import { NextResponse } from "next/server";


export async function middleware(Request){

    // console.log(request.nextUrl)
    // console.log(request.cookies)
    // console.log(request.headers)
    NextResponse.next();
    NextResponse.redirect();
    NextResponse.rewrite();



    
  request.cookies.get('쿠키이름')  //출력
  request.cookies.has('쿠키이름')  //존재확인
  request.cookies.delete('쿠키이름')  //삭제
  
  const response = NextResponse.next()
  response.cookies.set({
    name: 'mode',
    value: 'dark',
    maxAge: 3600,
    httpOnly : true
  })  
  return response  //쿠키생성

}