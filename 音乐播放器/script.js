const lrc = `[00:15.000]...
[00:18.480]沉迷在你清澈的眼睛
[00:22.800]是途经最难忘的风景
[00:27.180]无人可比拟那些往昔
[00:31.770]灿若繁星
[00:35.640]每一个为你做的决定
[00:39.990]故事几经辗转未落笔
[00:44.280]一幕幕曾经脑海放映
[00:48.870]刻骨铭心
[00:52.380]不想不念不听
[00:55.440]你也不再泛起涟漪
[00:59.850]天灯亮起相聚别离
[01:04.740]人来人往终更替
[01:08.610]翻山越岭寻一个你
[01:12.960]不负此生不负相遇
[01:17.280]不负我偏向苦海去
[01:20.730]只为渡你
[01:25.830]踏遍荆棘寻一个你
[01:30.120]不远万里只为朝夕
[01:35.670]纵天下负尽不负你
[01:59.280]每一个为你做的决定
[02:03.540]故事几经辗转未落笔
[02:07.860]一幕幕曾经脑海放映
[02:12.420]刻骨铭心
[02:15.960]不想不念不听
[02:19.500]心也不再泛起涟漪
[02:23.400]天灯亮起相聚别离
[02:28.290]人来人往终更替
[02:32.220]翻山越岭寻一个你
[02:36.570]不负此生不负相遇
[02:40.860]不负我偏向苦海去
[02:44.310]只为渡你
[02:49.410]踏遍荆棘寻一个你
[02:53.670]不远万里只为朝夕
[02:59.250]纵天下负尽不负你
[03:23.640]翻山越岭寻一个你
[03:27.930]不负此生不负相遇
[03:32.220]不负我偏向苦海去
[03:35.700]只为渡你
[03:40.800]踏遍荆棘寻一个你
[03:45.090]不远万里只为朝夕
[03:50.640]纵天下负尽不负你`

/**
 * 格式化时间
 * @param {number} time 时间
 * @returns {string} 格式化后的时间
 */
const formatTime = function (time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  const milliseconds = Math.floor(time % 1 * 1000)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`
}

/**
 * 设置歌词的偏移量
 */
const setOffset = function () {
  const lrcArr = parseLrc(lrc)
  const currentTime = formatTime(this.currentTime)
  const duration = formatTime(this.duration)
  const offset = 34 // 歌词的偏移量
  const li = document.querySelector('.lrc-wrapper ul li.active')

  // 当前时间小于第一句歌词的时间时，重置歌词位置
  if (currentTime < lrcArr[0].time) {
    ul.style.transform = `translateY(0px)`
    if (li) {
      li.classList.remove('active')
    }
  } else {
    // 查找当前时间对应的歌词
    const lrcIndex = lrcArr.findIndex((item, index) => {
      const nextTime = lrcArr[index + 1] ? lrcArr[index + 1].time : duration
      return currentTime >= item.time && currentTime < nextTime
    })

    // 歌词滚动
    ul.style.transform = `translateY(-${(lrcIndex) * offset}px)`
    if (li) {
      // 取消上一句歌词的高亮
      li.classList.remove('active')
    }
    // 高亮当前歌词
    document.querySelector(`.lrc-wrapper ul li:nth-child(${lrcIndex + 1})`).classList.add('active')
  }
}

/**
 * 解析歌词
 * @param {*} lrc 歌词字符串
 * @returns {Array} 解析后的歌词数组
 */
const parseLrc = function (lrc) {
  const lrcArr = lrc.split('\n').map(item => {
    // 匹配时间和歌词内容
    const regex = /^\[(\d{2}:\d{2}\.\d{3})\](.*)$/
    const match = item.match(regex)

    if (match) {
      const time = match[1]
      const content = match[2]

      return {
        time,
        content
      }
    }
  })

  return lrcArr
}

const lrcArr = parseLrc(lrc)
const player = document.querySelector('.player')
const ul = document.querySelector('.lrc-wrapper ul')

// 设置播放器的音量
player.volume = 0.1

// 创建文档片段
const fragment = document.createDocumentFragment()

// 创建歌词列表
lrcArr.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item.content
  fragment.appendChild(li)
})
ul.appendChild(fragment)

// 监听播放器的时间更新事件
player.addEventListener('timeupdate', setOffset)