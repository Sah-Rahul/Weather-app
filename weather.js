const Input = document.getElementById('city-input');
const Search_btn = document.getElementById('search-btn');
const WeatherIcon = document.getElementById('weather-icon');
const CityName = document.getElementById('city-name');
const Temperature = document.getElementById('temperature');
const Condition = document.getElementById('weather-condition');
const Humidity = document.getElementById('humidity');

let Api_Key = "ce5db4b45eb79f0fdce9cb5a696a3b1b";

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);

        // Update UI with fetched weather data
        CityName.innerText = data.name;
        Temperature.innerText = `Temperature: ${data.main.temp}°C`;
        Condition.innerText = `Condition: ${data.weather[0].description}`;
        Humidity.innerText = `Humidity: ${data.main.humidity}%`;

        let weatherCondition = data.weather[0].main.toLowerCase(); // Convert to lowercase

        // Change weather icon based on condition
        if (weatherCondition === "clear") {
            WeatherIcon.src = "./img/clear.jpg";
        } else if (weatherCondition === "clouds") {
            WeatherIcon.src = "./img/clouds.png";
        } else if (weatherCondition === "rain") {
            WeatherIcon.src = "./img/rain.jpg";
        } else if (weatherCondition === "snow") {
            WeatherIcon.src = "./img/snow.jpg";
        } else {
            WeatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Default API icon
        }

    } catch (error) {
        alert(error.message);
    }
};

Search_btn.addEventListener('click', () => {
    const city = Input.value.trim();
    if (city === '') {
        alert('Enter a city name');
    } else {
        getWeather(city);
    }
});
