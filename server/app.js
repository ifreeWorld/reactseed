let app = require('http').createServer(handler)
let io = require('socket.io')(app)
let fs = require('fs')
let _ = require('lodash')

app.listen(80)

function handler(req, res) {
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }

    res.writeHead(200)
    res.end(data)
  })
}

function getBarraryList() {
  let barraryList = []
  for (let i = 0; i < 10000; i++) {
    let id = _.uniqueId()
    barraryList.push({
      content: `这是一条弹幕${id}`,
      id
    })
  }
  return barraryList
}

io.on('connection', function(socket) {
  let count = 0
  let timer = null
  timer = setInterval(() => {
    count++
    socket.emit('news', getBarraryList())
    if (count >= 3) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
  socket.on('receive all', function(data) {
    console.log(data)
  })
})
