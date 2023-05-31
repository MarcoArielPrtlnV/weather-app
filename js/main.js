const d = document;
const w = window;
const apiKey = 'e70b73c8c053abb805b81b551259eee1';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
const searchBox = d.querySelector('.search input');
const searchBtn = d.querySelector('.search button');
const weatherIcon = d.querySelector('.weather-icon');

function dateLocal(date) {

        let newDate = new Date().toLocaleDateString();
        d.querySelector(date).innerHTML = `<h3>${newDate}</h3>`;

}

function digitalClock(clock) {

    let clockTempo = setInterval(() => {

        let clockHour = new Date().toLocaleTimeString();

        d.querySelector(clock).innerHTML = `<h3>${clockHour}</h3>`;

    }, 1000);


}



async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);


    if(response.status == 404) {

        d.querySelector('.error').style.display = 'block';
        d.querySelector('.weather').style.display = 'none';

    } else {

        var data = await response.json();

        console.log(data);
        d.querySelector('.city').innerHTML = data.name;
        d.querySelector('.country').innerHTML = data.sys.country;
        d.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        d.querySelector('.description').innerHTML = data.weather[0].description;
        d.querySelector('.humidity').innerHTML = `${data.main.humidity} %`;
        d.querySelector('.wind').innerHTML = `${data.wind.speed} Km/h`;


    if(data.weather[0].main == 'Clouds') {


        weatherIcon.src = './images/clouds.png';


    } else if(data.weather[0].main == 'Clear') {


        weatherIcon.src = './images/clear.png';

    } else if(data.weather[0].main == 'Rain') {


        weatherIcon.src = './images/rain.png';

    } else if(data.weather[0].main == 'Drizzle') {

        weatherIcon.src = './images/drizzle.png';

    } else if(data.weather[0].main == 'Mist') {

        weatherIcon.src = './images/mist.png';

    } else if(data.weather[0].main == 'Fog') {

        weatherIcon.src = './images/fog.png';
    }

    d.querySelector('.weather').style.display = 'block';
    d.querySelector('.error').style.display = 'none';


    }

}


digitalClock('.clock');
dateLocal('.date');

searchBtn.addEventListener('click', (event) => {

    checkWeather(searchBox.value);
});


w.addEventListener('keydown', (event) => {
    if(event.keyCode === 13) {

        checkWeather(searchBox.value);
    }
})



