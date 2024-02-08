// updateCurrentWeatherInformation.js

const apiKey = '3bb49e220431cede8909572a87f514bd';


async function displayTemperature(weather) {

    console.log('Calling the displayTemperature function, weather data:', weather);

    const city = '<Berlin>';
    await updateCurrentWeatherInformation(city);
}


async function getCityCoordinates(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const { lon, lat } = data[0];
            return { lon, lat };
        } else {
            console.error('Invalid response from OpenWeather API');
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates from OpenWeather API:', error);
        return null;
    }
}

async function updateCurrentWeatherInformation(city) {

    const coordinates = await getCityCoordinates(city);

    if (coordinates) {
        const { lon, lat } = coordinates;

        try {

            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const weatherData = await weatherResponse.json();

            console.log('Weather data:', weatherData);


            if (weatherData && weatherData.main && typeof weatherData.main.temp !== 'undefined') {
                const temperature = weatherData.main.temp;

                const temperatureContainer = document.getElementById('temperature-container');


                temperatureContainer.textContent = `Current temperature is: ${temperature}°C`;


                displayTemperature(weatherData);
            } else {
                console.error('Unable to extract valid temperature information. Check the weather data structure.');
            }
        } catch (error) {
            console.error('Error fetching weather data from OpenWeather API:', error);
        }
    } else {
        console.error('Invalid coordinates for the city');
    }
}
