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
    displayDataToScreen(data)
    return data


}

function displayDataToScreen(data) {
    const dataContainer = document.querySelector('.dataCont');
    dataContainer.textContent = ''

    const { location: { name, country, localtime }, current } = data
    const { humidity, temp_c, condition: { text } } = current

    const cityName = document.createElement('h1')
    cityName.classList.add('cityDs');
    cityName.textContent = name;

    const countryDs = document.createElement('h2')
    countryDs.classList.add('countryDs');
    countryDs.textContent = country;

    const timeDs = document.createElement('p')
    timeDs.classList.add('timeDs');
    timeDs.textContent = `local time ${localtime}`;

    const emojiDS = document.createElement('p')
    emojiDS.classList.add('emojiDS');

    const conditionCode = data.current.condition.code;


    const humidityDS = document.createElement('p')
    humidityDS.classList.add('humDis');
    humidityDS.textContent = `Humidity ${humidity}%`;

    const tempDS = document.createElement('p')
    tempDS.classList.add('tempDs');
    tempDS.textContent = `Temp ${temp_c} \u00B0`;


    const descDS = document.createElement('p')
    descDS.classList.add('descDs');
    descDS.textContent = text;

    const emoji = getWeatherEmoji(conditionCode);
    emojiDS.textContent = emoji;
    dataContainer.append(cityName, countryDs, timeDs, emojiDS, humidityDS, tempDS, descDS)

}



function getWeatherEmoji(conditionCode) {
    switch (conditionCode) {
        case 1000: // Clear (Sunny)
            return '☀️';
        case 1003: // Partly cloudy
            return '⛅';
        case 1006: // Cloudy
            return '☁️';
        case 1087: // Thundery outbreaks in nearby
            return '⛈️';
        // Add more cases for other weather conditions as needed
        default:
            return '☁️☁️';
    }

}


