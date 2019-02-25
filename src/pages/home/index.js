import React from 'react'
import {
  Route,
  Switch,
  NavLink,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Layout, Menu, Icon } from 'antd'
import Demo from '../demo'
import ErrorPage from '../errorPage'
import routes from '../../routes'
import saleAnalysis from '../saleAnalysis'
import saleManage from '../saleManage'
import { IconFont } from '../../utils'
import styles from './index.css'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: false
    }
  }

  onCollapse() {
    this.setState({ collapsed: !this.state.collapsed })
  }

  // 递归生成menu和SubMenu
  renderMenu(data) {
    return data && data.length > 0
      ? data.map(item =>
        item.children ? (
          <SubMenu
            key={item.link}
            title={
              <span>
                <IconFont type={item.icon} style={{ fontSize: '15px' }}/>
                <span>{item.name}</span>
              </span>
            }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        ) : (
          <Menu.Item key={item.link}>
            <NavLink to={item.link}>
              {item.icon ? <IconFont type={item.icon} style={{ fontSize: '15px' }}/> : ''}
              <span>{item.name}</span>
            </NavLink>
          </Menu.Item>
        )
      )
      : ''
  }

  render() {
    const { location } = this.props
    // 如果链接为http://www.baidu.com/app/data/123，pathSnippets则为['app', 'data', '123']
    const pathSnippets = location.pathname.split('/').filter(i => i) || []
    // 如果链接为http://www.baidu.com/app/data/123，combineSnippets则为['/app', '/app/data', '/app/data/123']
    const combineSnippets = []
    pathSnippets.forEach((item, index) => {
      const pre = index > 0 ? combineSnippets[index - 1] : ''
      combineSnippets.push(`${pre}/${item}`)
    })
    // splice删除最后一个元素123，combineSnippets则为['/app', '/app/data']
    combineSnippets.splice(-1, 1)

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} trigger={null}>
          <Link to="/">
            <div className={styles.logo}>
              <IconFont
                type="icon-logo"
                style={{ fontSize: '35px', verticalAlign: 'middle' }}
              />
              <span className={styles.logoText} data-text="manager">
                Manager
              </span>
            </div>
          </Link>
          <Menu
            theme="dark"
            defaultSelectedKeys={['/sale/analysis']}
            mode="inline"
            selectedKeys={[
              this.props.history.location.pathname !== '/'
                ? this.props.history.location.pathname
                : '/sale/analysis'
            ]}
            defaultOpenKeys={[
              combineSnippets.length > 0 ? combineSnippets[0] : '/sale'
            ]}
          >
            {this.renderMenu(routes)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.onCollapse.bind(this)}
            />
          </Header>
          <Content style={{ margin: '16px' }}>
            <Switch>
              <Redirect exact from="/" to="/sale/analysis" />
              <Route exact path="/sale/analysis" component={saleAnalysis} />
              <Route exact path="/sale/manage" component={saleManage} />
              <Route exact path="/shop/analysis" component={saleAnalysis} />
              <Route exact path="/shop/manage" component={saleManage} />
              <Route path="/demo/:id" component={Demo} />
              <Route component={ErrorPage} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default hot(withRouter(Home))
