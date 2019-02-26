import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Input, Button, List } from 'antd'
import DemoService from '../../services/demoService'
import Service from '../../utils/service'
import styles from './index.css'

class Demo extends React.Component {
  @Service(DemoService) static demoService

  constructor() {
    super()
    this.state = {
      inputText: ''
    }
  }
  onChange(e) {
    this.setState({
      inputText: e.target.value
    })
  }
  addItem() {
    this.props.dispatch(this.demoService.test(this.state.inputText))
  }
  render() {
    const url = this.props.match.url
    // 匹配的route中的:id
    const id = this.props.match.params.id
    return (
      <div className={styles.demo}>
        <div>
          <h1>React Router Demo</h1>
          <h3>url为：{url}</h3>
          <h3>匹配的route中的:id为：{id}</h3>
          <h1>Redux Demo</h1>
        </div>
        <div>
          <Input
            className={styles.input}
            placeholder="请输入文字"
            allowClear
            value={this.state.inputText}
            onChange={this.onChange.bind(this)}
          />
          <Button
            className={styles.button}
            type="primary"
            onClick={this.addItem.bind(this)}
            disabled={this.state.inputText === ''}
          >
            新增
          </Button>
          <List
            className={styles.list}
            bordered
            dataSource={this.props.textList}
            renderItem={item => (
              <List.Item>
                <div className={styles.listItem}>{item}</div>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

Demo.propTypes = {
  match: PropTypes.object,
  textList: PropTypes.array
}
const mapStateToProps = state => {
  return {
    textList: state.demo.textList
  }
}
// connect方法中省略mapDispatchToProps参数，这样子处理的话，dispatch 会注入到你的组件props 中，即可以用this.props.dispatch
// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }
export default connect(mapStateToProps)(Demo)
