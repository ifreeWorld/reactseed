import React from 'react'
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import Demo from '../demo'
import routes from '../../routes'
import './index.css'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1049181_s850u4fzx3l.js'
})

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: false
    }
  }

  onCollapse(collapsed) {
    this.setState({ collapsed })
  }

  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse.bind(this)}
        >
          <div className="logo">
            <IconFont type="icon-logo" style={{ fontSize: '35px', verticalAlign: 'middle' }} />
            <span>Manager</span>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['/link1']} mode="inline" selectedKeys={[this.props.history.location.pathname !== '/' ? this.props.history.location.pathname : '/link1']}>
            {
              routes.map((item, index) => {
                return item.children ? (
                  <SubMenu
                    key={index}
                    title={
                      <span>
                        <Icon type={item.icon} />
                        <span>{item.name}</span>
                      </span>
                    }
                  >
                    {
                      item.children.map(itemC =>
                        <Menu.Item key={itemC.link}><NavLink to={itemC.link}><span>{itemC.name}</span></NavLink></Menu.Item>)
                    }
                  </SubMenu>
                ) : (
                  <Menu.Item key={item.link}>
                    <NavLink to={item.link}>
                      <Icon type={item.icon} />
                      <span>{item.name}</span>
                    </NavLink>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                pathSnippets.map((item, index) =>
                  <Breadcrumb.Item key={index}>
                    {item}
                  </Breadcrumb.Item>)
              }
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Redirect exact from='/' to='/link1' />
                <Route exact path="/link1" component={Demo} />
                <Route exact path="/link2" component={Demo} />
                <Route exact path="/link3" component={Demo} />
                <Route path="/link4/:id" component={Demo} />
                <Route exact path="/link5" component={Demo} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default withRouter(Home)
