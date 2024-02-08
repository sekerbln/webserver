const apiKey = 'ab799864c313b1fa02a3f97ae86c4b30';

const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;


async function displayTemperature(weather) {
    // Handle the logic to display temperature
    console.log('Calling displayTemperature function, weather data:', weather);

    // Call the updateCurrentWeatherInformation function here, passing the city name
    const city = '<Berlin>'; // Replace with the city for which you want to display the current temperature
    await updateCurrentWeatherInformation(city);
}

// Step 4b: Create a function to get city coordinates
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

// Step 4c: Create a function to get current weather information and display temperature
async function updateCurrentWeatherInformation(city) {
    // Get city coordinates
    const coordinates = await getCityCoordinates(city);

    // Check if coordinates are valid
    if (coordinates) {
        const { lon, lat } = coordinates;

        try {
            // Send a request to get current weather information
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const weatherData = await weatherResponse.json();

            console.log('Weather data:', weatherData);

            // Display temperature
            if (weatherData && weatherData.main && typeof weatherData.main.temp !== 'undefined') {
                const temperature = weatherData.main.temp;
                // Get the element for displaying temperature
                const temperatureContainer = document.getElementById('temperature-container');

                // Update the content of the element
                temperatureContainer.textContent = `Current temperature is: ${temperature}°C`;

                // Call the displayTemperature function here, passing weather data
                displayTemperaturePicture(weatherData);
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

// Get the weather picture container
const weatherPictureContainer = document.getElementById('weather-picture-container');

// Set the image path based on weather conditions
const weatherCondition = weatherData.weather[0].main;
const imagePath = getWeatherImagePath(weatherCondition);

// Create and set up the image element
const weatherImage = document.createElement('img');
weatherImage.src = imagePath;

// Clear the container and insert the new image element
weatherPictureContainer.innerHTML = '';
weatherPictureContainer.appendChild(weatherImage);

// Call the displayTemperature function here, passing weather data
function displayTemperaturePicture(weatherData){
    console.error('Unable to extract valid temperature information. Check the weather data structure.');
}

// Get the image path for the corresponding weather condition
function getWeatherImagePath(weatherCondition) {
    switch (weatherCondition) {
        case 'Clear':
            return '/public/weather-pictures/Sunny.png';
        case 'Clouds':
            return '/public/weather-pictures/Cloudy.png';
        case 'Rain':
            return '/public/weather-pictures/Rainy.png';
        case 'Snow':
            return '/public/weather-pictures/Snowy.png';
        case 'Thunderstorm':
            return '/public/weather-pictures/Thunderstorm.png';
        default:
            return '/public/weather-pictures/default.jpg';
    }
}
