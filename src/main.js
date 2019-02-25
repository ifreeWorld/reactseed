import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { LocaleProvider } from 'antd';
import store from './store'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Home from './pages/home/index'

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <LocaleProvider locale={zhCN}>
        <Home />
      </LocaleProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
