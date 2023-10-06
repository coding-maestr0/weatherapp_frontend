import api from './api.js'

function  getWeatherForecastForLocation(loc) {
    return api.get("WeatherForecast/getWeatherData?loc=" + loc);
}

export default {
    getWeatherForecastForLocation
}