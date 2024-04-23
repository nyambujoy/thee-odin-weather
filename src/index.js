import './css/index.css'

function createTopDiv() {
    const container = document.querySelector('.card')
    const topDiv = document.createElement('div');
    const cityInput = document.createElement('input')
    cityInput.className = 'cityInput'
    cityInput.setAttribute('placeholder', 'enter a city')
    const enterBtn = document.createElement('button');
    enterBtn.textContent = 'enter'
    enterBtn.className = 'enterBtn'

    topDiv.append(cityInput, enterBtn)
    container.append(topDiv)
}

createTopDiv()
function makeTopDivFunc() {
    const cityValue = document.querySelector('.cityInput')
    const enterButton = document.querySelector('.enterBtn')
    enterButton.addEventListener('click', () => {
        const city = cityValue.value.trim()
        if (city === '') {
            cityValue.setAttribute('placeholder', 'please enter a city')
        }
        console.log(city)
        handleFetch(city)
        return city
    })
}
makeTopDivFunc()

async function handleFetch(city) {
    const apiKey = 'df6e716f5f174930b3191204240204';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)


}
