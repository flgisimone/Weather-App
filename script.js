const body = document.querySelector("body");
const weatherCity = document.querySelector(".weatherCity");
const forecast = document.querySelector(".forecast");
const modal = document.querySelector(".modal")

const weatherForm = document.forms.weatherForm;
const element = weatherForm.elements;
const nameCity = document.querySelector(".nameCity");

nameCity.value = "Italia"; 
let newCity = nameCity.value; 
let cityName = newCity.replace("Italia", () => { 
    weatherForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let cityName = nameCity.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=eb0503dcbfb49a890461f582cd52caa3`;

        fetch(url)
        .then((res) => res.json())
        .then((data) => editCard(data))     
    })
})

const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity.value}&appid=eb0503dcbfb49a890461f582cd52caa3`;

fetch(url)
.then((res) => res.json())
.then((data) => editCard(data))

const editCard = (data) => {

    const city = document.querySelector(".city");
    const country = document.querySelector(".country");
    const weather = document.querySelector(".weather")
    const imgWeather = document.querySelector(".imgWeather");
    const grades = document.querySelector(".grades");
    const minGrades = document.querySelector(".minGrades");
    const maxGrades = document.querySelector(".maxGrades");
    const humidityVal = document.querySelector(".humidityVal");
    const pressureVal = document.querySelector(".pressureVal");
    const speedVal = document.querySelector(".speedVal");

    city.innerHTML = data.name;

    if(city.textContent != "undefined"){
        weatherCity.style="display:block"
        forecast.style="display:block"
        modal.style="display:none"
    } else {
        weatherCity.style="display:none"
        forecast.style="display:none"
        modal.style="display:flex"
    }

    country.innerHTML = "(" + data.sys.country + ")";
    weather.innerHTML = data.weather[0].main;
    imgWeather.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    grades.innerHTML = "Temp. " + parseFloat(data.main.temp-273.15).toFixed(1) + "°";
    minGrades.innerHTML = parseFloat(data.main.temp_min-273.15).toFixed(1)  + "°";
    maxGrades.innerHTML = parseFloat(data.main.temp_max-273.15).toFixed(1)  + "°";
    humidityVal.innerHTML = data.main.humidity;
    pressureVal.innerHTML = data.main.pressure;
    speedVal.innerHTML = data.wind.speed;
    
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${nameCity.value}&appid=eb0503dcbfb49a890461f582cd52caa3`;
    const containerForecast = document.querySelector(".containerForecast")

    fetch(urlForecast)
    .then((res) => res.json())
    .then((data) => forecastCards(data))

    const forecastCards = (data) => {

        for(let i = 0; i < 7; i++){

            const dayForecast = document.querySelector(".containerDayForecast");
            const dayHour = document.querySelector(".dayForecast");
            const imgForecast = document.querySelector(".imgDayForecast");
            const gradesForecast = document.querySelector(".gradesDayForecast");

            dayHour.innerHTML = data.list[i].dt_txt.substring(11,16)
            imgForecast.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
            gradesForecast.innerHTML = parseFloat(data.list[i].main.temp - 273.15).toFixed(1)  + "°";

            dayForecast.append(dayHour, imgForecast, gradesForecast);
            containerForecast.append(dayForecast);

            function iconWeatherForecastDay(){
                if(data.list[i].weather[0].icon === "01d") return imgForecast.src = "./assets/icon_weather/01d.svg";
                if(data.list[i].weather[0].icon === "01n") return imgForecast.src = "./assets/icon_weather/01n.svg";
                if(data.list[i].weather[0].icon === "02d") return imgForecast.src = "./assets/icon_weather/02d.svg";
                if(data.list[i].weather[0].icon === "02n") return imgForecast.src = "./assets/icon_weather/02n.svg";
                if(data.list[i].weather[0].icon === "03d" || data.list[i].weather[0].icon === "03n") return imgForecast.src = "./assets/icon_weather/03d.svg";
                if(data.list[i].weather[0].icon === "04d" || data.list[i].weather[0].icon === "04n") return imgForecast.src = "./assets/icon_weather/04d.svg";          
                if(data.list[i].weather[0].icon === "09d" || data.list[i].weather[0].icon === "09n") return imgForecast.src = "./assets/icon_weather/09d.svg";
                if(data.list[i].weather[0].icon === "10d") return imgForecast.src = "./assets/icon_weather/10d.svg";
                if(data.list[i].weather[0].icon === "10n") return imgForecast.src = "./assets/icon_weather/10n.svg";
                if(data.list[i].weather[0].icon === "11d" || data.list[i].weather[0].icon === "11n") return imgForecast.src = "./assets/icon_weather/11d.svg";
                if(data.list[i].weather[0].icon === "13d" || data.list[i].weather[0].icon === "13n") return imgForecast.src = "./assets/icon_weather/13d.svg";
                if(data.list[i].weather[0].icon === "50d" || data.weather[0].icon === "50n") return imgForecast.src = "./assets/icon_weather/50d.svg";
            } iconWeatherForecastDay()
        }
    }

    function backgroundWeather(){
        if(data.weather[0].icon === "01d") return body.style=`background-image:url("./assets/background/clearsky.jpg")`;
        if(data.weather[0].icon === "01n") return body.style=`background-image:url("./assets/background/clearskynight.jpg")`;
        if(data.weather[0].icon === "02d") return body.style=`background-image:url("./assets/background/cloudyday.jpg")`;
        if(data.weather[0].icon === "02n") return body.style=`background-image:url("./assets/background/cloudyevening.jpg")`;
        if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n") return body.style=`background-image:url("./assets/background/cloudy.jpg")`;
        if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n") return body.style=`background-image:url("./assets/background/brokenclouds.jpg")`;
        if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n") return body.style=`background-image:url("./assets/background/rain.jpg")`;
        if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n") return body.style=`background-image:url("./assets/background/rain.jpg")`;
        if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n") return body.style=`background-image:url("./assets/background/thunderstom.jpg")`;
        if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n") return body.style=`background-image:url("./assets/background/snow.jpg")`;
        if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n") return body.style=`background-image:url("./assets/background/mist.jpg")`; 
    }
    backgroundWeather()

    function iconWeather(){
        if(data.weather[0].icon === "01d") return imgWeather.src = "./assets/icon_weather/01d.svg";
        if(data.weather[0].icon === "01n") return imgWeather.src = "./assets/icon_weather/01n.svg";
        if(data.weather[0].icon === "02d") return imgWeather.src = "./assets/icon_weather/02d.svg";
        if(data.weather[0].icon === "02n") return imgWeather.src = "./assets/icon_weather/02n.svg";
        if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n") return imgWeather.src = "./assets/icon_weather/03d.svg";
        if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n") return imgWeather.src = "./assets/icon_weather/04d.svg";
        if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n") return imgWeather.src = "./assets/icon_weather/09d.svg";
        if(data.weather[0].icon === "10d") return imgWeather.src = "./assets/icon_weather/10d.svg";
        if(data.weather[0].icon === "10n") return imgWeather.src = "./assets/icon_weather/10n.svg";
        if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n") return imgWeather.src = "./assets/icon_weather/11d.svg";
        if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n") return imgWeather.src = "./assets/icon_weather/13d.svg";
        if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n") return imgWeather.src = "./assets/icon_weather/50d.svg";
    }
    iconWeather()

    function translateMainWeather(){
        if(data.weather[0].main === "Clear") return weather.innerHTML = "Cielo sereno";
        if(data.weather[0].main === "Clouds") return weather.innerHTML = "Nuvoloso";
        if(data.weather[0].main === "Rain") return weather.innerHTML = "Pioggia";
        if(data.weather[0].main === "Snow") return weather.innerHTML = "Neve";
        if(data.weather[0].main === "Drizzle") return weather.innerHTML = "Pioggia leggera";
        if(data.weather[0].main === "Thunderstorm") return weather.innerHTML = "Temporale";
        if(data.weather[0].main === "Smoke") return weather.innerHTML = "Fumo";
        if(data.weather[0].main === "Mist") return weather.innerHTML = "Nebbia";
        if(data.weather[0].main === "Haze" || data.weather[0].main === "Fog") return weather.innerHTML = "Foschia";
        if(data.weather[0].main === "Dust") return weather.innerHTML = "Polvere";
        if(data.weather[0].main === "Sand") return weather.innerHTML = "Sabbia";
        if(data.weather[0].main === "Ash") return weather.innerHTML = "Cenere";
        if(data.weather[0].main === "Squall") return weather.innerHTML = "Burrasca";
    }
    
    translateMainWeather()
}

    
    