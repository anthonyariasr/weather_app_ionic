import React, { useState, useEffect } from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  city: string; // Recibimos la ciudad como prop
}

const ExploreContainer: React.FC<ContainerProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationName, setLocationName] = useState<string>(city);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await response.json();
        setWeatherData(data);
        // Actualizar el nombre de la ciudad basado en la respuesta
        setLocationName(data.nearest_area[0].areaName[0].value);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeather();
  }, [city]);

  // Función para obtener un emoji según la condición climática
  const getWeatherEmoji = (condition: string) => {
    condition = condition.toLowerCase()
    if (condition.includes('sunny')) return '⛅';
    if (condition.includes('clear')) return '☀️';
    if (condition.includes('cloudy') || condition.includes('drizzle')) return '☁️';
    if (condition.includes('rain')) return '🌧️';
    if (condition.includes('snow')) return '❄️';
    if (condition.includes('thunderstorm')) return '⛈️';
    if (condition.includes('fog') || condition.includes('Mist')) return '🌫️';
    return '🌡️'; // Emoji por defecto si no hay coincidencia
  };

  return (
    <div className="container">
      {weatherData ? (
        <div>
          {/* Mostrar el emoji correspondiente a la condición climática con tamaño más grande */}
          <div style={{ fontSize: '4rem' }}>{getWeatherEmoji(weatherData.current_condition[0].weatherDesc[0].value)}</div>
          <h2>Weather in {locationName}</h2>
          <p>Codition: {weatherData.current_condition[0].weatherDesc[0].value}</p>
          <p>Temperature: {weatherData.current_condition[0].temp_C}°C</p>
        </div>
      ) : (
        <p>Cargando clima...</p>
      )}
    </div>
  );
};

export default ExploreContainer;
