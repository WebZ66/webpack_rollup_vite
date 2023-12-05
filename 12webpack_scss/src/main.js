let img = document.createElement('img')
import('./assets/1.png').then((res) => {
    img.src = res.default
    console.log(res.default)
})
document.body.appendChild(img)
