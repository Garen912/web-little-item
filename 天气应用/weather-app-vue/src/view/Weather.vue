<template>
  <div id="weather-app">
    <h1>实时天气查询</h1>
    <el-input v-model="cityInp" @input="debouncesearchWeatherInfo" id="search-input" style="width: 240px"
      placeholder="请输入城市中文名称(默认为深圳)" />

    <div id="weather-container" v-loading="loading">
      <div id="current-weather">
        <img id="current-icon" :src="weatherIcon" alt="天气图标">
        <h2 id="current-temp">{{ currentTemp }}</h2>
        <p id="current-description">{{ weatherDes }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getWeather } from '@/api/weather'
import { debounce } from '@/utils'
import { ElInput, ElMessage } from 'element-plus'
import { pinyin } from 'pinyin-pro'

const loading = ref(true)
const cityInp = ref(null)
const currentTemp = ref('')
const weatherDes = ref('')
const weatherIcon = ref('')

function init() {
  searchWeatherInfo()
}

const debouncesearchWeatherInfo = debounce(searchWeatherInfo, 1500)

async function searchWeatherInfo() {
  try {
    loading.value = true
    const searchCity = handleCityPinyin(cityInp.value)
    const weatherData = await getWeather(searchCity)
    setWeatherInfo(weatherData)
    loading.value = false
  } catch (error) {
    ElMessage({ message: error.message, type: 'error' })
    loading.value = false
    throw new Error(error.message)

  }

}

function setWeatherInfo(weatherData) {
  currentTemp.value = weatherData.main.temp
  weatherDes.value = weatherData.weather[0].description
  weatherIcon.value = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png?v=1.6`
}

function handleCityPinyin(cityInp) {
  if (!cityInp) {
    return 'shenzhen'
  }

  return pinyin(cityInp, { toneType: 'none', type: 'array' }).join('')
}

init()
</script>

<style scoped>
#weather-app {
  max-width: 800px;
  width: 90%;
  padding: 20px;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#current-weather {
  text-align: center;
  margin-bottom: 20px;
}

.hourly-card,
.daily-card {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

/* 移动端适配 */
@media (max-width: 768px) {
  #weather-app {
    width: 100%;
    height: 100%;
    padding: 100px 0 0 0;
  }

  #weather-app h1 {
    font-size: 2rem;
    margin: 0;
    padding: 0.67em 0;
  }
}
</style>