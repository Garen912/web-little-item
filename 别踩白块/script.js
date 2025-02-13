window.onload = function () {
  let scoreShow = document.querySelector('.score')
  let startBtn = document.querySelector('.game-start')
  let stopBtn = document.querySelector('.stop-btn')
  // let gameContinueBtn = document.querySelector('.game-continue')
  let table = document.getElementsByTagName('table')[0]
  let tbody = document.getElementsByTagName('tbody')[0]
  let color = ['#cc66cc', '#99ff66', '#66ffcc', '#FF7F24'];
  let speed = 10
  let offsetPx = 2
  let tablePreOffset = 0
  let score = 0
  let timer = 0

  startBtn.onclick = function () {
    startGame(speed)
  }

  stopBtn.onclick = function () {
    clearInterval(timer)
  }

  // gameContinueBtn.onclick = function () {
  //   startGame(speed)
  // }

  /**
   * 初始化新增行按钮
   * @function initTdTag 
   * @param { Object } tr 新增行
   * @param { Number } randomNum 随机数
  */
  function initTdTag(tr, randomNum) {
    tr.children[randomNum].style.backgroundColor = color[randomNum]
    tr.children[randomNum].onclick = function () {
      this.style.backgroundColor = "#eee"
      scoreShow.innerHTML = "您当前得分：" + ++score
      if (score % 10 == 0 && speed >= 0) {
        clearInterval(timer)
        speed--
        startGame(speed)
      }
    }
  }

  /**
   * 新增一行按钮
   * @function insertRow 
  */
  function insertRow() {
    let tr = document.createElement('tr')
    let randomNum = parseInt(Math.random() * 4)
    for (let i = 0; i < 4; i++) {
      let td = document.createElement('td')
      td.onclick = function () {
        gameOver()
      }
      tr.appendChild(td)
    }
    initTdTag(tr, randomNum)
    tbody.prepend(tr)
  }

  /**
   * 判断表格末尾行是否得分
   * @function lastRowScoreOrNot
   * @param { Number } offset 表格底边偏移量
  */
  function lastRowScoreOrNot(offset) {
    let lastRow = tbody.children[tbody.children.length + offset / 150]
    let result = Array.from(lastRow.children).some(td => {
      return td.style.backgroundColor == "rgb(238, 238, 238)"
    })
    if (!result) {
      gameOver()
    }
  }

  /**
   * 游戏结束
   * @function gameOver
  */
  function gameOver() {
    let mask = document.querySelector('.mask')
    mask.style.display = "flex"
    mask.onclick = function () {
      window.location.reload()
    }
    setTimeout(() => {
      clearInterval(timer)
      alert('游戏结束，你的得分为：' + score)
    }, 50)
  }

  /**
   * 开始游戏
   * @function startGame
   * @param { Number } speed 表格偏移速度
  */
  function startGame(speed) {
    scoreShow.innerHTML = "您当前得分：" + score
    timer = setInterval(() => {
      let tableBottomOffset = table.computedStyleMap().get('bottom').value
      table.style.bottom = (tableBottomOffset - offsetPx) + "px"

      if (tableBottomOffset == 600 || (tableBottomOffset < 600 && tablePreOffset - tableBottomOffset == 150)) {
        tablePreOffset = tableBottomOffset
        insertRow()
      }

      if (tableBottomOffset < 0 && tableBottomOffset % 150 == 0) {
        lastRowScoreOrNot(tableBottomOffset)
      }
    }, speed);
  }
}


