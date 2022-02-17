const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})
//req : request, 사용자의 브라우저 정보, 질문(주소창), 로그인 정보
//res : 응답, 사이트 내용 html

app.listen(3000, () -> {
    console.log('3000번 포트에서 웹서버를 실행중입니다...')
})
