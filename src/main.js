import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import Home from './pages/home/index'

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Home />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
