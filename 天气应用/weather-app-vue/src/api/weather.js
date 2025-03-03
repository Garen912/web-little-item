import request from "@/utils/request"
import settings from "@/setting"

const { API_KEY } = settings

export function getWeather(city) {
  return request({
    url: `data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=zh_cn`,
    method: 'get'
  })
}