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
    
    // FORECAST HOURS DAY
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
                if(data.list[i].weather[0].icon === "01d"){
                    imgForecast.src = "./assets/icon_weather/01d.svg";
                }
                else if(data.list[i].weather[0].icon === "01n"){
                    imgForecast.src = "./assets/icon_weather/01n.svg";
                }
                else if(data.list[i].weather[0].icon === "02d"){
                    imgForecast.src = "./assets/icon_weather/02d.svg";
                }
                else if(data.list[i].weather[0].icon === "02n"){
                    imgForecast.src = "./assets/icon_weather/02n.svg";
                }
                else if(data.list[i].weather[0].icon === "03d" || data.list[i].weather[0].icon === "03n"){
                    imgForecast.src = "./assets/icon_weather/03d.svg";
                }
                else if(data.list[i].weather[0].icon === "04d" || data.list[i].weather[0].icon === "04n"){
                    imgForecast.src = "./assets/icon_weather/04d.svg";
                }
                else if(data.list[i].weather[0].icon === "09d" || data.list[i].weather[0].icon === "09n"){
                    imgForecast.src = "./assets/icon_weather/09d.svg";
                }
                else if(data.list[i].weather[0].icon === "10d"){
                    imgForecast.src = "./assets/icon_weather/10d.svg";
                }
                else if(data.list[i].weather[0].icon === "10n"){
                    imgForecast.src = "./assets/icon_weather/10n.svg";
                }
                else if(data.list[i].weather[0].icon === "11d" || data.list[i].weather[0].icon === "11n"){
                    imgForecast.src = "./assets/icon_weather/11d.svg";
                }
                else if(data.list[i].weather[0].icon === "13d" || data.list[i].weather[0].icon === "13n"){
                    imgForecast.src = "./assets/icon_weather/13d.svg";
                }
                else if(data.list[i].weather[0].icon === "50d" || data.weather[0].icon === "50n"){
                    imgForecast.src = "./assets/icon_weather/50d.svg";
                }
            } iconWeatherForecastDay()
        }
    }

    function backgroundWeather(){
        if(data.weather[0].icon === "01d"){
            body.style=`background-image:url("./assets/background/clearsky.jpg")`;
        }
        else if(data.weather[0].icon === "01n"){
            body.style=`background-image:url("./assets/background/clearskynight.jpg")`;
        }
        else if(data.weather[0].icon === "02d"){
            body.style=`background-image:url("./assets/background/cloudyday.jpg")`;
        }
        else if(data.weather[0].icon === "02n"){
            body.style=`background-image:url("./assets/background/cloudyevening.jpg")`;
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            body.style=`background-image:url("./assets/background/cloudy.jpg")`;
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            body.style=`background-image:url("./assets/background/brokenclouds.jpg")`;
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            body.style=`background-image:url("./assets/background/rain.jpg")`;
        }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            body.style=`background-image:url("./assets/background/rain.jpg")`;
        }
        else if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n"){
            body.style=`background-image:url("./assets/background/thunderstom.jpg")`;
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            body.style=`background-image:url("./assets/background/snow.jpg")`;
        }
        else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
            body.style=`background-image:url("./assets/background/mist.jpg")`;
        }
    }
    backgroundWeather()

    function iconWeather(){
        if(data.weather[0].icon === "01d"){
            imgWeather.src = "./assets/icon_weather/01d.svg";
        }
        else if(data.weather[0].icon === "01n"){
            imgWeather.src = "./assets/icon_weather/01n.svg";
        }
        else if(data.weather[0].icon === "02d"){
            imgWeather.src = "./assets/icon_weather/02d.svg";
        }
        else if(data.weather[0].icon === "02n"){
            imgWeather.src = "./assets/icon_weather/02n.svg";
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            imgWeather.src = "./assets/icon_weather/03d.svg";
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            imgWeather.src = "./assets/icon_weather/04d.svg";
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            imgWeather.src = "./assets/icon_weather/09d.svg";
        }
        else if(data.weather[0].icon === "10d"){
            imgWeather.src = "./assets/icon_weather/10d.svg";
        }
        else if(data.weather[0].icon === "10n"){
            imgWeather.src = "./assets/icon_weather/10n.svg";
        }
        else if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n"){
            imgWeather.src = "./assets/icon_weather/11d.svg";
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            imgWeather.src = "./assets/icon_weather/13d.svg";
        }
        else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
            imgWeather.src = "./assets/icon_weather/50d.svg";
        }
    }
    iconWeather()

    function translateMainWeather(){
        if(data.weather[0].main === "Clear"){
            weather.innerHTML = "Cielo sereno";
        }
        else if(data.weather[0].main === "Clouds"){
            weather.innerHTML = "Nuvoloso";
        }
        else if(data.weather[0].main === "Rain"){
            weather.innerHTML = "Pioggia";
        }
        else if(data.weather[0].main === "Snow"){
            weather.innerHTML = "Neve";
        }
        else if(data.weather[0].main === "Drizzle"){
            weather.innerHTML = "Pioggia leggera";
        }
        else if(data.weather[0].main === "Thunderstorm"){
            weather.innerHTML = "Temporale";
        }
        else if(data.weather[0].main === "Smoke"){
            weather.innerHTML = "Fumo";
        }
        else if(data.weather[0].main === "Mist"){
            weather.innerHTML = "Nebbia";
        }
        else if(data.weather[0].main === "Haze" || data.weather[0].main === "Fog"){
            weather.innerHTML = "Foschia";
        }
        else if(data.weather[0].main === "Dust"){
            weather.innerHTML = "Polvere";
        }
        else if(data.weather[0].main === "Sand"){
            weather.innerHTML = "Sabbia";
        }
        else if(data.weather[0].main === "Ash"){
            weather.innerHTML = "Cenere";
        }
        else if(data.weather[0].main === "Squall"){
            weather.innerHTML = "Burrasca";
        }
    }
    translateMainWeather()
    
    }

    
    