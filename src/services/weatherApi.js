const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Weather data fetch failed');
    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};