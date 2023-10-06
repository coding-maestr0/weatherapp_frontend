<template>
    <div id="app" :class="'warm'">
        <main>
            <div class="search-box">

                <div class="row">
                    <div class="col-md-11">
                        <input type="text" class="search-bar" @keyup.enter="getWeather"
                            placeholder="Enter the city name or zip code for weather details." v-model="loc" />
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-outline-info" @click="getWeather">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="weather">
                <WeatherCard :city="weather.city" :temperature="weather.temperature" :description="weather.description"
                    :weatherImage="weather.weatherImage" :localtime="weather.localtime" :country="weather.country" />
            </div>
        </main>
    </div>
</template>
  
<script>
import WeatherCard from './WeatherCard.vue';
import http from '../js/urlRepository.js';
import format_date from '../js/dateFormat.js';
import Swal from 'sweetalert2';
import { ref } from 'vue';

const loc = ref('')
export default {
    components: {
        WeatherCard
    },
    data() {
        return {
            city: '',
            weather: null
        };
    },
    methods: {
        getWeather() {
            let location = (this.loc == undefined || this.loc == "undefined" || this.loc == "") ? '' : this.loc;
            if ((this.loc == undefined || this.loc == "undefined" || this.loc == "")) {
                Swal.fire({ title: 'Oops!', text: "Please enter the city name or zip code for weather details.", icon: 'error', confirmButtonText: 'Okay' });
                return;
            }
            http.getWeatherForecastForLocation(location).then((res) => {
                const getData = res.data;
                console.log(res.data);
                if (res.data.status) {
                    this.weather = getData;
                    this.assignData(getData.data);
                }
                else {
                    Swal.fire({ title: 'Oops!', text: getData.message, icon: 'error', confirmButtonText: 'Okay' })
                }

            })
                .catch(
                    function (error) {
                        Swal.fire({ title: 'Oops!', text: "Something went wrong!", icon: 'error', confirmButtonText: 'Okay' })
                        console.log(error)
                    }
                )
        },
        assignData(getData) {
            this.weather.city = getData.location.name;
            this.weather.temperature = getData.current.temp_c;
            this.weather.description = getData.current.condition.text;
            this.weather.weatherImage = getData.current.condition.icon;
            this.weather.localtime = format_date(getData.location.localtime);
            this.weather.country = getData.location.country
        }
    }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Montserrat", sans-serif;
}

#app {
    background-image: url('../assets/img/cold-bg.jpg');
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
}

#app.warm {
    background-image: url("../assets/img/cold-bg.jpg");
}

main {
    min-height: 100vh;
    padding: 25px;

    background-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.75));
}

.search-box {
    width: 100%;
    margin-bottom: 30px;
}

.search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;

    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;
}

.search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px 16px 0px;
}

.location-box .location {
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    /* text-shadow: 1px 3px rgba(0, 0, 0, 0.25); */
}

.location-box .date {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    /* font-style: italic; */
}

.weather-box {
    text-align: center;
}

.weather-box .temp {
    display: inline-block;
    padding: 10px 25px;
    color: aliceblue;
    font-size: 95px;
    font-weight: 500;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    margin: 30px 0px;
}

.weather-box .weather {
    color: #fff;
    font-size: 40px;
    font-weight: 500;
}

.btn-outline-info {
    width: 80%;
    height: 100%;
}

::placeholder { /* Edge 12 -18 */
  color: white
}

svg {
    color: white;
}

</style>
  