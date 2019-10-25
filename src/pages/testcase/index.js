import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import styles from './index.css'
const socket = io('http://localhost')

class TestCase extends React.Component {
  constructor() {
    super()
    this.cache = []
    this.maxLength = 200
    this.state = {
      flag: true,
      barraryList: []
    }
    this.timer = null
  }
  /**
   * 不加缓冲池，直接渲染弹幕
   */
  // componentDidMount() {
  //   socket.on('news', data => {
  //     console.log(data)
  //     this.setState({
  //       barraryList: this.state.barraryList.concat(data)
  //     })
  //   })
  // }

  /**
   * 增加缓冲池，通过requestAnimationFrame进行一条条弹幕的渲染；
   * 并增加策略，弹幕存在界面的dom最大数量为200，超过200条弹幕就会进行删除
   */
  componentDidMount() {
    socket.on('news', (data) => {
      console.log(data);
      this.cache = this.cache.concat(data)
      this.loop()
    })
  }
  loop() {
    if (this.cache.length > 0) {
      this.timer = window.requestAnimationFrame(this.draw.bind(this))
    }
  }
  draw() {
    if (this.cache.length > 0) {
      let list = []
      if (this.state.barraryList.length >= this.maxLength) {
        list = this.state.barraryList.slice(1).concat(this.cache.shift())
      } else {
        list = this.state.barraryList.concat(this.cache.shift())
      }
      this.setState({
        barraryList: list
      })
      let dom = document.getElementById('dom')
      if (this.state.flag) {
        dom.scrollTop = dom.scrollHeight
      }
      dom.onmousewheel = (e) => {
        this.setState({
          flag: false
        })
      }
      this.loop()
    }
  }
  render() {
    return (
      <div id="dom" className={styles.barraryContainer}>
        {
          this.state.barraryList.map(barrary => {
            return (
              <div id={barrary.id} key={barrary.id}>{barrary.content}</div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(TestCase)
