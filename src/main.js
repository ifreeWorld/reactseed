import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/home/index';

ReactDom.render(<BrowserRouter basename="/"><Home/></BrowserRouter>, document.getElementById('app'));
