// updateCurrentWeatherInformation.js

const apiKey = '3bb49e220431cede8909572a87f514b';

async function updateCurrentWeatherInformation(city, callback) {
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
                const weatherCondition = weatherData.weather[0].main;
                const temperature = weatherData.main.temp;

                // Display the temperature on the dashboard
                console.log(`Currently, ${city} has a temperature of ${temperature} °C`);

                // Invoke the callback function with the weather condition
                callback(weatherCondition);
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

// Function to update weather image based on weather condition
function updateWeatherImage(weatherCondition) {
    // Get the container element
    const weatherPictureContainer = document.getElementById('weather-picture-container');

    // Create an image element
    const weatherImage = document.createElement('img');

    // Set the source based on the weather condition
    switch (weatherCondition) {
        case 'Clear':
            weatherImage.innerHTML = <img src={'/weather-pictures/clear.jpg'}/>;
            break;
        case 'Clouds':
            weatherImage.src = '/weather-pictures/clouds.jpg';
            break;
        case 'Rain':
            weatherImage.src = '/weather-pictures/rain.jpg';
            break;
        case 'Snow':
            weatherImage.src = '/weather-pictures/snow.jpg';
            break;
        case 'Thunderstorm':
            weatherImage.src = '/weather-pictures/thunderstorm.jpg';
            break;
        default:
            weatherImage.src = '/weather-pictures/default.jpg'; // Default image if condition not recognized
    }

    // Append the image to the container
    weatherPictureContainer.innerHTML = ''; // Clear previous content
    weatherPictureContainer.appendChild(weatherImage);
}

// updateCurrentWeatherInformation.js

// ... (之前的代码)

// Function to update weather picture
function updateWeatherPicture(weatherCondition) {
    const pictureContainer = document.getElementById('weather-picture-container');

    switch (weatherCondition) {
        case 'Clear':
            pictureContainer.innerHTML = "<img src='/weather-pictures/Sunny.png' alt='Clear Weather'>";
            break;
        case 'Clouds':
            pictureContainer.innerHTML = "<img src='/weather-pictures/Cloudy.png' alt='Cloudy Weather'>";
            break;
        case 'Rain':
            pictureContainer.innerHTML = "<img src='/weather-pictures/Rainy.png' alt='Rainy Weather'>";
            break;
        case 'Snow':
            pictureContainer.innerHTML = "<img src='/weather-pictures/Snowy.png' alt='Snowy Weather'>";
            break;
        case 'Thunderstorm':
            pictureContainer.innerHTML = "<img src='/weather-pictures/Thunderstorm.png' alt='Thunderstorm Weather'>";
            break;
        default:
            pictureContainer.innerHTML = "<p>No picture available for this weather condition</p>";
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