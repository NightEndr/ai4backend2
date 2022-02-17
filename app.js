const express = require('express')
const path = require('path')

const app = express()


const indexRoute = require('./routes/index.js')

const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/nodejs",{
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to MongoDB...")
}).catch((err) => {
    console.log(err.message)
})

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    saveDate: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model("User", UserSchema)

const me = new User({
    name: "Yura",
    age: 25
})

me.save()
.then(() => {
    console.log(me)
}).catch((err) => {
    console.log(err.message)
})

const pickFood = () => {
    const food = ['돈까스', '마라탕', '치킨', '짜장면', '햄버거', '떡볶이', '초밥', '피자', '파스타']
    let idx = Math.floor(Math.random() * food.length)
    return food[idx]
}

const mbti = [
        'INTJ - 용의주도한 전략가 (Architect)',    'INTP - 논리적인 사색가 (Logician)',
        'ENTJ - 대담한 통솔자 (Commander)',
        'ENTP - 뜨거운 논쟁을 즐기는 변론가 (Debater)',
        'INFJ - 선의의 옹호자 (Advocate)',
        'INFP - 열정적인 중재자 (Mediator)',
        'ENFJ - 정의로운 사회운동가 (Protagonist)',
        'ENFP - 재기발랄한 활동가 (Campaigner)',
        'ISTJ - 청렴결백한 논리주의자 (Logistician)',
        'ISFJ - 용감한 수호자 (Defender)',
        'ESTJ - 엄격한 관리자 (Executive)',
        'ESFJ - 사교적인 외교관 (Consul)',
        'ISTP - 만능 재주꾼 (Virtuoso)',
        'ISFP - 호기심 많은 예술가 (Adventurer)',
        'ESTP - 모험을 즐기는 사업가 (Entrepreneur)',
        'ESFP - 자유로운 영혼의 연예인 (Entertainer)'
    ]   

const randIdx = function(arr) {
    return Math.floor(Math.random() * arr.length)
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', indexRoute)


app.get('/food', (req, res) => {
    text = pickFood()
    res.send(`오늘 당신에게 추천드리는 메뉴는 바로 ${text} 입니다!`)
})

app.get('/lucky', (req, res) => {
    res.send(`
    <p>오늘 당신이 만날 사람은 바로 <font color="blue">${mbti[randIdx(mbti)]}</font> 입니다. </p>
    `)
})

// app.use( (err, req, res, next) => {
//     console.log(err)
//     res.status(500).send(err.message)
// }  )

app.listen(3000, () => {
    console.log('3000번 포트에서 웹서버를 실행중입니다...')
})
