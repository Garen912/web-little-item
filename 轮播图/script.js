
window.onload = function () {
  let timer = null,
    index = 0,
    img_count = 5,  //图片数量
    locatArr = [0, -720, -1440, -2160, -2880]

  let box = document.getElementsByClassName('box')[0],
    dot = document.getElementsByClassName('dot')[0],
    imgLi = Array.from(document.querySelectorAll('.dot li'))


  function start() {
    timer = setInterval(disPlay, 2000)
    let timerDot = setInterval(() => {
      imgLi.forEach(el => {
        el.removeAttribute('class')
      })
      imgLi[index].setAttribute('class', 'act')
    }, 20)
  }

  /**
  *轮播图片展示函数(最新，利用CSS3)，根据索引值到达相应地方
  *@param none
  *@return none
  */
  function disPlay() {
    if (index >= img_count - 1) {
      index = 0
      moveTo(0)
    } else {
      moveTo(++index)
    }
  }

  function bindEvent() {
    let preBtn = document.querySelector('.pre')
    let nextBtn = document.querySelector('.next')

    preBtn.addEventListener('click', handleClick('pre'))
    nextBtn.addEventListener('click', handleClick('next'))
    dot.addEventListener('click', handleClick('dot'))
  }

  function handleClick(btnName) {
    return function () {
      clearInterval(timer)
      if (btnName == 'pre') {
        if (index == 0) {
          index = img_count
        }
        moveTo(--index)
      }
      if (btnName == 'next') {
        if (index == img_count - 1) {
          index = -1
        }
        moveTo(++index)
      }
      if (btnName == 'dot' && arguments[0].target.tagName == 'LI') {
        let currentNode = arguments[0].target
        imgLi.forEach(el => {
          el.removeAttribute('class')
        })
        currentNode.setAttribute('class', 'act')
        index = currentNode.getAttribute('node-index')
        moveTo(index)
      }
      start()
    }
  }

  function moveTo(location) {
    box.style.left = locatArr[location] + "px"
  }

  start()
  bindEvent()
}

