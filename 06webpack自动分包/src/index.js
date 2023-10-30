//index.js作为入口
import axios from 'axios'
import react from 'react'
const message = 'Hello message'
console.log(message)

function foo() {
  console.log('foo function exec')
}

foo()

const btn1 = document.createElement('button')
const btn2 = document.createElement('button')
document.body.appendChild(btn1)
document.body.appendChild(btn2)
btn1.innerHTML = 'about'
btn2.innerHTML = 'category'
btn1.onclick = () => {
  //使用import函数，动态导入
  import('./router/about')
}
btn2.onclick = () => {
  import('./router/category')
}
