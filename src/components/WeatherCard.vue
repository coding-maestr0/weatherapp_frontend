<template>
<div class="weather-wrap">
        <div class="location-box">
          <div class="location">
            {{ city }}, {{ country }}
          </div>
          <div class="date">{{ localtime }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ temperature }}°C</div>
          <div class="weather">{{ description }}</div>
          <img :src="weatherImage" />
        </div>
      </div>
</template>

<script>
export default {
  props: {
    city: String,
    temperature: Number,
    description: String,
    weatherImage: String,
    localtime: String,
    country: String
  },
  methods: {
  }
}
</script>

<style scoped>
@import '../assets/main.css';


#container {
  margin: 0 auto;
  display: flex;
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.4);
  width: 333px;
}


/* Left side */
.weather-img {
  position: relative;
}

.weather-temp {
  display: flex;
  align-items: center;
  padding: 10px;
}

.weather-state {
  height: 150px;
}

.temp-text {
  font-size: 40px;
  color: var(--white-color);
  margin-right: 20px;
}

.weather-description {
  font-weight: bolder;
  text-transform: uppercase;
  color: var(--white-color);
  font-size: 20px;
}

.weather-feel-like {
  color: var(--white-color);
  font-size: 20px;
  font-weight: bolder;
}


.humidity-wind-container {
  font-size: 20px;
  display: flex;
  justify-content: space-around;
  font-weight: bolder;
  color: var(--white-color);
}

.show-info-weather {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
}

.show-info-weather:hover {
  background-color: rgba(226, 220, 223, 0.8);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  opacity: 30%;
}

.icon-switching {
  font-size: 20px;
  fill: aqua;
}


/* right side */
.weather-info {
  display: none;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.info-text {
  color: var(--white-color);
  text-transform: uppercase;
  font-weight: 300;
}

.text-30 {
  font-size: 50px;
  font-weight: bolder;
}

.line {
  width: 80%;
  border: 1px solid black;
  margin-left: 10%;
  margin-bottom: 20px;
}

.one-line-cover {
  display: flex;
}
</style>
