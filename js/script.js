const container = document.querySelector('.container')
const search = document.querySelector('input');
const submit = document.querySelector('button');
const head = document.querySelector('.location');
const title = document.querySelector('.title');
const country = document.querySelector('.country');
const cels = document.querySelector('.cels');
const farh = document.querySelector('.farh');
const img = document.querySelector('.left');
const body = document.querySelector('body');

let value = ''
async function weather(location = 'Nigeria') {
    const weatherApi = await fetch(`https://api.weatherapi.com/v1/current.json?key=ec7454b08b8e40e3974221109233012&q=${location}&aqi=yes`, { mode: 'cors' });
    const weatherData = await weatherApi.json();
    return weatherData
}

const loadSpinner = () => {
    body.innerHTML = `<div class="img"><img src="img/spinner.gif" alt="spinner" ><div>`
}

loadSpinner()

weather().then(response => {
    console.log(response);
    container.style.backgroundImage = `url(${response.current.condition.icon})`;
    head.textContent = `${response.location.name} Weather`
    title.textContent = `${response.location.name} (${response.current.condition.text})`
    country.textContent = `Country: ${response.location.country}`
    cels.textContent = `${response.current.temp_c} ℃`
    farh.textContent = `${response.current.temp_f} ℉`
    img.style.backgroundImage = `url(${response.current.condition.icon})`;
    body.innerHTML = ''
    body.appendChild(container)
}).catch(err => {
    console.log(err);
})

const processData = (location) => {
    weather(location).then(response => {
        const text = response.current.condition.text
        const icon = response.current.condition.icon
        const tempC = response.current.temp_c
        const tempF = response.current.temp_f
        const name = response.location.name
        const countr = response.location.country
        container.style.backgroundImage = `url(${response.current.condition.icon})`;
        head.textContent = `${name} Weather`
        title.textContent = `${name} (${text})`
        country.textContent = `Country: ${countr}`
        cels.textContent = `${tempC} ℃`
        farh.textContent = `${tempF} ℉`
        img.style.backgroundImage = `url(${icon})`;
        body.innerHTML = ''
        body.appendChild(container)
    }).catch(err => {
        console.log(err);
    })
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    loadSpinner()
    value = search.value === '' ? 'Nigeria' : search.value;
    search.value = ''
    processData(value);
    search.blur();
});