import axios from 'axios';
import 'dotenv/config';
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL
});

try{
  await client.connect();
  console.log("Connected to redis server");
}catch(error){
  console.error("Error connectiong to redis", error)
}


const apiKey = process.env.API_KEY;

async function fetchWeatherData(location) {
  const key = location.trim().toLowerCase();
  
  try{
    const cached = await client.get(key);
    if (cached) {
      console.log('Cache hit');
      return JSON.parse(cached);
    }
  }catch(error){
    console.error("Redis Error: ",error)

  }

  const response = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
      location
    }?unitGroup=metric&key=${apiKey}&contentType=json`
  );

  const data = {
    location: response.data.address,
    current: response.data.currentConditions,
    forecast: response.data.days
   
  };

  try{
    await client.set(key, JSON.stringify(data), { EX: 3600 });
  }catch(error)
  {
    console.log("Redis key not set", error)
  }
  
  console.log('Cache miss');
  return data;
}

export { fetchWeatherData };
