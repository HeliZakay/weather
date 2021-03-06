const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const weatherImg = document.querySelector("img")

weatherForm.addEventListener("submit", (e)=> {
    e.preventDefault()

    const city = search.value

    const url = "/weather?city="+city;

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    weatherImg.src=""
    
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = "The weather in " + data.city + ":"
            messageTwo.textContent = data.data
            console.log(data.icon)
            weatherImg.src = data.icon
        }
    })
})
    
})
