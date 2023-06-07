import { useState } from "react";
import "./App.css";
import loader from "./assets/1amw.gif";
import axios from "axios";

function App() {
  // const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [cityWeather, setCityWeather] = useState([]);
  const fetchWeatherInfo = async () => {
    try {
      setIsLoading(true);
      const trimmedInput = [];
      const cities = textInput.split(",").forEach((city) => {
        console.log(city);
        // trimmedTextInput((prevData) => [...prevData, city.trim()]);
        trimmedInput.push(city.trim());
        // return city.trim()
      });
      for (const cityIndex in cities) {
        console.log(cities[cityIndex].trim());
      }
      // cities.forEach(city => city.trim())
      console.log(trimmedInput);
      const response = await axios.post(
        "https://xiv-tech.onrender.com/getWeather",
        {
          cities: trimmedInput,
        }
      );
      console.log(response.data);
      setCityWeather(response?.data?.message);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("An error occured please try again");
    }
  };

  return (
    <main>
      <div className="title">Find Current Weather Condition</div>
      <input
        className="textInput"
        placeholder="Enter name of city or cities separated with comma"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <img
            src={loader}
            style={{ width: 50, marginTop: 50, marginBottom: 20 }}
          />
        </div>
      ) : (
        <div>
          <button className="forecast-button" onClick={fetchWeatherInfo}>
            Get Forecast
          </button>
        </div>
      )}
      {cityWeather.map((city) => {
        return (
          <div key={city?.country?.name}>
            <p>{`${city?.country?.name} Forecast`}</p>
            <div>
              <p>Temperature: {city?.data?.current_weather?.temperature}</p>
              <p>Wind Speed: {city?.data?.current_weather?.windspeed}</p>
              <p>
                Wind Direction: {city?.data?.current_weather?.winddirection}
              </p>
              <p>is Day: {city?.data?.current_weather?.is_day}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default App;
