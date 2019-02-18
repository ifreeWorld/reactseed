import React from 'react'
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import routes from '../routes'
import './home.css'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1049181_s850u4fzx3l.js'
})

export default class Home extends React.Component {
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
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse.bind(this)}
        >
          <div className="logo">
            <IconFont type="icon-logo" style={{ fontSize: '35px', verticalAlign: 'middle' }}/>
            <span>Esthetic</span>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
              routes.forEach((item, index) => 
                <Menu.item key={ index }>
                  <Icon type={ item.icon } />
                  <span>{ item.name }</span>
                </Menu.item>)
            }
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </Menu.item>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
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
