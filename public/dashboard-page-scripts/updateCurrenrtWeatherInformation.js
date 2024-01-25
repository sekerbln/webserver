// updateCurrentWeatherInformation.js

const apiKey = '3bb49e220431cede8909572a87f514b';

async function updateCurrentWeatherInformation(city) {
    // Step 1: Get coordinates of the city
    const coordinates = await getCityCoordinates(city);

    // Check if coordinates are available
    if (coordinates) {
        const { lon, lat } = coordinates;

        try {
            // Step 2: Get current weather using coordinates
            const weatherData = await getCurrentWeather(lon, lat);

            // Check if weather data is available
            if (weatherData) {
                const temperature = weatherData.main.temp;

                // Display the temperature on the dashboard (you can modify this based on your dashboard structure)
                console.log(`Currently, ${city} has a temperature of ${temperature} °C`);
            } else {
                console.error('Invalid weather data from OpenWeather API');
            }
        } catch (error) {
            console.error('Error fetching weather data from OpenWeather API:', error);
        }
    } else {
        console.error('Invalid coordinates for the city');
    }
}

// Function to get coordinates of the city
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

// Function to get current weather using coordinates
async function getCurrentWeather(lon, lat) {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current weather from OpenWeather API:', error);
        return null;
    }
}
