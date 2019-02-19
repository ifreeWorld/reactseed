import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { IconFont } from '../../utils'
import styles from './index.css'

class ErrorPage extends React.Component {
  render() {
    return (
      <div className={styles.errorPage}>
        <IconFont type="icon-error" style={{ fontSize: '200px' }} />
        {/* <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-error"></use>
        </svg> */}
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <div className={styles.desc}>
            抱歉，你访问的页面不存在
          </div>
          <div className={styles.actions}>
            <Button type="primary">
              <Link to="/">返回首页</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
export default ErrorPage
