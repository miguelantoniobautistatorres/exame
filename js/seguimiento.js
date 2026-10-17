let count = 0

const countElement = document.getElementById("count")
const cookieElement = document.getElementById("cookie")

function increaseCount() {
    count+= clickPower
    countElement.textContent = "Count: " + count
}

cookieElement.addEventListener('click', increaseCount)


let clickPower = 1