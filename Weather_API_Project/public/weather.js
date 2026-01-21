const input = document.getElementById('cityInput');
const button = document.getElementById('getWeatherBtn');
const resultDiv = document.getElementById('weatherResult');


button.addEventListener('click', async () => {
  const location = input.value.trim();
  if (!location) return;

  try {
    const res = await fetch(`/weather?location=${encodeURIComponent(location)}`);
    const data = await res.json();
    
    if (!res.ok || data.error) {
      resultDiv.innerHTML = `<p>${data.error || 'Error fetching weather data'}</p>`;
      return;
    }

    displayWeatherData(data);
  } catch (err) {
    resultDiv.innerHTML = '<p>Error fetching weather data</p>';
    console.error(err);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    button.click();
  }
});

function displayWeatherData(data) {
  resultDiv.innerHTML = '';
  document.getElementById("title").textContent = data.location;
  document.getElementById("temp").textContent = `Temp: ${data.current.temp}°C`;
  document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
  document.getElementById("conditions").textContent = data.current.conditions;

  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  data.forecast.forEach(day => {
    const[year,month,currentday] = day.datetime.split("-");
    const formattedDate = `${currentday}/${month}`;
    const div = document.createElement("div");
    div.classList.add("forecastDay"); 
    div.innerHTML = `
      <h3>${formattedDate}</h3>
      <p> Temp: ${day.temp}°C<p> 
      <p> maxTemp:${day.tempmax}</p>
      <p> minTemp:${day.tempmin}</p>
      <p> Condition: ${day.conditions}</p>
    `;
    forecastContainer.appendChild(div);
  });
}
